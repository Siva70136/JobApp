import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'
import JobItem from '../JobItem'

import './index.css'
import Header from '../Header'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    search: '',
    empType: employmentTypesList[0].employmentTypeId,
    salaryType: salaryRangesList[0].salaryRangeId,
    profile: [],
  }

  componentDidMount() {
    this.getJobItems()
    this.getProfile()
  }

  getJobItems = async () => {
    const {empType, salaryType, search} = this.state
    console.log(empType, salaryType)
    this.setState({
      apiStatus: apiStatusConstants.isLoading,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${salaryType}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const data1 = data.jobs

      const updatedData = data1.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        id: each.id,
        rating: each.rating,
        location: each.location,
        title: each.title,
        packagePerAnnum: each.package_per_annum,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/profile`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const data1 = data.profile_details

      console.log(data1)
      const updateData = {
        profileImageUrl: data1.profile_image_url,
        shortBio: data1.short_bio,
        name: data1.name,
      }
      this.setState({
        profile: updateData,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  searchJob = event => {
    this.setState({
      search: event.target.value,
    })
  }

  search = () => {
    const {jobsList, search} = this.state
    const searchResults = jobsList.filter(each =>
      each.title.toLowerCase().includes(search.toLowerCase()),
    )

    this.setState({
      jobsList: searchResults,
    })
  }

  noJobs = () => (
    <div className="no-jobs">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs"
      />
      <h1 className="">No Jobs Found</h1>
      <p className="">We could not find any jobs. Try other filters</p>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state

    return (
      <>
        {jobsList.length === 0 ? (
          this.noJobs()
        ) : (
          <ul className="jobs-container">
            {jobsList.map(each => (
              <JobItem item={each} key={each.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  filterSalary = event => {
    this.setState(
      {
        salaryType: event.target.value,
      },
      this.getJobItems,
    )
  }

  filterEmp = event => {
    this.setState({
      empType: event.isChecked,
    })
  }

  renderProfileRoute = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile

    return (
      <div className="profile-container">
        <div className="profile">
          <img src={profileImageUrl} className="profile-img" alt="profile" />
          <h1 className="name">{name}</h1>
          <p className="role">{shortBio}</p>
        </div>
        <h1 className="head">Type of Employment</h1>
        <ul className="employee-type">
          {employmentTypesList.map(each => (
            <li key={each.employmentTypeId}>
              <label htmlFor={each.employmentTypeId}>
                <input
                  type="checkbox"
                  className="emp-type"
                  id={each.employmentTypeId}
                  onChange={this.filterEmp}
                />
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <h1 className="">Salary Range</h1>
        <ul className="employee-type">
          {salaryRangesList.map(each => (
            <li className="salary-item" key={each.salaryRangeId}>
              <label htmlFor={each.salaryRangeId}>
                <input
                  type="radio"
                  className="emp-type"
                  value={each.salaryRangeId}
                  onChange={this.filterSalary}
                  name="salary"
                  id={each.salaryRangeId}
                />
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  retry = () => {
    this.setState(
      {
        apiStatus: apiStatusConstants.initial,
      },
      this.getJobItems(),
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
          onClick={this.getJobItems}
        >
          Retry
        </button>
      </div>
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
    const {empType} = this.state
    console.log(empType)
    return (
      <div className="jobs-container">
        <Header />
        <div className="main-container">
          {this.renderProfileRoute()}
          <div className="job-items">
            <div className="search-container">
              <input
                type="search"
                className="search"
                placeholder="Search"
                onChange={this.searchJob}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.search}
                data-testid="searchButton"
              >
                <BsSearch />
              </button>
            </div>

            {this.renderItems()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
