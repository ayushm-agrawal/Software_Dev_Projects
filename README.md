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

 -----------------
| Line Number: 3 |
 -----------------
Your Output:

Virtual address: 30193 Physical address: 758 Value: 29
Original Output:

Virtual address: 30198 Physical address: 758 Value: 29
=============================================

=============================================

```

## WIMTA
This project was started during Cornhacks 2018

[![Build Status](https://travis-ci.com/aagrawal20/WIMTA.svg?token=E4PPykn1BySzihqGnWTA&branch=master)](https://travis-ci.com/aagrawal20/WIMTA)


## HuskerEats
This android application was started at Cornhacks 19'. 

We created a platform to allow students to get meals delivered by other students from around the campus by creating a trade off system.


## Anywhere To-Do
A simple chrome extension that allows you to add new tasks from any tab in the browser. 
I built this simple extension as a 1 day project to help me quickly note down new tasks while being in any tab in my chrome browser.

#### *You can find it using the link below*


<https://chrome.google.com/webstore/detail/anywhere-todo/kfpaoenloiepfehfochcnijkjmojcjdd>


![alt-text](https://github.com/ayushm-agrawal/Anywhere-To-Do/blob/master/images/todo48.png "LOGO")

**Don't forget to leave a rating**
:star: :star: :star: :star: :star:

## Screenshots

![alt-text](https://github.com/ayushm-agrawal/Anywhere-To-Do/blob/master/ssht_dark.PNG "Screenshot Dark")

![alt-text](https://github.com/ayushm-agrawal/Anywhere-To-Do/blob/master/ssht_red.PNG "Screenshot Red")

## How it Works
1. Download the extension from the chrome webstore
2. It should replace your old new tab. 
> Chrome will ask to keep changes or not. **Select keep changes**

3. After this, from any tab (not specifically new tab), you should be able to add new tasks to the todo list.
4. Click on the address bar and use the keyword *:todo* then press space/tab to trigger the extension.
5. Enter your amazing task and press enter. You should see the changes, next time you open a new tab.

**The data will sync between all chrome sessions and all your devices**

## Version

#### Ver 0.3.1
* Fixed bug where new tasks are not added from a different tab while the extension tab is closed.

#### Ver 0.3
* Fixed bug where if you delete a task it would delete the task after.
* Added support to store the theme you select in a session. The same theme will now stay in different session.
* Fixed console error for empty list methods.

#### Ver 0.2
* Fixed bug where the completed list wouldn't save data sometimes.

#### Ver 0.1
* Initial release.


Made with :heart:
