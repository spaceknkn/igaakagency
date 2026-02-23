'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { djs } from '@/lib/data';
import { getAssetPath } from '@/lib/utils';

export default function Home() {
  // 0: 암전, 1: 인트로 이미지 등장, 2: IGAAK 타이틀 등장,
  // 3: 인트로 페이드아웃 시작, 4: 홈 콘텐츠 등장, 5: 완전 로딩
  const [phase, setPhase] = useState(0);
  const [featuredDjs, setFeaturedDjs] = useState<typeof djs>([]);
  const [featuredVisible, setFeaturedVisible] = useState(false);
  const featuredRef = useRef<HTMLDivElement>(null);

  // ===== 인트로 → 홈 순차 타이밍 =====
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),    // 이미지 페이드인
      setTimeout(() => setPhase(2), 2000),   // IGAAK 타이틀 등장 (1.7초 텀)
      setTimeout(() => setPhase(3), 4500),   // 인트로 이미지 페이드아웃 시작 (2.5초 텀)
      setTimeout(() => setPhase(4), 5800),   // 홈 콘텐츠 텍스트 등장
      setTimeout(() => setPhase(5), 7200),   // Our Roster 버튼 + 스크롤 힌트
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // ===== Featured Artists 데이터 로드 =====
  useEffect(() => {
    const isFemaleArtist = (artist: typeof djs[0]) => {
      const femaleDJs = [
        'ITMA', 'Daywalker', 'Seorin', 'MUKTHI', 'DJ Roha', 'Cream', 'Risho', 'DJ Kara',
        'DJ Heejae', 'Liha', 'DJ Kyuria', 'DJ Toxic B', 'DJ U.NA', 'IRUMI', 'DJ Sarang',
        'Jiwoo', 'DJ Riya', 'DJ Mochi', 'DJ Windy', 'DJ Bliss', 'DJ Siro', 'Tricky',
        'Hyebin', 'Hwayoung', 'Hyunyoung', 'MIU', 'DJ Hyunah', 'Joody', 'DJ Chayou',
        'Chawon', 'DJ Dorothy', 'Ruby', 'Suvin', 'Babbyang', 'Hanini', 'DJ Green',
        'Minky', 'Sua', 'Xia', 'Jina', 'Dana', 'Bae', 'Acid', 'Beatberry', 'Jiggy',
        'Jello', 'Cash', 'ARI', 'Pluma', 'DJ Doha', 'DJ Erry', 'Magarin', 'baeyoon'
      ];
      return femaleDJs.some(name => artist.name.includes(name) || name.includes(artist.name));
    };

    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const eligibleArtists = djs.filter(artist =>
      artist.image && (artist.weight || 0) >= 6
    );
    const femaleArtists = shuffleArray(eligibleArtists.filter(isFemaleArtist));
    const maleArtists = shuffleArray(eligibleArtists.filter(artist => !isFemaleArtist(artist)));
    const selectedFemales = femaleArtists.slice(0, 6);
    const selectedMales = maleArtists.slice(0, 3);
    setFeaturedDjs(shuffleArray([...selectedFemales, ...selectedMales]));
  }, []);

  // ===== 스크롤 시 Featured 섹션 페이드인 =====
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFeaturedVisible(true); },
      { threshold: 0.1 }
    );
    if (featuredRef.current) observer.observe(featuredRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ========================================= */}
      {/*  인트로 레이어 (이미지 + IGAAK 타이틀)    */}
      {/* ========================================= */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity ${phase >= 3 ? 'duration-[1800ms] opacity-0 pointer-events-none' : 'duration-500 opacity-100'
          }`}
      >
        {/* 인트로 배경 이미지 */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={getAssetPath('/intro-bg.jpg')}
            alt="IGAAK Intro"
            fill
            priority
            className={`object-cover transition-all duration-[4000ms] ease-out ${phase >= 1 ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
              }`}
            style={{ objectPosition: 'center 30%' }}
          />
        </div>

        {/* 인트로 다크 오버레이 */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* 인트로 IGAAK 타이틀 + 서브텍스트 */}
        <div className="relative z-10 text-center">
          <h1
            className={`text-[5rem] md:text-[12rem] lg:text-[15rem] font-bold text-white tracking-[0.05em] font-sans leading-none intro-text-enter ${phase >= 2 ? 'intro-text-visible' : ''
              }`}
          >
            IGAAK
          </h1>
          <p
            className={`mt-4 md:mt-6 text-[10px] md:text-sm text-white/60 tracking-[0.2em] uppercase intro-subtitle-enter ${phase >= 2 ? 'intro-subtitle-visible' : ''
              }`}
          >
            Beyond the Glare, Into the Sound.
          </p>
          <p
            className={`mt-2 md:mt-3 text-[8px] md:text-xs text-white/40 tracking-[0.1em] max-w-md mx-auto intro-subtitle-enter ${phase >= 2 ? 'intro-subtitle-visible' : ''
              }`}
          >
            In a world blinded by excess, we filter the noise to reveal the essence. As Korea&apos;s premier DJ agency, we strip away the unnecessary, delivering only what matters.
          </p>
        </div>
      </div>

      {/* ========================================= */}
      {/*  메인 홈 콘텐츠                            */}
      {/* ========================================= */}

      {/* 히어로 섹션 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 기존 그라디언트 배경 */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-black to-black" />

        {/* 중앙 콘텐츠 (원래 홈 화면 그대로) */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight intro-text-enter ${phase >= 4 ? 'intro-text-visible' : ''
              }`}
          >
            Beyond the Glare, Into the Sound.
          </h1>

          <p
            className={`text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 intro-desc-enter ${phase >= 4 ? 'intro-desc-visible' : ''
              }`}
          >
            In a world blinded by excess, we filter the noise to reveal the essence. As Korea&apos;s premier DJ agency, we strip away the unnecessary, delivering only what matters.
          </p>

          <div
            className={`intro-btn-enter ${phase >= 5 ? 'intro-btn-visible' : ''
              }`}
          >
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
        </div>

        {/* 스크롤 힌트 */}
        <div
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 intro-hint-enter ${phase >= 5 ? 'intro-hint-visible' : ''
            }`}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/30 animate-pulse" />
        </div>
      </section>

      {/* Featured Artists 섹션 */}
      <section className="py-24 px-6 bg-black" ref={featuredRef}>
        <div
          className={`max-w-7xl mx-auto transition-all duration-1000 ${featuredVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Artists</h2>
            <Link href="/roster" className="text-neutral-500 hover:text-white transition-colors text-sm tracking-wider uppercase">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {featuredDjs.map((artist, i) => (
              <Link
                key={artist.id}
                href={`/roster/${artist.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-neutral-900"
                style={{
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '0.6s',
                  transitionTimingFunction: 'ease',
                  transitionDelay: featuredVisible ? `${i * 80}ms` : '0ms',
                  opacity: featuredVisible ? 1 : 0,
                  transform: featuredVisible ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <Image
                  src={getAssetPath(artist.image!)}
                  alt={artist.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: artist.imagePosition || 'center center' }}
                />
                {/* Teal/cyan tone overlay */}
                <div className="absolute inset-0 bg-[#0d8a7a]/50 mix-blend-color group-hover:opacity-0 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-5 text-white">
                  <h3 className="text-[10px] md:text-lg font-bold mb-0 md:mb-1 leading-tight">{artist.name}</h3>
                  <p className="text-[8px] md:text-xs text-neutral-300 hidden md:block">{artist.genre}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About 섹션 */}
      <section className="py-24 px-6 border-t border-neutral-800 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">About IGAAK</h2>
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
