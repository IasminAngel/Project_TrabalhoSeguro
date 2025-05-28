INSERT INTO Trabalho_Seguro.Cargo (posicao, nome_cargo) VALUES
('Gerente', 'Gerente de Produção'),
('Supervisor', 'Supervisor de Qualidade'),
('Operador', 'Operador de Máquinas');

INSERT INTO Trabalho_Seguro.Setor (idSetor, setor) VALUES
(1, 'Produção'),
(2, 'Qualidade'),
(3, 'Manutenção');

INSERT INTO Trabalho_Seguro.Funcionario (id_funcionario, matricula, CPF, email, formacao, nome_funcionario, sobrenome_funcionario, dt_nascimento, ddd, numero, ddd_emergencial, telefoneEmergencial, CEP, cidade, bairro, logradouro, numero_residencia, tempoTrabalho, Cargo_idCargo1, Setor_idSetor) VALUES
(1, '12345', '12345678901', 'joao.silva@empresa.com', 'Engenharia Mecânica', 'João', 'Silva', '1985-05-15', '11', '99999-9999', '11', '88888-8888', '01234-567', 'São Paulo', 'Centro', 'Rua das Flores', '100', '5 anos', 1, 1),
(2, '67890', '23456789012', 'maria.souza@empresa.com', 'Técnica em Segurança', 'Maria', 'Souza', '1990-08-20', '11', '97777-7777', '11', '86666-6666', '04567-890', 'São Paulo', 'Vila Olímpia', 'Avenida Paulista', '200', '3 anos', 2, 2);

INSERT INTO Trabalho_Seguro.Funcao (descricao_funcao, Cargo_idCargo) VALUES
('Gerenciar equipe de produção', 1),
('Inspecionar qualidade dos produtos', 2),
('Operar máquinas pesadas', 3);

INSERT INTO Trabalho_Seguro.Incidentes (dt_hr_incidente, status_incidente, descricao_incidente, local_incidente, tipo_incidente) VALUES
('2023-10-01 14:30:00', 'Resolvido', 'Vazamento de óleo na máquina X', 'Setor de Produção', 'Vazamento'),
('2023-10-05 10:00:00', 'Pendente', 'Falha no sistema de segurança', 'Setor de Qualidade', 'Falha de Equipamento');

INSERT INTO Trabalho_Seguro.EPI (nome, validade) VALUES
('Capacete de Segurança', '2024-12-31'),
('Luvas de Proteção', '2024-06-30');

INSERT INTO Trabalho_Seguro.Acidente (idAcidente, dt_hr_acidente, status_acidente, descricao_acidente, local_acidente, tipo_acidente, uso_epi_acidente) VALUES
(1, '2023-09-15 09:45:00', 'Investigação', 'Queda de altura', 'Setor de Manutenção', 'Queda', 'Sim'),
(2, '2023-10-10 16:20:00', 'Concluído', 'Corte na mão', 'Setor de Produção', 'Corte', 'Não');

INSERT INTO Trabalho_Seguro.Afeta (lesao, Funcionario_id_funcionario, Acidente_idAcidente) VALUES
('Fraturas múltiplas', 1, 1),
('Corte profundo', 2, 2);

INSERT INTO Trabalho_Seguro.Desvio (idDesvio, dt_hr_desvio, status_desvio, descricao_desvio, local_desvio, danos_desvio, ala_desvio, recomendacao_desvio) VALUES
(1, '2023-10-02 08:00:00', 'Pendente', 'Falta de sinalização na área', 'Setor de Produção', 'Nenhum', 'Ala A', 'Instalar sinalização adequada'),
(2, '2023-10-06 12:00:00', 'Concluído', 'Falta de EPI no local', 'Setor de Manutenção', 'Nenhum', 'Ala B', 'Fornecer EPI necessário');

