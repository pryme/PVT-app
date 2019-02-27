# TODO:
* Allow to change and show settings:
    * Need to show 'settings' button (or gear) except on running and settings view
    * On settings view, need to show 'done' or 'done with settings' and not 'reset all'
    * Need a mechanism to save settings for user. This doesn't happen right now. 
* Save data, recall historical data, export data:
    * Assume saving JSON stringified data
    * What to save? Ideas:
        * User ID (unique) (1st key)
            * User name ('firstName' + ' ' + 'lastName')
            * User preferred settings
            * User tests:
                * UID-timestamp (2nd key): JSON object string
                * UID-timestamp (2nd key): JSON object string
                * UID-timestamp (2nd key): JSON object string
    * What form for test data?:
        * {UID-timestamp: {UserInfo: {}, RTdata: {}, Analytics: {} }}
* How does User ID get assigned first time? New account mechanism...
    * AddNewUser component
    * change test header to offer dropdown list of users with accounts

* Need to change view state machine:
    * From "header, ready, running, done, settings" 
    * To: "get user, header, ready, running, done, settings"
    * Get user state will have two views: default with dropdown list and exception for new user. But state will not change. When user is selected state will change to header.



* Graph data?
* Validate accuracy, offset of timer (needs setup):
    * Develop optical "stimulus start" detector
    * Develop reaction sensor to parallel mouse click
* Evaluate effect of clamscan running concurrently
* Gaming mouse? (check prices of gaming mice)a
* Does "reset all" restore default settings? Should it?

# Structure of app:
* App runs one test consisting of 1-to-many ResponseTimer measurements
* One ResponseTimer measurement is:
  * Random delay before stimulus is presented
  * Stimulus which is a ms upcounter
  * Response time result taken at click event
* Each response time result is stored as data (online only later, maybe)
  * Result can be ms value, or termination code (timeout)
* The ResponseTimer must be reset before another measurement can happen
* A test stops because either:
  * User clicked stop test button OR
  * Preset test duration expired
* After all ResponseTimer measurements are collected, test results will be:
  * Number of trials (online ok)
  * Test duration (online ok)
  * Mean / median / trimmed response time (online??? esp median & trimmed)
  * SD (or CV) response time (online ok)
  * Range response time (online ok)
  * Number of lapses (online ok)
  * Number of false alarms (online ok)
  * Test date and time of day (local)
  * All subject data
  * All settings
* After test stops: 
  * Results are displayed
  * Results are saved somehow....TODO
* User can adjust settings
  * Test duration (s)
  * Max delay interval (s)
  * False alarm threshold (ms)
  * Lapse threshold (ms)
  * Timeout threshold (s)
* User can input / adjust subject data
  * Subject data defaults to same as previous test (unless noted)
  * Subject name
  * Subject comments about perceived sleep deficit? (defaults empty)

# ResponseTimer state:
* msElapsed (this is the result time)
* stimulus start time (or date): reference for elapsed time

# PVTTest state:
* stage (state machine: ready, running, done)
* rtDone (signal that ResponseTimer finished)
* testStart (mark start of test duration)
* All settings (should this be separate component?)
* All subject data (should this be separate component?)
* Results (what form?)

# Results data storage:
* Let's start only concerned with data from a single test:
  * store in sessionStorage or localStorage as array of RT measurements
  * Ex: [430, 258, 333]
  * need to JSON.stringify and JSON.parse (localStorage is string only)
