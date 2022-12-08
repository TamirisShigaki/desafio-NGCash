# **Contexto do projeto**

Aplicação dockerizada de carteira digital que contém algumas páginas, onde o usuário pode criar um novo usuário, efetuar login, realizar transferências, visualizar e filtrar todas as transações que participou (cash-in\cash-out).<br />
A aplicação conta com uma página Home, onde é possível visualizar o balance (saldo) atual da conta, uma pré-visualização das 4 ultimas transações e dois botões que redireciona para outra página, uma para realizar a transferência e outra para visualização e filtragem de todas as transações.
<br /><br />

<details>
  <summary><strong>Regra de negócio</strong></summary><br />

  * Qualquer pessoa deverá poder fazer parte da NG. Para isso, basta realizar o cadastro informando *username* e *password*.
  
  * Deve-se garantir que cada *username* seja único e composto por, pelo menos, 3 caracteres.

  * Deve-se garantir que a *password* seja composta por pelo menos 8 caracteres, um número e uma letra maiúscula. Lembre-se que ela deverá ser *hashada* ao ser armazenada no banco.
  
  * Durante o processo de cadastro de um novo usuário, sua respectiva conta deverá ser criada automaticamente na tabela **Accounts** com um *balance* de R$ 100,00. É importante ressaltar que caso ocorra algum problema e o usuário não seja criado,  a tabela **Accounts** não deverá ser afetada.
  
  * Todo usuário deverá conseguir logar na aplicação informando *username* e *password.* Caso o login seja bem-sucedido, um token JWT (com 24h de validade) deverá ser fornecido.
  
  * Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar seu próprio *balance* atual. Um usuário A não pode visualizar o *balance* de um usuário B, por exemplo.
  
  * Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de realizar um *cash-out* informando o *username* do usuário que sofrerá o *cash-in*), caso apresente *balance* suficiente para isso. Atente-se ao fato de que um usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo.
  
  * Toda nova transação bem-sucedida deverá ser registrada na tabela **Transactions**. Em casos de falhas transacionais, a tabela **Transactions** não deverá ser afetada.
  
  * Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar as transações financeiras (*cash-out* e *cash-in*) que participou. Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela.
  
  * Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de filtrar as transações financeiras que participou por:
    - Data de realização da transação e/ou
        - Transações de *cash-out;*
        - Transações de *cash-in.*


</details><br />

A aplicação foi construida utilizando React.js juntamente com Node.js e Typescript.
<br /><br />
<hr/>

## **Stacks utilizadas no projeto**

<details>
  <summary><strong>Stacks Compartilhadas</strong></summary><br />

  * <a href="https://eslint.org/" target="_blank" rel="external"><span><strong>Lint</strong></span></a> - Mantém um padrão no código da aplicação.

  * <a href="https://www.typescriptlang.org/" target="_blank" rel="external"><span><strong>TypeScript</strong></span></a> - Mantém um código legível e evitando erros comuns.

  * <a href="https://www.npmjs.com/package/react-uuid" target="_blank" rel="external"><span><strong>uuid</strong></span></a> - Ferramenta para geração de ID's únicos.

   * <a href="https://docs.docker.com/" target="_blank" rel="external"><span><strong>Docker</strong></span></a> - Simula o ambiente de desenvolvimento virtualmente.
</details><br />

<details>
  <summary><strong>Stacks Front-End</strong></summary><br />
  
  * <a href="https://vitejs.dev/" target="_blank" rel="external"><span><strong>Vite.js</strong></span></a> - Ferramenta de configuração para uma aplicação React.

  * <a href="https://www.npmjs.com/package/axios" target="_blank" rel="external"><span><strong>Axios</strong></span></a> - Utilizado para fazer as requisições das API's.

  * <a href="https://www.npmjs.com/package/react-router-dom" target="_blank" rel="external"><span><strong>React-Router-dom</strong></span></a> - Gerenciamento das rotas no React.

  * <a href="https://zustand-demo.pmnd.rs/" target="_blank" rel="external"><span><strong>Zustand</strong></span></a> - Ferramenta para gerenciamento de estados globais.

  * <a href="https://vitest.dev/" target="_blank" rel="external"><span><strong>Vitest</strong></span></a> - Ferramenta de construção de testes automatizados.

  * <a href="https://tailwindcss.com/" target="_blank" rel="external"><span><strong>Tailwind-css</strong></span></a> - Ferramenta para estilização de componentes.
</details><br />

