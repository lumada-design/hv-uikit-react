import React from "react";

const withDeprecate = (InnerComponent, msg = "") => {
  class DeprecatedComponent extends React.Component {
    componentWillMount() {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.warn(`${InnerComponent.name} is deprecated`, msg);
      }
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  DeprecatedComponent.propTypes = InnerComponent.propTypes;

  return DeprecatedComponent;
};

export default withDeprecate;
