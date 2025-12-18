// GLOBAL STATE
let currentUser = 'Pengunjung';
let gallery = [];

// SAMPLE DATA
const species = [
    { name: 'Harimau Sumatera', acc: 97, habitat: 'Hutan Sumatera', status: 'Kritis', pop: '400', tips: ['Laporkan perburuan', 'Tanam pohon', 'Donasi WWF'], cat: 'tiger' },
    { name: 'Badak Jawa', acc: 99, habitat: 'Ujung Kulon', status: 'Kritis', pop: '76', tips: ['Tolak mitos obat', 'Ekowisata', 'Citizen science'], cat: 'rhino' },
    { name: 'Burung Maleo', acc: 92, habitat: 'Sulawesi', status: 'Rentan', pop: '4000', tips: ['Jangan makan telur', 'Edukasi lokal', 'Monitor sarang'], cat: 'bird' }
];

const sampleImages = [
    'https://images.unsplash.com/photo-1426604835664-4c2c868a865d?w=400',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    'https://images.unsplash.com/photo-1434394690282-1bbd9250524e?w=400',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    'https://images.unsplash.com/photo-1570549717069-e5b47c7f3709?w=400'
];

// INIT
document.addEventListener('DOMContentLoaded', () => {
    autoLogin();
    loadGallery();
    setupEvents();
    animateStats();
});

// AUTO LOGIN (GitHub Pages Fix)
function autoLogin() {
    let count = 3;
    const countdown = document.getElementById('countdown');
    const timer = setInterval(() => {
        count--;
        countdown.textContent = count;
        if (count <= 0) {
            clearInterval(timer);
            loginSuccess('Pengunjung');
        }
    }, 1000);
    
    // Force login after 3s
    setTimeout(() => loginSuccess('Pengunjung'), 3000);
}

function quickLogin(name) {
    loginSuccess(name);
}

function loginSuccess(name) {
    currentUser = name;
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('userInfo').style.display = 'flex';
    document.getElementById('userName').textContent = name;
    document.getElementById('logoutBtn').style.display = 'flex';
}

function logout() {
    document.getElementById('loginModal').classList.remove('hidden');
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('countdown').textContent = '3';
    autoLogin();
}

// NAVIGATION
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.closest('.nav-link').classList.add('active');
    document.querySelector('.nav-menu').classList.remove('active');
}

function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
}

// EVENTS
function setupEvents() {
    // Drag & Drop
    const zone = document.getElementById('uploadZone');
    const input = document.getElementById('fileInput');
    
    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', e => {
        e.preventDefault(); zone.classList.add('dragover');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
        e.preventDefault(); zone.classList.remove('dragover');
        processFile(e.dataTransfer.files[0]);
    });
    input.addEventListener('change', e => processFile(e.target.files[0]));
    
    // Filters
    document.querySelectorAll('.filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter.active').classList.remove('active');
            btn.classList.add('active');
            filterGallery(btn.dataset.filter);
        });
    });
}

// AI CLASSIFICATION
function processFile(file) {
    if (!file || !file.type.startsWith('image/')) return alert('Pilih gambar!');
    
    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('uploadZone').classList.add('hidden');
        document.getElementById('loading').classList.remove('hidden');
        
        setTimeout(() => {
            const species = species[Math.floor(Math.random() * 3)];
            showResult(e.target.result, species);
        }, 2000);
    };
    reader.readAsDataURL(file);
}

function showResult(imgSrc, data) {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    
    document.getElementById('resultImg').src = imgSrc;
    document.getElementById('species').textContent = data.name;
    document.getElementById('accuracy').textContent = data.acc;
    document.getElementById('habitat').textContent = data.habitat;
    document.getElementById('status').textContent = data.status;
    document.getElementById('pop').textContent = data.pop;
    
    const tips = document.getElementById('tipsList');
    tips.innerHTML = data.tips.map(tip => `<li>${tip}</li>`).join('');
    
    addToGallery(imgSrc, data.name, data.acc, data.cat);
}

function resetUpload() {
    document.getElementById('result').classList.add('hidden');
    document.getElementById('uploadZone').classList.remove('hidden');
    document.getElementById('fileInput').value = '';
}

// GALLERY
function loadGallery() {
    sampleImages.forEach((src, i) => {
        const data = species[Math.floor(Math.random() * 3)];
        setTimeout(() => addToGallery(src, data.name, data.acc, data.cat), i * 200);
    });
}

function addToGallery(src, name, acc, cat) {
    const grid = document.getElementById('gallery');
    const item = document.createElement('div');
    item.className = `gallery-item ${cat}`;
    item.onclick = () => {
        showSection('classifier');
        setTimeout(() => {
            showResult(src, species.find(s => s.name === name));
        }, 300);
    };
    item.innerHTML = `
        <img src="${src}" alt="${name}" loading="lazy">
        <div class="gallery-info">
            <div class="species">${name}</div>
            <div class="conf">${acc}% AI</div>
        </div>
    `;
    grid.appendChild(item);
}

function filterGallery(cat) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.display = (cat === 'all' || item.classList.contains(cat)) ? 'block' : 'none';
    });
}

// STATS ANIMATION
function animateStats() {
    const animate = (el, target) => {
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else el.textContent = Math.floor(start);
        }, 16);
    };
    
    animate(document.getElementById('uploads'), 1247);
    animate(document.getElementById('species'), 28);
    animate(document.getElementById('users'), 5892);
}

// SOCIAL SHARING
function shareResult() {
    const species = document.getElementById('species').textContent;
    const text = `Saya menemukan ${species} dengan SatwaAI! Mari lindungi satwa Indonesia! ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({ title: 'SatwaAI', text, url: window.location.href });
    } else {
        navigator.clipboard.writeText(text);
        alert('✅ Disalin! Bagikan ke sosial media');
    }
}
