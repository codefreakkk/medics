const express = require("express");
const app = express();
const router = express.Router();
const pSchema = require("../model/purchaseschema");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(express.json());

router.get("/", (req, res) => {
    pSchema.find((err, data) => {
        res.render("showstock", {
            data: data,
        });
    })
});

router.post("/", (req, res) => {
    const text = req.body.data;
    pSchema.find({ itemName: { $regex: new RegExp(`^${text},*`, "i") } }, (err, data) => {
        if(!err) {
            res.send({res: data});
        }
    })
})

module.exports = router;