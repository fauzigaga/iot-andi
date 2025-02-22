import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, onValue, set } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';


// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA786BI95d1bCOaF61gTpZrw-ALd-EmMZc",
  authDomain: "iotsmart-83c7e.firebaseapp.com",
  databaseURL: "https://iotsmart-83c7e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iotsmart-83c7e",
  storageBucket: "iotsmart-83c7e.firebasestorage.app",
  messagingSenderId: "496332466674",
  appId: "1:496332466674:web:345e608936a96481ab636b",
  measurementId: "G-7817FTB3P0"
  };

// Inisialisasi aplikasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", function() {
    let Led1Status;

    // Referensi ke elemen database
    const ledRef = ref(database, 'Led1Status');

    // Referensi ke elemen HTML
    const ledEsp = document.getElementById("ledEsp");
    const border = document.getElementById("item");
    
    // Mendapatkan data dari database
    onValue(ledRef, function(snapshot) {
        Led1Status = snapshot.val();
        console.log("Current Led1Status from Firebase:", Led1Status); // Debugging log
        Led1Status === 1 ? (ledEsp.style.backgroundColor = "#02a2ff",
        ledEsp.style.color = "#fff",
        ledEsp.innerHTML ="TURN OFF",
        ledEsp.style.boxShadow = "0px 0px 10px 1px #02a2ff",
        border.style.boxShadow = "0px 0px 0px 0px #02a2ff",
        ledEsp.style.textShadow = "2px 2px 2px #000",
        ledEsp.style.borderColor = "#02a2ff" )
        : 
        (ledEsp.style.backgroundColor = "white",
            ledEsp.style.color = "#000",
            ledEsp.innerHTML ="TURN ON",
            ledEsp.style.boxShadow = "0px 0px 0px 0px #02a2ff",
            border.style.boxShadow = "0px 0px 10px 1px #02a2ff",
            ledEsp.style.textShadow = "1px 1px 1px #fff",
            ledEsp.style.borderColor = "#fff"
        );
    });

    // Event listener untuk tombol toggle
document.querySelector(".item-submit").addEventListener("click", function() {
    console.log("Button clicked. Current Led1Status:", Led1Status);
  
    if (Led1Status === undefined) {
      console.warn("LED status is not yet available.");
      return;
    }
    Led1Status === 1 ? (set(ledRef, 0), Led1Status = 0, ledEsp.style.backgroundColor = "white") : (set(ledRef, 1), Led1Status = 1);
  });
  
});
  