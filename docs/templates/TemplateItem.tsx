import LinkTo from "@storybook/addon-links/react";
import {
  HvActionBar,
  HvButton,
  HvCard,
  HvCardHeader,
  HvCardMedia,
} from "@hitachivantara/uikit-react-core";

import asset_inventory from "./assets/asset-inventory.png";
import dashboard from "./assets/dashboard.png";
import details_view from "./assets/details-view.png";
import form from "./assets/form.png";
import list_view from "./assets/list-view.png";

const getSourceUrl = (id: string) => {
  const key = id.replace(" ", "");
  return `https://github.com/lumada-design/hv-uikit-react/tree/master/templates/${key}`;
};

const TemplateItem = ({ storyId, story = "Main", kind, image }) => {
  return (
    <HvCard
      bgcolor="atmo1"
      style={{
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <HvCardHeader title={storyId} />
      <HvCardMedia
        component="img"
        image={image}
        height={220}
        style={{ padding: 10 }}
      />
      <HvActionBar>
        <HvButton
          variant="secondarySubtle"
          component={LinkTo}
          kind={kind}
          story={story}
        >
          View Sample
        </HvButton>
        <div style={{ flex: 1 }} />
        <HvButton
          variant="secondarySubtle"
          component="a"
          href={getSourceUrl(storyId)}
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
  { id: "Asset Inventory", img: asset_inventory },
  { id: "Dashboard", img: dashboard },
  { id: "Details View", img: details_view },
  { id: "List View", img: list_view },
  { id: "Form", img: form },
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
        {templates.map(({ id, img }) => (
          <TemplateItem
            key={id}
            storyId={id}
            kind={`Templates/${id}`}
            image={img}
          />
        ))}
      </div>
    </div>
  );
};
