$(document).ready(function() {

    // When the signup button is clicked, we validate the email and password are not blank
    $("#registrationSubmit").on("click", function(event) {
        event.preventDefault();
        var emailInput = $("#email_input").val().trim();
        var passwordInput = $("#password_input").val().trim();
        var firstNameInput = $("#firstname_input").val().trim();
        var lastNameInput = $("#lastname_input").val().trim();
        var userData = {
            email: emailInput,
            password: passwordInput,
            first_name: firstNameInput,
            last_name: lastNameInput
        };

        if (!userData.email || !userData.password || !userData.first_name || !userData.last_name) {
            return;
        }

        // If we have an email and password, run the signUpUser function
        signUpUser(userData.email, userData.password, userData.first_name, userData.last_name);
        $("#email_input").val("");
        $("#password_input").val("");
        $("#firstname_input").val("");
        $("#lastname_input").val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password, first_name, last_name) {
        $.post("/api/register", {
            email: email,
            password: password,
            last_name: last_name,
            first_name: first_name
        }).then(function(data) {
            window.location.replace(data)
                // If there's an error, handle it by throwing up a bootstrap alert
        });
    };
});