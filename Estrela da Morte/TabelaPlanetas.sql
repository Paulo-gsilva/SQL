create table Planetas(
	IdPlaneta int not null,
	Nome varchar(50) not null,
	Rotacao float not null,
	Orbita float not null,
	Diametro float not null,
	Clima varchar(50) not null,
	Populacao int not null
)

go
alter table Planetas add constraint PK_Planetas Primary Key (IdPlaneta);