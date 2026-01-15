// ============================================
// APPLICATION STATE MANAGEMENT
// ============================================
const appState = {
    currentSection: 'home',
    currentKategori: null,
    currentJenisSurat: null,
    currentProfilTab: 'sk',
    formData: {},
    arsipList: [],
    profilSK: null,
    profilSKET: null
};

// ============================================
// LOCAL STORAGE MANAGEMENT
// ============================================
const storage = {
    save: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            showNotification('Error menyimpan data', 'error');
            return false;
        }
    },
    load: (key, defaultValue = null) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return defaultValue;
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }
};

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all duration-300 ${
        type === 'error' ? 'bg-red-500' : 
        type === 'success' ? 'bg-green-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================
function showSection(sectionId) {
    const sections = ['homeSection', 'kategoriSection', 'formSection', 
                    'profilSection', 'arsipSection', 'previewSection'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('fade-in');
    }
    
    appState.currentSection = sectionId.replace('Section', '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showKategori(kategori) {
    appState.currentKategori = kategori;
    showSection('kategoriSection');
    
    const skKategori = document.getElementById('skKategori');
    const sketKategori = document.getElementById('sketKategori');
    
    if (skKategori) skKategori.classList.add('hidden');
    if (sketKategori) sketKategori.classList.add('hidden');
    
    if (kategori === 'sk' && skKategori) {
        skKategori.classList.remove('hidden');
    } else if (sketKategori) {
        sketKategori.classList.remove('hidden');
    }
}
window.showKategori = showKategori;

function backToHome() {
    showSection('homeSection');
    appState.currentKategori = null;
}
window.backToHome = backToHome;

function backToKategori() {
    if (appState.currentKategori) {
        showKategori(appState.currentKategori);
    } else {
        backToHome();
    }
}
window.backToKategori = backToKategori;

function pilihJenisSurat(jenis) {
    appState.currentJenisSurat = jenis;
    showSection('formSection');
    generateForm(jenis);
    generateNomorSurat();
}
window.pilihJenisSurat = pilihJenisSurat;

// ============================================
// FORM GENERATION
// ============================================
function generateForm(jenis) {
    const formContainer = document.getElementById('formContainer');
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    const formIcon = document.getElementById('formIcon');
    
    const templates = {
        'sk_rt': { title: 'SK Pengangkatan RT', subtitle: 'Form Surat Keputusan RT', icon: '👤' },
        'sk_rw': { title: 'SK Pengangkatan RW', subtitle: 'Form Surat Keputusan RW', icon: '👥' },
        'sk_perangkat': { title: 'SK Perangkat Desa', subtitle: 'Form Surat Keputusan Perangkat', icon: '👔' },
        'sk_karang_taruna': { title: 'SK Karang Taruna', subtitle: 'Form SK Karang Taruna', icon: '🎯' },
        'sk_pkk': { title: 'SK PKK', subtitle: 'Form SK PKK', icon: '👩' },
        'sk_bumdes': { title: 'SK BUMDes', subtitle: 'Form SK BUMDes', icon: '🏢' },
        'sket_domisili': { title: 'Surat Keterangan Domisili', subtitle: 'Form Keterangan Domisili', icon: '🏠' },
        'sket_usaha': { title: 'Surat Keterangan Usaha', subtitle: 'Form Keterangan Usaha', icon: '🏪' },
        'sket_tidak_mampu': { title: 'Surat Keterangan Tidak Mampu', subtitle: 'Form Keterangan Ekonomi', icon: '🤝' },
        'sket_kelahiran': { title: 'Surat Keterangan Kelahiran', subtitle: 'Form Keterangan Kelahiran', icon: '👶' },
        'sket_kematian': { title: 'Surat Keterangan Kematian', subtitle: 'Form Keterangan Kematian', icon: '🕊️' },
        'sket_penghasilan': { title: 'Surat Keterangan Penghasilan', subtitle: 'Form Keterangan Penghasilan', icon: '💰' }
    };
    
    const template = templates[jenis] || { title: 'Form Surat', subtitle: 'Isi data lengkap', icon: '📄' };
    formTitle.textContent = template.title;
    formSubtitle.textContent = template.subtitle;
    formIcon.textContent = template.icon;
    
    formContainer.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap *</label>
                <input type="text" id="formNama" required 
                       class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
                       placeholder="Nama lengkap">
            </div>
            
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">NIK *</label>
                <input type="text" id="formNik" required maxlength="16"
                       class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
                       placeholder="16 digit NIK">
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Tempat Lahir *</label>
                    <input type="text" id="formTempatLahir" required 
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
                           placeholder="Kota lahir">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Tanggal Lahir *</label>
                    <input type="date" id="formTanggalLahir" required 
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none">
                </div>
            </div>
            
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Jenis Kelamin *</label>
                <select id="formJenisKelamin" required 
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none">
                    <option value="">Pilih...</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>
            </div>
            
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Pekerjaan *</label>
                <input type="text" id="formPekerjaan" required 
                       class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
                       placeholder="Pekerjaan">
            </div>
            
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Alamat Lengkap *</label>
                <textarea id="formAlamat" required rows="3"
                          class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
                          placeholder="Alamat lengkap dengan RT/RW, Kelurahan, Kecamatan"></textarea>
            </div>
            
            ${jenis.startsWith('sket') ? `
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Keperluan/Tujuan *</label>
                <textarea id="formKeperluan" required rows="2"
                          class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
                          placeholder="Jelaskan keperluan surat ini"></textarea>
            </div>
            ` : ''}
            
            ${jenis === 'sket_usaha' ? `
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Jenis Usaha *</label>
                <input type="text" id="formJenisUsaha" required 
                       class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
                       placeholder="Contoh: Warung Makanan">
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Lokasi Usaha *</label>
                <input type="text" id="formLokasiUsaha" required 
                       class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none" 
                       placeholder="Alamat lokasi usaha">
            </div>
            ` : ''}
        </div>
    `;
    
    setTimeout(setupGenerateButton, 100);
}

function generateNomorSurat() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const counter = (appState.arsipList.length + 1).toString().padStart(3, '0');
    const kategori = appState.currentKategori === 'sk' ? 'SK' : 'SKU';
    const nomorSurat = `${counter} / ${kategori} / ${month} / ${year}`;
    
    const input = document.getElementById('nomorSuratAuto');
    if (input) input.value = nomorSurat;
}

// ============================================
// PROFILE MANAGEMENT
// ============================================
function switchProfilTab(tab) {
    appState.currentProfilTab = tab;
    
    const tabSK = document.getElementById('tabSK');
    const tabSKET = document.getElementById('tabSKET');
    const skContent = document.getElementById('skProfilContent');
    const sketContent = document.getElementById('sketProfilContent');
    
    if (tab === 'sk') {
        tabSK.classList.add('border-blue-600', 'text-blue-600');
        tabSK.classList.remove('border-transparent', 'text-gray-500');
        tabSKET.classList.remove('border-green-600', 'text-green-600');
        tabSKET.classList.add('border-transparent', 'text-gray-500');
        skContent.classList.remove('hidden');
        sketContent.classList.add('hidden');
    } else {
        tabSKET.classList.add('border-green-600', 'text-green-600');
        tabSKET.classList.remove('border-transparent', 'text-gray-500');
        tabSK.classList.remove('border-blue-600', 'text-blue-600');
        tabSK.classList.add('border-transparent', 'text-gray-500');
        sketContent.classList.remove('hidden');
        skContent.classList.add('hidden');
    }
}
window.switchProfilTab = switchProfilTab;

function editProfilSK() {
    const modal = document.getElementById('editProfilSKModal');
    if (modal) {
        modal.classList.remove('hidden');
        
        // Load existing data if available
        if (appState.profilSK) {
            document.getElementById('skPemerintah').value = appState.profilSK.pemerintah || '';
            document.getElementById('skKecamatan').value = appState.profilSK.kecamatan || '';
            document.getElementById('skDesa').value = appState.profilSK.desa || '';
            document.getElementById('skAlamat').value = appState.profilSK.alamat || '';
            document.getElementById('skKepalaDesa').value = appState.profilSK.kepalaDesa || '';
            document.getElementById('skSekretaris').value = appState.profilSK.sekretaris || '';
            document.getElementById('skLogoUrl').value = appState.profilSK.logoUrl || '';
            
            if (appState.profilSK.logoUrl) {
                document.getElementById('skLogoPreview').src = appState.profilSK.logoUrl;
            }
        }
    }
}
window.editProfilSK = editProfilSK;

function editProfilSKET() {
    const modal = document.getElementById('editProfilSKETModal');
    if (modal) {
        modal.classList.remove('hidden');
        
        // Load existing data if available
        if (appState.profilSKET) {
            document.getElementById('sketPemerintah').value = appState.profilSKET.pemerintah || '';
            document.getElementById('sketKecamatan').value = appState.profilSKET.kecamatan || '';
            document.getElementById('sketDesa').value = appState.profilSKET.desa || '';
            document.getElementById('sketAlamat').value = appState.profilSKET.alamat || '';
            document.getElementById('sketKepalaDesa').value = appState.profilSKET.kepalaDesa || '';
            document.getElementById('sketSekretaris').value = appState.profilSKET.sekretaris || '';
            document.getElementById('sketLogoUrl').value = appState.profilSKET.logoUrl || '';
            
            if (appState.profilSKET.logoUrl) {
                document.getElementById('sketLogoPreview').src = appState.profilSKET.logoUrl;
            }
        }
    }
}
window.editProfilSKET = editProfilSKET;

function saveProfilSK() {
    const profilData = {
        pemerintah: document.getElementById('skPemerintah').value,
        kecamatan: document.getElementById('skKecamatan').value,
        desa: document.getElementById('skDesa').value,
        alamat: document.getElementById('skAlamat').value,
        kepalaDesa: document.getElementById('skKepalaDesa').value,
        sekretaris: document.getElementById('skSekretaris').value,
        logoUrl: document.getElementById('skLogoUrl').value || '/public/assets/LOGO.png'
    };
    
    if (!profilData.pemerintah || !profilData.kecamatan || !profilData.desa) {
        showNotification('Mohon lengkapi field yang wajib', 'error');
        return;
    }
    
    appState.profilSK = profilData;
    storage.save('profilSK', profilData);
    
    updateProfilPreview('sk');
    closeProfilSKModal();
    showNotification('Profil SK berhasil disimpan!', 'success');
}
window.saveProfilSK = saveProfilSK;

function saveProfilSKET() {
    const profilData = {
        pemerintah: document.getElementById('sketPemerintah').value,
        kecamatan: document.getElementById('sketKecamatan').value,
        desa: document.getElementById('sketDesa').value,
        alamat: document.getElementById('sketAlamat').value,
        kepalaDesa: document.getElementById('sketKepalaDesa').value,
        sekretaris: document.getElementById('sketSekretaris').value,
        logoUrl: document.getElementById('sketLogoUrl').value || '/public/assets/LOGO.png'
    };
    
    if (!profilData.pemerintah || !profilData.kecamatan || !profilData.desa) {
        showNotification('Mohon lengkapi field yang wajib', 'error');
        return;
    }
    
    appState.profilSKET = profilData;
    storage.save('profilSKET', profilData);
    
    updateProfilPreview('sket');
    closeProfilSKETModal();
    showNotification('Profil Surat Keterangan berhasil disimpan!', 'success');
}
window.saveProfilSKET = saveProfilSKET;

function closeProfilSKModal() {
    const modal = document.getElementById('editProfilSKModal');
    if (modal) modal.classList.add('hidden');
}
window.closeProfilSKModal = closeProfilSKModal;

function closeProfilSKETModal() {
    const modal = document.getElementById('editProfilSKETModal');
    if (modal) modal.classList.add('hidden');
}
window.closeProfilSKETModal = closeProfilSKETModal;

function updateProfilPreview(type) {
    const profil = type === 'sk' ? appState.profilSK : appState.profilSKET;
    const previewEl = document.getElementById(type === 'sk' ? 'skProfilPreview' : 'sketProfilPreview');
    
    if (!profil || !previewEl) return;
    
    previewEl.innerHTML = `
        <div class="text-center">
            <img src="${profil.logoUrl}" alt="Logo" class="w-20 h-20 object-contain mx-auto mb-3">
            <p class="font-bold text-sm">${profil.pemerintah}</p>
            <p class="font-bold text-sm">${profil.kecamatan}</p>
            <p class="font-bold text-lg">${profil.desa}</p>
            <p class="text-xs text-gray-600 mt-2">${profil.alamat}</p>
            <div class="mt-3 pt-3 border-t border-gray-300">
                <p class="text-sm"><strong>Kepala Desa:</strong> ${profil.kepalaDesa}</p>
                ${profil.sekretaris ? `<p class="text-sm"><strong>Sekretaris:</strong> ${profil.sekretaris}</p>` : ''}
            </div>
        </div>
    `;
}

// Handle logo file upload
function setupLogoUpload() {
    const skLogoInput = document.getElementById('skLogoInput');
    const sketLogoInput = document.getElementById('sketLogoInput');
    
    if (skLogoInput) {
        skLogoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('skLogoPreview').src = e.target.result;
                    document.getElementById('skLogoUrl').value = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (sketLogoInput) {
        sketLogoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('sketLogoPreview').src = e.target.result;
                    document.getElementById('sketLogoUrl').value = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// ============================================
// ARSIP MANAGEMENT
// ============================================
function showArsipSection() {
    showSection('arsipSection');
    loadArsipList();
}
window.showArsipSection = showArsipSection;

function loadArsipList() {
    filterArsip();
}

function filterArsip() {
    const arsipList = document.getElementById('arsipList');
    const emptyArsip = document.getElementById('emptyArsip');
    const filterKategori = document.getElementById('filterKategori').value;
    const searchTerm = document.getElementById('searchArsip').value.toLowerCase();
    
    let filtered = appState.arsipList;
    
    // Filter by category
    if (filterKategori !== 'all') {
        filtered = filtered.filter(s => s.kategori === filterKategori);
    }
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(s => 
            s.nama.toLowerCase().includes(searchTerm) || 
            s.nomor.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filtered.length === 0) {
        arsipList.innerHTML = '';
        if (emptyArsip) emptyArsip.classList.remove('hidden');
        return;
    }
    
    if (emptyArsip) emptyArsip.classList.add('hidden');
    
    arsipList.innerHTML = filtered.map((surat, index) => {
        const date = new Date(surat.tanggal);
        const formattedDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        const originalIndex = appState.arsipList.indexOf(surat);
        
        return `
            <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="px-2 py-1 rounded text-xs font-semibold ${
                                surat.kategori === 'sk' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                            }">
                                ${surat.kategori === 'sk' ? 'SK' : 'Surat Keterangan'}
                            </span>
                            <span class="text-xs text-gray-500">${formattedDate}</span>
                        </div>
                        <h4 class="font-bold text-gray-800">${surat.nama || 'N/A'}</h4>
                        <p class="text-sm text-gray-600 mt-1">Nomor: ${surat.nomor}</p>
                    </div>
                    <button onclick="deleteSurat(${originalIndex})" 
                            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                        Hapus
                    </button>
                </div>
            </div>
        `;
    }).join('');
}
window.filterArsip = filterArsip;

function deleteSurat(index) {
    if (confirm('Yakin ingin menghapus surat ini dari arsip?')) {
        appState.arsipList.splice(index, 1);
        storage.save('arsipList', appState.arsipList);
        showNotification('Surat berhasil dihapus dari arsip', 'success');
        updateStatistics();
        loadArsipList();
    }
}
window.deleteSurat = deleteSurat;

// ============================================
// GENERATE SURAT
// ============================================
function setupGenerateButton() {
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.onclick = (e) => {
            e.preventDefault();
            generateSurat();
        };
    }
}

function generateSurat() {
    // Check if profile exists
    const profil = appState.currentKategori === 'sk' ? appState.profilSK : appState.profilSKET;
    if (!profil) {
        showNotification('Harap atur profil terlebih dahulu di menu Profil', 'error');
        return;
    }
    
    // Collect form data
    const nama = document.getElementById('formNama')?.value;
    const nik = document.getElementById('formNik')?.value;
    const tempatLahir = document.getElementById('formTempatLahir')?.value;
    const tanggalLahir = document.getElementById('formTanggalLahir')?.value;
    const jenisKelamin = document.getElementById('formJenisKelamin')?.value;
    const pekerjaan = document.getElementById('formPekerjaan')?.value;
    const alamat = document.getElementById('formAlamat')?.value;
    const keperluan = document.getElementById('formKeperluan')?.value || '';
    
    // Validation
    if (!nama || !nik || !tempatLahir || !tanggalLahir || !jenisKelamin || !pekerjaan || !alamat) {
        showNotification('Mohon lengkapi semua field yang wajib diisi', 'error');
        return;
    }
    
    if (nik.length !== 16) {
        showNotification('NIK harus 16 digit', 'error');
        return;
    }
    
    // Save to archive
    const suratData = {
        id: Date.now(),
        nomor: document.getElementById('nomorSuratAuto')?.value,
        jenis: appState.currentJenisSurat,
        kategori: appState.currentKategori,
        nama: nama,
        nik: nik,
        tempatLahir: tempatLahir,
        tanggalLahir: tanggalLahir,
        jenisKelamin: jenisKelamin,
        pekerjaan: pekerjaan,
        alamat: alamat,
        keperluan: keperluan,
        tanggal: new Date().toISOString(),
        profil: profil
    };
    
    // Add extra fields for specific types
    if (appState.currentJenisSurat === 'sket_usaha') {
        suratData.jenisUsaha = document.getElementById('formJenisUsaha')?.value || '';
        suratData.lokasiUsaha = document.getElementById('formLokasiUsaha')?.value || '';
    }
    
    appState.arsipList.push(suratData);
    storage.save('arsipList', appState.arsipList);
    
    updateStatistics();
    showNotification('Surat berhasil dibuat!', 'success');
    
    // Show preview
    generatePreview(suratData);
    showSection('previewSection');
}

function generatePreview(suratData) {
    const content = document.getElementById('suratContent');
    if (!content) return;
    
    const templates = {
        'sk_rt': 'SK Pengangkatan RT',
        'sk_rw': 'SK Pengangkatan RW',
        'sk_perangkat': 'SK Perangkat Desa',
        'sk_karang_taruna': 'SK Karang Taruna',
        'sk_pkk': 'SK PKK',
        'sk_bumdes': 'SK BUMDes',
        'sket_domisili': 'SURAT KETERANGAN USAHA',
        'sket_usaha': 'SURAT KETERANGAN USAHA',
        'sket_tidak_mampu': 'SURAT KETERANGAN TIDAK MAMPU',
        'sket_kelahiran': 'SURAT KETERANGAN KELAHIRAN',
        'sket_kematian': 'SURAT KETERANGAN KEMATIAN',
        'sket_penghasilan': 'SURAT KETERANGAN PENGHASILAN'
    };
    
    const judulSurat = templates[suratData.jenis] || 'SURAT';
    const tanggalLahir = new Date(suratData.tanggalLahir).toLocaleDateString('id-ID', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
    
    const tanggalSurat = new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    const profil = suratData.profil;
    
    // Format seperti dokumen Word yang ditampilkan
    content.innerHTML = `
        <div style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5;">
            <!-- Header dengan Logo -->
            <table style="width: 100%; margin-bottom: 10px; border-bottom: 3px solid black;">
                <tr>
                    <td style="width: 80px; vertical-align: middle; text-align: center;">
                        <img src="${profil.logoUrl}" alt="Logo" style="width: 70px; height: 70px; object-fit: contain;">
                    </td>
                    <td style="vertical-align: middle; text-align: center; padding: 10px;">
                        <div style="line-height: 1.3;">
                            <p style="margin: 0; font-size: 11pt; font-weight: bold; text-transform: uppercase;">${profil.pemerintah}</p>
                            <p style="margin: 0; font-size: 11pt; font-weight: bold; text-transform: uppercase;">${profil.kecamatan}</p>
                            <p style="margin: 0; font-size: 12pt; font-weight: bold; text-transform: uppercase;">${profil.desa}</p>
                            <p style="margin: 5px 0 0 0; font-size: 10pt; font-style: italic;">${profil.alamat}</p>
                        </div>
                    </td>
                    <td style="width: 80px;"></td>
                </tr>
            </table>
            
            <!-- Judul Surat -->
            <div style="text-align: center; margin: 20px 0;">
                <h2 style="margin: 0; font-size: 14pt; font-weight: bold; text-decoration: underline;">${judulSurat}</h2>
                <p style="margin: 5px 0 0 0; font-size: 12pt;">Nomor: ${suratData.nomor}</p>
            </div>
            
            <!-- Isi Surat -->
            <div style="margin: 20px 0;">
                <p style="text-align: justify; text-indent: 50px; margin-bottom: 15px;">
                    Yang bertanda tangan di bawah ini Kepala ${profil.desa}, Kecamatan ${profil.kecamatan.replace('KECAMATAN ', '')}, 
                    ${profil.pemerintah.replace('PEMERINTAH DAERAH ', '')}, dengan ini menerangkan bahwa:
                </p>
            </div>
            
            <!-- Data Pemohon -->
            <table style="margin: 20px 50px; width: calc(100% - 100px); font-size: 12pt;">
                <tr>
                    <td style="padding: 3px 0; width: 180px; vertical-align: top;">Nik</td>
                    <td style="padding: 3px 10px; width: 20px; vertical-align: top;">:</td>
                    <td style="padding: 3px 0; vertical-align: top;">${suratData.nik}</td>
                </tr>
                <tr>
                    <td style="padding: 3px 0; vertical-align: top;">Nama</td>
                    <td style="padding: 3px 10px; vertical-align: top;">:</td>
                    <td style="padding: 3px 0; vertical-align: top;">${suratData.nama}</td>
                </tr>
                <tr>
                    <td style="padding: 3px 0; vertical-align: top;">Tempat taggal lahir</td>
                    <td style="padding: 3px 10px; vertical-align: top;">:</td>
                    <td style="padding: 3px 0; vertical-align: top;">${suratData.tempatLahir}, ${tanggalLahir}</td>
                </tr>
                <tr>
                    <td style="padding: 3px 0; vertical-align: top;">Pekerjaan</td>
                    <td style="padding: 3px 10px; vertical-align: top;">:</td>
                    <td style="padding: 3px 0; vertical-align: top;">${suratData.pekerjaan}</td>
                </tr>
                <tr>
                    <td style="padding: 3px 0; vertical-align: top;">Alamat</td>
                    <td style="padding: 3px 10px; vertical-align: top;">:</td>
                    <td style="padding: 3px 0; vertical-align: top;">${suratData.alamat}</td>
                </tr>
                ${suratData.jenisUsaha ? `
                <tr>
                    <td style="padding: 3px 0; vertical-align: top;">Usaha</td>
                    <td style="padding: 3px 10px; vertical-align: top;">:</td>
                    <td style="padding: 3px 0; vertical-align: top;">${suratData.jenisUsaha}</td>
                </tr>
                <tr>
                    <td style="padding: 3px 0; vertical-align: top;">Bertempat</td>
                    <td style="padding: 3px 10px; vertical-align: top;">:</td>
                    <td style="padding: 3px 0; vertical-align: top;">${suratData.lokasiUsaha}</td>
                </tr>
                ` : ''}
            </table>
            
            <!-- Keterangan tambahan -->
            <div style="margin: 20px 0;">
                <p style="text-align: justify; text-indent: 50px; margin-bottom: 10px;">
                    Orang tersebut adalah warga Desa Kasomalang Kulon, dan menurut pengakuannya, saat ini mempunyai 
                    ${suratData.jenisUsaha ? 'usaha: <strong>' + suratData.jenisUsaha + '</strong>' : 'usaha'}.
                </p>
                ${suratData.keperluan ? `
                <p style="text-align: justify; text-indent: 50px; margin-bottom: 10px;">
                    Demikian surat keterangan ini kami buat, agar yang berkepentingan maklum. 
                    Surat keterangan ini dipergunakan sebagaimana mestinya.
                </p>
                ` : `
                <p style="text-align: justify; text-indent: 50px; margin-bottom: 10px;">
                    Demikian surat keterangan ini kami buat, agar yang berkepentingan untuk dipergunakan 
                    sebagaimana mestinya.
                </p>
                `}
            </div>
            
            <!-- Tempat, Tanggal dan TTD -->
            <table style="width: 100%; margin-top: 40px;">
                <tr>
                    <td style="width: 50%;"></td>
                    <td style="width: 50%; text-align: center;">
                        <p style="margin: 0;">${profil.desa.replace('DESA ', '')}, ${tanggalSurat}</p>
                        <p style="margin: 5px 0 0 0;">a.n Kepala ${profil.desa}</p>
                        <p style="margin: 0;">Sekretaris Desa</p>
                        <div style="height: 60px;"></div>
                        <p style="margin: 0; font-weight: bold; text-decoration: underline;">${profil.sekretaris || profil.kepalaDesa}</p>
                    </td>
                </tr>
            </table>
        </div>
    `;
}

// ============================================
// STATISTICS
// ============================================
function updateStatistics() {
    const statSK = document.getElementById('statSK');
    const statSKET = document.getElementById('statSKET');
    const statTotal = document.getElementById('statTotal');
    const statBulanIni = document.getElementById('statBulanIni');
    
    const skCount = appState.arsipList.filter(a => a.kategori === 'sk').length;
    const sketCount = appState.arsipList.filter(a => a.kategori === 'sket').length;
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const bulanIni = appState.arsipList.filter(a => {
        const date = new Date(a.tanggal);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;
    
    if (statSK) statSK.textContent = skCount;
    if (statSKET) statSKET.textContent = sketCount;
    if (statTotal) statTotal.textContent = appState.arsipList.length;
    if (statBulanIni) statBulanIni.textContent = bulanIni;
}

// ============================================
// PREVIEW BUTTONS
// ============================================
function setupPreviewButtons() {
    const editBtn = document.getElementById('editBtn');
    const downloadBtn = document.getElementById('downloadPdfBtn');
    const printBtn = document.getElementById('printBtn');
    const backBtn = document.getElementById('backFromPreview');
    
    if (editBtn) {
        editBtn.onclick = () => {
            backToKategori();
        };
    }
    
    if (downloadBtn) {
        downloadBtn.onclick = () => {
            const element = document.getElementById('suratContent');
            const opt = {
                margin: [0, 0, 0, 0],
                filename: `surat_${Date.now()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
            };
            
            if (typeof html2pdf !== 'undefined') {
                html2pdf().set(opt).from(element).save();
                showNotification('PDF sedang diunduh...', 'success');
            } else {
                showNotification('Library PDF belum siap, silakan coba lagi', 'error');
            }
        };
    }
    
    if (printBtn) {
        printBtn.onclick = () => {
            window.print();
        };
    }
    
    if (backBtn) {
        backBtn.onclick = () => {
            showSection('homeSection');
        };
    }
}

