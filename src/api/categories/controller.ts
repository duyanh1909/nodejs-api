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
                    res.status(404).send({message: "Not have category!!!"});
                }
            }
            catch(e) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(e)
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
                    return res.status(404).send({message: "Not have category!!!"});
                }
            }
            catch(e) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(e)
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
            catch(e) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(e)
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
            catch(e) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(e)
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
            catch(e) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(e)
                })
            }
        }
    }
};

export default categoryController;