# Generator Surat Desa v3.0 - Fitur Baru

## 🎉 Perubahan Utama

### 1. **Profil Terpisah untuk SK dan Surat Keterangan**
- Sekarang Anda dapat mengatur profil berbeda untuk:
  - 📜 **Surat Keputusan (SK)** - dengan logo dan kop surat sendiri
  - 📋 **Surat Keterangan** - dengan logo dan kop surat sendiri
- Setiap profil dapat diatur secara independen

### 2. **Format Dokumen Seperti Word**
- Tampilan surat kini mengikuti format dokumen Word yang profesional
- Header dengan logo di samping kiri
- Format tabel data yang rapi
- Penempatan tanda tangan yang sesuai standar

### 3. **Fitur Edit Logo**
- Upload logo dari komputer (support gambar format umum)
- Atau masukkan URL logo dari internet
- Preview langsung logo yang dipilih
- Logo terpisah untuk SK dan Surat Keterangan

### 4. **Fitur Edit Keterangan Header**
Setiap profil dapat mengatur:
- Nama Pemerintah Daerah
- Nama Kecamatan
- Nama Desa
- Alamat Lengkap
- Nama Kepala Desa
- Nama Sekretaris Desa

### 5. **Fitur yang Dihapus (Lebih Bersih)**
- ❌ Hapus fitur tambah template custom yang tidak terpakai
- ❌ Hapus profil multi-instansi yang membingungkan
- ✅ Fokus pada 2 profil utama: SK dan Surat Keterangan

## 📋 Cara Menggunakan

### Setup Awal
1. Buka aplikasi
2. Klik menu **Profil** di atas
3. Pilih tab **Profil SK** atau **Profil Surat Keterangan**
4. Klik tombol **Edit Profil**
5. Isi data:
   - Upload logo atau masukkan URL logo
   - Isi informasi kop surat (pemerintah daerah, kecamatan, desa, dll)
   - Klik **Simpan**

### Membuat Surat
1. Di halaman utama, pilih kategori:
   - **Surat Keputusan** - untuk SK RT, RW, Perangkat, dll
   - **Surat Keterangan** - untuk domisili, usaha, dll
2. Pilih jenis surat yang ingin dibuat
3. Isi form dengan data lengkap
4. Klik **Generate Surat**
5. Surat akan ditampilkan dengan format seperti dokumen Word
6. Anda bisa:
   - **Download PDF** - unduh dalam format PDF
   - **Cetak** - print langsung
   - **Edit** - kembali ke form untuk edit

### Mengelola Arsip
1. Klik menu **Arsip**
2. Filter berdasarkan kategori (SK atau Surat Keterangan)
3. Cari surat dengan nama atau nomor
4. Hapus surat yang tidak diperlukan

## 🎨 Tampilan Format Word-like

Surat yang dihasilkan memiliki struktur:

```
┌────────────────────────────────────────┐
│  [LOGO]    PEMERINTAH DAERAH...       │
│            KECAMATAN...                │
│            DESA...                     │
│            Alamat: ...                 │
├────────────────────────────────────────┤
│                                        │
│      SURAT KETERANGAN USAHA           │
│         Nomor: 510 / SKU / 2025       │
│                                        │
│  Yang bertanda tangan di bawah ini... │
│                                        │
│  Nik        : 3213261709860001        │
│  Nama       : PIAN SOFIAN             │
│  Tempat tgl : Subang, 15-05-1964     │
│  Pekerjaan  : Mengurus Rumah tangga   │
│  Alamat     : Gg. Sukalela Rt. 003... │
│  Usaha      : Warung Makanan          │
│  Bertempat  : Kasomalang Kulon        │
│                                        │
│  Orang tersebut adalah warga Desa...  │
│                                        │
│              Kasomalang Kulon, 17 Nov │
│              a.n Kepala Desa          │
│              Sekretaris Desa          │
│                                        │
│              [TTD]                    │
│                                        │
│              APIPUDIN,SIP              │
└────────────────────────────────────────┘
```

## 🔧 Teknologi

- HTML5 + CSS3 (Tailwind CSS)
- Vanilla JavaScript (ES6+)
- LocalStorage untuk penyimpanan data
- html2pdf.js untuk export PDF
- Responsive design untuk mobile & desktop

## 📱 Fitur Mobile-Friendly

- Tampilan responsif untuk semua ukuran layar
- Touch-friendly buttons
- Optimasi layout untuk tablet dan smartphone

## 💾 Data Storage

Semua data disimpan di browser menggunakan LocalStorage:
- `profilSK` - Profil Surat Keputusan
- `profilSKET` - Profil Surat Keterangan
- `arsipList` - Daftar arsip surat

## 🚀 Menjalankan Aplikasi

```bash
# Install dependencies
npm install

# Run development server
npm start

# Atau langsung buka file
# Buka index_new.html di browser
```

## 📝 Catatan Penting

1. **Logo**: Pastikan logo memiliki resolusi yang baik (minimal 200x200px)
2. **Data**: Data disimpan di browser, jangan clear cache jika ingin data tetap tersimpan
3. **Browser**: Gunakan browser modern (Chrome, Firefox, Edge) untuk hasil terbaik
4. **Print**: Gunakan fitur Print untuk hasil cetak terbaik, atau Download PDF untuk file digital

## 🆕 Update dari Versi Lama

Jika Anda upgrade dari versi lama:
- Data arsip lama masih tersimpan
- Anda perlu setup ulang profil SK dan SKET
- Struktur data lebih sederhana dan terorganisir

## 📞 Support

Jika ada pertanyaan atau masalah, silakan hubungi tim developer.

---

**Version**: 3.0.0  
**Last Update**: January 15, 2026  
**Compatibility**: Modern Browsers (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
