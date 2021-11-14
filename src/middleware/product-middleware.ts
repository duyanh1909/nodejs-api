import products from "../models/Products";

export const productsExist =  async (req, res, next) => {
    try {
        const id = req.body.idProduct || req.params.id;
        const product = await products.findOne({_id: id});
        if (!product) {
            return res.send({message: "No have product in DB"});
        }
        next();
    }
    catch {
        return res.send({message: "Not found product"});
    }
};

export const emptyEntryProduct = (req, res, next) => {
    let error = new Array();
    if (req.body.nameProduct == ''){
        error.push("Name is required");
    }
    if (req.body.color == ''){
        error.push("Color is required");
    }
    if (req.body.mic == ''){
        error.push("Mic is required");
    }
    if (req.body.idCategory == ''){
        error.push("idCategory is required");
    }
    if (req.body.price == ''){
        error.push("Price is required");
    }
    if (error.length) {
        return res.send({errors: error, data: req.body});
    }
    next();
}