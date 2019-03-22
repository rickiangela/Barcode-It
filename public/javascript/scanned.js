$("#scanned-barcode").JsBarcode($("#scanned-barcode").attr("data-barcode"));

$(".checkbox").on("click", function() {
    if ($(this).attr("data-changed") === "false") {
        $(this).attr("data-changed", "true");
    } else {
        $(this).attr("data-changed", "false");
    };

    $(".checkbox").each(function() {
        if ($(this).attr("data-changed") === "true") {
            $("#update-items").show();
            return false;
        }
        //if no changes are found then hide update button
        $("#update-items").hide();
    });
})

$("#update-items").on("click", function() {
    var barcodeId = { BarcodeId: $("#scanned-barcode").data("id") };
    var checkedItemIds = [];
    var uncheckedItemIds = [];
    $(".checkbox").each(function() {
        if ($(this).attr("data-changed") === "true") {
            if ($(this).prop("checked") === true) {
                checkedItemIds.push({ id: $(this).data("id") });
            } else {
                uncheckedItemIds.push({ id: $(this).data("id") });
            };
        };
    });

    $.ajax("/api/items/", {
        method: "PUT",
        data: {
            barcodeId: barcodeId,
            checkedIds: checkedItemIds,
            uncheckedIds: uncheckedItemIds
        }
    }).then(function(response) {
        location.reload();
    });
});

$(document).ready(function() {
    $('.tabs').tabs({
        swipeable: true
    });

    $("#unassigned").css("visibility", "hidden");

});