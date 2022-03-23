/**
 * @author tony <ashaid2@lsu.edu>
 */

import fetch from "node-fetch";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

let url = new URL("https://polititweet.org/tweets");

for (let i = 1; i <= 113; i++) {
  url.search = new URLSearchParams({
    page: i,
    account: 169686021,
    deleted: "",
    search: "",
  });
  const response = await fetch(url);
  const body = await response.text();

  const { document } = new JSDOM(body).window;

  let pageNode = document.getElementsByTagName("body")[0];
  let tweets = pageNode.getElementsByClassName("box tweet-card");

  let j = 0;
  [...tweets].forEach(() => {
    let targetTweet = tweets[j];
    let tweetText =
      targetTweet.getElementsByClassName("small-top-margin")[0].textContent;

    tweetText = tweetText.trim();
    tweetText = tweetText.slice(0, -17);
    tweetText = tweetText.replace(/(\r\n|\n|\r)/gm, "");

    tweetText = tweetText.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
    tweetText = tweetText.replace('"', "");

    checkTweet(tweetText);
    j++;
  });
}

function checkTweet(str) {
  // console.log(str);
  if (!onlySpaces(str) && !retweet(str)) {
    console.log(str);
  } else {
  }
}

function onlySpaces(str) {
  return str.trim().length == 0;
}

function retweet(str) {
  return str.substring(0, 2) == "RT";
}
