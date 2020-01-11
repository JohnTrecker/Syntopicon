\echo # Loading roles privilege

-- this file contains the privileges of all aplications roles to each database entity
-- if it gets too long, you can split it one file per entity ore move the permissions
-- to the file where you defined the entity

-- specify which application roles can access this api (you'll probably list them all)
grant usage on schema api to anonymous, webuser;

-- set privileges to all the auth flow functions
grant execute on function api.login(text,text) to anonymous;
grant execute on function api.signup(text,text,text) to anonymous;
grant execute on function api.me() to webuser;
grant execute on function api.login(text,text) to webuser;
grant execute on function api.refresh_token() to webuser;

-- define the who can access todo model data
-- enable RLS on the table holding the data
alter table data.todo enable row level security;
-- define the RLS policy controlling what rows are visible to a particular application user
create policy todo_access_policy on data.todo to api
using (
	-- the authenticated users can see all his todo items
	-- notice how the rule changes based on the current user_id
	-- which is specific to each individual request
	(request.user_role() = 'webuser' and request.user_id() = owner_id)

	or
	-- everyone can see public todo
	(private = false)
)
with check (
	-- authenticated users can only update/delete their todos
	(request.user_role() = 'webuser' and request.user_id() = owner_id)
);


-- give access to the view owner to this table
grant select, insert, update, delete on
data.todo, data.author, data.excerpt, data.reference, data.subtopic, data.summary, data.topic, data.work
to api;

grant usage on
data.todo_id_seq, data.author_id_seq, data.author_id_seq, data.excerpt_id_seq, data.reference_id_seq, data.subtopic_id_seq, data.summary_id_seq, data.topic_id_seq, data.work_id_seq
to webuser;

-- grant select, insert, update, delete on data.author to api;
-- grant usage on data.author_id_seq to webuser;

-- While grants to the view owner and the RLS policy on the underlying table
-- takes care of what rows the view can see, we still need to define what
-- are the rights of our application user in regard to this api view.

-- authenticated users can request/change all the columns for this view
grant select, insert, update, delete on
api.todos, api.authors, api.subtopics, api.topics, api.summaries, api.references, api.works
to webuser;
-- grant select, insert, update, delete on api.authors to webuser;
-- grant select, insert, update, delete on api.translators to webuser;
-- grant select, insert, update, delete on api.works to webuser;
-- grant select, insert, update, delete on api.references to webuser;
-- grant select, insert, update, delete on api.referrers to webuser;
-- grant select, insert, update, delete on api.topics to webuser;
-- grant select, insert, update, delete on api.subtopics to webuser;
-- grant select, insert, update, delete on api.excerpts to webuser;
-- grant select, insert, update, delete on api.summaries to webuser;

-- anonymous users can only request specific columns from this view
grant select (id, todo) on api.todos to anonymous;
grant select (id, last_name, first_name) on api.authors to anonymous;
-- grant select (id, primary_trans, secondary_trans) on api.translators to anonymous;
grant select (id, author, title, translator) on api.works to anonymous;
grant select (id, author, volume, page_start, page_end) on api.references to anonymous;
-- grant select (id, first_name, last_name) on api.referrers to anonymous;
grant select (id, name, subtopics) on api.topics to anonymous;
grant select (id, topic_id, referrer_id, description) on api.subtopics to anonymous;
grant select (id, text) on api.excerpts to anonymous;
grant select (id, summary) on api.summaries to anonymous;
-------------------------------------------------------------------------------

-- set search_path = data, public;

grant select, insert, update, delete on api.authors to api;
