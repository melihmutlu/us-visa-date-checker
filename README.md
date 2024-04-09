##
Bot to periodically check available dates for USA visa appointment.
##

### How to use:
#### Prerequisites: npm and Node.js

- Run ``npm install`` to install dependencies
- If you want to disable email notifications, update "start" script in *package.json* as follows: \
  ``node ./index.js true``
- Create *.env* file under the root directory to configure the bot: 

  An example *.env* would look like:˜
  ```
  USERNAME = <EMAIL ADDRESS USED IN VISA APPOINTMENT SERVICE>
  PASSWORD = <PASSWORD VISA APPOINTMENT SERVICE>
  # Find your schedule id in the link for your application
  # https://ais.usvisa-info.com/en-tr/niv/schedule/<SCHEDULE_ID>/appointment
  SCHEDULE_ID = <SCHEDULE_ID>
  CITY_CODE = <IST or ANK>
  CURRENT_APPOINTMENT_DATE =  <CURRENT APPOINTMENT DATE as YYYY-MM-DD>
  
  #EMAIL NOTIFICATIONS (OPTIONAL)
  # If you're using Gmail and want to enable notifications, you need to
  # enable 2FA first. Then follow the link: https://myaccount.google.com/apppasswords
  EMAIL = <EMAIL ADDRESS TO GET NOTIFICATIONS>
  EMAIL_PASS = <EMAIL PASSWORD>
- Run ``npm start``

### Notes
1. Email notifications currently works only with Gmail. You should generate an app password to use it as `EMAIL_PASS`. The generated password may include spaces or '-', such characters should be removed before using it.
2. It's not guaranteed that the bot can book whenever it finds an available date. The bot may miss the date when it attempts to book an appointment.
3. Not every booking attempt will be successful, but the bot notify you as if it was a success. To be sure, check your appointment date on US Visa Application system when you receive a booking notification.
