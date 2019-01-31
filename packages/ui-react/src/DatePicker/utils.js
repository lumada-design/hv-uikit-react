/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const getDayStart = date => {
  const newDate = new Date(date);
  newDate.setHours("00");
  newDate.setMinutes("00");
  return date ? newDate : null;
};

const getDayEnd = date => {
  const newDate = new Date(date);
  newDate.setHours("23");
  newDate.setMinutes("59");
  return date ? newDate : null;
};

export { getDayStart, getDayEnd };
