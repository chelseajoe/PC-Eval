
// import React from "react";
// import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const MainScreen = () => {
//   return (
//     <div className="d-flex flex-column min-vh-100 bg-light">

//       {/* Hero Section */}
//       <header className="bg-white shadow-sm py-5">
//         <div className="container text-center">
//           <h1 className="display-5 fw-bold text-dark mb-3">
//             Clinical Evaluation Dashboard
//           </h1>
//           <p className="lead text-secondary mb-4">
//             Explore turn-level insights and evaluation summaries.
//           </p>

//           <Link to="/evaluations" className="btn btn-primary btn-lg px-5 py-3 rounded-4 shadow-sm">
//             View Turn Evaluations →
//           </Link>
//         </div>
//       </header>

//       {/* Footer */}
//       <footer className="bg-white py-3 mt-auto shadow-inner">
//         <div className="text-center text-secondary small">
//           &copy; {new Date().getFullYear()} PC-EVAL Dashboard
//         </div>
//       </footer>

//     </div>
//   );
// };

// export default MainScreen;

import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-3">
            <Link
              to="/evaluations"
              className="btn btn-outline-primary btn-lg px-5 py-3 rounded-4 shadow-sm"
            >
              View Turn Evaluations 
            </Link>

            <Link
              to="/prosody"
              className="btn btn-outline-primary btn-lg px-5 py-3 rounded-4 shadow-sm"
            >
              View Prosody Analysis 
            </Link>
          </div>
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
