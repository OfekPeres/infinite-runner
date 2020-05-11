// Event listener to resize the game canvas if the player resizes the window
const handleResize = (engine) =>
{
    const resize = () =>
    {
        engine.resize();
    };
    window.addEventListener('resize', resize);
};



export default handleResize;


