import React from "react";

const Navbar= (props)=>{
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Golden</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor04">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active"  href="/" >Clients
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" >Factures</a>
              </li>
            </ul>

              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    Inscription
                  </a>
                  </li>
                <li className="nav-item">
                  <a href="/" className="btn btn-success"> Connexion </a>
                </li>
                  <li className="nav-item"><a href="/" className="btn btn-danger">Déconnexion</a></li>
              </ul>

          </div>
        </div>
      </nav>
    );
}

export default Navbar;