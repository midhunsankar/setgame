const messageTypes = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export type MessageType = (typeof messageTypes)[keyof typeof messageTypes];

export interface Message {
  content: string;
  type: MessageType;
}
