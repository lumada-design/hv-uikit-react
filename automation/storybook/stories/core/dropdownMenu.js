import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import DropdownMenu1 from "../../../../packages/doc/samples/components/dropdownMenu/dropdownMenu1";
import DropdownMenu2 from "../../../../packages/doc/samples/components/dropdownMenu/dropdownMenu2";
import DropdownMenu3 from "../../../../packages/doc/samples/components/dropdownMenu/dropdownMenu3";
import DropdownMenu4 from "../../../../packages/doc/samples/components/dropdownMenu/dropdownMenu4";
import DropdownMenuDisabledItems from "../../../../packages/doc/samples/components/dropdownMenu/dropdownMenuDisabledItems";
import DropdownMenuDisabled from "../../../../packages/doc/samples/components/dropdownMenu/dropdownMenuDisabled";
import DropdownMenuDisablePortal from "../../../../packages/doc/samples/components/dropdownMenu/dropdownMenuDisablePortal";
import DropdownMenukeepOpenedFalse from "../../../../packages/doc/samples/components/dropdownMenu/dropdownMenukeepOpenedFalse";
import DropdownMenuTabs from "../../../../packages/doc/samples/components/dropdownMenu/dropdownMenutabs";

// sample scenarios
const samples = {};
samples.DropdownMenu1 = DropdownMenu1;
samples.DropdownMenu2 = DropdownMenu2;
samples.DropdownMenu3 = DropdownMenu3;
samples.DropdownMenu4 = DropdownMenu4;
samples.disabledItems = DropdownMenuDisabledItems;
samples.DropdownMenuDisabled = DropdownMenuDisabled;
samples.disablePortal = DropdownMenuDisablePortal;
samples.keepOpenedFalse = DropdownMenukeepOpenedFalse;
samples.dropdownMenuTabs = DropdownMenuTabs;

// create a sample for each element
Object.keys(samples).forEach(key =>
  storiesOf("CoreDropdownMenu", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);
