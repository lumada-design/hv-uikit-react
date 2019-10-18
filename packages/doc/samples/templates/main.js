import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import withWidth from "@material-ui/core/withWidth";
import Card, {
  HvCardContent,
  HvCardFooter,
  HvCardMedia
} from "@hv/uikit-react-core/dist/Card";
import Typography from "@hv/uikit-react-core/dist/Typography";
import Grid from "@hv/uikit-react-core/dist/Grid";
import { linkTo } from "@storybook/addon-links";

const styles = () => ({
  title: {
    paddingBottom: "10px"
  },
  description: {
    paddingBottom: "30px"
  },
  text: {
    paddingBottom: "5px"
  },
  card: {
    maxWidth: "640px"
  }
});

const mediaStyle = theme => ({
  mediaContainer: {
    width: "100%",
    paddingBottom: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    cursor: "pointer"
  }
});

const BREAKPOINT_HEIGHT = {
  xs: 305,
  sm: 305,
  md: 305,
  lg: 305,
  xl: 430
};

const CardMedia = withStyles(mediaStyle, { withTheme: true })(HvCardMedia);

const SingleContent = ({ classes, labels }) => (
  <div>
    <Typography variant="mTitle" className={classes.title}>
      {labels.title}
    </Typography>
    <Typography variant="normalText" className={classes.text}>
      {labels.text}
    </Typography>
  </div>
);

const link = linkT => linkTo(linkT[0], linkT[1]);

const Cards = ({ classes, containers, width }) =>
  containers.map((container, idx) => (
    <Grid item xs={4} sm={4} md={6} lg={4} xl={4}>
      <Card>
        <CardMedia
          mediaPath={container.img}
          mediaHeight={BREAKPOINT_HEIGHT[width]}
          onClick={link(container.associatedStory)}
        />
        <HvCardContent
          innerCardContent={
            <SingleContent classes={classes} labels={container.labels} />
          }
          onClick={link(container.associatedStory)}
          style={{ cursor: "pointer" }}
        />
        <HvCardFooter
          actions={[
            {
              id: "card" + idx,
              label: "Source Code",
              sourceCode: container.sourceCodeUrl
            }
          ]}
          actionsCallback={(id, a) => window.open(a.sourceCode, "_blank")}
        />
      </Card>
    </Grid>
  ));

const Main = ({ classes, containers, description, width }) => (
  <div>
    <Typography variant="sTitle" className={classes.description}>
      {description}
    </Typography>
    <Grid container>
      <Cards classes={classes} containers={containers} width={width} />
    </Grid>
  </div>
);
export default withWidth()(withStyles(styles, { withTheme: true })(Main));
