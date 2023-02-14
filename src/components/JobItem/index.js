import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsFillEnvelopeFill, BsStar} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {item} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    rating,
    location,
    title,
    packagePerAnnum,
  } = item

  return (
    <Link to={`/jobs/${id}`} className="nav-item">
      <li className="item">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="companyLogo"
          />

          <div className="title-container">
            <h1 className="title">{title}</h1>
            <div className="star-container">
              <BsStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-container">
          <div className="location-type">
            <div className="location">
              <MdLocationOn />
              <p>{location}</p>
            </div>

            <div className="employeeType">
              <BsFillEnvelopeFill />
              <p className="type-job">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>

        <hr className="line" />
        <h1>Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