INSERT INTO Trabalho_Seguro.Registra (Incidentes_idIncidentes, Acidente_idAcidente, Desvio_idDesvio, Funcionario_id_funcionario) VALUES
(1, 1, 1, 1),
(2, 2, 2, 2);

INSERT INTO Trabalho_Seguro.Tem (EPI_idEPI, Funcao_idFuncao) VALUES
(1, 1),
(2, 2);

INSERT INTO Trabalho_Seguro.Treinamento (idTreinamento, treinamento, inicio, conclusao, validade, descricao) VALUES
(1, 'Segurança no Trabalho', '2023-01-01', '2023-01-10', '2024-01-10', 'Treinamento sobre normas de segurança'),
(2, 'Operação de Máquinas', '2023-02-01', '2023-02-15', '2024-02-15', 'Treinamento para operação segura de máquinas');

INSERT INTO Trabalho_Seguro.treinamento_Setor (Setor_idSetor, Treinamento_idTreinamento, Funcionario_id_funcionario) VALUES
(1, 1, 1),
(2, 2, 2);

INSERT INTO Trabalho_Seguro.Cadastro (idCadastro, nome, sobrenome, email, celular, senha, confirmar_senha, genero) VALUES
(1, 'Carlos', 'Mendes', 'carlos.mendes@empresa.com', '1199999-9999', 'senha123', 'senha123', '{"genero": "Masculino"}'),
(2, 'Ana', 'Ferreira', 'ana.ferreira@empresa.com', '1188888-8888', 'senha456', 'senha456', '{"genero": "Feminino"}');

INSERT INTO Trabalho_Seguro.Login (idLogin, email, senha, Cadastro_idCadastro) VALUES
(1, 'carlos.mendes@empresa.com', 'c', 1),
(2, 'ana.ferreira@empresa.com', 'senha456', 2);

INSERT INTO Trabalho_Seguro.Avaliacao_site (idAvaliacao, estrela, opiniao, melhoras) VALUES
(1, '{"estrelas": 5}', 'Site muito útil e intuitivo.', 'Adicionar mais funcionalidades.'),
(2, '{"estrelas": 4}', 'Bom, mas pode melhorar.', 'Melhorar o desempenho.');

INSERT INTO Trabalho_Seguro.Identificar_avaliacao (Login_site_idLogin, Avaliacao_site_idAvaliacao) VALUES
(1, 1),
(2, 2);

INSERT INTO Trabalho_Seguro.Cadastro_Empresa (idCadastro_Empresa, nome_empresa, CNPJ, setor_atuacao, tamanho_empresa, Login_idLogin) VALUES
(1, 'Empresa Segura LTDA', '12345678000199', 'Indústria', '{"tamanho": "Grande"}', 1),
(2, 'Segurança Total SA', '98765432000111', 'Construção', '{"tamanho": "Média"}', 2);

INSERT INTO Trabalho_Seguro.Pagamento (idPagamento, titular_cartao, numero_cartao, validade, CVV, logradouro, CEP, cidade, estado, plano_escolhido) VALUES
(1, 'Carlos Mendes', '1234567812345678', '2025-12-31', '123', 'Rua das Flores', '01234-567', 'São Paulo', 'SP', 'Plano Premium'),
(2, 'Ana Ferreira', '8765432187654321', '2026-11-30', '456', 'Avenida Paulista', '04567-890', 'São Paulo', 'SP', 'Plano Básico');

INSERT INTO Trabalho_Seguro.Responsavel (Setor_idSetor, Funcionario_id_funcionario) VALUES
(1, 1),
(2, 2);

INSERT INTO Trabalho_Seguro.Pagamento_Empresa (Pagamento_idPagamento, Cadastro_Empresa_idCadastro_Empresa) VALUES
(1, 1),
(2, 2);

INSERT INTO Trabalho_Seguro.Contem (idContem, data, Funcionario_id_funcionario, EPI_idEPI) VALUES
(1, '2023-10-01', 1, 1),
(2, '2023-10-05', 2, 2);





