import React from "react";
import Header from "@hv/uikit-react-core/dist/Header";
import withStyles from "@material-ui/core/styles/withStyles";
import Lumada from "../../components/header/resources/hitachi";
import AssetInventory from "@hv/uikit-react-core/dist/AssetInventory";
import Typography from "@hv/uikit-react-core/dist/Typography";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import ListView from "@hv/uikit-react-core/dist/AssetInventory/ListView";
import Cards from "@hv/uikit-react-icons/dist/Generic/Cards";
import List from "@hv/uikit-react-icons/dist/Generic/List";
import styles from "./styles";
import getData from "./data/data";
import cardRenderer from "./views/card/Card";
import rowRenderer from "./views/list/List";
import configuration from "./configuration/configuration";

const LumadaLogo = () => <Lumada style={{ width: "72px" }} />;

const myActions = [{ id: "dismiss", label: "Dismiss", disabled: false }];

const Home = ({ classes }) => {
  return (
    <div>
      <Header id="header" companyLogo={<LumadaLogo />} label="App Name" />
      <div className={classes.root}>
        <Typography variant="xxlTitle" className={classes.title}>
          Assets
        </Typography>

        <AssetInventory
          values={getData()}
          configuration={configuration}
          // onSelection={event => alert(event.target.value)}
          // isSelectable
          actions={myActions}
          maxVisibleActions={3}
          actionsCallback={(id, action) =>
            alert(
              "You have pressed card " + id + " with action " + action.label
            )
          }
        >
          <CardView id="card" icon={<Cards />} renderer={cardRenderer} />
          <ListView id="list" icon={<List />} renderer={rowRenderer} />
        </AssetInventory>
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Home);
