import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isStarredBtnClicked: false,
  }

  addNewAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: v4(),
      titleInput,
      dateInput,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onInputTextChange = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({
      dateInput: format(new Date(event.target.value), 'dd MMMM yyyy, EEEE'),
    })
  }

  onChangeStartBtn = () => {
    this.setState(prevState => ({
      isStarredBtnClicked: !prevState.isStarredBtnClicked,
    }))
  }

  onChangeStatus = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {
      appointmentList,
      titleInput,
      dateInput,
      isStarredBtnClicked,
    } = this.state

    const resultantAppointmentList = isStarredBtnClicked
      ? appointmentList.filter(eachItem => eachItem.isStarred === true)
      : appointmentList

    const starredBtnClassName = isStarredBtnClicked
      ? 'star-btn-class-name'
      : null

    return (
      <div className="bg-container">
        <div className="add-appointment-card">
          <div className="form-card">
            <form onSubmit={this.addNewAppointment}>
              <h1 className="appointment-heading-ele">Add Appointment</h1>
              <label className="label-ele" htmlFor="title">
                TITLE
              </label>
              <br />
              <input
                type="text"
                placeholder="Title"
                id="title"
                className="input-ele"
                value={titleInput}
                onChange={this.onInputTextChange}
              />
              <br />
              <label className="label-ele" htmlFor="date">
                DATE
              </label>
              <br />
              <input
                type="date"
                id="date"
                value={dateInput}
                className="input-ele"
                onChange={this.onChangeDate}
              />
              <br />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>
          <hr />
          <div className="heading-and-btn-ele-card">
            <h1 className="heading-ele">Appointments</h1>
            <button
              type="button"
              className={`starred-btn ${starredBtnClassName}`}
              onClick={this.onChangeStartBtn}
            >
              Starred
            </button>
          </div>
          <ul className="ul-container">
            {resultantAppointmentList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointmentDetails={eachItem}
                changeStartBtnStatus={this.onChangeStatus}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
