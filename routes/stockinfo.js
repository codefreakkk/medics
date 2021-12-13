const express = require("express");
const app = express();
const router = express.Router();
const pSchema = require("../model/purchaseschema");
const bodyParser = require("body-parser");
const { application } = require("express");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", (req, res) => {
  const id = req.query.id;
  pSchema.findOne({ _id: id }, (err, data) => {
    if (!err) {
      res.render("stockinfo", {
        id: id,
        itemName: data.itemName,
        quantity: data.quantity,
        billDate: data.billDate,
        mrp: data.mrp,
        rate: data.rate,
        tamt: data.tamt,
      });
    } else {
      res.send("Some error occured");
    }
  });
});

module.exports = router;
