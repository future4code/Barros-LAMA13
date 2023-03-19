## <h1 align="center">📇 Labenu Music Awards </h1>

## :memo: Descrição
Projeto desenvolvido como didática de back-end para as turmas JBL LABENU com conteúdos que englobam o universo da criação de APIs com a temática de um sistema que permita o gerenciamento de shows.

## Link Documentação Postman
[Doc_Postman](https://documenter.getpostman.com/view/22363157/2s93CNLYKU)

## Link Deploy Render
https://cookenu21.onrender.com

##  👩🏾Pessoa Desenvolvedora do Projeto

 [<img src="https://avatars.githubusercontent.com/u/74737156?v=4" width=115><br><sub>Byron Smith</sub>](https://github.com/byron-smith-nobrega)

## :books: Funcionalidades
* <b>Signup</b>: Método voltado para a criação de usuários.
* <b>Login</b>: Método voltado a fornecer acesso do usuário ao sistema.
* <b>Get User All</b>: Método voltado para a consulta de todos dos usuário cadastrados.
* <b>Create Band</b>: Método voltado para o cadastro das bandas.
* <b>All Band</b>: Método voltado para a consulta de todas as bandas.
* <b>Get Band</b>: Método voltado para a consulta de uma banda.
* <b>Create Show</b>: Método voltado para o cadastro do show.
* <b>All Show</b>: Método voltado para a consulta de todos os shows.
* <b>Get Show</b>: Método voltado para a consulta de uma show.

## :wrench: Tecnologias utilizadas
* VS Code
* nodeJS
* expressJS
* axios
* cors
* dotenv
* uuid
* bcrupt
* jsonwebtoken
* MySQL


## :rocket: Rodando o projeto
Para rodar o repositório é necessário clonar o mesmo, dar o seguinte comando para instalar as dependências:
```
npm install
```
Após instaladas as dependências, configure o arquivo .env:
```
DB_USER = ""
DB_PASSWORD = ""
DB_HOST = 
DB_PORT = 
DB_DATABASE_NAME = ""
JWT_KEY = ""
BCRYPT_COST = 
ACCESS_TOKEN_EXPIRES_IN = 30min
```
Após configuração do .env, criar as tabelas no banco de dados que se encontram em:
```
queries.sql
```
Após o migrations, dê o comando seguinte para crodar a aplicação:
```
npm run start
```

Use o Postman ou o Insomnia para realizar as requisições desejadas.

## :dart: Status do projeto
O projeto está em andamento.


