const express = require('express');
const connect = require('./config/database');
const app = express();

const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comment');

app.listen(3000, async()=>{
     console.log('server started');
     await connect();
     console.log('mongo db connected');

     // const tweet = await Tweet.create({
     //      content:'third tweet',
          
     // });
     // console.log(tweet);

     // const tweets = await Tweet.find({userEmail:'a@b.com'});
     const tweetRepo = new TweetRepository();
     const tweet = await tweetRepo.getWithComments('6760f0bac157da1753dee763');
     // const comment = await Comment.create({content: 'new cpmment'});
     // tweet.comments.push(comment);
     // await tweet.save();
     console.log(tweet);


})