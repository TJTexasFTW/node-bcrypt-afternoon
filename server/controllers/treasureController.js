const bcrypt = require('bcryptjs');

//my attempt at this crap . . . 
// module.exports = {

    // dragonTreasure:  async (req, res) => {   

    // const result = await req.app
    //   .get("db")
    //   .get_dragon_treasure([1])
    //   .catch(err => console.log(err));
    //   res.status(200).json({result});

    // }

    module.exports = {
        dragonTreasure: async (req, res) => {
          const treasure = await req.app.get('db').get_dragon_treasure(1);
          return res.status(200).send(treasure);
        },

        getUserTreasure: async (req, res) => {
            const treasure = await req.app.get('db').get_user_treasure([req.session.user.id]);
            return res.status(200).send(treasure);
          },

        addUserTreasure: async (req, res) => {
            //Destructure treasureURL from req.body and id from req.session.user
            let {treasureURL} = req.body;
            let {id} = req.session.user;
            
            const userTreasure = await req.app.get('db').add_user_treasure([treasureURL, id]);
            return res.status(200).send(userTreasure);
          },


      };