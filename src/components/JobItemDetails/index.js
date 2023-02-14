import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {BsFillEnvelopeFill, BsStar} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {similarJobs: [], jobInfo: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.isLoading,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const similarJobs = data.similar_jobs
      const jobDetails = data.job_details

      const updatedSimilarJobs = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        id: each.id,
        title: each.title,
        rating: each.rating,
        location: each.location,
      }))
      const updatedJob = {
        companyLogoUrl: jobDetails.company_logo_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        id: jobDetails.id,
        title: jobDetails.title,
        rating: jobDetails.rating,
        location: jobDetails.location,
        companyWebsiteUrl: jobDetails.company_website_url,
        lifeAtCompany: jobDetails.life_at_company,
        skills: jobDetails.skills,
        packagePerAnnum: jobDetails.package_per_annum,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        similarJobs: updatedSimilarJobs,
        jobInfo: updatedJob,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  retry = () => {
    this.setState(
      {
        apiStatus: apiStatusConstants.initial,
      },
      this.getItemDetails(),
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <div className="">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure"
        />
        <h1 className="">Oops! Something Went Wrong</h1>
        <p className="">We cannot seem to find the page you are looking for</p>
        <button
          type="button"
          className="button retry"
          onClick={this.getItemDetails}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderSimilarJobs = () => {
    const {similarJobs} = this.state

    return similarJobs.map(each => (
      <li className="similar-item">
        <div className="logo-container">
          <img
            src={each.companyLogoUrl}
            alt="similar job company logo"
            className="similar-image"
          />

          <div className="title-container">
            <h1 className="title">{each.title}</h1>
            <div className="star-container">
              <BsStar className="star" />
              <p className="rating">{each.rating}</p>
            </div>
          </div>
        </div>
        <h1 className="">Description</h1>
        <p className="description">{each.jobDescription}</p>
        <div className="location-container">
          <div className="location-type">
            <div className="location">
              <MdLocationOn />
              <p>{each.location}</p>
            </div>

            <div className="employeeType">
              <BsFillEnvelopeFill />
              <p className="type-job">{each.employmentType}</p>
            </div>
          </div>
        </div>
      </li>
    ))
  }

  renderSuccessView = () => {
    const {jobInfo} = this.state

    const {
      companyLogoUrl,
      employmentType,
      jobDescription,

      rating,
      location,
      title,
      packagePerAnnum,
      companyWebsiteUrl,
      lifeAtCompany,
      skills,
    } = jobInfo

    const updatedSkills = skills.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
    }))
    const updatedLife = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }

    console.log(lifeAtCompany, skills)

    return (
      <div className="job-details-container">
        <li className="item1">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-image"
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
          <div className="description-container">
            <h1 className="cap">Description</h1>
            <a href={companyWebsiteUrl} className="url">
              Visit Site <BiLinkExternal />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="skill-title">Skills</h1>
          <ul className="skills-container">
            {updatedSkills.map(each => (
              <div className="skill-item">
                <img
                  src={each.imageUrl}
                  className="skill-image"
                  alt={each.name}
                />
                <p className="name">{each.name}</p>
              </div>
            ))}
          </ul>
          <h1 className="lif-title">Life at company</h1>
          <div className="life-container">
            <p className="life-description">{updatedLife.description}</p>
            <img
              src={updatedLife.imageUrl}
              className="life-image"
              alt="life at company"
            />
          </div>
        </li>
        <h1 className="">Similar Jobs</h1>
        <ul className="similar-item-container">{this.renderSimilarJobs()}</ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.isLoading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="item-container">
        <Header />
        {this.renderItems()}
      </div>
    )
  }
}

export default JobItemDetails
