// crea rutas de express
const router = require('express').Router();
module.exports = router;
const User = require('../models/user');
const Destino = require('../models/destinos');

router.get('/', (req, res) => {
    res.send(process.env.NODE_ENV)
});
/***
 * User Routers
 * 
 */
router.post('/users', (req, res) => {
    new User(req.body)
        .save()
        .then(user => {
            res.send(user); 
        }).catch(err => {
            res.status(400).send(err);
        })
})

router.post('/users/auth', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body); 
        if (!user)
            return res.status(401).send('Wrong Credentials');
        res.send(user);
    }catch(err){
        res.status(401).send(err);
    
/*
User.findByCredentials(req.body).then( user => {
    res.send(user)
}).catch(err=> {
    res.status(401).send(err)
})
*/
    }
})


router.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send(err);
    });
});
router.get('/users/:user_id', (req, res) => {

    User.findById(req.params.user_id).then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send(err);
    });
});
router.delete('/users/:user_id', (req, res) => {
    User.findByIdAndDelete(req.params.user_id)
        .then(user => {
            res.send(user);
        }).catch(err => {
            res.status(500).send(err);
        });
});
router.patch('/users/:user_id', (req, res) => {

    User.findByIdAndUpdate(req.params.user_id, {
        $set: {
            ...req.body
        }
    }, {
        new: true,
        runValidators: true
    }).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(400).send(err);
    })

})

/*   User.findById(req.params.user_id).then(user => {
       user = {
           ...user.toObject(),
           ...req.body
       }
       user.save().then(updateUser => {
           res.send(updateUser)
       }).catch(err => {
           res.status(400).send(err);
       });
   }); */

   /////////////////////////////////////////
   // RUTAS PARA LOS DESTINOS ////

   router.post('/destins', (req, res) => {
       new Destino(req.body)
       .save()
       .then(destino => {
           res.send(destino);
       }).catch(err => {
           res.status(400).send(err);
       })

    })




   router.get('/destins', (req, res) =>{
       Destino.find({}).then(destins => {
           res.send(destins);
       }).catch(err => {
           res.status(500).send(err);
       })
   })