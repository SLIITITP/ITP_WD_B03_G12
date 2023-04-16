import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from './withRouter'

class ServicesTableRow extends Component {

onDelete = (id) =>{
  axios
  .get(`http://localhost:5000/service/delete/${id}`).then((res) =>{
  alert(`Deleted Successfull : ${id}`)
  window.location.reload();  
  })
}

onUpdateReq = (id) =>{
  this.props.navigate('/update');
}

onUpdate = (id) =>{
  axios
  .put(`http://localhost:5000/service/update/${id}`).then((res) =>{
    alert(`updating : ${id}`)
      
    })
}



  render() {
    return (
      
        <tr>  
                
            <td>
                {this.props.obj.service_name}
            </td>

            <td>
                {this.props.obj.service_price}
            </td>
 
            <td>
            <button type='submit' className='submit' onClick={() => this.onUpdateReq(this.props.obj._id)} >
            <Link className="nav-link" > 
                Update
                </Link>
                </button>
            </td>

            <td>
            <button type='submit' className='delete' onClick={() => this.onDelete(this.props.obj._id)}>
            <Link className="nav-link" > 
                Delete
                </Link>
                </button>
            </td>


        </tr>
       
    )
  }
}

export default withRouter(ServicesTableRow) ; 