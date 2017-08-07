## Stocks Profiler App

An application that measures risks for a given stock ticker based on its
stock prices from last 1 year. The data is read using Quandl.com's free tier 
API. The stock markets covered are NSE, BSE and US Stocks (Quandl's API 
doesn't provide US stock market specific data). Please follow the ticker format 
to use as explained in their website. For eg. GOOGL for US Stocks, BOM511389
for BSE, INFY for NSE, etc.

The two risk metrics it computes are explained below. 

## Risk 1

Its value is the variance of stock prices over the last 52 weeks.

## Risk 2

This metric provides a picture of decreasing/increasing trend of a stock over
the last 52 weeks.

For a given time period of n weeks, we compute the percentage increase in
stock price for that period i.e. we consider only the first and last week's 
stock prices for that period. The percentage is returned upto 2 decimal places.

In order to capture trends, the period of last 1 year is split into 4 quarters 
and percentage increase or decrease is computed individually for each quarter.
This metric also tries to take recency bias into consideration. For this
purpose, weightages are assgined to the computed percentages from the most 
recent to least recent quarter as - 40%, 30%, 20%, 10% respectively.
Overall trend is calculated using weightages for the individual trends.

A higher value of negative percentage inidicates an overall decreasing trend 
in stock prices.

## How to use

After cloning the repository, run npm install from root directory. Then in
terminal, run following command

node server.js

The application can be accessed from browser at localhost:3000.

