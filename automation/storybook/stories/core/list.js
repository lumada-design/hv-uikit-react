import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import MultiSelectionItemDisabled from "../../../../packages/doc/samples/components/list/multiSelectionWithSelectors";
import MultiSelectionAll from "../../../../packages/doc/samples/components/list/multiSelectionWithSelectorsAndSelectAll";
import SimpleListNotSelectableWithDisabled from "../../../../packages/doc/samples/components/list/simpleListNotSelectableWithDisabled";
import ListNotSelectable from "../../../../packages/doc/samples/components/list/simpleListNotSelectable";
import SingleSelection from "../../../../packages/doc/samples/components/list/singleSelectionWithLeftIcons";
import SingleSelectionNotSelected from "../../../../packages/doc/samples/components/list/singleSelectionNotSelected";
import SingleSelectionFocusableSelection from "../../../../packages/doc/samples/components/list/singleSelectionFocusableSelection";
import ListRadioButtonSelector from "../../../../packages/doc/samples/components/list/singleSelectionWithSelectors";

// sample scenarios
const samples = {};

samples.MultiSelection_Item_Disabled = MultiSelectionItemDisabled;
samples.MultiSelection_All = MultiSelectionAll;
samples.List_NotSelectable = ListNotSelectable;
samples.Single_Selection = SingleSelection;
samples.List_RadioButton_Selector = ListRadioButtonSelector;
samples.Single_Selection_Not_Selected = SingleSelectionNotSelected;
samples.Single_Selection_Focusable_Selection = SingleSelectionFocusableSelection;
samples.Simple_List_Not_Selectable_With_Disabled = SimpleListNotSelectableWithDisabled;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreList", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);
