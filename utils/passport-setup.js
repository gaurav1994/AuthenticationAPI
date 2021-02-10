const passport = require('passport')
const GoogleStratagy = require('passport-google-oauth20').Strategy
const GithubStratagy = require('passport-github').Strategy
var User = require('../api/models/User-Model')

passport.serializeUser((user,done)=>{
     console.log(user)
     done(null, user.id)
})

passport.deserializeUser((id, done)=>{
     User.findById(id).exec().then(user=>{
          done(null, user)
     })
})

passport.use(new GoogleStratagy({
     clientID : "313929696678-0tb8hqkffe3lndtmuii2rd45lnfqpabj.apps.googleusercontent.com",
     clientSecret : "1io-iNhTvFeBdb6Yl-i6WhQx",
     callbackURL : "/auth/google/redirect"
}, (acessToken, refreshToken, profile, done)=>{
     console.log(profile)
     User.findOne({ googleId : profile.id }).exec()
     .then(existUser =>{
          if(!existUser){
               new User({
                    username : profile.displayName,
                    googleId : profile.id,
                    picture : profile._json.picture
               }).save()
               .then(user=>{
                    done(null, user )
               })
          }else{
               done(null , existUser )
          }
     })
     .catch(error=>{
          console.log(error)
     })
}))

passport.use(new GithubStratagy({
     clientID : "2d2f9c54bf589facd402",
     clientSecret : "add0e5f380f4f06f98e288503df01e021252f1c9",
     callbackURL : "/auth/github/redirect"
}, (accesToken , refreshToken, profile, done)=>{
     console.log(profile)
     User.findOne({ githubId : profile.id }).exec()
     .then(existUser=>{
          if(!existUser){
               new User({
                    username : profile.username,
                    githubId : profile.id,
                    picture : profile.photos[0].value
               }).save()
               .then(user=>{
                    done(null, user)
               })
          }else done(null , existUser)
     }).catch(error=>{
          console.log(error)
     })
}))