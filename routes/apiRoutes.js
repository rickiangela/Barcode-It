var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

    app.post("/api/signin", passport.authenticate("local"), function(req, res) {
        res.json("/index");
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/register", function(req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }).then(function() {
            res.redirect(307, "/api/signin")
        }).catch(function(err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
        });
    });

    // Route for logging user out
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            db.User.findOne({
                where: { id: req.user.id }
            }).then(function(result) {
                res.json(result);
            });
        };
    });

    app.get("/api/barcode/:id", function(req, res) {
        var userId = req.user.id; //replace with req.user.id when passport implemented

        db.Barcode.findOne({
            where: { UserId: userId, id: req.params.id }
        }).then(function(result) {
            res.json(result);
        });
    });

    app.post("/api/barcode", function(req, res) {
        var userId = req.user.id; //replace with req.user.id when passport implemented

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
        var userId = req.user.id; //replace with req.user.id when passport implemented

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
        var userId = req.user.id; //replace with req.user.id when passport implemented

        db.Barcode.destroy({
            where: { UserId: userId, id: req.params.id }
        }).then(function(result) {
            res.json(result);
        });
    });

    app.get("/api/item/:id", function(req, res) {
        var userId = req.user.id;

        db.Item.findOne({
            where: { UserId: userId, id: req.params.id }
        }).then(function(result) {
            res.json(result);
        });
    });

    app.post("/api/item", function(req, res) {
        var userId = req.user.id; //replace with req.user.id when passport implemented

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
        var userId = req.user.id; //replace with req.user.id when passport implemented

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
        var userId = req.user.id; //replace with req.user.id when passport implemented

        db.Item.destroy({
            where: { UserId: userId, id: req.params.id }
        }).then(function(result) {
            res.json(result);
        });
    });
};