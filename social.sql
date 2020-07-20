DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS reset_codes CASCADE;  
DROP TABLE IF EXISTS friendships CASCADE;  
DROP TABLE IF EXISTS chats CASCADE;


CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first VARCHAR NOT NULL CHECK (first != ''),
  last VARCHAR NOT NULL CHECK (last != ''),
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  imgurl VARCHAR,
  bio VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes(
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  code VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE friendships(
  id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL REFERENCES users(id),
  receiver_id INT NOT NULL REFERENCES users(id),
  accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) 
CREATE TABLE chats(
  id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL REFERENCES users(id),
  message VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


INSERT INTO chats (sender_id, message) VALUES (1, 'Hello!');
INSERT INTO chats (sender_id, message) VALUES (212, 'Hello');
INSERT INTO chats (sender_id, message) VALUES (1, 'How are you?');
INSERT INTO chats (sender_id, message) VALUES (212, 'I am good and what about you?');
INSERT INTO chats (sender_id, message) VALUES (1, 'I am good too!');
INSERT INTO chats (sender_id, message) VALUES (212, 'How is your course going on?');
INSERT INTO chats (sender_id, message) VALUES (1, 'Its going good! about to present my socialmedia project!');
INSERT INTO chats (sender_id, message) VALUES (212, 'thats great! all the best for that.');
INSERT INTO chats (sender_id, message) VALUES (1, 'Thanks! What are you doing now a days?');
INSERT INTO chats (sender_id, message) VALUES (212, 'I am thinking of applying for the same course!');

