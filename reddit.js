//fetch isn't supported by IE
//fetch is a function which is a way of sending a request to a url to retrieve a promise (response) - a promise object is a 'promise' that your request will be resolved at some point.
//a promise resolves or rejects and depending on which the 'then' or 'catch' will run.


//this makes sure the script doesnt run until all the html has loaded
document.addEventListener("DOMContentLoaded", function (event) {

  var postsContainer = document.getElementById("reddit-posts");

//this function receives a post from reddit, creates a Div element, an H2 element and an img element and posts to the page
  function writeSinglePostToPage(post) {
    var containerDiv = document.createElement("div");
    containerDiv.classList.add("reddit-content")

    if (post.data.preview){
        post.data.preview.images.forEach(function (image){
          var newImage = document.createElement("img");
          newImage.classList.add("reddit-image")
          newImage.src = image.source.url;
          containerDiv.appendChild(newImage);
        });
    }

    var newLink = document.createElement("a");
    newLink.classList.add("reddit-title")
    newLink.setAttribute('target', '_blank')
    newLink.href = post.data.url
    newLink.innerHTML = post.data.title;
    containerDiv.appendChild(newLink);

    postsContainer.appendChild(containerDiv);
  }

  //this receives an array of posts, loops through and invokes the writeSinglePostToPage function
  function writeAllPostsToPage(postArray) {
    postArray.forEach(writeSinglePostToPage);
  }

  //this function expects a JS response from the fetch function and parses the JSON
  function parseJSONFromResponse(response) {
    return response.json();
  }

  //this extracts data from the array that was parsed previously
  function extractPostArrayFromJSON (json) {
    return json.data.children;
  }

  function handleError(err) {
    console.log(err);
  }

  var redditURL = 'https://www.reddit.com/r/CryptoMarkets.json?sort=new&limit=7';

  fetch(redditURL)
    .then(parseJSONFromResponse)
    .then(extractPostArrayFromJSON)
    .then(writeAllPostsToPage)
    .catch(handleError);
});
