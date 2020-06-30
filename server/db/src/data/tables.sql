-- production

create table author (
  id           serial primary key,
  last_name    text not null,
  first_name   text,
  created_on   timestamptz not null default now(),
  updated_on   timestamptz

  check (length(last_name)>2 and length(last_name)<100),
  check (updated_on is null or updated_on > created_on)
);


create table translator (
  id              serial primary key,
  primary_trans   text,
  secondary_trans text,
  created_on      timestamptz not null default now(),
  updated_on      timestamptz

  check (updated_on is null or updated_on > created_on)
);


create table work (
  id           serial primary key,
  volume_id    int,
  author_id    int not null references "author"(id),
  author       text not null,
  title        text not null,
  translator   text,
  created_on   timestamptz not null default now(),
  updated_on   timestamptz

  check (length(title)>2 and length(title)<100),
  check (updated_on is null or updated_on > created_on)  
);
create index work_author_id_index on work(author_id);

-- TODO: add author (author as referrer?) ; add user_id for RLS? ; deprecate table and replace with data.user?
create table referrer (
  id           serial primary key,
  user_id      int references "user"(id),
  last_name    text not null,
  first_name   text not null,
  created_on   timestamptz not null default now(),
  updated_on   timestamptz

  check (length(first_name)>2 and length(first_name)<100),
  check (length(last_name)>2 and length(last_name)<100),
  check (updated_on is null or updated_on > created_on)  
);
create index referrer_user_id_index on referrer(user_id);


create table topic (
  id           serial primary key,
  referrer_id  int not null references "referrer"(id),
  name         text not null,
  subtopics    json,
  created_on   timestamptz not null default now(),
  updated_on   timestamptz

  check (length(name)>2 and length(name)<100),
  check (updated_on is null or updated_on > created_on)  
);
create index topic_referrer_id_index on topic(referrer_id);


create table subtopic (
  id           serial primary key,
  topic_id     int not null references "topic"(id),
  alt_id       text,
  referrer_id  int not null references "referrer"(id),
  description  text not null,
  created_on   timestamptz not null default now(),
  updated_on   timestamptz

  check (length(description)>2 and length(description)<300),
  check (updated_on is null or updated_on > created_on)  
);
create index subtopic_topic_id_index on subtopic(topic_id);
create index subtopic_referrer_id_index on subtopic(referrer_id);


create table summary (
  id           serial primary key,
  summary      text not null,
  alt_id       text,
  created_on   timestamptz not null default now(),
  updated_on   timestamptz

  check (length(summary)>5),
  -- check (length(summary)>5 and length(summary)<3000),
  check (updated_on is null or updated_on > created_on)  
);


create table excerpt (
  id           serial primary key,
  alt_id       text,
  text         text not null,
  reference_id int,
  created_on   timestamptz not null default now(),
  updated_on   timestamptz

  -- check (length(text)>5 and length(text)<500000),
  check (updated_on is null or updated_on > created_on)  
);


create table reference (
  id           serial primary key,
  topic_id     int not null references "topic"(id),
  subtopic_id  int not null references "subtopic"(id),
  author_id    int not null references "author"(id),
  work_id      int not null references "work"(id),
  summary_id   int not null references "summary"(id),
  excerpt_id   int not null references "excerpt"(id),
  referrer_id  int not null references "referrer"(id),
  author       text not null,
  volume       int,
  page_start   text not null,
  page_end     text,
  notes        text,
  upvotes      int not null default 0,
  downvotes    int not null default 0,
  created_on   timestamptz not null default now(),
  updated_on   timestamptz

  check (length(notes)<3000),
  check (updated_on is null or updated_on > created_on)  
);
create index reference_topic_id_index on reference(topic_id);
create index reference_subtopic_id_index on reference(subtopic_id);
create index reference_author_id_index on reference(author_id);
create index reference_work_id_index on reference(work_id);
create index reference_summary_id_index on reference(summary_id);
create index reference_excerpt_id_index on reference(excerpt_id);
create index reference_referrer_id_index on reference(referrer_id);


-- practice
create table client (
  id           serial primary key,
  name         text not null,
  address      text,
  user_id      int not null references "user"(id) default request.user_id(),
  created_on   timestamptz not null default now(),
  updated_on   timestamptz

  check (length(name)>2 and length(name)<100),
  check (updated_on is null or updated_on > created_on)
);
create index client_user_id_index on client(user_id);

create table project (
  id           serial primary key,
  name         text not null,
  client_id    int not null references client(id),
  user_id      int not null references "user"(id) default request.user_id(),
  created_on   timestamptz not null default now(),
  updated_on   timestamptz
);
create index project_user_id_index on project(user_id);
create index project_client_id_index on project(client_id);

create table task (
  id           serial primary key,
  name         text not null,
  completed    bool not null default false,
  project_id   int not null references project(id),
  user_id      int not null references "user"(id) default request.user_id(),
  created_on   timestamptz not null default now(),
  updated_on   timestamptz
);
create index task_user_id_index on task(user_id);
create index task_project_id_index on task(project_id);

create table project_comment (
  id           serial primary key,
  body         text not null,
  project_id   int not null references project(id),
  user_id      int not null references "user"(id) default request.user_id(),
  created_on   timestamptz not null default now(),
  updated_on   timestamptz
);
create index project_comment_user_id_index on project_comment(user_id);
create index project_comment_project_id_index on project_comment(project_id);

create table task_comment (
  id           serial primary key,
  body         text not null,
  task_id      int not null references task(id),
  user_id      int not null references "user"(id) default request.user_id(),
  created_on   timestamptz not null default now(),
  updated_on   timestamptz
);
create index task_comment_user_id_index on task_comment(user_id);
create index task_comment_task_id_index on task_comment(task_id);