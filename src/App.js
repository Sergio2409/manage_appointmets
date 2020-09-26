import React, {Fragment, useState, useEffect} from 'react';
import Formulario from "./components/Formulario"
import Cita from "./components/Cita"
import PropTypes from 'prop-types';


function App() {

  //Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));  
  if(!citasIniciales){
    citasIniciales = [];
  }
  const [citas, updateCitas] = useState(citasIniciales);

  //Usar UseEffect para realizar ciertas operaciones cunado el state cambia.

  useEffect ( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }
    else{
      localStorage.setItem('citas', JSON.stringify([]));
    }    
  }, [citas, citasIniciales])


  //Leer citas actuales y agregar una nueva

  const crearCita = cita => {
    updateCitas([
      ...citas,
      cita
    ])
  } 

  //Función que elimina una cita por su ID
  const eliminarCita = id => {
      const nuevasCitas = citas.filter(cita => cita.id !== id);
      updateCitas(nuevasCitas);
  }
  const tituloCitas = citas.length === 0 ? 'No hay citas' : "Administra tus citas";
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      
      <div className="container">
        <div className="row">

          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          
          <div className="one-half column">
            <h2>{tituloCitas}</h2>           
            {citas.map(cita =>(
                <Cita 
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
            ))}
          </div>
        </div>
      </div>
    </Fragment>      
  );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default App;
