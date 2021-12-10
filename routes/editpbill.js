const express = require("express");
const app = express();
const router = express.Router();
const pSchema = require("../model/purchaseschema");
const bodyParser = require("body-parser");
const { application } = require("express");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(express.json());

router.get("/", (req, res) => {
  const id = req.query.id;
  pSchema.findOne({ _id: id }, (err, data) => {
    if (!err) {
      res.render("editpbill", {
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

router.put("/", (req, res) => {
  const pid = req.body.pid;
  const name = req.body.name;
  const qty = req.body.qty;
  const date = req.body.date;
  const mrp = req.body.mrp;
  const rate = req.body.rate;
  const tamt = req.body.tamt;
  // update data
  pSchema.updateOne(
    { _id: pid },
    {
      $set: {
        itemName: name,
        quantity: qty,
        billDate: date,
        mrp: mrp,
        rate: rate,
        tamt: tamt,
      },
    },
    (err, data) => {
      if (!err) {
        res.send({ text: "inserted" });
      } else {
        res.send({ text: "notinserted" });
      }
    }
  );
});

module.exports = router;
