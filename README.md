# Files-Diff-Compare
Gives the differences with line numbers for two text files

I got tired of continuously comparing my output by the sample output provided for any assignments, so I made this small program in Java that outputs any differences found between the two files.

#Compiling
To compile this program, you can simply compile the program using ```javac diffComparer.java```


#Running
To run this program, you can simply use the command ```java diffComparer <originalFile>.txt <yourFile>.txt```
  
#Output
If you run the program with the files provided in the repository, you will see output like this. 
I have divided the sections so it is easy for you to pinpoint where the files don't match based on the line numbers.

```
----------------------DIFFS-------------------
Line Number: 1
Your Output:
[Virtual address: 16915 Physical address: 20 Value: 0, Virtual address: 30193 Physical address: 758 Value: 29]
=============================================
Original Output:
[Virtual address: 16916 Physical address: 20 Value: 0, Virtual address: 30198 Physical address: 758 Value: 29]
=============================================

=============================================
Line Number: 3
Your Output:
[Virtual address: 16915 Physical address: 20 Value: 0, Virtual address: 30193 Physical address: 758 Value: 29]
=============================================
Original Output:
[Virtual address: 16916 Physical address: 20 Value: 0, Virtual address: 30198 Physical address: 758 Value: 29]
=============================================

=============================================

```
