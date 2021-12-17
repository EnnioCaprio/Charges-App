exports.up = async (knex) => {
    await knex.raw(`
    CREATE FUNCTION charge_data()
	RETURNS TRIGGER AS $$
	BEGIN
		UPDATE charges_operation SET id_confirmed_charge = NEW.id_confirmed_charge
		WHERE period = NEW.period AND id_employee = NEW.id_employee;
		RETURN NEW;
	END;
	$$
	LANGUAGE 'plpgsql';
    `);

	await knex.raw(`
	CREATE FUNCTION location_data()
	RETURNS TRIGGER AS $$
	BEGIN
		UPDATE location_operation
		SET id_confirmed_charge = NEW.id_confirmed_charge
		WHERE id_employee = NEW.id_employee AND location_period = NEW.period;
		RETURN NEW;
	END;
	$$
	LANGUAGE 'plpgsql';
	`);

	await knex.raw(`
	CREATE FUNCTION update_creation()
	RETURNs TRIGGER AS $$
	BEGIN
		NEW.updated_at = now();
		RETURN NEW;
	END;
	$$
	LANGUAGE 'plpgsql';
	`);

	return await knex.raw(`
	CREATE FUNCTION delete_rows()
	RETURNS TRIGGER AS $$
	BEGIN
		DELETE FROM charges_operation WHERE days_keeper = '[]';
		RETURN NULL;
	END;
	$$
	LANGUAGE 'plpgsql';
	`);
};

exports.down = async (knex) => {
    await knex.raw(`
    DROP FUNCTION IF EXISTS charge_data() CASCADE;
    `)

	await knex.raw(`
	DROP FUNCTION IF EXISTS location_data() CASCADE;
	`)

	await knex.raw(`
	DROP FUNCTION IF EXISTS update_creation() CASCADE;
	`)

	return await knex.raw(`
	DROP FUNCTION IF EXISTS delete_rows() CASCADE;
	`)
};
