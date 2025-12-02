// // import React from "react";
// // import { Link } from "react-router-dom";
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // const MainScreen = () => {
// //   return (
// //     <div className="d-flex flex-column min-vh-100 bg-light">
// //       {/* Header */}
// //       <header className="bg-white shadow py-5">
// //         <div className="container text-center">
// //           <h1 className="display-4 fw-bold text-dark">
// //             Clinical Evaluation Dashboard
// //           </h1>
// //           <p className="lead text-secondary mt-3">
// //             Welcome! Select an option to get started.
// //           </p>
// //         </div>
// //       </header>

// //       {/* Main Tiles */}
// //       <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
// //         <div className="container">
// //           <div className="row g-4">

// //             {/* Tile 1 */}
// //             <div className="col-12 col-md-6">
// //               <Link to="/evaluations" className="text-decoration-none">
// //                 <div className="card shadow-sm h-100 border-0 hover-scale">
// //                   <div className="card-body text-center p-4 bg-primary text-white rounded-4">
// //                     <h3 className="card-title fw-bold mb-3">Display Evaluations</h3>
// //                     <p className="card-text">
// //                       View detailed evaluations, metrics, and insights.
// //                     </p>
// //                   </div>
// //                 </div>
// //               </Link>
// //             </div>

// //             {/* Tile 2 */}
// //             <div className="col-12 col-md-6">
// //               <Link to="/options" className="text-decoration-none">
// //                 <div className="card shadow-sm h-100 border-0 hover-scale">
// //                   <div className="card-body text-center p-4 bg-success text-white rounded-4">
// //                     <h3 className="card-title fw-bold mb-3">Run Evaluation</h3>
// //                     <p className="card-text">
// //                       Configure and run evaluation options efficiently.
// //                     </p>
// //                   </div>
// //                 </div>
// //               </Link>
// //             </div>

// //           </div>
// //         </div>
// //       </main>

// //       {/* Footer */}
// //       <footer className="bg-white py-3 mt-auto shadow-inner">
// //         <div className="text-center text-secondary small">
// //           &copy; {new Date().getFullYear()} PC-EVAL Dashboard
// //         </div>
// //       </footer>

// //       {/* Optional Hover Scale Effect */}
// //       <style>
// //         {`
// //           .hover-scale:hover {
// //             transform: scale(1.03);
// //             transition: transform 0.3s ease-in-out;
// //           }
// //         `}
// //       </style>
// //     </div>
// //   );
// // };

// // export default MainScreen;


// import React from "react";
// import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const MainScreen = () => {
//   return (
//     <div className="d-flex flex-column min-vh-100 bg-light">

//       {/* Header / Hero */}
//       <header className="bg-white shadow-sm py-5">
//         <div className="container text-center">
//           <h1 className="display-5 fw-bold text-dark mb-3">
//             Clinical Evaluation Dashboard
//           </h1>
//           <p className="lead text-secondary">
//             Navigate to view evaluation summaries and turn-level details.
//           </p>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
//         <div className="container d-flex justify-content-center">
//           <Link to="/evaluations" className="text-decoration-none" style={{ maxWidth: "450px", width: "100%" }}>
//             <div className="card border-0 shadow-lg rounded-4 hover-scale">
//               <div className="card-body text-center p-5 bg-primary text-white rounded-4">
//                 <h2 className="fw-bold mb-3">Turn Evaluations</h2>
//                 <p className="mb-0">
//                   View evaluation runs, turn-by-turn scoring, metrics, and insights.
//                 </p>
//               </div>
//             </div>
//           </Link>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white py-3 mt-auto shadow-inner">
//         <div className="text-center text-secondary small">
//           &copy; {new Date().getFullYear()} PC-EVAL Dashboard
//         </div>
//       </footer>

//       {/* Hover effect */}
//       <style>
//         {`
//           .hover-scale {
//             transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
//           }
//           .hover-scale:hover {
//             transform: translateY(-3px) scale(1.02);
//             box-shadow: 0 12px 32px rgba(0,0,0,0.15);
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default MainScreen;

import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const MainScreen = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">

      {/* Hero Section */}
      <header className="bg-white shadow-sm py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold text-dark mb-3">
            Clinical Evaluation Dashboard
          </h1>
          <p className="lead text-secondary mb-4">
            Explore turn-level insights and evaluation summaries.
          </p>

          <Link to="/evaluations" className="btn btn-primary btn-lg px-5 py-3 rounded-4 shadow-sm">
            View Turn Evaluations →
          </Link>
        </div>
      </header>

      {/* Footer */}
      <footer className="bg-white py-3 mt-auto shadow-inner">
        <div className="text-center text-secondary small">
          &copy; {new Date().getFullYear()} PC-EVAL Dashboard
        </div>
      </footer>

    </div>
  );
};

export default MainScreen;
