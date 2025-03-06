from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    botoes = [
        {"href": "/funcionarios", "src": "/public/src/assets/imgs/Funcionario.png", "alt": "Funcionários"},
        {"href": "/setores", "src": "/public/src/assets/imgs/Setores.png", "alt": "Setores"},
        {"href": "/registros", "src": "/public/src/assets/imgs/Registros.png", "alt": "Registros"}
    ]
    icones_principais = [
        {"href": "#", "class": "fas fa-download", "extra_class": "download-icon"},
        {"href": "https://wa.me/5511999999999", "class": "fab fa-whatsapp", "extra_class": "whatsapp-icon", "target": "_blank"}
    ]
    icones_top_right = [
        {"href": "#", "class": "fas fa-door-open", "extra_class": "settings-icon"},
        {"href": "#", "class": "fas fa-user", "extra_class": "person-icon"}
    ]
    return render_template('index.html', botoes=botoes, icones_principais=icones_principais, icones_top_right=icones_top_right)

if __name__ == '__main__':
    app.run(debug=True)
