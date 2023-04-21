import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvList, HvListProps } from "@core/components";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledRootList = styled("div")({
  width: "100%",
  backgroundColor: theme.dropdown.listBackgroundColor,
  border: theme.dropdown.listBorder,
  borderRadius: theme.dropdown.listBorderRadius,
});

export const StyledListContainer = styled("div")({
  padding: theme.dropdown.listContainerPadding,
});

export const StyledSearchContainer = styled("div")({
  marginBottom: theme.dropdown.searchContainerMargin,
});

export const StyledList = styled(
  (props: HvListProps) => <HvList {...props} />,
  transientOptions
)(
  ({
    $dropdownHeight,
    $virtualized,
    $height,
    $width,
    $maxHeight,
  }: {
    $dropdownHeight?: number;
    $virtualized?: boolean;
    $height?: number;
    $width?: number;
    $maxHeight?: number;
  }) => ({
    maxWidth: $width,
    maxHeight:
      $maxHeight ??
      `calc(${$height}px - 32px - ${theme.space.xs} - ${theme.space.sm})`,
    overflow: "auto",
    padding: 5,

    ...($dropdownHeight && { height: $dropdownHeight }),

    ...($virtualized && {
      maxWidth: "inherit",
      maxHeight: "inherit",
      overflow: "inherit",
      padding: 0,
    }),
  })
);
