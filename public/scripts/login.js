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
      },
      error: function(data) {
        if(data.status === 404){
            $('#toast').removeClass('hidden')
        }
        else if(data.status === 401){
          $('#toast1').removeClass('hidden')
        }

      },
    })
  });
})
