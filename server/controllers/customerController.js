const {User, Product, Category, Image} = require("../models");
const {comparePassword} = require("../helpers/bcrypt");
const {generateToken} = require("../helpers/jwt");

class CustomerController {
  static async cusRegister(req, res, next) {
    try {
      const {username, email, password, phoneNumber, address} = req.body;
      const created = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        role: "admin",
      });
      res.status(201).json({
        username: created.username,
        email: created.email,
        role: created.role,
      });
    } catch (err) {
      next(err);
    }
  }

  static async cusLogin(req, res, next) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({
        where: {email},
      });
      if (!user) {
        throw {name: "loginInvalid"};
      }
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw {name: "loginInvalid"};
      }
      const accessToken = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      res.status(201).json({
        accessToken,
        id: user.id,
        role: user.role,
        username: User.username,
        message: "Logged in",
      });
    } catch (err) {
      next(err);
    }
  }
  //=============================login&register================================
  //=============================ReadProduct================================
  static async fetchProductCus(req, res, next) {
    try {
      const fetchData = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Image,
            attributes: ["imgUrl"],
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(fetchData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async detailProductCus(req, res, next) {
    try {
      const {slug} = req.params;
      const detail = await Product.findOne({
        where: {slug: slug},
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Image,
            attributes: ["imgUrl"],
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (detail === null) {
        throw {
          name: "NOT_FOUND",
        };
      }
      res.status(200).json(detail);
    } catch (err) {
      next(err);
    }
  }
  //=============================ReadProduct================================
}

module.exports = CustomerController;
