const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    benefits1: { type: String, required: true },
    benefits2: { type: String, required: true },
    benefits3: { type: String, required: true },
    benefits4: { type: String, required: true },
    benefits5: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Object, required: true },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

exports.Subscription = Subscription;
