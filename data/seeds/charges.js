
exports.seed = (knex) => {
  return knex('charge')
    .insert([
      { name_charge: 'home', code_charge: '1001' },
      { name_charge: 'holidays', code_charge: '1002' },
      { name_charge: 'permissions', code_charge: '1003' }
    ])
};