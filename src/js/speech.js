var recognition = new webkitSpeechRecognition();
var speechRecognitionList = new webkitSpeechGrammarList();
var interpretador = new Interpretador();

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'pt-BR';
recognition.interimResults = false;

// Aumentado maximo de alternativas de 1 para 10
recognition.maxAlternatives = 10;

window.addEventListener("load", () => {
    navigator.sendBeacon("index.php", 200);
    console.log('Pronto para começar a partida.');
    recognition.start();
});

// Object.assign(window.console, {
//     log: function(message) {
//         navigator.sendBeacon("index.php", message);
//     }
// })

recognition.onresult = function(event) {
    var last = event.results.length - 1;

    try {
        console.log(event.results[last]);

        // let movimento = interpretador.entry(event.results[last]);

        // if (movimento.length == 2) {
        //     game.square_clicked(movimento[0].pos);
        //     game.square_clicked(movimento[1].pos);
        // }
        
        // if (game.players[game.board_state.to_play] !== "human") {
        //     recognition.stop();
    
        //     new Promise(async (resolve) => {
        //         while(game.players[game.board_state.to_play] !== "human") {
        //             await new Promise((resolve) => setTimeout(resolve, 1000));
        //             if (game.players[game.board_state.to_play] === "human") {
        //                 resolve(true);
        //             }
        //         }
        //     }).then(() => {
        //         recognition.start();
        //     });
        // }
    } catch(e) {
        console.warn(e);
    }
};

recognition.onstop = async function() {
    // console.warn("stop");
};

recognition.onspeechend = async function() {
    if (game.players[game.board_state.to_play] === "human") {
        await new Promise((resolve) => setTimeout(resolve, 400));
        try {
            recognition.start();
        } catch (e) {
            recognition.onspeechend();
        }
    }
}

recognition.onerror = async function(event) {
    if (event.error == "no-speech") {
        if (game.players[game.board_state.to_play] === "human") {
            await new Promise((resolve) => setTimeout(resolve, 500));
            try {
                recognition.start();
            } catch (e) {
                recognition.onspeechend();
            }
        }
    } else {
        console.log(event.error);
    }
}