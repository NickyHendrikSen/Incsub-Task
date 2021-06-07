import './StepThree.scss';
import React from 'react';

class StepThree extends React.PureComponent{
  constructor(props){
    super(props)
    this.wrapper = React.createRef();
   
  }

  render(){
    return (
      <div className="StepTwo" ref={this.wrapper}>
        <div className="StepTwoWrapper">
          <button className="BtnActive" onClick={this.props.submitStepThree}>Submit</button>
        </div>
      </div>
    );
  }
}

export default StepThree;
