


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
    livesMessage.style.fontFamily = 'sans serif';
    livesMessage.style.alignSelf = 'center';
    livesMessage.style.justifySelf = 'center';
    livesMessage.innerHTML = 'Lives remaining: ';
    livesMessage.style.color = "white";


    // Create Lives Board Value
    const livesLeft = document.createElement('p');
    livesLeft.id = "lives-left";
    livesLeft.style.fontFamily = 'sans serif';
    livesLeft.style.alignSelf = 'center';
    livesLeft.style.justifySelf = 'center';
    livesLeft.innerHTML = "&nbsp &hearts; &hearts; &hearts;";
    livesLeft.style.color = "white";

    container.appendChild(livesMessage);
    container.appendChild(livesLeft);
    document.body.appendChild(container);
};

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

// createScoreBoard();


export {createLifeBar, updateLifeBar};
