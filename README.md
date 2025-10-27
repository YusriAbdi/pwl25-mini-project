# pwl25-mini-project - Products REST API (CRUD)
Nama: [Yusri Abdi]
NIM: [F1D02310098]

## Ringkasan Proyek
Proyek ini mengimplementasikan REST API CRUD (Create, Read, Update, Delete) sederhana untuk mengelola data produk menggunakan Node.js dengan framework Express.js dan database MySQL. Struktur proyek mengikuti pola Model-View-Controller (MVC) dan menyertakan middleware wajib (Logger, Validator, Error Handler).

## Struktur Folder Proyek
Struktur folder mengadopsi pola MVC (Model, Controller, Routes) yang dipadukan dengan folder untuk Config dan Middleware. 

<img width="441" height="813" alt="image" src="https://github.com/user-attachments/assets/34b39fab-1c09-4faf-bc94-f8855ea848a0" />

## Database
Saya menggunakan database MySQL dengan nama week6-express-db dan satu tabel bernama obat.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6fe8a75b-e455-499f-873f-8daca350f967" />

## Penjelasan Kode Utama
Berikut adalah penjelasan singkat untuk setiap file berdasarkan kode yang Anda berikan:
1. **config/db.js**: Menghubungkan aplikasi ke database MySQL menggunakan mysql2/promise dengan konfigurasi yang diambil dari .env. Ini memastikan informasi sensitif terpisah dari kode.

2. **models/obatModel.js**: Bertanggung jawab untuk semua interaksi database (CRUD). Fungsi-fungsi di sini mengeksekusi query SQL murni, seperti getAllObat, addObat, updateObat, dan deleteObat.

3. **controllers/obatController.js**: Mengandung logika bisnis dan menangani request dari client (mengambil data dari req.params atau req.body) dan mengirimkan response JSON. Ia memanggil fungsi dari obatModel dan menangani error dasar (misalnya, data tidak ditemukan).

4. **routes/obatRoutes.js**: Mendefinisikan semua endpoint CRUD untuk resource /api/produk dan mengarahkan request ke controller yang sesuai.
    GET /: getAllObat (Mengambil semua data produk)
    GET /:id: getObatById (Mengambil data produk berdasarkan ID)
    POST /: validateObat, createProduct (Menambahkan produk baru)
    PUT /:id: validateObat, updateProduct (Memperbarui data produk berdasarkan ID)
    DELETE /:id: deleteObat (Menghapus produk berdasarkan ID)

5. **middleware/logger.js**: Middleware sederhana untuk mencatat metode HTTP (req.method) dan URL (req.url) dari setiap request yang masuk ke server.

6. **middleware/validateObat.js**: Middleware validasi input. Ini memastikan field wajib (nama, kategori, dosis, harga, exp) tidak kosong sebelum request dilanjutkan ke controller. Jika ada yang kosong, ia akan mengembalikan response HTTP 400 Bad Request.

7. **middleware/errorHandler.js**: Middleware penanganan error. Jika ada error yang tidak tertangkap (HTTP 500), middleware ini akan mencatat error tersebut di konsol server dan mengirimkan response JSON ke client dengan pesan error umum.

8. **app.js** File entry point. Menginisialisasi Express, mendaftarkan middleware global (express.json(), logger, errorHandler), dan mengaitkan route (/api/produk) ke router produk.

## Implementasi Middleware Wajib
- logger (middleware/logger.js): Mencatat setiap request yang masuk (METHOD URL) ke konsol server.
- validateProduct (middleware/validateProduct.js): Memastikan field wajib (nama, kategori, dosis, harga, exp) terisi sebelum operasi POST atau PUT dilanjutkan. Jika gagal, mengembalikan HTTP 400.
- errorHandler (middleware/errorHandler.js): Middleware terakhir untuk menangkap error yang tidak terduga dan mengembalikan response HTTP 500 yang seragam.

## Hasil Uji API dengan Postman
1. Screenshot Endpoint GET: Gambar dibawah menunjukkan hasil pengujian endpoint GET pada URL http://localhost:3000/obat/ menggunakan Postman. Endpoint ini berfungsi untuk mengambil seluruh data obat yang tersimpan di dalam database. Pada bagian pengaturan request, tidak terdapat parameter maupun body karena metode GET hanya digunakan untuk membaca data. Hasil response yang ditampilkan dalam format JSON menunjukkan bahwa proses pengambilan data berhasil dengan nilai "success": true. Data yang dikembalikan berupa array berisi beberapa objek obat, masing-masing memiliki atribut seperti id, nama, kategori, dosis, harga, exp. Berdasarkan hasil tersebut dapat disimpulkan bahwa endpoint GET /api/produk berfungsi dengan baik dan berhasil menampilkan seluruh data produk secara lengkap dari database.
   
   <img width="1920" height="1080" alt="GET All data" src="https://github.com/user-attachments/assets/de883ea2-b522-4196-81dd-366274af9510" />

