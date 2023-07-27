const {verifyToken} = require("../helpers/jwt");
const {User, Product} = require("../models");

async function authentication(req, res, next) {
  try {
    const {access_token} = req.headers;
    console.log(access_token);
    if (!access_token) {
      throw {name: "Unauthenticated"};
    }
    const payload = verifyToken(access_token);
    let user = await User.findOne({where: {id: payload.id}});
    if (!user) {
      throw {name: "Unauthenticated"};
    }
    req.additionalData = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    next();
  } catch (err) {
    next(err);
  }
}
async function authenticationCustomer(req, res, next) {
  try {
    const {access_token} = req.headers;
    console.log(access_token);
    if (!access_token) {
      throw {name: "Unauthenticated"};
    }
    const payload = verifyToken(access_token);
    let customer = await User.findOne({where: {id: payload.id}});
    if (!customer) {
      throw {name: "Unauthenticated"};
    }
    req.additionalData = {
      id: customer.id,
      email: customer.email,
      role: customer.role,
    };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authentication,
  authenticationCustomer,
};
