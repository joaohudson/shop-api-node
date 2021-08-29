import { GetInstanceDb } from '../data/database.js';

async function getUserByLogin(login){
    const db = await GetInstanceDb();
    const [query] = await db.query('SELECT * FROM User WHERE login = ?;', [login]);
    return query.length == 0 ? null : query[0];
}

async function getUserById(id){
    const db = await GetInstanceDb();
    const [query] = await db.query('SELECT * FROM User WHERE id = ?;', [id]);
    return query.length == 0 ? null : query[0];
}

const add = async (user) => {
    const db = await GetInstanceDb();

    if(await getUserByLogin(user.login)){
        throw 'Usuário já existe!';
    }
    
    await db.query('INSERT INTO User (gender, name, age, login, password) VALUES(?,?,?,?,?);', [user.gender, user.name, user.age, user.login, user.password]);
}

const eraseById = async (id) => {
    const db = await GetInstanceDb();
    const user = await getUserById(id);

    if(!user){
        throw 'Este usuário não existe!';
    }

    await db.query('DELETE FROM User WHERE id = ?;', [id]);
}

const eraseByLogin = async (login) =>{
    const db = await GetInstanceDb();
    const user = await getUserByLogin(login);
    
    if(!user){
        throw 'Usuário não existe!';
    }

    await db.query('DELETE FROM User WHERE id = ?;', [user.id]);
}

const getAll = async (filter) => {

        const db = await GetInstanceDb();

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
    const user = await getUserByLogin(login);

    if(!user){
        throw 'Esse usuário não existe!';
    }

    return filter ? filter(user) : user;
}

export default {
    add,
    eraseByLogin,
    eraseById,
    getByLogin,
    getAll
}