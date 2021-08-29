function validate(session){
    if(!session.login){
        throw 'Login inválido!';
    }

    if(!session.password){
        throw  'Senha inválida!'
    }
}

class Session{
    constructor(data){
        this.login = data.login;
        this.password = data.password;
        validate(this);
    }
}

export default Session;