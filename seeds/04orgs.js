
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orgs').del()
    .then(function () {
      // Inserts seed entries
      return knex('orgs').insert([
        {name: 'Local Humane Society', cause_id: '2'},
        {name: 'Local Arts Project', cause_id: '3'},
        {name: 'Local AIDS project', cause_id: '11'},
        {name: 'LGBTQ+ Alliance', cause_id: '15'},
        {name: 'Homeless outreach group', cause_id:'13'},
        {name: 'Local civic group', cause_id:'4'},
        {name: 'Local housing group', cause_id:'13'},
        {name: 'Local Open Space Protection Group', cause_id:'8'},
        {name: 'Local Political organization', cause_id:'16'},
        {name: 'Senior meal delivery', cause_id:'18'},
        {name: 'Youth Mentoring organization', cause_id:'22'},
        {name: 'Local animal rescue', cause_id:'2'},
        {name: 'Local Police', cause_id:'5'},
      ]);
    });
};
