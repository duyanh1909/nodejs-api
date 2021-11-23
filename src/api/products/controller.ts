import products from '../../models/Products';
import { errorFormat } from '../../middleware/validateData'
class productController {
    get() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                const product = await products.findOne({_id: id}).populate('category');
                if (product) {
                    return res.status(200).send({ data: product });
                }
                return res.status(404).send({message: "Not have product!!!"});
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
                const product = await products.find().populate('category');
                if (product) {
                    return res.status(200).send({ data: product });
                }       
                return res.status(404).send({message: "Not have product!!!"});    
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
                const product = new products(req.body);
                await product.save();
                const id = product._id
                res.status(200).send({ 
                    message: "Create success",
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

    update() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                let product = await products.findOne({ _id: id });
                product.nameProduct = req.body.nameProduct;
                product.color = req.body.color;
                product.mic = req.body.mic;
                product.price = req.body.price;
                product.categoryId = req.body.categoryId;
                await product.save();
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
                const product = await products.deleteOne({ _id: id});
                res.status(200).send({ 
                    message: "Delete success",
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
};

export default productController;