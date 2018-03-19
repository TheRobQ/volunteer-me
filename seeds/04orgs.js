
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orgs').del()
    .then(function () {
      // Inserts seed entries
      return knex('orgs').insert([
        {name: 'Humane Society', cause: 'Animals', cause_id: '2'},
        {name: 'Arts Project', cause: 'Arts & Culture', cause_id: '3'},
        {name: 'AIDS project', cause:'Health & Medicine', cause_id: '11'},
        {name: 'LGBTQ+ Alliance', cause:'LGBTQ+', cause_id: '15'},
        {name: 'Homeless outreach', cause:'Homeless & Housing', cause_id:'13'},
        {name: 'Civic group', cause:'Community Building', cause_id:'4'},
        {name: 'Housing group', cause: 'Homeless & Housing', cause_id:'13'},
        {name: 'Open Space Group', cause:'Environment & Sustainability', cause_id:'8'},
        {name: 'Political organization', cause:'Politics', cause_id:'16'},
        {name: 'Senior outreach', cause: 'Seniors', cause_id:'18'},
        {name: 'Youth Mentoring', cause: 'Youth Development', cause_id:'22'},
        {name: 'Animal rescue', cause: 'Animals', cause_id:'2'},
        {name: 'Police', cause: 'Advocacy', cause_id:'5'},
      ]);
    });
};
