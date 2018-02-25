import React from 'react';

class Message extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <h4 className="successMsg"> {this.props.text} </h4>
    )
  }
}

export default Message;
