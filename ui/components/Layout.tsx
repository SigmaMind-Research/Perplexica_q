const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative lg:pl-20 bg-light-primary dark:bg-dark-primary min-h-screen overflow-hidden hide-scrollbar">
      {/* Logo in the top-left corner */}
      {/* <div className="absolute top-0 left-0 p-4">
        <img src="../images/logo.jpeg" alt="Logo" className="w-12 h-12" />
      </div> */}

      {/* Main Content */}
      <div className="max-w-screen-lg lg:mx-auto mx-4">{children}</div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full py-2 px-4 bg-light-secondary dark:bg-dark-secondary">
        <p className="text-sm text-black dark:text-white text-center">
          Copyright 2024 PotatoAI
        </p>
      </footer>
    </main>
  );
};

export default Layout;
