import React, { useState } from "react";
import HvButton from "@hv/uikit-react-core/dist/Button";
import HvDatePicker from "@hv/uikit-react-core/dist/DatePicker";
import moment from "moment";

const Example = () => {
  const [date, setDate] = useState("2020-01-01");

  const addDay = () =>
    setDate(
      moment(date)
        .add(1, "day")
        .format("YYYY-MM-DD")
    );

  return (
    <>
      <HvButton id="AddButton" onClick={addDay}>
        Add a day
      </HvButton>
      <p />
      <HvDatePicker
        id="DatePicker"
        value={date}
        onChange={date => setDate(date)}
      />
    </>
  );
};

export default <Example />;