<details>
  <summary><strong>Stacks Back-End</strong></summary><br />

  * <a href="https://www.prisma.io/docs" target="_blank" rel="external"><span><strong>Prisma ORM</strong></span></a> - ORM de bancos relacionais e não relacionais para Node.js.

  * <a href="https://www.postgresql.org/docs/" target="_blank" rel="external"><span><strong>PostegreSQL</strong></span></a> - Gerenciamento de banco de dado relacional.

  * <a href="https://www.npmjs.com/package/cors" target="_blank" rel="external"><span><strong>Cors</strong></span></a> - Ferramenta de exibição de domínios.

  * <a href="https://www.npmjs.com/package/express" target="_blank" rel="external"><span><strong>Express</strong></span></a> - Ferramenta para Node.js para construção de servidores web.

  * <a href="https://www.npmjs.com/package/express-async-errors" target="_blank" rel="external"><span><strong>Express-async-errors</strong></span></a> - Ferramenta para captura de erros da aplicação.

  * <a href="https://www.npmjs.com/package/http-status-codes" target="_blank" rel="external"><span><strong>HTTP-status-codes</strong></span></a> - Padroniza códigos de status HTTP.

  * <a href="https://joi.dev/" target="_blank" rel="external"><span><strong>JOI</strong></span></a> - Ferramenta para validação de dados.

  * <a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank" rel="external"><span><strong>JWT</strong></span></a> - Ferramenta de criptografia de dados.

   * <a href="https://jestjs.io/pt-BR/" target="_blank" rel="external"><span><strong>Jest</strong></span></a> - Ferramenta de construção de testes automatizados.

   * <a href="https://swagger.io/docs/" target="_blank" rel="external"><span><strong>Swagger UI</strong></span></a> - Ferramenta para criação da documentação da API.
</details>
<br />
<hr/>

## **Como iniciar o projeto Docker e localmente**

<!-- O Projeto utiliza as portas (), garanta que elas não estejam sendo utilizadas. -->

<br />
Via terminal, entre na pasta raiz do projeto `./Desafio-NGCASH`:
<br /><br />

```sh
cd Desafio-NGCASH/
```
<br />
Em seguida execute o seguinte comando para iniciar a aplicação via Docker-compose:
<br /><br />

```sh
npm run start:docker
```
<br />
Ou para inicial a aplicação localmente utilize o comando:<br/>
OBS: Será necessário ter o Node.js (versão 16) instalado.
<br/><br />

```sh
npm run start
npm run start:server
npm run start:web
```

Esses comando irá instalar as dependências de todo o `server` e da aplicação `web`, pode levar alguns minutos.
<br />

Caso queira, pode executar separadamente navegando até a raiz de cada aplicação e utilizar o mesmo comando.
<br /><br />

Para rodar os testes, na raiz do projeto `./Desafio-NGCASH` execute o seguinte comando:

```sh
npm run com
npm test
```

Isso irá executar os testes de uma única vez.
<br /><br />

## **Web**
<br />

A página web irá rodar na `porta 3026` da sua máquina (http://localhost:3026/) via Docker. Localmente a aplicação indicará a porta quando for iniciada.
<br />

## **API**
<br />

A API ira utilizar a `porta 3025` da sua máquina (http://localhost:3025/).
<br />

Já existe quatro usuários cadastrados para testar a aplicação, sendo eles:
<br />

*User 1*
<br />
`Username: Felipe`
<br />
`Password: MinhaSenha123`
<br />

*User 2*
<br />
`Username: João`
<br />
`Password: MinhaSenha123`
<br />

*User 3*
<br />
`Username: Tamiris`
<br />
`Password: MinhaSenha123`
<br />

*User 4* - Esse usuário não tem nenhuma transação.
<br />
`Username: Bernardo`
<br />
`Password: MinhaSenha123`

<br />

Caso queira conferir as informações no banco de dados (via Docker), na raiz do projeto `./Desafio-NGCASH`, utilize o comando para visualizar o banco de dados.

```sh
npm run db
npx prisma studio
```

Isso irá abrir o banco de dados no navegador utilizando a porta `porta 5555` da sua máquina (http://localhost:5555/)
<br />
<br />

Para visualizar o banco de dados na aplicação localmente, na raiz do projeto `./Desafio-NGCASH`, utilize o comando:

```sh
npm run db:local
```
Isso irá abrir uma interface do banco de dados no navegador utilizando a porta
<br />
<br />

## **Documentação API**

A Documentação Swagger UI irá utilizar a `porta 3025`, (http://localhost:3025/doc/)