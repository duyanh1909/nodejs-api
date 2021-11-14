import products from '../../models/Products';
class productController {
    get() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                const product = await products.findOne({_id: id}).populate('idCategory');
                if (product) {
                    return res.send({ data: product });
                }
                return res.send({message: "Not have product!!!"});
            }
            catch {
                return res.send({message: "product not found!!!"});
            }  
        };
    };

    find() {
        return async (req, res) => {
            try {
                const product = await products.find().populate('idCategory');
                if (product) {
                    return res.send({ data: product });
                }       
                return res.send({message: "Not have product!!!"});    
            }
            catch {
                return res.send({message: "product not found!!!"}); 
            }
        };
    };
    
    create() {
        return async (req, res) => {
            try {
                const product = new products(req.body);
                await product.save();
                res.send({ message: 'Create Successs' });
            }
            catch {
                res.send({ message: "Create Fail"});
            }
        }
    }

    update() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                const product = await products.updateOne({ _id: id}, req.body);
                res.send({message: "Update Success"});
            }
            catch {
                res.send({ message: "Update Fail"});
            }
        }
    }

    delete() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                const product = await products.deleteOne({ _id: id});
                res.send({message: "Delete Success"});
            }
            catch {
                res.send({ message: "Delete Fail"});
            }
        }
    }
};

export default productController;