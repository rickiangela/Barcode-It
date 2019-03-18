var db = require("../models");
var fs = require("fs");

module.exports = function(app) {
    // Load sign-in page
    app.get("/", function(req, res) {
        fs.readFile(__dirname.slice(0, -6) + "public/html/sign-in.html", function(err, data) {
            if (err) return res.render("404");
            // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
            // an html file.
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    });

    app.get("/registration", function(req, res) {
        fs.readFile(__dirname.slice(0, -6) + "public/html/registration.html", function(err, data) {
            if (err) return res.render("404");
            // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
            // an html file.
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    });

    app.get("/index", function(req, res) {
        res.render("index");
    })

    app.get("/barcodes", function(req, res) {
        if (req.query.barcode) {
            //find one from database to get item name, description, photo
            return res.render("scanned", { barcode: req.query.barcode });
        };
        res.render("404");
    });

    app.get("/barcodes/:userId", function(req, res) {
        db.Barcode.findAll({
            where: { UserId: req.params.userId }
        }).then(function(result) {
            res.render("barcodes", { barcodes: result });
        });
    })

    app.get("/camera", function(req, res) {
        res.render("camera");
    })
};