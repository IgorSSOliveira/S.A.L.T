USE salt;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL
);

CREATE TABLE livro(
id INT PRIMARY KEY AUTO_INCREMENT, 
nome VARCHAR (100) NOT NULL,
qtdCapitulos INT
);

CREATE TABLE leitura (
id INT AUTO_INCREMENT,
fkUsuario INT,
fkLivro INT,
livro VARCHAR(100),
capitulo INT,
CONSTRAINT pkLeitura 
	PRIMARY KEY (id, fkUsuario, fkLivro),
CONSTRAINT fkUsuarioLeitura 
	FOREIGN KEY (fkUsuario) 
		REFERENCES usuario(id),
CONSTRAINT fkLivroLeitura 
	FOREIGN KEY (fkLivro) 
		REFERENCES livro(id)
);


INSERT INTO livro (nome, qtdCapitulos)
VALUES
('Gênesis', 50),
('Êxodo', 40),
('Levítico', 27),
('Números', 36),
('Deuteronômio', 34),
('Josué', 24),
('Juízes', 21),
('Rute', 4),
('1 Samuel', 31),
('2 Samuel', 24),
('1 Reis', 22),
('2 Reis', 25),
('1 Crônicas', 29),
('2 Crônicas', 36),
('Esdras', 10),
('Neemias', 13),
('Ester', 10),
('Jó', 42),
('Salmos', 150),
('Provérbios', 31),
('Eclesiastes', 12),
('Cânticos', 8),
('Isaías', 66),
('Jeremias', 52),
('Lamentações', 5),
('Ezequiel', 48),
('Daniel', 12),
('Oséias', 14),
('Joel', 3),
('Amós', 9),
('Obadias', 1),
('Jonas', 4),
('Miquéias', 7),
('Naum', 3),
('Habacuque', 3),
('Sofonias', 3),
('Ageu', 2),
('Zacarias', 14),
('Malaquias', 4),
('Mateus', 28),
('Marcos', 16),
('Lucas', 24),
('João', 21),
('Atos', 28),
('Romanos', 16),
('1 Coríntios', 16),
('2 Coríntios', 13),
('Gálatas', 6),
('Efésios', 6),
('Filipenses', 4),
('Colossenses', 4),
('1 Tessalonicenses', 5),
('2 Tessalonicenses', 3),
('1 Timóteo', 6),
('2 Timóteo', 4),
('Tito', 3),
('Filemom', 1),
('Hebreus', 13),
('Tiago', 5),
('1 Pedro', 5),
('2 Pedro', 3),
('1 João', 5),
('2 João', 1),
('3 João', 1),
('Judas', 1),
('Apocalipse', 22);


CREATE VIEW view_biblia AS
	SELECT 
		u.id AS fkUsuario,
		ROUND(
			COUNT(DISTINCT le.fkLivro, le.capitulo) * 100.0 / (SELECT SUM(qtdCapitulos) FROM livro),
            2) AS progresso
	FROM usuario u
	LEFT JOIN leitura le 
		ON u.id = le.fkUsuario
	GROUP BY u.id;
    

CREATE VIEW view_lido AS
	SELECT
		l.id,
		l.fkUsuario,
		l.livro,
		l.capitulo
	FROM leitura l;
    
CREATE VIEW view_livro AS
	SELECT
		u.id AS fkUsuario,
		l.id AS idLivro,         
		l.nome,
		l.qtdCapitulos AS total,
		COUNT(le.capitulo) AS lidos,
		ROUND((COUNT(le.capitulo) * 100.0) / l.qtdCapitulos, 2) AS progresso
	FROM usuario u
	CROSS JOIN livro l
	LEFT JOIN leitura le ON le.fkUsuario = u.id AND le.fkLivro = l.id
	GROUP BY u.id, l.id, l.nome, l.qtdCapitulos
	ORDER BY l.id;



