import PropTypes from 'prop-types'

function Title(props) {
  if (props.type === 'h1') {
    return (
      <h1 className={`${'text text_type_main-large'} ${props.style}`}>
        {props.title}
      </h1>
    )
  } else if (props.type === 'h2') {
    return (
      <h2 className={`${'text text_type_main-medium'} ${props.style}`}>
        {props.title}
      </h2>
    )
  } else if (props.type === 'h2_digits') {
    return (
      <h2 className={`${'text text_type_digits-large'} ${props.style}`}>
        {props.title}
      </h2>
    )
  }
}

export default Title

Title.propTypes = {
  style: PropTypes.string,
  type: PropTypes.string.isRequired,
}
