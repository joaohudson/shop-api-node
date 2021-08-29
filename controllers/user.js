import User from '../models/user.js'
import UserRepository from './../services/user-repository.js'
import userRegistrationService from '../services/user-registration-service.js';

const create = async (req, res) => {
    try{
        await userRegistrationService.registre(req.body);
        res.json({ok: true});
    }
    catch(e){
        res.json({ok: false, message: e});
    }
}

const listAll = async (req, res) => {
    try{    
        const result = await UserRepository.getAll(User.toDto);
        res.json({ok: true, data: result});
    }
    catch(e){
        res.json({ok: false, message: e});
    }
}

const find = async (req, res) => {
    try{
        const login = req.query.login;
        
        if(!login)
            throw 'Login não informado!';

        const user = await UserRepository.getByLogin(login, User.toDto);
        res.json({ok: true, data: user});
    }
    catch(e){
        res.json({ok: false, message: e});
    }
}

const erase = async (req, res) => {
    try{
        const userId = req.query.userId;

        if(!userId){
            throw 'Id do usuário não informado!';
        }

        await userRegistrationService.unregistre(userId);
        
        res.json({ok: true});

    }catch(e){
        res.json({ok: false, message: e});
    }
}

export default {
    create,
    listAll,
    find,
    erase
}