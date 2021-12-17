
exports.seed = (knex) => {
  return knex('location')
    .insert([
      { location_name: 'office' },
      { location_name: 'home' }
    ])
};

