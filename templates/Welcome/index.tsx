import {
  HvGrid,
  HvInput,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Heart, Palette } from "@hitachivantara/uikit-react-icons";

import styles from "./styles";

const Welcome = () => {
  return (
    <div className={styles.root}>
      <HvGrid container>
        <HvGrid item xs={6}>
          <HvGrid container>
            <HvGrid item xs={8}>
              <HvTypography variant="title1">
                Welcome to the NEXT UI Kit
              </HvTypography>
            </HvGrid>
            <HvGrid item xs={8}>
              <HvTypography variant="label">
                The NEXT UI Kit is a composable and accessible component library
                that gives you the foundation to build your NEXT application
                faster and consistently.
              </HvTypography>
            </HvGrid>
            <HvGrid item xs={8}>
              <HvInput type="search" placeholder="What are you looking for?" />
            </HvGrid>
            <HvGrid item xs={6}>
              <div className={styles.glossaryContainer}>
                <Palette iconSize="M" role="none" />
                <HvTypography variant="title4" component="p">
                  Themeable
                </HvTypography>
                <HvTypography>
                  Use Next Design System or customize it to match your design
                  needs.
                </HvTypography>
              </div>
            </HvGrid>
            <HvGrid item xs={6}>
              <div className={styles.glossaryContainer}>
                <Heart iconSize="M" role="none" />
                <HvTypography variant="title4" component="p">
                  Community
                </HvTypography>
                <HvTypography>
                  We welcome all feedback in order to produce the best
                  experience for our users.
                </HvTypography>
              </div>
            </HvGrid>
          </HvGrid>
        </HvGrid>
        <HvGrid item xs={6} display="flex">
          <div className={styles.imageContainer}>
            <img
              alt="Monitor showing a dashboard built with UI Kit components"
              src="https://i.imgur.com/BPIEkD7.png"
            />
          </div>
        </HvGrid>
        <HvGrid item xs={12}>
          <HvTypography
            link
            component="a"
            href="https://lumada-design.github.io/uikit/master/"
          >
            More details
          </HvTypography>
        </HvGrid>
      </HvGrid>
    </div>
  );
};

export default Welcome;
