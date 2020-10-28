
# 2020-10-19

## Resurrecting the project

* See also [Re-starting?](:/9d6b1e3115f2434dac3243a612ebc91e) (in Joplin).

## TODO - immediate:

-[x] Decide what to do with unsaved changes in working tree and clean up git.
  * decided to commit these changes since the app is working more or less as well as I remember.
-[x] Decide objectives

## Objectives

* Finish the app so it's usable for testing to see if it can detect sleep deprivation. 
* And also so I'll have a finished app I can showcase.

## Thoughts on directions

Biggest things I think are needed are:

* Some sort of better data management capability:
  * Perhaps just export data to csv or Google Drive or ?
* Some sort of validation that the latency of the reaction timer is not so high that it would be insensitive to sleep deprivation effects

## Quick web search for exporting data

Looks like there are packaged solutions out there for exporting to CSV and Excel, at least. May take some time to select an appropriate one.

## Thoughts on validating latency

* Quick check would be to verify that AJR reaction time numbers are better than mine.
* Quantitative check needs to independently measure interval from appearance of prompt on screen to mouse click.
  * One way is to use uC to monitor a light sensor and an accelerometer to pick up the two events. 
  * Possibly could substitute a sensitive microphone for the accelerometer?
  * Possibly light sensor detects prompt, then uC drives servo to click mouse. Assuming this would be faster than human...
  * Possibly video camera with both prompt and mouse finger in FOV, then count frames? Not sure if this is fast enough with regular video? But phone has slow-mo mode...might work.
  * Substitute pressure sensor for accelerometer? https://www.instructables.com/Arduino-Latency-Measurement-Toolkit/
  
So I guess first action here is to search for what light sensors, accelerometers/ mics, and uC's I have around that could be useful.

# 2020-10-20

## More on validating latency, accuracy of reaction time measurement

* The slow motion video method may be feasible. BBR's phone has higher frame rate than mine, but not sure of the exact rate. In a test video with my phone, the first millisecond count displayed was 5--encouraging that there's not a big lag between the counter and the display. My low-res analysis of that video estimated about 20 ms latency between mouse click and final counter display value. But it was low-res.
* So what needs validation?
  * The interval that matters is between first display of prompt and physical mouse click. 
  * Latency between counter value and first display - should be ok as long as first number displayed is consistently low.
  * Accuracy of ms counter would matter and should be validated.
  * Latency between physical mouse click and final counter value (that gets recorded) matters and should be validated. It's possible there could be an offset between final displayed prompt value and the recorded counter value.
* What to do?
  * Verify via slow-mo video that first displayed count is always low.
  * Validate accuracy of the ms counter:
    * One way: set up an automatic way to run the counter for a known period based on system clock. Compare the counter result to the clock time over intervals of various lengths and with various count increments.
  * Decide whether to worry about offset between final displayed prompt value and recorded counter value by running several trials with slow-mo video and comparing final display value to recorded value.
  * Measure latency between physical mouse click and final counter value with slow-mo video. If counter is reasonably accurate, you can just use counter display, as long as you can determine mouse click from video.

## How does ResponseTimer work again?

I don't remember how it works. Maybe need to build a simple test project first to re-learn. After that figure out accuacy and latency.

# 2020-10-28

I haven't been keeping daily notes, but I worked a lot on this over the last 7-8 days. I'm going to summarize the most important findings here before I continue.

## Accuracy of the ms timer is a big concern

First, I built a simplified React version of just a timer with a couple of buttons with no styling and no extra components. I got significantly faster RT measurements, then realized that this probably meant that the "clock" was actually counting *slower*. And I found some bugs that pointed in that direction. 

Then I realized that I had built the "clock" after the pattern of a common online React intro example. In this pattern, `setInterval` is used to call at regular intervals a function which updates the total count. Of course this is stupid for a timer--errors will accumulate and will depend on the increment size and the total duration. So I switched to reading the system clock using `Date.now()` at the beginning and ending of the duration. And sure enough then I got RT values close to my original React app. 

But I'm still concerned. First, published numbers indicate average RT on this sort of test is around 240 ms, plus perhaps 10 or so for my advanced age. With the React app, I'm consistently getting in the high 300s-low 400s. Of course I haven't accounted for mouse/display latency, but published data indicate these should not be more than about 30 ms. So it seems like my RT numbers are still suspiciously high by around 100 ms. Second, I found 2 or 3 sites that offer a simple reaction time test online. On all of these I get in the high 200s, which is much more consistent with published average numbers for adult males. 

