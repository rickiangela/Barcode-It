var textEntry = '';
document.addEventListener("keydown", function(e) {
    const targetName = e.target.localName;
    if (targetName !== "input" && isNaN(e.key) == false) {
        textEntry += e.key.toString();
        if (textEntry.length == 12) {
            console.log('scan detected');
            window.location.href = window.location.origin + "/barcode/?barcode=" + textEntry;
            textEntry = "";
        };
    } else textEntry = "";
});

$("#search").on("keydown", function(e) {
    var inputText = $(this).val().trim();
    if (e.key === "Enter") {
        e.preventDefault();
        if (inputText.length === 12) {
            window.location.href = window.location.origin + "/barcode/?barcode=" + inputText;
        };
    };
});

$.ajax("/api/user_data", {
    method: "GET"
}).then(function(response) {
    $("#signout").text("Signout (" + response.first_name + " " + response.last_name + ")");
});

//Modal Initialization
$(document).ready(function() {
    //Modal Initialization
    $('.modal').modal();

    //Mobile Sidenav Initialization
    $('.sidenav').sidenav();
});