import { GetInstance } from "../data/database.js";

async function getByUserId(userId){
    const db = await GetInstance();
    const [query] = await db.query('SELECT * FROM Conta WHERE id_User = ?;', [userId]);
    return query.length == 0 ? null : query[0];
}

const add = async (conta, userId) => {
    const db = await GetInstance();
    
    if(await getByUserId(userId)){
        throw 'Este usuário já possui uma conta';
    }

    db.query('INSERT INTO Conta(balance, id_User) VALUES(?,?);', [conta.balance, userId]);
}

const findByUserId = async (userId) => {
    const conta = await getByUserId(userId);

    if(!conta){
        throw 'Este usuário não possui conta!';
    }

    return conta;
}

const eraseByUserId = async (userId) => {
    const conta = getByUserId(userId);
    const db = await GetInstance();

    db.query('DELETE FROM Conta WHERE id = ?;', conta.id);
}

export default {
    add,
    findByUserId,
    eraseByUserId
}