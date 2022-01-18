create table PilotosNaves(
	IdPiloto int not null,
	IdNave int not null,
	FlagAutorizado bit not null
)

go
alter table PilotosNaves add constraint PK_PilotosNaves Primary key (IdPiloto, IdNave);
go
alter table PilotosNaves add constraint FK_PilotosNaves_Pilotos Foreign key (IdPiloto) references Pilotos(IdPiloto);
go
alter table PilotosNaves add constraint PK_PilotosNaves_Naves Foreign key (IdNave) references Naves(IdNaves);
go
alter table PilotosNaves add constraint DF_PilotosNaves_FlagAutorizado Default (1) for FlagAutorizado;


