// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment } from 'react';
// import { X } from 'lucide-react'; // Import Close Icon

// const Test = ({
//   isOpen,
//   setIsOpen,
// }: {
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
// }) => {
//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-50"
//         onClose={() => setIsOpen(false)}
//       >
//         {/* Background Overlay */}
//         <div className="fixed inset-0 bg-black/50" />

//         {/* Modal Content */}
//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-6 text-center">
//             <Dialog.Panel className="w-full max-w-3xl h-[400px] bg-light-secondary dark:bg-dark-secondary border border-light-200 dark:border-dark-200 p-10 rounded-2xl">
//               {/* Close Button */}
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                 aria-label="Close Modal"
//               >
//                 <X className="w-8 h-8" />
//               </button>

//               {/* Modal Header */}
//               <Dialog.Title className="text-3xl font-semibold text-black dark:text-white">
//                 Test Details
//               </Dialog.Title>

//               {/* Modal Content */}
//               <Dialog.Description className="mt-6 text-lg text-gray-600 dark:text-gray-400">
//                 Here you can manage your test details and preferences.
//               </Dialog.Description>

//               {/* Example Content */}
//               <div className="mt-8">
//                 <p className="text-lg text-black dark:text-white">
//                   Welcome to your test settings!
//                 </p>
//               </div>
//             </Dialog.Panel>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default Test;
