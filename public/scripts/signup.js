$(document).ready(function() {
  $("#signUp").submit(function(event) {
    event.preventDefault();
    const firstName = $("input#first").val();
    const lastName = $("input#last").val();
    const email = $("input#user").val().toLowerCase();
    const password = $("input#pass").val();
    const passwordConfirm = $("input#passConfirm").val();
    const group =$("input#group").val()
    if (password !== passwordConfirm) {
      $('#toast').removeClass('hidden')
    } else {
      if(group === ''){
        group = none
      }
      $.ajax({
        url: `/users`,
        type: 'POST',
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          goal: 0,
          group: group
          },
        success: function(data) {
          window.location.href = '/index.html'
        }
      })
    }
  })

})
