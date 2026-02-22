'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

interface IntroOverlayProps {
    onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
    const [phase, setPhase] = useState<'enter' | 'visible' | 'exit' | 'done'>('enter');

    useEffect(() => {
        // 스크롤 방지
        document.body.style.overflow = 'hidden';

        // Phase 1: 진입 (이미지 + 텍스트 페이드인)
        const enterTimer = setTimeout(() => setPhase('visible'), 100);

        // Phase 2: 일정 시간 후 페이드아웃
        const exitTimer = setTimeout(() => setPhase('exit'), 3200);

        // Phase 3: 완전히 사라짐
        const doneTimer = setTimeout(() => {
            setPhase('done');
            document.body.style.overflow = '';
            onComplete();
        }, 4200);

        return () => {
            clearTimeout(enterTimer);
            clearTimeout(exitTimer);
            clearTimeout(doneTimer);
            document.body.style.overflow = '';
        };
    }, [onComplete]);

    if (phase === 'done') return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-1000 ${phase === 'exit' ? 'opacity-0' : 'opacity-100'
                }`}
        >
            {/* 배경 이미지 (Ken Burns 줌 효과) */}
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src={getAssetPath('/intro-bg.jpg')}
                    alt="IGAAK Intro"
                    fill
                    priority
                    className={`object-cover intro-zoom ${phase !== 'enter' ? 'intro-zoom-active' : ''
                        }`}
                    style={{ objectPosition: 'center 30%' }}
                />
            </div>

            {/* 어두운 오버레이 그라디언트 */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            {/* 중앙 텍스트 */}
            <div className="relative z-10 text-center">
                {/* 메인 타이틀 */}
                <h1
                    className={`text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-[0.3em] font-serif intro-text-enter ${phase !== 'enter' ? 'intro-text-visible' : ''
                        }`}
                >
                    IGAAK
                </h1>

                {/* 서브 타이틀 */}
                <p
                    className={`mt-4 md:mt-6 text-sm md:text-base text-white/80 tracking-[0.5em] uppercase intro-subtitle-enter ${phase !== 'enter' ? 'intro-subtitle-visible' : ''
                        }`}
                >
                    DJ Agency
                </p>

                {/* 구분선 */}
                <div
                    className={`mx-auto mt-6 md:mt-8 h-px bg-white/40 intro-line-enter ${phase !== 'enter' ? 'intro-line-visible' : ''
                        }`}
                />
            </div>

            {/* 하단 스크롤 힌트 */}
            <div
                className={`absolute bottom-10 left-1/2 -translate-x-1/2 intro-hint-enter ${phase !== 'enter' ? 'intro-hint-visible' : ''
                    }`}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Scroll</span>
                    <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
                </div>
            </div>
        </div>
    );
}
