import categories from "../../models/Categories";

class categoryController {
    
    get() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                const category = await categories.findOne({_id: id});
                if (category) {
                    return res.send({ data: category });
                }
                return res.send({message: "Not have category!!!"});
            }
            catch {
                return res.send({message: "Category not found!!!"});
            }
        };
    };

    find() {
        return async (req, res) => {
            try {
                const category = await categories.find();
                if (category) {
                    res.send({ data: category});
                }
                return res.send({message: "Not have category!!!"});
            }
            catch {
                return res.send({message: "Category not found!!!"});
            }
        };
    };
    
    create() {
        return async (req, res) => {
            try {
                const category = new categories(req.body);
                category.save();
                res.send({ message: "Create Success" });
            }
            catch {
                res.send({ message: "Fail"});
            }
        }
    }

    update() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                const category = await categories.updateOne({ _id: id}, req.body);
                res.send({message: "Update Success"});
            }
            catch {
                res.send({ message: "Fail"});
            }
        }
    }

    delete() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                const category = await categories.deleteOne({ _id: id});
                res.send({message: "Delete Success"});
            }
            catch {
                res.send({ message: "Delete Fail"});
            }
        }
    }
};

export default categoryController;