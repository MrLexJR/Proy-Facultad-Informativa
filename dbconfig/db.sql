CREATE DATABASE utm-fci;

CREATE SEQUENCE users_seq;

CREATE TABLE IF NOT EXISTS users (
  id INT DEFAULT NEXTVAL ('users_seq') PRIMARY KEY,
  email varchar(65) NOT NULL,
  password varchar(65) NOT NULL,
  names varchar(65),
);

INSERT INTO users (email, password, names)
  VALUES ('jonarsa_13@hotmail.com', '123', 'Jonathan Rivera');

  SELECT * FROM users;

  UPDATE users SET password = crypt('123', gen_salt('bf')) WHERE id = '1'; // it's is 