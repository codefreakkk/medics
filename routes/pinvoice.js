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
  res.render("pinvoice", {
      id: id,
  });
});

router.post("/", (req, res) => {
    const id = req.body.id;
    try {
        pSchema.find({_id: id}, (err, data) => {
            if(!err) {
                res.send({data: data})
            } else {
                res.send({data: ""})
            }
        })
    } catch(e) {
        res.send({data: ""});
    }
})

module.exports = router;