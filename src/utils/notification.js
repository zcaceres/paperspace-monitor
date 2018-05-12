/* global chrome */

const extensionHelpers = require('extension-helpers').default
const getBundledResource = require('./assets')

const ICON_URL = getBundledResource('assets/paperspace.png')
const show = (message, contextMessage, shouldPersist = true) => {
  return extensionHelpers.notifications.create(null, {
    type: 'basic',
    iconUrl: ICON_URL,
    title: 'Paperspace Alert',
    message,
    contextMessage,
    requireInteraction: shouldPersist
  })
}

chrome.notifications.onButtonClicked.addListener((notifId, buttonIndex) => {
  extensionHelpers.tabs.open('https://www.paperspace.com')
})

module.exports = show
