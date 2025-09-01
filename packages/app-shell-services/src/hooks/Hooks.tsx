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

const EMPTY_SERVICE_OPTIONS: Readonly<UseServiceOptions> = Object.freeze({});
const EMPTY_SERVICES_OPTIONS: Readonly<UseServicesOptions> = Object.freeze({});

export function useService<TService>(
  serviceId: ServiceId,
  options?: UseServiceOptions,
): UseServiceResult<TService> {
  const { getService } = useServiceManager();
  const opts = options ?? EMPTY_SERVICE_OPTIONS;

  const promiseFactory = useCallback(
    () => getService<TService>(serviceId, opts),
    [getService, serviceId, opts],
  );

  return useAsyncGeneric(promiseFactory, "service", undefined);
}

export function useServices<TService>(
  serviceId: ServiceId,
  options?: UseServicesOptions,
): UseServicesResult<TService> {
  const { getServices } = useServiceManager();
  const opts = options ?? EMPTY_SERVICES_OPTIONS;

  const promiseFactory = useCallback(
    () => getServices<TService>(serviceId, opts),
    [getServices, serviceId, opts],
  );

  return useAsyncGeneric(promiseFactory, "services", []);
}

export function useGetServiceReference<TService>(
  serviceId: ServiceId,
  options: UseGetServiceReferenceOptions = {},
): ServiceReference<TService> {
  const { getServiceReference } = useServiceManager();
  return getServiceReference<TService>(serviceId, options);
}

export function useGetServiceReferences<TService>(
  serviceId: ServiceId,
  options: UseGetServiceReferencesOptions = {},
): ServiceReference<TService>[] {
  const { getServiceReferences } = useServiceManager();
  return getServiceReferences<TService>(serviceId, options);
}

// Takes an existing service reference and returns its service instance as an async {isPending, error, service} result.
export function useServiceReference<TService>(
  serviceReference: ServiceReference<TService>,
): UseServiceReferenceResult<TService> {
  const promiseFactory = useCallback(
    () => serviceReference.getService(),
    [serviceReference],
  );
  return useAsyncGeneric(promiseFactory, "service", undefined);
}
