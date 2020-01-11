create or replace view authors as
select id, last_name, first_name from data.author;
alter view authors owner to api;

create or replace view excerpts as
select id, text from data.excerpt;
alter view excerpts owner to api;

create or replace view "references" as
select id, topic_id, subtopic_id, author, summary_id, excerpt_id, work_id, volume, page_start, page_end from data.reference;
alter view "references" owner to api;

create or replace view referrers as
select id, last_name, first_name from data.referrer;
alter view referrers owner to api;

create or replace view subtopics as
select id, topic_id, referrer_id, description from data.subtopic;
alter view subtopics owner to api;

create or replace view summaries as
select id, summary from data.summary;
alter view summaries owner to api;

create or replace view topics as
select id, name, subtopics from data.topic;
alter view topics owner to api;

create or replace view translators as
select id, primary_trans, secondary_trans from data.translator;
alter view translators owner to api;

create or replace view works as
select id, author, title, translator from data.work;
alter view works owner to api;