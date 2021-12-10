const express = require("express");
const app = express();
const router = express.Router();
const pSchema = require("../model/purchaseschema");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(express.json());

router.get("/", (req, res) => {
  res.render("purchaseinvoice");
});

router.post("/", (req, res) => {
  const userId = req.body.userId;
  const date = req.body.date;
  pSchema.find(
    {
      $and: [{ uid: 0 }, { billDate: date }],
    },
    (err, data) => {
      if (!err) {
        res.send({ pdata: data });
      } else {
        res.send({ pdata: "false" });
      }
    }
  );
});

router.delete("/", (req, res) => {
    const id = req.body.id;
    pSchema.findOneAndDelete({_id: id}, (err, data) => {
      res.send({inserted: "true"});
    })
})

module.exports = router;
