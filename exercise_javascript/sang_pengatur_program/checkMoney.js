function checkMoney(money) {
    if (typeof money !== 'number') {
        throw new Error("Inputnya diperhatikan lagi ya dek");
    }
    let playstation5 = 500000;
    if (money <= playstation5) {
        throw new Error("Uangmu kurang dek, minta ke mamah dulu");
    }
    let kembalian = money - playstation5;
    return console.log(`selamat ya dek ini kembaliannya : ${kembalian}`)
}
try {
    a = checkMoney(5544000);
} catch (err) {
    console.error(err)
}
