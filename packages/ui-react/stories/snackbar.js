import React from "react";
import {storiesOf} from "@storybook/react";

import {FastForward16} from "@hv-ui/svg-icons/core"
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {HvShowCase, HvSnackbar} from "../src";
import HvSnackbarContentWrapper from "../src/Snackbar/SnackbarContentWrapper";
import styles from "../src/Snackbar/SnackbarContentWrapper/styles";


class SimpleSnackbar extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({open: true});
  };

  handleClose = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
  };

  render() {
    const {message, variant, showIcon, anchorOrigin, action, customIcon} = this.props;
    const {open} = this.state;
    return (
      <div>

        <Button onClick={this.handleClick} variant="contained" color="primary" style={{width: "150px"}}>{message}</Button>
        <HvSnackbar
          open={open}
          message={`This is ${message}`}
          onClose={this.handleClose}
          anchorOrigin={anchorOrigin}
          variant={variant}
          customIcon={customIcon}
          showIcon={showIcon}
          action={action}
        />
      </div>
    );
  }
}

const SnackbarContentWrapper = (withStyles(styles)(HvSnackbarContentWrapper));

const actionComponent = (
  <a
    href="https://i.imgflip.com/yrj3h.jpg"
    style={{
          "color": "#146BD2",
          "fontSize": "14px",
          "letterSpacing": "0.02em",
          "lineHeight": "20px",
          "fontWeight": "600",
          "text-decoration": "none"
        }}
  >
      Event
  </a>
);


