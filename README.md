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

## Endpoints

#### '/'

POST request

##### Data:

Required:

the student's Marss number (integer),
staff submitter name (string),
school (string),
date (date),
day of the week (string),
narrative (string),
administration notified (boolean),
parent notified (boolean),
parent engaged (boolean),
parent notified of rights (boolean),
was an IEP meeting held (boolean),
student debriefing conducted (boolean),
staff debriefing conducted (boolean),
was seclusion used (boolean),
was force beyond approved holds necessary and if so what type of force was used (string),
was a student hurt (boolean),
was a staff member hurt (boolean),
was law enforcement involved (boolean),
which room did the incident take place in (string).
antecedent (string),
contributing variables (string),
was the incident a major disruption and if so what type (string)

Optional:

behavior type (array),
parent notification date and time(date, time),
holds 1-5 (FK id),
list of involved staff (array)

##### Success Response

status: 201
json: created incident id

##### Failure Response

status: 400

##### Notes

Some fields of the post request are calculated from indirect input fields

#### '/studentcheck/:marss/:student_last_name'

GET request

##### Params

Required:

student Marss (integer),
student last name (string),

##### Success Response

status: 200
json: 'Students Presence Confirmed'

##### Failure Response

status: 400

##### Example

'/studentcheck/123457/Lovegood'

##### Notes

This endpoint is not meant to be called independently. It's purpose is to validate an entered student during form submission.

#### '/staffcheck/:staff_name'

GET request

##### Params

Required:

staff name (string)

##### Success Response

status: 200
json: staff entry

##### Failure Response

status: 404
json: 'Not a valid Staff member'

##### Example

'/staffcheck/Tom Hagen'

##### Notes

Similarly to student check this endpoint is used to validate submitter information as well as the presence of referenced staff in the involved list

#### '/hold'

POST request

##### Data

Required:

hold type (string),
start time (time),
stop time (time),
duration (string)

##### Success Response

status: 201
json: hold id

##### Failure Response

status: 400

##### Example

'/hold'

##### Notes

Each hold used gets its own entry in the database that is then referenced in the greater incident table.

#### '/pdf/:id'

GET request

##### Params

Required:

incident id (integer)

##### Success Response

status: 200

##### Failure Response

status: 400

##### Example

'/pdf/5'

##### Notes

This is an internal endpoint that generates a PDF incident report for each incident on completion.

#### '/conformationpage/:id

GET request

##### Params

Required:

incident id (integer)

##### Success Response

status: 200
json: Select information from the incident that is the least protected

##### Failure Response

status: 404
json: 'Incident Not Found' or 'This Incident was already approved'

##### Example

'/conformationpage/5'

##### Notes

This endpoint is used so that after submission the designated approver can approve or return the incident before its entry into the final data system. Since the approver has already received the pdf the information returned is only enough to confirm that they are commenting on the correct incident. This is to reduce unnecessary transmission of sensitive information.This link is emailed with the pdf and is not intended for general use.

#### '/conformationpage/:id'

PATCH request

##### Params

Required:

incident id (integer)

##### Data

Required:

approval (boolean),
comments (string)

##### Success Response

status: 200
json: 'incident updated'

##### Failure Response

status: 404
json: 'Invalid Request

##### Example

'/conformationpage/5'

##### Notes

This is used to actually update the incident with the relevant response. This also triggers an email with revision request if submitter returns the incident.
