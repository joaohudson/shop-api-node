import userRepository from "../services/user-repository.js";
import Session from "../models/dtos/session.js";

const tokens = {};

function generateToken(){
    const size = 14;
    const chars = 'abcdefghijklmnopqrstvxyzw';
    let str = '';

    for(let i = 0; i < size; i++){
        const value = Math.floor(Math.random() * chars.length);
        str += chars[value];
    }

    return str;
}

function splitCookies(req){
    const cookies = req.headers['cookie'];
    const listStr = cookies.split(';');
    const result = {};

    for(let token of listStr){
        const pair = token.split('=');
        result[pair[0]] = pair[1];
    }

    return result;
}

const athenticated = (req, res, next) => {
    const cookies = splitCookies(req);
    const token = cookies['token'];
    const sessionRecord = tokens[token];

    if(sessionRecord && Date.now() - sessionRecord.date < 30000){
        next();
    }
    else{
        res.send({ok: false, message: 'Você não está logado!'});
    }
}

const login = async (req, res) => {
    try{
        const session = new Session(req.body);
        Session.validate(session);
        const user = userRepository.getByLogin(session.login);
        
        const token = generateToken();

        tokens[token] = {
            userId: user.id,
            date: Date.now()
        };

        res.setHeader('Set-Cookie', 'token=' + token);
        res.send({ok: true});
    }
    catch(e){
        res.send({ok: false, message: e});
    }
}

export default {
    login,
    athenticated
}