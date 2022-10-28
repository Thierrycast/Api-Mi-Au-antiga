# API Mi&Au

API Restfull para sistema de adoção e doação de Pets.

###### tags: `Mi&Au` `backend`

**Sumário**:

- Parte 1 - Schema
- Parte 2 - Sprints

---

## Schema

- Tabelas:

  - Users
    - id, nome, email, senha, telefone
    - aniversario, CEP, Adotante/Doador
    - foto, Bio
  - Cats

    - id, nome, raça, genêro, aniversario,
    - castrado, peso, foto, bio
    - ID do doador

  - Dogs
    - id, nome, raça, genêro, aniversario,
    - castrado, peso, foto, bio
    - ID do doador

---

## Sprints

<details>
<summary>1ª Sprint</summary>
<br>

<details>
<summary><b>[Usuário] Cadastro do usuário</b></summary>
<br>

### `Rota para o cadastro de um novo usuário`

- <b>informações</b>
  - Para acessar este formulário de cadastro não deverá ser exigida autenticação
  - Os dados do cadastro deverão ser persistidos no banco de dados.
  - A senha do usuário deverá ser persistida utilizando algum algoritmo de criptografia confiável.
  - Deve ser criado uma validação de idade.

---

`post('/user', registerUser)`

- Campos necessários para o cadastro:
  - Nome do usuário (obrigatório)
  - Email (obrigatório)
  - Senha (obrigatório)
  - telefone
  - data de nascimento
  - CEP
  - status
  - bio
  - foto
    <br>
- Query #1: `(users).select(*).where('email' = email)`.
  - se existir, retornar "usuário já cadastrado".
- Query #2: `(users).insert(req.body)`.

</details>
    <details>
<summary><b>[Usuário] Detalhar usuário</b></summary>
<br>

### `Rota para detalhar dados de um usuário`

- <b>informações</b>
  - Para acessar esta rota deverá ser exigida autenticação.
  - deve retornar todos os dados de um usuário específico.

---

`get('/user/:id', detailUser)`

- Query #1: `(users).select(*).where('id' = id)`.

</details>
    <details>
<summary><b>[Login] Login do usuário</b></summary>

### `Rota de login para acesso do sistema.`

---

`post('/login', login)`

- Login de usuário:
  - req.body
    - email, password.
  - Query #1: `(users).select(*).where('email' = email)`.
  - Comparar senha
  - Liberar token
  - Retornar token

</details>
<details>
<summary><b>[usuário] atualizar usuário</b></summary>

### `Rota para atualização de dados de um usuário.`

- <b>informações</b>
  - Para acessar esta rota deverá ser exigida autenticação.
  - essa rota deve atualizar as informações de um usuário com os dados vindos do body.

---

`put('/user/:id', updateUser)`

- Atualizar um usuário
  - req.body
    - name, email, phone, password
    - birthday, CEP, status
    - bio, photo
  - req.params
    - id
  - Query #1: `(users).select(*).where('id' = id)`.
    - se não existir, retornar "usuário não encontrado".
  - Query #2: `(users).insert(req.body).where('id' = id)`.

</details>
<br>

<details>
<summary><b>[Login] verificar login</b></summary>

### `middleware de validação.`

`use(authorization)`

- <b>informações</b>
  - esse middleware deve fazer a validação do token para o uso de certas rotas.

</details>

<details>
<summary><b>[Database] criação do schema</b></summary>

### `criação do schema e banco de dados.`

- <b>informações</b>
  - deve se decidir e criar o banco de dados.
  - um extra seria a cofiguração do `Yup`

</details>

<details>
<summary><b>[Database] upload de fotos</b></summary>

### `resolver as atividades referentes ao upload de fotos.`

- <b>informações</b>
  - deve se escolher e configurar a plataforma para o upload (supabase).
  - atualizar os controller de cadastro e edição do usuário, agora com a função de upload de imagens.

</details>

<details>
<summary><b>[Deploy] configurar deploy</b></summary>

### `configurar deploy.`

- <b>informações</b>
  - junto de todos deve se decidir onde faremos o deploy(tarefa difícil).
  - configurar as credenciais de deploy.

</details>

</details>
