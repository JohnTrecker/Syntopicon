BEGIN;
\set QUIET on
\set ON_ERROR_STOP on
\set processs `echo $ENV_PROCESS`
set client_min_messages to warning;

truncate data.user restart identity cascade;

-- production
truncate data.author restart identity cascade;
truncate data.excerpt restart identity cascade;
truncate data.reference restart identity cascade;
truncate data.referrer restart identity cascade;
truncate data.subtopic restart identity cascade;
truncate data.summary restart identity cascade;
truncate data.topic restart identity cascade;
truncate data.translator restart identity cascade;
truncate data.work restart identity cascade;

-- practice
truncate data.todo restart identity cascade;
truncate data.client restart identity cascade;
truncate data.project restart identity cascade;
truncate data.task restart identity cascade;
truncate data.project_comment restart identity cascade;
truncate data.task_comment restart identity cascade;

\ir seed_users.sql
\ir seed_todos.sql
\ir seed_sample_syntopicon.sql;

COMMIT;