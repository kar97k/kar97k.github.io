function check_sequence(str) {

    const charChain = str.toString();

    const STATES = {
        H : 'H',
        G: 'G',
        F: 'F',
        FK: 'FK',
        FG: 'FG',
        FKG: 'FKG',
        S: 'S',
        ER: 'ER',
    };

    const TERMINALS = ['a', 'b', '*'];

    let currentState = STATES.H;

    let html = '';

    [...charChain].forEach((char, index, strArray) => {

        let isLastSymbol = (+index === (strArray.length - 1));

        switch (currentState) {
            case STATES.H: {
                //Ввели одну букву
                if (isLastSymbol) {
                    currentState = STATES.ER;
                }
                // H ---> a ---> G
                else if (char === TERMINALS[0]) {
                    html +=('<div>' + STATES.H + ' ---> ' + char + ' ---> ' + STATES.G + '</div>');
                    currentState = STATES.G;
                }
                else {
                    currentState = STATES.ER;
                }
                break;
            }

            case STATES.G: {
                //Нет перехода в S
                if (isLastSymbol) {
                    currentState = STATES.ER;
                }
                // G ---> a ---> G
                else if (char === TERMINALS[0]) {
                    currentState = STATES.G;
                    html +=('<div>' + STATES.G + ' ---> ' + char + ' ---> ' + STATES.G + '</div>');
                }
                // G ---> b ---> F
                else if (char === TERMINALS[1]) {
                    currentState = STATES.F;
                    html +=('<div>' + STATES.G + ' ---> ' + char + ' ---> ' + STATES.F + '</div>');
                }
                else {
                    currentState = STATES.ER;
                }
                break;
            }

            case STATES.F: {
                //Последняя итерация
                if (isLastSymbol) {
                    // F ---> * ---> S
                    if (char === TERMINALS[2]) {
                        currentState = STATES.S;
                        html +=('<div>' + STATES.F + ' ---> ' + char + ' ---> ' + STATES.S + '</div>');
                    }
                }
                else {
                    // F ---> a ---> F
                    if (char === TERMINALS[0]) {
                        currentState = STATES.F;
                        html +=('<div>' + STATES.F + ' ---> ' + char + ' ---> ' + STATES.F + '</div>');
                    }
                    // F ---> b ---> FK
                    else if (char === TERMINALS[1]) {
                        currentState = STATES.FK;
                        html +=('<div>' + STATES.F + ' ---> ' + char + ' ---> ' + STATES.FK + '</div>');
                    }
                    else {
                        currentState = STATES.ER;
                    }
                }
                break;
            }

            case STATES.FK: {
                //Последняя итерация
                if (isLastSymbol) {
                    // FK ---> * ---> S
                    if (char === TERMINALS[2]) {
                        currentState = STATES.S;
                        html +=('<div>' + STATES.FK + ' ---> ' + char + ' ---> ' + STATES.S + '</div>');
                    }
                }
                else {
                    // FK ---> a ---> FG
                    if (char === TERMINALS[0]) {
                        currentState = STATES.FG;
                        html +=('<div>' + STATES.FK + ' ---> ' + char + ' ---> ' + STATES.FG + '</div>');
                    }
                    // FK ---> b ---> FKG
                    else if (char === TERMINALS[1]) {
                        currentState = STATES.FKG;
                        html +=('<div>' + STATES.FK + ' ---> ' + char + ' ---> ' + STATES.FKG + '</div>');
                    }
                    else {
                        currentState = STATES.ER;
                    }
                }
                break;
            }

            case STATES.FG: {
                //Последняя итерация
                if (isLastSymbol) {
                    // FG ---> * ---> S
                    if (char === TERMINALS[2] ) {
                        currentState = STATES.S;
                        html +=('<div>' + STATES.FG + ' ---> ' + char + ' ---> ' + STATES.S + '</div>');
                    }
                }
                else {
                    // FG ---> a ---> FG
                    if (char === TERMINALS[0]) {
                        currentState = STATES.FG;
                        html +=('<div>' + STATES.FG + ' ---> ' + char + ' ---> ' + STATES.FG + '</div>');
                    }
                    // FG ---> b ---> FKG
                    else if (char === TERMINALS[1]) {
                        currentState = STATES.FKG;
                        html +=('<div>' + STATES.FG + ' ---> ' + char + ' ---> ' + STATES.FKG + '</div>');
                    }
                    else {
                        currentState = STATES.ER;
                    }
                }
                break;
            }            
            
            case STATES.FKG: {
                //Последняя итерация
                if (isLastSymbol) {
                    // FKG ---> * ---> S
                    if (char === TERMINALS[2] ) {
                        currentState = STATES.S;
                        html +=('<div>' + STATES.FKG + ' ---> ' + char + ' ---> ' + STATES.S + '</div>');
                    }
                }
                else {
                    // FKG ---> a ---> FG
                    if (char === TERMINALS[0]) {
                        currentState = STATES.FG;
                        html +=('<div>' + STATES.FKG + ' ---> ' + char + ' ---> ' + STATES.FG + '</div>');
                    }
                    // FKG ---> b ---> FK
                    else if (char === TERMINALS[1]) {
                        currentState = STATES.FKG;
                        html +=('<div>' + STATES.FKG + ' ---> ' + char + ' ---> ' + STATES.FK + '</div>');
                    }
                    else {
                        currentState = STATES.ER;
                    }
                }
                break;
            }

            case STATES.S: {
                if (!isLastSymbol) {
                    currentState = STATES.ER;
                }
                break;
            }
        }
    });

    currentState === STATES.ER
        ? html+=('<div>Цепочка не принадлежит языку</div>')
        : html+=('<div>Цепочка принадлежит языку</div>');
    document.getElementById('log').insertAdjacentHTML('afterbegin', html);

}

let button = document.getElementById('confirm');
let input = document.getElementById('input');
let log = document.getElementById('log');
button.onclick = function() {
    if (input.value) {
        log.innerHTML = '';
        check_sequence(input.value);
    }
};
