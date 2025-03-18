from flask import Flask, render_template, redirect, url_for, session
import os

app = Flask(__name__, template_folder=os.path.join(os.getcwd(), 'public/src/pages/registers'))

# Defina a chave secreta para a sessão
app.secret_key = os.urandom(24)

@app.route('/')
def registers():
    return render_template('index_registers.html')  # Página inicial de registros

@app.route('/acidente')
def acidente():
    return render_template('acidente/index_acidente.html')  # Página de acidente

@app.route('/registro')
def incidente():
    return render_template('incidentes/index_incidentes.html')  # Página de incidente

@app.route('/desvio')
def desvios():
    return render_template('desvios/index_desvios.html')  # Página de desvios (corrigido para o caminho correto)

if __name__ == "__main__":
    app.run(debug=True)
