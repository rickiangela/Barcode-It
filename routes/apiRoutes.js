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

    app.get("/api/barcode/:id", function(req, res) {
        var userId = 1; //replace with req.user.id when passport implemented

        db.Barcode.findOne({
            where: { UserId: userId, id: req.params.id }
        }).then(function(result) {
            res.json(result);
        });
    });

    app.post("/api/barcode", function(req, res) {
        var userId = 1; //replace with req.user.id when passport implemented

        function createBarcode() {
            //Create 12-digit barcode that begins with 1-9 and verify it doesn't already exist
            var barcodeNum = Math.floor(Math.random() * 899999999999) + 100000000000;
            db.Barcode.findOne({
                where: { UserId: userId, barcode_num: barcodeNum }
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
                        UserId: userId
                    }).then(function(result) {
                        res.json(result);
                    })
                }
            });
        };
        createBarcode();
    });

    app.put("/api/barcode/:id", function(req, res) {
        var userId = 1; //replace with req.user.id when passport implemented

        db.Barcode.update({
            title: req.body.title,
            description: req.body.description,
            photo_url: req.body.photo_url
        }, {
            where: { id: req.params.id }
        }).then(function(result) {
            res.json(result);
        });
    });

    app.delete("/api/barcode/:id", function(req, res) {
        var userId = 1; //replace with req.user.id when passport implemented

        db.Barcode.destroy({
            where: { UserId: userId, id: req.params.id }
        }).then(function(result) {
            res.json(result);
        });
    });

    app.get("/api/item/:id", function(req, res) {
        var userId = 1;

        db.Item.findOne({
            where: { UserId: userId, id: req.params.id }
        }).then(function(result) {
            res.json(result);
        });
    });

    app.post("/api/item", function(req, res) {
        var userId = 1; //replace with req.user.id when passport implemented

        db.Item.create({
            item_name: req.body.item_name,
            description: req.body.description,
            photo_url: req.body.photo_url,
            UserId: userId
        }).then(function(result) {
            res.json(result);
        });
    });

    app.put("/api/item/:id", function(req, res) {
        var userId = 1; //replace with req.user.id when passport implemented

        db.Item.update({
            item_name: req.body.item_name,
            description: req.body.description,
            photo_url: req.body.photo_url
        }, {
            where: { id: req.params.id }
        }).then(function(result) {
            res.json(result);
        });
    });

    app.delete("/api/item/:id", function(req, res) {
        var userId = 1; //replace with req.user.id when passport implemented

        db.Item.destroy({
            where: { UserId: userId, id: req.params.id }
        }).then(function(result) {
            res.json(result);
        });
    });
};