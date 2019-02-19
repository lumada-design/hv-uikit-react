/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import validationTypes from "./validationTypes";

/**
 * Validates if the value is within the accepted length range.
 *
 * @param {String} value - the inputted value.
 * @param {Number} maxCharQuantity
 * @param {Number} minCharQuantity
 * @returns {Boolean} - true if valid false if not.
 */
const validateCharLength = (value, maxCharQuantity, minCharQuantity) => {
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
const isNumeric = num => !Number.isNaN(Number(num));

/**
 * Checks if the value is an email
 *
 * @param {String} email - The value to test.
 * @returns {Boolean} - ´true´ if the value is an email ´false´ otherwise.
 */
const isEmail = email => {
  const regexp = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
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
const validateInput = (value, validation, validationType) => {
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

export { validateCharLength, validateInput, isNumeric, isEmail };
