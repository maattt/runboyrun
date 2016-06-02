document.getElementById("form").onsubmit = function() {
var allure = document.getElementById("allure").value;
var vitesse = document.getElementById("vitesse").value;
var distance = document.getElementById("distance").value;
var chrono = document.getElementById("chrono").value;

if (allure != '') {
  vitesse = calcule_vitesse(allure);
  document.getElementById("vitesse").value = vitesse;
}
else if (vitesse != '') {
  allure = calcule_allure(vitesse);
  document.getElementById("allure").value = allure;
}

if (distance != '' && vitesse != '') {
  chrono = calcule_chrono(distance, vitesse);
  document.getElementById("chrono").value = chrono;
}

if (chrono != '' && distance != '') {
  tab = chrono.split(':');
  secondes = parseInt(tab[0]) * 3600 + parseInt(tab[1]) * 60 + parseInt(tab[2]);
  heures = secondes / 3600;
  vitesse = Math.round(distance / heures * 100) / 100;
  document.getElementById("vitesse").value = vitesse;
  allure = calcule_allure(vitesse);
  console.log(allure);
  document.getElementById("allure").value = allure;
}

if (vitesse != '' && chrono != '') {
  tab = chrono.split(':');
  secondes = parseInt(tab[0]) * 3600 + parseInt(tab[1]) * 60 + parseInt(tab[2]);
  heures = secondes / 3600;
  distance = Math.round(heures * vitesse * 100) / 100;
  document.getElementById("distance").value = distance;
}

return false;
}

var calcule_vitesse = function(allure) {
  if (allure.indexOf(':') > -1) {
    tab = allure.split(':');
    allure = parseFloat(tab[0]) + parseFloat(tab[1]) / 60;
  } else {
    allure = parseFloat(allure);
  }
  return Math.round(60 / allure * 100) / 100;
}

var calcule_allure = function(vitesse) {
  vitesse = parseFloat(vitesse.toString().replace(',', '.'));
  allure = (60 / vitesse).toString();
  if (allure.indexOf('.') > -1) {
    tab = allure.split('.');
    return tab[0] + ':' + (parseInt(tab[1]) * 60).toString().substring(0,2);
  } else {
    return allure + ':00';
  }
}

var calcule_chrono = function(distance, vitesse) {
  distance = parseFloat(distance.replace(',', '.'));
  secondes = 3600 / (vitesse / distance);
  heures = parseInt(secondes / 3600);
  minutes = parseInt((secondes - heures * 3600) / 60);
  secondes = secondes - heures * 3600 - minutes * 60;

  if (minutes.toString().length == 1){
    minutes = '0' + minutes;
  }
  if (secondes.toString().length == 1){
    secondes = '0' + secondes;
  }

  return heures + ':' + minutes + ':' + secondes;
}