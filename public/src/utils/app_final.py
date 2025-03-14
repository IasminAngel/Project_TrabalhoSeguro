from flask import Flask, Response
import pymysql
import csv
import io

app = Flask(__name__)

# Conectar ao MySQL
def get_db_connection():
    return pymysql.connect(host="localhost", user="root", password="", database="seu_banco")

@app.route('/download/<tipo>')
def download_report(tipo):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Buscar os registros no banco
    if tipo == "tudo":
        cursor.execute("SELECT id, tipo, descricao FROM registros")
    else:
        cursor.execute("SELECT id, tipo, descricao FROM registros WHERE tipo = %s", (tipo,))

    registros = cursor.fetchall()
    conn.close()

    # Criando o CSV dinamicamente
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Tipo", "Descrição"])  # Cabeçalhos
    writer.writerows(registros)

    response = Response(output.getvalue(), mimetype="text/csv")
    response.headers["Content-Disposition"] = f"attachment; filename=relatorio_{tipo}.csv"
    return response

if __name__ == "__main__":
    app.run(debug=True)
