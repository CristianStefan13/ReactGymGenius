const express = require("express");
const cloudinary = require("../utils/cloudinary");
const { Subscription } = require("../models/subscription");
const { isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", isAdmin, async (req, res) => {
  const {
    name,
    desc,
    benefits1,
    benefits2,
    benefits3,
    benefits4,
    benefits5,
    price,
    image,
  } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "onlineShop",
      });

      if (uploadRes) {
        const subscription = new Subscription({
          name,
          desc,
          benefits1,
          benefits2,
          benefits3,
          benefits4,
          benefits5,
          price,
          image: uploadRes,
        });

        const savedSubscription = await subscription.save();

        res.status(200).send(savedSubscription);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).send(subscriptions);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    res.status(200).send(subscription);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
