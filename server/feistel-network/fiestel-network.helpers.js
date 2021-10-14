const prepareBinary = (bin) => {
    if (!Array.isArray(bin)) {
        bin = bin.split(" ")
    }
    return bin
}
module.exports = {
    prepareBinary
}