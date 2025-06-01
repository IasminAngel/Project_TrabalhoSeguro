DELIMITER //
CREATE TRIGGER valida_data_nascimento_funcionario
BEFORE INSERT ON Funcionario
FOR EACH ROW
BEGIN
    IF NEW.dt_nascimento > CURDATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Data de nascimento não pode ser no futuro';
    END IF;
    
    IF TIMESTAMPDIFF(YEAR, NEW.dt_nascimento, CURDATE()) < 18 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Funcionário deve ter pelo menos 18 anos';
    END IF;
END//
DELIMITER ;


-- Tabela para histórico de senhas
CREATE TABLE IF NOT EXISTS Historico_Senha (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idCadastro INT NOT NULL,
  senha_antiga VARCHAR(45) NOT NULL,
  data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idCadastro) REFERENCES Cadastro(idCadastro)
);

-- Trigger para histórico
DELIMITER //
CREATE TRIGGER registra_historico_senha
AFTER UPDATE ON Cadastro
FOR EACH ROW
BEGIN
    IF OLD.senha != NEW.senha THEN
        INSERT INTO Historico_Senha (idCadastro, senha_antiga)
        VALUES (OLD.idCadastro, OLD.senha);
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER valida_epi_acidente
BEFORE INSERT ON Acidente_Incidente
FOR EACH ROW
BEGIN
    DECLARE epi_obrigatorio INT;
    
    -- Verifica se o funcionário usou EPI quando era obrigatório
    SELECT COUNT(*) INTO epi_obrigatorio
    FROM Funcionario f
    JOIN Cargo c ON f.Cargo_idCargo1 = c.idCargo
    JOIN Funcao fn ON c.idCargo = fn.Cargo_idCargo
    JOIN Tem t ON fn.idFuncao = t.Funcao_idFuncao
    WHERE f.matricula = NEW.matricula AND t.EPI_idEPI IS NOT NULL;
    
    IF epi_obrigatorio > 0 AND NEW.uso_epi = FALSE THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'EPI é obrigatório para esta função';
    END IF;
END//
DELIMITER ;


DELIMITER //
CREATE TRIGGER atualiza_validade_treinamento
BEFORE INSERT ON treinamento_Setor
FOR EACH ROW
BEGIN
    DECLARE v_validade DATE;
    
    -- Obtém a validade do treinamento
    SELECT validade INTO v_validade
    FROM Treinamento
    WHERE idTreinamento = NEW.Treinamento_idTreinamento;
    
    -- Se o treinamento já expirou, não permite vincular
    IF v_validade < CURDATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Treinamento expirado. Renove antes de vincular.';
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE registrar_acidente(
    IN p_data_acidente DATE,
    IN p_local VARCHAR(100),
    IN p_matricula VARCHAR(50),
    IN p_agente VARCHAR(100),
    IN p_acidentes_anteriores BOOLEAN,
    IN p_quantidade_acidentes INT,
    IN p_confirmacao_testemunha BOOLEAN,
    IN p_testemunha_info TEXT,
    IN p_afastamento BOOLEAN,
    IN p_dias_afastamento INT,
    IN p_turno VARCHAR(20),
    IN p_periodo VARCHAR(50),
    IN p_cat BOOLEAN,
    IN p_fratura BOOLEAN,
    IN p_descricao TEXT,
    IN p_uso_epi BOOLEAN,
    IN p_epi_utilizado TEXT,
    IN p_id_funcionario INT
)
BEGIN
    DECLARE v_id_acidente INT;
    
    -- Valida se o funcionário existe
    IF NOT EXISTS (SELECT 1 FROM Funcionario WHERE id_funcionario = p_id_funcionario) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Funcionário não encontrado';
    END IF;
    
    -- Insere o acidente
    INSERT INTO Acidente_Incidente (
        data_acidente, local, matricula, agente, acidentes_anteriores, quantidade_acidentes,
        confirmacao_testemunha, testemunha_info, afastamento, dias_afastamento, turno, periodo,
        cat, fratura, descricao, uso_epi, epi_utilizado
    ) VALUES (
        p_data_acidente, p_local, p_matricula, p_agente, p_acidentes_anteriores, p_quantidade_acidentes,
        p_confirmacao_testemunha, p_testemunha_info, p_afastamento, p_dias_afastamento, p_turno, p_periodo,
        p_cat, p_fratura, p_descricao, p_uso_epi, p_epi_utilizado
    );
    
    SET v_id_acidente = LAST_INSERT_ID();
    
    -- Registra quem registrou o acidente
    INSERT INTO Registra (Funcionario_id_funcionario, Acidente_Incidente_id, Desvio_idDesvio)
    VALUES (p_id_funcionario, v_id_acidente, NULL);
    
    -- Se for CAT, gera alerta
    IF p_cat THEN
        INSERT INTO Desvio (dt_hr_desvio, status_desvio, descricao_desvio, local_desvio, danos_desvio, ala_desvio, recomendacao_desvio)
        VALUES (NOW(), 'Pendente', 'Acidente registrado como CAT - Comunicação necessária', p_local, 'Acidente com afastamento', 'Todos', 'Investigar causas');
        
        UPDATE Registra SET Desvio_idDesvio = LAST_INSERT_ID() 
        WHERE Acidente_Incidente_id = v_id_acidente;
    END IF;
    
    SELECT v_id_acidente AS id_acidente_registrado;
