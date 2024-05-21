const relatefProductServices = require("../services/related-products.services");

exports.create = (req, res, next) => {
    relatefProductServices.addRelatedProduct(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results
        });
  })  
};

exports.delete = (req, res, next) => {
    var model = {
        id:req.params.id,
    };
    relatefProductServices.removeRelatedProduct(model, (error, results) => {
        if (error) {
            return next(error);
        }
        else {
            return res.status(200).send({
                message: "Success",
                data:results
            })
        }
    })
};