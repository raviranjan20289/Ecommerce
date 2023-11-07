require("dotenv").config();
const express = require("express");

const swagger = require("swagger-ui-express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

require("./db/connect");

const productRoutes = require("./routes/products");

const userRoutes = require("./routes/users");

const cartRoutes = require("./routes/cart");

const swaggerDocument = require("./swagger.json");

const loggerMiddleware = require('./middleware/logger');

app.use(express.json());

app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));

//implementing loggerMiddleware on application level , but we can also implement on specific routes as well 
app.use(loggerMiddleware);

app.use("/api/product",productRoutes);

app.use("/api/user", userRoutes);

app.use("/api/cart", cartRoutes);



app.get("/", (req, res) => {
  res.send("hello from Ecommerce");
});

// to handle 404 requests
app.use((req, res) => {
  res.status(404).send("API NOT FOUND");
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000...");
});
