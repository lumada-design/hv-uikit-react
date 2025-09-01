import { SERVICES_ERROR_HANDLING } from "../utils/serviceUtil";
import { UseAsyncResult } from "./async";
import { ServiceId } from "./config";

/**
 * Base options for service retrieval operations.
 * Used as a foundation for more specific service option types.
 */
export type GetServiceBaseOptions = {};

/**
 * Options for retrieving a single service.
 */
export type GetServiceOptions = GetServiceBaseOptions; // NOSONAR

/**
 * Error handling strategies for service retrieval.
 * Determines how errors are managed when loading services.
 */
export type ServicesErrorHandling =
  (typeof SERVICES_ERROR_HANDLING)[keyof typeof SERVICES_ERROR_HANDLING];

/**
 * Options for retrieving multiple services.
 * Adds error handling configuration.
 */
export type GetServicesOptions = GetServiceBaseOptions & {
  errorHandling?: ServicesErrorHandling;
};

/**
 * Options for retrieving multiple services with all the error details included of those that failed.
 */
export type GetServicesWithErrorsOptions = GetServiceBaseOptions; // NOSONAR

/**
 * Options for retrieving a service reference.
 */
export type GetServiceReferenceOptions = GetServiceBaseOptions; // NOSONAR

/**
 * Options for retrieving multiple service references.
 */
export type GetServiceReferencesOptions = GetServiceBaseOptions; // NOSONAR

/**
 * Result of a service retrieval operation.
 * Contains the successfully loaded services and all errors that happened.
 */
export type ServicesResult<TService> = {
  services: TService[];
  errors: Error[];
};

/**
 * Loader function type for asynchronously loading a service.
 * Returns a promise resolving to the service instance.
 */
export type ServiceLoader<TService> = () => Promise<TService>;

/**
 * Reference to a service, including metadata and a loader function.
 * Used to access service details and retrieve the service instance.
 */
export type ServiceReference<TService = unknown> = {
  serviceId: ServiceId;

  ranking: number;

  getService(): Promise<TService>;
};

/**
 * Result type for the useService hook.
 * Represents the async state of a single service fetch operation.
 */
export type UseServiceResult<TService> = UseAsyncResult<
  TService,
  Error,
  "service"
>;

/**
 * Result type for the useServices hook.
 * Represents the async state of fetching multiple services.
 */
export type UseServicesResult<TService> = UseAsyncResult<
  TService[],
  Error,
  "services",
  TService[]
>;

/**
 * Result type for the useServiceReference hook.
 * Represents the async state of fetching a service instance from a reference.
 */
export type UseServiceReferenceResult<TService> = UseServiceResult<TService>;

export type UseServiceOptions = GetServiceOptions; // NOSONAR
export type UseServicesOptions = GetServicesOptions; // NOSONAR
export type UseGetServiceReferenceOptions = GetServiceReferenceOptions; // NOSONAR
export type UseGetServiceReferencesOptions = GetServiceReferencesOptions; // NOSONAR
