import { initializeCart } from 'login.html';
// Import library MongoDB
const MongoClient = require('mongodb').MongoClient;

// Di isi dengan URL koneksi MongoDB yang sudah dibuat
const url = 'mongodb+srv://p3orderfood:ratuifah26@cluster0.0himu8k.mongodb.net/'; // Ganti sesuai URL MongoDB Anda

// Nama database
const dbName = 'P3orderfood'; // Ganti dengan nama database Anda

// Nama koleksi (tabel) yang akan digunakan
const collectionName = 'user'; // Ganti dengan nama koleksi Anda

// Fungsi untuk menghubungkan ke database MongoDB
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
        console.error('Koneksi ke MongoDB gagal:', err);
        return;
    }
    
    console.log('Koneksi ke MongoDB berhasil');
    
    // Gunakan database
    const db = client.db(dbName);
    
    // Contoh: Membaca data dari koleksi
    const collection = db.collection(collectionName);
    collection.find({}).toArray(function(err, documents) {
        if (err) {
            console.error('Gagal membaca data:', err);
        } else {
            console.log('Data dari koleksi:');
            console.log(documents);
        }
        
        // Tutup koneksi
        client.close();
    });
});
