# Software_Dev_Projects
This repository contains all the software development projects that I have started and worked on during my bachelor's degree. Feel free to add any issues or pick up any of these projects.

## 5Day_WeatherForecastAndroidApp

I created this app in the Android Development class as a final project.

This app gives a 5 day weather forecast with high, low and humidity for any city entered.

## Basic-Shell
Basic shell written in C++

## Files-Diff-Compare
Gives the differences with line numbers for two text files

I got tired of continuously comparing my output by the sample output provided for any assignments, so I made this small program in Java that outputs any differences found between the two files.

#Compiling
To compile this program, you can simply compile the program using ```javac diffComparer.java```


#Running
To run this program, there are two ways.
- If you simply want the lines that are diffs, you can simply use the command ```java diffComparer <originalFile>.txt <yourFile>.txt```
- If you want to get deep diagnostics on what is different in the line, you can use the command ```java diffComparer -deep <originalFile>.txt <yourFile>.txt```
  
#Output
If you run the program with the files provided in the repository, you will see output like this. 
I have divided the sections so it is easy for you to pinpoint where the files don't match based on the line numbers.

```
----------------------DIFFS-------------------
 -----------------
| Line Number: 1 |
 -----------------
Your Output:

Virtual address: 16915 Physical address: 20 Value: 0
Original Output:

Virtual address: 16916 Physical address: 20 Value: 0

=============================================
 -----------------
| Line Number: 3 |
 -----------------
Your Output:

Virtual address: 30193 Physical address: 758 Value: 29
=============================================
Original Output:

Virtual address: 30198 Physical address: 758 Value: 29
=============================================

=============================================

```

## WIMTA
This project was started during Cornhacks 2018

[![Build Status](https://travis-ci.com/aagrawal20/WIMTA.svg?token=E4PPykn1BySzihqGnWTA&branch=master)](https://travis-ci.com/aagrawal20/WIMTA)
