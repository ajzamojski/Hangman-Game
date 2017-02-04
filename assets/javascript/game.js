// Global variables are declared

var wins = 0;
var losses = 0;
var audio1 = new Audio ('assets/audio/TheMotherload.m4a');
var audio2 = new Audio ('assets/audio/Battery.m4a');
var audio3 = new Audio ('assets/audio/Stranded.m4a');
var audio4 = new Audio ('assets/audio/Killpop.m4a');
var audio5 = new Audio ('assets/audio/MeinHerzBrennt.m4a');

	// starts game

window.onload = function getStarted(event) 
{		
		// Variables get initialized and starting messages appear

		document.getElementById("startrestart").innerHTML = "<span> Click any key to start guessing a band! </span>";
		var lettersGuessed = [];
		var answerArray = [];
		var words =["metallica", "mastodon", "gojira", "rammstein", "slipknot"]; 
		var random = words[Math.floor(Math.random() * words.length)];
		var remainingLetters = random.length;

		// after a random word gets selected, underscores '_' replace the length 
		// of the random word pick in the for loop

				for (var i = 0; i < random.length; i++) {

    				answerArray[i] = '_';
    			}
    	// The amount of guesses is declared to 5

		var guesses = 5;
		// Call the tags by their ID name and replaces it with the content after innerHTML

		document.getElementById("lettersguessed").innerHTML = '';
		document.getElementById("wins").innerHTML = wins;
		document.getElementById("losses").innerHTML = losses;
		document.getElementById("currentWord").innerHTML = answerArray.join(" ");

	// Checks the letter pressed on the keyboard and makes a determination on what to do with the letter

	function letterCheck (lguess) 
	{
			// This for loop circulates through and array and checks for keys previously pressed, 
			// if they were user must enter another key without losing guesses

			for (var j = 0;  j < lettersGuessed.length; j++) {
				if (lguess === lettersGuessed[j]) {
					tryagain();
					return;
						}
					}
			// If a letter exists in the random word that was picked, it will execute this if statement

			if (random.includes(lguess)) {

			// This for loop cycles through the random word picked and 
			// replaces the underscore in another array's position which 
			// finally gets displayed with the words guessed so far as well 
			// as decreasing the amount of letter to guess

			for (var i = 0; i < random.length; i++) {
				if (lguess === random[i] && answerArray[i] === "_") {
						answerArray[i] = lguess;
						document.getElementById("currentWord").innerHTML = answerArray;
						remainingLetters--;
							}

							// If the amount of letter reaches 0, the game was won, new innerhtmls are displayed
							// and functions called

							if (remainingLetters === 0) {

									// displayimg function is called

									displayimg();
									document.getElementById("startrestart").innerHTML = "<span> Press any key to restart </span>";
									document.getElementById("message").innerHTML = "<h2> You Won! </h2> <br> <span> Press any key to restart </span>";
									wins++;
									document.getElementById("wins").innerHTML = wins;

									// Once the displayimg function is executed along with the new innerhtml tags,
									// the user may click a key to pause the audio and call the getStarted function
									// to begin another game

									document.onkeyup = function restart(event) {
										
										audio1.pause();
										audio2.pause();
										audio3.pause();
										audio4.pause();
										audio5.pause();
										document.getElementById("showimg").innerHTML = '';
										getStarted();

										}
								}
							}

			}	
				// If none letter chosen was not included in the word random, 
				// this else statement is executed

				else 
				{	// The amount of guesses go down by 1
					guesses--;

					// If the amount of guesses reaches 0, this if statement ends the game,
					// displays new innerhtmls, increases your loss count, and executes function getStarted  
					// when another key is pressed, restarting the game

					if (guesses === 0) {
						document.getElementById("message").innerHTML = "<h2> You Lost </h2> <br> <span> Press any key to restart </span>";
						document.getElementById("startrestart").innerHTML = "<span> Press any key to restart </span>";
						losses++;
						document.getElementById("losses").innerHTML = losses;
							document.onkeyup = function restart(event) {
								getStarted();
									}	
						}

					// The else statement also stores the letters pressed in an array which
					// get displayed on screen

					document.getElementById("guesses").innerHTML = guesses;
					lettersGuessed.push(lguess);
				}
	
	}

		// tryAgain function is executed, then awaits for a player to press a key on the keyboard
		function tryagain() 
		{
			// The guesses ID gets replaced the what the current amount of guesses are and get displayed to HTML
			document.getElementById("guesses").innerHTML = guesses;
			// Pressing a key on the keyboard will execute this function and continue the script
			document.onkeyup = function guessing(event) 
				{
					document.getElementById("message").innerHTML = "Keep Going!";

					// The key pressed on the keyboard is converted to lowercase and stored in a var
					var userguess = event.key.toLowerCase();
					// LetterCheck function is called a the key pressed is sent as well
					letterCheck(userguess);
					var displayLetters = document.querySelector("#lettersguessed");
					displayLetters.innerHTML = lettersGuessed.join(", ");

		
					document.getElementById("currentWord").innerHTML = answerArray.join(" ");
				};
		}

		//This function serves as displaying an image and playing a song with the coresponding band when won
		function displayimg ()
		{
			// An image is created which will be used to call the image of
			// the band depending of which band was the hangman word
			var img = document.createElement('img');

		// These if statements are unique to the band chosen, 
		// they display a band logo and play one of their songs
			if (random == "mastodon") {
				audio1.play();
				document.getElementById("showimg").innerHTML = '<img src=assets/images/mastodon.jpg id=imageparam> <br> <br> <p> <em> TheMotherload </em> - Mastodon </p>';
			}

			if (random == "metallica") {
				audio2.play();
				document.getElementById("showimg").innerHTML = '<img src=assets/images/metallica.jpg id=imageparam> <br> <br> <p> <em> Battery </em> - Metallica </p>';
			}

			if (random == "gojira") {
				audio3.play();
				document.getElementById("showimg").innerHTML = '<img src=assets/images/gojira.jpg id=imageparam> <br> <br> <p> <em> Stranded </em> - Gojira </p>';
			}

			if (random == "slipknot") {
				audio4.play();
				document.getElementById("showimg").innerHTML = '<img src=assets/images/slipknotlogo.jpg id=imageparam> <br> <br> <p> <em> Killpop </em> - Slipknot </p>';
			}

			if (random == "rammstein") {
				audio5.play();
				document.getElementById("showimg").innerHTML = '<img src=assets/images/rammstein_logo.jpg id=imageparam> <br> <br> <p> <em> Mein Herz Brennt </em> - Rammstein </p>';
			}



		}
					// This is the first function that is called after the page loads function getStarted
					tryagain();
}