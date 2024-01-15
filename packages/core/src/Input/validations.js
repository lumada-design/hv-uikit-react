import React from "react";
import { Success, Fail } from "@hitachivantara/uikit-react-icons";
import validationTypes from "./validationTypes";
import validationStates from "./validationStates";

/**
 * Validates if the value is within the accepted length range.
 *
 * @param {String} value - the inputted value.
 * @param {Number} maxCharQuantity
 * @param {Number} minCharQuantity
 * @returns {Boolean} - true if valid false if not.
 */
export const validateCharLength = (value, maxCharQuantity, minCharQuantity) => {
  if (maxCharQuantity === null && minCharQuantity === null) {
    return true;
  }

  if (minCharQuantity !== null && value.length < minCharQuantity) {
    return false;
  }

  if (maxCharQuantity !== null && value.length > maxCharQuantity) {
    return false;
  }

  return true;
};

/**
 * Checks if the value is a number.
 *
 * @param {Number || String} num - The value to test.
 * @returns {Boolean} - ´true´ if the value is a number ´false´ otherwise.
 */
export const isNumeric = (num) =>
  // to prevent Number( <spaces> ) = 0
  num.trim().length > 0 && !Number.isNaN(Number(num));

/**
 * Checks if the value is an email
 *
 * @param {String} email - The value to test.
 * @returns {Boolean} - ´true´ if the value is an email ´false´ otherwise.
 */
export const isEmail = (email) => {
  const regexp = new RegExp(
    "^[^\\s]+[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
  );
  return regexp.test(email);
};

/**
 *  Performs the validation of the inputted value the available validations are:
 *
 * -none
 * -number
 * -email
 * -custom
 *
 * @param {String} value - the inputted value.
 * @param {Function} validation - the custom function.
 * @param {String} validationType - the validation type.
 * @returns {Boolean} - true if valid false if not.
 */
export const validateInput = (value, validation, validationType) => {
  if (validation) {
    return validation(value);
  }
  switch (validationType) {
    default:
    case validationTypes.none:
      return true;
    case validationTypes.number:
      return isNumeric(value);
    case validationTypes.email:
      return isEmail(value);
  }
};

export const validationIcon = (state, className) => {
  switch (state) {
    case validationStates.valid:
      return <Success semantic="sema1" className={className} />;
    case validationStates.invalid:
      return <Fail semantic="sema4" className={className} />;
    default:
      return null;
  }
};
