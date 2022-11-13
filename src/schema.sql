CREATE TABLE usuarios (
  id serial primary key,
  nome varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  senha varchar(100) NOT NULL,
  aniversario DATE NOT NULL,
  telefone varchar(11),
  CEP varchar(8),
  endereco varchar(100),
  complemento varchar(100),
  cidade varchar(100),
  estado varchar(100),
  status varchar(100),
  foto varchar(100),
  bio text
)

CREATE TABLE pet (
   id serial NOT NULL PRIMARY KEY,
   nome, 
   especie,
   raca,
   genero ,
   aniversario DATE NOT NULL,
   castrado BOOLEAN NOT NULL, 
   peso, 
   foto,
   bio text
)


