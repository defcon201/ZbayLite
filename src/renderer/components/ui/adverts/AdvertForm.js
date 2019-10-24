import React from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import * as R from 'ramda'
import { Formik } from 'formik'
import { withStyles } from '@material-ui/core/styles'

import { MESSAGE_SIZE } from '../../../zbay/transit'
import AdvertModal from './AdvertModal'

const styles = theme => ({})

export const formSchema = Yup.object().shape(
  {
    title: Yup.string()
      .max(12)
      .required('Include a title'),
    zec: Yup.number().required('You must enter an amount'),
    usd: Yup.number().required('You must enter an amount'),
    description: Yup.string()
      .max(MESSAGE_SIZE, 'Your messsage is too long')
      .required('Include a description'),
    shippingInfo: Yup.bool().required('Required'),
    background: Yup.string(),
    tag: Yup.string()
      .max(9)
      .min(1)
      .required('Include a tag')
  },
  ['title', 'zec', 'usd', 'description', 'shippingInfo', 'tag']
)

export const AdvertForm = ({
  classes,
  initialValues,
  handleSend,
  handleClose,
  ...props
}) => {
  return (
    <Formik
      enableReinitialize
      validationSchema={formSchema}
      initialValues={{
        ...initialValues
      }}
      onSubmit={(values, { resetForm }) => {
        handleSend({ values })
        resetForm()
        handleClose()
      }}
    >
      {({ values, isValid, submitForm, resetForm, setFieldValue, errors, touched }) => {
        return (
          <AdvertModal
            {...props}
            isValid={isValid}
            values={values}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            submitForm={submitForm}
            handleClose={handleClose}
          />
        )
      }}
    </Formik>
  )
}

AdvertForm.propTypes = {
  classes: PropTypes.object.isRequired,
  initialValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    zec: PropTypes.string.isRequired,
    usd: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    shippingInfo: PropTypes.bool.isRequired
  }).isRequired,
  handleSend: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

AdvertForm.defaultProps = {
  initialValues: {
    title: '',
    zec: '',
    usd: '',
    description: '',
    shippingInfo: false,
    background: '98c9e4113d76a80d654096c9938fb1a3.svg',
    tag: ''
  }
}

export default R.compose(
  React.memo,
  withStyles(styles)
)(AdvertForm)