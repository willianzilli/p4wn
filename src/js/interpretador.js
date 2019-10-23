var posicoes = {
    "A8": {name: "A8", pos: 91, soundex: "A300"}, "B8": {name: "B8", pos: 92, soundex: "B300"}, "C8": {name: "C8", pos: 93, soundex: "C300"}, "D8": {name: "D8", pos: 94, soundex: "D300"}, "E8": {name: "E8", pos: 95, soundex: "E300"}, "F8": {name: "F8", pos: 96, soundex: "F300"}, "G8": {name: "G8", pos: 97, soundex: "G300"}, "H8": {name: "H8", pos: 98, soundex: "H300"},
    "A7": {name: "A7", pos: 81, soundex: "A230"}, "B7": {name: "B7", pos: 82, soundex: "B230"}, "C7": {name: "C7", pos: 83, soundex: "C230"}, "D7": {name: "D7", pos: 84, soundex: "D230"}, "E7": {name: "E7", pos: 85, soundex: "E230"}, "F7": {name: "F7", pos: 86, soundex: "F230"}, "G7": {name: "G7", pos: 87, soundex: "G230"}, "H7": {name: "H7", pos: 88, soundex: "H230"},
    "A6": {name: "A6", pos: 71, soundex: "A220"}, "B6": {name: "B6", pos: 72, soundex: "B220"}, "C6": {name: "C6", pos: 73, soundex: "C220"}, "D6": {name: "D6", pos: 74, soundex: "D220"}, "E6": {name: "E6", pos: 75, soundex: "E220"}, "F6": {name: "F6", pos: 76, soundex: "F220"}, "G6": {name: "G6", pos: 77, soundex: "G220"}, "H6": {name: "H6", pos: 78, soundex: "H220"},
    "A5": {name: "A5", pos: 61, soundex: "A252"}, "B5": {name: "B5", pos: 62, soundex: "B252"}, "C5": {name: "C5", pos: 63, soundex: "C252"}, "D5": {name: "D5", pos: 64, soundex: "D252"}, "E5": {name: "E5", pos: 65, soundex: "E252"}, "F5": {name: "F5", pos: 66, soundex: "F252"}, "G5": {name: "G5", pos: 67, soundex: "G252"}, "H5": {name: "H5", pos: 68, soundex: "H252"},
    "A4": {name: "A4", pos: 51, soundex: "A236"}, "B4": {name: "B4", pos: 52, soundex: "B236"}, "C4": {name: "C4", pos: 53, soundex: "C236"}, "D4": {name: "D4", pos: 54, soundex: "D236"}, "E4": {name: "E4", pos: 55, soundex: "E236"}, "F4": {name: "F4", pos: 56, soundex: "F236"}, "G4": {name: "G4", pos: 57, soundex: "G236"}, "H4": {name: "H4", pos: 58, soundex: "H236"},
    "A3": {name: "A3", pos: 41, soundex: "A362"}, "B3": {name: "B3", pos: 42, soundex: "B362"}, "C3": {name: "C3", pos: 43, soundex: "C362"}, "D3": {name: "D3", pos: 44, soundex: "D362"}, "E3": {name: "E3", pos: 45, soundex: "E362"}, "F3": {name: "F3", pos: 46, soundex: "F362"}, "G3": {name: "G3", pos: 47, soundex: "G362"}, "H3": {name: "H3", pos: 48, soundex: "H362"},
    "A2": {name: "A2", pos: 31, soundex: "A320"}, "B2": {name: "B2", pos: 32, soundex: "B320"}, "C2": {name: "C2", pos: 33, soundex: "C320"}, "D2": {name: "D2", pos: 34, soundex: "D320"}, "E2": {name: "E2", pos: 35, soundex: "E320"}, "F2": {name: "F2", pos: 36, soundex: "F320"}, "G2": {name: "G2", pos: 37, soundex: "G320"}, "H2": {name: "H2", pos: 38, soundex: "H320"},
    "A1": {name: "A1", pos: 21, soundex: "A500"}, "B1": {name: "B1", pos: 22, soundex: "B500"}, "C1": {name: "C1", pos: 23, soundex: "C500"}, "D1": {name: "D1", pos: 24, soundex: "D500"}, "E1": {name: "E1", pos: 25, soundex: "E500"}, "F1": {name: "F1", pos: 26, soundex: "F500"}, "G1": {name: "G1", pos: 27, soundex: "G500"}, "H1": {name: "H1", pos: 28, soundex: "H500"},
}

