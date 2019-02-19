/*******Refactor*******************************
Structure of app:
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
***************************************/
/**************************************
ResponseTimer state:
* msElapsed (this is the result time)
* stimulus start time (or date): reference for elapsed time
***************************************/
/**************************************
PVTTest state:
* stage (state machine: ready, running, done)
* rtDone (signal that ResponseTimer finished)
* testStart (mark start of test duration)
* All settings (should this be separate component?)
* All subject data (should this be separate component?)
* Results (what form?)
***************************************/
/*************************************
Results data storage:
* Let's start only concerned with data from a single test:
  * store in sessionStorage or localStorage as array of RT measurements
  * Ex: [430, 258, 333]
  * need to JSON.stringify and JSON.parse (localStorage is string only)

TODO:
* Save data, recall historical data, export data?
* Graph data?
* -/ Expand false starts to capture very low RT (say, <100 ms)
* Validate accuracy, offset of timer (needs setup)
* Evaluate effect of clamscan running concurrently
* Gaming mouse?
* -/ Move off CodePen to local machine
* Allow to change and show settings