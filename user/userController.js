const User = require("../model/user");
const validation = require("../user/userValidation");

// Healthcheck to check whether user route is working or not.
const healthCheck = (req, res) => res.send("User route working!");

const add = async (req, res) => {
    try {
        await validation(req.body);
        const { name, phone, email, password } = req.body;

        const userDetails = await User.findOne({
            phone
        });
        if (userDetails && userDetails.phone) {
            return res
                .status(403)
                .send(
                    "User already exists! Please Login or create a new account"
                );
        }
        const user = await User.create({ name, phone, email, password });
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
};

module.exports = { add, healthCheck };
