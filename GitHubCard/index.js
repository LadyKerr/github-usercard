/*
//Note: students can opt to use this array & iterate over it to display followers or they can access the url via axios
const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];
*/

//adding html class to the global scope for easy access
const mainCard = document.querySelector(".cards");

//axios call to the server to retrieve my info
axios
  .get("https://api.github.com/users/LadyKerr")
  .then(res => {
    console.log(res);
    mainCard.appendChild(GitHubCard(res.data));
  })
  .catch(err => console.log(err));

//axios call to retrieve my followers info
axios
  .get("https://api.github.com/users/LadyKerr/followers")
  .then(res => {
    console.log(res);
    res.data.forEach(user => {
      const followerCard = new GitHubCard(user);
      mainCard.appendChild(followerCard);
    });
  })
  .catch(err => console.log(err));

//github card constructor function & using the format provided create elements needed to display cards
function GitHubCard(userData) {
  //card wrapper div
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card");

  //card image
  const cardImg = document.createElement("img");
  cardImg.src = userData.avatar_url;

  //card information wrapper div
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  //user's legal name
  const cardName = document.createElement("h3");
  cardName.classList.add("name");
  cardName.textContent = userData.name;

  //user's GH username
  const cardUsername = document.createElement("p");
  cardUsername.classList.add("username");
  cardUsername.textContent = userData.login;

  //user's location
  const cardLocation = document.createElement("p");
  cardLocation.textContent = `Location: ${userData.location}`;

  //user's link to profile
  const cardProfile = document.createElement("p");
  cardProfile.textContent = "Profile:";
  //anchor tag nested inside the <p />
  const profileLink = document.createElement("a");
  profileLink.href = userData.html_url;
  profileLink.textContent = userData.html_url;
  cardProfile.appendChild(profileLink);

  //user's followers
  const cardFollowers = document.createElement("p");
  cardFollowers.textContent = `Followers: ${userData.followers}`;

  //user's following
  const cardFollowing = document.createElement("p");
  cardFollowing.textContent = `Location: ${userData.following}`;

  //user's bio
  const cardBio = document.createElement("p");
  cardBio.textContent = userData.bio;

  //append all the elements to main wrapper div & info div to create the structure of the card
  //main wrapper div appendChild - this is the main div that houses img & info
  cardWrapper.appendChild(cardImg);
  cardWrapper.appendChild(cardInfo);

  //infoDiv appendChild - this div houses all the other divs
  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardUsername);
  cardInfo.appendChild(cardLocation);
  cardInfo.appendChild(cardProfile);
  cardInfo.appendChild(cardFollowers);
  cardInfo.appendChild(cardFollowing);
  cardInfo.appendChild(cardBio);

  //in the end return main card wrapper
  return cardWrapper;
}
