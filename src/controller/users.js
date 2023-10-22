const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { cerate, findEmail } = require("../model/users");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");
const Joi = require("joi");

// Validate
const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

let usersController = {
  register: async (req, res, next) => {
    try {
      const { error, value } = userSchema.validate(req.body);

      if (error) {
        return commonHelper.response(res, null, 400, error.message);
      }

      const { fullname, email, password, phone, role } = req.body;

      const { rowCount } = await findEmail(email);
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password);
      const id = uuidv4();
      if (rowCount) {
        return next(createError(403, "Email is already used"));
      }
      const data = {
        id,
        fullname,
        email,
        passwordHash,
        phone,
      };

      cerate(data)
        .then((result) => {
          commonHelper.response(res, data, 201, "Register created");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error.message);
      console.error(error);
      commonHelper.response(res, null, 500, "Error creating users!");
    }
  },

  login: async (req, res, next) => {
    try {
      const { error: validateError } = loginSchema.validate(req.body);

      if (validateError) {
        return commonHelper.response(res, null, 400, validateError.message);
      }

      const { email, password } = req.body;
      const {
        rows: [user],
      } = await findEmail(email);
      if (!user) {
        return next(createError(403, "Email false"));
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return next(createError(403, "password false"));
      }

      delete user.password;
      const payload = {
        email: user.email,
        role: user.role,
      };
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.refershToken(payload);
      commonHelper.response(res, user, 201, "login is successful");
    } catch (error) {
      console.error(error.message);
      console.error(error);
      commonHelper.response(res, null, 500, "Error creating users!");
    }
  },

  profile: async (req, res, next) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },
  refreshToken: (req, res) => {
    const refershToken = req.body.refershToken;
    const decoded = jwt.verify(refershToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refershToken: authHelper.refershToken(payload),
    };
    commonHelper.response(res, result, 200, "Refersh Token is successful");
  },
};

module.exports = usersController;
