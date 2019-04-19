module.exports = {
    usersOnly: async (req, res, next) => {

    if (!req.session.user) {
        return res.status(401).send("Please log in");
    } 
    next();
    },

    adminsOnly: async (req, res, next) => {
        console.log("FUCKING ADMIN? ", req.session.user.isAdmin);
        if (!req.session.user.isAdmin) {
          return res.status(403).send('You are not an admin');
        }
        next();
      }

  };