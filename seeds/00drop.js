
exports.seed = function(knex, Promise) {
  exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('experiences').del()
    .then(() => knex('users').del())
      .then(() => knex('groups').del())
      .then(() => knex('orgs').del())
      .then(() => knex('causes').del())
  };
};
