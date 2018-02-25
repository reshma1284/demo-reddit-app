import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class EditMessage extends React.Component{

  constructor(props){
    super(props);
  //  console.log(props);

    this.state = {
      successMsg: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();

    var counter = this.props.obj.upVote;
    var incrCounter = counter + 1;

    axios.post('/reddit/upvote',{
      messageId: this.props.obj._id,
      upvoteCounter: incrCounter
    })
    .then(function(response){
      //console.log(response);
      // this.setState({
      //   successMsg: response.message
      // })
      window.location.href = '/feed';
    })
    .catch(function(error){
      console.log(error.response);
    })

  }

  render(){
      //console.log(this.props.obj._id);
      //console.log(this.props.obj.upVote);

      // <Link to={{
      // pathname: '/edit',
      // state: { detail: this.props.obj }
      // }}
    return(
          <ul className="changeMsg">
            <li>
              <form onSubmit={this.handleSubmit}>
                  <input type="submit" value="Upvote" className="btn btn-danger"/>
              </form>
            </li>
          </ul>

          //{this.state.successMsg && <p>{this.state.successMsg}</p>}

  )}
}

export default EditMessage;
