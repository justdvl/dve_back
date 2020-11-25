const {
    ADD_NEW_CONTACT
  } = require("../endpoints");

let express = require("express"),
router = express.Router();

let Contact = require("../models/contact.js");

router.post(ADD_NEW_CONTACT, async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const comment = req.body.comment ? req.body.comment : "";
  
    console.log("ADD_NEW_CONTACT, email, comment", email, comment);
    Contact.create(
      {
        name: name,  
        email: email,
        comment: comment,
      },
      (err, result) => {
        if (err) {
          console.log("err", err);
        } else {
          console.log("result", result);
          res.send(result);
        }
      }
    );
  });

// router.get("/all", (req, res, next) => {
//   console.log("get all");
//   Contact.find().then((data) => {
//     res.status(200).json({
//       message: "Task list retrieved successfully!",
//       contacts: data,
//     });
//   });
// });

module.exports = router;
