let dataSiswa = [];
let indexEdit = -1;

const form = document.getElementById("formPendaftaran");
const nama = document.getElementById("nama");
const jurusan = document.getElementById("jurusan");
const eskul = document.getElementById("eskul");
const table = document.querySelector("table");


form.addEventListener("submit", function (e) {
    e.preventDefault();

    const kelasDipilih = document.querySelector(
        'input[name="kelas"]:checked'
    );

    if (nama.value === "" || !kelasDipilih || jurusan.value === "" || eskul.value === "") {
        alert("Semua data harus diisi!");
        return;
    }

    const data = {
        nama: nama.value,
        kelas: kelasDipilih.value,
        jurusan: jurusan.value,
        eskul: eskul.value
    };

    
    if (indexEdit !== -1) {
        dataSiswa[indexEdit] = data;
        indexEdit = -1;

        alert("Data berhasil di edit!");
    } 
    
    else {
        dataSiswa.push(data);
        alert("Data berhasil ditambahkan!");
    }

    tampilkanData();
    form.reset();
});

function tampilkanData() {
    
    let tbody = table.querySelector("tbody");

    if (!tbody) {
        tbody = document.createElement("tbody");
        table.appendChild(tbody);
    }

    tbody.innerHTML = "";

    dataSiswa.forEach(function (data, index) {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.nama}</td>
            <td>${data.kelas}</td>
            <td>${data.jurusan}</td>
            <td>${data.eskul}</td>
            <td>
                <button class="btn-edit" onclick="editData(${index})">
                    Edit
                </button>

                <button class="btn-delete" onclick="hapusData(${index})">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function editData(index) {
    const data = dataSiswa[index];

    nama.value = data.nama;
    jurusan.value = data.jurusan;
    eskul.value = data.eskul;

    
    const radioKelas = document.querySelectorAll('input[type="radio"]');

    radioKelas.forEach(function (radio) {
        if (radio.value === data.kelas) {
            radio.checked = true;
        }
    });

    indexEdit = index;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function hapusData(index) {
    const konfirmasi = confirm("Apakah yakin ingin menghapus data ini?");

    if (konfirmasi) {
        dataSiswa.splice(index, 1);

        tampilkanData();

        alert("Data berhasil dihapus!");
    }
}