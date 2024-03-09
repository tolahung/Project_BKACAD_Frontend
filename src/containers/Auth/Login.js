import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import  { handleLoginApi }  from '../../services/userService';




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPass:false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value);
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value);
    }


    // Login 
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try{
            let data = await handleLoginApi(this.state.username, this.state.password);
            if(data && data.errCode!== 0){
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0){
                // userLoginSuccess(data.user);
                this.props.userLoginSuccess(data.user);
                console.log('log in success');
            }
        }catch(error){
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('hoidanit', error.response);
        
        }
    }

    //show passw
    handleShowPass = ()=>{
       this.setState({
        isShowPass: !this.state.isShowPass
       })
    }


    render() {
        //JSX
        return (
            <div className='login-backround'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Email:</label>
                            <input type='text' value={this.state.username} className='form-control' placeholder='Enter your Email' onChange={(e) => this.handleOnChangeUsername(e)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPass ? 'text' : 'password'} value={this.state.password} className='form-control' placeholder='Enter your password' onChange={(e) => { this.handleOnChangePassword(e) }} />
                                <span onClick = {() => { this.handleShowPass() }}>
                                    <i className= {this.state.isShowPass ? 'fas fa-eye': 'fas fa-eye-slash'}></i>
                                </span>
                            </div>

                        </div>
                        <div className = "col-12" style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='other-login'>Or Login with</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook' ></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
