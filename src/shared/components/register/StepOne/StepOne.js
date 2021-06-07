import './StepOne.scss';
import React, { Suspense } from 'react';
import lazy from 'react-lazy-named'
import { Link } from 'react-router-dom'

const Visibility = lazy(() => import('@material-ui/icons/Visibility'))
const VisibilityOff = lazy(() => import('@material-ui/icons/VisibilityOff'))
const TextField = lazy(() => import('@material-ui/core/TextField'))
const OutlinedInput = lazy(() => import('@material-ui/core/OutlinedInput'))
const InputAdornment = lazy(() => import('@material-ui/core/InputAdornment'))
const FormControl = lazy(() => import('@material-ui/core/FormControl'))
const IconButton = lazy(() => import('@material-ui/core/IconButton'))
const InputLabel = lazy(() => import('@material-ui/core/InputLabel'))
const FormHelperText = lazy(() => import('@material-ui/core/FormHelperText'))
const validator = lazy(() => import('validator'))

class StepOne extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      password: {
        value:'',
        error:false,
        helper:'Minimum 8 characters'
      },
      name: {
        value:'',
        error:false,
        helper:''
      },
      email: {
        value:'',
        error:false,
        helper:''
      },
      userType: {
        value:'',
        error:false,
        helper:''
      },
        showPassword: false,
        valid: false
      }
      this.wrapper = React.createRef();
  }
  handleChange = () => (event) => {
    if(event){
      this.setState({[event.target.name]: {value: event.target.value, 
                                          error: this.state[event.target.name].error, 
                                          helper: this.state[event.target.name].helper}});
    }
  };

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword });
  };

  setError(inputName, text, b){
    this.setState({[inputName]: {value: this.state[inputName].value, 
                                        error: b, 
                                        helper: text}});
  }
  validate = () => (event) => {
    console.log("yes")
    var error = false

    //Name
    if(this.state.name.value === ""){
      this.setError('name', "Field can't be empty", true)
      error = true
    }
    else{
      this.setError('name', "", false)
    }

    //email
    if(this.state.email.value === ""){
      this.setError('email', "Field can't be empty", true)
      error = true
    }
    else if(!validator.isEmail(this.state.email.value)){
      this.setError('email', "Please enter a valid email address", true)
      error = true
    }
    else{
      this.setError('email', "", false)
    }

    //userType
    if(this.state.userType.value === ""){
      this.setError('userType', "Field can't be empty", true)
      error = true
    }
    else{
      this.setError('userType', "", false)
    }
    
    //password
    if(this.state.password.value.length < 8){
      this.setError('password', this.state.password.helper, true)
      error = true
    } 
    else{
      this.setError('password', this.state.password.helper, false)
    }

    //If not valid
    if(error){
      this.setState({valid: false})
      return
    }

    //If valid
    this.setState({valid: true})
    
  }
  
  onSubmit = () => (e) => {
    if(this.state.valid === true){
      this.props.submitStepOne(this.state.name.value, this.state.email.value, this.state.userType.value, this.state.password.value)
    }
    e.preventDefault()
  }
  render(){
    const userTypes = [
      {
        value: 'Member',
        label: 'Member'
      },
      {
        value: 'Premium',
        label: 'Premium'
      }
    ]

    return (
      <div className="StepOne" ref={this.wrapper}>
        <div className="StepOneWrapper">
          <div className="Title">Let's set up your account</div>
          <div className="SignInTitle">Already have an account?
            &nbsp;
            <Link to = "/signIn">Sign in</Link>
          </div>
          <div className="StepOneForm">
            <Suspense fallback={<div>Loading...</div>}>
              <form onSubmit={this.onSubmit()}>
                <div className="InputField">
                  <label htmlFor="name">
                    <TextField label="Your name" variant="outlined" fullWidth
                        name="name"
                        error={this.state.name.error}
                        value={this.state.name.value}
                        helperText={this.state.name.helper}
                        onChange={this.handleChange()}
                        onBlur={this.validate()}/>
                  </label>
                </div>
                <div className="InputField">
                  <label htmlFor="email">
                    <TextField label="Email Address" variant="outlined" fullWidth
                        name="email"
                        value={this.state.email.value}
                        error={this.state.email.error}
                        helperText={this.state.email.helper}
                        onChange={this.handleChange()}
                        onBlur={this.validate()}/>
                  </label>
                </div>
                <div className="InputField">
                  <TextField label="I would describe my user type as" variant="outlined" SelectProps = {{native:true}} select fullWidth
                      name="userType"
                      value={this.state.userType.value}
                      error={this.state.userType.error}
                      helperText={this.state.userType.helper}
                      onChange={this.handleChange()}
                      onBlur={this.validate()}>
                      <option value={''} disabled hidden> {/*Default value*/}
                      </option>
                    {userTypes.map((i) => {
                      return(
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      )
                    })}
                  </TextField>
                </div>
                
                <div className="InputField">
                  <FormControl variant="outlined" fullWidth 
                      error={this.state.password.error}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={this.state.password.value}
                      onChange={this.handleChange()}
                      onBlur={this.validate()}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            edge="end"
                          >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                    <FormHelperText>{this.state.password.helper}</FormHelperText>
                  </FormControl>
                </div>
                <button className={this.state.valid === false ? "BtnInActive" : "BtnActive"} type="submit" disabled={this.state.valid === false ? true : false}>Next</button>
              </form>
            </Suspense>
            <div className="StepOneInfo">
                By clicking the "Next" button, you agree to creating a free account, and to&nbsp;
                <Link to="/termsOfService">Terms of Service</Link> and&nbsp;
                <Link to="/privacyPolicy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StepOne;
