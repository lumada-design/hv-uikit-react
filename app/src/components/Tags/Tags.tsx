import { HvBox, HvTag } from "@hitachivantara/uikit-react-core";

const CustomComponent = ({
  pads,
  children,
  ...others
}: {
  pads: string;
  children: React.ReactNode;
}) => (
  <div {...others} style={{ display: "flex", alignItems: "center" }}>
    {pads}&nbsp;{children}&nbsp;{pads}
  </div>
);

export const Tags = () => {
  return (
    <HvBox sx={{ display: "flex", gap: 20 }}>
      <HvTag>Simple Tag</HvTag>
      <HvTag as="a" href="http://www.google.com/" target="_blank">
        Link Tag
      </HvTag>
      <HvTag as={CustomComponent} pads="***">
        Custom Tag with added pads
      </HvTag>
    </HvBox>
  );
};

if (process.env.NODE_ENV !== "production") {
  Tags.displayName = "Tags";
}
