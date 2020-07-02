
create or replace function search_topics(query text) returns setof topics as $$
select * from topics where name like query
$$ stable language sql;

create or replace function search_subtopics(query text) returns setof subtopics as $$
select * from subtopics where description like query
$$ stable language sql;

create or replace function search_works(query text) returns setof works as $$
select * from works where title like query
$$ stable language sql;
