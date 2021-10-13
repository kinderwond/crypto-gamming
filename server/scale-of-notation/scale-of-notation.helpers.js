function asciiToHex(char) {
    return Number(str.charCodeAt(char)).toString(16);
}

function asciiStringToHex(str) {
    let arr1 = [];
    for (let n = 0, l = str.length; n < l; n++) {
        let hex = asciiToHex(n)
        arr1.push(hex + " ");
    }
    return arr1
}

function asciiToDec(char) {

}

function binToDec(bin) {
    return parseInt(bin, 2);
}
function decToBin(x) {
    let bin = 0;
    let rem, i = 1, step = 1;
    while (x != 0) {
        rem = x % 2;
        console.log(
            `Step ${step++}: ${x}/2, Remainder = ${rem}, Quotient = ${parseInt(x / 2)}`
        );
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
    }
    console.log(`Binary: ${bin}`);
}

module.exports = {
    asciiStringToHex,
    asciiToHex,
    asciiToDec,

    binToDec,
    decToBin,
}