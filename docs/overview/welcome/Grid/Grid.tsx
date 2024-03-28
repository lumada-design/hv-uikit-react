import { HvSimpleGrid, HvTypography } from "@hitachivantara/uikit-react-core";
import {
  Code,
  Components,
  Energy,
  Heart,
  People,
  Tool,
} from "@hitachivantara/uikit-react-icons";

import { GridElement, GridGroup, Separator, Wrapper } from "./styles";

const elements = [
  {
    title: "Ready to go",
    description:
      "Start your project with over 50 high-quality React components out of the box.",
    icon: <Energy />,
  },
  {
    title: "Composable",
    description: "Compose your application UI with reusable building blocks.",
    icon: <Components />,
  },
  {
    title: "Accessible",
    description: "UI Kit follows WAI-ARIA standards for all components.",
    icon: <People />,
  },
  {
    title: "Themeable",
    description:
      "Use Next Design System or customize it to match your design needs.",
    icon: <Tool />,
  },
  {
    title: "DX Experience",
    description: "An intuitive and familiar API to boost your development.",
    icon: <Code />,
  },
  {
    title: "Community",
    description:
      "We welcome all feedback in order to produce the best experience for our users.",
    icon: <Heart />,
  },
];

const Header = () => (
  <Wrapper>
    <HvSimpleGrid
      breakpoints={[
        {
          cols: 3,
          minWidth: 1000,
          spacing: "md",
        },
        {
          cols: 2,
          minWidth: 755,
          spacing: "sm",
        },
      ]}
      spacing="sm"
      style={{ maxWidth: "80%", margin: "auto" }}
    >
      {elements.map((element) => (
        <GridElement key={element.title}>
          <GridGroup>
            {element.icon}
            <HvTypography variant="title3">{element.title}</HvTypography>
          </GridGroup>
          <Separator />
          <HvTypography variant="body">{element.description}</HvTypography>
        </GridElement>
      ))}
    </HvSimpleGrid>
  </Wrapper>
);

export default Header;
