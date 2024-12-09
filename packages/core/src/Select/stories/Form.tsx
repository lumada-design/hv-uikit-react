import { HvButton, HvSelect } from "@hitachivantara/uikit-react-core";

const options = [
  { value: "ar", label: "Argentina" },
  { value: "bg", label: "Belgium" },
  { value: "pt", label: "Portugal" },
  { value: "pl", label: "Poland" },
  { value: "sp", label: "Spain" },
  { value: "us", label: "United States" },
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
      options={options}
    />
    <br />
    <HvButton type="submit" variant="secondarySubtle">
      Submit
    </HvButton>
  </form>
);
