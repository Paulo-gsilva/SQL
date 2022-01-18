create table Naves(
	IdNaves int not null,
	Nome varchar(100) not null,
	Modelo varchar(100) not null,
	Passageiros int not null,
	Carga float not null,
	Classe varchar(100) not null
)

go --DIVIDE SEÇÕES 

alter table Naves add constraint PK_Naves Primary Key (IdNaves);