const e = require("express");
const express = require("express");
const app = express();
const router = express.Router();
const pSchema = require("../model/purchaseschema");
const bodyParser = require("body-parser");
const { application } = require("express");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(express.json());

router.get("/", (req, res) => {
  res.render("purchasebill");
});

router.post("/", urlencodedParser, (req, res) => {
  const name = req.body.name;
  const qty = req.body.qty;
  const date = req.body.date;
  const mrp = req.body.mrp;
  const rate = req.body.rate;
  const tamt = req.body.tamt;

  const data = new pSchema({
    uid: 0,
    itemName: name,
    quantity: qty,
    billDate: date,
    mrp: mrp,
    rate: rate,
    tamt: tamt,
  });

  data.save((err, data) => {
      if(!err) {
          res.send({text: "inserted"});
      } else {
          res.send({text: "notinserted"});
      }
  })

});

module.exports = router;
