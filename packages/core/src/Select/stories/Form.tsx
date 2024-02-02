import { HvButton, HvOption, HvSelect } from "@hitachivantara/uikit-react-core";

const options = [
  { value: "ar", label: "Argentina", flag: "🇦🇷" },
  { value: "bg", label: "Belgium", flag: "🇧🇪" },
  { value: "pt", label: "Portugal", flag: "🇵🇹" },
  { value: "pl", label: "Poland", flag: "🇵🇱" },
  { value: "sp", label: "Spain", flag: "🇪🇸" },
  { value: "us", label: "United States", flag: "🇺🇸" },
];

export default () => (
  <form
    onSubmit={(evt) => {
      evt.preventDefault();
      const formData = new FormData(evt.currentTarget);
      alert(JSON.stringify(Object.fromEntries(formData)));
    }}
  >
    <HvSelect
      multiple
      required
      name="countries"
      label="Country"
      description="Select your favorite countries"
      placeholder="Select countries"
      getSerializedValue={(values) => values.map((v) => v.value).join(",")}
    >
      {options.map(({ value, label, flag }) => (
        <HvOption key={value} value={value} label={label}>
          {`${flag} ${label}`}
        </HvOption>
      ))}
    </HvSelect>
    <br />
    <HvButton type="submit" variant="secondarySubtle">
      Submit
    </HvButton>
  </form>
);
