import User from './../models/user.js'
import { GetInstance } from '../data/database.js';

const add = async (user) => {
    User.validate(user);
    const db = await GetInstance();
    const [query] = await db.query('SELECT * FROM User WHERE login = ?;', [user.login]);
    const exists = query.length > 0;

    if(exists){
        throw 'Usuário já existe!';
    }
    
    db.query('INSERT INTO User (gender, name, age, login, password) VALUES(?,?,?,?,?)', [user.gender, user.name, user.age, user.login, user.password]);
}

const eraseByLogin = async (login) =>{
    const db = await GetInstance();

    const user = await db.query('SELECT FROM User WHERE login = ?', [login]);
    
    if(!user){
        throw 'Usuário não existe!';
    }

    db.query('DELETE FROM User WHERE name = ?', [login]);
}

const getAll = async (filter) => {

        const db = await GetInstance();

        const [query] = await db.query('SELECT * FROM User;');
        const result = [];

        if(filter){
            for(const line of query){
                result.push(filter(line));
            }
        }
        else{
            for(const line of query){
                result.push(line);
            }
        }

        return result;
}

const getByLogin = async (login, filter) => {
    const db = await GetInstance();
    const [query] = await db.query('SELECT * FROM User WHERE login = ?;', [login]);

    if(query.length == 0){
        throw 'Esse login não existe!';
    }

    return filter ? filter(query[0]) : query[0];
}

export default {
    add,
    eraseByLogin,
    getByLogin,
    getAll
}