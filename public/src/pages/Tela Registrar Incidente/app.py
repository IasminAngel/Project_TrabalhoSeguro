from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # Página inicial

@app.route('/setores')
def setores():
    return "Página de Setores"  # Página para Setores

@app.route('/registros')
def registros():
    return "Página de Registros"  # Página para Registros

@app.route('/funcionarios')
def funcionarios():
    return "Página de Funcionários"  # Página para Funcionários

if __name__ == '__main__':
    app.run(debug=True)
