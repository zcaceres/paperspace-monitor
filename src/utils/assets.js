/* global chrome */

function getBundledResource (url) {
  return chrome.runtime.getURL(url)
}

module.exports = getBundledResource
