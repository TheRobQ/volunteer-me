
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('groups').insert([
        {name: 'none', goal_hours: 0},
        {name: 'work group', goal_hours: 10},
        {name: 'The Wombats of Boulder County', goal_hours: 40},
        {name: 'college sorority group', goal_hours: 50},
        {name: 'Town civic group', goal_hours: 40},
        {name: 'college fraternity group', goal_hours: 50}
      ]);
    });
};
