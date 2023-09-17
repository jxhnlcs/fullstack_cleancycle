# Sistema de Gestão de Residuos - CleanCycle

Um Sistema para exibir uma lista de residuos de cada bairro. Projeto desenvolvido para o Hackathon ByteCraft UNIFAN

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado e configurado.

## Documentação de Como Rodar

Siga as instruções abaixo para executar o sistema em sua máquina local.

1. Abra dois terminais no Visual Studio Code

### Configuração do Backend

1. Navegue até a pasta do backend:

```bash
cd api
```

2. Instale as dependências do servidor:

```bash
npm install
```

3. Inicie o servidor Node.js:

```bash
npm run dev
```

- A API estará rodando em http://localhost:3333.

### Configuração do Frontend

1. Navegue até a pasta do frontend:

```bash
cd web
```

2. Instale as dependências do servidor:

```bash
npm install
```

3. Inicie o servidor Vue.js:

```bash
npm run dev
```

- O sistema estará disponível em http://localhost:8080 no seu navegador.

# Como usar

1. Vá para a aba de extensões e marketplace do Visual Studio Code e instale a extensão REST client

<div align="center">
<img src="https://cdn.discordapp.com/attachments/938974580545040394/1153089097104109699/Screenshot_11.png" width="700px" />
</div>

2. Dentro da pasta API terá um arquivo 'requests.rest', dentro dele terá um método POST chamando a api para adicionar o residuo à tabela. Clique em "Send Request" que estará logo acima da primeira linha e após isso atualize a página e o novo lixo aparecerá nas tabelas

3. Certifique-se de preencher os dados em JSON da maneira que desejar

```bash
POST http://localhost:3333/lixos

{
 "nome": "Nome do Lixo",
 "bairro": "Nome do Bairro",
 "tipo": "Tipo do Lixo",
 "reciclavel": "1 para sim",
 "radioativo": "0 para não"
}
```

## Tecnologias Utilizadas

- Vue.js
- Node.js
- TypeScript
