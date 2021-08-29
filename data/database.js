import bd from 'mysql2/promise'

const config = {
    host: 'localhost',
    port: 3306,
    user: 'Hudson',
    password: 'mysql',
    database: 'crud'
};

let instance = null;

export const GetInstanceDb = async () => {
    if(instance){
        return instance;
    }

    instance = await bd.createConnection(config);
    return instance;
}