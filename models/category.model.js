const mongoose = require("mongoose");

const category = mongoose.model(
    "Category",
    mongoose.Schema({
        categoryName: {
            type: String,
            require: true,
            unique: true,
        },
        categoryDescription: {
            type: String,
            required:false
        },
        categoryImage: {
            type:String
        },
    },
        {
            toJSON: {
                transform: function (doc, ret) {
                      if (ret._id) {
                        ret.categoryId = ret._id ? ret._id.toString() : null;
                      }
                    delete ret._id;
                    delete ret._v;
                },
            },
        }
    )
);

module.exports = {
    category,
};