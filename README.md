##
Bot to periodically check available dates for USA visa appointment.
##

### How to use:
#### Prerequisites: npm and Node.js

- Run ``npm install`` to install dependencies
- If you want to disable email notifications, update "start" script in *package.json* as follows: \
  ``node ./index.js true``
- Create *.env* file under the root directory to configure the bot: 

  An example *.env* would look like:
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
