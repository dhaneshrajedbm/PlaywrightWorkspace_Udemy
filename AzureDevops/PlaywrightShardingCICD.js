
/* *********Playwright Sharding*********

Playwright By default do the execution parallely on the same Machine fof faster execution

We can even make excution faster By splitting tests into diff parts and execute them on 
multiple github virtual machines simultaniously. this mode of op'n is called as Sharding.
Each shard act as separate job and run independantly.
so it speed up execution by utilizing available CPU cores

Suppose there are 20 test cases and we are configured 4 Shards  and 5 workers then test cases
 divided into 4  and  5 test cases run on each of  4 virtual machines/shards simultaniously
 each shard will do separate job
worker=5 means - 5 tests are run parallely on each virtual machine


Difference bet Azure cloud and gihub sharding

 common thing is- both will do execution  on different virtual machines and parallely on workers
suppose thetre are 4 vm's then each vm has its own execution report

1. In this case Azure cloud will  collect all the report from each vm and provide consolidated singel report
   for this we no need to write extra commands or jobs in .Yml file
2. But for Github Sharding - we need to write extra cmds or job to consolidate the reports

3. Aure cloud automatically download dependancies, browsers and provides inbuilt playwright 
   environment in azure server virtual machines. no need to write the cmds in .yml file
 
4. But for Github sharding we have to write exrtra cmds for download browsers

******** Playwrite Sharding.yml file ****************

name: Playwright Tests
on:
  push:
    branches: [ main, master,septCut ]
  pull_request:
    branches: [ main, master ]
 
jobs:

  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest         // github clone all code to Ubuntu machine and executes
                                   // the fillowing cmds

  #  container:
    #  image: mcr.microsoft.com/playwright:v1.49.0-noble

    strategy:                    // Here we define the shards
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]  // Total 4 shards or 4 Virtual machines are configured 
        shardTotal: [4]

    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: lts/*

      - name: Install dependencies       // here it install all package.json dependancies and browsers//
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
 
      - name: Run Playwright tests (shard)   // Cmd to run the tests on shards
        run: >
          npx playwright test --config=playwright.config.js --workers=4
          --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
          --reporter=blob
 
      - name: Upload blob report
        if: ${{ !cancelled() }}
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: blob-report/
          retention-days: 1
 
  merge-reports:              // extra job for merge/consolidate reports
    if: ${{ !cancelled() }}
    needs: [test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
 
      - name: Download blob reports
        uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true
 
      - name: Merge into HTML report
        run: npx playwright merge-reports --reporter html ./all-blob-reports
 
      - name: Upload final HTML report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

*/