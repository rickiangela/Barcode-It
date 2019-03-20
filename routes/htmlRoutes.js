var db = require("../models");
var fs = require("fs");
var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {
    // Load sign-in page
    app.get("/", function(req, res) {
        fs.readFile(__dirname.slice(0, -6) + "public/html/sign-in.html", function(err, data) {
            if (err) return res.render("404");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    });

    app.get("/registration", function(req, res) {
        fs.readFile(__dirname.slice(0, -6) + "public/html/registration.html", function(err, data) {
            if (err) return res.render("404");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    });

    app.get("/index", function(req, res) {
        res.render("index");
    })

    app.get("/barcodes", function(req, res) {
        if (req.query.barcode) {
            db.Barcode.findOne({
                where: { barcode_num: req.query.barcode, UserId: 1 }
            }).then(function(result) {
                if (result) {
                    return res.render("scanned", { data: result });
                } else {
                    return res.render("404");
                }
            });
        } else {
            res.render("404");
        }

    });

    app.get("/barcodes/:userId", function(req, res) {
        db.Barcode.findAll({
            where: { UserId: req.params.userId },
            order: [
                ['id', 'DESC']
            ]
        }).then(function(result) {
            res.render("barcodes", { barcodes: result });
        });
    })

    app.get("/camera", function(req, res) {
        res.render("camera");
    })

    app.get("/members", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/registration.html"));
      });
};