I tried to take React out of the equation by writing a separate JS script that runs a simple SRT test with two buttons and the system clock. I loaded it in the index.js page of the React app, which apparently suppressed all the React action. But with this scheme I still get high 300s for RT.

I also tried the React simple app in production mode and it probably made a little improvement, but not enough. And the fact that it made any improvement at all makes me suspicious that a bottleneck still exists somewhere.

Also tried rebooting, etc -- no effect detected.

So where from here...I thought about trying Python, but it's a little bit of a setup hassle, especially to be able to grab mouse clicks, since I haven't Pythoned in quite a while.

## Use a microcontroller to get a trustworthy RT measurement

So I think what I'm going to do first is to make a separate microcontroller test to get the "ground truth" on my RT. Then I'll know how far off the browser versions are. I think I have everything needed to do this:
  
* Adafruit Playground Circuit Express
* Membrane switch (low travel) that I can interface to the PCE
* LED on the PCE to provide stimulus
* Real time clock module if I need it
  
It will require some setup to enable programming of the uC. And I'll have to re-learn a little C++. But it probably won't be worse than the Python route. And the measurements should be much more reliable than the browser ones.

## Other possibilities

* I may not have found the best way to integrate separate JS or Python code with ReactJS. I haven't tried all the ways I've seen mentioned, and I probably don't understand some of those ways yet.
* I could try replacing ReactJS with Svelte, an upcoming framework that claims some advantages that might help.


-------------------------------------------------------------------
# ARCHIVE: Below here are old notes previous episodes with this project

## TODO:
* Editor for saved data? Comment editor only?
* Display utility for saved data belonging to one user?
* Aggregation of saved data (different reps) for one user
* Maybe all above combined:
    * Form with drop-down for user name
    * Selection of user name displays:
        * scrollable table of test results
        * certain aggregates of those results?
        * filterable?
        * sortable?
    * Or maybe, user is selected in current page, but instead of clicking 'Submit' to start test, you click 'View data' to view the above properties?

* JSON repr of date object is just a string. Consider if I should force the string to what I want before stringify...
* How to select data to display / edit? Probably separate problems...:
    * Edit: always exactly one data set (or none)
        * Use selector DD or radio
        * Also a "delete selected one" scenario
    * Display: usually multiple sets
        * Possibly checkboxes, but awkward
        * Possibly just filter / sort capability (not easy)
        * Possibly export to something that has capability?
        * Possibly just display all in scrollable table?
* How about show / hide column?

* Graph data?
* Validate accuracy, offset of timer (needs setup):
    * Develop optical "stimulus start" detector
    * Develop reaction sensor to parallel mouse click
* Evaluate effect of clamscan running concurrently
* Gaming mouse? (check prices of gaming mice)a
* Does "reset all" restore default settings? Should it?

## Thoughts on saving settings
* Should I change the model for settings? Currently the settings object has 4 properties (testDuration, maxWait, validThresh, lapseThresh). 
* Certainly arguable that at least the last 3 props should not routinely be available for user adjustment.
* So maybe a better model is:
    * Have the app always start with fixed default settings, optimized by the developer.
    * Allow adjustment of these settings during a session (until page reloads). This will be primarily for development use.
    * Don't save the set of settings with a user in LS. The last 3 properties and the actual test duration are saved in test results anyway, so it seems rather pointless to save them as a characteristic of a user.



## Thoughts on saving data
### Summarized data
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
                median: {normal: normRT, all: allRT}, 
                settings: {maxWait: val, validMs: val, lapseMs: val}
            }
        },
        T2: {
            datetime: Date, duration: seconds, trials: count, lapses: numLapses, falseStarts: numFalses, RT: {
                mean: {normal: normRT, all: allRT},
                median: {normal: normRT, all: allRT}, 
                settings: {maxWait: val, validMs: val, lapseMs: val}
            }
        }
    }



## Structure of app:
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

## ResponseTimer state:
* msElapsed (this is the result time)
* stimulus start time (or date): reference for elapsed time

## PVTTest state:
* stage (state machine: ready, running, done)
* rtDone (signal that ResponseTimer finished)
* testStart (mark start of test duration)
* All settings (should this be separate component?)
* All subject data (should this be separate component?)
* Results (what form?)

## Results data storage:
* Let's start only concerned with data from a single test:
  * store in sessionStorage or localStorage as array of RT measurements
  * Ex: [430, 258, 333]
  * need to JSON.stringify and JSON.parse (localStorage is string only)
