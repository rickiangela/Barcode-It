$(document).ready(function () {

  // When the signup button is clicked, we validate the email and password are not blank
  $("#registrationSubmit").on("click", function (event) {
    event.preventDefault();
    var emailInput = $("#email_input").val().trim()
    console.log(emailInput)
    var passwordInput = $("#password_input").val().trim()
    console.log(passwordInput)
    var userData = {
      email: emailInput,
      password: passwordInput

    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    $("#email_input").val("");
    $("#password_input").val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    }).then(function (data) {
      window.location.replace("index")
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
