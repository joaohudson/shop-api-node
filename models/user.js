class User{
    
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.gender = data.gender;
        this.age = data.age;
        this.login = data.login;
        this.password = data.password;
    }

    static clean(user){
        user.login = undefined;
        user.password = undefined;
        return user;
    }

    static validate(user){
        if(!user.name){
            throw 'Nome inválido!';
        }

        if(!user.login){
            throw 'Login inválido!';
        }
      
        if(!user.password){
            throw 'Senha inválida!';
        }

        if(!user.age){
            throw 'Idade inválida!';
        }
            
        if(user.gender != 'male' && user.gender != 'female'){
            throw 'Gênero inválido!';
        }        
    }
}

export default User