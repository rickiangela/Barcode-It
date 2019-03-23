$(document).ready(function() {

    // When the signup button is clicked, we validate the email and password are not blank
    $("#registrationSubmit").on("click", function(event) {
        event.preventDefault();
        var emailInput = $("#email_input").val().trim();
        var passwordInput = $("#password_input").val().trim();
        var confirmPassword = $("#confirm_pass").val().trim();
        var firstNameInput = $("#firstname_input").val().trim();
        var lastNameInput = $("#lastname_input").val().trim();
        var userData = {
            email: emailInput,
            password: passwordInput,
            confirmPass: confirmPassword,
            first_name: firstNameInput,
            last_name: lastNameInput
        };

        if (!userData.email || !userData.password || !userData.first_name || !userData.last_name || userData.password !== userData.confirmPass) {
            return;
        }

        // If we have an email and password, run the signUpUser function
        signUpUser(userData.email, userData.password, userData.first_name, userData.last_name);
        $("#email_input").val("");
        $("#password_input").val("");
        $("#confirm_pass").val("");
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
            if (data.errors[0].message) {
                if (data.errors[0].message = "email must be unique") {
                    $("#email_error").text("Email Already Registered!").show();
                    $("#email_input").val(email);
                    $("#password_input").val(password);
                    $("#confirm_pass").val(password);
                    $("#firstname_input").val(first_name);
                    $("#lastname_input").val(last_name);
                } else {
                    console.log(data);
                }
            } else {
                window.location.replace(data)
            }
        });
    };
});

function hideEmailError() {
    $("#email_error").hide();
};

function checkFunction() {
    var p1 = document.getElementById('password_input');
    var p2 = document.getElementById('confirm_pass');
    var confirmed = document.getElementById('pMatch');
    var valid = "rgba(39, 189, 1, 0.945)";
    var invalid = "rgba(185, 11, 5, 0.822)";
    if (p1.value.trim() == "" && p2.value.trim() == "") {
        confirmed.style.color = invalid;
        confirmed.innerHTML = "";
    } else if (p1.value === p2.value) {
        // p2.style.backgroundColor = valid;
        confirmed.style.color = valid;
        confirmed.innerHTML = "Passwords Match!"
    } else {
        // p2.style.backgroundColor = invalid;
        confirmed.style.color = invalid;
        confirmed.innerHTML = "Passwords Don't Match!"
    }
}