module.exports = {
    usersOnly: async (req, res, next) => {

    if (req.session.user) {
        next();
    } else {
        return res.status(401).send("Please log in");
    }

      },
  };