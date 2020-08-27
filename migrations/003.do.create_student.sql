CREATE TYPE disability_list AS ENUM (
    'ASD',
    'DB',
    'D/HH',
    'DCD-MM',
    'DCD-SP',
    'DD 3-6',
    'EBD',
    'OHD',
    'PI',
    'SMI',
    'SLD',
    'SLI',
    'TBI'
);

CREATE TABLE student (
    marss INTEGER PRIMARY KEY NOT NULL,
    student_first_name TEXT NOT NULL,
    student_last_name TEXT NOT NULL,
    disability disability_list NOT NULL,
    age INTEGER NOT NULL,
    grade INTEGER NOT NULL,
    students_school INTEGER REFERENCES school(id) NOT NULL,
    program TEXT NOT NULL,
    iep_manager INTEGER REFERENCES staff(id) NOT NULL,
    present BOOLEAN DEFAULT true
);