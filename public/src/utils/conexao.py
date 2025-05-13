import mysql.connector
from mysql.connector import Error

def conectar():
    try:
        conexao = mysql.connector.connect(
            host='localhost',
            database='Trabalho_Seguro',
            user='root',
            password=''
        )

        if conexao.is_connected():
            return conexao
    except Error as e:
        print(f"Erro na conexão: {e}")
        return None
