function hitungJumlahKata(kalimat) {
    // Pisahkan kalimat menjadi array kata-kata menggunakan spasi sebagai pemisah
    var kataArray = kalimat.split(" ");

    // Inisialisasi jumlah kata yang valid (tanpa karakter khusus)
    var jumlahKataValid = 0;

    // Iterasi melalui setiap kata dalam array
    for (var i = 0; i < kataArray.length; i++) {
        // Periksa apakah kata tidak mengandung karakter khusus
        if (/^[a-zA-Z0-9,.?!]+$/i.test(kataArray[i])) {
            jumlahKataValid++;
        }

    }

    return jumlahKataValid;
}

// Contoh penggunaan
var kalimat1 = "Saat meng*ecat tembok, Agung dib_antu oleh Raihan.";
console.log("a. Input: " + kalimat1);
console.log("Output: " + hitungJumlahKata(kalimat1));

var kalimat2 = "Berapa u(mur minimal[ untuk !mengurus ktp?";
console.log("b. Input: " + kalimat2);
console.log("Output: " + hitungJumlahKata(kalimat2));

var kalimat3 = "Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda.";
console.log("c. Input: " + kalimat3);
console.log("Output: " + hitungJumlahKata(kalimat3));

var kalimat4 = "Kemarin Shopia per[gi ke mall.";
console.log("d. Input: " + kalimat4);
console.log("Output: " + hitungJumlahKata(kalimat4));
