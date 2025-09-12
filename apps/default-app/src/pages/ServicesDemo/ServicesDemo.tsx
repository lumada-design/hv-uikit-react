import { ComponentType, FC, useState } from "react";
import { useService, useServices } from "@hitachivantara/app-shell-services";
import {
  HvButton,
  HvCard,
  HvCardContent,
  HvContainer,
  HvGrid,
  HvLoading,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { ServiceDefinitions } from "../../services/serviceDefinition";
import {
  MessageService,
  SimpleDataService,
  SimpleNotificationProps,
  UseCreateNewContentAction,
} from "../../services/types";

const InstanceServiceDemo: FC = () => {
  const { service, isPending, error } = useService<SimpleDataService>(
    ServiceDefinitions.SimpleDataService.id,
  );

  if (isPending) {
    return <HvLoading>Loading instance service...</HvLoading>;
  }

  if (error) {
    const errorMessage = `Failed to load instance type service: ${ServiceDefinitions.SimpleDataService.id}`;
    return <HvTypography>{errorMessage}</HvTypography>;
  }

  if (!service) {
    const warnMessage = `No instance service available: ${ServiceDefinitions.SimpleDataService.id}`;
    return <HvTypography>{warnMessage}</HvTypography>;
  }

  return (
    <HvCard>
      <HvCardContent>
        <HvTypography variant="title3" style={{ marginBottom: "16px" }}>
          Instance Service Demo
        </HvTypography>
        <HvTypography style={{ marginBottom: "16px" }}>
          This demonstrates an instance service with direct object values.
        </HvTypography>
        <HvTypography style={{ marginBottom: "8px" }}>
          <strong>Is in debug mode:</strong> {service.debug ? "true" : "false"}
        </HvTypography>
        <HvTypography style={{ marginBottom: "8px" }}>
          <strong>Application name:</strong> {service.appName}
        </HvTypography>
        <HvTypography style={{ marginBottom: "8px" }}>
          <strong>Environment:</strong> {service.environment}
        </HvTypography>
        <HvTypography style={{ marginBottom: "8px" }}>
          <strong>Current version:</strong> {service.version}
        </HvTypography>
      </HvCardContent>
    </HvCard>
  );
};

const FactoryServiceDemo: FC = () => {
  const [formattedMessage, setFormattedMessage] = useState<string>("");
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");

  const { services, isPending, error } = useServices<MessageService>(
    ServiceDefinitions.MessageService.id,
  );

  const messageService = services?.[0];

  const handleFormatMessage = () => {
    if (messageService) {
      const formatted = messageService.formatMessage("This is a test message!");
      setFormattedMessage(formatted);
    }
  };

  const handleGetWelcome = () => {
    if (messageService) {
      const welcome = messageService.getWelcomeMessage();
      setWelcomeMessage(welcome);
    }
  };

  if (isPending) {
    return <HvLoading>Loading factory type services...</HvLoading>;
  }

  if (error) {
    const errorMessage = `Failed to load factory type services: ${ServiceDefinitions.MessageService.id}`;
    return <HvTypography>{errorMessage}</HvTypography>;
  }

  return (
    <HvCard>
      <HvCardContent>
        <HvTypography variant="title3" style={{ marginBottom: "16px" }}>
          Factory Service Demo
        </HvTypography>
        <HvTypography style={{ marginBottom: "16px" }}>
          This demonstrates a factory service that creates configured instances.
        </HvTypography>

        <HvGrid container spacing={2} style={{ marginBottom: "16px" }}>
          <HvGrid item>
            <HvButton onClick={handleFormatMessage}>Format Message</HvButton>
          </HvGrid>
          <HvGrid item>
            <HvButton onClick={handleGetWelcome}>Get Welcome</HvButton>
          </HvGrid>
        </HvGrid>

        {formattedMessage && (
          <HvTypography style={{ marginBottom: "8px" }}>
            <strong>Formatted:</strong> {formattedMessage}
          </HvTypography>
        )}
        {welcomeMessage && (
          <HvTypography>
            <strong>Welcome:</strong> {welcomeMessage}
          </HvTypography>
        )}
      </HvCardContent>
    </HvCard>
  );
};

const BundleServiceDemoInner: FC<{
  actionHooks: UseCreateNewContentAction[];
}> = ({ actionHooks }) => {
  const actionResults = actionHooks.map((actionHook) => actionHook());

  return (
    <HvCard>
      <HvCardContent>
        <HvTypography variant="title3" style={{ marginBottom: "16px" }}>
          Bundle Service Demo (React Hooks)
        </HvTypography>
        <HvTypography style={{ marginBottom: "16px" }}>
          This demonstrates bundle services that provide React hooks. Also
          available in the header dropdown.
        </HvTypography>

        <HvGrid container spacing={2}>
          {actionResults.map((action, index) => {
            if (!action) return null;

            return (
              <HvGrid item key={action.id || `action-${index}`}>
                <HvButton onClick={action.onAction}>
                  {action.label || `Action ${index + 1}`}
                </HvButton>
              </HvGrid>
            );
          })}
        </HvGrid>
      </HvCardContent>
    </HvCard>
  );
};

const BundleServiceDemo: FC = () => {
  const {
    services: actionHooks,
    isPending,
    error,
  } = useServices<UseCreateNewContentAction>(
    ServiceDefinitions.UseCreateNewContentAction.id,
    { errorHandling: "reject-on-any-failure" },
  );

  if (isPending) {
    return <HvLoading>Loading create actions...</HvLoading>;
  }

  if (error) {
    const errorMessage = `Failed to load bundle type services: ${ServiceDefinitions.UseCreateNewContentAction.id}`;
    return <HvTypography>{errorMessage}</HvTypography>;
  }

  return <BundleServiceDemoInner actionHooks={actionHooks} />;
};

const ComponentServiceDemo: FC = () => {
  const {
    service: NotificationComponent,
    isPending,
    error,
  } = useService<ComponentType<SimpleNotificationProps>>(
    ServiceDefinitions.SimpleNotification.id,
  );

  if (isPending) {
    return <HvLoading>Loading component type services...</HvLoading>;
  }

  if (error) {
    const errorMessage = `Failed to load component type service: ${ServiceDefinitions.SimpleNotification.id}`;
    return <HvTypography>{errorMessage}</HvTypography>;
  }

  return (
    <HvCard>
      <HvCardContent>
        <HvTypography variant="title3" style={{ marginBottom: "16px" }}>
          Component Service Demo
        </HvTypography>
        <HvTypography style={{ marginBottom: "16px" }}>
          This demonstrates a component service that renders React components.
        </HvTypography>

        <NotificationComponent />
      </HvCardContent>
    </HvCard>
  );
};

const ServicesDemo: FC = () => {
  return (
    <HvContainer maxWidth="lg">
      <HvTypography variant="title1" style={{ marginBottom: "32px" }}>
        Services Demo
      </HvTypography>

      <HvTypography style={{ marginBottom: "32px" }}>
        This page demonstrates all four types of services available in the app
        shell: Bundle (Hook), Instance, Factory, and Component services.
      </HvTypography>

      <HvGrid container spacing={3}>
        <HvGrid item xs={12} md={6}>
          <InstanceServiceDemo />
        </HvGrid>

        <HvGrid item xs={12} md={6}>
          <FactoryServiceDemo />
        </HvGrid>

        <HvGrid item xs={12} md={6}>
          <BundleServiceDemo />
        </HvGrid>

        <HvGrid item xs={12} md={6}>
          <ComponentServiceDemo />
        </HvGrid>
      </HvGrid>
    </HvContainer>
  );
};

export default ServicesDemo;
