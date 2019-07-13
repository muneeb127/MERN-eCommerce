const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateProductInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.image = !isEmpty(data.image) ? data.image : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (
    !Validator.isLength(data.name, {
      min: 2,
      max: 30
    })
  ) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = "Image path is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = "Category field is required";
  }

  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = "Quantity field is required";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
