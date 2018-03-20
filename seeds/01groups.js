
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('groups').insert([
        {name: 'none', goal_hours: 0, current_hours: 0},
        {name: 'Work Group', goal_hours: 10, current_hours: 0},
        {name: 'The Wombats of Boulder County', goal_hours: 40, current_hours: 10},
        {name: 'College Sorority', goal_hours: 50, current_hours: 15},
        {name: 'Town Civic Group', goal_hours: 40, current_hours: 30},
        {name: 'College Fraternity', goal_hours: 50, current_hours: 2}
      ]);
    });
};
