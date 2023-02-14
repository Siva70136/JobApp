import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isShowError: false, errorMsg: ''}

  returnSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  returnSubmitFailure = errorMsg => {
    this.setState({
      isShowError: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok === true) {
      this.returnSubmitSuccess(data.jwt_token)
    } else {
      this.returnSubmitFailure(data.error_msg)
    }
  }

  renderUserName = () => {
    const {username} = this.state

    return (
      <div className="username-container">
        <label className="label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          className="box"
          placeholder="Username"
          value={username}
          id="username"
          onChange={this.onUsernameChange}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <div className="username-container">
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          className="box"
          placeholder="Password"
          value={password}
          id="password"
          onChange={this.onPasswordChange}
        />
      </div>
    )
  }

  onUsernameChange = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onPasswordChange = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {isShowError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="main-container">
          <div className="login-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
            <form className="login-form" onSubmit={this.onSubmitForm}>
              {this.renderUserName()}
              {this.renderPassword()}
              <button type="submit" className="login-button">
                Login
              </button>
              {isShowError && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
