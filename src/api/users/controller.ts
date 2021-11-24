import users from '../../models/users';
import { errorFormat } from '../../middleware/validateData';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class userController {
    get() {
        return async (req, res) => {
            const id = req.body.id;
            try {
                const user = await users.findOne({_id: id});
                if (user) {
                    return res.status(200).send({ data: user });
                }
                return res.status(404).send({message: "Not have user"});
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
                const user = await users.find();
                if (user) {
                    return res.status(200).send({ data: user });
                }       
                return res.status(404).send({message: "Not have user"});    
            }
            catch(err) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(err)
                })
            }
        };
    };

    login() {
        return async (req, res) => {
            try {
                const username = req.body.username;
                const password = req.body.password;

                const user = await users.findOne({
                    username: username,
                })
                if (!user) {
                    return res.status(400).send({
                        message: "User Not Found"
                    })
                }
                const comparePassword = await bcrypt.compare(password, user.password);
                if (!comparePassword) {
                    return res.status(400).send({
                        message: "Password incorrect"
                    })
                }
                const payload = { _id: user._id, fullName: user.fullName, userType: user.userType };
                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 1800 })
                return res.status(200).send({
                    message: "Login successfully",
                    token: token
                })
            }
            catch(err) {
                res.status(403).send(err)
            }
        }
    }
    createUser() {
        return async (req, res) => {
            try {
                const user = new users(req.body);
                await user.save();
                res.status(200).send({ 
                    message: "Create success",
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

    update() {
        return async (req, res) => {
            try {
                const user = await users.findOne({
                    email: req.body.email
                })
                if (!user) {
                    return res.status(400).send({
                        message: "User Not Found"
                    })
                }
                const comparePassword = await bcrypt.compare(req.body.oldPassword, user.password);
                if (!comparePassword) {
                    return res.status(400).send({
                        message: "Password incorrect"
                    })
                }
                user.password = req.body.newPassword;
                await user.save();
                res.status(200).send({ 
                    message: "Update password successfully"
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
};

export default userController;