import { DialogContentProps, StandardProps } from "@material-ui/core";

export type HvModalContentClassKey = "root" | "textContent";

export type HvModalContentProps = StandardProps<DialogContentProps, HvModalContentClassKey>;

export default function HvModalContent(props: HvModalContentProps): JSX.Element | null;
