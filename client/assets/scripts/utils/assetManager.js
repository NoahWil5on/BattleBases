//parse to find specific character and level
function getCharacter(character){
    var charArray = character.split('?');
    if(charArray.length < 2){
        return document.getElementById(`character_${character}`);
    }
    var charClass = charArray[0];
    var charLevel = charArray[1];
    return document.getElementById(`char_${charClass}_${charLevel}`);
}
//parse to find specific button class type and state
function getButton(button) {
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
//find turret
function getTurret(turret) {
    return document.getElementById(`turret_${turret}`);
}
//find turret
function getBullet(bullet) {
    return document.getElementById(`bullet_${bullet}`);
}
//find base
function getBase(base){
    return document.getElementById(`base_${base}`);
}