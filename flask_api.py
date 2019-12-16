import os
from flask import Flask, request, jsonify
from gmail_test import main

# Initialize Flask App
app = Flask(__name__)

@app.route('/add', methods=['POST'])
def create():

    try:
        return main(), 200
    except Exception as e:
        print("An error has occured: {}".format(e))


@app.route('/list', methods=['GET'])
def read():
    pass

@app.route('/update', methods=['POST', 'PUT'])
def update():
    pass

@app.route('/delete', methods=['GET', 'DELETE'])
def delete():
    pass


port = int(os.environ.get('PORT', 8000))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)