USE salt;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL
);

CREATE TABLE Livro(
id INT PRIMARY KEY AUTO_INCREMENT, 
nome VARCHAR (100) NOT NULL,
qtdCapitulos INT
);

CREATE TABLE Leitura (
fkUsuario INT,
fkLivro INT,
Livro VARCHAR(100),
capítulo INT,

CONSTRAINT pkLeitura PRIMARY KEY (fkUsuario, fkLivro),

CONSTRAINT fkUsuarioLeitura FOREIGN KEY (fkUsuario) REFERENCES usuario(id),

CONSTRAINT fkLivroLeitura FOREIGN KEY (fkLivro) REFERENCES Livro(id)
)

