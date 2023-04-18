import React, { Component } from 'react'
import axios from 'axios'
import EmployeeTableRow from './EmployeeTableRow'
import { Link } from 'react-router-dom';
import { withRouter } from './withRouter';

import '../components/CSS/listmain.css'

class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees : []
        };
    }
componentDidMount() {
    axios.get('http://localhost:5000/employee/')
        .then(response => {
            this.setState({employees: response.data});
        }) 
        .catch(function (error) {
            console.log(error);
        })
    }

    tabRow(){
        return this.state.employees.map(function(object,i) {
            return <EmployeeTableRow obj = {object} key={i} />
        })
    }
            

  render() {

    return (
      <div>

        <h1 align="center">Employee List</h1>
        <div className='tablestyle'>
            <div className='buttonframe'>
            <table className='buttonstyle'>
              <tr>
                    <td>       
                        <Link to="/employeeAdd" className="nav-link">
                            <p>Add Employee</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link to="/employeeViewAll" className="nav-link">
                            <p>View all Employee</p>
                        </Link>                 
                    </td>
                </tr>

                <tr>
                    <td>       
                        <Link to="/employeeAdd" className="nav-link">
                            <p>Create Accounts</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link to="/Employees" className="nav-link">
                            <p>View All Accounts</p>
                        </Link>                 
                        </td>
                </tr>



                
            </table>
            </div>
            <table className='table table-striped'>                  

                    <tr >

                        <td><b>Employee Name</b></td>
                        <td><b>Employee Email</b></td>  
                        <td><b>Employee Email</b></td>  
                        <td><b>Employee Email</b></td>  
                        <td><b>Employee Email</b></td>    
                        <td><b>Employee Email</b></td>  
                        <td><b>Employee Email</b></td>           
                    </tr> 
            

                <tbody>

                    {this.tabRow()}
                </tbody>


            </table>
        </div>


      </div>
    )
  }
}
export default withRouter(EmployeeList);