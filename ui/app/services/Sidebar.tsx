// components/Sidebar.tsx
import { useUser } from '@/context/UserContext'; // Correct path to UserContext

const Sidebar = () => {
  const { user, login, logout } = useUser(); // Access user data and actions

  return (
    <div>
      <h3>Sidebar</h3>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
        <div>
          <p>Please log in</p>
          <button onClick={() => login('user@example.com', 'John Doe')}>Log in</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
