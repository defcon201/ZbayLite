import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { typeFulfilled, typeRejected, typePending, errorNotification } from './utils'
import nodeSelectors from '../selectors/node'
import identityHandlers from './identity'
import notificationsHandlers from './notifications'

import vault from '../../vault'

export const VaultState = Immutable.Record({
  exists: false,
  creating: false,
  unlocking: false,
  creatingIdentity: false,
  locked: true,
  error: ''
}, 'VaultState')

export const initialState = VaultState()

export const actionTypes = {
  CREATE: 'CREATE_VAULT',
  SET_STATUS: 'SET_VAULT_STATUS',
  UNLOCK: 'UNLOCK_VAULT',
  CREATE_IDENTITY: 'CREATE_VAULT_IDENTITY',
  CLEAR_ERROR: 'CLEAR_VAULT_ERROR'
}

const createVault = createAction(actionTypes.CREATE, vault.create)
const unlockVault = createAction(actionTypes.UNLOCK, vault.unlock)
const createIdentity = createAction(actionTypes.CREATE_IDENTITY, vault.identity.createIdentity)
const clearError = createAction(actionTypes.CLEAR_ERROR)
const setVaultStatus = createAction(actionTypes.SET_STATUS)

export const actions = {
  createIdentity,
  createVault,
  unlockVault,
  setVaultStatus,
  clearError
}

const loadVaultStatus = () => (dispatch, getState) => {
  const network = nodeSelectors.network(getState())
  return dispatch(setVaultStatus(vault.exists(network)))
}

const createVaultEpic = ({ name, password }, formActions) => async (dispatch, getState) => {
  const network = nodeSelectors.network(getState())
  try {
    await dispatch(createVault({ masterPassword: password, network }))
    await dispatch(actions.unlockVault({
      masterPassword: password,
      createSource: true,
      network
    }))
    const identity = await dispatch(identityHandlers.epics.createIdentity({ name }))
    await dispatch(identityHandlers.epics.setIdentity(identity))
  } catch (error) {
    console.log(error)
    dispatch(notificationsHandlers.actions.enqueueSnackbar(
      errorNotification({ message: `Failed to create channel: ${error.message}` })
    ))
  }
  formActions.setSubmitting(false)
}

export const epics = {
  loadVaultStatus,
  createVault: createVaultEpic
}

export const reducer = handleActions({
  [typePending(actionTypes.CREATE)]: state => state.set('creating', true),
  [typeFulfilled(actionTypes.CREATE)]: state => state.merge({
    creating: false,
    exists: true
  }),
  [typeRejected(actionTypes.CREATE)]: (state, { payload: error }) => state.merge({
    creating: false,
    error: error.message
  }),

  [typePending(actionTypes.UNLOCK)]: state => state.set('unlocking', true),
  [typeFulfilled(actionTypes.UNLOCK)]: (state, payload) => state.merge({
    unlocking: false,
    locked: false
  }),
  [typeRejected(actionTypes.UNLOCK)]: (state, { payload: error }) => state.merge({
    unlocking: false,
    locked: true,
    error: error.message
  }),

  [typePending(actionTypes.CREATE_IDENTITY)]: state => state.set('creatingIdentity', true),
  [typeFulfilled(actionTypes.CREATE_IDENTITY)]: state => state.set('creatingIdentity', false),
  [typeRejected(actionTypes.CREATE_IDENTITY)]: (state, { payload: error }) => state.merge({
    creatingIdentity: false,
    error: error.message
  }),
  [setVaultStatus]: (state, { payload: exists }) => state.set('exists', exists),
  [clearError]: state => state.delete('error')
}, initialState)

export default {
  actions,
  epics,
  reducer
}