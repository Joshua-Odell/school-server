CREATE TABLE staff (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    staff_name TEXT NOT NULL,
    job_title TEXT NOT NULL,
    email TEXT NOT NULL    
);