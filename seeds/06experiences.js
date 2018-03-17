
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('experiences').del()
    .then(function () {
      // Inserts seed entries
      return knex('experiences').insert([
        {title: 'Dog Walking', user_id: 1, org_id: 1, description: 'I walked dogs for the Humane Society of Boulder valley', role: 'dog walker', hours: 1, minutes:15, date:'04-05-2017'},
        {title: 'Dog Walking', user_id: 1, org_id: 1, description: 'I walked dogs for the Humane Society of Boulder valley', role: 'dog walker', hours: 1, minutes:15, date:'04-06-2017'},
        {title: 'Dog Walking', user_id: 1, org_id: 1, description: 'I walked dogs for the Humane Society of Boulder valley', role: 'dog walker', hours: 1, minutes:15, date:'04-09-2017'},
        {title: 'Political phone banking', user_id: 1, org_id: 9, description: 'Called to raise awareness on candidate', role: 'caller', hours: 5, minutes:30, date:'04-05-2017'},
        {title: 'Sock-Hop', user_id: 1, org_id: 4, description: 'set-up and tear down of social sock hop event', role: 'general', hours: 3, minutes:0, date:'04--05--2017'},
        {title: 'Art Week', user_id: 2, org_id: 2, description: 'Arts Week - completed surveys', role: 'general', hours: 2, minutes:0, date:'02-05-2017'},
        {title: 'Tree planting',  user_id: 3, org_id: 8, description: 'tree planting event on Open Space', role: 'general', hours: 6, minutes:30, date:'03-05-2017'},
        {title: 'Victim Advocate', user_id: 3, org_id: 13, description: 'Received 3 pages from dispatch this weekend. 2 hospital on scene calls and 1 phone call follow up was made', role: 'advocate', hours: 6, minutes:0, date:'04-05-2017'},
        {title: 'Victim Advocate', user_id: 3, org_id: 13, description: 'On call all weekend for victims if they need assistance. Received two calls this weekend', role: 'advocate', hours: 60, minutes:0, date:'03-09-2017'},
        {title: 'Fundraiser', user_id: 2, org_id: 6, description: "Made and served grilled cheese, cleaned and entertained as well as helped with breakdown.", role: 'general', hours: 6, minutes:0, date:'05-09-2017'},
        {title: 'Fundraiser', user_id: 2, org_id: 6, description: "Made and served grilled cheese, cleaned and entertained as well as helped with breakdown.", role: 'general', hours: 6, minutes:0, date:'04-09-2017'},
        {title: 'Tutor', user_id: 2, org_id: 6, description: "Tutoring kids after school.", role: 'general', hours: 2, minutes:48, date:'05-09-2017'},
        {title: 'Construction work', user_id: 2, org_id: 7, description: "Helped build low income housing.", role: 'construction ', hours: 6, minutes:0, date:'05-16-2017'},
      ]);
    });
};
