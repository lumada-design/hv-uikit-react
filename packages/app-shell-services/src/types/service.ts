import { SERVICES_ERROR_HANDLING } from "../utils/serviceUtil";
import { UseAsyncResult } from "./async";
import {
  ServiceFactoryConfig,
  ServiceId,
  ServiceManagerAttributes,
} from "./config";

export type ServiceManager = {
  /**
   * Retrieves a reference to a single service provider for the given service ID.
   *
   * @param {ServiceId} serviceId The unique identifier of the service.
   * @param {GetServiceReferenceOptions} [options] Optional attributes for filtering providers.
   * @returns {ServiceReference<TService>} The service reference for the requested service.
   * @see ServiceReference
   */
  getServiceReference<TService>(
    serviceId: ServiceId,
    options?: GetServiceReferenceOptions,
  ): ServiceReference<TService>;

  /**
   * Retrieves multiple service instances with detailed error information.
   * Always returns both successful services and any errors that occurred.
   *
   * @param {ServiceId} serviceId The unique identifier of the service.
   * @param {GetServicesWithErrorsOptions} [options] Configuration options.
   * @returns {Promise<ServicesResult<TService>>} A promise resolving to a result object containing services and errors.
   * @see ServicesResult
   */
  getServiceReferences<TService>(
    serviceId: ServiceId,
    options?: GetServiceReferencesOptions,
  ): ServiceReference<TService>[];

  /**
   * Retrieves a single service instance for the given service ID.
   *
   * @param {ServiceId} serviceId The unique identifier of the service.
   * @param {GetServiceOptions} [options] Optional attributes for filtering providers.
   * @returns {Promise<TService>} A promise resolving to the service instance.
   * @throws {Error} If no service provider is found or all providers fail.
   * @see ServiceReference
   */
  getService<TService>(
    serviceId: ServiceId,
    options?: GetServiceOptions,
  ): Promise<TService>;

  /**
   * Get multiple service instances for a given service ID.
   *
   * Error Handling Strategies:
   * - "reject-on-any-failure": Rejects if any service provider fails loading (use for critical services)
   * - "reject-on-all-failures" (default): Only rejects if all service providers fail (optimistic approach)
   * - "ignore-failures": Never rejects, returns only successful services with error details
   *
   * The default optimistic approach allows applications to continue functioning with partial
   * service availability, which is ideal for plugin architectures and service discovery patterns.
   *
   * @param serviceId The service identifier
   * @param options Configuration options including error handling strategy
   * @returns Promise resolving to array of services
   */
  getServices<TService>(
    serviceId: ServiceId,
    options?: GetServicesOptions,
  ): Promise<TService[]>;

  /**
   * Get multiple service instances with detailed error information.
   * Always returns both successful services and any errors that occurred.
   *
   * @param serviceId The service identifier
   * @param options Configuration options
   * @returns Promise resolving to ServicesResult with services and errors
   */
  getServicesAndErrors<TService>(
    serviceId: ServiceId,
    options?: GetServicesWithErrorsOptions,
  ): Promise<ServicesResult<TService>>;
};

/**
 * Base options for service retrieval operations.
 * Used as a foundation for more specific service option types.
 */
export type GetServiceBaseOptions = {
  attributes?: ServiceManagerAttributes;
};

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
 * Factory function type for creating a service instance.
 * Accepts an optional configuration object.
 */
export type ServiceFactory<TService> = (
  config?: ServiceFactoryConfig,
) => TService;

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

  attributes: ServiceManagerAttributes;

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
  []
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
