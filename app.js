var controller = {
	numberGames: 2,
	games: []
}

$(function () {
	initGame();
	$(".game-container").on("click", ".click-box", function () {
		clickCase($(this).parent().data("container"), $(this).data("box"));
	});
});

function initGame () {
	for (var i = 0; i < controller.numberGames; i++) {
		var container = "<div class=\"game-container\" data-container=\"" + i + "\"></div>";
		$("main").append(container);
		controller.games[i] = {
			turn: "none",
			played: 0,
			gameArray: [],
			winner: "none"
		};
		for (var j = 0; j < 9; j++) {
			var box = "<div class=\"click-box\" data-box=\"" + j + "\"></div>";
			$("*[data-container=" + i + "]").append(box);
			controller.games[i].gameArray[j] = 0;
		}
	}	
}

function clickCase (container, box) {
	var currentgame = controller.games[container];
	if (currentgame.played < 9 && currentgame.gameArray[box] === 0 && currentgame.winner === "none") {
		currentgame.played++;
		if (currentgame.turn === "circle") {
			currentgame.gameArray[box] = 1; currentgame.turn = "cross";
		} else {
			currentgame.gameArray[box] = -1; currentgame.turn = "circle";
		}
		$("*[data-container=" + container + "]>*[data-box=" + box + "]").css("background-image", "url(" + currentgame.turn + ".png)");
	} else {
		console.log("nope");
	}
	checkWin(container);
}

function checkWin (container) {
	var a = controller.games[container].gameArray; // select corresponding game array
	console.log(a);
	var winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
	$.each(winningCombinations, function (i) {

		if (a[winningCombinations[i][0]] + a[winningCombinations[i][1]] + a[winningCombinations[i][2]] === 3) {
			console.log("Cross wins");
		} else if (a[winningCombinations[i][0]] + a[winningCombinations[i][1]] + a[winningCombinations[i][2]] === -3) {
			console.log("Circle wins");			
		}
	});
}