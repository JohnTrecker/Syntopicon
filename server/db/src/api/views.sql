
-- production
create or replace view authors as
select id, last_name, first_name from data.author;
alter view authors owner to api;

create or replace view excerpts as
select id, text from data.excerpt;
alter view excerpts owner to api;

create or replace view "references" as
select id, topic_id, subtopic_id, author_id, work_id, author, volume, page_start, page_end, notes, summary_id, excerpt_id, referrer_id, upvotes, downvotes from data.reference;
alter view "references" owner to api;

create or replace view referrers as
select id, last_name, first_name from data.referrer;
alter view referrers owner to api;

create or replace view subtopics as
select id, topic_id, alt_id, referrer_id, description from data.subtopic;
alter view subtopics owner to api;

create or replace view summaries as
select id, summary from data.summary;
alter view summaries owner to api;

create or replace view topics as
select id, referrer_id, name, subtopics from data.topic;
alter view topics owner to api;

create or replace view translators as
select id, primary_trans, secondary_trans from data.translator;
alter view translators owner to api;

create or replace view works as
select id, author, title, translator from data.work;
alter view works owner to api;

-- practice
create or replace view clients as
select id, name, address, created_on, updated_on from data.client;

create or replace view projects as
select id, name, client_id, created_on, updated_on from data.project;

create or replace view tasks as
select id, name, completed, project_id, created_on, updated_on from data.task;

create or replace view project_comments as
select id, body, project_id, created_on, updated_on from data.project_comment;

create or replace view task_comments as
select id, body, task_id, created_on, updated_on from data.task_comment;

create or replace view comments as
select 
  id, body, 'project'::text as parent_type, project_id as parent_id, 
  project_id, null as task_id, created_on, updated_on
from data.project_comment
union
select id, body, 'task'::text as parent_type, task_id as parent_id,
  null as project_id, task_id, created_on, updated_on
from data.task_comment;

alter view clients owner to api;
alter view projects owner to api;
alter view tasks owner to api;
alter view comments owner to api;