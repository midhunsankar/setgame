import * as rxjs from "rxjs";
import type { Subject } from "rxjs/internal/Subject";
import type { Message, MessageType } from "../models/message";

class MessagesService {
  private static messageSubject: Subject<Message | undefined> = new rxjs.Subject<Message | undefined>();

  public static addMessage(message: string, msgType: string): void {
    const newMessage: Message = {
      content: message,
      type: msgType as MessageType,
    };
    this.messageSubject.next(newMessage);
  }

  public static getMessages(): rxjs.Observable<Message | undefined> {
    return this.messageSubject.asObservable();
  }

  public static clearMessages(): void {
     this.messageSubject.next(undefined);
  }
}

export default MessagesService;