// ============================================
// PROFIL SECTION
// ============================================
function showProfilSection() {
    showSection('profilSection');
    updateProfilPreview('sk');
    updateProfilPreview('sket');
}
window.showProfilSection = showProfilSection;

// ============================================
// INITIALIZATION
// ============================================
function init() {
    // Load data from localStorage
    appState.arsipList = storage.load('arsipList', []);
    appState.profilSK = storage.load('profilSK');
    appState.profilSKET = storage.load('profilSKET');
    
    // Update statistics
    updateStatistics();
    
    // Setup event listeners
    setupEventListeners();
    setupLogoUpload();
    setupPreviewButtons();
    
    // Update profile previews
    if (appState.profilSK) updateProfilPreview('sk');
    if (appState.profilSKET) updateProfilPreview('sket');
    
    // Check if profiles exist
    if (!appState.profilSK && !appState.profilSKET) {
        setTimeout(() => {
            showNotification('Silakan atur profil surat terlebih dahulu di menu Profil', 'info');
        }, 1000);
    }
    
    console.log('App initialized successfully');
}

function setupEventListeners() {
    const btnProfil = document.getElementById('btnProfil');
    const btnBuatSurat = document.getElementById('btnBuatSurat');
    const btnArsip = document.getElementById('btnArsip');
    
    if (btnProfil) {
        btnProfil.onclick = (e) => {
            e.preventDefault();
            showProfilSection();
        };
    }
    if (btnBuatSurat) {
        btnBuatSurat.onclick = (e) => {
            e.preventDefault();
            showSection('homeSection');
        };
    }
    if (btnArsip) {
        btnArsip.onclick = (e) => {
            e.preventDefault();
            showArsipSection();
        };
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
