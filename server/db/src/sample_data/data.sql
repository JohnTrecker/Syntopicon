set search_path = data, public;

-- fill table user (2)
\echo # filling table "user" (2)
INSERT INTO "user" (id,name,email,"password") VALUES
(1,'mortimer','adler@email.com','pass'),
(2,'alice','alice@email.com','pass'),
(3,'bob','bob@email.com','pass')
;

-- fill table todo (6)
\echo # filling table todo (6)
INSERT INTO todo (id,todo,private,owner_id) VALUES
(1,'item_1',FALSE,1),
(2,'item_2',TRUE,1),
(3,'item_3',FALSE,1),
(4,'item_4',TRUE,2),
(5,'item_5',TRUE,2),
(6,'item_6',FALSE,2)
;
--

\COPY data.author (id,last_name,first_name) FROM '/docker-entrypoint-initdb.d/sample_data/csv/author.csv' WITH DELIMITER ',' CSV HEADER;
\COPY data.translator (id,primary_trans,secondary_trans) FROM '/docker-entrypoint-initdb.d/sample_data/csv/translator.csv' WITH DELIMITER ',' CSV HEADER;
\COPY data.work (id,volume_id,author_id,author,title,translator) FROM '/docker-entrypoint-initdb.d/sample_data/csv/work.csv' WITH DELIMITER ',' CSV HEADER;
\COPY data.referrer (id,user_id,last_name,first_name) FROM '/docker-entrypoint-initdb.d/sample_data/csv/referrer.csv' WITH DELIMITER ',' CSV HEADER;
\COPY data.topic (id,referrer_id,name,subtopics) FROM '/docker-entrypoint-initdb.d/sample_data/csv/topic.csv' WITH DELIMITER ',' CSV HEADER;
\COPY data.subtopic (id,topic_id,alt_id,referrer_id,description) FROM '/docker-entrypoint-initdb.d/sample_data/csv/subtopic.csv' WITH DELIMITER ',' CSV HEADER;
\COPY data.summary (id,summary,alt_id) FROM '/docker-entrypoint-initdb.d/sample_data/csv/summary.csv' WITH DELIMITER ',' CSV HEADER;
\COPY data.excerpt (id,alt_id,text) FROM '/docker-entrypoint-initdb.d/sample_data/csv/excerpt.csv' WITH DELIMITER ',' CSV HEADER;
\COPY data.reference (id,topic_id,subtopic_id,author_id,work_id,author,volume,page_start,page_end,notes,summary_id,excerpt_id,referrer_id,upvotes,downvotes) FROM '/docker-entrypoint-initdb.d/sample_data/csv/reference.csv' WITH DELIMITER ',' CSV HEADER;

-- fill table author (6)
-- \echo # filling table author (6)
-- INSERT INTO author (id,last_name,first_name) VALUES
-- (1,'Homer',NULL),
-- (2,'Aeschylus',NULL),
-- (3,'Sophocles',NULL),
-- (4,'Aristophanes',NULL),
-- (5,'Herodotus',NULL),
-- (6,'Thucydides',NULL)
-- ;
--


-- fill table translator (6)
-- \echo # filling table translator (6)
-- INSERT INTO translator (id,primary_trans,secondary_trans) VALUES
-- (1,'Richmond Lattimore',NULL),
-- (2,'Seth G. Benardete',NULL),
-- (3,'David Grene',NULL),
-- (4,'Robert Fitzgerald',NULL),
-- (5,'Elizabeth Wyckoff',NULL),
-- (6,'John Moore',NULL)
-- ;
--

-- fill table work (6)
-- \echo # filling table work (6)
-- INSERT INTO work (id,volume_id,author_id,author,title,translator) VALUES
-- (1,3,1,'Homer','The Iliad','Richmond Lattimore'),
-- (2,3,1,'Homer','The Odyssey','Richmond Lattimore'),
-- (3,4,2,'Aeschylus','The Suppliant Maidens','Seth G. Benardete'),
-- (4,4,2,'Aeschylus','The Persians','Seth G. Benardete'),
-- (5,4,2,'Aeschylus','Seven Against Thebes','David Grene'),
-- (6,4,2,'Aeschylus','Prometheus Bound','David Grene')
-- ;
--

-- fill table referrer (1)
-- \echo # filling table referrer (1)
-- INSERT INTO referrer (id,user_id,last_name,first_name) VALUES
-- (1,1,'Adler','Mortimer')
-- ;
--

