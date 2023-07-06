# YNABBIT

YNABBIT is a personal project that aims to simplify my workflow when using YNAB.

## The Problem

Sometimes by the time a transaction shows up in YNAB, I forget exactly what it was for.

Sometimes the vendor/payee isn't obvious by the name.

Sometimes I want to split a transaction, but I've forgotten the exact numbers by the time the transaction shows up in YNAB.

## The Solution: Pre-Record Transactions as soon as they happen

- use Salesforce to pre-record transactions via the mobile app, including:
  - Payee
  - Category/Category Group
  - Split Amounts across multiple categories
- use the YNAB API to load the following YNAB data into Salesforce
  - Budget ID
  - Payees
  - Categories
- use Twilio to automatically create pre-recorded transactions in Salesforce

  - set up text message notification via online banking
  - point text message notifications to Twilio number via webhook
  - Twilio webhook calls Salesforce via REST endpoint to create pre-recorded transaction
  - Salesforce mobile app sends notification when a new pre-recorded transaction is created this way
    - Amount and Payee are pre-filled from online banking notification
    - User then categorizes/splits transaction in the pre-recorded transaction interface

- use the YNAB API to update incoming transactions using the data in the pre-recorded transactions
  - sync can be configured to run periodically via Salesforce scheduled jobs
  - sync can also be run on-demand via the YNAB mobile app and iOS Shortcuts

## The Result

When opening the YNAB app, transactions will already be categorized and split, and will just need to be approved
