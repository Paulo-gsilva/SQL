CREATE TABLE pessoas(
	id INT PRIMARY KEY,
	nome VARCHAR(30),
	nascimento DATE
)

INSERT INTO pessoas VALUES (1000, 'Paulo Guilherme', '2001-12-04');
INSERT INTO pessoas VALUES (1001, 'Ana Laura', '2003-11-21');
INSERT INTO pessoas VALUES (1002, 'Camily Viena', '2000-08-09');
INSERT INTO pessoas VALUES (1003, 'Thomas Henrique', '2012-04-17');
INSERT INTO pessoas VALUES (1004, 'Pedro Fernando', '2002-10-10');
INSERT INTO pessoas VALUES (1005, 'Letícia Rebeca', '2000-02-09');
INSERT INTO pessoas VALUES (1007, 'Clara Rayane', '2004-04-14');

UPDATE pessoas SET id = 1000 WHERE id = 1004 --ATUALIZA DADOS
DELETE FROM pessoas WHERE id = 1007 --DELETA DADOS
SELECT COUNT(id), nome FROM pessoas GROUP BY nome --ORDENA DADOS
SELECT * FROM pessoas ORDER BY nome