class Session{
    constructor(data){
        this.login = data.login;
        this.password = data.password;
    }

    static validate(session){
        if(!session.login){
            throw 'Login inválido!';
        }

        if(!session.password){
            throw  'Senha inválida!'
        }
    }
}

export default Session;