END//
DELIMITER ;


DELIMITER //
CREATE FUNCTION verificar_epis_vencidos(p_id_funcionario INT) 
RETURNS TEXT
DETERMINISTIC
BEGIN
    DECLARE resultado TEXT DEFAULT '';
    DECLARE v_nome_epi VARCHAR(30);
    DECLARE v_validade DATE;
    DECLARE done INT DEFAULT FALSE;
    
    DECLARE cur_epis CURSOR FOR
    SELECT e.nome, e.validade
    FROM Funcionario f
    JOIN Cargo c ON f.Cargo_idCargo1 = c.idCargo
    JOIN Funcao fn ON c.idCargo = fn.Cargo_idCargo
    JOIN Tem t ON fn.idFuncao = t.Funcao_idFuncao
    JOIN EPI e ON t.EPI_idEPI = e.idEPI
    WHERE f.id_funcionario = p_id_funcionario AND e.validade < CURDATE();
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur_epis;
    
    read_loop: LOOP
        FETCH cur_epis INTO v_nome_epi, v_validade;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        SET resultado = CONCAT(resultado, v_nome_epi, ' (Vencido em: ', v_validade, ')\n');
    END LOOP;
    
    CLOSE cur_epis;
    
    IF resultado = '' THEN
        SET resultado = 'Nenhum EPI vencido para este funcionário';
    END IF;
    
    RETURN resultado;
END//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE renovar_treinamento(
    IN p_id_treinamento INT,
    IN p_nova_validade DATE
)
BEGIN
    DECLARE v_duracao INT;
    
    -- Verifica se o treinamento existe
    IF NOT EXISTS (SELECT 1 FROM Treinamento WHERE idTreinamento = p_id_treinamento) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Treinamento não encontrado';
    END IF;
    
    -- Calcula duração padrão (2 anos)
    IF p_nova_validade IS NULL THEN
        SET p_nova_validade = DATE_ADD(CURDATE(), INTERVAL 2 YEAR);
    END IF;
    
    -- Atualiza validade do treinamento
    UPDATE Treinamento 
    SET validade = p_nova_validade
    WHERE idTreinamento = p_id_treinamento;
    
    SELECT CONCAT('Treinamento ID ', p_id_treinamento, ' renovado até ', p_nova_validade) AS mensagem;
END//
DELIMITER ;



CALL registrar_acidente(
    '2023-11-15',            -- data_acidente
    'Setor de Produção',      -- local
    'F001',                  -- matricula
    'Máquina de Corte',      -- agente
    FALSE,                   -- acidentes_anteriores
    0,                       -- quantidade_acidentes
    TRUE,                    -- confirmacao_testemunha
    'João da Silva testemunhou', -- testemunha_info
    TRUE,                    -- afastamento
    5,                       -- dias_afastamento
    'Manhã',                 -- turno
    'Primeira quinzena',      -- periodo
    TRUE,                    -- cat
    FALSE,                   -- fratura
    'O funcionário prendeu a mão na máquina', -- descricao
    TRUE,                    -- uso_epi
    'Luva de proteção',      -- epi_utilizado
    2                        -- id_funcionario que registrou
);


SELECT verificar_epis_vencidos(1) AS epis_vencidos;

CALL renovar_treinamento(1, NULL); -- Renova NR-6 por mais 2 anos


UPDATE Cadastro 
SET senha = 'novaSenha123' 
WHERE idCadastro = 1;