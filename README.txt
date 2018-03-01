*This README contains information about how to compile, run and test the shell with additional information:*

*COMPILING*
> First download and unzip the folder. 

> From your unix shell, go to the folder where the MakeFile is located.

> Type 'make' without the quotes to compile the program.

*RUNNING*
> You can type './osh' without the quotes to start the program.  
  Note that the color of text will change and you will see osh> to input your command.

*TESTING*
> In order to run a test script in the shell you 
  will use the -t flag and redirect < with osh. An example is given below. Use without quotes.
  './osh -t < testscript.txt'
  This will print the output of the testscript.

*PROBLEMS*
> During this assignment, I had a bunch of problems. Few of them are listed below.
  > The parser does not recognize the symbol type and for some symbols like '<' it assumes the file as a new command.

  > The parser does not handle new line other than explicit '\n' which was another thing to handle.
  
  > Since, the parser does not recognize different types of symbol and their required inputs, I had to manually program
    if I find symbol '<' then the next thing is a file and then move to head->next->next.
  
  > The parser also had some spelling mistakes that were not obvious.
  
  > Initially I was doing my entire logic inside a child process that was not efficient.

*LEARNING*
> I learned a lot about the functionality of all the commands that I use in a normal shell.

> I also learned when to stop a process or when to run a parallel process which gave me a better
  understanding of how a shell works.

> Initially I was doing all my logic inside the child process which was creating a lot of issues. 
  I learned when do you need a child process and to only use a child process when required.

> This assignment was challenging and cleared a lot of my concepts.