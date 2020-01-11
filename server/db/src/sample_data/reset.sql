BEGIN;
\set QUIET on
\set ON_ERROR_STOP on
set client_min_messages to warning;
truncate data.todo restart identity cascade;
truncate data.user restart identity cascade;
truncate data.author restart identity cascade;
truncate data.excerpt restart identity cascade;
truncate data.reference restart identity cascade;
truncate data.referrer restart identity cascade;
truncate data.subtopic restart identity cascade;
truncate data.summary restart identity cascade;
truncate data.topic restart identity cascade;
truncate data.translator restart identity cascade;
truncate data.work restart identity cascade;
\ir data.sql
COMMIT;