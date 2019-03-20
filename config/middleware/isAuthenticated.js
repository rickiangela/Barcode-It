
module.exports = function(req, res, next) {

    if (req.user) {
      console.log("user authenticated")
      return next();
      
    }
  
    console.log("user not authenticated")
    return res.redirect("/");
  };
  