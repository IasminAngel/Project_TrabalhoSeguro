-- Inserir Cargos
INSERT INTO Cargo (posicao, nome_cargo) VALUES 
('Operacional', 'Operador de Máquinas'),
('Supervisão', 'Supervisor de Produção'),
('Gerência', 'Gerente de Qualidade'),
('Administrativo', 'Assistente Administrativo');

-- Inserir Setores
INSERT INTO Setor (setor) VALUES 
('Produção'),
('Qualidade'),
('Manutenção'),
('RH');

-- Inserir Funcionários
INSERT INTO Funcionario (
  matricula, CPF, email, formacao, nome_funcionario, sobrenome_funcionario, 
  dt_nascimento, ddd, numero, CEP, cidade, bairro, logradouro, numero_residencia, 
  tempoTrabalho, Cargo_idCargo1, Setor_idSetor
) VALUES 
('F001', '12345678901', 'joao.silva@empresa.com', 'Ensino Médio', 'João', 'Silva', 
 '1985-05-15', '11', '999887766', '01234000', 'São Paulo', 'Centro', 'Rua Principal', '100', 
 '5 anos', 1, 1),
('F002', '23456789012', 'maria.santos@empresa.com', 'Técnico em Segurança', 'Maria', 'Santos', 
 '1990-08-20', '11', '988776655', '04567000', 'São Paulo', 'Vila Olímpia', 'Avenida Secundária', '200', 
 '3 anos', 2, 2);

-- Inserir Funções
INSERT INTO Funcao (descricao_funcao, Cargo_idCargo) VALUES 
('Operar máquina X', 1),
('Inspeção de qualidade', 2),
('Gestão de equipe', 3),
('Atendimento ao cliente', 4);

-- Inserir EPIs
INSERT INTO EPI (nome, validade) VALUES 
('Capacete de segurança', '2025-12-31'),
('Óculos de proteção', '2024-06-30'),
('Luva de proteção', '2024-09-15'),
('Protetor auricular', '2025-03-31');

-- Inserir Treinamentos
INSERT INTO Treinamento (treinamento, inicio, conclusao, validade, descricao) VALUES 
('NR-6 - EPIs', '2023-01-10', '2023-01-15', '2024-01-15', 'Treinamento sobre uso correto de EPIs'),
('NR-10 - Segurança em Eletricidade', '2023-02-01', '2023-02-05', '2025-02-05', 'Treinamento para trabalhos com eletricidade'),
('Primeiros Socorros', '2023-03-15', '2023-03-17', '2024-03-17', 'Noções básicas de primeiros socorros');

-- Inserir Relação EPI-Função
INSERT INTO Tem (EPI_idEPI, Funcao_idFuncao) VALUES 
(1, 1), (2, 1), (3, 1), -- Operador de Máquinas
(1, 2), (2, 2),         -- Supervisor de Produção
(1, 3),                 -- Gerente de Qualidade
(4, 4);                 -- Assistente Administrativo

-- Inserir Treinamentos por Setor
INSERT INTO treinamento_Setor (Setor_idSetor, Treinamento_idTreinamento, Funcionario_id_funcionario) VALUES 
(1, 1, 1), -- Produção: NR-6
(1, 2, 1), -- Produção: NR-10
(2, 1, 2), -- Qualidade: NR-6
(3, 1, NULL); -- Manutenção: NR-6 (sem funcionário específico)