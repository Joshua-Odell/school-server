# Behavior Log -server

This application is a data entry and manipulation software designed to help a level four school for kids with severe behavior problems.The current system they use involves entering redundant information every time an incident occurs which is on a very regular basis. This will streamline the process by reducing the demographic and location information that is entered each time. Instead it makes a call to the database confirming the accuracy of the information and retrieving relevant information. This software also removes the process of manually copying incidents to fill out PDF's. Instead with each creation of an incident the pdf is generated and sent to the assigned approver for comments or final approval. With each approval a fresh csv is generated with all incident information this is used to parse through the data and create relevant graphs automatically. Accurate recording and up to date information is critical to effective treatment of students. This programs ensures that process is streamlined while freeing up the staff to spend their time more effectively.

## Repos:

Client- https://github.com/Joshua-Odell/school-client

Server- https://github.com/Joshua-Odell/school-server

Live App- https://behaviorallog.com/

## Instructions:

To use the app you must first enter the demo credentials. Then when you land on the landing page select the relevant school from the drop down list. This gives you a form specific to this location.

[Landing Search](/Guides/school-selection.jpg)

Next you are prompted to enter your name and email. This will be checked against the staff database upon submission. This email will be used to send adjustment requests.

[Staff Information](/Guides/staff-information.jpg)

Then you are supposed to enter two identifying characteristics of the student. This ensures that the correct student is referenced. This information is checked against the database and relevant demographic information is connected to the incident.

[Student Information Entry](/Guides/student-information.jpg)

The next interactive section is the involved staff section. This checks the name entered against the database to confirm the staff member prior to connecting them to the incident.

[Involved Person Entry](/Guides/involved.jpg)

After the narrative section is the holds. Holds are the primary data source collected relating to incidents. It is important to collect information on each independently. The add hold button will display fields for standard hold types. Seclusion and reasonable force are special types of holds so these will only display when set to "true". Each hold is entered into the database and when they are confirmed then tied to the incident.

[Hold Entry](/Guides/holds.jpg)

Finally you have a list of yes or no questions just before submission.

[Submission](/Guides/submission.jpg)

Upon submission the data goes through its final validation and is submitted to the database. When the submission is successful an Incident Response Form is generated as a unique PDF with the incident id. This is then emailed to the assigned approver with a link. The submitters link leads to a page that gives the basic non-sensitive information about an incident. From here they can approve or return with comments the incident.

[Approval Page](/Guides/approval.jpg)

Upon return the original creator gets email a link to edit their entry and the comments added by approver. Then process continues until acceptance. Upon acceptance every entry marked as approved is returned as a CSV for further manipulation into graphs.

## Demo Information

#### Credentials

Username:

Password:

##### Staff Submitter

Name: Vito Corleone

Email: email

#### Student

Student Last Name: Weasly

MarSS Number: 123458

#### Staff Involved

Name: Luca Brasi
