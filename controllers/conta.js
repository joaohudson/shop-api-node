import contaRepository from "../services/conta-repository.js"

const find = async (req, res) => {
    try{
        const userId = req.userId;
        
        if(!userId){
            throw 'Id do usuário não informado!';
        }

        const conta = await contaRepository.findByUserId(userId);
        res.json({ok: true, data: conta});
    }catch(e){
        res.json({ok: false, message: e});
    }
}

export default {
    find
}