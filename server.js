const express = require("express");
const app = express();
const path = require("path");
const css_path = path.join(__dirname, "css");
const script_path = path.join(__dirname, "scripts");
const partials_path = path.join(__dirname, "partials");
const pSchema = require("./model/purchaseschema");
const hbs = require("hbs");
require("./model/dbcon");

app.set("view engine", "hbs");
app.use("/css", express.static(css_path));
app.use("/scripts", express.static(script_path));
hbs.registerPartials("partials", partials_path);

// Route for home page
app.get("/", (req, res) => {
    res.render("index");
});

// Route for generalinfo
const generalinfo = require("./routes/generalinfo");
app.use("/generalinfo", generalinfo);

// Route for purchasebill
const purchasebill = require("./routes/purchasebill")
app.use("/purchasebill", purchasebill);

// Route for purchaseinvoice
const purchaseinvoice = require("./routes/purchaseinvoice");
app.use("/purchaseinvoice", purchaseinvoice);

// Route for editpbill
const editpbill = require("./routes/editpbill");
app.use("/editpbill", editpbill);

// Route for pinvoice
const pinvoice = require("./routes/pinvoice");
app.use("/pinvoice", pinvoice);

// Route for showstock
const showstock = require("./routes/showstock")
app.use("/showstock", showstock)

app.get("/salesbill", (req, res) => {
    res.render("salesbill");
});

app.get("/salesinvoice", (req, res) => {
    res.render("salesinvoice");
});

app.get("/salesreport", (req, res) => {
    res.render("salesreport");
});

// Route for stockinfo
const stockinfo = require("./routes/stockinfo");
app.use("/stockinfo", stockinfo);

app.get("/editstock", (req, res) => {
    res.render("editstock");
});

app.get("/editsalesbill", (req, res) => {
    res.render("editsalesbill");
});

app.listen(8000, () => {
    console.log("Server started");
});

