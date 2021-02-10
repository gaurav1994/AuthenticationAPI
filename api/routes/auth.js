const router = require('express').Router()
const passport = require('passport')

// Authentication Middleware  that checks the user is logged on or not

const authenticationChecking = (req,res,next)=>{
     if(req.user) next()
     else res.redirect('/auth/index')
}

router.get('/index', (req,res)=>{
     res.render('index', { user : req.user })
})
router.get('/profile' , authenticationChecking , (req,res)=>{
     res.render('profile', {user : req.user })
})
router.get('/logout',(req,res)=>{
     req.logOut()
     res.redirect('/auth/index')
})

router.get('/google', passport.authenticate('google', { scope : ["profile"]}) )
router.get('/google/redirect', passport.authenticate('google') , (req,res)=>{
     console.log("user authenticated successfully : GOOGLE ")
     console.log(req.user)
     res.redirect('/auth/index')
})
router.get('/gihub', passport.authenticate('github'));
router.get('/github/redirect', passport.authenticate('github'), (req,res)=>{
     console.log("user authenticated successfully : GITHUB ")
     console.log(req.user)
     res.redirect('/auth/index')
})

module.exports = router