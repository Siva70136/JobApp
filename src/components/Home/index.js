import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  console.log('hi')

  return (
    <>
      <div className="home-container">
        <Header />
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="description">Millions of people are searching for jobs</p>
        <Link to="/jobs">
          <button type="button" className="find-jobs button">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
