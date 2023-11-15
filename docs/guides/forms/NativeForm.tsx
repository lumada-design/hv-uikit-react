import {
  HvInput,
  HvButton,
  HvCheckBox,
  HvTimePicker,
  HvRadioGroup,
  HvRadio,
  HvSwitch,
} from "@hitachivantara/uikit-react-core";

export default () => (
  <form
    style={{ maxWidth: 310 }}
    onSubmit={(event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      alert(JSON.stringify(Object.fromEntries(formData), null, 2));
    }}
  >
    <HvInput required name="textField" label="Text Field" />
    <br />
    <HvTimePicker name="timePicker" label="Time Picker" />
    <br />
    <HvRadioGroup required name="radios" label="Radio">
      <HvRadio value="opt1" label="Option 1" />
      <HvRadio value="opt2" label="Option 2" />
      <HvRadio value="opt3" label="Option 3" />
    </HvRadioGroup>
    <br />
    <HvSwitch name="switch" label="Switch" value="switch" />
    <br />
    <HvCheckBox name="checkbox" label="Checkbox" value="checkbox" />
    <br />
    <br />
    <HvButton type="submit">Submit</HvButton>
  </form>
);
