const express = require('express')
const cookieSession = require('cookie-session')
var app = express()
var authRouter = require('./api/routes/auth')
const passport = require( 'passport' )


require('./utils/passport-setup')
require('./utils/mongoose-connection')

app.set("view engine", "ejs")

app.use( cookieSession({
     maxAge : 24 * 60 * 60 * 1000,
     keys : ["xyzxyzxyz"]
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)

app.listen(3000, ()=>{
     console.log("App is Running on port : "+ 3000 )
})