function hitungPasangKaosKaki(array) {
    let kemunculan = {};
    let jumlahPasang = 0;

    for (let i = 0; i < array.length; i++) {
        let angka = array[i];
        if (kemunculan[angka]) {
            kemunculan[angka]++;
        } else {
            kemunculan[angka] = 1;
        }
    }

    for (let angka in kemunculan) {
        if (kemunculan[angka] >= 2) {
            jumlahPasang += Math.floor(kemunculan[angka] / 2);
        }
    }

    return jumlahPasang;
}

const array1 = [5, 7, 7, 9, 10, 4, 5, 10, 6, 5];
const array2 = [10, 20, 20, 10, 10, 30, 50, 10, 20];

console.log(hitungPasangKaosKaki(array1)); // Output: 3
console.log(hitungPasangKaosKaki(array2)); // Output: 3
