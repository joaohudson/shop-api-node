import userRepository from "./user-repository.js"
import contaRepository from "./conta-repository.js"
import User from "../models/user.js"
import Conta from "../models/conta.js";

const registre = async (data) => {
    try{
        const user = new User(data);
        const conta = new Conta();

        await userRepository.add(user);

        const domainUser = await userRepository.getByLogin(user.login);
        
        await contaRepository.add(conta, domainUser.id);
    }
    catch(e){
        throw e;
    }
}

const unregistre = async (userId) => {
    try{
        await contaRepository.eraseByUserId(userId);
        await userRepository.eraseById(userId);
    }catch(e){
        throw e;
    }
}

export default {
    registre,
    unregistre
}