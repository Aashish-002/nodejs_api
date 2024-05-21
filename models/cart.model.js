const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    toJSON: {
      transform: function (model, ret) {
        if (ret._id) {
          ret.cartId = ret._id.toString();
        }
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const cart = mongoose.model("Cart", cartSchema);

module.exports = {
  cart,
};
