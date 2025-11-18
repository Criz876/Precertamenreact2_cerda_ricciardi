import React, { Fragment } from "react";
import "./css/bootstrap.min.css";
import Regalos from "./components/Regalos";
import Comida from "./components/Comida";
import Adornos from "./components/Adornos";

export function App(){
    return (
        <Fragment>
            <div className="container-fluid py-5 bg-light"> 
              <header className="text-center mb-5">
                <h1 className="display-4 text-primary">🛍️ Organizador de Fiestas</h1>
                <p className="lead">Listado de colecciones de Firebase: Regalos, Comida y Adornos.</p>
              </header>
              
              <main>
                
                <Regalos></Regalos>
                <Comida></Comida>
                <Adornos></Adornos>
              </main>
              
              <footer className="text-center mt-5 text-muted">
                <small>Pre Certamen 2 - Desarrollo Web con React & Firebase</small>
              </footer>
            </div>
        </Fragment>
    )
   
}

