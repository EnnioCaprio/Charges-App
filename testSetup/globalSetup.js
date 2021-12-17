const knex =  require('knex');

const getDbConnection = () => {
    return knex({
        client: 'postgres',
        debug: true,
        connection: {
            host: 'localhost',
            database: 'postgres',
            user: 'postgres',
            password: 'password'
        },
    })
}

async function createDatabase() {

    const dbConnection = getDbConnection();

    try{
        await dbConnection.raw('CREATE DATABASE fullstackapp_testing');
    }catch(e){
        console.log(e);
    }finally{
        await dbConnection.destroy();
    }

}

module.exports = async () => {
    await createDatabase();
}