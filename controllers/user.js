import User from '../models/user.js'
import UserRepository from './../services/user-repository.js'

const create = async (req, res) => {
    try{
        const user = new User(req.body);
        await UserRepository.add(user);
        res.send({ok: true});
    }
    catch(e){
        res.send({ok: false, message: e});
    }
}

const listAll = async (req, res) => {
    try{    
        const result = await UserRepository.getAll(User.clean);
        res.json({ok: true, data: result});
    }
    catch(e){
        res.json({ok: false, message: e});
    }
}

const find = async (req, res) => {
    try{
        const user = await UserRepository.getByLogin(req.query.login, User.clean);
        res.json({ok: true, data: user});
    }
    catch(e){
        res.json({ok: false, message: e});
    }
}

export default {
    create,
    listAll,
    find
}