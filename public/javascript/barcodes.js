$(".barcode").each(function() {
    $(this).JsBarcode($(this).data("id"));
});

$("#add-barcode").on("click", function() {
    $.ajax("/api/barcode", {
        method: "POST",
        data: {
            id: 1,
            title: $("#barcode-title").val().trim(),
            description: $("#barcode-description").val().trim(),
            photo_url: $("#photo-url").val().trim()
        }
    }).then(function(response) {
        location.reload();
    });
});

$(".barcode").on("click", function() {
    window.location.href = window.location.origin + "/barcodes/?barcode=" + $(this).data("id");
});