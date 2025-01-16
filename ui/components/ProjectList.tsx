// import React from "react";
// import { useSelector } from "react-redux";
// import ProjectForm from "@/components/ProjectForm";
// import ProjectItems from "@/components/ProjectItems";
// import ProjectFilter from "@/components/ProjectFilter";
// import Modal from "@/components/Modal";

// interface RootState {
//   project: {
//     isOpenModal: boolean;
//   };
// }

// const ProjectList = () => {
//   const { isOpenModal } = useSelector((state: RootState) => state.project);

//   return (
//     <>
//       {isOpenModal && <Modal />}
//       {/* background */}
//       <div className="min-h-screen bg-yellow-100 dark:bg-dark-blue-900 pt-16 sm:pt-24 font-nunito">
//         <div className="bg-cyan-200 flex flex-col-reverse sm:flex-row justify-center w-11/12 sm:w-5/6 md:w-2/3 mx-auto rounded-br-3xl rounded-tl-3xl shadow-2xl dark:bg-slate-800 dark:shadow-cyan-500 dark:shadow-md">
//           <div className="w-full sm:w-2/3 p-5 md:p-7 dark:text-custom-white">
//             <ProjectForm />
//             <ProjectItems />
//             <ProjectFilter />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProjectList;



import React from "react";
import { useSelector } from "react-redux";
import ProjectForm from "@/components/ProjectForm"; // Ensure this import is correct
import ProjectItems from "@/components/ProjectItems";
import ProjectFilter from "@/components/ProjectFilter";
import Modal from "@/components/Modal";

interface RootState {
  project: {
    isOpenModal: boolean;
  };
}

const ProjectList = () => {
  const { isOpenModal } = useSelector((state: RootState) => state.project);

  return (
    <>
      {isOpenModal && <Modal />}
      {/* background */}
      <div className="min-h-screen  dark:bg-dark-blue-900 pt-16 sm:pt-24 font-nunito">
      <div
  className="flex flex-col-reverse sm:flex-row justify-center w-11/12 sm:w-5/6 md:w-2/3 mx-auto rounded-br-3xl rounded-tl-3xl shadow-2xl dark:shadow-gray-300 dark:shadow-md"
  style={{ backgroundColor: "#343434" }}
>

          <div className="w-full sm:w-2/3 p-5 md:p-7 dark:text-custom-white">
            <ProjectForm />
            <ProjectItems />
            <ProjectFilter />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
