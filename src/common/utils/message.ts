import { mergeOptions } from 'element-plus/es/components/table/src/util';
import { ElMessage, MessageHandler } from 'element-plus';

interface MessageOptions {
  message: string;
  duration: number;
  grouping: boolean;
  showClose: boolean;
  type: 'success' | 'warning' | 'info' | 'error';
}

function Message(options: MessageOptions): MessageHandler;
function Message(message: string, options?: Partial<MessageOptions>): MessageHandler;
function Message(...args: any[]): MessageHandler {
  let options: MessageOptions = { type: 'info', duration: 3, showClose: false, grouping: true, message: '' };
  if (args.length === 2) {
    options = mergeOptions(options, args[1]);
    options.message = args[0];
  } else if (typeof args[0] === 'object') {
    options = mergeOptions(options, args[0]);
  }
  options.duration = options.duration * 1000;
  return ElMessage(options);
}

export default Message;

export function MessageSuccess(message: string, options?: Partial<MessageOptions>) {
  return Message(message, { ...options, type: 'success' });
}

export function MessageError(message: string, options?: Partial<MessageOptions>) {
  return Message(message, { ...options, type: 'error' });
}

export function MessageInfo(message: string, options?: Partial<MessageOptions>) {
  return Message(message, { ...options, type: 'info' });
}

export function MessageWarning(message: string, options?: Partial<MessageOptions>) {
  return Message(message, { ...options, type: 'warning' });
}

export function MessageCloseAll(): void {
  ElMessage.closeAll();
}
