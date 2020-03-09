import React from "react";
import classNames from "classnames";
import HvLink from "@hv/uikit-react-core/dist/Link";
import withConfig from "@hv/uikit-react-core/dist/config/withConfig";
import Button from "@hv/uikit-react-core/dist/Button";

const Main = ({ classes, children, context, config }) => {
  const { kind, story, parameters } = context;
  const { title, description, designSystemLink } = parameters;

  if (parameters.options.noAddon) return children;

  return (
    <>
      <div className={classNames([classes.header])}>
        <div>
          {kind} - <span className={classes.name}>{story}</span>
        </div>
        <Button category="secondary" onClick={() => config.changeTheme()}>
          Change theme
        </Button>
      </div>
      <div className={classes.content}>
        {title ? (
          <>
            <div className={classes.title}>
              {title}
              <span className={classes.link}>
                {designSystemLink && (
                  <HvLink route={designSystemLink}>
                    &nbsp;&nbsp;[DS Pattern]
                  </HvLink>
                )}
              </span>
            </div>

            <div
              className={classes.description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </>
        ) : (
          children
        )}
      </div>
    </>
  );
};

export default withConfig(Main);
