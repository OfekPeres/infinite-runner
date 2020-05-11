// Create a status bar that displays the number of lives the player has left in the top left corner of the screen
import "./repo.css";
const createLifeBar = () =>
{
    // Create container for lifebar
    const container = document.createElement('div');
    container.style.maxWidth = "40vw";
    container.style.height = "5vh";
    container.style.background = 'transparent';
    container.style.zIndex = 10;
    container.style.display  = 'flex';
    container.style.top = '10px';
    container.style.left = '10px';
    container.style.position = 'absolute';

    // Create Life Message (i.e "You have 3 lives:")
    const livesMessage = document.createElement('p');
    // livesMessage.style.display = 'flex';
    livesMessage.id = "lives-message";
    // livesMessage.style.fontFamily = 'sans serif';
    livesMessage.style.fontFamily = "Monaco";
    livesMessage.style.alignSelf = 'center';
    livesMessage.style.justifySelf = 'center';
    livesMessage.innerHTML = 'Lives remaining: ';
    livesMessage.style.color = "white";


    // Create Lives Board Value
    const livesLeft = document.createElement('p');
    livesLeft.id = "lives-left";
    // livesLeft.style.fontFamily = 'sans serif';
    livesLeft.style.fontFamily = 'Monaco';
    livesLeft.style.alignSelf = 'center';
    livesLeft.style.justifySelf = 'center';
    livesLeft.innerHTML = "&nbsp &hearts; &hearts; &hearts;";
    livesLeft.style.color = "white";

    container.appendChild(livesMessage);
    container.appendChild(livesLeft);
    document.body.appendChild(container);

};


const createGitHubLink = () =>
{
     // Create container for lifebar
     const container1 = document.createElement('div');
     container1.style.maxWidth = "40vw";
     container1.style.height = "5vh";
     container1.style.background = 'transparent';
     container1.style.zIndex = 10;
     container1.style.display  = 'flex';
     container1.style.bottom = '10px';
     container1.style.left = '10px';
     container1.style.position = 'absolute';

     // Create Life Message (i.e "You have 3 lives:")
     const githubLink = document.createElement('p');
     // githubLink.style.display = 'flex';
     githubLink.id = "repo-link";
     // githubLink.style.fontFamily = 'sans serif';
     githubLink.style.fontFamily = "Monaco";
     githubLink.style.alignSelf = 'center';
     githubLink.style.justifySelf = 'center';
     githubLink.innerHTML = '<a href="https://github.com/OfekPeres/infinite-runner" target="_blank">Go To Our GitHub Repo!!<a/>';
     githubLink.style.color = "white";

     container1.appendChild(githubLink);
     document.body.appendChild(container1);
};


// Updates the display of the life bar
const updateLifeBar = (lives) =>
{

    const lifeBarVal = document.getElementById('lives-left');

    let livesLeft = '&nbsp';
    for (let i = 0; i < lives; i++)
    {
        livesLeft += "&hearts; &nbsp";
    }
    lifeBarVal.innerHTML = livesLeft;

};

export {createLifeBar, updateLifeBar, createGitHubLink};
