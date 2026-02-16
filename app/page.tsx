import Link from 'next/link';
import Image from 'next/image';
import { djs } from '@/lib/data';
import { getAssetPath } from '@/lib/utils';

export default function Home() {
  // Helper function to determine if artist is likely female based on common naming patterns
  const isFemaleArtist = (artist: typeof djs[0]) => {
    const femaleDJs = [
      'ITMA', 'Daywalker', 'Seorin', 'MUKTHI', 'DJ Roha', 'Cream', 'Risho', 'DJ Kara',
      'DJ Heejae', 'Liha', 'DJ Kyuria', 'DJ Toxic B', 'DJ U.NA', 'IRUMI', 'DJ Sarang',
      'Jiwoo', 'DJ Riya', 'DJ Mochi', 'DJ Windy', 'DJ Bliss', 'DJ Siro', 'Tricky',
      'Hyebin', 'Hwayoung', 'Hyunyoung', 'MIU', 'DJ Hyunah', 'Joody', 'DJ Chayou',
      'Chawon', 'DJ Dorothy', 'Ruby', 'Suvin', 'Babbyang', 'Hanini', 'DJ Green',
      'Minky', 'Sua', 'Xia', 'Jina', 'Dana', 'Bae', 'Acid', 'Beatberry', 'Jiggy',
      'Jello', 'Cash', 'ARI', 'Pluma', 'DJ Doha', 'DJ Erry', 'Magarin'
    ];
    return femaleDJs.some(name => artist.name.includes(name) || name.includes(artist.name));
  };

  // Function to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get eligible artists (weight >= 6 and has image)
  const eligibleArtists = djs.filter(artist =>
    artist.image && (artist.weight || 0) >= 6
  );

  // Separate by gender
  const femaleArtists = shuffleArray(eligibleArtists.filter(isFemaleArtist));
  const maleArtists = shuffleArray(eligibleArtists.filter(artist => !isFemaleArtist(artist)));

  // Select 4 female (60%) and 2 male (40%) artists for a total of 6
  const selectedFemales = femaleArtists.slice(0, 4);
  const selectedMales = maleArtists.slice(0, 2);

  // Combine and shuffle the final selection
  const featuredArtists = shuffleArray([...selectedFemales, ...selectedMales]);
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-black to-black"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            Representing the world's leading{' '}
            <span className="text-white">DJs</span> and{' '}
            <span className="text-white">music producers</span>.
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12">
            IGAAK has established itself as a staple in the electronic music industry by maintaining a distinct level of excellence.
          </p>

          <Link
            href="/roster"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium tracking-wider uppercase text-sm hover:bg-neutral-200 transition-all duration-300"
          >
            Our Roster
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/30"></div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Featured Artists
            </h2>
            <Link
              href="/roster"
              className="text-neutral-500 hover:text-white transition-colors text-sm tracking-wider uppercase"
            >
              View All →
            </Link>
          </div>

          {/* Grid of featured artists */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArtists.map((artist) => (
              <Link
                key={artist.id}
                href={`/roster/${artist.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-neutral-900"
              >
                {/* Artist Image */}
                <Image
                  src={getAssetPath(artist.image!)}
                  alt={artist.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: artist.imagePosition || 'center center' }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Artist Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{artist.name}</h3>
                  <p className="text-sm text-neutral-400">{artist.genre}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 border-t border-neutral-800 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            About IGAAK
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed">
            IGAAK is a premier DJ and music producer agency, representing exceptional talent from around the world.
            We connect artists with venues, festivals, and events, ensuring unforgettable musical experiences.
            Our roster includes diverse genres spanning electronic, house, techno, and beyond.
          </p>
        </div>
      </section>
    </>
  );
}
