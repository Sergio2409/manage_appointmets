import React, {Fragment, useState} from 'react';

const Formulario = ({crearCita}) => {

    // Crear State de Citas

    const [cita, actualizarCita] =  useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    const [error, actualizarError] = useState(false)

    const [keyGen, updateKey] = useState(0);

    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Funcion handleChange

    const handleChange = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    const uuid = () => {
        let newUid = keyGen + 1;
        updateKey(newUid);
        return newUid;
    }

    const clearForm = () => {
       actualizarCita({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''    
       }) 

    }

    const formIsValid = () => {
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '')
        {
            return false;
        }
        else{
            return true;
        }
    }

    const submitCita = e => {
        e.preventDefault();        

        // Validar formulario
        if(!formIsValid()){
            actualizarError(true);
            return;
        }
        
        actualizarError(false);
        // Asignar un ID
        cita.id = uuid();
        
        //Crear la Cita
        crearCita(cita);
        
        // Reiniciar la Cita
        clearForm();        
    }

    

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>
            
            {error ? 
                <p className="alerta-error">Todos los campos son obligatorios</p>
            : 
                null

            }

            <form 
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text" 
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handleChange}
                    value={mascota}
                />

                <label>Nombre del dueño</label>
                <input 
                    type="text" 
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño de la Mascota"
                    onChange={handleChange}
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date" 
                    name="fecha"
                    className="u-full-width"                    
                    onChange={handleChange}
                    value={fecha}
                />

                <label>Hora</label>
                <input 
                    type="time" 
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}                    
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea 
                    name="sintomas"
                    className="u-full-width"
                    onChange={handleChange}
                    value={sintomas}
                    >
                </textarea>

                <button type="submit" className="u-full-width button-primary">
                    Agregar Cita
                </button>
                
            </form>
        </Fragment>        
     );
}
 
export default Formulario;
