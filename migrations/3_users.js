
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('firstName').notNullable()
    table.string('lastName').notNullable()
    table.string('email').notNullable().unique()
    table.specificType('password','char(60)').notNullable().unique()
    table.integer('goal').notNullable().defaultsTo(0)
    table.integer('group_id').notNullable().defaultsTo(1)
    table.foreign('group_id').references('id').inTable('groups')
    table.string('salt',30).notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
