const e = require("express");
const express = require("express");
const router = express.Router();
const gSchema = require("../model/generalinfoschema");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", (req, res) => {
  gSchema.find((err, data) => {
    if (!err) {
      const d = data;
      if (d.length > 0) {
        console.log("if");
        res.render("generalinfo", {
          data: d,
        });
      } else {
        console.log("else");
        const d = [
          {
            medicalName: "",
            phone: "",
            email: "",
            state: "",
            address: "",
            zip: "",
          },
        ];
        res.render("generalinfo", {
          data: d,
        });
      }
    } else {
      res.send("Some error occured");
    }
  });
});

router.post("/", urlencodedParser, (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const state = req.body.state;
  const address = req.body.address;
  const zip = req.body.zip;
  const date = new Date();

  gSchema.find((err, data) => {
    if (!err) {
      if (data.length > 0) {
        const id = data[0]._id.toString();
        console.log("if part");
        gSchema.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              userId: 0,
              medicalName: name,
              phone: phone,
              email: email,
              state: state,
              address: address,
              zip: zip,
              date: date,
            },
          },
          (err, data) => {
            if (!err) {
              gSchema.find({ _id: id }, (err, da) => {
                res.render("generalinfo", {
                  alert: true,
                  success: "success",
                  msg: "Your Data has been updated successfully",
                  data: da,
                });
              });
            } else {
              res.render("generalinfo", {
                alert: true,
                success: "danger",
                msg: "Your Data has not been updated some error occured",
              });
            }
          }
        );
      } else {
        console.log("else part");
        const data = new gSchema({
          userId: 0,
          medicalName: name,
          phone: phone,
          email: email,
          state: state,
          address: address,
          zip: zip,
          date: date,
        });

        data.save((err, data) => {
          if (!err) {
            gSchema.find((err, da) => {
              if (!err) {
                res.render("generalinfo", {
                  alert: true,
                  success: "success",
                  msg: "Your Data has been updated successfully",
                  data: da,
                });
              } else {
                res.send("Some error occured");
              }
            });
          } else {
            res.render("generalinfo", {
              alert: true,
              success: "danger",
              msg: "Your Data has been updated some error occured",
            });
          }
        });
      }
    }
  });
});

module.exports = router;
