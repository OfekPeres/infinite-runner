// Event Handler to focus the canvas when the window loads
const onLoad = () =>
{
    window.onload = function() {
        document.getElementById("game-canvas").focus();
    };
};

export default onLoad;
