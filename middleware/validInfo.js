module.exports = function (req, res, next) {
  console.log('checking validInfo')
    const { user_email, user_name, user_password } = req.body;
  
    // check a valid email has been entered by using a regex function
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    if (req.path === "/registration") {
      console.log(!user_email.length);
      if (![user_email, user_name, user_password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(user_email)) {
        return res.json("Invalid Email");
      }
    } else if (req.path === "/login") {
      if (![user_email, user_password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(user_email)) {
        return res.json("Invalid Email");
      }
    }
    next();
  };