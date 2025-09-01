import { useCallback } from "react";

import { ServiceId } from "../types/config";
import {
  ServiceReference,
  UseGetServiceReferenceOptions,
  UseGetServiceReferencesOptions,
  UseServiceOptions,
  UseServiceReferenceResult,
  UseServiceResult,
  UseServicesOptions,
  UseServicesResult,
} from "../types/service";
import { useAsyncGeneric } from "./useAsyncGeneric";
import useServiceManager from "./useServiceManager";

export function useService<TService>(
  serviceId: ServiceId,
  options: UseServiceOptions = {},
): UseServiceResult<TService> {
  const serviceManager = useServiceManager();

  const promiseFactory = useCallback(
    () => serviceManager.getService<TService>(serviceId, options),
    [serviceManager, serviceId, options],
  );

  return useAsyncGeneric(promiseFactory, "service", undefined);
}

export function useServices<TService>(
  serviceId: ServiceId,
  options: UseServicesOptions = {},
): UseServicesResult<TService> {
  const serviceManager = useServiceManager();

  return useAsyncGeneric(
    () => serviceManager.getServices<TService>(serviceId, options),
    "services",
    [],
  );
}

export function useGetServiceReference<TService>(
  serviceId: ServiceId,
  options: UseGetServiceReferenceOptions = {},
): ServiceReference<TService> {
  const serviceManager = useServiceManager();
  return serviceManager.getServiceReference<TService>(serviceId, options);
}

export function useGetServiceReferences<TService>(
  serviceId: ServiceId,
  options: UseGetServiceReferencesOptions = {},
): ServiceReference<TService>[] {
  const serviceManager = useServiceManager();
  return serviceManager.getServiceReferences<TService>(serviceId, options);
}

// Gets a reference's service as an async result.
export function useServiceReference<TService>(
  serviceReference: ServiceReference<TService>,
): UseServiceReferenceResult<TService> {
  return useAsyncGeneric(
    () => serviceReference.getService(),
    "service",
    undefined,
  );
}
