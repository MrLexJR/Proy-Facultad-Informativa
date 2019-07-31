CREATE ROLE riverman WITH LOGIN SUPERUSER CREATEDB CREATEROLE PASSWORD ‘rivera123’;

CREATE DATABASE utmfci;
CREATE EXTENSION pgcrypto;

-- DROP SEQUENCE IF EXISTS funcion_pers_seq;
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
  id_funcion integer REFERENCES funcion_pers(id_funcion)
);

-- DROP SEQUENCE IF EXISTS marca_seq;
CREATE SEQUENCE marca_seq;
DROP TABLE IF EXISTS marca;
CREATE TABLE IF NOT EXISTS marca(
  id_marca INT DEFAULT NEXTVAL ('marca_seq') PRIMARY KEY,
  nombre varchar(50) NOT NULL
);

-- DROP SEQUENCE IF EXISTS implem_seq;
CREATE SEQUENCE implem_seq;
DROP TABLE IF EXISTS implementos;
CREATE TABLE IF NOT EXISTS implementos(
  id_implementos INT DEFAULT NEXTVAL ('implem_seq') PRIMARY KEY,
  id_aula varchar(50) REFERENCES aula(id_aula),
  nombre varchar(50) NOT NULL,
  cantidad integer NOT NULL,
  id_marca integer REFERENCES marca(id_marca)
);

-- DROP SEQUENCE IF EXISTS tipo_aula_seq;
CREATE SEQUENCE tipo_aula_seq;
DROP TABLE IF EXISTS tipo_aula;
CREATE TABLE IF NOT EXISTS tipo_aula(
  id_tipo_aula INT DEFAULT NEXTVAL ('tipo_aula_seq') PRIMARY KEY,
  nombre varchar(50) NOT NULL
);

-- DROP SEQUENCE IF EXISTS asig_seq;
CREATE SEQUENCE asig_seq;
DROP TABLE IF EXISTS asignatura;
CREATE TABLE IF NOT EXISTS asignatura(
  id_asignatura INT DEFAULT NEXTVAL ('asig_seq') PRIMARY KEY,
  nombre varchar(50) NOT NULL
);

-- DROP SEQUENCE IF EXISTS horas_seq;
CREATE SEQUENCE IF NOT EXISTS horas_seq;
DROP TABLE IF EXISTS horas;
CREATE TABLE IF NOT EXISTS horas(
  id_horas INT DEFAULT NEXTVAL ('horas_seq') PRIMARY KEY,
  desde varchar(10) NOT NULL,
  hasta varchar(10) NOT NULL
);

-- DROP SEQUENCE IF EXISTS dias_seq;
CREATE SEQUENCE IF NOT EXISTS dias_seq;
DROP TABLE IF EXISTS dias;
CREATE TABLE IF NOT EXISTS dias(
  id_dia INT DEFAULT NEXTVAL ('dias_seq') PRIMARY KEY,
  dia varchar(10) NOT NULL
);


DROP SEQUENCE IF EXISTS horario_seq;
CREATE SEQUENCE horario_seq;
DROP TABLE IF EXISTS horario;
CREATE TABLE IF NOT EXISTS horario(
  id_horario INT DEFAULT NEXTVAL ('asig_seq') PRIMARY KEY,
  id_personal INT REFERENCES personal(id_personal),
  id_asignatura INT REFERENCES asignatura(id_asignatura),
  id_horas INT REFERENCES horas(id_horas),
  id_dia INT REFERENCES dias(id_dia),
  id_aula varchar(50) REFERENCES aula(id_aula)
);

DROP SEQUENCE IF EXISTS detalles_seq;
CREATE SEQUENCE detalles_seq;
DROP TABLE IF EXISTS detalles;
CREATE TABLE IF NOT EXISTS detalles(
  id_detalle INT DEFAULT NEXTVAL ('detalles_seq') PRIMARY KEY,
  id_aula varchar(50) REFERENCES aula(id_aula),
  id_tipo_aula INT REFERENCES tipo_aula(id_tipo_aula),
  id_personal INT REFERENCES personal(id_personal),
  --id_implementos INT REFERENCES implemetos(id_implementos),
  --id_horario INT REFERENCES horario(id_horario),
  descripcion varchar(100) NOT NULL,
  capacidad INT NOT NULL,
  ancho NUMERIC (5, 2) NOT NULL,
  largo NUMERIC (5, 2) NOT NULL
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
 AS SELECT per.id_personal, per.nombres, per.apellidos, per.correo, per.horario_atencion, per.horario_trabajo, fun.descripcion as cargo
	FROM personal as per,funcion_pers as fun 
	where per.id_funcion=fun.id_funcion AND per.estado=true;

-- vista Personal - Admin
CREATE VIEW view_pers_admin
AS SELECT id_personal,nombres,apellidos,correo,contrasena FROM personal WHERE contrasena!='';

-- vista Personal - Responsable
CREATE VIEW view_pers_resp
AS SELECT id_personal, nombres, apellidos FROM personal WHERE estado=true 

-- INSERT dias
INSERT INTO dias (dia) VALUES ('Lunes');INSERT INTO dias (dia) VALUES ('Martes');INSERT INTO dias (dia) VALUES ('Miercoles');
INSERT INTO dias (dia) VALUES ('Jueves');INSERT INTO dias (dia) VALUES ('Viernes');INSERT INTO dias (dia) VALUES ('Sabado'); 
INSERT INTO dias (dia) VALUES ('Domingo');

-- INSERT horas
INSERT INTO horas(desde,hasta) VALUES ('07h00','08h00');INSERT INTO horas(desde,hasta) VALUES ('08h00','09h00');
INSERT INTO horas(desde,hasta) VALUES ('09h00','10h00');INSERT INTO horas(desde,hasta) VALUES ('10h00','11h00');
INSERT INTO horas(desde,hasta) VALUES ('11h00','12h00');INSERT INTO horas(desde,hasta) VALUES ('12h00','13h00');
INSERT INTO horas(desde,hasta) VALUES ('13h00','14h00');INSERT INTO horas(desde,hasta) VALUES ('14h00','15h00');
INSERT INTO horas(desde,hasta) VALUES ('15h00','16h00');INSERT INTO horas(desde,hasta) VALUES ('16h00','17h00');
INSERT INTO horas(desde,hasta) VALUES ('17h00','18h00');INSERT INTO horas(desde,hasta) VALUES ('18h00','19h00');

-- INSERT tipo de aula
INSERT INTO tipo_aula (nombre) VALUES ('Laboratorio');
INSERT INTO tipo_aula (nombre) VALUES ('Aula');