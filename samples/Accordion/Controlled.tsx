import { useState } from "react";
import {
  Breakpoint,
  HvAccordion,
  HvBox,
  HvButton,
  HvInput,
  HvSimpleGrid,
} from "@hitachivantara/uikit-react-core";

import { css, CSSInterpolation } from "@emotion/css";

const styles: { [key: string]: CSSInterpolation } = {
  listContainer: {
    "& > li": {
      paddingLeft: 32,
    },
  },
  formContainer: {
    padding: "0 32px",
    "& > div": {
      paddingTop: 17,
    },
  },
};

export const Controlled = () => {
  const [expandedState, setExpandedState] = useState({
    personalInformation: true,
    billingAddress: false,
    shippingAddress: false,
  });
  const handleToggle = (key: keyof typeof expandedState) => {
    const newValue = { ...expandedState };
    newValue[key] = !newValue[key];
    setExpandedState(newValue);
  };
  const handleAll = (option: boolean) => {
    setExpandedState({
      personalInformation: option,
      billingAddress: option,
      shippingAddress: option,
    });
  };

  const brk: Breakpoint[] = [
    {
      cols: 5,
      minWidth: 680,
      spacing: "sm",
    },
    {
      cols: 3,
      minWidth: 500,
      spacing: "sm",
    },
    {
      cols: 2,
      minWidth: 450,
      spacing: "sm",
    },
    {
      cols: 1,
      minWidth: 100,
      spacing: "sm",
    },
  ];

  return (
    <>
      <HvSimpleGrid spacing="sm" style={{ maxWidth: 1050 }} breakpoints={brk}>
        <HvButton
          variant="secondarySubtle"
          onClick={() => handleToggle("personalInformation")}
        >
          Personal Information
        </HvButton>
        <HvButton
          variant="secondarySubtle"
          onClick={() => handleToggle("billingAddress")}
        >
          Billing Address
        </HvButton>
        <HvButton
          variant="secondarySubtle"
          onClick={() => handleToggle("shippingAddress")}
        >
          Shipping Address
        </HvButton>
        <HvButton variant="secondarySubtle" onClick={() => handleAll(false)}>
          Close all
        </HvButton>
        <HvButton variant="secondarySubtle" onClick={() => handleAll(true)}>
          Expand all
        </HvButton>
      </HvSimpleGrid>
      <HvBox sx={{ maxWidth: 300 }}>
        <HvAccordion
          label="Personal Information"
          onChange={() => handleToggle("personalInformation")}
          expanded={expandedState.personalInformation}
        >
          <div className={css(styles.formContainer)}>
            <HvInput label="Name" placeholder="Insert first name" required />
            <HvInput label="Email" placeholder="Insert your email" required />
            <HvInput label="Phone" placeholder="Insert your phone number" />
            <HvInput label="Extension" placeholder="Insert phone extension" />
            <HvInput label="Country" placeholder="Insert country name" />
            <HvInput label="City/Province" placeholder="Insert province name" />
          </div>
        </HvAccordion>
        <HvAccordion
          label="Billing Address"
          onChange={() => handleToggle("billingAddress")}
          expanded={expandedState.billingAddress}
        >
          <div className={css(styles.formContainer)}>
            <HvInput label="Address 1" placeholder="Insert first name" />
            <HvInput label="Address 2" placeholder="Insert address" />
            <HvInput label="City" placeholder="Insert city name" />
            <HvInput label="State" placeholder="Insert state" />
            <HvInput label="Zip Code" placeholder="Insert code" />
          </div>
        </HvAccordion>
        <HvAccordion
          label="Shipping Address"
          onChange={() => handleToggle("shippingAddress")}
          expanded={expandedState.shippingAddress}
        >
          <div className={css(styles.formContainer)}>
            <HvInput label="Address 1" placeholder="Insert first name" />
            <HvInput label="Address 2" placeholder="Insert address" />
            <HvInput label="City" placeholder="Insert city name" />
            <HvInput label="State" placeholder="Insert state" />
            <HvInput label="Zip Code" placeholder="Insert code" />
          </div>
        </HvAccordion>
      </HvBox>
    </>
  );
};
