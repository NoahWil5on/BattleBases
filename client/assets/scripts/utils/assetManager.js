function getCharacter(character){
    var charArray = character.split('?');
    if(charArray.length < 2){
        return document.getElementById(`character_${character}`);
    }
    var charClass = charArray[0];
    var charLevel = charArray[1];
    return document.getElementById(`char_${charClass}_${charLevel}`);
}
function getButton(button) {
    console.log(button);
    var btnArray = button.split('?');

    if(btnArray.length < 3){
        return document.getElementById(`button_${button}`);
    }
    var btnClass = btnArray[0];
    var btnType = btnArray[1];
    var btnState = btnArray[2];
    if(btnState.length > 0) btnState = `_${btnState}`
    return document.getElementById(`btn_${btnClass}_${btnType}${btnState}`);
}
function getTurret(turret) {
    return document.getElementById(`turret_${turret}`);
}
function getBullet(bullet) {
    return document.getElementById(`bullet_${bullet}`);
}
function getBase(base){
    return document.getElementById(`base_${base}`);
}