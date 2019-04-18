const bcrypt = require('bcryptjs');

module.exports = {
register: async (req, res) => {
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
        // console.log("Reg user:", registeredUser);
        req.session.user = {isAdmin: user.is_admin, id: user.id, username: user.username}
        res.status(201).json(req.session.user);
    }

},

login: async (req, res) => {
    //destructure username and password from req.body
    console.log("we r here");
    let { username, password } = req.body;
    const foundUser = await req.app
        .get('db')
        .get_user([username]);
        // .catch(err => console.log(err));
    const user = foundUser[0];
    console.log("USER:", user);
    if (!user) {
        return res.status(401).json('User  not found. Please register as a new user before logging in.');
    } 
    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if (!isAuthenticated) {
      return res.status(403).send('Incorrect password');
    }
    req.session.user = { isAdmin: user.is_admin, id: user.id, username: user.username };
    return res.json(req.session.user);
  }
  
}
