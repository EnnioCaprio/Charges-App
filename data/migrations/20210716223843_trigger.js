
exports.up = async (knex) => {
    await knex.raw(`CREATE TRIGGER charge_data_send
	AFTER INSERT
	ON public.confirmed_charge
	FOR EACH ROW
	EXECUTE PROCEDURE public.charge_data()`);

    await knex.raw(`CREATE TRIGGER location_data_send
	AFTER INSERT 
	ON public.confirmed_charge
	FOR EACH ROW
	EXECUTE PROCEDURE public.location_data()`);

    await knex.raw(`
    CREATE TRIGGER update_creation_time
	BEFORE UPDATE ON confirmed_charge
	FOR EACH ROW EXECUTE PROCEDURE update_creation()`);

    await knex.raw(`
    CREATE TRIGGER update_creation_time
	BEFORE UPDATE ON location_operation
	FOR EACH ROW EXECUTE PROCEDURE update_creation()`);

    await knex.raw(`
    CREATE TRIGGER update_creation_time
	BEFORE UPDATE ON charges_operation
	FOR EACH ROW EXECUTE PROCEDURE update_creation()`);

    await knex.raw(`
    CREATE TRIGGER delete_rows_charges
	AFTER UPDATE
	ON public.charges_operation
	FOR EACH ROW
	EXECUTE PROCEDURE public.delete_rows();`);
};

exports.down = async (knex) => {
    await knex.raw(`
        DROP TRIGGER IF EXISTS charge_data_send on confirmed_charge
    `)

    await knex.raw(`
        DROP TRIGGER IF EXISTS location_data_send on confirmed_charge
    `)

    await knex.raw(`
        DROP TRIGGER IF EXISTS update_creation_time on confirmed_charge
    `)

    await knex.raw(`
        DROP TRIGGER IF EXISTS update_creation_time on location_operation
    `)

    await knex.raw(`
        DROP TRIGGER IF EXISTS update_creation_time on charges_operation
    `)

    return await knex.raw(`
        DROP TRIGGER IF EXISTS delete_rows_charges on charges_operation
    `)
};