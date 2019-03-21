var db = require("../models");
var fs = require("fs");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    // Load sign-in page
    app.get("/", function(req, res) {
        if (req.user) {
            res.redirect("/index");
        };
        res.sendFile(path.join(__dirname, "../public/html/sign-in.html"));
    });

    app.get("/registration", function(req, res) {
        if (req.user) {
            res.redirect("/index");
        };
        res.sendFile(path.join(__dirname, "../public/html/registration.html"));
    });

    app.get("/index", isAuthenticated, function(req, res) {
        res.render("index");
    });

    app.get("/barcode", isAuthenticated, function(req, res) {
        var userId = req.user.id;
        if (req.query.barcode) {
            const getBarcode = db.Barcode.findOne({
                where: { barcode_num: req.query.barcode, UserId: userId }
            });

            const getItems = db.Item.findAll({
                where: {
                    UserId: userId,
                    $or: [{ '$Barcode.barcode_num$': req.query.barcode }, { BarcodeId: null }]
                },
                include: [{ model: db.Barcode }]
            });

            Promise.all([getBarcode, getItems])
                .then(function(results) {
                    if (results) {
                        // console.log(results[0]);
                        // console.log(results[1]);
                        // res.json(results);
                        res.render("scanned", { barcode: results[0], items: results[1] })
                    } else {
                        res.render("404");
                    };
                }).catch(function(err) {
                    console.log(err);
                });
        } else {
            res.render("404");
        };
    });

    app.get("/barcodes/user", isAuthenticated, function(req, res) {
        var userId = req.user.id;

        db.Barcode.findAll({
            where: { UserId: userId },
            order: [
                ['id', 'DESC']
            ]
        }).then(function(result) {
            res.render("barcodes", { barcodes: result });
        });
    });

    app.get("/inventory/user", isAuthenticated, function(req, res) {
        var userId = req.user.id;

        db.Item.findAll({
            where: { UserId: userId },
            include: [db.Barcode],
            order: [
                ['item_name', 'ASC']
            ]
        }).then(function(result) {
            res.render("inventory", { items: result });
        });
    });

    app.get("/camera", isAuthenticated, function(req, res) {
        res.render("camera");
    })

    app.get("/members", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/registration.html"));
    });
};