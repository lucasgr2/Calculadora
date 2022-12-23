const previu = document.querySelector("#previu");
const current = document.querySelector("#current");
const butons = document.querySelectorAll("#butoes button");

class calculator {
    constructor(previu, current) {
        this.previu = previu;
        this.current = current;
        this.currentoperation = "";
    }

    //add digit to calculator screen
    adddigit(digit) {
        if (digit === "." && this.current.innerText.includes(".")) { // faz com que só haja um ponto no numero
            return;
        }
        this.currentoperation = digit;
        this.updatescreen();
    }

    // realiza as operacoes basicas
    processoperation(operation) {
        // checa se current tem valor
        if (this.current.innerText === "" && operation !== "C") {
            if (this.previu.innerText !== "") {
                this.changeoperation(operation);
            }
            return;
        }

        let operationValue;
        let newoperation = operation;
        let previu = +this.previu.innerText.split(" ")[0];//pegar só o numero do previu sem o operador
        let current = +this.current.innerText;
        const matchoperation = ["+", "-", "*", "/"]

        if (matchoperation.includes(operation)) {
            if (previu !== 0 && current !== 0) {
                operation = this.previu.innerText.split(" ")[1];

                console.log(newoperation)
            }
        }


        switch (operation) {
            case "+":
                operationValue = previu + current;
                this.updatescreen(newoperation, operationValue, previu, current);
                break;
            case "-":
                operationValue = previu - current;
                this.updatescreen(newoperation, operationValue, previu, current);
                break;
            case "*":
                operationValue = previu * current;
                this.updatescreen(newoperation, operationValue, previu, current);
                break;
            case "/":
                operationValue = previu / current;
                this.updatescreen(newoperation, operationValue, previu, current);
                break;
            case "DEL":

                this.cleansetups(operation);
                break;
            case "CE":

                this.cleansetups(operation);
                break;
            case "C":

                this.cleansetups(operation);
                break;
            case "=":

                this.cleansetups(operation);
                break;

            default:
                return;
        }

    }

    // insert number to screen
    updatescreen(operation = null, operationValue = null, previu = null, current = null) {
        // caso seja adicionado um numero no current
        if (operationValue === null) {
            this.current.innerText += this.currentoperation;
        } else { // caso aperte um operador

            if (previu === 0) { // se o previu for 0 só preciso adicionar o current mais o operador nele
                operationValue = current;
            }
            this.previu.innerText = `${operationValue} ${operation}`;
            this.current.innerText = "";
        }

    }

    //conseguir altera a operação
    changeoperation(operation) {
        const matchoperation = ["+", "-", "*", "/"]

        if (!matchoperation.includes(operation)) {
            return;
        }
        this.previu.innerText = this.previu.innerText.slice(0, -1) + operation;
    }

    // para as opções del c e ce
    cleansetups(operation) {
        if (operation === "DEL") {
            this.current.innerText = this.current.innerText.slice(0, -1);

        } else if (operation === "CE") {
            this.current.innerText = "";
        } else if (operation === "C") {
            this.current.innerText = "";
            this.previu.innerText = "";
        } else if (operation === "=") {
            let operation = this.previu.innerText.split(" ")[1];
            this.processoperation(operation);
        }
    }

}


const calc = new calculator(previu, current)

butons.forEach((btn) => { // esta pecorrendo o array de buttons
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText; // esta me passando o valor do butao selecionado
        if (+value >= 0 || value === ".") { // o + esta convertendo o atributo para number
            calc.adddigit(value);
        } else {
            calc.processoperation(value);
        }
    });
});