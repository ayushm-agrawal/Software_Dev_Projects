#include "parse.cpp"
#include <iostream>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sstream>

using namespace std;

// Found the code for coloring the shell online
/* Coloring code STARTS here */
enum Color
{
    NONE = 0,
    BLACK, RED, GREEN,
    YELLOW, BLUE, MAGENTA,
    CYAN, WHITE
};

static string set_color(Color foreground = NONE, Color background = NONE)
{
    stringstream s;
    s << "\033[";
    if (!foreground && ! background){
        s << "0"; // reset colors if no params
    }
    if (foreground) {
        s << 29 + foreground;
        if (background) s << ";";
    }
    if (background) {
        s << 39 + background;
    }
    s << "m";
    return s.str();
}
/* Coloring code ENDS here */

/*The main function */
int main(int argc, char *argv[])
{
	// Command structure
	Command *head = NULL;
	bool exitloop = false;
	bool arguments = false;
	int headStatus = 0;
	const char* exitCommand = "exit";
	int redStdAppend = 0;
	int redStdOut = 0;
	int redStdIn = 0;
	char* headCommand;
	int pipefd[4][2];


	// This loop checks if the arguments were provided with ./osh and updates flag
	for(int i=1; i < argc; i++) {
		if (strcmp(argv[1], "-t") == 0) {
			arguments = true;
		}
	}

	// The Welcome code for the shell
	if(!arguments) {
		printf("\n");
		cout << set_color(MAGENTA) << "********************************************" << endl;
		printf("%30s \n", "Welcome to Ayush's Shell");
		cout << set_color(MAGENTA) << "********************************************" << endl;
		printf("\n");
	}

	// This loop runs until the exit command has been executed
	while(!(exitloop)) {
		
		// Conditional sets the color for the shell
		if(!arguments){
			cout << set_color(MAGENTA) << "osh> " << flush;
		}
		
		if (status_failure != GetCommandChain(&head)) {
			int pipeCount = 0;
			while (head != NULL) {
				headCommand = head->file;
				if (head->symbolType == 0) { //Symbol '<'
					int child_p = fork();
				
					if (child_p == 0) {
						if(head->next->symbolType == 7) {
							redStdIn = open(head->next->file, O_RDONLY | O_CREAT, S_IRWXU | S_IRWXG | S_IRWXO);	
							dup2(redStdIn, 0);
							execvp(head->file, head->arglist);
						}
						else {
							redStdIn = open(head->next->file, O_RDONLY | O_CREAT, S_IRWXU | S_IRWXG | S_IRWXO);	
							redStdOut = open(head->next->next->file, O_RDWR | O_CREAT, S_IRWXU | S_IRWXG | S_IRWXO);
							dup2(redStdIn, 0);
							dup2(redStdOut, 1);
							execvp(head->file, head->arglist);
						}
					}
					else {
						wait(&head->status);
					}
					break;
				}
				else if (head->symbolType == 2) { //Symbol '>'
					if (head->next->symbolType == 6) {
						cerr << "Ambiguous output redirect." << endl;
						break;
					}
					else {
						int child_p = fork();
						if (child_p == 0) {	
							if (head->prev != NULL && head->prev->symbolType == 6) { // if prev symbol '|'
								if(head->next->symbolType == 7) {
									close(pipefd[pipeCount][1]);
									redStdOut = open(head->next->file, O_RDWR | O_CREAT, S_IRWXU | S_IRWXG | S_IRWXO);
									dup2(pipefd[pipeCount][0], 0);
									dup2(redStdOut,1);
									close(pipefd[pipeCount][0]);
									execvp(head->file, head->arglist);
								}
							}
							else {
								if(head->next->symbolType == 7) {
									redStdOut = open(head->next->file, O_RDWR | O_CREAT, S_IRWXU | S_IRWXG | S_IRWXO);
									dup2(redStdOut, 1);
									execvp(head->file, head->arglist);
								}
								else {
									redStdIn = open(head->next->next->file, O_RDONLY | O_CREAT, S_IRWXU | S_IRWXG | S_IRWXO);
									redStdOut = open(head->next->file, O_RDWR | O_CREAT, S_IRWXU | S_IRWXG | S_IRWXO);
									dup2(redStdIn, 0);
									dup2(redStdOut, 1);
									execvp(head->file, head->arglist);
								}
							}
							
						}
						else {
							wait(&head->status);
						}
					}
					break;
				}
				else if (head->symbolType == 3) { //Symbol '>>'
					int child_p = fork();
					if (child_p == 0) {
						if (head->next->symbolType == 7) {
							redStdAppend = open(head->next->file, O_APPEND | O_RDWR | O_CREAT, S_IRWXU | S_IRWXG | S_IRWXO);
							dup2(redStdAppend, 1);						
							execvp(head->file, head->arglist);
						}
						
					}
					else {
						wait(&head->status);
					}
					break;
				}
				else if (head->symbolType == 4) { //Symbol '&&'
					int child_p = fork();
					if (child_p == 0) {
						if (head->prev != NULL && head->prev->symbolType == 6) { // if prev symbol '|'
							close(pipefd[0][1]);
							dup2(pipefd[0][0], 0);
							execvp(head->file, head->arglist);
						}
						else {
							execvp(head->file, head->arglist);
						}
					}
					else {
						wait(&head->status);
						headStatus = head->status;
					}
					if(headStatus != 0) {
						
						break;
					}
				}
				else if (head->symbolType == 5) { //Symbol '||'
					int child_p = fork();
					if (child_p == 0) {
						if (head->prev != NULL && head->prev->symbolType == 6) { // if prev symbol '|'
							close(pipefd[0][1]);
							dup2(pipefd[0][0], 0);
							execvp(head->file, head->arglist);
						}
						else {
							execvp(head->file, head->arglist);
						}
					}
					else {
						wait(&head->status);
						headStatus = head->status;
					}
					if(headStatus == 0) {
						break;
					}
				}
				else if (head->symbolType == 6 ) { // Symbol '|'
					if(head->next->file == NULL ){
						cerr << "Invalid NULL Command." << endl;
						break;
					}
					else if (head->next->symbolType == 0) {
						cerr << "Ambiguous input redirect." << endl;
						break;
					}
					else { 
						if (head->prev != NULL && head->prev->symbolType == 6) {  // if prev symbol '|'
							pipeCount++;
							pipe(pipefd[1]);
							int pid = fork();
							if(pid == 0) {
								close(pipefd[0][1]);
								close(pipefd[pipeCount][0]);
								dup2(pipefd[0][0],0);
								dup2(pipefd[pipeCount][1],1);
								execvp(head->file, head->arglist);
							}
						}
						else {
							pipe(pipefd[pipeCount]);
							redStdIn = pipefd[pipeCount][0];
							int pid = fork();
							if(pid == 0) {
								close(pipefd[pipeCount][0]);
								dup2(pipefd[pipeCount][1],1);
								execvp(head->file, head->arglist);
							}
							else {
								wait(&head->status);
								close(pipefd[pipeCount][1]);
							}
						}
					}
				}
				else if (headCommand == NULL) { // Head is NULL
					//end of command due to new line
					if (head->symbolType == 7 ) { 
						break;
					}
					else{
						cerr << "Invalid NULL Command." << endl;
						break;
					}
				}
				else if (strcmp(headCommand, exitCommand) == 0) { //Command == 'exit'
					exit(0);
				}
				else if (head->symbolType == 7){ //Symbol NULL
					int child_p = fork();
					if (child_p == 0) {
						if (head->prev != NULL && head->prev->symbolType == 6) { // if prev symbol '|'
							close(pipefd[pipeCount][1]);
							dup2(pipefd[pipeCount][0], 0);
							execvp(head->file, head->arglist);
						}
						else {
							execvp(head->file, head->arglist);
						}
					}
					else {
						wait(&head->status);
					}
					headStatus = 0;
				}
				else if (head->symbolType == 9) { //Symbol ';'
					int child_p = fork();
					if (child_p == 0) {
						execvp(head->file, head->arglist);
					}
					else {
						wait(&head->status);
					}
				}
				head = head->next;
			}
		}
	}
return status_success;
}
