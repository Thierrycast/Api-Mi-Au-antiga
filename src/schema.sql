CREATE TABLE
    usuarios(
        id serial primary key,
        nome text not null,
        email text not null,
        senha text not null,
        data date not null,
        telefone text,
        CEP text,
        endereco text,
        complemento text,
        cidade text,
        estado text,
        status text,
        foto text,
        bio text
    )