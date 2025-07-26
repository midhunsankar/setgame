import type { Message } from "../models/message";

function Messages({ message }: { message: Message | undefined }) {
  if (!message) return null;

  return (
    <div className={`message ${message.type}`}>
      <h2>{message.content}</h2>
    </div>
  );
}

export default Messages;