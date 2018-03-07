
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orgs', table => {
    table.increments('id')
    table.string('name').notNullable()
    table.integer('cause_id').notNullable()
    table.foreign('cause_id').references('id').inTable('causes')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orgs')
};
