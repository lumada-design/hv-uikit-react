/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */

import React from "react";

/**
 * The linkTo is a dependency used to navigate across Storybook stories. It shouldn't be
 * use in a real app.
 */
import { linkTo } from "@storybook/addon-links";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  HvTypography,
  HvGrid,
  HvCard,
  HvCardContent,
  HvCardFooter,
  HvCardMedia,
} from "@hitachivantara/uikit-react-core";

/*
This file is used to present a index of the existing templates in the Storybook. It doesn't represent a template 
by itself or shouldn't be used by any template. 
 */

const styles = {
  title: {
    paddingBottom: "10px",
  },
  description: {
    paddingBottom: "30px",
  },
  text: {
    paddingBottom: "5px",
  },
  card: {
    maxWidth: "640px",
  },
  sema0: {
    backgroundColor: "transparent",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

const mediaStyle = (theme) => ({
  root: {
    paddingBottom: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    cursor: "pointer",
  },
});

const CardMedia = withStyles(mediaStyle)(HvCardMedia);

const SingleContent = ({ classes, labels }) => (
  <>
    <HvTypography variant="mTitle" className={classes.title}>
      {labels.title}
    </HvTypography>
    <HvTypography variant="normalText" className={classes.text}>
      {labels.text}
    </HvTypography>
  </>
);

const link = (link) => linkTo("Templates", link);

const Cards = ({ classes, containers }) =>
  containers.map((container, idx) => (
    <HvGrid item xs={4} sm={4} md={6} lg={4} xl={4} key={container.id}>
      <HvCard classes={{ sema0: classes.sema0 }}>
        <CardMedia onClick={link(container.associatedStory)}>
          <img src={container.img} alt="img" className={classes.img} />
        </CardMedia>
        <HvCardContent onClick={link(container.associatedStory)} style={{ cursor: "pointer" }}>
          <SingleContent classes={classes} labels={container.labels} />
        </HvCardContent>
        <HvCardFooter
          actions={[
            {
              id: `card${idx}`,
              label: "Source Code",
              sourceCode: container.sourceCodeUrl,
            },
          ]}
          actionsCallback={(e, id, a) => window.open(a.sourceCode, "_blank")}
        />
      </HvCard>
    </HvGrid>
  ));

const Templates = ({ classes, containers }) => (
  <HvGrid container>
    <Cards classes={classes} containers={containers} />
  </HvGrid>
);
export default withStyles(styles)(Templates);
