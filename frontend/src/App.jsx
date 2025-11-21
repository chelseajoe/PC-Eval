// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { Link, Routes, Route } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import TurnEvaluationPage from "./pages/TurnEvaluationPage";
import OptionsPage from "./pages/OptionsPage";

function App() {
  return (
    <>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Main</Link>
        <Link to="/evaluations" style={{ marginRight: "10px" }}>Turn Evaluations</Link>
        <Link to="/options">Options</Link>
      </nav>

      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/evaluations" element={<TurnEvaluationPage />} />
        <Route path="/options" element={<OptionsPage />} />
      </Routes>
    </>
  );
}

export default App;
