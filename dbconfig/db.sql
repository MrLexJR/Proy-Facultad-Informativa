CREATE ROLE riverman WITH LOGIN SUPERUSER CREATEDB CREATEROLE PASSWORD ‘rivera123’;

CREATE DATABASE utmfci;
CREATE EXTENSION pgcrypto;

DROP SEQUENCE IF EXISTS funcion_pers_seq;
CREATE SEQUENCE funcion_pers_seq;
DROP TABLE IF EXISTS funcion_pers;
CREATE TABLE IF NOT EXISTS  funcion_pers(
  id_funcion INT DEFAULT NEXTVAL ('funcion_pers_seq') PRIMARY KEY,
  descripcion varchar(30) NOT NULL
);

DROP TABLE IF EXISTS aula;
CREATE TABLE IF NOT EXISTS aula(
  id_aula varchar(50) NOT NULL PRIMARY KEY,
  nombre varchar(50) NOT NULL,
  piso integer NOT NULL
);

DROP TABLE IF EXISTS personal;
CREATE TABLE IF NOT EXISTS personal(
  id_personal integer NOT NULL PRIMARY KEY,
  nombres varchar(50) NOT NULL,
  apellidos varchar(50) NOT NULL,
  correo varchar(50) NOT NULL,
  contrasena varchar(65),
  horario_trabajo varchar(50),
  horario_atencion varchar(50),
  estado BOOLEAN DEFAULT true,
  id_aula varchar(50) REFERENCES aula(id_aula),
  id_funcion integer REFERENCES funcion_pers(id_funcion)
);

-- Inserts for table funcion personal
INSERT INTO funcion_pers (descripcion) VALUES ('Autoridad');
INSERT INTO funcion_pers (descripcion) VALUES ('Docente');
INSERT INTO funcion_pers (descripcion) VALUES ('Administrativo');
INSERT INTO funcion_pers (descripcion) VALUES ('Auxiliar de Servicio');

-- Inserts for table aula
INSERT INTO aula VALUES ('FCI-01-59-04-101','Ambiente 101',2);

-- Inserts for table personal -admin
INSERT INTO personal (id_personal,nombres,apellidos,correo, contrasena, estado) VALUES (1314675354, 'Jonathan', 'Rivera', 'jonarsa_13@hotmail.com', crypt('123', gen_salt('bf')), '0' );

-- Inserts for table personal 
INSERT INTO personal (id_personal,nombres,apellidos,correo,id_funcion,id_aula) VALUES ( 1314675353,'Melina Susana','Vasquez Lopez','mvasquez@utm.edu.ec',3,'FCI-01-59-04-101');
INSERT INTO personal (id_personal,nombres,apellidos,correo,id_funcion) VALUES ( 1314675352,'Jorge','Daza','jdaza@utm.edu.ec',4);
INSERT INTO personal (id_personal,nombres,apellidos,correo,estado, id_funcion,id_aula) VALUES ( 1314675351,'Danilo','Ramirez Lituma','dramirez@utm.edu.ec','0', 2,'FCI-01-59-04-101');

-- vista Personal - Aula - Funcion
CREATE VIEW view_pers_fun_aula
 AS SELECT per.id_personal, per.nombres, per.apellidos, per.correo, per.horario_atencion, per.horario_trabajo, fun.descripcion as cargo, aula.nombre as aula
	FROM personal as per,funcion_pers as fun, aula 
	where per.id_funcion=fun.id_funcion AND per.estado=true;

-- vista Personal - Admin
CREATE VIEW view_pers_admin
AS SELECT id_personal,nombres,apellidos,correo,contrasena FROM personal WHERE contrasena!='';



