const knex =  require('knex');

async function deleteDatabase() {
    const dbConnection = knex({
        client: 'postgres',
        debug: true,
        connection: {
            host: 'localhost',
            database: 'postgres',
            user: 'postgres',
            password: 'password'
        }
    })

    try{
        await dbConnection.raw('DROP DATABASE IF EXISTS fullstackapp_testing');
    }catch(e){
        console.log(e);
    }finally{
        await dbConnection.destroy();
    }
}

module.exports = async () => {
    await deleteDatabase();
}