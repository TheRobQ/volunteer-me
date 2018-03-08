
exports.up = function(knex, Promise) {
  return knex.schema.createTable('groups', table => {
  table.increments('id')
  table.string('name').notNullable()
  table.integer('goal_hours').notNullable().defaultsTo(0)
  table.timestamps(true, true)
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups')
};
