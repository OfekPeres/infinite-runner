const handleResize = (engine) =>
{
    const resize = () =>
    {
        engine.resize();
    };
    window.addEventListener('resize', resize);
};



export default handleResize;


