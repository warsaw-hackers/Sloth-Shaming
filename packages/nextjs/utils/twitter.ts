
import { exampleTweets } from "./tweets"; // Importing the hardcoded tweets as backup

export const handleTweet = () => {
    let tweetText = generateTweet();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank");
  };

export const generateTweet = () => {
    // Select a random tweet from exampleTweets array
    const randomIndex = Math.floor(Math.random() * exampleTweets.length);
    return exampleTweets[randomIndex];
  };