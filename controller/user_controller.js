const pool = require("../database/db")
const bcrypt = require("bcrypt");
// const validInfo = require("../middleware/validInfo");
// const jwtGenerator = require("../utils/jwtGenerator");

//routes user/registration
// router.post("/register", validInfo, async (req, res) => {
exports.userRegistration = async (req, res) => {
    const { user_email, user_name, user_password } = req.body;
    try {
      const user = await pool.query("SELECT * FROM euser WHERE user_email = $1", [
        user_email
      ]);
  
      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");   
      }
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(user_password, salt);
      let newUser = await pool.query(
        "INSERT INTO euser (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [user_name, user_email, bcryptPassword]
      );
    //   const jwtToken = jwtGenerator(newUser.rows[0].u_id);
    //   return res.json({ jwtToken });
    return res.json('Registration successfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
};   



exports.userLogin = async (req, res) => {
  const { user_email, user_password } = req.body;
  // console.log("user_password",user_password)
  try {
    const user = await pool.query("SELECT * FROM euser WHERE user_email = $1", [
      user_email
    ]);
    // console.log("user_password from database",user.rows[0].user_password);
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    console.log('password',user.rows[0].user_password)
    let validPassword = await bcrypt.compare(user_password,user.rows[0].user_password.trim());

    let user_info ={
      user_name : user.rows[0].user_name,
      user_email :user.rows[0].user_email,
      user_id : user.rows[0].u_id
    }   

    if (!validPassword) {
      return res.status(401).json("Invalid Password");
    }else{
      // return res.json('Succesfully Login') 
      res
      .status(201)
      // .cookie('token', token, options) // set token cookie
      .json({
        success: true,
        user_info
      });  
    }
    // const jwtToken = jwtGenerator(user.rows[0].u_id);
    // return res.json({ jwtToken });
  } catch (err) {
    console.log("Login error",err)
    res.status(500).send("Server error");
  }
};   

