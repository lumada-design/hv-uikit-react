export interface MessageServiceConfig {
  prefix?: string;
}

export interface MessageService {
  formatMessage: (message: string) => string;
  getWelcomeMessage: () => string;
}

export type CreateMessageService = (
  config?: MessageServiceConfig,
) => MessageService;
