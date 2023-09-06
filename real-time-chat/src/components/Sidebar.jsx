import UserList from "./UserList";
import { Navbar } from "./Navbar";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <UserList />
    </div>
  );
};

export default Sidebar;
