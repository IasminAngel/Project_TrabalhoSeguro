import streamlit as st

# Função para simular um questionário
def questionario():
    st.title('Questionário de Segurança no Trabalho')

    # Exemplo de perguntas
    nome = st.text_input('Qual seu nome?')
    idade = st.number_input('Qual sua idade?', min_value=18, max_value=100)
    setor = st.selectbox('Em qual setor você trabalha?', ['TI', 'Marketing', 'RH', 'Logística', 'Financeiro'])

    # Exemplo de botão para submeter
    if st.button('Submeter'):
        st.write(f'Nome: {nome}')
        st.write(f'Idade: {idade}')
        st.write(f'Setor: {setor}')
        st.success('Formulário submetido com sucesso!')

if __name__ == '__main__':
    questionario()
