
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://ranjan:test12@cluster0.hhv33pq.mongodb.net/Ecommerce?retryWrites=true&w=majority')
.then(()=>{
    console.log("Db Connected");
}).catch((err)=>{
    console.log(err);
})