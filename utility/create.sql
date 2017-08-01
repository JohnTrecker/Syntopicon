CREATE TABLE refs (
   id SERIAL PRIMARY KEY,
   topic VARCHAR(50),
   subtopic VARCHAR(200),
   author VARCHAR(50),
   volume VARCHAR(20),
   page VARCHAR(20)
);