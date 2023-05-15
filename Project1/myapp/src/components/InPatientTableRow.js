import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { withRouter } from "./withRouter";

const InPatientTableRow = (props) => {

    
    const [inpatientState] = useState({
      _id: props.obj._id,
      first_name: props.obj.first_name,
      last_name: props.obj.last_name,
      contact_no: props.obj.contact_no,
      weight: props.obj.weight,
      diagnosis:props.obj.diagnosis,
      shelter_type: props.obj.shelter_type,
      special_notes: props.obj.special_notes,
      shelter_no:props.obj.shelter_no,
      status:props.obj.status
    });

   





     const onDischarge = (id) => {

console.log(id)
      axios
      
      .put(`http://localhost:5000/admission/discharge/${id}`)
       .then((res) => { 
        console.log("success")
       alert(`Updated Successfully : ${id}`);

      })
    .catch((err) => console.log(err));
      
        axios
        .get(`http://localhost:5000/inpatient/delete/${id}`)
        .then((res) => {
          alert(`Deleted Successfully : ${id}`);
          window.location.reload();
        });




      };

        
      




      


      


      return(

        <tr>
    





        {
           //-------------------------Display All data -------------------
        }

        <td key={inpatientState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <td>{inpatientState.first_name}</td>
        <td>{inpatientState.last_name}</td>
        <td>{inpatientState.contact_no}</td>
        <td>{inpatientState.weight}</td>
        <td>{inpatientState.diagnosis}</td>
        <td>{inpatientState.shelter_type}</td>
        <td>{inpatientState.special_notes}</td>
        <td>{inpatientState.shelter_no}</td>
    
        <td>

        <button
            type="submit"
            className="delete"
            onClick={() => onDischarge(inpatientState._id)}
          >
            <Link className="nav-link">Discharge</Link>
          </button>

        </td>


        </tr>





      );
    
};
export default withRouter( InPatientTableRow);