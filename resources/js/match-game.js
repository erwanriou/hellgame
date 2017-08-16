var MatchGame = {};

$(document).ready(function() {
  var $game = $("#game");
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});

/* The cor fonction of the game */

MatchGame.generateCardValues = function () {
  var unplacedCard = [];
  for (var value = 1; value <= 8; value++ ) {
    unplacedCard.push (value, value);
  }
  var cardValues = [];
  while (unplacedCard.length > 0) {
    var randomIndex = Math.floor(Math.random() * unplacedCard.length);
    var randomValue = unplacedCard.splice(randomIndex, 1)[0];
    cardValues.push(randomValue);
  }
  return cardValues;
};

/* The jQuery conversion of the javascript function. */

MatchGame.renderCards = function(cardValues, $game) {
  var colors = [
  'hsl(25, 85%, 65%)',
  'hsl(55, 85%, 65%)',
  'hsl(90, 85%, 65%)',
  'hsl(160, 85%, 65%)',
  'hsl(220, 85%, 65%)',
  'hsl(265, 85%, 65%)',
  'hsl(310, 85%, 65%)',
  'hsl(360, 85%, 65%)'];

  $game.empty();
  $game.data("flippedCards", []);

  for (var i = 0; i < cardValues.length; i++) {
    var value = cardValues[i];
    var color = colors[value - 1];
    var data = {
      value: value,
      color: color,
      isflipped: false
    };
    var $newcard = $('<div class="col-lg-3 col-md-3 col-xs-3 card"></div>');
    $newcard.data(data);
    $game.append($newcard);
  }

  $(".card").click(function() {
    MatchGame.flipCard($(this), $("#game"));
  });
};

/* Good luck to understund this! */

 MatchGame.flipCard = function($card, $game) {
   if ($card.data('isFlipped')) {
     return;
   }

   $card.css('background-color', $card.data('color'))
       .text($card.data('value'))
       .data('isFlipped', true);

   var flippedCards = $game.data('flippedCards');
   flippedCards.push($card);

   if (flippedCards.length === 2) {
     if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
       var matchCss = {
         backgroundColor: 'rgb(153, 153, 153)',
         color: 'rgb(204, 204, 204)'
       };
       flippedCards[0].css(matchCss);
       flippedCards[1].css(matchCss);
     } else {
       var card1 = flippedCards[0];
       var card2 = flippedCards[1];
       window.setTimeout(function() {
         card1.css('background-color', 'rgb(32, 64, 86)')
             .text('')
             .data('isFlipped', false);
         card2.css('background-color', 'rgb(32, 64, 86)')
             .text('')
             .data('isFlipped', false);
       }, 350);
     }
     $game.data('flippedCards', []);
   }
 };
