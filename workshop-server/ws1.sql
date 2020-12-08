\c workshop
DROP DATABASE IF EXISTS workshop;
CREATE DATABASE workshop;
\c workshop
CREATE TABLE workshops (
	        id SERIAL PRIMARY KEY,
		workshop TEXT NOT NULL,
	        attendee TEXT
	);
	GRANT SELECT, INSERT ON workshops TO marmbrig;
	GRANT USAGE, SELECT ON SEQUENCE workshops_id_seq TO marmbrig;
