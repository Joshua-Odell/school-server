--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: disability_list; Type: TYPE; Schema: public; Owner: dunder_mifflin
--

CREATE TYPE public.disability_list AS ENUM (
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


ALTER TYPE public.disability_list OWNER TO dunder_mifflin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: holds; Type: TABLE; Schema: public; Owner: dunder_mifflin
--

CREATE TABLE public.holds (
    id integer NOT NULL,
    hold_type text NOT NULL,
    start_time time without time zone NOT NULL,
    stop_time time without time zone NOT NULL,
    duration text NOT NULL
);


ALTER TABLE public.holds OWNER TO dunder_mifflin;

--
-- Name: holds_id_seq; Type: SEQUENCE; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE public.holds ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.holds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: incident; Type: TABLE; Schema: public; Owner: dunder_mifflin
--

CREATE TABLE public.incident (
    id integer NOT NULL,
    student_marss integer NOT NULL,
    staff_submitter integer NOT NULL,
    school integer NOT NULL,
    date date NOT NULL,
    day_of_the_week text NOT NULL,
    seclusion boolean NOT NULL,
    resonable_force boolean NOT NULL,
    student_injury boolean NOT NULL,
    staff_injury boolean NOT NULL,
    law_enforcement boolean NOT NULL,
    room_location text NOT NULL,
    hold_1 integer,
    hold_2 integer,
    hold_3 integer,
    hold_4 integer,
    hold_5 integer,
    antecedent text NOT NULL,
    contributing_variables text NOT NULL,
    people_involved text NOT NULL,
    major_disruption text NOT NULL,
    approved boolean DEFAULT false,
    approver integer NOT NULL
);


ALTER TABLE public.incident OWNER TO dunder_mifflin;

--
-- Name: incident_id_seq; Type: SEQUENCE; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE public.incident ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.incident_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: schemaversion; Type: TABLE; Schema: public; Owner: dunder_mifflin
--

CREATE TABLE public.schemaversion (
    version bigint NOT NULL,
    name text,
    md5 text,
    run_at timestamp with time zone
);


ALTER TABLE public.schemaversion OWNER TO dunder_mifflin;

--
-- Name: school; Type: TABLE; Schema: public; Owner: dunder_mifflin
--

CREATE TABLE public.school (
    id integer NOT NULL,
    school_name text NOT NULL,
    director text NOT NULL,
    federal_setting integer NOT NULL
);


ALTER TABLE public.school OWNER TO dunder_mifflin;

--
-- Name: school_id_seq; Type: SEQUENCE; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE public.school ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.school_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: staff; Type: TABLE; Schema: public; Owner: dunder_mifflin
--

CREATE TABLE public.staff (
    id integer NOT NULL,
    staff_name text NOT NULL,
    job_title text NOT NULL,
    email text NOT NULL
);


ALTER TABLE public.staff OWNER TO dunder_mifflin;

--
-- Name: staff_id_seq; Type: SEQUENCE; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE public.staff ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.staff_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: student; Type: TABLE; Schema: public; Owner: dunder_mifflin
--

CREATE TABLE public.student (
    marss integer NOT NULL,
    student_first_name text NOT NULL,
    student_last_name text NOT NULL,
    disability public.disability_list NOT NULL,
    age integer NOT NULL,
    grade integer NOT NULL,
    students_school integer NOT NULL,
    program text NOT NULL,
    iep_manager integer NOT NULL,
    present boolean DEFAULT true
);


ALTER TABLE public.student OWNER TO dunder_mifflin;

--
-- Data for Name: holds; Type: TABLE DATA; Schema: public; Owner: dunder_mifflin
--

COPY public.holds (id, hold_type, start_time, stop_time, duration) FROM stdin;
\.


--
-- Data for Name: incident; Type: TABLE DATA; Schema: public; Owner: dunder_mifflin
--

COPY public.incident (id, student_marss, staff_submitter, school, date, day_of_the_week, seclusion, resonable_force, student_injury, staff_injury, law_enforcement, room_location, hold_1, hold_2, hold_3, hold_4, hold_5, antecedent, contributing_variables, people_involved, major_disruption, approved, approver) FROM stdin;
\.


--
-- Data for Name: schemaversion; Type: TABLE DATA; Schema: public; Owner: dunder_mifflin
--

COPY public.schemaversion (version, name, md5, run_at) FROM stdin;
0	\N	\N	\N
1	create_staff	b4e7699ebba68bc25297987ac849d3a9	2020-09-01 13:36:02.512+00
2	create_school	e8c850d470195f3b910d2945dbcf3642	2020-09-01 13:36:02.521+00
3	create_student	2c22f376ee2ba23df307078c4034ca2e	2020-09-01 13:36:02.531+00
4	create_holds	68872d7b0b655d9f7193249f0fbac54d	2020-09-01 13:36:02.539+00
5	create_incident	7765b2b038ad646c10afbf8dccf8dba7	2020-09-01 13:36:02.55+00
\.


--
-- Data for Name: school; Type: TABLE DATA; Schema: public; Owner: dunder_mifflin
--

COPY public.school (id, school_name, director, federal_setting) FROM stdin;
1	School of Hard Knocks	Ernest Anderson	4
2	Monsters University	Mike Wazowski	3
3	Hogwarts	Professor Dumbledor	2
4	Greendale	Dean Craig Pelton	4
\.


--
-- Data for Name: staff; Type: TABLE DATA; Schema: public; Owner: dunder_mifflin
--

COPY public.staff (id, staff_name, job_title, email) FROM stdin;
1	Vito Corleone	Shot Caller	testemail1
2	Michael Corleone	Reluctant Villian	testemail2
3	Sonny Corleone	Vauge reference to Sinatra	testemail3
4	Fredo Corleone	Spoiler Territory	testemail4
5	Tom Hagen	Serious adopty	testemail5
6	Luca Brasi	Opostion Shot Caller	testemail6
7	Apollonia	Missed Oppritunity for Peace	testemail7
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: dunder_mifflin
--

COPY public.student (marss, student_first_name, student_last_name, disability, age, grade, students_school, program, iep_manager, present) FROM stdin;
123456	Hermione	Granger	ASD	14	4	3	SUN	2	t
123457	Luna	Lovegood	DB	7	9	3	SUN	1	t
123458	Ron	Weasly	D/HH	9	6	3	SUN	3	t
123459	Harry	Potter	EBD	5	8	3	SUN	4	t
123451	Ginny	Weasly	OHD	18	11	3	SUN	5	t
123452	Boo	Girl	PI	5	2	2	SUN	6	t
123453	James	Sullivan	SMI	20	12	2	SUN	7	t
123454	Randall	Boggs	SLD	5	7	2	SUN	1	t
123455	Henry	Waternoose III	SLI	21	12	2	SUN	2	t
123441	George	Sanderson	TBI	6	5	2	SUN	3	t
123442	Al	Capone	ASD	8	6	1	SUN	4	t
123443	Darth	Vader	DCD-MM	15	10	1	SUN	5	t
123444	Sheev	Palpetine	DCD-SP	16	9	1	SUN	6	t
123445	Tom	Riddle	DD 3-6	7	9	1	SUN	7	t
123446	Benedict	Arnold	D/HH	16	4	1	SUN	1	t
123447	Jeff	Winger	DB	8	9	4	SUN	2	t
123448	Britta	Perry	D/HH	11	5	4	SUN	3	t
123449	Pierce	Hawthorne	DCD-MM	10	6	4	SUN	4	t
123430	Annie	Edison	DCD-SP	5	6	4	SUN	5	t
123431	Troy	Barnes	DD 3-6	5	3	4	SUN	6	t
\.


--
-- Name: holds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dunder_mifflin
--

SELECT pg_catalog.setval('public.holds_id_seq', 1, false);


--
-- Name: incident_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dunder_mifflin
--

SELECT pg_catalog.setval('public.incident_id_seq', 1, false);


--
-- Name: school_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dunder_mifflin
--

SELECT pg_catalog.setval('public.school_id_seq', 4, true);


--
-- Name: staff_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dunder_mifflin
--

SELECT pg_catalog.setval('public.staff_id_seq', 7, true);


--
-- Name: holds holds_pkey; Type: CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.holds
    ADD CONSTRAINT holds_pkey PRIMARY KEY (id);


--
-- Name: incident incident_pkey; Type: CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.incident
    ADD CONSTRAINT incident_pkey PRIMARY KEY (id);


--
-- Name: schemaversion schemaversion_pkey; Type: CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.schemaversion
    ADD CONSTRAINT schemaversion_pkey PRIMARY KEY (version);


--
-- Name: school school_pkey; Type: CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.school
    ADD CONSTRAINT school_pkey PRIMARY KEY (id);


--
-- Name: staff staff_pkey; Type: CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (id);


--
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (marss);


--
-- Name: incident incident_approver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.incident
    ADD CONSTRAINT incident_approver_fkey FOREIGN KEY (approver) REFERENCES public.staff(id);


--
-- Name: incident incident_hold_1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.incident
    ADD CONSTRAINT incident_hold_1_fkey FOREIGN KEY (hold_1) REFERENCES public.holds(id);


--
-- Name: incident incident_hold_2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.incident
    ADD CONSTRAINT incident_hold_2_fkey FOREIGN KEY (hold_2) REFERENCES public.holds(id);


--
-- Name: incident incident_hold_3_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.incident
    ADD CONSTRAINT incident_hold_3_fkey FOREIGN KEY (hold_3) REFERENCES public.holds(id);


--
-- Name: incident incident_hold_4_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.incident
    ADD CONSTRAINT incident_hold_4_fkey FOREIGN KEY (hold_4) REFERENCES public.holds(id);


--
-- Name: incident incident_hold_5_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.incident
    ADD CONSTRAINT incident_hold_5_fkey FOREIGN KEY (hold_5) REFERENCES public.holds(id);


--
-- Name: incident incident_school_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.incident
    ADD CONSTRAINT incident_school_fkey FOREIGN KEY (school) REFERENCES public.school(id);


--
-- Name: incident incident_staff_submitter_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.incident
    ADD CONSTRAINT incident_staff_submitter_fkey FOREIGN KEY (staff_submitter) REFERENCES public.staff(id);


--
-- Name: incident incident_student_marss_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.incident
    ADD CONSTRAINT incident_student_marss_fkey FOREIGN KEY (student_marss) REFERENCES public.student(marss);


--
-- Name: student student_iep_manager_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_iep_manager_fkey FOREIGN KEY (iep_manager) REFERENCES public.staff(id);


--
-- Name: student student_students_school_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dunder_mifflin
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_students_school_fkey FOREIGN KEY (students_school) REFERENCES public.school(id);


--
-- PostgreSQL database dump complete
--
