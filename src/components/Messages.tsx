import type { Message } from "../models/message";

function Messages({ message }: { message: Message | undefined }) {
  if (!message) return (
    <div></div>
  );

  return (
    <div className={`message ${message.type}`}>
      <b>{message.content}</b>
    </div>
  );
}

export default Messages;