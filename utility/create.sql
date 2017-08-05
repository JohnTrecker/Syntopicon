CREATE TABLE refs (
   id SERIAL PRIMARY KEY,
   topic VARCHAR(30),
   subtopic VARCHAR(200),
   author VARCHAR(30),
   volume INT,
   pageBegin INT,
   pageEnd INT,
   passage VARCHAR(30),
   notes VARCHAR(30)
);