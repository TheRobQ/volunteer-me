const goal = 0;
var currentHours = 0;
var currentMinutes = 0
const userId = localStorage.getItem("user");
var experiences;
var userData;
var groupData

$(document).ready(function() {

  $('body').ready(function(event) {
    $.ajax({
      url: `/users/${userId}/experiences`,
      type: 'GET',
      success: function(response) {
        console.log(response);
        experiences = response
        for(let i = 0; i < experiences.length; i++){
        $('h1').append(`<p>${experiences[i].title}</p>`)
        currentHours += experiences[i].hours
        currentMinutes += experiences[i].minutes
      }
      if(currentMinutes > 60){
        currentHours += Math.floor(currentMinutes / 60)
        currentMinutes = currentMinutes % 60
      }
      $('h1').append (`<p>${currentHours}:${currentMinutes}</p>`)
      },
      error: function (response){
        console.log(response);
      }
    })

    $.get(`/users/${userId}`, function(response) {
        userData = response
        $('h1').append(`<p>${userData[0].goal}</p>`)
      }).done(
        function(response){
    $.get(`groups/${userData[0].group_id}`, data => {
      groupData = data[0];
      console.log(groupData);
      $('h1').append(`<p>${groupData.goal_hours}</p>`)
    })})

  })
})
