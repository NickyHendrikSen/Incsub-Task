import React from 'react';

class Dummy extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        message: props.message
    }
  }

  render(){
    return (
      <div className="Dummy">
          This is a dummy view for ({this.state.message})
      </div>
    );
  }
}

export default Dummy;
