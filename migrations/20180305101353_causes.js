
exports.up = function(knex, Promise) {
  return knex.schema.createTable('causes', table => {
    table.increments('id')
    table.string('type').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('causes')
};
