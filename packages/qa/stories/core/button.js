import React from "react";
import { storiesOf } from "@storybook/react";
import QaGrid from "../custom/qaGrid";
import HvButton, { buttonTypes } from "@hv/uikit-react-core/dist/Button";

let samples = new Object();

// sample scenarios
samples["aspect primary choice"] =
  <>
    <HvButton>
      default primary
    </HvButton>
    <HvButton colorType="secondary">
      secondary
    </HvButton>
    <HvButton colorType="link">
      link
    </HvButton>
    <HvButton disabled>
      disabled primary
    </HvButton>
    <HvButton disabled colorType="secondary">
      disabled secondary
    </HvButton>
    <HvButton disabled colorType="link">
      disabled link
    </HvButton>
  </>

samples["aspect hitachi red"] =
  <>
    <HvButton>
      default primary
    </HvButton>
    <HvButton colorType="secondary">
      secondary
    </HvButton>
    <HvButton colorType="link">
      link
    </HvButton>
    <HvButton disabled>
      disabled primary
    </HvButton>
    <HvButton disabled colorType="secondary">
      disabled secondary
    </HvButton>
    <HvButton disabled colorType="link">
      disabled link
    </HvButton>
  </>

samples["functionality"] =
  <>
    <HvButton onClick={()=> {alert("correct");}} >
      enable
    </HvButton>
    <HvButton disabled onClick={()=> {alert("incorrect");}} >
      disabled
    </HvButton>
  </>

samples["properties default"] =
  <HvButton>
    default values
  </HvButton>

samples["properties all"] =
  <HvButton className="all" id="all" type="button" colortype="primary" disabled classes="" onclick={()=> {alert("incorrect");}} >
    all properties
  </HvButton>

samples["properties type"] =
  <>
    <HvButton type="button">
      button
    </HvButton>
    <HvButton type="submit">
      submit
    </HvButton>
    <HvButton type="reset">
      reset
    </HvButton>
  </>

samples["properties children icon"] =
  <HvButton/>

samples["accessibility"] =
<HvButton/>  

samples["responsiveness"] =
<HvButton/>

samples["negative required"] =
<HvButton/>

samples["negative children"] =
<HvButton/>

samples["negative colorType"] =
<HvButton colortype="negative">
  negative colortype
</HvButton>

samples["negative type"] =
  <HvButton type="negative">
    negative type
  </HvButton>


// create CoreButton for each sample
for (let [key, value] of Object.entries(samples)) {
  storiesOf("CoreButton", module).add(key, () => (<QaGrid>{value}</QaGrid>));
}



