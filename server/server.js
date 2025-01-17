require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

// This line of code adds Express middleware that parses incoming request bodies with JSON payloads. 
// It's important to place this before any routes that need to handle JSON data in the request body. 
// This middleware is responsible for parsing JSON data from requests, and it should be applied at 
// the beginning of your middleware stack to ensure it's available for all subsequent route handlers.

app.use(express.json());

// Mount the Router: To use the router in your main Express app, you can "mount" it 
//                   at a specific URL prefix
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at port: ${PORT}`);
    });
});