import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
axios.defaults.withCredentials = true;


class Login extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      errorMsg: null,
      msg:{
        emailerr: '',
        passworderr: ''
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    let _this = this;

    axios.post('/reddit/login',{
        email: this.state.email,
        password: this.state.password
    })
    .then(function(response){
        _this.setState({
          msg:{
            emailerr: '',
            passworderr: ''
          }
        })
        if(response.data.status === 'error'){
          _this.setState({errorMsg: response.data.message})
        }
        else{
          //console.log(response.data);
          _this.props.history.push({
            pathname: '/feed',
            state: { detail: response.data }
          });
        }
    })
    .catch(function(error){
      console.log(error);
      if(error.response){
        let mainErrors = error.response.data.errors,
        msg = {
            emailerr: mainErrors.email ? mainErrors.email.msg : '',
            passworderr: mainErrors.password ? mainErrors.password.msg : ''
      };
      this.setState({
        msg:msg
      });
    }
  }.bind(this));
  }

  handleInputChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return(
          <div id="login-details">
              <h1> Login </h1>
              <form onSubmit={this.handleSubmit}>
                 <div className="form-group">
                   <label htmlFor="LogInputEmail1">Email address</label>
                   <input onChange={this.handleInputChange} value={this.state.email} type="email" className="form-control" id="LogInputEmail1"
                      name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                      <span className="text-danger"> {this.state.msg.emailerr} </span>
                 </div>

                 <div className="form-group">
                   <label htmlFor="LogInputPassword1">Password</label>
                   <input onChange={this.handleInputChange} value={this.state.password} type="password" className="form-control"
                     name="password" id="LogInputPassword1" placeholder="Password" />
                     <span className="text-danger"> {this.state.msg.passworderr} </span>
                 </div>

                 <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {this.state.errorMsg &&
                  <p className="errorMsg"> User not found </p>
                  }
        </div>
    )
  }
}

export default withRouter(Login);
