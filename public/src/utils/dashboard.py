
# Para rodar instalar biblioteca streamlit e ploty.express
# Pip install streamlit
# Pip install ploty
# Comando para rodar: python -m streamlit run public/src/utils/dashboard.py 

import streamlit as st
import pandas as pd
import plotly.express as px
import base64


st.set_page_config(page_title="Dashboard - Trabalho Seguro", layout="wide")

 

# Cor de fundo
def corbackground():
    st.markdown("""
        <style>
            .stApp {
                background-color: #f0f0f5;
            }
        </style>
    """, unsafe_allow_html=True)

 

corbackground()

 

# Função para converter imagem em base64
def get_imagem(path):
    with open(path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode()

 

# Caminho da imagem local
imagem = get_imagem("public/assets/imgs/Logotipo_TS.png")

 

# Dados
dadosRegistros = pd.DataFrame({
    'Setor': ['Oficina', 'Escritório', 'almoxarifado', 'laboratórito'],
    'Incidentes': [5, 2, 3, 7]
})

 

# Função do Dashboard
def dashboard():

 

 

    # Logo trabalho seguro
    st.markdown(f"""
        <div style='display: flex; align-items: center; gap: 12px;'>
            <img src='data:image/png;base64,{imagem}' width='45'/>
            <h1 style='margin: 0;'>Dashboard de Segurança do Trabalho</h1>
        </div>
    """, unsafe_allow_html=True)

 

    col1, col2, col3 = st.columns(3)
    col1.metric("Total de Incidentes", sum(dadosRegistros['Incidentes']))
    col2.metric("Setor com Mais Incidentes", dadosRegistros.loc[dadosRegistros['Incidentes'].idxmax()]['Setor'])
    col3.metric("Média por Setor", round(dadosRegistros['Incidentes'].mean(), 2))

 

    st.divider()

 

    st.subheader("Incidentes por Setor")
    fig = px.bar(dadosRegistros, x="Setor", y="Incidentes", color="Setor", title="Incidentes Registrados")
    st.plotly_chart(fig, use_container_width=True)

 

    st.divider()

 

if __name__ == '__main__':
    dashboard()
  
