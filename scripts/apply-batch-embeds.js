const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/artists.json', 'utf8'));

const updates = [
    { name: "Advanced", yt: "sn8aYO19w9E", sc: "https://soundcloud.com/staygoldneverfold/sets/staygold-play-hard-remix" },
    { name: "Siena", yt: "YJomfODCY_I" },
    { name: "Harfstep", yt: "ILwuzpX1E0o" },
    { name: "Lant", sc: "https://soundcloud.com/dia_records/sets/compilation-album-vol-3" },
    { name: "Windy", yt: "6IjgHuqXvy8" },
    { name: "Bliss", yt: "MjJ_VmbZeEc" },
    { name: "Badmon", yt: "LxwSLYGMAD4" },
    { name: "Kara", yt: "wKLft5F_PfM" },
    { name: "Youkeep", sc: "https://soundcloud.com/dj_youkeep/sets/fallin-back-remix" },
    { name: "Jiwoo", yt: "J74a9YOsGvs", sc: "https://soundcloud.com/jiwoo-ahn-880113404/afro-2hours" },
    { name: "Nwanji", sc: "https://soundcloud.com/n5y0ncdrlhbd/nwanji-in-the-mix-ep07" },
    { name: "Vaha", sc: "https://soundcloud.com/plus82seoul/vaha-x-mas-mixset" },
    { name: "Siro", yt: "ZvI9advHxls", sc: "https://soundcloud.com/i_am_siro/dom-dolla-dreamin-siro-remix" },
    { name: "Tricky", sc: "https://soundcloud.com/level1musicofc/siro-tricky-bad-side" },
    { name: "Minky", yt: "b_fTEKCOZbc", sc: "https://soundcloud.com/minkysway/ghetto-funk-electronica" },
    { name: "Hyunah", ytLink: "https://www.youtube.com/@hyunahrang", sc: "https://soundcloud.com/kazerrmusic/fifty-fifty-sos-kazerr-remix" },
    { name: "Joody", yt: "Ys_LT4hlswo", sp: "https://open.spotify.com/artist/6mVqpSLGC8rBKkmzfXVjXj" },
    { name: "Erry", yt: "kKXiF8CkW9w" }
];

let updatedCount = 0;

updates.forEach(update => {
    const artist = data.find(a =>
        a.name.toLowerCase() === update.name.toLowerCase() ||
        a.name.toLowerCase().includes(update.name.toLowerCase()) ||
        (a.slug && a.slug.toLowerCase().includes(update.name.toLowerCase()))
    );

    if (artist) {
        if (update.yt) {
            artist.youtubeEmbed = update.yt;
        }
        if (update.ytLink) {
            artist.youtube = update.ytLink; // Only channel link provided for Hyunah
        }
        if (update.sc) {
            if (update.sc.includes('w.soundcloud.com/player')) {
                artist.soundcloudEmbed = update.sc;
            } else {
                artist.soundcloudEmbed = `https://w.soundcloud.com/player/?url=${encodeURIComponent(update.sc)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
            }
        }
        if (update.sp) {
            const match = update.sp.match(/artist\/([a-zA-Z0-9]+)/);
            if (match && match[1]) {
                artist.spotifyEmbed = `https://open.spotify.com/embed/artist/${match[1]}?utm_source=generator`;
            }
            artist.spotify = update.sp;
        }
        updatedCount++;
        console.log(`Updated ${artist.name}`);
    } else {
        console.log(`NOT FOUND: ${update.name}`);
    }
});

fs.writeFileSync('data/artists.json', JSON.stringify(data, null, 2));
console.log(`Successfully updated ${updatedCount} artists.`);
