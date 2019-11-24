# lyrics-mania

## Description

lyrics-mania is a simple Slack app, that shows random lyrics for an artist in your chat.
It uses [musixmatch](https://developer.musixmatch.com/documentation)'s apis as a source for the lyrics.

## How to use

An api key is needed to perform api request, you can create one [here](https://developer.musixmatch.com/signup).  

Clone the repo and install the dependecies:  
`npm i`  

Start the server locally by running:  
`API_KEY=<your_musixmatch_api_key> npm start`

## Api

### /artist

#### Params
All parameters are send as `x-www-form-urlencoded`.  

|name |type | description|
|---|---|---|
|text|string|the artist name|

Example request:
```
curl -X POST \
  http://localhost:3000/random_lyrics \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'text=Billie%20Eilish'
```

Example output:
```
{
    "title": "my strange addiction",
    "artist": "Billie Eilish",
    "album": "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
    "link": "https://www.musixmatch.com/lyrics/Billie-Eilish-2/my-strange-addiction?utm_source=application&utm_campaign=api&utm_medium=can%27t+be+blank%3A1409618754677",
    "lyrics": "No Billie I haven't done that dance since my wife died\nThere's a whole crowd of people out there\nWho need to learn how to do the Scott\nDon't ask questions you don't wanna know\nLearned my lesson way too long ago\nTo be talking to you, belladonna\nShoulda taken a break, not an oxford comma\nTake what I want when I wanna\nAnd I want ya\n\nBad, bad news\nOne of us is gonna lose\nI'm the powder, you're the fuse\nJust add some friction\n\nYou are my strange addiction\nYou are my strange addiction\nMy doctors can't explain\nMy symptoms or my pain\nBut you are my strange addiction\n\n(I'm really, really sorry, I think I was just relieved)\n..."
}
```
