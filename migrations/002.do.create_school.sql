CREATE TABLE school (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    school_name TEXT NOT NULL,
    director TEXT NOT NULL,
    federal_setting INTEGER NOT NULL
);