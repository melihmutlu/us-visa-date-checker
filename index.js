#!/usr/bin/env node

import * as helper from "./helpers.js";
import * as booker from "./booking-utils.js";
import * as email from "./email-handler.js";
import * as configs from "./configs.js";


async function main(currentBookedDate) {
  if (!currentBookedDate) {
    helper.log(`Invalid current booked date: ${currentBookedDate}`)
    process.exit(1)
  }

  if (configs.FACILITY_ID != 125 && configs.FACILITY_ID != 124){
    helper.log(`Invalid facility ID`)
    process.exit(1)
  }

  var transporter = null
  if (isNotifEnabled){
    transporter = email.prepareMailSender()
  }  

  helper.log(`Initializing with current date ${currentBookedDate}`)
  while(true) {

    try {
      const sessionHeaders = await booker.login()
      const date = await booker.checkAvailableDate(sessionHeaders)

      if (!date) {
        helper.log('No available date')
      } else if (date > currentBookedDate) {
        helper.log(`Closest available date is further than the already booked date (${currentBookedDate} vs ${date})`)
      } else {
        helper.log(`Closer date found: ${date}`)
        
        if(date < latestBookedDate){
          // Recheck to avoid notifying unnecessarily
          //
          // Rechecking here might be unnecessary depending on the situation. The
          // bot often cannot book the date even if it consider the date as
          // available. To reduce the notification noise, double-chech the date.
          var recheck = await booker.checkAvailableDate(sessionHeaders)
          helper.log(`Rechecked the closest date and found: ${recheck}`)
          if(recheck <= date){
              
              if (isNotifEnabled)
                email.sendMail(transporter,
                  "Closer Date Found for US Visa Appointment",
                  `${date}`)
              
              const time = await booker.checkAvailableTime(sessionHeaders, date)
              booker.book(sessionHeaders, date, time)
                .then(res => helper.log(res))
                .then(d => helper.log(`Booked time at ${date} ${time}`))
                .then(d => email.sendMail(transporter, "Booked a New Appointment Date", `${date}:${time}`))
              
              // We should ideally update the latestBookedDate at this point.
              // However, the booking request returns "success" even if it
              // cannot book the date. So maybe don't trust book() and don't
              // update latestBookedDate to be safe.
              // You might want to CURRENT_APPOINTMENT_DATE in .env and restart,
              // if booking was successful.

              //latestBookedDate = date
          }
        }
      }
    } catch(err) {
      console.error(err)
      helper.log("Trying again...")
    }
    
    await helper.sleep(60)
  } 
}

const args = process.argv.slice(2);
const isNotifEnabled = args[0].toLowerCase() === "true" ? true : false

var latestBookedDate = configs.CURRENT_APPOINTMENT_DATE;
main(latestBookedDate)