storiesOf("SnackBar", module)
    .add("SnackBar", () =>
        (
          <>
            <HvShowCase title="Snackbar with icons">
              <div>
                <SimpleSnackbar message="default" variant="default" showIcon />
              </div>
              <p />
              <div>
                <SimpleSnackbar message="Success" variant="success" showIcon />
              </div>
              <p />
              <div>
                <SimpleSnackbar message="Info" variant="info" showIcon />
              </div>
              <p />
              <div>
                <SimpleSnackbar message="Warning" variant="warning" showIcon />
              </div>
              <p />
              <div>
                <SimpleSnackbar message="Error" variant="error" showIcon />
              </div>
            </HvShowCase>


            <HvShowCase title="Snackbar with custom icons">
              <div>
                <SimpleSnackbar message="default" variant="default" customIcon={<FastForward16 />} />
              </div>
              <p />
              <div>
                <SimpleSnackbar message="Success" variant="success" customIcon={<FastForward16 />} />
              </div>
              <p />
              <div>
                <SimpleSnackbar message="Info" variant="info" customIcon={<FastForward16 />} />
              </div>
              <p />
              <div>
                <SimpleSnackbar message="Warning" variant="warning" customIcon={<FastForward16 />} />
              </div>
              <p />
              <div>
                <SimpleSnackbar message="Error" variant="error" customIcon={<FastForward16 />} />
              </div>
            </HvShowCase>


            <HvShowCase title="Snackbar with icons and action">
              <div>
                <SimpleSnackbar
                  message="default"
                  variant="default"
                  showIcon
                  action={(
                          actionComponent)}
                />
              </div>
              <p />
              <div>
                <SimpleSnackbar
                  message="Success"
                  variant="success"
                  showIcon
                  action={(
                          actionComponent)}
                />
              </div>
              <p />
              <div>
                <SimpleSnackbar
                  message="Info"
                  variant="info"
                  showIcon
                  action={(
                          actionComponent)}
                />
              </div>
              <p />
              <div>
                <SimpleSnackbar
                  message="Warning"
                  variant="warning"
                  showIcon
                  action={(
                          actionComponent)}
                />
              </div>
              <p />
              <div>
                <SimpleSnackbar
                  message="Error"
                  variant="error"
                  showIcon
                  action={(
                          actionComponent)}
                />
              </div>
            </HvShowCase>


            <HvShowCase title="Snackbar without icons">
              <div>
                <SimpleSnackbar message="default" variant="default" />
              </div>
              <p />
              <div>
                <SimpleSnackbar message="Success" variant="success" />
              </div>
              <p />
              <div>
                <SimpleSnackbar message="Info" variant="info" />
              </div>
              <p />
              <div>
                <SimpleSnackbar message="Warning" variant="warning" />
              </div>
              <p />
              <div>
                <SimpleSnackbar message="Error" variant="error" />
              </div>
            </HvShowCase>


            <HvShowCase title="Snackbar without icons and with action">
              <div>
                <SimpleSnackbar
                  message="default"
                  variant="default"
                  action={(
                          actionComponent)}
                />
              </div>
              <p />
              <div>
                <SimpleSnackbar
                  message="default"
                  variant="default"
                  action={(
                          actionComponent)}
                />
              </div>
              <p />
              <div>
                <SimpleSnackbar
                  message="default"
                  variant="default"
                  action={(
                          actionComponent)}
                />
              </div>
              <p />
              <div>
                <SimpleSnackbar
                  message="default"
                  variant="default"
                  action={(
                          actionComponent)}
                />
              </div>
              <p />
              <div>
                <SimpleSnackbar
                  message="default"
                  variant="default"
                  action={(
                          actionComponent)}
                />
              </div>
            </HvShowCase>
          </>


        )).add("SnackBarContainer", () =>
    (
      <>
        <HvShowCase title="Snackbar with icons">
          <div>
            <SnackbarContentWrapper message="Default" variant="default" showIcon />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo" variant="default" showIcon />
          </div>
          <p />

          <div>
            <SnackbarContentWrapper message="Success" variant="success" showIcon />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="Info" variant="info" showIcon />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="Warning" variant="warning" showIcon />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="Error" variant="error" showIcon />
          </div>
        </HvShowCase>


        <HvShowCase title="Snackbar with custom icons">
          <div>
            <SnackbarContentWrapper message="default" variant="default" customIcon={<FastForward16 />} />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper
              message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
              variant="default"
              customIcon={
                <FastForward16 />}
            />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="Success" variant="success" customIcon={<FastForward16 />} />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="Info" variant="info" customIcon={<FastForward16 />} />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="Warning" variant="warning" customIcon={<FastForward16 />} />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="Error" variant="error" customIcon={<FastForward16 />} />
          </div>
        </HvShowCase>


        <HvShowCase title="Snackbar with icons and action">
          <div>
            <SnackbarContentWrapper
              message="default"
              variant="default"
              showIcon
              action={(
                      actionComponent)}
            />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper
              message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
              variant="default"
              showIcon
              action={(
                      actionComponent)}
            />
          </div>
          <p />
          <p />
          <div>
            <SnackbarContentWrapper
              message="Success"
              variant="success"
              showIcon
              action={(
                      actionComponent)}
            />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper
              message="Info"
              variant="info"
              showIcon
              action={(
                      actionComponent)}
            />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper
              message="Warning"
              variant="warning"
              showIcon
              action={(
                      actionComponent)}
            />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper
              message="Error"
              variant="error"
              showIcon
              action={(
                      actionComponent)}
            />
          </div>
        </HvShowCase>


        <HvShowCase title="Snackbar without icons">
          <div>
            <SnackbarContentWrapper message="default" variant="default" />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo" variant="default" />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="Success" variant="success" />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="Info" variant="info" />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="Warning" variant="warning" />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper message="Error" variant="error" />
          </div>
        </HvShowCase>


        <HvShowCase title="Snackbar without icons and with action">
          <div>
            <SnackbarContentWrapper
              message="default"
              variant="default"
              action={(actionComponent)}
            />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper
              message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
              variant="default"
              action={(actionComponent)}
            />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper
              message="success"
              variant="success"
              action={(actionComponent)}
            />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper
              message="info"
              variant="info"
              action={(actionComponent)}
            />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper
              message="warning"
              variant="warning"
              action={(actionComponent)}
            />
          </div>
          <p />
          <div>
            <SnackbarContentWrapper
              message="error"
              variant="error"
              action={(actionComponent)}
            />
          </div>
        </HvShowCase>
      </>
    ))


;