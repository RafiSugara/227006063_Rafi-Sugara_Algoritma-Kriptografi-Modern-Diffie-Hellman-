function modExp(base, exponent, modulus) {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1)
            result = (result * base) % modulus;
        exponent = exponent >> 1; // integer division by 2
        base = (base * base) % modulus;
    }
    return result;
}

document.getElementById("dhParametersForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const prime = parseInt(document.getElementById("prime").value);
    const base = parseInt(document.getElementById("base").value);
    const privateKey = parseInt(document.getElementById("privateKey").value);
    const publicKey = modExp(base, privateKey, prime);
    
    alert("Hasil public key: " + publicKey);

    const otherPublicKey = parseInt(prompt("Masukkan public key orang lain:"));
    const sharedKey = modExp(otherPublicKey, privateKey, prime);
    document.getElementById("sharedKey").textContent = "Shared Key: " + sharedKey;
    document.getElementById("encryptionForm").style.display = "block";
    document.getElementById("decryptionForm").style.display = "block";
});

function encryptText(plainText, key) {
    let encryptedText = "";
    for (let i = 0; i < plainText.length; i++) {
        encryptedText += String.fromCharCode(plainText.charCodeAt(i) ^ key);
    }
    return encryptedText;
}

function decryptText(cipherText, key) {
    let decryptedText = "";
    for (let i = 0; i < cipherText.length; i++) {
        decryptedText += String.fromCharCode(cipherText.charCodeAt(i) ^ key);
    }
    return decryptedText;
}

document.getElementById("encryptionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const plainText = document.getElementById("plainText").value;
    const key = parseInt(document.getElementById("sharedKey").textContent.split(":")[1]);
    const encryptedText = encryptText(plainText, key);
    document.getElementById("encryptedText").textContent = "Hasil Enkripsi: " + encryptedText;
});

document.getElementById("decryptionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const cipherText = document.getElementById("cipherText").value;
    const key = parseInt(document.getElementById("sharedKey").textContent.split(":")[1]);
    const decryptedText = decryptText(cipherText, key);
    document.getElementById("decryptedText").textContent = "Hasil Dekripsi: " + decryptedText;
});