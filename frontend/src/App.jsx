// // App.jsx
// import { Routes, Route, Link } from "react-router-dom";
// import MainScreen from "./pages/MainScreen";
// import TurnEvaluationPage from "./pages/TurnEvaluationPage";
// import OptionsPage from "./pages/OptionsPage";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <div className="d-flex flex-column min-vh-100">
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
//         <div className="container">
//           <Link className="navbar-brand fw-bold" to="/">PC-EVAL Dashboard</Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/">Main</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/evaluations">Turn Evaluations</Link>
//               </li>
//               {/* <li className="nav-item">
//                 <Link className="nav-link" to="/options">Options</Link>
//               </li> */}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Page Content */}
//       <div className="flex-grow-1">
//         <Routes>
//           <Route path="/" element={<MainScreen />} />
//           <Route path="/evaluations" element={<TurnEvaluationPage />} />
//           {/* <Route path="/options" element={<OptionsPage />} /> */}
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;

import { Routes, Route, Link } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import TurnEvaluationPage from "./pages/TurnEvaluationPage";
import ProsodyPage from "./pages/ProsodyPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">PC-EVAL Dashboard</Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Main</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/evaluations">Turn Evaluations</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/prosody">Prosody Analysis</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/evaluations" element={<TurnEvaluationPage />} />
          <Route path="/prosody" element={<ProsodyPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
