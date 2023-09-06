import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Real-time Chat App</h1>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
