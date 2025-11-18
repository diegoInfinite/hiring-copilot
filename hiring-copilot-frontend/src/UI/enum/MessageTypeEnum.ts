export const MessageTypeEnum = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
  CONFIRM: 'confirm',
} as const;

export type MessageTypeEnum = typeof MessageTypeEnum[keyof typeof MessageTypeEnum];
