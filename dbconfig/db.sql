CREATE DATABASE utmfci;

CREATE SEQUENCE users_seq;

CREATE TABLE users (
  id INT DEFAULT NEXTVAL ('users_seq') PRIMARY KEY,
  email varchar(65) NOT NULL,
  password varchar(65) NOT NULL,
  names varchar(65)
);

CREATE SEQUENCE funcion_pers_seq;

CREATE TABLE funcion_pers(
  id_funcion INT DEFAULT NEXTVAL ('funcion_pers_seq') PRIMARY KEY,
  descripcion varchar(30) NOT NULL
);

CREATE TABLE personal(
  id_funcion integer NOT NULL,
  nombres varchar(50) NOT NULL,
  apellidos varchar(50) NOT NULL,
  correo varchar(50) NOT NULL,
  horario_atencion varchar(50),
  id_personal integer NOT NULL
);

ALTER TABLE personal ADD CONSTRAINT id_personal
  PRIMARY KEY (id_personal);

ALTER TABLE personal ADD CONSTRAINT fk_fun_id 
  FOREIGN KEY (id_funcion) REFERENCES funcion_pers (id_funcion) ON UPDATE CASCADE;

ALTER SEQUENCE sequence RESTART WITH 1;

-- Inserts for table personal
INSERT INTO funcion_pers (descripcion) VALUES ('Admin');
INSERT INTO funcion_pers (descripcion) VALUES ('Docente');
INSERT INTO funcion_pers (descripcion) VALUES ('Administrativo');
INSERT INTO funcion_pers (descripcion) VALUES ('Auxiliar de Servicio');

-- Inserts for table personal
INSERT INTO personal VALUES (3,'Melina Susana','Vasquez Lopez','mvasquez@utm.edu.ec','Lunes: 09:00 a 10:00',1314675354);
INSERT INTO personal VALUES (4,'Jorge','Daza Lopez','jdaza@utm.edu.ec',null,1305080121);
INSERT INTO personal VALUES (2,'Jorge Luis','Veloz Zambrano','jveloz@utm.edu.ec','Viernes: 09:00 a 10:00',1305080122);

-- Inserts for table users
INSERT INTO users (email, password, names)
  VALUES ('jonarsa_13@hotmail.com', crypt('123', gen_salt('bf')), 'Jonathan Rivera');

CREATE EXTENSION pgcrypto;

UPDATE users SET password = crypt('123', gen_salt('bf')) WHERE id = '1';   -- it's is 

CREATE VIEW view_pers_fun
 AS SELECT per.id_personal, per.nombres, per.apellidos, per.correo, per.horario_atencion, fun.descripcion
	FROM personal as per,funcion_pers as fun
	where per.id_funcion=fun.id_funcion


SELECT per.id_personal, per.nombres, per.apellidos, per.correo, per.horario_atencion, fun.descripcion
	FROM personal as per,funcion_pers as fun
	where per.id_funcion=fun.id_funcion


CREATE ROLE riverman WITH LOGIN SUPERUSER CREATEDB CREATEROLE PASSWORD ‘rivera123’;