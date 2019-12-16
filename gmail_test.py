# TODO: Fix the logic in the question and example splitting

import base64
import email
import os.path
import pickle
import uuid
from collections import defaultdict
from datetime import date, timedelta

import firebase_admin
from apiclient import errors
from firebase_admin import credentials, firestore
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']


def main():

    # Add Cloud Firestore to the project
    firestore_creds = credentials.Certificate('key.json')
    firebase_admin.initialize_app(firestore_creds)
    db = firestore.client()
    companies_ref = db.collection(u'companies')
    problems_ref = db.collection(u'problems')

    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('gmail', 'v1', credentials=creds)
    messages_ids = getMessageIds(service)
    print("Yesterday's message Id: {}".format(messages_ids[0]['id']))
    parse_cnt = 0
    for msg_id in messages_ids:
        parse_cnt += 1
        raw_str = getMessageDetails(msg_id, service)
        parseMessage(raw_str, companies_ref, problems_ref)
        break


def getMessageIds(service):
    
    # Call the Gmail API
    try:
        today = date.today()
        yesterday = today - timedelta(1)
        
        query = '<founders@dailycodingproblem.com> in:inbox before: {0} after: {1}'.format(today.strftime('%Y/%m/%d'),
                                                                                        yesterday.strftime('%Y/%m/%d'))
        response = service.users().messages().list(
            userId='me', q=query).execute()
        messages = []

        if 'messages' in response:
            messages.extend(response['messages'])

        while 'nextPageToken' in response:
            page_token = response['nextPageToken']
            response = service.users().messages().list(userId='me', q='<founders@dailycodingproblem.com> in:inbox',
                                                       pageToken=page_token).execute()

            messages.extend(response['messages'])

        print('Number of messages: {}'.format(len(messages)))

        return messages
    except Exception as error:
        print("An error has occurred while searching for messages: {}".format(error))


def getMessageDetails(message, service):
    message_id = message['id']
    try:
        message_obj = service.users().messages().get(
            userId='me', id=message_id, format='raw').execute()

        message_str = base64.urlsafe_b64decode(message_obj['raw'])
        mime_msg = message_str.decode('utf-8')
        return mime_msg
    except errors.HttpError as e:
        print("An error has occurred while getting the message details: {}".format(e))
        print("Message ID: {}".format(message_id))


def parseMessage(raw_str, companies_ref, problems_ref):
    prob_data = defaultdict(list)
    message_file = open("message.txt", 'a')
    company_name = ' '
    problem_id = str(uuid.uuid1())
    problems_ref = problems_ref.document(problem_id)
    question_str = ''
    example_str = ''

    should_print = False
    counter = 0
    for line in raw_str.splitlines():
        line_arr = line.split(" ")

        if line_arr[0] == 'None.' or counter > 2:
            should_print = False

        elif line_arr[0] == "This":
            should_print = True
            message_file.write(line)
            message_file.write("\n")
            # Add the company to the Database if it doesn't exist
            company_name = company_name.join(line_arr[6:]) if line_arr[3] == 'recently' else company_name.join(line_arr[5:]) 
            company_ref = companies_ref.document(company_name[:-1])
            if not company_ref.get().exists:
                company_id = str(uuid.uuid1())
                data = {'id': company_id}
                company_ref.set(data)
                prob_data['company_id'] = company_id
            print("Company Name: {}".format(company_name[:-1]))

        elif should_print and line == "":
            counter += 1
        if should_print:
            if counter == 1:
                question_str += line
            if counter > 1:
                example_str += line
    print(question_str)
    if not problems_ref.get().exists:
        prob_data['question'].append(encodeToBase64(question_str))
        prob_data['example'].append(encodeToBase64(example_str))
        problems_ref.set(prob_data)
    message_file.close()


def encodeToBase64(line):
    return base64.b64encode(line.encode("utf-8"))

if __name__ == '__main__':
    main()
