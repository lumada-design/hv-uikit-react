import React from "react";
import HvButton from "@hv/uikit-react-core/dist/Button";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Caution from "@hv/uikit-react-icons/dist/Caution";

const myAlert = msg => alert(msg); /* eslint-disable-line no-alert */

const CautionS = <Caution boxStyles={{ width: 32, height: 30 }} />;

export default (
  <>
    <Grid container>
      <Grid item xl={2}>
        icon
      </Grid>
      <Grid item xl={2}>
        <HvButton startIcon={CautionS} />
      </Grid>
      <Grid item xl={2}>
        <HvButton category="secondary">
          <Caution />
          between
          <Caution />
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton category="ghost">
          <Caution />
          <Caution />
          <Caution />
        </HvButton>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xl={2}>
        null / empty
      </Grid>
      <Grid item xl={2}>
        <HvButton onClick={() => myAlert("primary (default)")} />
      </Grid>
      <Grid item xl={2}>
        <HvButton category="secondary" onClick={() => myAlert("secondary")} />
      </Grid>
      <Grid item xl={2}>
        <HvButton category="ghost" onClick={() => myAlert("ghost")} />
      </Grid>
      <Grid item xl={2}>
        <HvButton
          category="ghostSecondary"
          onClick={() => myAlert("ghostSecondary")}
        />
      </Grid>
    </Grid>
  </>
);
