create table Pilotos(
	IdPiloto int not null,
	Nome varchar(100) not null,
	Nascimento varchar(10) not null,
	IdPlaneta int not null
)

go --DIVIDE SEÇÕES 
alter table Pilotos add constraint PK_Pilotos Primary Key (IdPiloto);
go
alter table Pilotos add constraint FK_Pilotos Foreign Key (IdPlaneta) references Planetas (IdPlaneta);