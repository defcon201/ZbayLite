import { combineReducers } from 'redux'
import createElectronStorage from 'redux-persist-electron-storage'
import { persistReducer } from 'redux-persist'

import identityHandlers from './handlers/identity'
import notificationsHandlers from './handlers/notifications'
import importedChannelHandlers from './handlers/importedChannel'
import channelHandlers from './handlers/channel'
import channelsHandlers from './handlers/channels'
import nodeHandlers from './handlers/node'
import ratesHandlers from './handlers/rates'
import vaultHandlers from './handlers/vault'
import modalsHandlers from './handlers/modals'
import messagesQueueHandlers from './handlers/messagesQueue'
import directMessagesQueueHandlers from './handlers/directMessagesQueue'
import criticalErrorHandlers from './handlers/criticalError'
import appHandlers from './handlers/app'
import usersHandlers from './handlers/users'
import contactsHandlers from './handlers/contacts'
import directMessageChannelHandlers from './handlers/directMessageChannel'
import invitationHandlers from './handlers/invitation'
import coordinatorHandlers from './handlers/coordinator'
import offersHandlers from './handlers/offers'
import txnTimestampsHandlers from './handlers/txnTimestamps'
import torHandlers from './handlers/tor'
import removedChannelsHandlers from './handlers/removedChannels'
import publicChannelsHandlers from './handlers/publicChannels'
import feesHandlers from './handlers/fees'
import mentionsHandlers from './handlers/mentions'
import whitelistHandlers from './handlers/whitelist'
import notificationCenterHandlers from './handlers/notificationCenter'
import operationsHandlers from './handlers/operations'
import logsHandlers from './handlers/logs'
import ownedChannels from './handlers/ownedChannels'

const reduxStorage = createElectronStorage({ name: 'redux-storage' })
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: [
    'contacts',
    'app',
    'identity',
    'users',
    'channels',
    'vault',
    'offers',
    'removedChannels',
    'publicChannels',
    'ownedChannels',
    'whitelist',
    'txnTimestamps',
    'notificationCenter',
    'rates',
    'importedChannel',
    'fees'
  ]
}
export default persistReducer(
  persistConfig,
  combineReducers({
    users: usersHandlers.reducer,
    app: appHandlers.reducer,
    operations: operationsHandlers.reducer,
    messagesQueue: messagesQueueHandlers.reducer,
    directMessagesQueue: directMessagesQueueHandlers.reducer,
    modals: modalsHandlers.reducer,
    identity: identityHandlers.reducer,
    notifications: notificationsHandlers.reducer,
    importedChannel: importedChannelHandlers.reducer,
    rates: ratesHandlers.reducer,
    channel: channelHandlers.reducer,
    channels: channelsHandlers.reducer,
    node: nodeHandlers.reducer,
    vault: vaultHandlers.reducer,
    criticalError: criticalErrorHandlers.reducer,
    contacts: contactsHandlers.reducer,
    directMessageChannel: directMessageChannelHandlers.reducer,
    invitation: invitationHandlers.reducer,
    coordinator: coordinatorHandlers.reducer,
    offers: offersHandlers.reducer,
    txnTimestamps: txnTimestampsHandlers.reducer,
    tor: torHandlers.reducer,
    removedChannels: removedChannelsHandlers.reducer,
    publicChannels: publicChannelsHandlers.reducer,
    fees: feesHandlers.reducer,
    mentions: mentionsHandlers.reducer,
    whitelist: whitelistHandlers.reducer,
    notificationCenter: notificationCenterHandlers.reducer,
    logsData: logsHandlers.reducer,
    ownedChannels: ownedChannels.reducer
  })
)
