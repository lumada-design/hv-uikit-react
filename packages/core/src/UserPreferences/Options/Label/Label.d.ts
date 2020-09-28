import { StandardProps } from "@material-ui/core";
import { HvTypographyProps } from "../../../Typography";

export type HvLabelClassKey = "root";

export type HvLabelProps = StandardProps<HvTypographyProps, HvLabelClassKey>

export default function HvUserPreferencesGroup(props: HvLabelProps): JSX.Element | null;
