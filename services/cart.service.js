const { cart } = require("../models/cart.model");

async function addCart(params, callback) {
  if (!params.userId) {
    return callback({ message: "UserId Required" });
  }

  try {
    let cartDB = await cart.findOne({ userId: params.userId });

    if (!cartDB) {
      const cartModel = new cart({
        userId: params.userId,
        products: params.products,
      });

      let response = await cartModel.save();
      return callback(null, response);
    } else if (cartDB.products.length === 0) {
      cartDB.products = params.products;
      await cartDB.save();
      return callback(null, cartDB);
    } else {
      for (const product of params.products) {
        let itemIndex = cartDB.products.findIndex(
          (p) => p.product && p.product.toString() === product.product
        );

        if (itemIndex === -1) {
          cartDB.products.push({
            product: product.product,
            qty: product.qty,
          });
        } else {
          cartDB.products[itemIndex].qty += product.qty;
        }
      }
      await cartDB.save();
      return callback(null, cartDB);
    }
  } catch (err) {
    return callback(err);
  }
}

async function getCart(params, callback) {
  try {
    let response = await cart.findOne({ userId: params.userId }).populate({
      path: "products.product",
      model: "Product",
      select: "productName productPrice productSalePrice productImage",
      populate: {
        path: "category",
        model: "Category",
        select: "categoryName",
      },
    });

    if (response && response.products) {
      response.products = response.products.map((product) => ({
        ...product,
        product: product.product ? product.product : null, // Add check for product
      }));
    }

    return callback(null, response);
  } catch (error) {
    return callback(error);
  }
}

async function removeCartItem(params, callback) {
  try {
    let cartDB = await cart.findOne({ userId: params.userId });

    if (!cartDB) {
      return callback(null, "Cart not found!");
    }

    if (params.productId && params.qty) {
      const productId = params.productId;
      const qty = params.qty;

      if (cartDB.products.length === 0) {
        return callback(null, "Cart empty!");
      } else {
        let itemIndex = cartDB.products.findIndex(
          (p) => p.product && p.product.toString() === productId
        );

        if (itemIndex === -1) {
          return callback(null, "Invalid Product!");
        } else {
          if (cartDB.products[itemIndex].qty === qty) {
            cartDB.products.splice(itemIndex, 1);
          } else if (cartDB.products[itemIndex].qty > qty) {
            cartDB.products[itemIndex].qty -= qty;
          } else {
            return callback(null, "Enter lower Qty");
          }
          await cartDB.save();
          return callback(null, "Cart Updated!");
        }
      }
    }
  } catch (err) {
    return callback(err);
  }
}

module.exports = {
  addCart,
  getCart,
  removeCartItem,
};
