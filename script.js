/*
 * Proyek Akhir Semester Ganjil — Paket 1
 * XI RPL 2 | Pemrograman Web
 *
 * JS-01 sampai JS-09
 */

// Data awal disediakan guru. Jangan diubah.
const daftarKegiatan = ["Piket Kelas", "Rapat OSIS", "Kerja Bakti"];

function tampilkanKegiatan(daftar) {
  const elemenDaftar = document.getElementById("daftarKegiatan");

  if (elemenDaftar === null) {
    return;
  }

  elemenDaftar.innerHTML = "";

  // JS-01: Perulangan for
  for (let i = 0; i < daftar.length; i++) {

    // JS-02: Mengambil elemen Array berdasarkan indeks
    const namaKegiatan = daftar[i];

    const item = document.createElement("li");
    item.textContent = namaKegiatan;
    elemenDaftar.appendChild(item);
  }
}

// ================================================================
// KODE PENGHUBUNG ANTARMUKA — DISEDIAKAN GURU
// ================================================================

function perbaruiTampilan() {
  tampilkanKegiatan(daftarKegiatan);

  const elemenTotal = document.getElementById("totalKegiatan");
  if (elemenTotal !== null) {
    if (typeof hitungJumlahKegiatan === "function") {
      elemenTotal.textContent = hitungJumlahKegiatan(daftarKegiatan);
    } else {
      elemenTotal.textContent = daftarKegiatan.length;
    }
  }
}

function tampilkanStatus(pesan, berhasil) {
  const elemenStatus = document.getElementById("pesanStatus");
  if (elemenStatus === null) {
    return;
  }

  elemenStatus.textContent = pesan;
  elemenStatus.classList.remove("berhasil", "gagal");
  elemenStatus.classList.add(berhasil ? "berhasil" : "gagal");
}

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("inputKegiatan");
  const btnTambah = document.getElementById("btnTambah");
  const btnCari = document.getElementById("btnCari");
  const btnHapus = document.getElementById("btnHapus");

  if (input !== null && btnTambah !== null) {
    btnTambah.addEventListener("click", function () {
      if (typeof tambahKegiatan !== "function") return;

      const berhasil = tambahKegiatan(daftarKegiatan, input.value);
      tampilkanStatus(
        berhasil ? "Kegiatan berhasil ditambahkan." : "Nama kegiatan kosong atau sudah terdaftar.",
        berhasil
      );
      if (berhasil) input.value = "";
      perbaruiTampilan();
    });
  }

  if (input !== null && btnCari !== null) {
    btnCari.addEventListener("click", function () {
      if (typeof cariKegiatan !== "function") return;

      const indeks = cariKegiatan(daftarKegiatan, input.value);
      tampilkanStatus(
        indeks !== -1 ? `Kegiatan ditemukan pada indeks ${indeks}.` : "Kegiatan tidak ditemukan.",
        indeks !== -1
      );
    });
  }

  if (input !== null && btnHapus !== null) {
    btnHapus.addEventListener("click", function () {
      if (typeof hapusKegiatan !== "function") return;

      const berhasil = hapusKegiatan(daftarKegiatan, input.value);
      tampilkanStatus(
        berhasil ? "Kegiatan berhasil dihapus." : "Kegiatan tidak ditemukan.",
        berhasil
      );
      if (berhasil) input.value = "";
      perbaruiTampilan();
    });
  }

  perbaruiTampilan();
});

// ================================================================
// JS-03, JS-04, JS-05 — MENAMBAH KEGIATAN
// ================================================================

function tambahKegiatan(daftar, nama) {

  // JS-03: Menghilangkan spasi awal dan akhir
  const namaBersih = nama.trim();

  if (namaBersih === "") {
    return false;
  }

  // JS-04: Memeriksa kegiatan duplikat
  if (daftar.includes(namaBersih)) {
    return false;
  }

  // JS-05: Menambahkan kegiatan ke Array
  daftar.push(namaBersih);

  return true;
}

// ================================================================
// JS-06 — MENCARI KEGIATAN
// ================================================================

function cariKegiatan(daftar, nama) {

  // Menghilangkan spasi awal dan akhir
  const namaBersih = nama.trim();

  // Mencari indeks kegiatan
  return daftar.indexOf(namaBersih);
}

// ================================================================
// JS-07 DAN JS-08 — MENGHAPUS KEGIATAN
// ================================================================

function hapusKegiatan(daftar, nama) {

  // JS-07: Mencari indeks kegiatan
  const indeks = cariKegiatan(daftar, nama);

  // JS-08: Memeriksa apakah kegiatan ditemukan
  if (indeks === -1) {
    return false;
  }

  // Menghapus satu elemen dari Array
  daftar.splice(indeks, 1);

  return true;
}

// ================================================================
// JS-09 — MENGHITUNG JUMLAH KEGIATAN
// ================================================================

function hitungJumlahKegiatan(daftar) {

  // Mengembalikan jumlah seluruh elemen Array
  return daftar.length;
}