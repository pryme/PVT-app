# TODO:
* How to save user settings?
    * There is one userSettings object in storage:
        * either empty or with most recent settings values
    * 


* Graph data?
* Validate accuracy, offset of timer (needs setup):
    * Develop optical "stimulus start" detector
    * Develop reaction sensor to parallel mouse click
* Evaluate effect of clamscan running concurrently
* Gaming mouse? (check prices of gaming mice)a
* Does "reset all" restore default settings? Should it?

# Thoughts on saving data
## Summarized data
* Might be good to just create a data object for summarized data. Abstracting the elements from current rev of the app we have:
    * Mean RT (over set of 'normal' and set of 'all' values).
    * Median RT (over set of 'normal' and set of 'all' values).
    * Number of lapses; number of false starts.
    * Number of trials.
    * Test duration.
    * Subject name.
    * Test datetime.
* The test results page currently also shows the individual readings, but I think I will not store these, at least for now.
* So for JS object format:
    * Object to be stored is named `userTests`.
    * userTests = {
        T1: {
            datetime: Date, duration: seconds, trials: count, lapses: numLapses, falseStarts: numFalses, RT: {
                mean: {normal: normRT, all: allRT},
                median: {normal: normRT, all: allRT}
            }
        },
        T2: {
            datetime: Date, duration: seconds, trials: count, lapses: numLapses, falseStarts: numFalses, RT: {
                mean: {normal: normRT, all: allRT},
                median: {normal: normRT, all: allRT}
            }
        }
    }



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
