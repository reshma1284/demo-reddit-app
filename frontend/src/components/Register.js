import React from 'react';
import axios from 'axios';
import Message from './Message';


class Register extends React.Component{
  constructor(props){
    super(props);

    this.state = {
        frmData: {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        msg: {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        success: ''
  }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();

      this.setState({
        success: ''
      });
      let _this = this;

      axios.post('/reddit/register', this.state.frmData)
      .then(function(response){
        //console.log(response);
        _this.setState({
          msg: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          },
          success: <Message text="Thanks for your Registration" />
        });
      })
      .catch(function(error){
        console.log(error);
        if(error.response) {
          let mainErrors = error.response.data.errors,
          msg = {
              name: mainErrors.name ? mainErrors.name.msg : '',
              email: mainErrors.email ? mainErrors.email.msg : '',
              password: mainErrors.password ? mainErrors.password.msg : '',
              confirmPassword: mainErrors.confirmPassword ? mainErrors.confirmPassword.msg : ''
          };
          this.setState({
            msg: msg
          });
        }
      }.bind(this));
  }

  handleInputChange(event){
    var temp = this.state.frmData;
    temp[event.target.name] = event.target.value
    this.setState({
      frmData:  temp
    })
  }

  render(){
    return(

      <div id="register-details">
        <h1> Register </h1>

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="inputName"> Name </label>
                <input onChange={this.handleInputChange} type="text" value={this.state.name}  className="form-control" id="InputName" aria-describedby="emailHelp"
                    name="name"   placeholder="Enter Name" />
                <span className="text-danger"> {this.state.msg.name} </span>
              </div>

               <div className="form-group">
                 <label htmlFor="RegInputEmail1">Email address</label>
                 <input onChange={this.handleInputChange} type="email"  value={this.state.email} className="form-control" id="RegInputEmail1" aria-describedby="emailHelp"
                    name="email" placeholder="Enter email" />
                    <span className="text-danger"> {this.state.msg.email} </span>
               </div>

               <div className="form-group">
                 <label htmlFor="RegInputPassword1">Password</label>
                 <input type="password"  value={this.state.password} onChange={this.handleInputChange} className="form-control" id="RegInputPassword1"
                    name="password" placeholder="Password" />
                  <span className="text-danger"> {this.state.msg.password} </span>
               </div>

               <div className="form-group">
                 <label htmlFor="RegInputPassword2">Confirm Password</label>
                 <input type="password"  value={this.state.confirmPassword} onChange={this.handleInputChange} className="form-control" id="RegInputPassword2"
                      name="confirmPassword" placeholder="Password" />
                  <span className="text-danger"> {this.state.msg.confirmPassword} </span>
               </div>

               <button type="submit" className="btn btn-primary">Register</button>

          </form>
              {this.state.success}
        </div>
    )
  }
}


export default Register;
