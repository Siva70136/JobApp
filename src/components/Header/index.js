import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <ul className="nav-menu">
        <div className="logo-container">
          <Link to="/">
            <li className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="logo"
              />
            </li>
          </Link>
        </div>
        <div className="data-container">
          <Link className="nav-item" to="/">
            <li className="nav-link">Home</li>
          </Link>
          <Link className="nav-item" to="/jobs">
            <li className="nav-link">Jobs</li>
          </Link>
        </div>
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
