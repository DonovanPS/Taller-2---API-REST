const mongoose = require('mongoose')


//conexión remota (MongoDB Atlas)
const URI = "mongodb+srv://donovanpicon:mDFJXHRusLQrsc7l@uptc.mp8jwu6.mongodb.net/TallerIIApi?retryWrites=true&w=majority"

mongoose.set('strictQuery', false)


mongoose.connect(URI)
    .then(()=>console.log('Connect DB Success'))
    .catch( e => console.log(e))

module.exports = mongoose