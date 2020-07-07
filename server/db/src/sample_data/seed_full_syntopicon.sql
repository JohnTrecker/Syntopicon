set search_path = data, public;

-- fill table author (130)
\echo # filling table author (130)
\COPY data.author (id,last_name,first_name) FROM '/docker-entrypoint-initdb.d/data/csv/author.csv' WITH DELIMITER ',' CSV HEADER;

-- fill table translator (130)
\echo # filling table translator (130)
\COPY data.translator (id,primary_trans,secondary_trans) FROM '/docker-entrypoint-initdb.d/data/csv/translator.csv' WITH DELIMITER ',' CSV HEADER;

-- fill table work (361)
\echo # filling table work (361)
\COPY data.work (id,volume_id,author_id,author,title,translator) FROM '/docker-entrypoint-initdb.d/data/csv/work.csv' WITH DELIMITER ',' CSV HEADER;

-- fill table referrer (1)
\echo # filling table referrer(1)
\COPY data.referrer (id,user_id,last_name,first_name) FROM '/docker-entrypoint-initdb.d/data/csv/referrer.csv' WITH DELIMITER ',' CSV HEADER;

-- fill table topic (102)
\echo # filling table topic (102)
\COPY data.topic (id,referrer_id,name,subtopics) FROM '/docker-entrypoint-initdb.d/data/csv/topic.csv' WITH DELIMITER ',' CSV HEADER;

-- fill table subtopic (3026)
\echo # filling table subtopic (3026)
\COPY data.subtopic (id,topic_id,alt_id,referrer_id,description) FROM '/docker-entrypoint-initdb.d/data/csv/subtopic.csv' WITH DELIMITER ',' CSV HEADER;

-- fill table summary (37784)
\echo # filling table summary (37784)
\COPY data.summary (id,summary,alt_id) FROM '/docker-entrypoint-initdb.d/data/csv/summary.csv' WITH DELIMITER ',' CSV HEADER;

-- fill table excerpt (37784)
\echo # filling table excerpt (37784)
\COPY data.excerpt (id,alt_id,text,reference_id) FROM '/docker-entrypoint-initdb.d/data/csv/excerpt.csv' WITH DELIMITER ',' CSV HEADER;

-- fill table reference (96249)
\echo # filling table reference (96249)
\COPY data.reference (id,topic_id,subtopic_id,author_id,work_id,author,volume,page_start,page_end,notes,summary_id,excerpt_id,referrer_id,upvotes,downvotes) FROM '/docker-entrypoint-initdb.d/data/csv/reference.csv' WITH DELIMITER ',' CSV HEADER;


-- restart sequences
ALTER SEQUENCE author_id_seq RESTART WITH 131;
ALTER SEQUENCE translator_id_seq RESTART WITH 131;
ALTER SEQUENCE work_id_seq RESTART WITH 362;
ALTER SEQUENCE referrer_id_seq RESTART WITH 2;
ALTER SEQUENCE topic_id_seq RESTART WITH 103;
ALTER SEQUENCE subtopic_id_seq RESTART WITH 3027;
ALTER SEQUENCE summary_id_seq RESTART WITH 37785;
ALTER SEQUENCE excerpt_id_seq RESTART WITH 37785;
ALTER SEQUENCE reference_id_seq RESTART WITH 96250;
--
-- analyze modified tables
ANALYZE author;
ANALYZE translator;
ANALYZE work;
ANALYZE topic;
ANALYZE subtopic;
ANALYZE excerpt;
ANALYZE summary;
ANALYZE referrer;
ANALYZE reference;