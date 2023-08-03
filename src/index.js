module.exports = function check(str, bracketsConfig) {
    let result = [];
    bracketsConfig.forEach(bracketsPair => result.push(bracketsPair[0]));
    const OPENING_BRACKETS = result;
    result = [];
    bracketsConfig.forEach(bracketsPair => result.push(bracketsPair[1]));
    const CLOSING_BRACKETS = result;

    const BRACKETS = bracketsConfig.flat()
        .join('')
        .replace('[', '\\[')
        .replace(']', '\\]');
    const BRACKETS_REGEX = RegExp(`[${BRACKETS}]`, 'g');
    const BRACKETS_STACK = [];

    const ALL_BRACKETS_IN_STRING = str.match(BRACKETS_REGEX);

    if (!ALL_BRACKETS_IN_STRING) {
        return false;
    }

    for (let bracket of ALL_BRACKETS_IN_STRING) {
        if (OPENING_BRACKETS.indexOf(bracket) !== -1) {
            if (CLOSING_BRACKETS.indexOf(bracket) !== -1) {
                let index = BRACKETS_STACK.indexOf(bracket);
                if (index !== -1 && BRACKETS_STACK[BRACKETS_STACK.length - 1] === bracket) {
                    BRACKETS_STACK.pop();
                    continue;
                }
            }
            BRACKETS_STACK.push(bracket);
        } else {
            let lastBracket = BRACKETS_STACK.pop();
            if (!lastBracket) {
                return false;
            }
            for (let i = 0; i < bracketsConfig.length; i++) {
                if (CLOSING_BRACKETS[i] === bracket && OPENING_BRACKETS[i] !== lastBracket) {
                    return false;
                }
            }
        }
    }
    return BRACKETS_STACK.length === 0;
}