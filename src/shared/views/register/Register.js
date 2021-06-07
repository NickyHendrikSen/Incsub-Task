import './Register.scss';
import React, { Suspense, lazy} from 'react';

const StepOne = lazy(() => import('../../components/register/StepOne/StepOne.js'))
const StepTwo = lazy(() => import('../../components/register/StepTwo/StepTwo.js'))
const StepThree = lazy(() => import('../../components/register/StepThree/StepThree.js'))

class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
                step: 1,
                maxStep: 3,
                data: {
                  name: '',
                  email: '',
                  userType: '',
                  password: '',
                },
              }
              
    this.nodeRef = React.createRef(this);
  }

  submitStepOne = (_name, _email, _userType, _password) => {
    this.setState({data: {name: _name, email: _email, userType: _userType, password: _password}})
    this.setState({step: 2})
  }

  submitStepTwo = () => {
    this.setState({step: 3})
  }

  submitStepThree = () => {
    alert("Data that will be sent to the API : \n" +
    "Name : " + this.state.data.name + "\n" +
    "Email : " + this.state.data.email + "\n" +
    "User Type : " + this.state.data.userType + "\n" +
    "Password : " + this.state.data.password + "\n")
    this.setState({isBack: false})
  }

  GetStepComponent = () =>{
    switch (this.state.step) {
      case 1:
        return(
          <StepOne 
          isBack = {this.state.isBack}
          data = {this.state.data}
          submitStepOne = {this.submitStepOne}/>
        )
      case 2:
        return(
          <StepTwo 
            submitStepTwo = {this.submitStepTwo}/>
        )
      case 3:
        return(
          <StepThree 
            submitStepThree = {this.submitStepThree}/>
        )
    
      default:
        return(<div>Error</div>)
    }
  }

  render(){
    
    return (
      <div className="Register" id="RegisterMain">
          <div className="RegisterWrapper">
              <div className="RegisterContent">
                <div className="RegisterStep">
                  <div className="RegisterStepInner">
                    Step {this.state.step} of {this.state.maxStep}
                    <div className="RegisterStepBullet">
                    <span className={ this.state.step === 1 ? 'active-bullet' : 'inactive-bullet' } >&#8226;</span>
                    <span className={ this.state.step === 2 ? 'active-bullet' : 'inactive-bullet' } >&#8226;</span>
                    <span className={ this.state.step === 3 ? 'active-bullet' : 'inactive-bullet' } >&#8226;</span>
                    </div>
                  </div>
                </div>
                <div className="RegisterStepContent">
                <Suspense fallback={<div>Loading...</div>}>
                  <this.GetStepComponent />
                </Suspense>
                </div>
              </div>
              <header className="RegisterHeader">
                <div className="RegisterHeaderWrapper">
                  <a href="#RegisterMain">Dummy Heading</a>
                  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>
              </header>
          </div>
      </div>
    );
  }
}

export default Register;
