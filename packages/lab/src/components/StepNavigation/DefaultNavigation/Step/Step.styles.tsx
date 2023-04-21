import styled from "@emotion/styled";
import { HvAvatar, HvButton } from "@hitachivantara/uikit-react-core";

export const StyledRoot = styled("div")(
  ({ $notCurrent }: { $notCurrent: boolean }) => ({
    ...($notCurrent && {
      margin: "-8px",
    }),
  })
);

export const StyledButton = styled(HvButton)({
  "&:hover": {
    backgroundColor: "transparent",
  },
  "&$ghostDisabled": {
    cursor: "default",
  },
  "&$ghostDisabled&:hover": {
    cursor: "default",
  },
});

export const StyledAvatar = styled(HvAvatar)(
  ({ $size }: { $size: string }) => ({
    ...($size === "xs" && {
      fontSize: "0.625rem",
    }),
    ...($size === "sm" && {
      fontSize: "1rem",
    }),
    ...($size === "md" && {
      fontSize: "1.5rem",
    }),
    ...($size === "lg" && {
      fontSize: "2rem",
    }),
    ...($size === "xl" && {
      fontSize: "2.5rem",
    }),
  })
);
