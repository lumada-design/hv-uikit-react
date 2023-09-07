import LinkTo from "@storybook/addon-links/react";
import {
  HvCard,
  HvCardHeader,
  HvCardMedia,
  HvActionBar,
  HvButton,
} from "@hitachivantara/uikit-react-core";

import asset_inventory from "./assets/asset-inventory.png";
import details_view from "./assets/details-view.png";
import form from "./assets/form.png";
import list_view from "./assets/list-view.png";

const TemplateItem = ({ kind, story, image, title, code, disabled }) => {
  return (
    <HvCard
      bgcolor="atmo1"
      style={{
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <HvCardHeader title={title} />
      <HvCardMedia component="img" image={image} style={{ padding: 10 }} />
      <HvActionBar>
        <HvButton
          variant="secondarySubtle"
          disabled={disabled}
          component={LinkTo}
          kind={kind}
          story={story}
        >
          View Sample
        </HvButton>
        <div style={{ flex: 1 }} />
        <HvButton
          variant="secondarySubtle"
          disabled={disabled}
          component="a"
          href={code}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Code
        </HvButton>
      </HvActionBar>
    </HvCard>
  );
};

const templates = [
  { id: "AssetInventory", title: "Asset Inventory", img: asset_inventory },
  { id: "DetailsView", title: "Details View", img: details_view },
  { id: "ListView", title: "List View", img: list_view },
  { id: "Form", title: "Form", img: form },
];

export const TemplateItems = () => {
  return (
    <div style={{ maxWidth: 1300, margin: "auto", marginTop: 40 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 400px))",
          gridGap: 40,
          justifyContent: "center",
        }}
      >
        {templates.map(({ id, title, img }) => (
          <TemplateItem
            key={id}
            kind={`Templates/${title}`}
            story="Main"
            image={img}
            disabled={false}
            title={title}
            code={`https://github.com/lumada-design/hv-uikit-react/tree/master/templates/${id}`}
          />
        ))}
      </div>
    </div>
  );
};
