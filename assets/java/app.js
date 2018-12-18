$(document).ready(function () {
    var options = [
        {
            question: "Which NFL team has had the most SuperBowl wins?",
            choice: ["Patriots", "Steelers", "Cowboys", "49ers"],
            answer: 1,
            photo: "assets/images/steelersrings.jpg", //https://i.pinimg.com/originals/3d/17/1a/3d171aad40ffd490f08066c21ff23b73.jpg
        },
        {
            question: "Which NFL team has been to the most SuperBowls?",
            choice: ["Patriots", "Steelers", "Cowboys", "49ers"],
            answer: 0,
            photo: "assets/images/patriotsapp.jpg", //http://www.xnojoe.com/wp-content/uploads/2017/02/img_9393.jpg
        },
        {
            question: "Which NFL team has beaten the Patriots twice in the SuperBowl?",
            choice: ["Patriots", "Steelers", "New York Giants", "Atlanta Falcons"],
            answer: 2,
            photo: "assets/images/incrediblecatch.jpg", //http://www.chicagonow.com/ex-posts-facto/files/2012/01/David-Tyree-e1327567419572.jpg
        },
        {
            question: "What was the best comeback in SuperBowl history?",
            choice: ["Patriots-Falcons", "Patriots-Seahawks", "Saints-Colts", "Redskins-Broncos"],
            answer: 0,
            photo: "assets/images/comeback-1.jpg", //https://boyslifeorg.files.wordpress.com/2017/09/comeback-1.jpg?w=620&h=465
        },
        {
            question: "What was the best comeback in SuperBowl history?",
            choice: ["Redskins-Broncos", "49ers-Broncos", "Bears-Patriots", "Cowboys-Bills"],
            answer: 1,
            photo: "assets/images/blowout.png", //https://www.gunaxin.com/wp-content/uploads/2013/01/Joe-Montana-Jerry-Rice-and-the-San-Francisco-49ers-Destroyed-John-Elway-and-the-Denver-Broncos-in-Super-Bowl-XXIV-560x315.png
        },
        {
            question: "Who won the SuperBowl in 2005?",
            choice: ["Colts", "Cowboys", "Ravens", "Saints"],
            answer: 3,
            photo: "assets/images/saints2005.jpg", // https://static01.nyt.com/images/2010/02/08/sports/08superbowl02/08superbowl02-articleLarge.jpg 
        },
        {
            question: "Which of the Manning brothers have more SuperBowl Rings?",
            choice: ["Peyton", "Eli", "The have the same amount"],
            answer: 2,
            photo: "assets/images/peyton-eli.jpg", // https://cdn.cnn.com/cnnnext/dam/assets/130913130555-peyton-eli-manning-story-top.jpg
        },
        {
            question: "Which team has the most SuperBowl losses",
            choice: ["Colts", "Cowboys", "Bills", "Broncos"],
            answer: 3,
            photo: "assets/images/losses.jpg", //https://i.imgflip.com/y26to.jpg
        },
        {
            question: "Which team has the most SuperBowl losses",
            choice: ["Colts", "Cowboys", "Bills", "Broncos"],
            answer: 3,
            photo: "assets/images/losses.jpg"
        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unansweredCount = 0;
    var timer = 30;
    var intervalId;
    var userguess = " ";
    var running = false;
    var questionCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    // var displayQuestion = [];

    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    });

    // $("#reset").hide();
    // //click start button to bigin game 
    // $("#start").on("click", function(){
    //     $("#start").hide();
    //     displayQuestion();
    //     runTimer();
    //     //for(var i = 0 < options.length; i++) {
    //         for(var i = 0; i < options.length; i++) {
    //         holder.push(options[i]);
    //     }
    // })

    // start timer

    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //countdown timer
    function decrement() {
        $("#timeleft").html("<h3>Time Remaining: " + timer + "</h3>");
        timer--;

        //stop timer if @ 0 time remaining 
        if (timer === 0) {
            unansweredCount++;
            stop();
            $("#answerblock").html("<h4>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</h4>");
            hidepicture();
        }
    }
    // timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick questions in array if not already shown
    //display question and loop through through and display possible answers
    function displayQuestion() {
        index = Math.floor(Math.random() * options.length);
        pick = options[index];

        $("#questionsblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so it can check the answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
        }
        // click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //outcomes of guesses
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userguess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }
    function hidepicture() {
        $("#answerblock").append("<img src= " + pick.photo + ">");
        //$("#answerblock").append("<img src=" = pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);
        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 30;
            // run the score screen if all questions are answered
            if ((wrongCount + correctCount + unansweredCount) === questionCount) {
                $("#questionblock:").empty();
                $("#questionblock:").html("<h3>Game Over! Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unansweredCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unansweredCount = 0;
            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);
    }
    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("$questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);

        }
        runTimer();
        displayQuestion();
    })
})