2. Screenshot Endpoint GET berdasarkan ID: Gambar dibawah menunjukkan hasil pengujian endpoint GET pada URL http://localhost:3000/obat/1 menggunakan Postman. Endpoint ini digunakan untuk mengambil data produk berdasarkan ID tertentu, dalam hal ini produk dengan ID = 1. Pada pengaturan request, tidak terdapat body karena metode GET hanya digunakan untuk membaca data dari server. Hasil response yang diterima dalam format JSON menampilkan status "success": true, yang menandakan permintaan berhasil diproses. Data yang dikembalikan berupa satu objek produk dengan detail seperti "id": 1, "nama": "Paracetamol", "kategori": "Analgesik", "dosis": "500mg", "harga": 5000, "exp": 2027. Berdasarkan hasil tersebut, dapat disimpulkan bahwa endpoint GET /obat/:id berfungsi dengan baik dan berhasil menampilkan data produk sesuai ID yang diminta.
   
   <img width="1920" height="1080" alt="GET data by ID" src="https://github.com/user-attachments/assets/62537840-6419-4f13-8135-db81ddf3ed4f" />

3. Screenshot Endpoint POST: Gambar dibawah menunjukkan hasil pengujian endpoint POST pada URL http://localhost:3000/obat/ menggunakan Postman. Endpoint ini berfungsi untuk menambahkan data obat baru ke dalam database. Pada bagian pengaturan request, tipe body yang digunakan adalah raw JSON, di mana pengguna mengirimkan data produk seperti nama, kategori, dosis, harga, exp. Setelah permintaan dikirim, server merespons dengan kode status 201 Created, yang menandakan bahwa data berhasil ditambahkan. Response JSON menampilkan "success": true dan pesan "message": "Obat berhasil ditambahkan". Berdasarkan hasil tersebut, dapat disimpulkan bahwa endpoint POST /api/produk berfungsi dengan baik dan berhasil menambahkan obat baru ke dalam database sesuai data yang dikirimkan melalui request.
   
   <img width="1920" height="1080" alt="POST data" src="https://github.com/user-attachments/assets/b03b3160-efa0-4829-b5aa-c7c98b303560" />

4. Screenshot Endpoint PUT dengan ID: Gambar dibawah menunjukkan hasil pengujian endpoint PUT pada URL http://localhost:3000/obat/9 menggunakan Postman. Endpoint ini digunakan untuk memperbarui data produk yang sudah ada berdasarkan ID tertentu, dalam hal ini produk dengan ID = 9. Pada bagian body, pengguna mengirimkan data baru dalam format raw JSON, seperti nama, kategori, dosis, harga, exp. Setelah permintaan dijalankan, server memberikan respons dengan status 200 OK yang menandakan pembaruan data berhasil dilakukan. Hasil response JSON menampilkan "success": true dan pesan "message": "Obat updated". Berdasarkan hasil tersebut, dapat disimpulkan bahwa endpoint PUT /obat/:id berfungsi dengan baik dan berhasil memperbarui data obat sesuai dengan informasi yang dikirimkan melalui request.
   
   <img width="1920" height="1080" alt="PUT data by ID" src="https://github.com/user-attachments/assets/da05e85b-8e75-4645-b4fd-7b18eb6f2d42" />

5. Screenshot Endpoint DELETE dengan ID: Gambar dibawah menunjukkan hasil pengujian endpoint DELETE pada URL http://localhost:3000/obat/9 menggunakan Postman. Endpoint ini digunakan untuk menghapus data produk berdasarkan ID tertentu, dalam hal ini produk dengan ID = 9. Pada pengujian ini, metode DELETE digunakan untuk menghapus data secara permanen dari database, sehingga tidak diperlukan body pada request. Setelah permintaan dijalankan, server memberikan respons dalam format JSON dengan nilai "success": true dan pesan "message": "Product deleted", yang menandakan bahwa proses penghapusan data berhasil dilakukan. Berdasarkan hasil tersebut, dapat disimpulkan bahwa endpoint DELETE /obat/:id berfungsi dengan baik dan berhasil menghapus data produk sesuai dengan ID yang diminta dari database.
 
   <img width="1920" height="1080" alt="DELETE by ID" src="https://github.com/user-attachments/assets/a874fa63-f651-4d24-bc57-36f7b44bf6d5" />
