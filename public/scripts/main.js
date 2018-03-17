
$(document).ready(function() {
  var goal = 0;
  var towardGoal = 0;
  const userId = localStorage.getItem("user");
  var experiences;
  var userData;
  var groupData;
  var remaining = 0;
  var orgs =[];
  var modeObject = {};

  $('body').ready(function(event) {
    $.ajax({
      url: `/users/${userId}/experiences`,
      method: 'GET',
      success: function(response) {
        experiences = response
      },
      error: function(response) {
        console.log(response);
      }
    }).done(function(experiences){
      for (let i = 0; i < experiences.length; i++) {
        $.ajax({
          url: `/orgs/${experiences[i].org_id}`,
          type: 'GET',
          success: function(thedata){
            orgs.push(thedata[0])
          },
          error: function(response){
            console.log(response)
          }
        })
      }
    })

  $.get(`/users/${userId}`, function(response) {
    userData = response
    $('#welcome').append(`<h1>Hello, ${userData[0].firstName}</h1>`)
    $('#welcome').append(`<h3>Your current goal: ${userData[0].goal /60} hours</h3>`)
    })
    .then(function(response) {
      $.get(`groups/${userData[0].group_id}`, data => {
      groupData = data[0];
        })
      })

  //Get Mode
  const getMode = array => {
    var maxCount = 1
    var mostFrequent;
    for (let i = 0; i < array.length; i++) {
      var cause = array[i].cause;
      if (!modeObject[cause]) {
        modeObject[cause] = 1;
      }else{
      modeObject[cause]++
    }
      if(modeObject[cause] > maxCount){
        maxCount = modeObject[cause]
        mostFrequent = array[i].cause
      }
    }
    return mostFrequent
  };

  const setOrg = (experiences, orgs) =>{
    for(let i = 0; i < experiences.length; i++){
      for(let j = 0; j < orgs.length; j++){
        if(experiences[i].org_id === orgs[j].id){
          experiences[i].org_id = orgs[j].name
        }
      }
    }
    return experiences
  }

//after all reqs made
  $( document ).ajaxStop(function() {
    console.log(experiences);
    // console.log(userData);
    // console.log(orgs);
    console.log(groupData);
    setOrg (experiences, orgs)
    localStorage.setItem("group", groupData.id)

    //Adding exp to your page
    for(let i = 0; i < experiences.length; i++){
      $('#main').append(`<h3 class="exHeader">${experiences[i].title}</h3>
              <p class="exBody"><strong>Description: </strong>${experiences[i].description} </p>
              <p class="exOrg"><strong>Organization</strong> ${experiences[i].org_id}</p>
              <p classs="exDate"><strong>Date: </strong> ${experiences[i].date}</p>`)
        }

      //Adding Your causes to your page
      $("#main").append(`<p><strong>Your current passion: </strong>${  getMode(orgs)}</p>`)
      for(key in modeObject){
        $("#main").append(`<p><strong>${key}: </strong> ${modeObject[key]}</p>`)
      }
       $("#main").append(`<h1>${groupData.current_hours}</h1>`)

      //D3 main circle
      const mainCircle = ()=> {
      goal = userData[0].goal
      towardGoal = userData[0].towardGoal
      remaining = goal - towardGoal
      let  currentHours = Math.floor(towardGoal / 60)
      var dataset = [
        {
          hours: towardGoal,
          display: currentHours
        },
        {
          hours: remaining,
          display: 'none'
        }
      ]

      var pie = d3.layout.pie().value(function(d) {
        return d.hours
      }).sort(null).padAngle(.02)

      var w = 350
      var h = 350
      var outerRadius = w / 2.1
      var innerRadius = 100
      // var color = d3.scale.category10()
      var color = d3.scale.ordinal().domain([0, 1]).range(['#B0C4DE', '#CD5C5C'])
      var arc = d3.svg.arc().outerRadius(outerRadius).innerRadius(innerRadius)

      var svg = d3.select("#chart")
      .append("svg")
      .attr({width: w, height: h, class: 'shadow'})
      .append('g')
      .attr({
        transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
      });
      var path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr({
        d: arc,
        fill: function(d, i) {
          return color(i);
        }
      })

      path.transition().duration(2000).attrTween('d', function(d) {
        var interpolate = d3.interpolate({
          startAngle: 0,
          endAngle: 0
        }, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });

      svg
      .append('svg:text')
      .attr('x', -84)
      .attr('y', 30)
      .attr('class', 'id')
      .append('svg:tspan')
      .attr('x', -53)
      .attr('dy', -15)
      .text(dataset[0].display)
      .style({fill: 'black', 'font-size': '94px', 'font-family': 'helvetica', 'font-weight': 'bold'})
      .append('text:tspan')
      .attr('x', -49)
      .attr('dy', 40)
      .text('hours')
      .style({fill: 'black', 'font-size': '40px', 'font-family': 'helvetica', 'font-weight': 200})
      }
      mainCircle()
    })
  })

  $("#setGoal").submit(function(event) {
      const value = $("input#addGoal").val();
      const goal = parseInt(value) * 60
      console.log('clicked');
      $.ajax({
        url: `/users/${userId}/`,
        type: 'PATCH',
        global: false,
        data: {
          goal: goal
        },
        success: function(data) {
          console.log(data);
        },
        error: function(response) {
          console.log(response);
        }
      })
  })
})

// if (currentMinutes > 60) {
//   currentHours += Math.floor(currentMinutes / 60)
//   currentMinutes = currentMinutes % 60
// }
