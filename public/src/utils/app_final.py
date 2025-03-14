from flask import Flask, Response, abort
import pymysql
import csv
import io
import os

app = Flask(__name__)

# Variáveis de ambiente para informações sensíveis
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "seu_banco")

# Conectar ao MySQL
def get_db_connection():
    return pymysql.connect(
        host=DB_HOST, 
        user=DB_USER, 
        password=DB_PASSWORD, 
        database=DB_NAME
    )

# Validar tipos de relatório
def validate_tipo(tipo):
    tipos_validos = ["tudo", "tipo1", "tipo2"]  # Adapte com os tipos válidos que você deseja
    if tipo not in tipos_validos:
        abort(400, description="Tipo inválido.")

@app.route('/download/<tipo>')
def download_report(tipo):
    validate_tipo(tipo)

    # Conectar ao banco de dados
    with get_db_connection() as conn:
        cursor = conn.cursor()

        # Buscar os registros no banco
        if tipo == "tudo":
            cursor.execute("SELECT id, tipo, descricao FROM registros")
        else:
            cursor.execute("SELECT id, tipo, descricao FROM registros WHERE tipo = %s", (tipo,))

        registros = cursor.fetchall()

    # Criando o CSV dinamicamente
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Tipo", "Descrição"])  # Cabeçalhos
    writer.writerows(registros)

    # Preparando a resposta para o download do CSV
    response = Response(output.getvalue(), mimetype="text/csv")
    response.headers["Content-Disposition"] = f"attachment; filename=relatorio_{tipo}.csv"
    return response

if __name__ == "__main__":
    app.run(debug=True)
