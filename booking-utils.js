import fetch from "node-fetch";
import * as helper from "./helpers.js";
import * as configs from "./configs.js";

const BASE_URI = 'https://ais.usvisa-info.com/en-tr/niv'

export async function login() {
    helper.log(`Logging in`)
  
    const anonymousHeaders = await fetch(`${BASE_URI}/users/sign_in`)
      .then(response => helper.extractHeaders(response))
  
    return fetch(`${BASE_URI}/users/sign_in`, {
      "headers": Object.assign({}, anonymousHeaders, {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      }),
      "method": "POST",
      "body": new URLSearchParams({
        'user[email]': configs.USERNAME,
        'user[password]': configs.PASSWORD,
        'policy_confirmed': '1',
        'commit': 'Sign In'
      }),
    })
      .then(res => (
        Object.assign({}, anonymousHeaders, {
          'Cookie': helper.extractRelevantCookies(res)
        })
      ))
}
  
export function checkAvailableDate(headers) {
    return fetch(`${BASE_URI}/schedule/${configs.SCHEDULE_ID}/appointment/days/${configs.FACILITY_ID}.json?appointments[expedite]=false`, {
        "headers": Object.assign({}, headers, {
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        }),
        "cache": "no-store"
    })
        .then(r => r.json())
        .then(r => helper.handleErrors(r))
        .then(d => d.length > 0 ? d[0]['date'] : null)
}

export function checkAvailableTime(headers, date) {
    return fetch(`${BASE_URI}/schedule/${configs.SCHEDULE_ID}/appointment/times/${configs.FACILITY_ID}.json?date=${date}&appointments[expedite]=false`, {
        "headers": Object.assign({}, headers, {
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        }),
        "cache": "no-store",
    })
        .then(r => r.json())
        .then(r => helper.handleErrors(r))
        .then(d => d['available_times'][0] || d['business_times'][0])
}

export async function book(headers, date, time) {
    const url = `${BASE_URI}/schedule/${configs.SCHEDULE_ID}/appointment`

    const newHeaders = await fetch(url, { "headers": headers })
        .then(response => helper.extractHeaders(response))

    return fetch(url, {
        "method": "POST",
        "redirect": "follow",
        "headers": Object.assign({}, newHeaders, {
        'Content-Type': 'application/x-www-form-urlencoded',
            }),
        "body": new URLSearchParams({
        'utf8': '✓',
        'authenticity_token': newHeaders['X-CSRF-Token'],
        'confirmed_limit_message': '1',
        'use_consulate_appointment_capacity': 'true',
        'appointments[consulate_appointment][facility_id]': configs.FACILITY_ID,
        'appointments[consulate_appointment][date]': date,
        'appointments[consulate_appointment][time]': time
            }),
        })
}
