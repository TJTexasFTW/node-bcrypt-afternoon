const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    //destructure username, password and isAdmin from req.body
    let { username, password, isAdmin } = req.body;

    const result = await req.app
      .get("db")
      .get_user([username])
      .catch(err => console.log(err));
      console.log("RESULT:", result);

    const existingUser = result[0];
    // undefined

    if (existingUser) {
        res.status(409).json("Username taken");
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registeredUser = await req.app
        .get("db")
        .register_user([isAdmin, username, hash])
        .catch(err => console.log(err));
        const user = registeredUser[0];
        console.log("Reg user:", registeredUser);
        req.session.user = {isAdmin: user.is_admin, id: user.id, username: user.username}
        res.status(201).json(req.session.user);
    }

}

// const result = 

// app.post("/auth/signup", async (req, res) => {
//     // Signup
//     const {username, password} = req.body;
//     const hash = await bcrypt.hash(password, 10).catch(err => console.log(err));
//     const dbResult = await req.app
//       .get("db")
//       .addUser([username, hash])
//       .catch(err => console.log(err));
//       req.session.user = username;
  
//       res.json(dbResult);
//   });

module.exports = {register}