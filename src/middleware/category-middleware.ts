import categories from "../models/Categories";

export const categoriesExist =  async (req, res, next) => {
    try {
        const id = req.body.categoryId || req.params.id;
        const category = await categories.findOne({ _id: id });
        if (!category) {
            return res.status(404).send({message: "No have category in DB"});
        }
        next();
    }
    catch {
        return res.status(404).send({ message: "Not found category" });
    }
};

// export const emptyEntryCategory = (req, res, next) => {
//     let error = new Array();
//     if (req.body.nameCategory == '') {
//         error.push("Name is required");
//     }
//     if (req.body.brand == '') {
//         error.push("Brand is required")
//     }
//     if (error.length) {
//         return res.status(400).send({errors: error, data: req.body});
//     }
//     next();
// }