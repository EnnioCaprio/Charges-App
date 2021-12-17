
exports.up = async (knex) => {

    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await knex.schema.createTable('employee', table => {
        table.increments('id_employee').primary().notNullable();
        table.string('name', 255).notNullable();
        table.string('surname', 255).notNullable();
        table.string('email', 255).unique().notNullable();
        table.string('password', 255).notNullable();
        table.boolean('is_oauth').notNullable();
        table.boolean('deleted_employee').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })

    await knex.schema.createTable('charge', table => {
        table.increments('id_charge').primary().notNullable();
        table.string('name_charge', 255).unique().notNullable();
        table.string('code_charge', 10).unique().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })

    await knex.schema.createTable('confirmed_charge', table => {
        table.uuid('id_confirmed_charge').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('period', 255).notNullable();
        table.integer('id_employee').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.boolean('active_charge');
        table.foreign('id_employee').references('employee.id_employee')
        table.unique(['period', 'id_employee']);
    })

    await knex.schema.createTable('charges_operation', table => {
        table.uuid('id_charge_list').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'));;
        table.string('code_charge', 10).notNullable();
        table.string('period', 255).notNullable();
        table.jsonb('days_keeper').notNullable();
        table.uuid('id_confirmed_charge');
        table.integer('id_employee').notNullable();
        table.boolean('create_charge').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('code_charge').references('charge.code_charge');
        table.foreign('id_confirmed_charge').references('confirmed_charge.id_confirmed_charge').onDelete('CASCADE');
        table.foreign('id_employee').references('employee.id_employee')
        table.unique(['code_charge', 'period', 'id_employee']);
    })

    await knex.schema.createTable('location', table => {
        table.increments('id_location').primary().notNullable();
        table.string('location_name', 255).notNullable();
    })

    await knex.schema.createTable('location_operation', table => {
        table.uuid('id_location_operation').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'));;
        table.string('location_period', 10).notNullable();
        table.specificType('days_location', 'INT[]').notNullable();
        table.integer('id_location').notNullable();
        table.uuid('id_confirmed_charge');
        table.integer('id_employee').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('id_location').references('location.id_location');
        table.foreign('id_confirmed_charge').references('confirmed_charge.id_confirmed_charge').onDelete('CASCADE');
        table.foreign('id_employee').references('employee.id_employee');
        table.unique(['location_period', 'id_employee', 'id_location']);
    })

    await knex.raw("ALTER TABLE employee ADD CHECK(email LIKE '%_@_%.com')");
    
    return await knex.raw("ALTER TABLE employee ADD CHECK(password NOT LIKE '%password%')");
};

exports.down = async (knex) => {
    await knex.raw('DROP TABLE IF EXISTS employee CASCADE');
    await knex.raw('DROP TABLE IF EXISTS charge CASCADE');
    await knex.raw('DROP TABLE IF EXISTS confirmed_charge CASCADE');
    await knex.raw('DROP TABLE IF EXISTS charges_operation CASCADE');
    await knex.raw('DROP TABLE IF EXISTS location CASCADE');
    return await knex.raw('DROP TABLE IF EXISTS location_operation CASCADE');
};