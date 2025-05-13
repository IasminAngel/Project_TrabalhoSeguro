import streamlit as st
import mysql.connector
import pandas as pd

# Conectar ao banco de dados MySQL
def conectar_bd():
    return mysql.connector.connect(
        host="localhost",  # Altere para o seu host
        user="root",       # Altere para o seu usuário
        password="",       # Altere para sua senha
        database="Trabalho_Seguro"
    )

# Função para carregar os dados
@st.cache_data
def carregar_dados():
    con = conectar_bd()
    query = """
        SELECT f.id_funcionario, f.nome, e.nome AS EPI, c.data
        FROM Contem c
        JOIN Funcionario f ON c.Funcionario_id_funcionario = f.id_funcionario
        JOIN EPI e ON c.EPI_idEPI = e.idEPI
    """
    df = pd.read_sql(query, con)
    con.close()
    return df

# Título do dashboard
st.title("Dashboard de EPIs fornecidos aos Funcionários")


# Carrega os dados
df = carregar_dados()

# Filtros interativos
funcionarios = st.multiselect("Filtrar por Funcionário:", options=df["nome"].unique(), default=df["nome"].unique())
df_filtrado = df[df["nome"].isin(funcionarios)]

# Exibir tabela filtrada
st.subheader("Tabela de EPIs fornecidos")
st.dataframe(df_filtrado)

# Estatísticas
st.subheader("Resumo")
epi_count = df_filtrado.groupby("EPI")["data"].count()
st.bar_chart(epi_count)

# Exibir estatísticas adicionais, como quantos EPIs cada funcionário recebeu
st.subheader("EPIs por Funcionário")
epi_funcionario = df_filtrado.groupby("nome")["EPI"].count()
st.bar_chart(epi_funcionario)