const mongoose = require("mongoose");

// connect to database
let url = "mongodb://localhost:27017/medics";
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection successfull");
    })
    .catch((err) => console.log(err));