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

import themeHv from "@hv-ui/themes/dist/theme";
import styles from "../styles";

describe("Modal styles", () => {
  const theme = {
    palette: {
      grey: {
        smokey: "#FFFFFF",
        plain: "#FFFFFF"
      }
    },
    spacing: {
      xs: "10"
    },
    hv: themeHv
  };

  it("should behave correctly", () => {
    expect(styles(theme)).toMatchSnapshot();
  });
});