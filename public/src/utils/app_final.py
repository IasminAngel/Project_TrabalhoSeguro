<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Inicial</title>
    
    <!-- Importando CSS corretamente -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">

    <!-- FontAwesome para ícones -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body>

    <img src="{{ url_for('static', filename='imgs/logoTrabalhoseguro.png') }}" alt="Logo Trabalho Seguro" class="top-img" draggable="false">

    <div class="container">
        {% for botao in botoes %}
            <a href="{{ botao.href }}" class="option">
                <img src="{{ botao.src }}" alt="{{ botao.alt }}" class="option-img" draggable="false">
            </a>
        {% endfor %}
    </div>

    <!-- Ícones -->
    {% for icone in icones_principais %}
        <a href="{{ icone.href }}" class="icon {{ icone.extra_class }}" {% if icone.target %}target="{{ icone.target }}"{% endif %}>
            <i class="{{ icone.class }}"></i>
        </a>
    {% endfor %}

    <!-- Ícones no canto superior direito -->
    <div class="icons-top-right">
        {% for icone in icones_top_right %}
            <a href="{{ icone.href }}" class="icon {{ icone.extra_class }}">
                <i class="{{ icone.class }}"></i>
            </a>
        {% endfor %}
    </div>

</body>
</html>
