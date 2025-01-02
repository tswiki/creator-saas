
"use client"

import stream, { DefaultGenerics, FeedAPIResponse } from "getstream";

// const client = stream.connect(process.env.NEXT_PUBLIC_STREAM_KEY!, process.env.USER_TOKEN!);

// const client = stream.connect(
//   process.env.NEXT_PUBLIC_STREAM_KEY!,
//   process.env.USER_TOKEN!,
//   process.env.NEXT_PUBLIC_APP_ID!,
// );

// const userToken = client.createUserToken("the-user-id");

// Initialize the client with your api key, no secret and your app id
const client = stream.connect('zn26zep4m5qk', null, '1355678');

// For the feed group 'user' and user id 'eric' get the feed
// The user token is generated server-side for this user
const ericFeed = client.feed('user', 'eric', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6IioiLCJhY3Rpb24iOiIqIiwiZmVlZF9pZCI6InVzZXJlcmljIn0.uwCYVrfeBUqb9vN7badpoaBUnSb9zKrzqEkU1nxQ8I4');

// Add the activity to the feed
ericFeed.addActivity({
  actor: 'SU:eric',
  tweet: 'Hello world', 
  verb: 'tweet', 
  object: 1
});


2
3
// Let Jessica's flat feed follow Eric's feed
const jessicaFlatFeed = client.feed('timeline', 'jessica', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6IioiLCJhY3Rpb24iOiIqIiwiZmVlZF9pZCI6InRpbWVsaW5lamVzc2ljYSJ9.R3rTNALzsw3CbFXu8BvHaeQeI314S9IqCiK8mZ-wsFQ');
jessicaFlatFeed.follow('user', 'eric');


2
3
4
5
6
7
8
// activities posted on Eric's feed will now flow automatically in Jessica's feed
ericFeed.addActivity({
  actor: 'SU:eric', 
  verb: 'watch', 
  object: 1, 
  youtube_id: 'JNwNXF9Y6kY',
  video_name: 'Star Wars Trailer',
});


2
3
// Read the activities from Jessica's flat feed
jessicaFlatFeed.get({'limit': 3})
  .then(callback);

function callback(value: FeedAPIResponse<DefaultGenerics>): FeedAPIResponse<DefaultGenerics> | PromiseLike<FeedAPIResponse<DefaultGenerics>> {
  throw new Error("Function not implemented.");
}
