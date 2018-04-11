$(document).ready(function() {
  let goal = 0;
  let towardGoal = 0;
  let remaining = 0;
  let experiences;
  let userData;
  let groupData;
  const orgs =[];
  const modeObject = {};
  const timeLineData = [];
  const userId = localStorage.getItem("user");

  //Get all experiences for the signed in user
  $.get(`/users/${userId}/experiences`, function(response) {
        experiences = response
    })//Now get all the organizations for each expereince
    .done(function(experiences){
        for (let i = 0; i < experiences.length; i++) {
          $.get(`/orgs/${experiences[i].org_id}`, function(response){
              orgs.push(response[0])
            })
          }
        })
        .fail(function() {
            //Pop up generic error
            $('#error-message').removeClass('hidden')
          })

  $.get(`/users/${userId}`, function(response) {
    userData = response
    })
    .done(function(response) {
      $.get(`groups/${userData[0].group_id}`, data => {
      groupData = data[0];
        })
      })

  //Get most frequent cause
  const mostFrequentCause = array => {
    let maxCount = 1
    let mostFrequent;
    for (let i = 0; i < array.length; i++) {
      let cause = array[i].cause;
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

  //Get the icon based on most frequenrt cause
  const getCauseIcon = mostFrequentResult => {
    switch(mostFrequentResult){
      case 'Animals':
        return "fas fa-paw";
      case 'Community Building':
        return "fas fa-handshake";
      case  'Advocacy':
      "fas fa-bullhorn";
      case 'Arts & Culture':
        return "fas fa-paint-brush";
      case  'Homeless & Housing':
        return "fas fa-home";
      case 'Health & Medicine':
        return "fas fa-heartbeat";
      default:
        return  "fas fa-thumbs-up"
    }
  }

  //Align orgs to correct experience
  //Let *should* handle this in the loops
  const alignOrgsWithExperiences = (experiences, orgs) =>{
    for(let i = 0; i < experiences.length; i++){
      for(let j = 0; j < orgs.length; j++){
        if(experiences[i].org_id === orgs[j].id){
          experiences[i].org_id = orgs[j].name
        }
      }
    }
    return experiences
  }

  // total hours for banner
  const getTotalHours = (array) => {
    let hours = 0
    let minutes = 0
    array.forEach(element => {
      hours+= element.hours;
      minutes+= element.minutes
    })
    if(minutes >= 60){
        hours += Math.floor(minutes / 60)
        minutes = minutes % 60
    }
      let myTime = `${hours} hours and ${minutes} minutes`
      return myTime
  }

  const getTIme = (experiences) => {
    experiences.forEach(element =>   timeLineData.push(element))
  }

//after all reqs made AJAX COMPLETED
  $( document ).ajaxStop(function() {
    localStorage.setItem("group", groupData.id)
    const myTotal = getTotalHours(experiences)
    const passion = mostFrequentCause(orgs)
    const causeIcon = getCauseIcon(passion)
    alignOrgsWithExperiences(experiences, orgs)
    getTIme(experiences)

    //Add the greeting to the page and the cause icon and total hours
    $('#welcome').append(`<h1 class="col-sm-12 greeting">Hello, ${userData[0].firstName} <span class="badge"><i class="${causeIcon}"></i></span></h1>
    <h4 id="hours"> You've volunteered a total of  ${myTotal}!</h4>`)

    //Add text to  Goal doughnut
    $('#chart').append(`<h3 class="pieLabel">Your current goal is ${userData[0].goal /60} hours</h3>`)
    //Current passion
    $("#passion").append(`<h3><strong>Your current passion is: </strong>${passion}</h3>`)
    //Add most recent experience to the page
      $('#recent').append(`
        <h3 style="max-width: 38rem, font-weight: bold">Your most recent volunteer experience</h3>
        <div class="card border-dark mb-3" style="max-width: 38rem;">
        <div class="card-header text-white bg-secondary">On ${experiences[0].date}</div>
        <div class="card-body text-dark">
          <h5 class="card-title" id="extitle">${experiences[0].title} for ${experiences[0].org_id}</h5>
          <p class="card-text">${experiences[0].description}</p>
        </div>
      </div>`)

      //Info on user's group
      $('#group').append(`<h3 class="groupsHeader"><strong>Your group: <span class="red">${groupData.name}</strong></span></h3>`)
      $("#groupInfo").append(`<h4 class="sideBoard">${groupData.name} goal: <span class="red"><strong>${groupData.goal_hours}</strong></span></h4>
        <h4 class="sideBoard"> ${groupData.name} current hours: <span class="red"><strong>${groupData.current_hours}</strong> </span></h4>
        <h4 class="sideBoard">Your current contribution: <span class="red"><strong>${Math.floor(userData[0].towardGroup / 60)} hours</span></strong><h4>`)

       //Add you total Time to the page
       // $("#main").append(`<h2>You've put in ${myTotal}!</h2> `)

      //D3 progess doughnut
      const mainCircle = ()=> {
        let responsive = d3.select("#chart").node().getBoundingClientRect()
        let goal = userData[0].goal
        let towardGoal = userData[0].towardGoal
        let remaining = goal - towardGoal
        let  currentHours = Math.floor(towardGoal / 60)
        let dataset = [ { hours: towardGoal, display: currentHours},
          {  hours: remaining, display: 'none'} ]

        if(towardGoal >= goal){
            dataset[1].hours = 0
          }
        let pie = d3.layout.pie().value(function(dataset) {
          return dataset.hours
        }).sort(null).padAngle(.03)

        let w = responsive.width -35
        let h = responsive.width -35
        let outerRadius = w / 2.3
        let innerRadius = responsive.width / 3.1
        let color = d3.scale.ordinal().domain([0, 1]).range(['#B0C4DE', '#CD5C5C'])
        let arc = d3.svg.arc().outerRadius(outerRadius).innerRadius(innerRadius)

      let svg = d3.select("#chart")
      .append("svg")
      .attr({width: w, height: h, class: 'mainCircle'})
      .append('g')
      .attr({
        transform: 'translate(' + w / 2 + ',' + h / 2.1 + ')'
      });

      let path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr({
        d: arc,
        fill: function(d, i) {
          return color(i);
        }
      })
      .style("stroke", "black")

      path.transition().duration(1750).attrTween('d', function(d) {
        let interpolate = d3.interpolate({
          startAngle: 0,
          endAngle: 0
        }, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });

      svg
      .append('svg:text')
      .attr('x', 0)
      .attr('y', 30)
      .attr('class', 'doughnut')
      .style("text-anchor", "middle")
      .append('svg:tspan')
      .attr('x', 1)
      .attr('dy', -8)
      .text(dataset[0].display)
      .attr('id', 'bigNumber')
      .style({fill: 'black', 'font-family': 'Lobster, cursive', 'font-weight': '300'})
      .append('text:tspan')
      .attr('x', 1)
      .attr('dy', responsive.width/6.8)
      .text('hours')
      .attr('id', 'smallHours')
      .style({fill: 'black', 'font-family': 'helvetica', 'font-weight': 400})
      }

      //PIE chart for group data
      const groupPie = () =>{
        let groupGoal = groupData.goal_hours
        let current_hours = groupData.current_hours
        let remaining = groupGoal - current_hours
        const w = 200
        const h = 200
        const r = 100

       let data = [ {label:"Complete", value: current_hours},  {label: "Remaining", value: remaining} ];
       let color = d3.scale.ordinal().domain([0, 1]).range(['#B0C4DE', '#D2B48C',  '#ADD8E6'])

       let pie = d3.layout.pie()
           .value(function(d) { return d.value; }).sort(null)

       let holder = d3.select("#groupChart")
           .append("svg:svg")
           .data([data])
           .attr("width", w)
           .attr("height", h)
           .append("svg:g")
           .attr("transform", "translate(" + r + "," + r + ")")

       let arc = d3.svg.arc()
           .outerRadius(r);

       let arcs = holder.selectAll("g.slice")
           .data(pie)
           .enter()
           .append("svg:g")
           .attr("class", "slice") // slice claas for styles

      arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } )
            .attr("d", arc)
            .attr('stroke', '#fff')
            .attr('stroke-width', '3')
            .transition().duration(1600).attrTween('d', function(d) {
                 let interpolate = d3.interpolate({
                   startAngle: 0,
                   endAngle: 0
                 }, d);
                 return function(t) {
                   return arc(interpolate(t));
                 };
               });

      arcs.append("svg:text")
              .attr("transform", function(d) {
                  d.innerRadius = 0;
                 d.outerRadius = r;
                 return "translate(" + arc.centroid(d) + ")"
               })
              .attr("text-anchor", "middle")
              .text(function(d, i) { return data[i].label; })
      }

//Main chart of experiences
      const timeLine = () => {
        let responsiveW = d3.select("#mainChart").node().getBoundingClientRect()
        let width = responsiveW.width
        let height = () => {
           if(timeLineData.length < 6){
          return 600}
          if(timeLineData.length === 7){
            return 630
          }
          else{
            return timeLineData.length * 85
          }
          }
        const padding = 110;
        let colorValue = function(d) { return d.org_id}
        let color = d3.scale.ordinal().domain(timeLineData.map(function(d){return d.org_id})).range(['#B0C4DE', '#BDB76B', '#E6E6FA', '#A52A2A', '#6495ED', '#8B0000', '#8FBC8F'])

        let tooltip = d3.select("#mainChart").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

        //Dynamic radius
        let getRadius = function(d){
            if(d.hours === 1){
              return 15
            }
            if(d.hours > 1 && d.hours <= 8){
              return (d.hours + 18) * 1.5
            }
            else{
              return 42
            }
          }

    //created SVG container here
    var chart1 = d3.select('#mainChart')
      	.append('svg:svg')
      	.attr('width', width)
      	.attr('height', height()+66)
      	.attr('class', 'chart1')

    var y = d3.scale.ordinal()
        .domain(timeLineData.map(function(d){return d.date}))
        .rangePoints([height()-(padding+25), padding])

    var x = d3.scale.ordinal()
    	      .domain(timeLineData.map(function(d){return d.org_id}))
    	      .rangePoints([padding, width-(padding+100) ])

    var main = chart1.append('g')
  	.attr('transform', 'translate(' + 6 + ',' + 2 + ')')
  	.attr('width', width - padding)
  	.attr('height', height() - padding)
  	.attr('class', 'main')

    // draw the x axis
    var xAxis = d3.svg.axis()
      	.scale(x)
      	.orient('bottom')
    main.append('g')
      	.attr('transform', 'translate(30,' + (height() - padding +24) + ')')
      	.attr('class', 'main axis org')
        .style('fill', 'gray')
      	.call(customXAxis);

    // draw the y axis
    var yAxis = d3.svg.axis()
	       .scale(y)
	       .orient('left');
    main.append('g')
      	.attr('transform', 'translate('+(padding+7)+',0)')
      	.attr('class', 'main axis date')
      	.call(customYAxis);

    var g = main.append("svg:g");

    g.selectAll("scatter-dots")
      .data(timeLineData)
      .enter()
      .append("svg:circle")
      .attr("cx", function (d) { return x(d.org_id) +42 } )
      .attr("cy", function (d) { return y(d.date) -8 } )
      .attr("r", function(d) {return getRadius(d)})
      .style("fill", function(d) { return color(colorValue(d));})
      .style("fill-opacity", .75)
      .style("stroke", "black")
      .on("mouseover", function(d){
            d3.select(this).transition()
                 .duration(500).attr("r", function(d) {return getRadius(d) * 1.5})
          })
          .on("click", function(d) {
              tooltip.transition()
                   .duration(400)
                   .style("opacity", .9);
              tooltip.html(`<div class="card border-dark shadow">
              <div class="card-body">
                <h5 class="card-title chart-title text-white">${d.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted"><strong>Role: </strong>${d.role}</h6>
                <p class="card-text chart-text"><strong>What I did: </strong>${d.description}</p>
                <h6 class="card-subtitle mb-2 text-muted">Time: ${d.hours} hours and ${d.minutes} minutes</h6>
              </div>
            </div>`)
				      .style("left", d3.select(this).attr("cx") + "px")
				      .style("top", d3.select(this).attr("cy") + "px")
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(400)
               .style("opacity", 0)
               d3.select(this).transition()
                    .duration(500).attr("r", function(d) {return getRadius(d)})
      });

      function customYAxis(g) {
        g.call(yAxis);
        g.select(".domain").remove();
        g.selectAll(".tick text").attr("x", -12).attr("dy", -1)
        .attr('font-family', 'helvetica')
        .attr('font-size', '20px')
      }

      function customXAxisSmall(g) {
        g.call(xAxis)
        g.selectAll(".tick text").attr("x", -12).attr("y", 4)
        .attr('fill', 'black')
        .attr('font-family', 'helvetica')
        .style('font-size', '17px')
        .style("text-anchor", "end")
        .attr("transform", function(d) {
                return "rotate(-45)"
              })
      }

      function customXAxisBig(g) {
        g.call(xAxis)
        g.selectAll(".tick text").attr("x", 9).attr("y", 27)
        .attr('fill', 'black')
        .attr('font-family', 'helvetica')
        .style('font-size', '19px')
              }

      function customXAxis(g) {
        if(width < 1113 && timeLineData.length > 2){
          return  customXAxisSmall(g)
            }
          return customXAxisBig(g)
        }



    if(width > 1113){
      var legend = chart1.selectAll(".legend")
          .data(color.domain())
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(-39," + (i +1) * 35 + ")"; });

          legend.append("rect")
          .attr("x", width - 20)
          .attr("width", 21)
          .attr("height", 21)
          .style("fill", color)
          .style("stroke", "black")
  // draw legend text
          legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d;})
          }
      }

      timeLine()
      mainCircle()
      groupPie()
    })


  $("#setGoal").submit(function(event) {
      const value = $("input#addGoal").val();
      const goal = parseInt(value) * 60
      // console.log('clicked');
      $.ajax({
        url: `/users/${userId}/`,
        type: 'PATCH',
        global: false,
        data: {
          goal: goal
        },
        success: function(data) {
          // console.log(data);
        },
        error: function(response) {
          console.log(response);
        }
      })
  })
  $("#logOut").click(function(event){
    event.preventDefault()
    localStorage.removeItem('user')
    window.location.href = "index.html"
  })
})
