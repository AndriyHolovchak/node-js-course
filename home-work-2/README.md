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

## node next-tick-inside-promise.js

### Expected result:

    next tick 1
    next tick 2
    next tick 3
    promise 1 resolved
    promise 2 resolved
    promise 3 resolved
    promise 4 resolved
    promise 5 resolved
    next tick inside promise
    set timeout
    set immediate 1
    set immediate 2
    set immediate 3
    set immediate 4

## node block-loop-api.js

### Api that blocks event loop

## node non-block-loop-api

### The same non-blocking​ api

## cluster.js

### recreated code from presentations

## node calculate-worker-requests.js

#### It will create cluster with 6 workers and run small server with api to calculate how many requests handled each worker.

### node performs-calls.js

#### it runs script that performs 100 calls to this server

### Expected result:

    Count of handled requests {"worker_[pid]": [count], ...}

## node fibonacci.js

### ​Expected result:

    fib(8) = 21
    fib(13) = 233
    fib(21) = 10946
