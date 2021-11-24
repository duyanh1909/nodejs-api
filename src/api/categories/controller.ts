import categories from "../../models/Categories";
import { errorFormat } from '../../middleware/validateData'

class categoryController {
    
    get() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                const category = await categories.findOne({_id: id});
                if (category) {
                    res.status(200).send({ data: category });
                }
                else {
                    res.status(404).send({message: "Not have category"});
                }
            }
            catch(err) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(err)
                })
            }
        };
    };

    find() {
        return async (req, res) => {
            try {
                const category = await categories.find();
                if (category) {
                    return res.status(200).send({ data: category});
                }
                else {
                    return res.status(404).send({message: "Not have category"});
                }
            }
            catch(err) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(err)
                })
            }
        };
    };
    
    create() {
        return async (req, res) => {
            try {
                const category = new categories(req.body);
                await category.save();
                res.status(200).send({ message: category._id });
            }
            catch(err) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(err)
                })
            }
        }
    }

    update() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                let category = await categories.findOne({ _id: id });
                category.nameCategory = req.body.nameCategory;
                category.brand = req.body.brand;
                await category.save();
                res.status(200).send({ 
                    message: "Update success",
                    id: id 
                });
            }
            catch(err) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(err)
                })
            }
        }
    }

    delete() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                const category = await categories.deleteOne({ _id: id});
                res.status(200).send({message: "Delete Success"});
            }
            catch(err) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(err)
                })
            }
        }
    }
};

export default categoryController;