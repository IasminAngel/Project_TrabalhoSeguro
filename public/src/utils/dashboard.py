# Para rodar instalar biblioteca streamlit e plotly.express
# pip install streamlit
# pip install plotly

import streamlit as st
import pandas as pd
import plotly.express as px
import base64
import os

st.set_page_config(page_title="Dashboard - Trabalho Seguro", layout="wide")

def corbackground():
    st.markdown("""
        <style>
            .stApp {
                background-color: #f0f0f5;
            }
        </style>
    """, unsafe_allow_html=True)

corbackground()

def get_imagem(path_relativo):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    caminho_absoluto = os.path.join(base_dir, path_relativo)
    with open(caminho_absoluto, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode()

imagem = get_imagem("../../assets/imgs/Logotipo_TS.png")

dadosSetores = pd.DataFrame({
    'Setor': ['Produção', 'Qualidade', 'Manutenção'],
    'Incidentes': [2, 1, 2]
})

dadosAcidentes = pd.DataFrame({
    'Setor': ['Produção', 'Qualidade', 'Manutenção'],
    'Acidentes': [1, 0, 1]
})

dadosTreinamento = pd.DataFrame({
    'Setor': ['Produção', 'Qualidade', 'Manutenção'],
    'Treinamentos': [1, 1, 1]
})

#Configurações de tipos de gráficos
def escolher_grafico(tipo, dados, x, y, titulo):
    if tipo == "Coluna":
        return px.bar(dados, x=x, y=y, color=x, title=titulo)
    elif tipo == "Pizza":
        return px.pie(dados, names=x, values=y, title=titulo)
    elif tipo == "Linha":
        return px.line(dados, x=x, y=y, title=titulo, markers=True)
    elif tipo == "Barra Horizontal":
        return px.bar(dados, x=y, y=x, color=x, orientation='h', title=titulo)
    else:
        return px.bar(dados, x=x, y=y, color=x, title=titulo)

def dashboard():
    st.markdown(f"""
        <div style='display: flex; align-items: center; gap: 12px;'>
            <img src='data:image/png;base64,{imagem}' width='45'/>
            <h1 style='margin: 0;'>Dashboard de Segurança do Trabalho</h1>
        </div>
    """, unsafe_allow_html=True)

    col1, col2, col3 = st.columns(3)
    col1.metric("Total de Incidentes", sum(dadosSetores['Incidentes']))
    col2.metric("Setor com Mais Incidentes", dadosSetores.loc[dadosSetores['Incidentes'].idxmax()]['Setor'])
    col3.metric("Média de Incidentes por Setor", round(dadosSetores['Incidentes'].mean(), 2))

    st.divider()

    # Incidentes
    st.subheader("Incidentes por Setor")
    tipo_incidente = st.selectbox("Selecione o tipo de gráfico de Incidentes:", ["Coluna", "Pizza", "Linha", "Barra Horizontal"])
    fig = escolher_grafico(tipo_incidente, dadosSetores, "Setor", "Incidentes", "Incidentes Registrados")
    st.plotly_chart(fig, use_container_width=True)

    st.divider()

    # Acidentes
    st.subheader("Acidentes por Setor")
    tipo_acidente = st.selectbox("Selecione o tipo de gráfico de Acidentes:", ["Coluna", "Pizza", "Linha", "Barra Horizontal"])
    fig_acidentes = escolher_grafico(tipo_acidente, dadosAcidentes, "Setor", "Acidentes", "Acidentes Registrados")
    st.plotly_chart(fig_acidentes, use_container_width=True)

    st.divider()

    # Treinamentos
    st.subheader("Treinamentos por Setor")
    tipo_treinamento = st.selectbox("Selecione o tipo de gráfico de Treinamentos:", ["Coluna", "Pizza", "Linha", "Barra Horizontal"])
    fig_treinamento = escolher_grafico(tipo_treinamento, dadosTreinamento, "Setor", "Treinamentos", "Treinamentos Realizados")
    st.plotly_chart(fig_treinamento, use_container_width=True)

    st.divider()

if __name__ == '__main__':
    dashboard()
