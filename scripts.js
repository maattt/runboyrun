document.getElementById("form").onsubmit = function() {
var allure = document.getElementById("allure").value;
var vitesse = document.getElementById("vitesse").value;
var distance = document.getElementById("distance").value;
var chrono = document.getElementById("chrono").value;

if (allure != '') {
  vitesse = calcule_vitesse(allure);
  document.getElementById("vitesse").value = vitesse;
} else if (vitesse != '') {
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
  distance = parseFloat(distance.toString().replace(',', '.'));
  vitesse = Math.round(distance / heures * 100) / 100;
  document.getElementById("vitesse").value = vitesse;
  allure = calcule_allure(vitesse);
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
  distance = parseFloat(distance.toString().replace(',', '.'));
  vitesse = parseFloat(vitesse.toString().replace(',', '.'));
  secondes = 3600 / (vitesse / distance);
  heures = parseInt(secondes / 3600);
  minutes = parseInt((secondes - heures * 3600) / 60);
  secondes = secondes - heures * 3600 - minutes * 60;

  if (minutes.toString().length == 1) {
    minutes = '0' + minutes;
  }

  if (secondes < 0.5) {
    secondes = '00';
  } else if (secondes >= 0.5 && secondes < 1) {
    secondes = '01';
  }
  else if (secondes.toString().length == 1) {
    secondes = '0' + secondes;
  } else if (secondes.toString().length > 2) {
    secondes = secondes.toString().substring(0, 2);
  }

  return heures + ':' + minutes + ':' + secondes;
}

var inlineTweets = document.querySelectorAll('*[data-inline-tweet]');

if (inlineTweets) {
  function buildInlineTweet(inlineTweet) {
    var linkContent = inlineTweet.innerHTML;
    var tweetText = inlineTweet.dataset.inlineTweetText ? inlineTweet.dataset.inlineTweetText : inlineTweet.innerHTML;

    // TWEET LINK VARIABLES
    var tweetTextEncoded = encodeURIComponent(tweetText);
    var pageURL = inlineTweet.dataset.inlineTweetUrl ? inlineTweet.dataset.inlineTweetUrl : window.location.href;
    var tweetVia = inlineTweet.dataset.inlineTweetVia ? "&via="+inlineTweet.dataset.inlineTweetVia : "";
    var tweetHashtags = inlineTweet.dataset.inlineTweetTags ? "&hashtags="+inlineTweet.dataset.inlineTweetTags : "";
    var tweetLink = "https://twitter.com/intent/tweet/?text="+tweetTextEncoded+"&url="+pageURL+tweetVia+tweetHashtags;

    // SPAN ELEMENT
    var tweetTextContainer = document.createElement('span');
    tweetTextContainer.innerHTML = linkContent;

    // ANCHOR ELEMENT
    var link = document.createElement('a');
    link.target = "_blank";
    link.href = tweetLink;
    link.appendChild(tweetTextContainer);

    inlineTweet.innerHTML = "";
    inlineTweet.appendChild(link);
  }

  for ( var i = 0; i < inlineTweets.length; i++ ) {
    buildInlineTweet(inlineTweets[i])
  }
}




