set search_path = data, public;

INSERT INTO todo (id,todo,private,owner_id) VALUES
(1,'item_1',FALSE,1),
(2,'item_2',FALSE,1),
(3,'item_3',FALSE,1),
(4,'item_4',FALSE,2),
(5,'item_5',FALSE,2)
(6,'item_6',FALSE,2)
;

INSERT INTO client (id,name,address,user_id) VALUES
(1,'Apple','1 Infinite Loop Cupertino, CA 95014',1),
(2,'Microsoft','One Microsoft Way Redmond, WA 98052-6399',1),
(3,'Amazon','PO Box 81226 Seattle, WA 98108-1226',2)
;

INSERT INTO project (id,name,client_id,user_id) VALUES
(1,'MacOS',1,1),
(2,'Windows',2,1),
(3,'IOS',1,1),
(4,'Office',2,1)
;

INSERT INTO task (id,name,completed,project_id,user_id) VALUES
(1,'Design a nice UI',TRUE,1,1),
(2,'Write some OS code',FALSE,1,1),
(3,'Start aggressive marketing',TRUE,2,1),
(4,'Get everybody to love it',TRUE,3,1),
(5,'Move everything to cloud',TRUE,4,1)
;

INSERT INTO project_comment (id,body,project_id,user_id) VALUES
(1,'This is going to be awesome',1,1),
(2,'We still have the marketshare, we should keep it that way',2,1)
;

INSERT INTO task_comment (id,body,task_id,user_id) VALUES
(1,'Arn''t we awesome?',1,1),
(2,'People are going to love the free automated install when they see it in the morning',3,1)
;

-- restart sequences
ALTER SEQUENCE todo_id_seq RESTART WITH 7;
ALTER SEQUENCE client_id_seq RESTART WITH 4;
ALTER SEQUENCE project_id_seq RESTART WITH 7;
ALTER SEQUENCE task_id_seq RESTART WITH 6;
ALTER SEQUENCE project_comment_id_seq RESTART WITH 3;
ALTER SEQUENCE task_comment_id_seq RESTART WITH 3;

-- analyze modified tables
ANALYZE todo;
ANALYZE client;
ANALYZE project;
ANALYZE task;
ANALYZE project_comment;
ANALYZE task_comment;