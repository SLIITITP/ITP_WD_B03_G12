import React, { Component } from 'react'
import axios from 'axios'
import ServicesTableRow from './ServicesTableRow'
import { Link } from 'react-router-dom';
import { withRouter } from './withRouter';

import '../components/CSS/listmain.css'

class ServicesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            service : []
        };
    }
componentDidMount() {
    axios.get('http://localhost:5000/service/')
        .then(response => {
            this.setState({service: response.data});
        }) 
        .catch(function (error) {
            console.log(error);
        })
    }

    tabRow(){
        return this.state.service.map(function(object,i) {
            return <ServicesTableRow obj = {object} key={i} />
        })
    }
            

  render() {

    return (
      <div>

        <h1 align="center">Service List</h1>
        <div className='tablestyle'>
            <div className='buttonframe'>
            <table className='buttonstyle'>
              <tr>
                    <td>       
                        <Link to="/invoiceAdd" className="nav-link">
                            <p>Issue Invoice</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link to="/invoiceViewAll" className="nav-link">
                            <p>View all Invoices</p>
                        </Link>                 
                    </td>
                </tr>

                <tr>
                    <td>       
                        <Link to="/serviceAdd" className="nav-link">
                            <p>Add a Service</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link to="/services" className="nav-link">
                            <p>View Services</p>
                        </Link>                 
                        </td>
                </tr>



                
            </table>
            </div>
            <table className='table table-striped' style={{width: '54em'}}>                  

                    <tr >

                        <td><b>Service Name</b></td>
                        <td><b>Service Price</b></td>             
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
export default withRouter(ServicesList);