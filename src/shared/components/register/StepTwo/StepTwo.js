import './StepTwo.scss';
import React from 'react';

class StepTwo extends React.PureComponent{
  constructor(props){
    super(props)
    this.wrapper = React.createRef();
   
  }

  render(){
    return (
      <div className="StepTwo" ref={this.wrapper}>
        <div className="StepTwoWrapper">
          <button className="BtnActive" onClick={this.props.submitStepTwo}>Next</button>
        </div>
      </div>
    );
  }
}

export default StepTwo;
