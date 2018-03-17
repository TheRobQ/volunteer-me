
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orgs').del()
    .then(function () {
      // Inserts seed entries
      return knex('orgs').insert([
        {name: 'Local Humane Society', cause: 'Animals', cause_id: '2'},
        {name: 'Local Arts Project', cause: 'Arts & Culture', cause_id: '3'},
        {name: 'Local AIDS project', cause:'Health & Medicine', cause_id: '11'},
        {name: 'LGBTQ+ Alliance', cause:'LGBTQ+', cause_id: '15'},
        {name: 'Homeless outreach group', cause:'Homeless & Housing', cause_id:'13'},
        {name: 'Local civic group', cause:'Community Building', cause_id:'4'},
        {name: 'Local housing group', cause: 'Homeless & Housing', cause_id:'13'},
        {name: 'Local Open Space Protection Group', cause:'Environment & Sustainability', cause_id:'8'},
        {name: 'Local Political organization', cause:'Politics', cause_id:'16'},
        {name: 'Senior meal delivery', cause: 'Seniors', cause_id:'18'},
        {name: 'Youth Mentoring organization', cause: 'Youth Development', cause_id:'22'},
        {name: 'Local animal rescue', cause: 'Animals', cause_id:'2'},
        {name: 'Local Police', cause: 'Crime & Legal', cause_id:'5'},
      ]);
    });
};
