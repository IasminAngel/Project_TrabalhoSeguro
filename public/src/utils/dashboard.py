# Para rodar instalar biblioteca streamlit e ploty.express
# Pip install streamlit
# Pip install ploty
# Comando para rodar: python -m streamlit run public/src/utils/dashboard.py

import streamlit as st
import pandas as pd
import plotly.express as px
import base64

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


def get_imagem(path):
    with open(path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode()


imagem = get_imagem("public/assets/imgs/Logotipo_TS.png")


dadosSetores = pd.DataFrame({
    'Setor': ['Produção', 'Qualidade', 'Manutenção'],
    'Incidentes': [2, 1, 2]  # Exemplo de número de incidentes por setor
})

dadosAcidentes = pd.DataFrame({
    'Setor': ['Produção', 'Qualidade', 'Manutenção'],
    'Acidentes': [1, 0, 1]  # Exemplo de número de acidentes por setor
})

dadosTreinamento = pd.DataFrame({
    'Setor': ['Produção', 'Qualidade', 'Manutenção'],
    'Treinamentos': [1, 1, 1]  # Exemplo de número de treinamentos realizados por setor
})


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

    st.subheader("Incidentes por Setor")
    fig = px.bar(dadosSetores, x="Setor", y="Incidentes", color="Setor", title="Incidentes Registrados")
    st.plotly_chart(fig, use_container_width=True)

    st.divider()

    st.subheader("Acidentes por Setor")
    fig_acidentes = px.bar(dadosAcidentes, x="Setor", y="Acidentes", color="Setor", title="Acidentes Registrados")
    st.plotly_chart(fig_acidentes, use_container_width=True)

    st.divider()

    st.subheader("Treinamentos por Setor")
    fig_treinamento = px.bar(dadosTreinamento, x="Setor", y="Treinamentos", color="Setor", title="Treinamentos Realizados")
    st.plotly_chart(fig_treinamento, use_container_width=True)

    st.divider()

if __name__ == '__main__':
    dashboard()
