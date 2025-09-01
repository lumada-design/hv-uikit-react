import { useMemo } from "react";
import { useHvAppShellConfig } from "@hitachivantara/app-shell-shared";

import { ServiceId, ServicesConfig } from "../types/config";
import {
  GetServiceBaseOptions,
  GetServiceOptions,
  GetServiceReferenceOptions,
  GetServiceReferencesOptions,
  GetServicesOptions,
  GetServicesWithErrorsOptions,
  ServiceReference,
  ServicesResult,
} from "../types/service";
import { createServiceReference } from "../utils/serviceReference";
import { SERVICES_ERROR_HANDLING } from "../utils/serviceUtil";

type ServiceManager = {
  /**
   * Retrieves the reference of the highest-ranked service for the given service ID.
   */
  getServiceReference<TService>(
    serviceId: ServiceId,
    options?: GetServiceReferenceOptions,
  ): ServiceReference<TService>;

  /**
   * Retrieves all service references for the given service ID (sorted by ranking).
   */
  getServiceReferences<TService>(
    serviceId: ServiceId,
    options?: GetServiceReferencesOptions,
  ): ServiceReference<TService>[];

  /**
   * Retrieves the successfully resolved service instance of the highest-ranked
   * service reference for the given service ID or errors if the resolution fails.
   */
  getService<TService>(
    serviceId: ServiceId,
    options?: GetServiceOptions,
  ): Promise<TService>;

  /**
   * Retrieves all the successfully resolved service instances for the given
   * service ID while following the error handling strategy.
   *
   * Error Handling Strategies:
   * - "reject-on-any-failure": Rejects if any service resolution fails (advised for critical services);
   * - "reject-on-all-failures" (default): Only rejects if all services resolution fails (optimistic approach);
   * - "ignore-failures": Never rejects, returns only successfully resolved service instances (errors are ignored).
   */
  getServices<TService>(
    serviceId: ServiceId,
    options?: GetServicesOptions,
  ): Promise<TService[]>;

  /**
   * Retrieves all the successfully resolved service instances and the error details of the ones that failed.
   * Unlike getServices, this method always returns both successful services and any errors that occurred,
   * regardless of error handling strategy. This is useful for debugging and monitoring service loading.
   */
  getServicesAndErrors<TService>(
    serviceId: ServiceId,
    options?: GetServicesWithErrorsOptions,
  ): Promise<ServicesResult<TService>>;
};

let serviceManagerInstance: ServiceManager | null = null;

function createServiceReferenceMap(services: ServicesConfig = {}) {
  return Object.entries(services).reduce<Map<ServiceId, ServiceReference[]>>(
    (map, [serviceId, serviceConfigs]) => {
      const serviceReferences = serviceConfigs
        .map((serviceConfig) =>
          createServiceReference(serviceId, serviceConfig),
        )
        .sort((a, b) => b.ranking - a.ranking);

      map.set(serviceId, serviceReferences);
      return map;
    },
    new Map<ServiceId, ServiceReference[]>(),
  );
}

function createServiceManager(services?: ServicesConfig): ServiceManager {
  const serviceReferenceMap = createServiceReferenceMap(services);

  function queryServiceReferences<TService>(
    serviceId: ServiceId,
    _options?: GetServiceBaseOptions,
  ) {
    return (serviceReferenceMap.get(serviceId) ??
      []) as ServiceReference<TService>[];
  }

  function queryServiceReference<TService>(
    serviceId: string,
    options?: GetServiceBaseOptions,
  ) {
    const references = queryServiceReferences<TService>(serviceId, options);
    if (references.length === 0) {
      throw new Error(`Service ${serviceId} has no service providers.`);
    }

    return references[0];
  }

  return {
    getServiceReference<TService>(
      serviceId: string,
      options?: GetServiceReferenceOptions,
    ): ServiceReference<TService> {
      return queryServiceReference<TService>(serviceId, options);
    },

    getServiceReferences<TService>(
      serviceId: string,
      options?: GetServiceReferencesOptions,
    ): ServiceReference<TService>[] {
      return queryServiceReferences<TService>(serviceId, options);
    },

    async getService<TService>(
      serviceId: string,
      options?: GetServiceOptions,
    ): Promise<TService> {
      const reference = queryServiceReference<TService>(serviceId, options);
      return reference.getService();
    },

    async getServices<TService>(
      serviceId: string,
      options?: GetServicesOptions,
    ): Promise<TService[]> {
      const references = queryServiceReferences<TService>(serviceId, options);

      if (references.length === 0) {
        return [] as TService[];
      }

      const errorHandling =
        options?.errorHandling ??
        SERVICES_ERROR_HANDLING.REJECT_ON_ALL_FAILURES;

      const results = await Promise.allSettled(
        references.map((reference) => reference.getService()),
      );

      const successful: TService[] = [];
      const errors: Error[] = [];

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          successful.push(result.value);
        } else {
          errors.push(
            result.reason instanceof Error
              ? result.reason
              : new Error(String(result.reason)),
          );
        }
      });

      switch (errorHandling) {
        case SERVICES_ERROR_HANDLING.REJECT_ON_ANY_FAILURE:
          if (errors.length > 0) {
            throw errors[0];
          }
          break;

        case SERVICES_ERROR_HANDLING.REJECT_ON_ALL_FAILURES:
          if (errors.length === results.length) {
            throw new Error(
              `All service providers failed for service '${serviceId}'. First error: ${errors[0].message}`,
            );
          }
          break;

        case SERVICES_ERROR_HANDLING.IGNORE_FAILURES:
          break;
      }

      return successful;
    },

    async getServicesAndErrors<TService>(
      serviceId: string,
      options?: GetServicesOptions,
    ): Promise<ServicesResult<TService>> {
      const references = queryServiceReferences<TService>(serviceId, options);

      const results = await Promise.allSettled(
        references.map((reference) => reference.getService()),
      );

      const services: TService[] = [];
      const errors: Error[] = [];

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          services.push(result.value);
        } else {
          errors.push(
            result.reason instanceof Error
              ? result.reason
              : new Error(String(result.reason)),
          );
        }
      });

      return {
        services,
        errors,
      };
    },
  };
}

function useServiceManager(): ServiceManager {
  const { services } = useHvAppShellConfig();

  return useMemo(() => {
    serviceManagerInstance ??= createServiceManager(services);
    return serviceManagerInstance;
  }, [services]);
}

export default useServiceManager;
