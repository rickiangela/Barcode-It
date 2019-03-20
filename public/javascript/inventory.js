$(".li-inventory").attr("class", "active");

$(".barcode").each(function() {
    $(this).JsBarcode($(this).data("id"));
});

$("#add-item").on("click", function() {
    var itemName = $("#item-name").val().trim();
    if (itemName !== "") {
        $.ajax("/api/item", {
            method: "POST",
            data: {
                item_name: itemName,
                description: ($("#item-description").val().trim() === "") ? undefined : $("#item-description").val().trim(),
                photo_url: ($("#photo-url").val().trim() === "") ? undefined : $("#photo-url").val().trim()
            }
        }).then(function(response) {
            location.reload();
        });
    };
});

$("#update-item").on("click", function() {
    var itemName = $("#item-name").val().trim();
    if (itemName !== "") {
        $.ajax("/api/item/" + $("#update-item").data("id"), {
            method: "PUT",
            data: {
                item_name: itemName,
                description: ($("#item-description").val().trim() === "") ? undefined : $("#item-description").val().trim(),
                photo_url: ($("#photo-url").val().trim() === "") ? undefined : $("#photo-url").val().trim()
            }
        }).then(function(response) {
            location.reload();
        });
    };
});

$(".edit-button").on("click", function() {
    //Set data-id prior to scope changing
    $("#update-item").attr("data-id", $(this).data("id"));

    $.ajax("/api/item/" + $(this).data("id"), {
        method: "GET"
    }).then(function(response) {
        if (response) {
            $("#item-name").val(response.item_name);
            $("#item-description").val(response.description);
            $("#photo-url").val(response.photo_url);
            M.updateTextFields();
            $("#add-item").hide();
            $("#update-item").show();
            $("#cancel").show();
        }
    });
});

$(".delete-button").on("click", function() {
    $("#delete-confirm").attr("data-id", $(this).data("id"));
});

$("#delete-confirm").on("click", function() {
    $.ajax("/api/item/" + $(this).data("id"), {
        method: "DELETE"
    }).then(function() {
        location.reload();
    });
});

$("#cancel").on("click", function() {
    $("#item-name").val("");
    $("#item-description").val("");
    $("#photo-url").val("");
    M.updateTextFields();
    $("#add-item").show();
    $("#update-item").hide();
    $("#cancel").hide();
});

//Modal Initialization
$(document).ready(function() {
    $('.modal').modal();
});