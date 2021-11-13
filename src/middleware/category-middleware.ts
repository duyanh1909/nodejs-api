import categories from "../models/Categories";

export const categoriesExist =  async (req, res, next) => {
    try {
        const id = req.body.idCategory;
        const category = await categories.findOne({_id: id});
        if (!category) {
            return res.send({message: "No have category in DB"});
        }
        next();
    }
    catch {
        return res.send({ message: "Not found category" });
    }
};