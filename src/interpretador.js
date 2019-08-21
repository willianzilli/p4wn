// const PEAO = 2;
// const TORRE = 4;
// const CAVALO = 6;
// const BISPO = 8;
// const REI = 10;
// const RAINHA = 12;

var pecas = [
    "PEAO",
    "TORRE",
    "CAVALO",
    "BISPO",
    "REI",
    "RAINHA",
]

var posicoes = [
    "A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8",
    "A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7",
    "A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6",
    "A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5",
    "A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4",
    "A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3",
    "A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2",
    "A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1",
];

const conjuncoes = ["NA", "PARA", "CAPTURA"];

// D => DE
// C => SE, SER
// C6 => 2:44, 6
// C7
// B e D podem se confundir
// D6 => 16
// D7 => 17
// D8 => 18
// H6 => h-6

// Explodir a transcrição e extrair as informações
class Interpretador {
    entry(transcription) {
        let movimento = [];

        let particulas = this.processaParticulas(transcription);

        // Ainda tenho que ver como controlar pelo nome da peça
        // Object.entries(pieces).includes(particulas[0]) || 
        if (!posicoes.includes(particulas[0]))
            throw Error(`Posição ${particulas[0]} é inválida.`);
            
        if (!posicoes.includes(particulas[particulas.length - 1]))
            throw Error(`Posição final ${particulas[0]} é inválida.`);
        
        movimento.push(translate_board[particulas[0]]);
        movimento.push(translate_board[particulas[particulas.length - 1]]);

        return movimento;
    }

    // talvez a distancia de lenveinstein ajude a processar a particula
    processaParticulas(transcription) {
        let particulas = [];

        // A vogal 'A' é interpretadas como particulas da sentença
        // As conjunções 'DE' e 'E' são interpretadas como particulas da sentença
        let entrada = transcription.toString().toUpperCase().replace(/\.,!\?:\+-#%;/g, "").trim().split(" ");

        // traduz do extenso para numeral
        let extenso = [
            "UM", "DOIS", "TRES", "QUATRO", "CINCO", "SEIS", "SETE", "OITO"
        ]

        entrada.forEach((value, key) => {
            if (extenso.includes(value)) {
                entrada[key] = extenso.indexOf(value) + 1;
            }
        })

        let str = entrada.join(' ').replace(/(DE)/g, 'D').replace(/(SERUM)/g, 'C1');

        console.warn(str);

        let regex = new RegExp(`(([A-Z](\\s?)(\\d))|(${pecas.join("|")}))([\\w\\s]+)(([A-Z](\\s?)(\\d))|(${pecas.join("|")}))`);
        let found = str.match(regex);

        console.warn(found);

        if (found === null)
            throw new Error("Comando não reconhecido");

        particulas.push(
            found[1].replace(/\s/g, ""),
            found[7].replace(/\s/g, "")
        );

        return particulas;
    }
}