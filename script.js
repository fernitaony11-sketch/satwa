// 24 GAMBAR SATWA OTOMATIS + HERO SLIDER
const autoImages = [
    // HARIMAU (6)
    { src: 'https://images.unsplash.com/photo-1426604835664-4c2c868a865d?w=400', name: 'Harimau Sumatera', acc: 97, cat: 'tiger' },
    { src: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=400', name: 'Harimau Sumatera', acc: 95, cat: 'tiger' },
    { src: 'https://images.unsplash.com/photo-1513694203232-71949d7efaed?w=400', name: 'Harimau Jawa', acc: 92, cat: 'tiger' },
    { src: 'https://images.unsplash.com/photo-1606784362279-be2b74811bd7?w=400', name: 'Harimau Sumatera', acc: 98, cat: 'tiger' },
    { src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400', name: 'Harimau Baltimor', acc: 94, cat: 'tiger' },
    { src: 'https://images.unsplash.com/photo-1556168760-2e9629bc7a4e?w=400', name: 'Harimau Sumatera', acc: 96, cat: 'tiger' },
    
    // BADAK (6)
    { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', name: 'Badak Jawa', acc: 99, cat: 'rhino' },
    { src: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', name: 'Badak Hitam', acc: 97, cat: 'rhino' },
    { src: 'https://images.unsplash.com/photo-1564507592333-c606b82c197a?w=400', name: 'Badak Jawa', acc: 98, cat: 'rhino' },
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', name: 'Badak India', acc: 95, cat: 'rhino' },
    { src: 'https://images.unsplash.com/photo-1546188996-8db7093134e6?w=400', name: 'Badak Putih', acc: 96, cat: 'rhino' },
    { src: 'https://images.unsplash.com/photo-1601525264073-f7f3daabf8f4?w=400', name: 'Badak Jawa', acc: 99, cat: 'rhino' },
    
    // BURUNG (6)
    { src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400', name: 'Burung Maleo', acc: 92, cat: 'bird' },
    { src: 'https://images.unsplash.com/photo-1444464666168-49d633b86736?w=400', name: 'Cendrawasih', acc: 94, cat: 'bird' },
    { src: "https://images.unsplash.com/photo-1583454110551-c8c895d7a542?w=400", name: 'Burung Hong', acc: 91, cat: 'bird' },
    { src: 'https://images.unsplash.com/photo-1560280930-4749ad458cae?w=400', name: 'Elang Jawa', acc: 95, cat: 'bird' },
    { src: 'https://images.unsplash.com/photo-1461751362704-eab4f95f74e7?w=400', name: 'Burung Maleo', acc: 93, cat: 'bird' },
    { src: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400', name: 'Burung Paradis', acc: 90, cat: 'bird' },
    
    // LAINNYA (6)
    { src: 'https://images.unsplash.com/photo-1434394690282-1bbd9250524e?w=400', name: 'Orangutan Sumatera', acc: 91, cat: 'other' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', name: 'Gajah Sumatera', acc: 96, cat: 'other' },
    { src: 'https://images.unsplash.com/photo-1570549717069-e5b47c7f3709?w=400', name: 'Kukang Jawa', acc: 89, cat: 'other' },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', name: 'Anoa Sulawesi', acc: 93, cat: 'other' },
    { src: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400', name: 'Banteng', acc: 94, cat: 'other' },
    { src: 'https://images.unsplash.com/photo-1469362102473-8622cfb973cd?w=400', name: 'Pesut Mahakam', acc: 92, cat: 'other' }
];

// TAMBAH DI INIT APP
function initApp() {
    autoLogin();
    loadAutoGallery();  // ✅ LOAD 24 GAMBAR OTOMATIS
    heroSlider();       // ✅ HERO SLIDER OTOMATIS
    setupEvents();
    animateStats();
}

// LOAD GALERI OTOMATIS
function loadAutoGallery() {
    const gallery = document.getElementById('gallery');
    autoImages.forEach((img, i) => {
        setTimeout(() => {
            const item = document.createElement('div');
            item.className = `gallery-item ${img.cat}`;
            item.onclick = () => demoClassify(img.cat);
            item.innerHTML = `
                <img src="${img.src}" alt="${img.name}" loading="lazy">
                <div class="gallery-info">
                    <div class="species">${img.name}</div>
                    <div class="conf">${img.acc}% AI</div>
                </div>
            `;
            gallery.appendChild(item);
        }, i * 100);
    });
}

// HERO SLIDER OTOMATIS
function heroSlider() {
    const images = document.querySelectorAll('.hero-img');
    let current = 0;
    setInterval(() => {
        images[current].classList.remove('active');
        current = (current + 1) % images.length;
        images[current].classList.add('active');
    }, 4000);
}

// DEMO CLASSIFY OTOMATIS
function demoClassify(type) {
    const demos = {
        tiger: { name: 'Harimau Sumatera', acc: 97, habitat: 'Hutan Sumatera', status: 'Kritis', pop: '400', tips: ['Laporkan perburuan', 'Tanam pohon', 'Donasi WWF'] },
        rhino: { name: 'Badak Jawa', acc: 99, habitat: 'Ujung Kulon', status: 'Kritis', pop: '76', tips: ['Tolak mitos obat', 'Ekowisata', 'Citizen science'] },
        bird: { name: 'Burung Maleo', acc: 92, habitat: 'Sulawesi', status: 'Rentan', pop: '4000', tips: ['Jangan makan telur', 'Edukasi lokal', 'Monitor sarang'] }
    };
    
    const data = demos[type];
    const imgSrc = autoImages.find(i => i.cat === type)?.src;
    
    document.getElementById('uploadZone').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
    
    setTimeout(() => {
        showResult(imgSrc, data);
    }, 1500);
}

// UPDATE COUNTER
document.getElementById('uploads').textContent = autoImages.length;
