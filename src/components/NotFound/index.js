import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <div className="inner">
      <div>
        <img
          alt="not found"
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          className="not-found"
        />
        <h1 className="">Page Not Found</h1>
        <p className="cap">
          We are sorry, the page you requested could not be found
        </p>
      </div>
    </div>
  </div>
)

export default NotFound
