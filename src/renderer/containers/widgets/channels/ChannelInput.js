import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChannelInputComponent from '../../../components/widgets/channels/ChannelInput'
import channelHandlers from '../../../store/handlers/channel'
import channelSelectors from '../../../store/selectors/channel'

export const mapStateToProps = (state, { contactId }) => {
  return {
    message: channelSelectors.message(state),
    inputState: channelSelectors.inputLocked(state)
  }
}

export const mapDispatchToProps = (dispatch, { contactId }) => {
  return bindActionCreators(
    {
      onChange: channelHandlers.actions.setMessage,
      sendOnEnter: channelHandlers.epics.sendOnEnter
    },
    dispatch
  )
}
export const ChannelInput = ({ onChange, sendOnEnter, message, inputState }) => {
  const [infoClass, setInfoClass] = React.useState(null)
  return (
    <ChannelInputComponent
      infoClass={infoClass}
      setInfoClass={setInfoClass}
      onChange={onChange}
      onKeyPress={sendOnEnter}
      message={message}
      inputState={inputState}
    />
  )
}

ChannelInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputState: PropTypes.number.isRequired,
  message: PropTypes.string
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelInput)