const conjuncoes = ["NA", "PARA", "CAPTURA", "VAI PARA"];

class Interpretador {
    entry(speechRecognitionResult) {
        let movimentos = [];
        let transcricoes = [];

        Object.values(speechRecognitionResult).forEach(value => {
            transcricoes.push(value.transcript);

            let particulas = this.processaTranscricao(value.transcript);

            if (particulas.length > 0) {
                let particula = JSON.stringify(particulas);
                let movimento = null;

                if ((movimento = movimentos.filter((movimento) => movimento.object === particula)).length === 0) {
                    movimentos.push({object: particula, x: 1});
                } else {
                    movimento[0].x++;
                }
            }
        });

        if (movimentos.length == 0) {
            return [];
        }

        movimentos.sort((a, b) => {
            return (a.x > b.x) ? -1 : (a.x < b.x) ? 1 : 0;
        });

        movimentos.forEach((v, k) => {
            let movimento = JSON.parse(v.object);
            if (!game.valid_move(movimento)) {
                movimentos.splice(k, 1);
            }
        })

        if (movimentos.length == 0) {
            game.stop_moving_piece();

            utterThis.text = "Movimento inválido.";
            window.speechSynthesis.speak(utterThis);

            throw Error(JSON.stringify({"message": "Movimento inválido", "movimento": movimentos, "speechRecognitionResult": transcricoes}));
        } else if (movimentos.length == 1) {
            return JSON.parse(movimentos[0].object);
        } else {
            if (movimentos[0].x < movimentos[1].x) {
                throw Error(JSON.stringify({"message": "Movimento inválido", "movimento": movimentos, "speechRecognitionResult": speechRecognitionResult}));
            }

            return JSON.parse(movimentos[0].object);
        }
    }

    // talvez a distancia de lenveinstein ajude a processar a particula
    // Soundex Distance Metric
    processaTranscricao(transcription) {
        let particulas = [];

        transcription = transcription.toString().replace(new RegExp(/[èéêë]/g),"e");

        // A vogal 'A' é interpretadas como particulas da sentença
        // As conjunções 'DE' e 'E' são interpretadas como particulas da sentença
        let entrada = transcription.toUpperCase().replace(/[^A-Z0-9 ]/g, "").trim().split(" ");

        // traduz do extenso para numeral
        // Adicionado espaço na frente da palavra para melhor funcionamento do soundex
        // que transforma de maneira diferente 'DUM' e 'D UM' 
        let extenso = [" ZERO", " UM", " DOIS", " TRES", " QUATRO", " CINCO", " SEIS", " SETE", " OITO"]

        entrada.forEach((value, key) => {
            if (extenso.includes(value)) {
                entrada[key] = extenso.indexOf(value);
            }
        })

        let str = entrada.join(' ').replace(/([0-9])/g, (match, p1, offset, string) => {
            return extenso[parseInt(p1)];
        });

        let regex = new RegExp(`([A-Z]+(\\s?)(${extenso.join("|")}))([\\s][\\w]*[\\s])?([A-Z]+(\\s?)(${extenso.join("|")}))`);
        let found = str.match(regex);

        if (found !== null) {
            if (/[A-H]/.test(found[1][0]) && /[A-H]/.test(found[5][0])) {
                let particula1 = null;
                let particula2 = null;

                if (((particula1 = Object.values(posicoes).filter((posicao) => posicao.soundex === this.soundex(found[1]))).length > 0) &&
                    ((particula2 = Object.values(posicoes).filter((posicao) => posicao.soundex === this.soundex(found[5]))).length > 0)
                ) {
                    particulas.push(particula1[0], particula2[0]);
                }
            }
        }

        return particulas;
    }

    soundex(s) {
        var a = s.toLowerCase().split(''),
            f = a.shift(),
            r = '',
            codes = {
                a: '', e: '', i: '', o: '', u: '',
                b: 1, f: 1, p: 1, v: 1,
                c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2,
                d: 3, t: 3,
                l: 4,
                m: 5, n: 5,
                r: 6
            };

        r = f +
            a
            .map(function (v, i, a) { return codes[v] })
            .filter(function (v, i, a) {
                return ((i === 0) ? v !== codes[f] : v !== a[i - 1]);
            })
            .join('');
    
        return (r + '000').slice(0, 4).toUpperCase();
    }
}