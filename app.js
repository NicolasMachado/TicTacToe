var controller = {
	numberGames: 0,
	games: []
}

$(function () {
	initGame();
	// click on board case
	$("main").on("click", ".click-box", function () {
		clickCase($(this).parent().data("container"), $(this).data("box"));
	});
	// click on reset button
	$("main").on("click", ".restart", function () {
		resetGame($(this).parent().data("container"));
	});
	// click on submit numbr of boards
	$("#forn-nb-games").submit(function(e) {
 		e.preventDefault();
 		controller.numberGames = $("#nb-games").val();
 		$("#nb-games").val("");
 		controller.games = [];
 		$(".game-container").remove();
 		initGame();
	});
});

function initGame () {
	// create x number of games in the controller and in the UI
	for (var i = 0; i < controller.numberGames; i++) {
		var container = "<div class=\"game-container\" data-container=\"" + i + "\"></div>";
		$("main").append(container);
		controller.games[i] = {
			turn: "circle",
			played: 0,
			gameArray: [],
			winner: "none"
		};
		for (var j = 0; j < 9; j++) {
			var box = "<div class=\"click-box\" data-box=\"" + j + "\"></div>";
			$(".game-container[data-container=" + i + "]").append(box);
			controller.games[i].gameArray[j] = 0;
		}
	}	
}

function clickCase (container, box) {
	var currentgame = controller.games[container];
	// check if case has been played and if the game is not over on this board
	if (currentgame.gameArray[box] === 0 && currentgame.winner === "none") {
		currentgame.played++;
		$(".game-container[data-container=" + container + "]>.click-box[data-box=" + box + "]").css("background-image", "url(" + currentgame.turn + ".png)");
		if (currentgame.turn === "circle") {
			currentgame.gameArray[box] = 1; 
			currentgame.turn = "cross";
		} else {
			currentgame.gameArray[box] = -1; 
			currentgame.turn = "circle";
		}
		checkWin(container);
	}
}

function checkWin (container) {
	var a = controller.games[container].gameArray; // select corresponding game array
	var winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; // all the winning combinations
	$.each(winningCombinations, function (i) {
		if (a[winningCombinations[i][0]] + a[winningCombinations[i][1]] + a[winningCombinations[i][2]] === 3) {
			setWinner(container, "circle");
			return false;
		} else if (a[winningCombinations[i][0]] + a[winningCombinations[i][1]] + a[winningCombinations[i][2]] === -3) {
			setWinner(container, "cross");
			return false;
		} else if (controller.games[container].played >=9 && controller.games[container].winner === "none") {
			setWinner(container, "nobody");
			return false;
		}
	});
}

function setWinner (container, gameWinner) {
	controller.games[container].winner = gameWinner;
	var	wintext = "<img src=\"" + gameWinner + ".png\" width=\"10px\" style=\"vertical-align:middle\">";
	var cont = $(".game-container[data-container=" + container + "]");
	if (gameWinner === "cross") {
			cont.css("background-color", "#E0E0F0");
	} else if (gameWinner === "circle") {
			cont.css("background-color", "#F2D0D0");
	} else {
			cont.css("background-color", "#E5E5E5");
			wintext = "Nobody";
	}
	$(".game-container[data-container=" + container + "]").append("<div class=\"result\">" + wintext + " won the game</div><div class=\"restart\">Reset</div>");
}

function resetGame (container) {
	var game = controller.games[container];
	var cont = ".game-container[data-container=" + container + "]";
	$(cont).css("background-color", "#FFF");
	$(cont + ">.restart").remove();
	$(cont + ">.result").remove();
	for (var i = 0; i < 9; i++) {
		game.gameArray[i] = 0;
		$(cont + ">.click-box[data-box=" + i + "]").css("background-image", "url(\"empty.png\")");
		game.winner = "none";
		game.turn = "circle";
		game.played = 0;
	}
}