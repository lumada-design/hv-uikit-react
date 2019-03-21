/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

import styles from "../styles";

describe("ModalContent styles", () => {
  it("should behave correctly", () => {
    const theme = {
      hv: {
        spacing: {
          md: "20px"
        }
      }
    };
    expect(styles(theme)).toMatchSnapshot();
  });
});
