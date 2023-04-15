import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      error: '',
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    console.log('token:', token);
    if (!token) {
      this.setState({ error: 'Token not found in local storage' })
      return
    }

    try {
      const decoded = jwt_decode(token)
      this.setState({
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email,
      })
    } catch (error) {
      this.setState({ error: 'Error decoding token: ' + error.message })
    }
  }

  render() {
    const { error, first_name, last_name, email } = this.state
    if (error) {
      return <div>Error: {error}</div>
    }

    return (
      <div className='container'>
        <div className='jumbotron mt-5'>
          <div className='col-sm8 mx-auto'>
            <h1 className='text-center'>Profile</h1>

            <table className='table col-md-6 mx-auto'>
              <tbody>
                <tr>
                  <td>First Name</td>
                  <td>{first_name} </td>
                </tr>

                <tr>
                  <td>Last Name</td>
                  <td>{last_name} </td>
                </tr>

                <tr>
                  <td>Email</td>
                  <td>{email} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
