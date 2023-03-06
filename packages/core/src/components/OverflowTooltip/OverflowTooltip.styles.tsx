import styled from "@emotion/styled";
import { transientOptions } from "utils/transientOptions";

export const StyledDataContainer = styled(
  "div",
  transientOptions
)(({ $isParag }: { $isParag?: boolean }) => ({
  ...($isParag && {
    overflow: "hidden",
    display: "-webkit-box",
    // "-webkit-line-clamp": "2",
    // "-webkit-box-orient": "vertical",
  }),
  ...(!$isParag && {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
}));
