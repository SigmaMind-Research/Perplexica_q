const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="lg:pl-20 bg-light-primary dark:bg-dark-primary min-h-screen">
      <div className="max-w-screen-lg lg:mx-auto mx-4">{children}</div>
    </main>
  );
};

export default Layout;










// <script src="https://form.jotform.com/static/feedback2.js"></script>
// <script>
//   var componentID = new JotformFeedback({
    
// type: false,
// width: 500,
// height: 400,
// fontColor: "#ffffff",
// background: "#4a4a4a",
// isCardForm: false,
// formId: "250072738261454"
// ,
//     buttonText: "Feedback",
//     buttonSide: "right",
//     buttonAlign: "bottom",
//     base: "https://form.jotform.com/",
//   }).componentID;
// </script>
// <script src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js'></script>
// <script>window.jotformEmbedHandler("iframe[id='" + componentID + "_iframe']", "https://form.jotform.com/")</script>