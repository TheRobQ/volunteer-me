$(document).ready(function() {


  $("#signin").submit(function(event) {
    event.preventDefault();
    console.log('clicked');
    const username = $("input#user").val().toLowerCase();
    const password = $("input#pass").val();
    $.ajax({
      url: `/user`,
      type: 'POST',
      data: {
        email: username,
        password: password
      },
      success: function(data) {
        localStorage.setItem("user", data.id)
        window.location.href = "landing.html"
        console.log('success');
      },
      error: function(data) {
        console.log(data);
        if(data .responseText === "Not Found"){
          console.log(404)
        }
        else if(data.responseText === "Unauthorized"){
          console.log(404)
        }

      },
    })
  });
})
