// letras F e S se confundem na fala
var translate_board = {
    "H1": 21,
    "H2": 22,
    "H3": 23,
    "H4": 24,
    "H5": 25,
    "H6": 26,
    "H7": 27,
    "H8": 28,
    "G1": 31,
    "G2": 32,
    "G3": 33,
    "G4": 34,
    "G5": 35,
    "G6": 36,
    "G7": 37,
    "G8": 38,
    "F1": 41,
    "F2": 42,
    "F3": 43,
    "F4": 44,
    "F5": 45,
    "F6": 46,
    "F7": 47,
    "F8": 48,
    "S1": 41,
    "S2": 42,
    "S3": 43,
    "S4": 44,
    "S5": 45,
    "S6": 46,
    "S7": 47,
    "S8": 48,
    "E1": 51,
    "E2": 52,
    "E3": 53,
    "E4": 54,
    "E5": 55,
    "E6": 56,
    "E7": 57,
    "E8": 58,
    "D1": 61,
    "D2": 62,
    "D3": 63,
    "D4": 64,
    "D5": 65,
    "D6": 66,
    "D7": 67,
    "D8": 68,
    "C1": 71,
    "C2": 72,
    "C3": 73,
    "C4": 74,
    "C5": 75,
    "C6": 76,
    "C7": 77,
    "C8": 78,
    "B1": 81,
    "B2": 82,
    "B3": 83,
    "B4": 84,
    "B5": 85,
    "B6": 86,
    "B7": 87,
    "B8": 88,
    "A1": 91,
    "A2": 92,
    "A3": 93,
    "A4": 94,
    "A5": 95,
    "A6": 96,
    "A7": 97,
    "A8": 98,
};

var recognition = new webkitSpeechRecognition();
var speechRecognitionList = new webkitSpeechGrammarList();
var interpretador = new Interpretador();

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'pt-BR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

//var observer = new Observable();

window.addEventListener("load", () => {
    console.log('Pronto para começar a partida.');
    recognition.start();
});

recognition.onresult = function(event) {
    var last = event.results.length - 1;

    // Tive que adicionar um trim pois algumas vezes o interpretador
    // adiciona espaços em branco no inicio ou final do transcript
    var fala = (event.results[last][0].transcript).toString().trim(); 

    try {
        movimento = interpretador.entry(fala);

        // game.square_clicked(translate_board[movimento[1]]);
        // game.square_clicked(translate_board[movimento[2]]);
        
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
        console.log(e);
    }
};

recognition.onstop = async function() {
    console.log("stop");
};

recognition.onspeechend = async function() {
    // O usuário tem 8 segundos para começar a falar, se não o canal é automaticamente fechado
    // consegui contarnar o problema adicionando um timeout para que o processo entre parar de
    // escutar e voltar a escutar seja autorizado pelo navegador
    console.log("stop");
    
    if (game.players[game.board_state.to_play] === "human") {
        await new Promise((resolve) => setTimeout(resolve, 500));
        recognition.start();
    }
}

recognition.onerror = async function(event) {
    if (event.error == "no-speech") {
        if (game.players[game.board_state.to_play] === "human") {
            await new Promise((resolve) => setTimeout(resolve, 500));
            recognition.start();
        }
    }
}