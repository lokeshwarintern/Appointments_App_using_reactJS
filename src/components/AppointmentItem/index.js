import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, changeStartBtnStatus} = props
  const {id, titleInput, dateInput, isStarred} = appointmentDetails

  const onChangeStarBtn = () => {
    changeStartBtnStatus(id)
  }

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-ele">
      <div className="title-star-btn-card ">
        <h1 className="title-heading">{titleInput}</h1>
        <button
          type="button"
          className="star-btn"
          data-testid="star"
          onClick={onChangeStarBtn}
        >
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="date-para-ele">Date: {dateInput}</p>
    </li>
  )
}

export default AppointmentItem
