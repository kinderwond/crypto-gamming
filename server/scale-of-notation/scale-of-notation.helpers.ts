function asciiStringToHex(str: string): string[] {
    let arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
        let hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1;
}


function binToDec(bin: string) : number{
    return parseInt(bin, 2);
}

// program to convert decimal to binary
function decToBin(x: number) {
    let bin = 0;
    let rem, i = 1, step = 1;
    while (x != 0) {
        rem = x % 2;

        console.log(
            `Step ${step++}: ${x}/2, Remainder = ${rem}, Quotient = ${parseInt(String(x / 2))}`
        );
        x = parseInt(String(x / 2));
        bin = bin + rem * i;
        i = i * 10;
    }
    return String(bin)
}

export default {
    asciiStringToHex,

    binToDec,
    decToBin,
}