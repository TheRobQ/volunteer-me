
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('experiences').del()
    .then(function () {
      // Inserts seed entries
      return knex('experiences').insert([
        {title: 'Dog Walking', user_id: 1, org_id: 1, description: 'I walked two dogs for the Humane Society of Boulder valley. Went by the prairie dog town.', role: 'dog walker', hours: 1, minutes:15, date:'2017-04-05'},
        {title: 'Dog Walking', user_id: 1, org_id: 1, description: 'I walked three dogs for the Humane Society of Boulder valley today.  All were adopted the next day. Yay!', role: 'dog walker', hours: 1, minutes:15, date:'2017-04-06'},
        {title: 'Dog Walking', user_id: 1, org_id: 1, description: 'I walked one dog for the Humane Society of Boulder valley.  Got rained out.', role: 'dog walker', hours: 1, minutes:15, date:'2017-04-09'},
        {title: 'Political phone banking', user_id: 1, org_id: 9, description: 'Called to raise awareness on candidate', role: 'caller', hours: 5, minutes:30, date:'2018-02-05'},
        {title: 'Sock-Hop', user_id: 1, org_id: 4, description: 'set-up and tear down of social sock hop event', role: 'general', hours: 3, minutes:0, date:'12-12-2017'},
        {title: 'Art Week', user_id: 2, org_id: 2, description: 'Arts Week - completed surveys', role: 'general', hours: 2, minutes:0, date:'2017-03-12'},
        {title: 'Tree planting',  user_id: 3, org_id: 8, description: 'tree planting event on Open Space', role: 'general', hours: 6, minutes:30, date:'2017-03-09'},
        {title: 'Victim Advocate', user_id: 3, org_id: 13, description: 'Received 3 pages from dispatch this weekend. 2 hospital on scene calls and 1 phone call follow up was made', role: 'advocate', hours: 6, minutes:0, date:'2017-05-10'},
        {title: 'Victim Advocate', user_id: 3, org_id: 13, description: 'On call all weekend for victims if they need assistance. Received two calls this weekend', role: 'advocate', hours: 60, minutes:0, date:'2017-03-23'},
        {title: 'Fundraiser', user_id: 2, org_id: 6, description: "Made and served grilled cheese, cleaned and entertained as well as helped with breakdown.", role: 'general', hours: 6, minutes:0, date:'2017-06-07'},
        {title: 'Fundraiser', user_id: 2, org_id: 6, description: "Made and served grilled cheese, cleaned and entertained as well as helped with breakdown.", role: 'general', hours: 6, minutes:0, date:'2017-07-04'},
        {title: 'Tutor', user_id: 2, org_id: 6, description: "Tutoring kids after school.", role: 'general', hours: 2, minutes:48, date:'2017-10-21'},
        {title: 'Construction work', user_id: 2, org_id: 7, description: "Helped build low income housing.", role: 'construction ', hours: 6, minutes:0, date:'2017-09-08'},
        {title: 'Construction work', user_id: 2, org_id: 7, description: "Helped build low income housing.", role: 'construction ', hours: 6, minutes:0, date:'2018-01-08'},
        {title: 'Invoice checking', user_id: 1, org_id: 8, description: "Worked organizing and checking invoices for lettuce being sold. Worked alone mostly under supervision of head salesperson. Also interacted with others around the nonprofit, overall pleasant experience.", role: 'general volunteer ', hours: 4, minutes:0, date:'2017-08-08'},
        {title: 'Nonprofit development', user_id: 2, org_id: 10, description: "Attended Posture in the Workplace lunch workshow run by Lyons Pilates with Madeline. Learned different stances and rolling shoulder exercises to realign your core. #professionaldevelopment", role: 'general ', hours: 1, minutes:0, date:'2018-02-19'},
        {title: 'Artist hospitality', user_id: 3, org_id: 3, description: "Greeted artists as they arrived at venue.  Met some great bands!!", role: 'general', hours: 2, minutes:0, date:'2017-09-07'},
        {title: 'Artist hospitality', user_id: 3, org_id: 3, description: "Ran water to the stage. Kept snacks stocked.", role: 'general ', hours: 2, minutes:0, date:'2017-09-08'},
      ]);
    });
};
