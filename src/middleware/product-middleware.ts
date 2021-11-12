import categories from "../models/Categories";

export const categoriesExist =  async (req, res, next) => {
    const id = req.body.idCategory;
    try {
        const category = await categories.findOne({_id: id});
        console.log(category)
        if (!category) {
            return res.send({message: "No have category in DB"})
        }
        next();
    }
    catch {
        return;
    }
};

export const emptyEntryProduct = (req, res, next) => {
    let error = new Array();
    if (req.body.name == ''){
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