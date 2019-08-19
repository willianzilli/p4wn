const pieces = {
    2: "peão",
    4: "torre",
    6: "cavalo",
    8: "bispo",
    10: "rei",
    12: "rainha"
}
const posicoes = [
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "H7",
    "H8",
    "G1",
    "G2",
    "G3",
    "G4",
    "G5",
    "G6",
    "G7",
    "G8",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "S6",
    "S7",
    "S8",
    "E1",
    "E2",
    "E3",
    "E4",
    "E5",
    "E6",
    "E7",
    "E8",
    "D1",
    "D2",
    "D3",
    "D4",
    "D5",
    "D6",
    "D7",
    "D8",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8"
];

const conjuncoes = ["na", "para", "captura"];

const commands = [
    "{peca} ?{conjuncao}+ {posicao}",
    "{posicao} ?{conjuncao}+ {posicao}"
]

// Explodir a transcrição e extrair as informações
class Interpretador {
    entry(transcription) {
        let movimento = [null, null];
        let particulas = transcription.toString().toLowerCase().replace(/\.,!\?:\+-#%;/g, "").trim().split(" ");

        // Verificar a Distância Levenshtein para cada peça e posição
        if (pieces.includes(particulas[0]) || posicoes.includes(particulas[0]) &&
            posicoes.includes(particulas[particulas.length - 1])
        ) {

        }

        return movimento;
    }

    extract() {
        particulas.forEach(particula => {
            if (conjuncoes.includes(particula)) {

            }
        })

        return movimento;
    }
}