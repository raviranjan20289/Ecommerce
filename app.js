const express = require('express');

const app = express();
require('./db/connect');

const productRoutes = require('./routes/products');

app.use(express.json());

app.use('/api/product', productRoutes);

app.get('/', (req, res)=>{
    res.send("hello from Ecommerce");
});


app.listen(3000, ()=>{
    console.log("Server is listening at port 3000...");
})