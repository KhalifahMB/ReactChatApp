import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="chat-app">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Home;
