// pages/index.tsx
import Sidebar from '@/app/services/Sidebar'; // Ensure correct relative path

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Sidebar /> {/* Sidebar must be inside UserProvider */}
    </div>
  );
};

export default Home;
