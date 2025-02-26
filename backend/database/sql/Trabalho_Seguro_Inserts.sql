INSERT INTO Cargo (posicao, nome_cargo) VALUES
('Gerente', 'Gerente de Segurança'),
('Supervisor', 'Supervisor Operacional'),
('Operacional', 'Técnico de Segurança'),
('Auxiliar', 'Auxiliar de Produção');

INSERT INTO Setor (idSetor, setor) VALUES
(1, 'Manutenção'),
(2, 'Produção'),
(3, 'Administrativo'),
(4, 'Segurança do Trabalho');

INSERT INTO Funcionario (id_funcionario, matricula, CPF, email, formacao, nome_funcionario, sobrenome_funcionario, dt_nascimento, ddd, numero, ddd_emergencial, telefoneEmergencial, CEP, cidade, bairro, logradouro, numero_residencia, tempoTrabalho, Cargo_idCargo, Setor_idSetor) VALUES
(1, '123456', '11122233344', 'joao.silva@email.com', 'Engenharia', 'João', 'Silva', '1985-07-10', '71', '912345678', '71', '987654321', '40100100', 'Salvador', 'Centro', 'Rua A', '123', '5 anos', 1, 4),
(2, '654321', '55566677788', 'maria.souza@email.com', 'Técnico em Segurança', 'Maria', 'Souza', '1990-03-25', '11', '923456789', NULL, NULL, '01010100', 'São Paulo', 'Bela Vista', 'Rua B', '456', '3 anos', 3, 2);

INSERT INTO Funcao (descricao_funcao, Cargo_idCargo) VALUES
('Gerenciar equipe de segurança', 1),
('Inspecionar equipamentos', 3),
('Realizar treinamentos', 3),
('Apoiar na produção', 4);

INSERT INTO EPI (nome, validade) VALUES
('Capacete', '2026-12-31'),
('Óculos de Proteção', '2025-09-15'),
('Luvas de Segurança', '2024-11-20');

INSERT INTO Incidentes (dt_hr_incidente, status_incidente, descricao_incidente, local_incidente, tipo_incidente) VALUES
('2025-01-10 14:30:00', 'Aberto', 'Queda de material pesado', 'Galpão 3', 'Queda de objeto'),
('2025-02-05 09:15:00', 'Fechado', 'Derramamento de produto químico', 'Laboratório', 'Vazamento químico');

INSERT INTO Acidente (idAcidente, dt_hr_acidente, status_acidente, descricao_acidente, local_acidente, tipo_acidente, uso_epi_acidente) VALUES
(1, '2025-02-01 08:00:00', 'Aberto', 'Funcionário escorregou e caiu', 'Armazém', 'Queda', 'Sim'),
(2, '2025-02-07 11:45:00', 'Fechado', 'Corte na mão com ferramenta', 'Fábrica', 'Corte', 'Não');

INSERT INTO Treinamento (idTreinamento, treinamento, inicio, conclusao, validade, descricao) VALUES
(1, 'Treinamento de Segurança', '2025-01-05', '2025-01-10', '2026-01-10', 'Treinamento obrigatório para todos os funcionários sobre EPIs e primeiros socorros'),
(2, 'Prevenção de Incêndios', '2025-02-01', '2025-02-03', '2027-02-03', 'Treinamento sobre combate a incêndios e uso de extintores.');

INSERT INTO treinamento_Setor (Setor_idSetor, Treinamento_idTreinamento, Funcionario_id_funcionario) VALUES
(4, 1, 1),
(2, 2, 2);


