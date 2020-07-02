set search_path = data, public;

-- fill table user (3)
\echo # filling table "user" (3)
INSERT INTO "user" (id,name,email,"password") VALUES
(1,'alice','alice@email.com','pass'),
(2,'bob','bob@email.com','pass'),
(3,'mortimer','adler@email.com','pass')
;

ALTER SEQUENCE user_id_seq RESTART WITH 4;
ANALYZE data.user;