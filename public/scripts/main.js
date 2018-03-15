$(document).ready(function() {
  var goal = 0;
  var currentHours = 0
  var currentMinutes = 0
  var totalMinutes = 0
  const userId = localStorage.getItem("user");
  var experiences;
  var userData;
  var groupData;

  $('body').ready(function(event) {
    $.ajax({
      url: `/users/${userId}/experiences`,
      type: 'GET',
      success: function(response) {
        experiences = response
      },
      error: function(response) {
        console.log(response);
      }
    }).then(function(experiences){
      for (let i = 0; i < experiences.length; i++) {
        $('#main').append(`<h1 class='exHeader'>${experiences[i].title}</h1>
        <p>${experiences[i].description}
          `)
        console.log(experiences)
        currentHours += experiences[i].hours
        currentMinutes += experiences[i].minutes
      }
      if (currentMinutes > 60) {
        currentHours += Math.floor(currentMinutes / 60)
        currentMinutes = currentMinutes % 60
      }
    })

  $.get(`/users/${userId}`, function(response) {
    userData = response
    console.log(userData);
    $('#main').append(`<p>${userData[0].goal}</p>`)
  }).then(function(response) {
    $.get(`groups/${userData[0].group_id}`, data => {
      groupData = data[0];
      $('#main').append(`<p>${groupData.goal_hours}</p>`)
    })
  }).then(function(){
      totalMinutes = (currentHours * 60) + currentMinutes
      var goalMinutes = userData[0].goal * 60

      console.log(userData[0].goal);
      var dataset = [
        {
          hours: totalMinutes,
          display: currentHours+':'+currentMinutes
        },
        {
          hours: goalMinutes - totalMinutes,
          display: 'none'
        },]

      var pie = d3.layout.pie().value(function(d) {
        return d.hours
      }).padAngle(.02)

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
          console.log(i)
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
      .append('text')
      .transition()
      .duration(900)
      .attr('x', -94)
      .attr('y', 30)
      .attr('text-anchor', 'center')
      .text(dataset[0].display)
      .style({fill: 'black', 'font-size': '70px', 'font-family': 'helvetica'})
    //   svg.selectAll("text.left")
    //   .data(dataset)
    //   .enter()
    //   .append("text")
    //   .transition()
    //   .duration(1800)
    //   .style('opacity', 6-1)
    //   .attr('x', -152)
    //   .attr('y', 8)
    //   .text(function(d) {
    //     return d.hoursLeft
    //   })
    //   .style({fill: 'white', 'font-size': '20px'});
    })
  })
})
