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
import welcome from "./assets/welcome.png";

const getSourceUrl = (id: string) => {
  const key = id.replace(" ", "");
  return `https://github.com/lumada-design/hv-uikit-react/tree/master/templates/${key}`;
};

const TemplateItem = ({ storyId, image, href }) => {
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
        <HvButton variant="secondarySubtle" component="a" href={href}>
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
  {
    id: "Asset Inventory",
    img: asset_inventory,
    href: "./?path=/docs/templates-asset-inventory--docs",
  },
  {
    id: "Dashboard",
    img: dashboard,
    href: "./?path=/docs/templates-dashboard--docs",
  },
  {
    id: "Details View",
    img: details_view,
    href: "./?path=/docs/templates-details-view--docs",
  },
  {
    id: "List View",
    img: list_view,
    href: "./?path=/docs/templates-list-view--docs",
  },
  { id: "Form", img: form, href: "./?path=/docs/templates-form--docs" },
  {
    id: "Welcome",
    img: welcome,
    href: "./?path=/docs/templates-welcome--docs",
  },
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
        {templates.map(({ id, img, href }) => (
          <TemplateItem key={id} storyId={id} href={href} image={img} />
        ))}
      </div>
    </div>
  );
};
