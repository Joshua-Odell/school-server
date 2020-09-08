copy (select staff.email as "Email Address",
student.student_last_name as "Student Last Name",
student.student_first_name  as "Student First Name",
school.director as "Assistant Director/Principal",
student.marss as "MARSS Number",
student.disability as "Disability",
school.federal_setting as "Federal Setting",
student.age as "Age",
student.ethnicity as "Race/Ethnicity",
student.gender as "Gender",
incident.date as "Date",
holds.hold_type as "Physical Holding",
incident.seclusion as "Seclusion",
incident.reasonable_force as "Reasonable Force",
holds.start_time as "Start Time (Hour:Minutes)",
holds.stop_time as "Stop Time (Hour:Minutes)",
holds.duration as "Length/Duration",
incident.day_of_the_week as "Day of Week",
incident.student_injury as "STUDENT injury during restrictive procedure",
incident.staff_injury as "STAFF injury during restrictive procedure",
incident.law_enforcement as "Law Enforcement Involved",
school.school_name as "Building/Site",
student.program as "Program",
incident.major_disruption as "Major Disruption"
from holds
inner join incident on incident.hold_1 = holds.id
inner join school on incident.school = school.id 
inner join student on incident.student_marss = student.marss
inner join staff on incident.staff_submitter = staff.staff_name
where incident.approved = true 
union 
select staff.email as "Email Address",
student.student_last_name as "Student Last Name",
student.student_first_name  as "Student First Name",
school.director as "Assistant Director/Principal",
student.marss as "MARSS Number",
student.disability as "Disability",
school.federal_setting as "Federal Setting",
student.age as "Age",
student.ethnicity as "Race/Ethnicity",
student.gender as "Gender",
incident.date as "Date",
holds.hold_type as "Physical Holding",
incident.seclusion as "Seclusion",
incident.reasonable_force as "Reasonable Force",
holds.start_time as "Start Time (Hour:Minutes)",
holds.stop_time as "Stop Time (Hour:Minutes)",
holds.duration as "Length/Duration",
incident.day_of_the_week as "Day of Week",
incident.student_injury as "STUDENT injury during restrictive procedure",
incident.staff_injury as "STAFF injury during restrictive procedure",
incident.law_enforcement as "Law Enforcement Involved",
school.school_name as "Building/Site",
student.program as "Program",
incident.major_disruption as "Major Disruption"
from holds
inner join incident on incident.hold_2 = holds.id
inner join school on incident.school = school.id 
inner join student on incident.student_marss = student.marss
inner join staff on incident.staff_submitter = staff.staff_name
where incident.approved = true
union 
select staff.email as "Email Address",
student.student_last_name as "Student Last Name",
student.student_first_name  as "Student First Name",
school.director as "Assistant Director/Principal",
student.marss as "MARSS Number",
student.disability as "Disability",
school.federal_setting as "Federal Setting",
student.age as "Age",
student.ethnicity as "Race/Ethnicity",
student.gender as "Gender",
incident.date as "Date",
holds.hold_type as "Physical Holding",
incident.seclusion as "Seclusion",
incident.reasonable_force as "Reasonable Force",
holds.start_time as "Start Time (Hour:Minutes)",
holds.stop_time as "Stop Time (Hour:Minutes)",
holds.duration as "Length/Duration",
incident.day_of_the_week as "Day of Week",
incident.student_injury as "STUDENT injury during restrictive procedure",
incident.staff_injury as "STAFF injury during restrictive procedure",
incident.law_enforcement as "Law Enforcement Involved",
school.school_name as "Building/Site",
student.program as "Program",
incident.major_disruption as "Major Disruption"
from holds
inner join incident on incident.hold_3 = holds.id
inner join school on incident.school = school.id 
inner join student on incident.student_marss = student.marss
inner join staff on incident.staff_submitter = staff.staff_name
where incident.approved = true
union 
select staff.email as "Email Address",
student.student_last_name as "Student Last Name",
student.student_first_name  as "Student First Name",
school.director as "Assistant Director/Principal",
student.marss as "MARSS Number",
student.disability as "Disability",
school.federal_setting as "Federal Setting",
student.age as "Age",
student.ethnicity as "Race/Ethnicity",
student.gender as "Gender",
incident.date as "Date",
holds.hold_type as "Physical Holding",
incident.seclusion as "Seclusion",
incident.reasonable_force as "Reasonable Force",
holds.start_time as "Start Time (Hour:Minutes)",
holds.stop_time as "Stop Time (Hour:Minutes)",
holds.duration as "Length/Duration",
incident.day_of_the_week as "Day of Week",
incident.student_injury as "STUDENT injury during restrictive procedure",
incident.staff_injury as "STAFF injury during restrictive procedure",
incident.law_enforcement as "Law Enforcement Involved",
school.school_name as "Building/Site",
student.program as "Program",
incident.major_disruption as "Major Disruption"
from holds
inner join incident on incident.hold_4 = holds.id
inner join school on incident.school = school.id 
inner join student on incident.student_marss = student.marss
inner join staff on incident.staff_submitter = staff.staff_name
where incident.approved = true
union 
select staff.email as "Email Address",
student.student_last_name as "Student Last Name",
student.student_first_name  as "Student First Name",
school.director as "Assistant Director/Principal",
student.marss as "MARSS Number",
student.disability as "Disability",
school.federal_setting as "Federal Setting",
student.age as "Age",
student.ethnicity as "Race/Ethnicity",
student.gender as "Gender",
incident.date as "Date",
holds.hold_type as "Physical Holding",
incident.seclusion as "Seclusion",
incident.reasonable_force as "Reasonable Force",
holds.start_time as "Start Time (Hour:Minutes)",
holds.stop_time as "Stop Time (Hour:Minutes)",
holds.duration as "Length/Duration",
incident.day_of_the_week as "Day of Week",
incident.student_injury as "STUDENT injury during restrictive procedure",
incident.staff_injury as "STAFF injury during restrictive procedure",
incident.law_enforcement as "Law Enforcement Involved",
school.school_name as "Building/Site",
student.program as "Program",
incident.major_disruption as "Major Disruption"
from holds
inner join incident on incident.hold_5 = holds.id
inner join school on incident.school = school.id 
inner join student on incident.student_marss = student.marss
inner join staff on incident.staff_submitter = staff.staff_name
where incident.approved = true)
to 'C:\projects\school-client\Reference\data-return' with csv header ;
