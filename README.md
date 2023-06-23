# Stadium-Ticket-Booking-System

# Description
Users will be able to book up to 10 tickets at once. Cancellation of a single ticket is allowed even if multiple tickets are booked. Users can pre-order food and book a parking slot while booking their tickets. 
Everyone who booked tickets for a match receives an email whenever a match is canceled due to unforeseen circumstances. One can know the information about upcoming matches at least a month before and be able to cancel his ticket any time before the match day for a refund of half the ticket price.
One can view their profile after logging in successfully which contains information about their booked tickets and canceled tickets.

# Views
This folder contains all the ejs files which contains all the html codes along with their stylings. Views folder contains codes for pages like book ticket, cancel ticket, view profile, admin rights etc.

# Controllers
This folder contains an auth_controller file which contains all the functions to be executed when they are called by router.

# Routes
This folder contains two files, auth_route and pages whose function is to create a route and rendering to pages when they are called by the router.

# App.js
This is a javascript file which has to be run on the terminal using command 'nodemon app.js' to start the application on local host. This is made using Node JS.

# Database.sql
This SQL file contains complete sql code to be run on MySQL workbench to create a database along with tables.

# ER_Diagram
This contains entity relationship of the database.

# Stadium_ticket.mwb
This contains relational schema of the database.

# How to use the website?
Create database in MySQL workbench with the sql code in Database.sql file. Change the credentials in .env file. Then run app.js file in the terminal using command 'nodemon app.js' and there you go, your application is now running on local host with port number 3000.
