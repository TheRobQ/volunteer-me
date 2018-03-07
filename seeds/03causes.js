
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('causes').del()
    .then(function () {
      // Inserts seed entries
      return knex('causes').insert([
        {type: 'Advocacy & Human Rights'},
        {type: 'Animals'},
        {type: 'Arts & Culture'},
        {type: 'Community Building'},
        {type: 'Crime & Legal'},
        {type: 'Disaster & Emergency Support'},
        {type: 'Education & Literacy'},
        {type: 'Environment & Sustainability'},
        {type: 'Faith-based'},
        {type: 'Food, Agriculture, & Nutrition'},
        {type: 'Health & Medicine'},
        {type: 'Food, Agriculture, & Nutrition'},
        {type: 'Homeless & Housing'},
        {type: 'Immigrants & Refugees'},
        {type: 'LGBTQ+'},
        {type: 'Politics'},
        {type: 'Science & Technology'},
        {type: 'Seniors'},
        {type: 'Sports & Recreation'},
        { type: 'Veterans & Military'},
        {type: 'Women\'s Rights'},
        {type: 'Youth Development'}
      ]);
    });
};
