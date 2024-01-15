import React, { useState } from "react";
import PropTypes from "prop-types";
import { HvButton, HvTypography, HvLabel, HvBaseInput } from "@hitachivantara/uikit-react-core";
import Message from "../Message";

const RecoverForm = ({ classes, onSubmit, onCancel, status }) => {
  const [email, setEmail] = useState("");
  const isPending = status === "pending";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div className={classes.root}>
      <HvTypography variant="mTitle" classes={{ root: classes.title }}>
        Recover Credentials
      </HvTypography>

      {(isError || isSuccess) && (
        <Message
          message={{
            error: "Pelase enter a valid email!",
            success: "Email sent!"
          }}
          status={status}
        />
      )}

      <HvTypography variant="normalText" classes={{ root: classes.input }}>
        You will receive an email with instructions to recover your credentials
      </HvTypography>

      <HvLabel id="email-label" label="Email" classes={{ root: classes.input }}>
        <HvBaseInput
          id="email-input"
          placeholder="Enter email"
          value={email}
          inputProps={{ autoFocus: true }}
          onChange={evt => setEmail(evt.target.value)}
        />
      </HvLabel>

      <HvButton type="submit" category="ghost" className={classes.cancel} onClick={onCancel}>
        Cancel
      </HvButton>

      <HvButton
        type="submit"
        category="primary"
        className={classes.recover}
        onClick={() => onSubmit(email)}
        disabled={isPending}
      >
        {isPending ? "Recovering" : "Recover"}
      </HvButton>
    </div>
  );
};

RecoverForm.propTypes = {
  /**
   * The classes object to be applied into the root object.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to root element.
     */
    root: PropTypes.string,
    /**
     * Styles applied to title element.
     */
    title: PropTypes.string,
    /**
     * Styles applied to subtitle element.
     */
    subtitle: PropTypes.string,
    /**
     * Styles applied to input element.
     */
    input: PropTypes.string,
    /**
     * Styles applied to cancel element.
     */
    cancel: PropTypes.string,
    /**
     * Styles applied to recover element.
     */
    recover: PropTypes.string
  }).isRequired,
  /**
   * Callback to trigger on recover action.
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Callback to trigger on cancel recover action.
   */
  onCancel: PropTypes.func.isRequired,
  /**
   * Recover status.
   */
  status: PropTypes.string.isRequired
};

export default RecoverForm;
