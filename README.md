# NHL Rank

This app had no association with the NHL.

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
k = 64 
```

The winPoints and losePoints variables act as percentages. In this case, the winner earns 100% of available points, and the loser earns 0% of available points.

The k value determines the maximum points that a team can earn from a single win. A k value of 64 makes large swings in rating more likely. A value of 64 is used due to the relatively small sample size of a single NHL season.

If the home team were to win, the final algorithm would look like this:

```
homeNewElo = homeElo + k * (winPoints - homeWinProbability)
awayNewElo = homeElo + k * (losePoints - awayWinProbability)
```

### Overtime

If teams reach overtime variables become:

```
winPoints = 0.75
losePoints = 0.25
```

Therefore, an overtime win is worth less points than a regulation win. This is necessary to prevent rating inflation.

The NHL point system awards more points when teams reach overtime, creating a bias towards teams that reach overtime more often. The elo system removes this bias.

## Cron

These functions will run every 24 hours.

```
getDayGameIds() // Gets game ids from yesterday’s games.
runEloAlgo(‘dayGames.json’) // Runs the elo algorithm on yesterday’s games.
getTeamsData() // Gets updated teams data.
getTodaysGames() // Gets the upcoming games for the next day.
```