// ── State ──
let token = localStorage.getItem('igaak_token') || '';
let artists = [];
let currentArtistId = null;
const API = '';

// ── Init ──
window.addEventListener('DOMContentLoaded', () => {
    if (token) {
        verifyToken();
    }
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('artistBio').addEventListener('input', updateBioCount);

    // Auto-generate slug from name
    document.getElementById('artistName').addEventListener('input', (e) => {
        if (!currentArtistId || currentArtistId === 'new') {
            document.getElementById('artistSlug').value = slugify(e.target.value);
        }
    });

    // Show subcategory when Performance is checked
    document.querySelectorAll('#categoryCheckboxes input').forEach(cb => {
        cb.addEventListener('change', () => {
            const performanceChecked = document.querySelector('#categoryCheckboxes input[value="Performance"]').checked;
            document.getElementById('subcategoryGroup').style.display = performanceChecked ? 'block' : 'none';
        });
    });

    // Genre tags preview
    document.getElementById('artistGenre').addEventListener('input', updateGenreTags);
});

// ── Auth ──
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    try {
        const res = await fetch(`${API}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            token = data.token;
            localStorage.setItem('igaak_token', token);
            showDashboard();
        } else {
            document.getElementById('loginError').textContent = data.error || 'Login failed';
            document.getElementById('loginError').style.display = 'block';
        }
    } catch (err) {
        document.getElementById('loginError').textContent = 'Server connection failed';
        document.getElementById('loginError').style.display = 'block';
    }
}

async function verifyToken() {
    try {
        const res = await fetch(`${API}/api/artists`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            showDashboard();
        } else {
            logout();
        }
    } catch {
        // Server not running
        document.getElementById('loginError').textContent = 'Admin server is not running. Start it with: cd admin && npm start';
        document.getElementById('loginError').style.display = 'block';
    }
}

function logout() {
    token = '';
    localStorage.removeItem('igaak_token');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
}

async function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    await loadArtists();
}

// ── API Helpers ──
async function apiFetch(url, options = {}) {
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };
    const res = await fetch(`${API}${url}`, options);
    if (res.status === 401) { logout(); return null; }
    return res;
}

// ── Artist List ──
async function loadArtists() {
    const res = await apiFetch('/api/artists');
    if (!res) return;
    artists = await res.json();
    // Sort by weight desc
    artists.sort((a, b) => (b.weight || 0) - (a.weight || 0));
    renderArtistList();
}

function renderArtistList(filter = '') {
    const list = document.getElementById('artistList');
    const filtered = filter
        ? artists.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))
        : artists;

    list.innerHTML = filtered.map(a => {
        // Use thumb.webp for local paths, or first initial for blob URLs / no image
        let thumbSrc = '';
        if (a.image && !a.image.startsWith('http')) {
            const dir = a.image.substring(0, a.image.lastIndexOf('/'));
            thumbSrc = `${dir}/thumb.webp`;
        } else if (a.image) {
            thumbSrc = a.image; // Blob URL
        }
        return `
        <div class="artist-item ${a.id === currentArtistId ? 'active' : ''}" 
             onclick="selectArtist('${a.id}')">
            <div class="artist-item-thumb">
                ${thumbSrc
                ? `<img src="${thumbSrc}" alt="" loading="lazy" onerror="this.parentElement.innerHTML='${a.name.charAt(0)}'">`
                : a.name.charAt(0)
            }
            </div>
            <div class="artist-item-info">
                <div class="artist-item-name">${a.name}</div>
                <div class="artist-item-meta">${a.category} · w:${a.weight || 0}</div>
            </div>
        </div>
    `}).join('');
}

function filterArtistList() {
    const q = document.getElementById('searchInput').value;
    renderArtistList(q);
}

// ── Select / Edit ──
function selectArtist(id) {
    currentArtistId = id;
    const artist = artists.find(a => a.id === id);
    if (!artist) return;

    document.getElementById('editorEmpty').style.display = 'none';
    document.getElementById('editorContent').style.display = 'block';
    document.getElementById('editorTitle').textContent = `Edit: ${artist.name}`;

    // Fill form
    document.getElementById('artistName').value = artist.name || '';
    document.getElementById('artistSlug').value = artist.slug || '';
    document.getElementById('artistWeight').value = artist.weight || 1;
    document.getElementById('artistGenre').value = artist.genre || '';
    document.getElementById('artistBio').value = artist.bio || '';
    document.getElementById('imagePosition').value = artist.imagePosition || '';
    document.getElementById('mobileImagePosition').value = artist.mobileImagePosition || '';
    document.getElementById('thumbnailPosition').value = artist.thumbnailPosition || '';

    // Category checkboxes
    document.querySelectorAll('#categoryCheckboxes input').forEach(cb => {
        cb.checked = (artist.category || '').includes(cb.value);
    });
    const hasPerf = (artist.category || '').includes('Performance');
    document.getElementById('subcategoryGroup').style.display = hasPerf ? 'block' : 'none';
    document.getElementById('artistSubcategory').value = artist.subcategory || '';

    // SNS
    document.getElementById('snsInstagram').value = artist.instagram || '';
    document.getElementById('snsFacebook').value = artist.facebook || '';
    document.getElementById('snsYoutube').value = artist.youtube || '';
    document.getElementById('snsTwitter').value = artist.twitter || '';
    document.getElementById('snsSoundcloud').value = artist.soundcloud || '';
    document.getElementById('snsSpotify').value = artist.spotify || '';
    document.getElementById('snsBeatport').value = artist.beatport || '';

    // Embeds
    const hasSCEmbed = !!artist.soundcloudEmbed;
    document.getElementById('toggleSoundcloudEmbed').checked = hasSCEmbed;
    document.getElementById('soundcloudEmbedGroup').style.display = hasSCEmbed ? 'block' : 'none';
    document.getElementById('soundcloudEmbed').value = artist.soundcloudEmbed || '';

    const hasYTEmbed = !!artist.youtubeEmbed;
    document.getElementById('toggleYoutubeEmbed').checked = hasYTEmbed;
    document.getElementById('youtubeEmbedGroup').style.display = hasYTEmbed ? 'block' : 'none';
    document.getElementById('youtubeEmbed').value = artist.youtubeEmbed || '';

    // Profile image preview
    updateProfilePreview(artist.image);

    // Photos
    renderPhotos(artist.photos || []);

    // Additional links
    renderAdditionalLinks(artist.additionalLinks || []);

    // Update counts
    updateBioCount();
    updateGenreTags();

    // Update sidebar active
    renderArtistList(document.getElementById('searchInput').value);
}

// ── Create New ──
function createNewArtist() {
    currentArtistId = 'new';
    document.getElementById('editorEmpty').style.display = 'none';
    document.getElementById('editorContent').style.display = 'block';
    document.getElementById('editorTitle').textContent = 'New Artist';

    // Clear form
    ['artistName', 'artistSlug', 'artistGenre', 'artistBio',
        'imagePosition', 'mobileImagePosition', 'thumbnailPosition',
        'snsInstagram', 'snsFacebook', 'snsYoutube', 'snsTwitter',
        'snsSoundcloud', 'snsSpotify', 'snsBeatport',
        'soundcloudEmbed', 'youtubeEmbed'
    ].forEach(id => document.getElementById(id).value = '');

    document.getElementById('artistWeight').value = 1;
    document.querySelectorAll('#categoryCheckboxes input').forEach(cb => cb.checked = false);
    document.getElementById('subcategoryGroup').style.display = 'none';
    document.getElementById('toggleSoundcloudEmbed').checked = false;
    document.getElementById('soundcloudEmbedGroup').style.display = 'none';
    document.getElementById('toggleYoutubeEmbed').checked = false;
    document.getElementById('youtubeEmbedGroup').style.display = 'none';

    updateProfilePreview(null);
    renderPhotos([]);
    renderAdditionalLinks([]);
    updateBioCount();
    updateGenreTags();
}

// ── Save ──
async function saveArtist() {
    const categories = [];
    document.querySelectorAll('#categoryCheckboxes input:checked').forEach(cb => {
        categories.push(cb.value);
    });

    const additionalLinks = [];
    document.querySelectorAll('.additional-link-item').forEach(item => {
        const label = item.querySelector('.link-label').value;
        const url = item.querySelector('.link-url').value;
        if (label && url) additionalLinks.push({ label, url });
    });

    const payload = {
        name: document.getElementById('artistName').value,
        slug: document.getElementById('artistSlug').value,
        category: categories.join(', '),
        subcategory: document.getElementById('artistSubcategory').value || undefined,
        genre: document.getElementById('artistGenre').value,
        bio: document.getElementById('artistBio').value,
        weight: parseFloat(document.getElementById('artistWeight').value) || 1,
        imagePosition: document.getElementById('imagePosition').value || 'center center',
        mobileImagePosition: document.getElementById('mobileImagePosition').value || 'center center',
        thumbnailPosition: document.getElementById('thumbnailPosition').value || 'center center',
        instagram: document.getElementById('snsInstagram').value || '',
        facebook: document.getElementById('snsFacebook').value || '',
        youtube: document.getElementById('snsYoutube').value || '',
        twitter: document.getElementById('snsTwitter').value || '',
        soundcloud: document.getElementById('snsSoundcloud').value || '',
        spotify: document.getElementById('snsSpotify').value || '',
        beatport: document.getElementById('snsBeatport').value || '',
        soundcloudEmbed: document.getElementById('toggleSoundcloudEmbed').checked
            ? document.getElementById('soundcloudEmbed').value : '',
        youtubeEmbed: document.getElementById('toggleYoutubeEmbed').checked
            ? document.getElementById('youtubeEmbed').value : '',
        additionalLinks
    };

    try {
        let res;
        if (currentArtistId === 'new') {
            res = await apiFetch('/api/artists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            res = await apiFetch(`/api/artists/${currentArtistId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        if (res && res.ok) {
            const saved = await res.json();
            if (currentArtistId === 'new') {
                currentArtistId = saved.id;
            }
            await loadArtists();
            selectArtist(currentArtistId);
            showToast('Artist saved successfully!');
        } else {
            showToast('Failed to save artist', true);
        }
    } catch (err) {
        showToast('Error: ' + err.message, true);
    }
}

// ── Delete ──
async function deleteCurrentArtist() {
    if (!currentArtistId || currentArtistId === 'new') return;
    if (!confirm('Are you sure you want to delete this artist?')) return;

    const res = await apiFetch(`/api/artists/${currentArtistId}`, { method: 'DELETE' });
    if (res && res.ok) {
        currentArtistId = null;
        document.getElementById('editorEmpty').style.display = 'flex';
        document.getElementById('editorContent').style.display = 'none';
        await loadArtists();
        showToast('Artist deleted');
    }
}

// ── Profile Image ──
function updateProfilePreview(imagePath) {
    const preview = document.getElementById('profilePreview');
    if (imagePath) {
        // Handle both local paths (/artists/...) and full blob URLs (https://...)
        const src = imagePath.startsWith('http') ? imagePath : imagePath;
        preview.innerHTML = `<img src="${src}" alt="Profile" onerror="this.parentElement.innerHTML='<div class=\\'profile-preview-empty\\'>No Image</div>'">`;
    } else {
        preview.innerHTML = '<div class="profile-preview-empty">No Image</div>';
    }
}

async function handleProfileImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (currentArtistId === 'new') {
        showToast('Save the artist first before uploading images', true);
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API}/api/artists/${currentArtistId}/image`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    });

    if (res.ok) {
        const data = await res.json();
        updateProfilePreview(data.image);
        await loadArtists();
        showToast('Profile image uploaded!');
    } else {
        showToast('Failed to upload image', true);
    }
    event.target.value = '';
}

// ── Additional Photos ──
function renderPhotos(photos) {
    const grid = document.getElementById('photosGrid');
    grid.innerHTML = photos.map((p, i) => {
        const src = p.startsWith('http') ? p : p;
        return `
        <div class="photo-item">
            <img src="${src}" alt="Photo ${i + 1}">
            <button class="photo-delete" onclick="deletePhoto(${i})">✕</button>
        </div>
    `}).join('');
}

async function handleAdditionalPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (currentArtistId === 'new') {
        showToast('Save the artist first before uploading photos', true);
        return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    const res = await fetch(`${API}/api/artists/${currentArtistId}/photos`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    });

    if (res.ok) {
        const data = await res.json();
        renderPhotos(data.photos);
        showToast('Photo added!');
    } else {
        showToast('Failed to upload photo', true);
    }
    event.target.value = '';
}

async function deletePhoto(index) {
    if (!confirm('Delete this photo?')) return;
    const res = await apiFetch(`/api/artists/${currentArtistId}/photos?index=${index}`, { method: 'DELETE' });
    if (res && res.ok) {
        const data = await res.json();
        renderPhotos(data.photos);
        showToast('Photo deleted');
    }
}

// ── Additional Links ──
function renderAdditionalLinks(links) {
    const container = document.getElementById('additionalLinksContainer');
    container.innerHTML = links.map((link, i) => `
        <div class="additional-link-item">
            <input type="text" class="link-label" value="${link.label || ''}" placeholder="Label (e.g. TikTok)">
            <input type="url" class="link-url" value="${link.url || ''}" placeholder="https://...">
            <button class="btn btn-sm btn-danger" onclick="this.parentElement.remove()">✕</button>
        </div>
    `).join('');
}

function addAdditionalLink() {
    const container = document.getElementById('additionalLinksContainer');
    const div = document.createElement('div');
    div.className = 'additional-link-item';
    div.innerHTML = `
        <input type="text" class="link-label" value="" placeholder="Label (e.g. TikTok)">
        <input type="url" class="link-url" value="" placeholder="https://...">
        <button class="btn btn-sm btn-danger" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(div);
}

// ── Thumbnails ──
async function generateThumbnails() {
    showToast('Generating thumbnails...');
    const res = await apiFetch('/api/generate-thumbnails', { method: 'POST' });
    if (res && res.ok) {
        const data = await res.json();
        showToast(data.message);
    } else {
        showToast('Failed to generate thumbnails', true);
    }
}

// ── Helpers ──
function slugify(text) {
    return text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

function toggleField(groupId, show) {
    document.getElementById(groupId).style.display = show ? 'block' : 'none';
}

function updateBioCount() {
    const bio = document.getElementById('artistBio').value;
    document.getElementById('bioCharCount').textContent = bio.length;
}

function updateGenreTags() {
    const genre = document.getElementById('artistGenre').value;
    const tags = genre.split(',').map(g => g.trim()).filter(g => g);
    document.getElementById('genreTags').innerHTML = tags.map(t =>
        `<span class="genre-tag">${t}</span>`
    ).join('');
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${isError ? 'error' : ''}`;
    setTimeout(() => { toast.className = 'toast'; }, 3000);
}
