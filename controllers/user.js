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

const find = async (req, res) => {
    try{
        const login = req.userId;
        
        if(!login)
            throw 'Você não tem acesso a este recurso!';

        const user = await UserRepository.getById(login, User.toDto);
        res.json({ok: true, data: user});
    }
    catch(e){
        res.json({ok: false, message: e});
    }
}

const erase = async (req, res) => {
    try{
        const userId = req.userId;

        if(!userId){
            throw 'Você não tem acesso a este recurso!';
        }

        await userRegistrationService.unregistre(userId);
        
        res.json({ok: true});

    }catch(e){
        res.json({ok: false, message: e});
    }
}

export default {
    create,
    find,
    erase
}