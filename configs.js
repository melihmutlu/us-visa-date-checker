import dotenv from "dotenv";

dotenv.config()

export var USERNAME = process.env.USERNAME
export var PASSWORD = process.env.PASSWORD
export var SCHEDULE_ID = process.env.SCHEDULE_ID
export var FACILITY_ID = process.env.CITY_CODE == "IST" ? 125 : process.env.CITY_CODE == "ANK" ? 124 : -1
export var CURRENT_APPOINTMENT_DATE = process.env.CURRENT_APPOINTMENT_DATE
export var EMAIL = process.env.EMAIL
export var EMAIL_PASS = process.env.EMAIL_PASS
