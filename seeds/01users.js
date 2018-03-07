
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {firstName: 'Rob',
        lastName: 'Quan',
        email: 'rob.quan@gmail.com',
        password: '$2a$04$pF4BFJjlwlNftAVlxYmqTujwbUahKvyYH/dt8u/8JUmk80n5PGTwm', current_hours:'0',
        goal:'15',
        group_id: 1,
        salt: '$2a$04$pF4BFJjlwlNftAVlxYmqTu'},
      ]);
    });
};
