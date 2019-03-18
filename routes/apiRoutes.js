var db = require("../models");

module.exports = function(app) {
    app.post("/api/register", function(req, res) {
        //passport encyrption
        // db.User.create({
        //     first_name: req.body.first_name,
        //     last_name: req.body.last_name,
        //     email: req.body.email,
        //     password: req.body.password
        // });
    })

    app.post("/api/barcode", function(req, res) {
        var barcodeNum = 238745123412;

        function createBarcode() {
            //Create 12-digit barcode that begins with 1-9 and verify it doesn't already exist
            var barcodeNum = Math.floor(Math.random() * 899999999999) + 100000000000;
            db.Barcode.findOne({
                where: { UserId: req.body.id, barcode_num: barcodeNum }
            }).then(function(result) {
                if (result) {
                    //Try again using recursion
                    createBarcode()
                } else {
                    //Create barcode
                    db.Barcode.create({
                        barcode_num: barcodeNum,
                        title: req.body.title,
                        description: req.body.description,
                        photo_url: req.body.photo_url,
                        UserId: req.body.id
                    }).then(function(result) {
                        res.send(result);
                    })
                }
            });
        };
        createBarcode();
    });
};