require("dotenv").config();
const express = require("express");
const app = express();
const swagger = require('swagger-ui-express');

require("./db/connect");

const productRoutes = require("./routes/products");

const userRoutes = require("./routes/users");

const cartRoutes = require("./routes/cart");

const swaggerDocument  = require('./swagger.json');

app.use(express.json());

app.use("/api-docs",swagger.serve, swagger.setup(swaggerDocument) );

app.use("/api/product", productRoutes);

app.use("/api/user", userRoutes);

app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("hello from Ecommerce");
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000...");
});
