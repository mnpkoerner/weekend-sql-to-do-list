# Weekend Project: To Do List

A full-stack application!

## Description

Weekend assignment from Prime Academy full-stack engineering This is my first full-stack application! The goal of the project was to build a full-stack to do list. Full CRUD! They challenged us to build a dynamic UI, comprehensive client-side logic, and a database for permanent data storage. My iteration will display two different tables: uncompleted and completed tasks. You're able to sort the tables in a few different ways, delete information from the database, and mark when tasks are complete. You're also able to compare the ammount of time you estimate an activity to take with the actual time the activity took, hopefully teaching you how best to estimate your time and manage your day!

It helps me to prioritize my goals in three different categories: short term, mid term, and long term. I like to get my short term goals done by the end of the day. I try to check off one or two mid term goals whenever I can. And I try to get one long term goal finished every week.

## Screen Shots

This is what you'll see when you load the app (you can use the placeholder data in database.sql or instert your own)
![To Do](/screenshots/red.png)
This is what you'll see when you toggle the app to view your completed tasks
![Complete](/screenshots/green.png)

### Prerequisites
* Nodejs
* jQuery
* Express
* Postico/PostgreSQL/PG

## Installation

1. Fork and clone the repo
1. Open project with your IDE
1. Install or initialize Nodejs, express, and pg
1. Create database and populate it with placeholder data from included database.sql file
1. Turn on server in your terminal and go to localhost: 5000

## Usage
1. Insert a new task by using the form at the top of the page
1. Toggle between incomplete and complete tasks by using the toggle button
1. Sort your lists by using the drop down sort menu to select the method of sorting, then click the SORT button
1. Delete any task by using the delte button, the app will ask you to confim that you want to delete
1. Check out your ability to estimate on the complete table's +/- column.
    1. If the number is positive, it took took you less time than what you estimated
    1. If the number is negative, it took took you more time than what you estimated

## Built With
* jQuery

## Acknowledgement
Huge thanks to everyone over at [Prime Digital Academy](https://primeacademy.io/) for teaching me the skills to pull of my first CRUD app!
