import React from "react";
import { storiesOf } from "@storybook/react";
import FastForward16 from "@hv-ui/icons/core/S-icons/FastBackward16";
import { HvShowCase } from "../../src";

import {
  BigDiv,
  BannerContentWrapper,
  ActionButton,
  ActionButtonCollection,
  SimpleBanner
} from "./Utils";

storiesOf("Banner", module)
  .add("Banner", () => (
    <>
      <HvShowCase title="Banner with icons">
        <div>
          <SimpleBanner
            message="default"
            variant="default"
            anchorOrigin="top"
            showIcon
          />
        </div>
        <p />
        <div>
          <SimpleBanner message="Success" variant="success" showIcon />
        </div>
        <p />
        <div>
          <SimpleBanner message="Info" variant="info" showIcon />
        </div>
        <p />
        <div>
          <SimpleBanner message="Warning" variant="warning" showIcon />
        </div>
        <p />
        <div>
          <SimpleBanner message="Error" variant="error" showIcon />
        </div>
      </HvShowCase>
    </>
  ))
  .add("BannerContainer", () => (
    <>
      <HvShowCase title="Banner with icons">
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Default"
              variant="default"
              showIcon
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
              variant="default"
              showIcon
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Success"
              variant="success"
              showIcon
            />
          }
        />
        <p />
        <BigDiv
          elem={<BannerContentWrapper message="Info" variant="info" showIcon />}
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Warning"
              variant="warning"
              showIcon
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper message="Error" variant="error" showIcon />
          }
        />
      </HvShowCase>

      <HvShowCase title="Banner with custom icons">
        <BigDiv
          elem={
            <BannerContentWrapper
              message="default"
              variant="default"
              customIcon={<FastForward16 />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
              variant="default"
              customIcon={<FastForward16 />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Success"
              variant="success"
              customIcon={<FastForward16 />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Info"
              variant="info"
              customIcon={<FastForward16 />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Warning"
              variant="warning"
              customIcon={<FastForward16 />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Error"
              variant="error"
              customIcon={<FastForward16 />}
            />
          }
        />
      </HvShowCase>

      <HvShowCase title="Banner with icons and message action">
        <BigDiv
          elem={
            <BannerContentWrapper
              message="default"
              variant="default"
              showIcon
              actionsOnMessage={<ActionButton />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
              variant="default"
              showIcon
              actionsOnMessage={<ActionButton />}
            />
          }
        />
        <p />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Success"
              variant="success"
              showIcon
              actionsOnMessage={<ActionButton />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Info"
              variant="info"
              showIcon
              actionsOnMessage={<ActionButton />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Warning"
              variant="warning"
              showIcon
              actionsOnMessage={<ActionButton />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Error"
              variant="error"
              showIcon
              actionsOnMessage={<ActionButton />}
            />
          }
        />
      </HvShowCase>

      <HvShowCase title="Banner with icons and action">
        <BigDiv
          elem={
            <BannerContentWrapper
              message="default"
              variant="default"
              showIcon
              action={<ActionButtonCollection />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
              variant="default"
              showIcon
              action={<ActionButtonCollection />}
            />
          }
        />
        <p />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Success"
              variant="success"
              showIcon
              action={<ActionButtonCollection />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Info"
              variant="info"
              showIcon
              action={<ActionButtonCollection />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Warning"
              variant="warning"
              showIcon
              action={<ActionButtonCollection />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="Error"
              variant="error"
              showIcon
              action={<ActionButtonCollection />}
            />
          }
        />
      </HvShowCase>

      <HvShowCase title="Banner without icons">
        <BigDiv
          elem={<BannerContentWrapper message="default" variant="default" />}
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
              variant="default"
            />
          }
        />
        <p />
        <BigDiv
          elem={<BannerContentWrapper message="Success" variant="success" />}
        />
        <p />
        <BigDiv elem={<BannerContentWrapper message="Info" variant="info" />} />
        <p />
        <BigDiv
          elem={<BannerContentWrapper message="Warning" variant="warning" />}
        />
        <p />
        <BigDiv
          elem={<BannerContentWrapper message="Error" variant="error" />}
        />
      </HvShowCase>

      <HvShowCase title="Banner without icons and with message action">
        <BigDiv
          elem={
            <BannerContentWrapper
              message="default"
              variant="default"
              actionsOnMessage={<ActionButton />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
              variant="default"
              actionsOnMessage={<ActionButton />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="success"
              variant="success"
              actionsOnMessage={<ActionButton />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="info"
              variant="info"
              actionsOnMessage={<ActionButton />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="warning"
              variant="warning"
              actionsOnMessage={<ActionButton />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="error"
              variant="error"
              actionsOnMessage={<ActionButton />}
            />
          }
        />
      </HvShowCase>

      <HvShowCase title="Banner without icons and with action">
        <BigDiv
          elem={
            <BannerContentWrapper
              message="default"
              variant="default"
              action={<ActionButtonCollection />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
              variant="default"
              action={<ActionButtonCollection />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="success"
              variant="success"
              action={<ActionButtonCollection />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="info"
              variant="info"
              action={<ActionButtonCollection />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="warning"
              variant="warning"
              action={<ActionButtonCollection />}
            />
          }
        />
        <p />
        <BigDiv
          elem={
            <BannerContentWrapper
              message="error"
              variant="error"
              action={<ActionButtonCollection />}
            />
          }
        />
      </HvShowCase>
    </>
  ));
