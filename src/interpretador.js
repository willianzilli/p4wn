const pieces = {
    2: "peão",
    4: "torre",
    6: "cavalo",
    8: "bispo",
    10: "rei",
    12: "rainha"
}

const conjuncoes = ["na", "para", "captura"];

class Interpretador {
    entry(transcription) {
        let movimento = [null, null];
        let particulas = transcription.replace(/\.,!\?:\+-#%;/g, "").split(" ");

        particulas.forEach(particula => {

            if (conjuncao.includes(particula)) {

            }
        })

        return movimento;
    }
}