from public.src.utils.conexao import conectar  # Correto
import streamlit as st
import mysql.connector
import pandas as pd

st.set_page_config(page_title="Sistema Trabalho Seguro", layout="wide")
st.title("Painel - Trabalho Seguro")

menu = st.sidebar.selectbox("Menu", ["Funcionários", "Acidentes", "Incidentes", "EPIs", "Treinamentos"])

try:
    conn = conectar()
    if not conn:
        st.error("Não foi possível conectar ao banco de dados. Verifique as credenciais.")
        st.stop()

    cursor = conn.cursor(dictionary=True)

    if menu == "Funcionários":
        cursor.execute("SELECT nome_funcionario, sobrenome_funcionario, CPF, email, tempoTrabalho FROM Funcionario")
        dados = cursor.fetchall()
        st.subheader("Lista de Funcionários")
        st.dataframe(pd.DataFrame(dados))

    elif menu == "Acidentes":
        cursor.execute("SELECT * FROM Acidente")
        dados = cursor.fetchall()
        st.subheader("Acidentes Registrados")
        st.dataframe(pd.DataFrame(dados))

    elif menu == "Incidentes":
        cursor.execute("SELECT * FROM Incidentes")
        dados = cursor.fetchall()
        st.subheader("Incidentes Registrados")
        st.dataframe(pd.DataFrame(dados))

    elif menu == "EPIs":
        cursor.execute("SELECT * FROM EPI")
        dados = cursor.fetchall()
        st.subheader("Equipamentos de Proteção Individual")
        st.dataframe(pd.DataFrame(dados))

    elif menu == "Treinamentos":
        cursor.execute("SELECT * FROM Treinamento")
        dados = cursor.fetchall()
        st.subheader("Treinamentos")
        st.dataframe(pd.DataFrame(dados))

except mysql.connector.Error as err:
    st.error(f"Erro de conexão: {err}")

finally:
    if 'cursor' in locals() and cursor:
        cursor.close()
    if 'conn' in locals() and conn is not None and conn.is_connected():
        conn.close()
