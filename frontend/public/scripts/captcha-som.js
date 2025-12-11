//Funcao para tocar o SOM em browser HTML4 e HTML5
function html5_audio() {
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/wav;').replace(/no/, ''));
}

var play_html5_audio = false;
if (html5_audio()) play_html5_audio = true;


function play_sound(id) {
    var url = document.getElementById(id).value;
    if (play_html5_audio) {
        var snd = new Audio(url);
        document.body.appendChild(snd);
        snd.load();
        snd.play();
    } else {
        try {
            var soundEmbed = document.createElement("embed");
            soundEmbed.setAttribute("src", url);
            soundEmbed.setAttribute("hidden", true);
            soundEmbed.setAttribute("autostart", false);
            soundEmbed.setAttribute("width", 0);
            soundEmbed.setAttribute("height", 0);
            soundEmbed.setAttribute("enablejavascript", true);
            soundEmbed.setAttribute("autostart", true);
            document.body.appendChild(soundEmbed);
        }
        catch (e) {
            alert('errou');

        }
    }
}