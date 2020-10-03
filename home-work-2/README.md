# Home work 2

## node promises-microtasks.js

### ​Expected result:

    simple log
    next tick 1
    next tick 2
    queueMicrotask
    Promise
    setTimeout

## node node-vs-browser.js

### Expected result:

    timeout 1
    timeout 2
    promise resolve
    timeout 3
    timeout 4

### Expected result if we change setTimeout -> setImmediate​ and Promise.resolve().then -> process.nextTick

    immediate 1
    immediate 2
    nextTick
    immediate 3
    immediate 4
