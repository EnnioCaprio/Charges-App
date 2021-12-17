const bcrypt = require('bcrypt');

exports.seed = async (knex) => {
    return knex('employee')
    .insert(
        { name: 'root', surname: 'system', email: 'root@company.com', password: await bcrypt.hash('root1234', 10), is_oauth: false, deleted_employee: false }
    )
}