-- fill table topic (6)
-- \echo # filling table topic (6)
-- INSERT INTO topic (id,referrer_id,name,subtopics) VALUES
-- (1,1,'Angel','[{"id": 1, "number": "1", "subtopic": "Inferior deities or demigods in polytheistic religion", "subtopics": []}]'),
-- (2,1,'Animal','[{"id": 24, "number": "1", "subtopic": "General theories about the animal nature", "subtopics": []}]'),
-- (3,1,'Aristocracy','[{"id": 89, "number": "1", "subtopic": "The general theory and evaluation of aristocracy", "subtopics": []}]'),
-- (4,1,'Art','[{"id": 103, "number": "1", "subtopic": "The generic notion of art: skill of mind in making", "subtopics": []}]'),
-- (5,1,'Astronomy and Cosmology','[{"id": 129, "number": "1", "subtopic": "Astronomy as the study of the solar system and the empyrean: its dignity and utility", "subtopics": []}]'),
-- (6,1,'Beauty','[{"id": 166, "number": "1", "subtopic": "The general theory of the beautiful", "subtopics": []}]')
-- ;
--

-- fill table subtopic (6)
-- \echo # filling table subtopic (6)
-- INSERT INTO subtopic (id,topic_id,alt_id,referrer_id,description) VALUES
-- (1,1,'1',1,'Inferior deities or demigods in polytheistic religion'),
-- (2,1,'2',1,'The philosophical consideration of pure intelligences, spiritual substances, suprahuman persons'),
-- (3,1,'2.a',1,'The celestial motors or secondary prime movers: the intelligences attached to the celestial bodies'),
-- (4,1,'2.b',1,'Our knowledge of immaterial beings'),
-- (5,1,'3',1,'The conception of angels in Judeo-Christian doctrine'),
-- (6,1,'3.a',1,'The first creatures of God: their place in the order of creation')
-- ;
--

-- fill table summary (6)
-- \echo # filling table summary (6)
-- INSERT INTO summary (id,summary,alt_id) VALUES
-- (1,'So Aphrodite went back into the house...',NULL),
-- (2,'And there might have been wrought another anger...',NULL),
-- (3,'He cast on the fire bronze which is weariless...',NULL),
-- (4,'First of the two Aineias had strode forth in menace...',NULL),
-- (5,'Meanwhile Apollo [539] sprang out to meet them....',NULL),
-- (6,'But now he lies away on an island suffering strong pains...',NULL)
-- ;
--

-- fill table excerpt (6)
-- \echo # filling table excerpt (6)
-- INSERT INTO excerpt (id,alt_id,text) VALUES
-- (1,NULL,'[121] He married one of the daughters of Adrestos...'),
-- (2,NULL,'[481] and sorrow, but you too must sometimes die...'),
-- (3,NULL,'[356] But Zeus spoke to Hera, who was his wife and his sister: ...'),
-- (4,NULL,'[128] But if Achilleus does not hear all this from gods'' voices ...'),
-- (5,NULL,'[340] Do not let your fury be stopped until such time as [341] I lift my voice and cry to you...'),
-- (6,NULL,'[839] Ikarios'' daughter [840] started up from her sleep, soothed in the inward heart...')
-- ;
--

-- fill table reference (6)
-- \echo # filling table reference (6)
-- INSERT INTO reference (id,topic_id,subtopic_id,author_id,work_id,author,volume,page_start,page_end,notes,summary_id,excerpt_id,referrer_id,upvotes,downvotes) VALUES
-- (1,1,1,1,1,'Homer',3,167,171,NULL,1,1,1,0,0),
-- (2,1,1,1,1,'Homer',3,174,179,NULL,2,2,1,0,0),
-- (3,1,1,1,1,'Homer',3,228,230,NULL,3,3,1,0,0),
-- (4,1,1,1,1,'Homer',3,244,NULL,NULL,4,4,1,0,0),
-- (5,1,1,1,1,'Homer',3,258,261,NULL,5,5,1,0,0),
-- (6,1,1,1,2,'Homer',3,350,353,NULL,6,6,1,0,0)
-- ;
--

-- restart sequences
ALTER SEQUENCE user_id_seq RESTART WITH 3;
ALTER SEQUENCE todo_id_seq RESTART WITH 7;
ALTER SEQUENCE author_id_seq RESTART WITH 131;
-- ALTER SEQUENCE author_id_seq RESTART WITH 7;
ALTER SEQUENCE translator_id_seq RESTART WITH 131;
ALTER SEQUENCE work_id_seq RESTART WITH 362;
ALTER SEQUENCE topic_id_seq RESTART WITH 103;
ALTER SEQUENCE subtopic_id_seq RESTART WITH 3027;
ALTER SEQUENCE excerpt_id_seq RESTART WITH 37785;
ALTER SEQUENCE summary_id_seq RESTART WITH 37785;
ALTER SEQUENCE referrer_id_seq RESTART WITH 2;
ALTER SEQUENCE reference_id_seq RESTART WITH 96250;
--
-- analyze modified tables
ANALYZE "user";
ANALYZE todo;
ANALYZE author;
ANALYZE translator;
ANALYZE work;
ANALYZE topic;
ANALYZE subtopic;
ANALYZE excerpt;
ANALYZE summary;
ANALYZE referrer;
ANALYZE reference;