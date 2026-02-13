# NHL Rank [![Run Cron](https://github.com/ethancoote/NHL-rank/actions/workflows/run-cron.yml/badge.svg)](https://github.com/ethancoote/NHL-rank/actions/workflows/run-cron.yml) [![Deploy to Pages](https://github.com/ethancoote/NHL-rank/actions/workflows/deploy.yml/badge.svg)](https://github.com/ethancoote/NHL-rank/actions/workflows/deploy.yml)

This app had no association with the NHL.

https://ethancoote.github.io/NHL-rank/

## Table of Contents

[Overview](#overview)<br>
[Algorithm](#algorithm)<br>
[Cron](#cron)

## Overview

This app is used to remove the biases of the NHL point system. 

The elo algorithm allows for a more accurate comparison of team strength. The NHL point system is biased towards teams in weaker divisions, as well as teams that reach overtime more often. The elo algorithm removes those biases by being zero-sum, and deciding points based on relative strength of opponents.

## Algorithm

### Win Probability

The elo algorithm first determines the expected probability of each team winning.

```
homeWinProbability = 1 / (1 + 10**( (awayTeamElo - homeTeamElo) / 400) )
awayWinProbability = 1 / (1 + 10**( (homeTeamElo - awayTeamElo) / 400) )
```

The value of 400 determines the point discrepancy indicating a 10 to 1 advantage (~ 91%). This means that a 200 point discrepancy indicates a roughly 3 to 1 advantage (~75%).

### Elo Algorithm

Next we have some variables:

```
winPoints = 1
losePoints = 0
k = 32 
```

The winPoints and losePoints variables act as percentages. In this case, the winner earns 100% of available points, and the loser earns 0% of available points.

The 'k' value determines the maximum points that a team can earn from a single win. A 'k' value of 32 will allow teams to gain/lose points at a moderately fast rate. A value of 32 is used due to the relatively small sample size of a single NHL season.

If the home team were to win, the final algorithm would look like this:

```
homeNewElo = homeElo + k * (winPoints - homeWinProbability)
awayNewElo = homeElo + k * (losePoints - awayWinProbability)
```

### Overtime

If teams reach overtime variables become:

```
winPoints = 0.8
losePoints = 0.2
```

A team earns 80% of points for an overtime win, and 20% of points for an overtime loss. Therefore, an overtime win is worth less points than a regulation win. This is necessary to prevent rating inflation.

The NHL point system awards more points when teams reach overtime, creating a bias towards teams that reach overtime more often. The elo system removes this bias.

## Cron

The ```updateStats()``` function runs everyday at 10:00am UTC. Team stats are updated and the site is redeployed with new, static files.