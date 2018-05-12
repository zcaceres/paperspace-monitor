const axios = require('axios');
const { notifications } = require('./utils');
const extensionHelpers = require('extension-helpers').default
const ALARM_NAME = 'paperspace';

function getCookie(key) {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({ url: 'https://www.paperspace.com', name: key }, (cookie) => {
      if (chrome.runtime.lastError || !cookie) return reject(chrome.runtime.lastError || new Error('Could not access Paperspace'))
      return resolve(cookie.value);
    })
  });
}

function checkMachines(userId, jwt) {
  return axios.get(`https://api.paperspace.io/notebooks/getNotebooks?access_token=${jwt}&&modelId=${userId}&modelName=user&filter=%7B%22filter%22%3A%7B%22limit%22%3A11%2C%22offset%22%3A0%2C%22where%22%3A%7B%22dtDeleted%22%3Anull%7D%7D%7D&clusterId=`, { withCredentials: true })
    .then(res => res.data);
}

function checkNotebooks(userId, jwt) {
  return axios.get(`https://api.paperspace.io/accounts/user/${userId}/getMachineList?access_token=${jwt}`, { withCredentials: true })
    .then(res => res.data);
}

function checkForInstances() {
  Promise.all([getCookie('jwt'), getCookie('userid')])
  .then(cookies => {
    const [jwt, userId] = cookies;
    return Promise.all([checkMachines(userId, jwt), checkNotebooks(userId, jwt)])
  })
  .then(results => {
    const [machines, notebooks] = results;
    if (machines.runningTotal >= 1 || notebooks.runningTotal >= 1) return notifications('A Paperspace Instance is running!');
  })
  .catch(err => console.error(err));
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) checkForInstances();
})

function every60Minutes() {
  extensionHelpers.alarms.get(ALARM_NAME)
    .then(existingAlarm => {
      if (existingAlarm) return;
      chrome.alarms.create(ALARM_NAME, { when: Date.now(), periodInMinutes: 60 })
    });
}

every60Minutes()
