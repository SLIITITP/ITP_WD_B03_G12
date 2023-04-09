import React, { Component } from 'react'
import { login } from './UserFunction'
import { withRouter } from './withRouter';

class Login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault ();
        alert(`this entered email is : ${this.state.email}`)
        const user ={
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if(res){
                this.props.navigate('/profile');
            }
        })
    }


  render() {
    return (
      <div className='container'>
        <h2>
            <div className='row'>
                <div className='col-md-6 mt-5 mx-auto'>
                    <form noValidate onSubmit={this.onSubmit}>
                        <h1 className='h3 mb-3 font-weight-normal'>
                            <p align="center">Login</p>
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type="email"
                                    className='form-control'
                                    name='email'
                                    placeholder='Enter email'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    ></input>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type="password"
                                    className='form-control'
                                    name='password'
                                    placeholder='Enter password'
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    ></input>
                            </div>

                            <button className='btn btn-lg btn-primary btn-block'>Sign In</button>

                        </h1>
                    </form>
                </div>
            </div>
        </h2>
        
      </div>
    )
  }
}

export default withRouter(Login);