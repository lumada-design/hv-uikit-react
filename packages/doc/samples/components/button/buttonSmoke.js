import React from "react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import HvButton from "@hv/uikit-react-core/dist/Button";
import Caution from "@hv/uikit-react-icons/dist/Caution";

const myAlert = msg => alert(msg); /* eslint-disable-line no-alert */

const CautionS = <Caution boxStyles={{ width: 32, height: 30 }} />;

export default (
  <>
    <Grid container>
      <Grid item xl={2}>
        Enable
      </Grid>
      <Grid item xl={2}>
        <HvButton id="default" startIcon={CautionS} onClick={() => myAlert("default")}>
          default
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="secondary"
          category="secondary"
          startIcon={CautionS}
          onClick={() => myAlert("secondary")}
        >
          secondary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton id="ghost" category="ghost" startIcon={CautionS} onClick={() => myAlert("ghost")}>
          ghost
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="ghostSecondary"
          category="ghostSecondary"
          startIcon={CautionS}
          onClick={() => myAlert("ghostSecondary")}
        >
          ghostSecondary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="semantic"
          category="semantic"
          startIcon={CautionS}
          onClick={() => myAlert("semantic")}
        >
          semantic
        </HvButton>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xl={2}>
        Disable
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledPrimary"
          disabled
          startIcon={CautionS}
          onClick={() => myAlert("disabled primary")}
        >
          disabled primary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledSecondary"
          disabled
          category="secondary"
          startIcon={CautionS}
          onClick={() => myAlert("disabled secondary")}
        >
          disabled secondary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledGhost"
          disabled
          category="ghost"
          startIcon={CautionS}
          onClick={() => myAlert("disabled ghost")}
        >
          disabled ghost
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledGhostSecondary"
          disabled
          category="ghostSecondary"
          startIcon={CautionS}
          onClick={() => myAlert("disabled ghostSecondary")}
        >
          disabled ghostSecondary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledSemantic"
          disabled
          category="semantic"
          startIcon={CautionS}
          onClick={() => myAlert("semantic")}
        >
          disabled semantic
        </HvButton>
      </Grid>
    </Grid>

    <Grid container>
      <Grid item xl={2}>
        all properties
      </Grid>
      <Grid item xl>
        <HvButton
          className="all"
          id="allProperties"
          disabled
          classes=""
          startIcon={CautionS}
          onClick={() => myAlert("incorrect")}
        >
          all properties
        </HvButton>
      </Grid>
    </Grid>
  </>
);
