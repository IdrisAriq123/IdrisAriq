const readline = require("readline-sync");

let ulangi = true;
let history = []; // Menyimpan riwayat kalkulasi
let previousResult = null; // Menyimpan hasil kalkulasi terakhir

while (ulangi) {
    // Menu utama
    console.log("=== Menu Utama ===");
    console.log("1. Kalkulasi");
    console.log("2. Lihat Riwayat");
    console.log("3. Keluar");

    const pilihanUtama = readline.question("Pilih menu (1/2/3): ");

    switch (pilihanUtama) {
        case "1":
            kalkulasi();
            break;
        case "2":
            showHistory();
            break;
        case "3":
            const confirmExit = readline.question("Apakah anda yakin ingin keluar? (y/n): ");
            if (confirmExit.toLowerCase() === "y") {
                ulangi = false;
                console.log("Terima kasih telah menggunakan kalkulator ini.");
            }
            break;
        default:
            console.log("Pilihan tidak valid. Silakan coba lagi.");
    }
}

function kalkulasi() {
    console.log("\n=== Sub-Menu Kalkulasi ===");
    console.log("1. Pertambahan (+)");
    console.log("2. Pengurangan (-)");
    console.log("3. Perkalian (*)");
    console.log("4. Pembagian (/)");
    console.log("5. Modulus (%)");
    console.log("6. Akar");
    console.log("7. Sinus (sin)");
    console.log("8. Cosinus (cos)");
    console.log("9. Tangen (tan)");

    const pilihanKalkulasi = readline.question("Pilih operasi (1-9): ");
    let angkaPertama = previousResult !== null ? previousResult : readline.question("Masukkan Angka Pertama: ");
    
    if (previousResult !== null) {
        const usePrevious = readline.question("Gunakan hasil sebelumnya? (y/n): ");
        if (usePrevious.toLowerCase() === "y") {
            angkaPertama = previousResult;
        } else {
            angkaPertama = readline.question("Masukkan Angka Pertama: ");
        }
    }

    let angkaKedua;
    let hasil;
    
    switch (pilihanKalkulasi) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
            angkaKedua = readline.question("Masukkan Angka Kedua: ");
            if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
                console.log("Inputan tidak valid.");
                return;
            }
            hasil = processHasil(parseFloat(angkaPertama), getOperator(pilihanKalkulasi), parseFloat(angkaKedua));
            break;
        case "6": // Akar
            if (isNaN(angkaPertama)) {
                console.log("Inputan tidak valid.");
                return;
            }
            hasil = Math.sqrt(parseFloat(angkaPertama));
            break;
        case "7": // Sinus
            if (isNaN(angkaPertama)) {
                console.log("Inputan tidak valid.");
                return;
            }
            hasil = Math.sin(parseFloat(angkaPertama) * Math.PI / 180); // Dikonversi ke radian
            break;
        case "8": // Cosinus
            if (isNaN(angkaPertama)) {
                console.log("Inputan tidak valid.");
                return;
            }
            hasil = Math.cos(parseFloat(angkaPertama) * Math.PI / 180); // Dikonversi ke radian
            break;
        case "9": // Tangen
            if (isNaN(angkaPertama)) {
                console.log("Inputan tidak valid.");
                return;
            }
            hasil = Math.tan(parseFloat(angkaPertama) * Math.PI / 180); // Dikonversi ke radian
            break;
        default:
            console.log("Pilihan tidak valid.");
            return;
    }

    console.log(`Hasil: ${hasil}`);
    previousResult = hasil;
    history.push(`${angkaPertama} ${getOperator(pilihanKalkulasi)} ${angkaKedua || ""} = ${hasil}`);
}

function getOperator(pilihanKalkulasi) {
    switch (pilihanKalkulasi) {
        case "1":
            return "+";
        case "2":
            return "-";
        case "3":
            return "*";
        case "4":
            return "/";
        case "5":
            return "%";
        case "6":
            return "√";
        case "7":
            return "sin";
        case "8":
            return "cos";
        case "9":
            return "tan";
        default:
            return "";
    }
}

function processHasil(angkaPertama, operator, angkaKedua) {
    switch (operator) {
        case "+":
            return angkaPertama + angkaKedua;
        case "-":
            return angkaPertama - angkaKedua;
        case "*":
            return angkaPertama * angkaKedua;
        case "/":
            if (angkaKedua === 0) {
                return "Pembagian dengan 0 tidak diperbolehkan.";
            }
            return angkaPertama / angkaKedua;
        case "%":
            return angkaPertama % angkaKedua;
        default:
            return "Operator tidak dikenali.";
    }
}

function showHistory() {
    console.log("\n=== Riwayat Kalkulasi ===");
    if (history.length === 0) {
        console.log("Tidak ada riwayat kalkulasi.");
    } else {
        history.forEach((entry, index) => {
            console.log(`${index + 1}: ${entry}`);
        });
    }
}