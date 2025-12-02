import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const MainScreen = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white shadow py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold text-dark">
            Clinical Evaluation Dashboard
          </h1>
          <p className="lead text-secondary mt-3">
            Welcome! Select an option to get started.
          </p>
        </div>
      </header>

      {/* Main Tiles */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div className="container">
          <div className="row g-4">

            {/* Tile 1 */}
            <div className="col-12 col-md-6">
              <Link to="/evaluations" className="text-decoration-none">
                <div className="card shadow-sm h-100 border-0 hover-scale">
                  <div className="card-body text-center p-4 bg-primary text-white rounded-4">
                    <h3 className="card-title fw-bold mb-3">Display Evaluations</h3>
                    <p className="card-text">
                      View detailed evaluations, metrics, and insights.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Tile 2 */}
            <div className="col-12 col-md-6">
              <Link to="/options" className="text-decoration-none">
                <div className="card shadow-sm h-100 border-0 hover-scale">
                  <div className="card-body text-center p-4 bg-success text-white rounded-4">
                    <h3 className="card-title fw-bold mb-3">Run Evaluation</h3>
                    <p className="card-text">
                      Configure and run evaluation options efficiently.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-3 mt-auto shadow-inner">
        <div className="text-center text-secondary small">
          &copy; {new Date().getFullYear()} PC-EVAL Dashboard
        </div>
      </footer>

      {/* Optional Hover Scale Effect */}
      <style>
        {`
          .hover-scale:hover {
            transform: scale(1.03);
            transition: transform 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default MainScreen;
