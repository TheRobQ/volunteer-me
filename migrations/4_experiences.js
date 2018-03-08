exports.up = function(knex, Promise) {
  return knex.schema.createTable('experiences', table => {
    table.increments('id')
    table.string('title').notNullable()
    table.integer('rating').defaultsTo(3)
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('id').inTable('users')
    table.integer('org_id').notNullable()
    table.foreign('org_id').references('id').inTable('orgs')
    table.string('description').notNullable()
    table.string('role').notNullable()
    table.integer('hours')
    table.integer('minutes').notNullable().defaultsTo(30)
    table.string('date').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('experiences')
};
