const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/db-simple-auth', { 
     useNewUrlParser : true,
     useFindAndModify : true,
     useUnifiedTopology : true
})
.then(()=>{
     console.log("mongoose connected succesfully..")
})
.catch(()=>{
     console.log("something wrong with mongodb-connection..")
})
mongoose.Promise = global.Promise