$(".li-barcodes").attr("class", "active");

$(".barcode").each(function() {
    $(this).JsBarcode($(this).data("id"));
});

$("#add-barcode").on("click", function() {
    $.ajax("/api/barcode", {
        method: "POST",
        data: {
            title: ($("#barcode-title").val().trim() === "") ? undefined : $("#barcode-title").val().trim(),
            description: ($("#barcode-description").val().trim() === "") ? undefined : $("#barcode-description").val().trim(),
            photo_url: ($("#photo-url").val().trim() === "") ? undefined : $("#photo-url").val().trim()
        }
    }).then(function(response) {
        location.reload();
    });
});

$("#update-barcode").on("click", function() {
    $.ajax("/api/barcode/" + $("#update-barcode").data("id"), {
        method: "PUT",
        data: {
            title: ($("#barcode-title").val().trim() === "") ? undefined : $("#barcode-title").val().trim(),
            description: ($("#barcode-description").val().trim() === "") ? undefined : $("#barcode-description").val().trim(),
            photo_url: ($("#photo-url").val().trim() === "") ? undefined : $("#photo-url").val().trim()
        }
    }).then(function(response) {
        location.reload();
    });

});

$(".edit-button").on("click", function() {
    //Set data-id prior to scope changing
    $("#update-barcode").attr("data-id", $(this).data("id"));

    $.ajax("/api/barcode/" + $(this).data("id"), {
        method: "GET"
    }).then(function(response) {
        if (response) {
            $("#barcode-title").val(response.title);
            $("#barcode-description").val(response.description);
            $("#photo-url").val(response.photo_url);
            M.updateTextFields();
            $("#add-barcode").hide();
            $("#update-barcode").show();
            $("#cancel").show();
        }
    });
});

$(".delete-button").on("click", function() {
    $("#delete-confirm").attr("data-id", $(this).data("id"));
});

$("#delete-confirm").on("click", function() {
    $.ajax("/api/barcode/" + $(this).data("id"), {
        method: "DELETE"
    }).then(function() {
        location.reload();
    });
});

$("#cancel").on("click", function() {
    $("#barcode-title").val("");
    $("#barcode-description").val("");
    $("#photo-url").val("");
    M.updateTextFields();
    $("#add-barcode").show();
    $("#update-barcode").hide();
    $("#cancel").hide();
});

//Modal Initialization
$(document).ready(function() {
    $('.modal').modal();
});