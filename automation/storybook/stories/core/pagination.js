import { storiesOf } from "@storybook/react";
import Pagination1 from "../../../../packages/doc/samples/components/pagination/pagination1";
import Pagination2 from "../../../../packages/doc/samples/components/pagination/pagination2";
import Pagination3 from "../../../../packages/doc/samples/components/pagination/pagination3";

// sample scenarios
const samples = {};

samples.Pagination1 = Pagination1;
samples.Pagination2 = Pagination2;
samples.Pagination3 = Pagination3;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CorePagination", module).add(key, () => samples[key])
);
