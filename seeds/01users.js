
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {firstName: 'Rob',
        lastName: 'Quan',
        email: 'rob.quan@gmail.com',
        password: '$2a$04$NycHwgYTeRQCLAwSmbAp7ucaR8V.TANgGfAN6usEnxH434NFBqeym',
        goal: 900,
        towardGoal: 600,
        towardGroup: 120,
        group_id: 3,
        salt: '$2a$04$NycHwgYTeRQCLAwSmbAp7u'},
        {
          firstName: "Doris",
          lastName: "Vermillion",
          email: 'doris@gmail.com',
          password: '$2a$04$8PMBDh7oqA.CdemjeaJ0pejMsBfnsRfurP29wI1PZ5AiK6Pqd55i6',
          goal: 2100,
          towardGoal: 900,
          towardGroup: 120,
          group_id: 4,
          salt: '$2a$04$8PMBDh7oqA.CdemjeaJ0pe'
        },
        {
            firstName: "Irma",
            lastName: "Patterson",
            email: 'irma@gmail.com',
            password: '$2a$04$tkD4lEMsCXrX3X1Eoa6NTuH96BgRPqAarB1G7WWt0i28132u6qHMK',
            goal: 2400,
            towardGoal: 1320,
            towardGroup: 60,
            group_id: 5,
            salt: '$2a$04$tkD4lEMsCXrX3X1Eoa6NTu'
        },
        {
          firstName: 'Rob',
          lastName: 'Q',
          email: 'demo@demo.com',
          password: '$2a$04$MB9.BCB5thHOyKDV7JXipup2wY4FZnM./CW6hUV6uUumlLIcw3coa',
          goal: 16,
          towardGoal: 2,
          towardGroup: 1,
          group_id: 5,
          salt: '$2a$04$MB9.BCB5thHOyKDV7JXipu',
        },
      ]);
    });
};
