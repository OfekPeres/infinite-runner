


const createScoreBoard = () =>
{
    // Create container for scoreboard
    const container = document.createElement('div');
    container.style.maxWidth = "40vw";
    container.style.height = "5vh";
    container.style.background = 'transparent';
    container.style.zIndex = 10;
    container.style.display  = 'flex';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.position = 'absolute';

    // Create Score Message (i.e "your score is:")
    const scoreMessage = document.createElement('p');
    // scoreMessage.style.display = 'flex';
    scoreMessage.id = "score-message";
    scoreMessage.style.fontFamily = 'sans serif';
    scoreMessage.style.alignSelf = 'center';
    scoreMessage.style.justifySelf = 'center';
    scoreMessage.innerHTML = 'Your Score is: ';
    scoreMessage.style.color = "white";


    // Create Score Board Value
    const score = document.createElement('p');
    score.id = "score";
    score.style.fontFamily = 'sans serif';
    score.style.alignSelf = 'center';
    score.style.justifySelf = 'center';
    score.innerHTML = "100";
    score.style.color = "white";

    container.appendChild(scoreMessage);
    container.appendChild(score);
    document.body.appendChild(container);
};

const updateScoreBoard = (score) =>
{

    const scoreBoardValue = document.getElementById('score');
    const scoreBoardMessage = document.getElementById('score-message');
    scoreBoardValue.innerHTML = score;

    if (score % 2000 <= 200 && score > 2000)
    {
        scoreBoardMessage.style.textShadow = "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073";
        scoreBoardValue.style.textShadow = "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073";
    }
    else
    {
        scoreBoardMessage.style.textShadow = "";
        scoreBoardValue.style.textShadow = "";

    }
};

// createScoreBoard();


export {createScoreBoard, updateScoreBoard};
