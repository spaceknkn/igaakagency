export interface DJ {
    id: string;
    name: string;
    slug: string;
    category: string;
    subcategory?: string;
    genre: string;
    bio: string;
    image?: string;
    imagePosition?: string;
    thumbnailPosition?: string;
    weight?: number;
    instagram?: string;
    youtube?: string;
    soundcloud?: string;
    soundcloudEmbed?: string;
    spotify?: string;
}

// Derive thumbnail path from the original image path
// e.g. "/artists/SoUL/000.jpg" -> "/artists/SoUL/thumb.webp"
export function getThumbnailPath(imagePath: string): string {
    const dir = imagePath.substring(0, imagePath.lastIndexOf('/'));
    return `${dir}/thumb.webp`;
}

export const djs: DJ[] = [
    {
        id: "1",
        name: "SoUL (from Seoul)",
        slug: "soul",
        category: "DJ",
        genre: "Open Format, House, EDM",
        bio: `SoUL is a DJ and label owner with over 20 years of experience in various fields including club director, festival planning, operation, event promotion, and marketing in Korea. SoUL published the very first DJing & Party Planning Book in Korea and there is no doubt saying that he is a pioneer of 'Korea EDM Scene' which runs projects that He produced and taught Djing to many Korea's celebrities like Nam Gyu Ri, Yu Gun, and Shim Eun Jin, Cho Han Sun, Ewan, Yugun. SoUL pursues not only sets of sound limited and stuck in one genre, but he seeks 'Advanced Electronic Music' that is based on a variety of genre with analog sound such as disco, funky. Spin of SoUL flown over from his finger tips has the 'soul', the 'drama' with strong dynamic impression like Korea that he had lived in. Currently, he has launched a label called 'The Compass Ent' targeting the newly growing dance music scene along with Kpop. From 2022 to 2023, over 150 events with over +10 DJs from Kpop idols were successfully held in Asia and elsewhere. SoUL in charge of directing the monthly Kpop Event held at Omni & Alta in Taiwan, and Kpop DJ Events in Macau, China, Thailand, Malaysia, etc. are in progress with partners.`,
        image: "/artists/SoUL/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center 15%",
        instagram: "https://www.instagram.com/mixbysoul",
        youtube: "https://www.youtube.com/mixbysoul",
        soundcloud: "https://soundcloud.com/mixbysoul",
        soundcloudEmbed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1868335626&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        spotify: "https://open.spotify.com/artist/37Ijsuntk0BXRewNx9id3K",
        weight: 7.5
    },
    {
        id: "2",
        name: "Juncoco",
        slug: "juncoco",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: 'Juncoco is one of the most influential DJs in the domestic club and festival scene. He serves as an exclusive DJ at several large clubs in Gangnam and works as a music director at the World DJ Festival, Korea\'s premier EDM festival, where he is responsible for event lineup composition and content planning. He has gained exposure through collaborations with famous artists such as "Ailee" and "Cho A." In particular, the tracks "Let\'s Go Gaja" and "Crazy Party," released in collaboration with the Youtube creator "RalRal," have become essential songs on the playlists of the MZ generation. Additionally, he made an appearance on the original content of the OTT platform "Wavve", the DJ survival program "WET!" and emerged as the final champion, solidifying his position as a symbol of Korea\'s EDM scene.',
        image: "/artists/Juncoco/000.jpg",
        imagePosition: "center 30%",
        thumbnailPosition: "center center",
        weight: 9
    },
    {
        id: "3",
        name: "Vandalrock",
        slug: "vandalrock",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: `Vandal Rock is a producer and DJ, music director of the World DJ Festival, and director of Future Club. He won the DJ survival show "WET!" and has performed at major festivals like Ultra Music Festival, World Club Dome, and World DJ Festival, sharing stages with Ti챘sto, Zedd, and Steve Aoki. As a producer, he gained attention with the hit track "SWAY" and expanded into concert arrangements and K-POP production. With his versatile musical spectrum, he delivers setlists that captivate both festival crowds and EDM fans.`,
        image: "/artists/Vandalrock/000.jpg",
        imagePosition: "center 10%",
        thumbnailPosition: "center 20%",
        weight: 9
    },
    {
        id: "4",
        name: "X_X(Two X)",
        slug: "xx",
        category: "Producer, DJ",
        genre: "EDM",
        bio: `X_X" in Korea. X_X is a masked DJ and EDM producer active at club/festival sites. He is sweeping the Gangnam-gu club scene these days. Following <CALLING>, <HEART> tasted the latest trend with addictive melody. X_X is an EDM musician we should keep an eye on. "X_X", which debuted in 2017 (D.STAR, MADE, ARENA, BOUND, MASS, Burning Sun +82 Race, sound), has performed through various genres such as Miniaml Bounce, EDM, BOUNCE, TECH HOUSE, Electro House, Progressive House, and other electronic music. As the head of VIBELABLE and the artist of VIBELABLE. He also toured all over China, including Shanghai, Hangzhou, Chengdu, Shenzhen, Xi'an, and Sanya, reaching number two with the album 'DANCE FLOOR', an overseas site for beatport. Various local parties and festivals. They are performing fresh and fresh performances at fashion shows and brand events such as Gucci and Audi.`,
        image: "/artists/X_X/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 9
    },
    {
        id: "5",
        name: "Arkins",
        slug: "arkins",
        category: "Producer, DJ",
        genre: "K-bounce",
        bio: "Insoo Park (a.k.a Arkins) is a music producer and DJ based in Seoul, Republic of Korea. Arkins has been trying not only electro house but also various styles of music, while every his track is ranked on the Beatport chart. His experiences on both originals and remixes hit hard around the world, nowadays it's not difficult to find his tunes on the streets too. The movement he has made with his team, nowhere nowhere is spreading out to pop-industry over the club scene.",
        image: "/artists/Arkins/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 9
    },
    {
        id: "6",
        name: "Smesher",
        slug: "smesher",
        category: "Producer, DJ",
        genre: "K-bounce",
        bio: 'Meaning a "stunningly cool individual," he is a top-tier South Korean DJ who boasts overwhelming stage presence and exceptional track selection. With his striking looks and stellar fan service, he is a "smasher" beloved not only by female fans but by everyone on the club floor. Beyond appearing on major network DJ programs, he is constantly in demand for overseas performances, various events, festivals, and the club scene. Having moved past the "super rookie" phase, he has now established himself as a representative DJ of South Korea. Currently, moving beyond his role as a DJ, he also serves as the CEO of NOWHERE NOWHERE, a powerhouse that influences the music market alongside Korea\'s finest producers.',
        image: "/artists/Smesher/000.jpg",
        imagePosition: "center 10%",
        thumbnailPosition: "center center",
        weight: 8
    },
    {
        id: "7",
        name: "Castle-J",
        slug: "castle-j",
        category: "Producer, DJ",
        genre: "K-bounce",
        bio: 'He appeared in the Gangnam scene as a super rookie in 2019. Artist, Producer, who is drawing attention for his vigorous activities. Explosive sound, stage manners, and musicality. The stage where nothing can be left out and the DJ stands out. He currently belongs to "NOWHERE NOWHERE".',
        image: "/artists/Castle-J/000.jpg",
        imagePosition: "center center",
        thumbnailPosition: "center 10%",
        weight: 7
    },
    {
        id: "8",
        name: "Nwanji",
        slug: "nwanji",
        category: "DJ",
        genre: "K-bounce",
        bio: "In 2021, she appeared in the club scene as a female DJ and showed delicate mixing on stage. Along with various performances, we created an atmosphere where we can play with the public. Many clubs have invited us. With bright energy and fan service, It is loved by many people. NWANJI is a company of the best producers and DJs in Korea. Woman is a member of NO WHERE NOW HERE.",
        image: "/artists/nwanji/000.jpg",
        imagePosition: "center center",
        thumbnailPosition: "center center",
        weight: 5
    },
    {
        id: "9",
        name: "AK",
        slug: "ak",
        category: "DJ",
        genre: "Open Format, EDM",
        bio: "DJ AK is active in numerous domestic and oversea festivals with passionate and popular DJs. Bass music as a basic framework is used and it makes the audience energetic and satisfy their preferences every week with diverse musical spectrum",
        image: "/artists/ak/000.jpg",
        imagePosition: "center center",
        thumbnailPosition: "center center",
        weight: 8
    },
    {
        id: "10",
        name: "Advanced",
        slug: "advanced",
        category: "Producer, DJ",
        genre: "EDM",
        bio: `Advanced is a top-tier producer/DJ duo from South Korea, specializing in mainstage EDM with a strong focus on Progressive and Electro House. Known for their well-balanced skill set across production, DJing, and live performance, they are recognized as a fully realized, all-around DJ duo. They have performed at nearly every major festival in Korea, including World DJ Festival, EDC Korea, and WATERBOMB. Advanced has released a collaboration with KSHMR on Spinnin' Records and holds the record for the most releases on Spinnin' Asia. They have also received support from Third Party, releasing 'Energy' on Release Records. Their collaboration "IAB" with jeonghyeon surpassed 1 million streams on Spotify, and their recent Progressive House release "Like The Stars" exceeded 100,000 streams within a month, further solidifying their presence on the global EDM stage.`,
        image: "/artists/advanced/000.JPG",
        imagePosition: "center center",
        thumbnailPosition: "center center",
        weight: 7
    },
    {
        id: "11",
        name: "DJ Moai",
        slug: "dj-moai",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: "DJ MOAI is a highly skilled artist who has built an impressive career as a resident DJ at Korea's top-tier clubs, including the renowned Octagon, as well as many other prominent venues. Through interactions with a variety of international guest artists, he has broadened his musical spectrum and developed a unique and innovative style of his own. Unbound by any specific genre, DJ MOAI's performances showcase his versatility, delivering groove-filled sets and powerful energy that captivate audiences and cultivate a diverse fan base. His exceptional talent has solidified his position as a prominent DJ both domestically and internationally. Currently, he is actively performing on various stages, maintaining close connections with music fans, and dedicating himself to discovering and nurturing emerging DJ talent. As an inspiring mentor to up-and-coming artists, DJ MOAI plays a vital role in fostering the growth and development of Korea's DJ scene.",
        image: "/artists/DJ Moai/000.jpg",
        imagePosition: "center 8%",
        thumbnailPosition: "center center",
        weight: 8
    },
    {
        id: "12",
        name: "Cosmickey",
        slug: "cosmickey",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: "Cosmickey, who began his career in 2007, has been active in South Korea ever since, earning enduring love from audiences over the years. In 2015, he played a pioneering role in revolutionizing South Korea's DNB scene as a member of DNBS Crew, the country's first Drum&Bass Crew, introducing Bass Music to the forefront. DJ Cosmickey captivates audiences with his track selection and mixing prowess, securing numerous collaborations across Asia, including China, Taiwan, and Thailand. Furthermore, his discerning production skills have earned him praise in the Asian region. Expanding his scope as a producer, he ventures into both Official Releases and Unofficial Releases via platforms like SoundCloud, further broadening his influence in electronic music. Amidst the global resurgence of DNB, his activities are met with bright prospects and anticipation for a promising future. This DJ profile is intended for usage purposes",
        image: "/artists/Cosmickey/000.jpg",
        imagePosition: "center 15%",
        thumbnailPosition: "center 20%",
        weight: 8
    },
    {
        id: "13",
        name: "Guilty Pleasure",
        slug: "guilty-pleasure",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: "Guilty Pleasure is a DJ/Producer duo unit formed in 2023, consisting of two musicians: KREIN and PASTELLO. Beginning their official activities with the release of their debut album, 'NASTY BUT TASTY', on November 29, 2023, Guilty Pleasure has since established themselves as an artist to watch. Their influence extends beyond the Korean club scene to various platforms covering the overall EDM industry, such as Spotify Korea, 96degrees, Million EDM, and Under Owl. They primarily play techy and groovy genres, including Tech House, Bass House, and House, captivating audiences with their sophisticated, brilliant mixing and explosive performances.",
        image: "/artists/Guilty Pleasure/000.JPG",
        imagePosition: "center 23%",
        thumbnailPosition: "center center",
        weight: 8
    },
    {
        id: "14",
        name: "DJ Vaha",
        slug: "dj-vaha",
        category: "DJ",
        genre: "House, EDM",
        bio: `The words "Ocean" and "Sky" hold a special place in DJ VAHA's heart. They symbolize the expansive musical spectrum she aims to embody - from bright and unbounded sounds akin to the endless sky, to deep and profound beats reminiscent of the vast ocean depths. Her journey into DJing began after witnessing the performance of renowned techno female DJ, Charlotte de Witte. Despite the simplicity of her gestures, she exuded charisma, and even the smallest movements radiated explosive energy. Since officially starting her DJ career in 2021, VAHA has been expanding her presence beyond clubs into the realm of festivals. Embracing a wide range of musical genres, she is currently diligently preparing to venture into the realm of music production.`,
        image: "/artists/DJ Vaha/000.jpg",
        imagePosition: "center 15%",
        thumbnailPosition: "center 20%",
        weight: 5
    },
    {
        id: "15",
        name: "Sweeny",
        slug: "sweeny",
        category: "DJ",
        genre: "K-bounce, EDM",
        bio: `She has great ability to mix nature sound with dance music and brings into genre of Electro house scene. Sweeny attracts audience with her free minded actions and unique vibes. "My mix set would easily take me to Rio de Janeiro, Brazil in 10 seconds." by Sweeny herself shows unique confidence of herself. We can expect more of Sweeny's attractive appearance, skills, charisma and fashion to be combined as one in her stage.`,
        image: "/artists/Sweeny/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 6
    },
    {
        id: "16",
        name: "Minchae",
        slug: "minchae",
        category: "DJ",
        genre: "K-bounce",
        bio: "",
        image: "/artists/minchae/000.jpg",
        imagePosition: "center 25%",
        thumbnailPosition: "center center",
        weight: 2
    },
    {
        id: "17",
        name: "ZB",
        slug: "zb",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: "With a broad musical spectrum, ZB delivers performances that transcend genres, earning spots on the lineups of numerous major festivals over the years. Proven by his victory in a DJ competition, his sets are defined by the seamless fusion of diverse styles, connecting with audiences without boundaries. Based in Gangnam, Seoul, he is an active resident DJ at multiple clubs, while also expanding his artistry through music production and collaborative album releases with various artists.",
        image: "/artists/zb/000.JPG",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 8
    },
    {
        id: "18",
        name: "Ation",
        slug: "ation",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: "During high school, ATION stumbled upon songs by atboy lim, Chemical Brothers, and Daft unk, sparking his interest in electronic music. This led him to explore various genres like Electronica, House, Tech House, and Big Beat, fueling his dream of becoming a DJ. As He learned to DJ, he played at small parties and eventually in large clubs, f inding immense joy and fulfillment in moving people with music, which led him to choose DJing as his profession.",
        image: "/artists/Ation/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center 20%",
        weight: 8
    },
    {
        id: "19",
        name: "Youkeep",
        slug: "youkeep",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: "Youkeep's dynamic performance and powerful voice tone brings out great excitement to the audience and lead them to different level of entertainment. She is one of Korea's female DJ who can lead others to next generation of artist. One of her great strength is to hover between Electronic House and Dubstep, also freestyle trap rap on unique beats during her performance. We can expect much more from her and certain that she is the 'real deal' of the female djs",
        image: "/artists/Youkeep/000.JPG",
        imagePosition: "center 30%",
        thumbnailPosition: "center 10%",
        weight: 5.5
    },
    {
        id: "20",
        name: "XTC Project",
        slug: "xtc-project",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: "XTC is a duo group that combines the dreamy atmosphere and groovy beats found in music to engage audiences harmoniously. They play primarily DARK-themed TECHNO, TECH House, Bass House, Minimal Techno, and Bounce to align with trends. Their performances are characterized by sophistication and restrained movements, conveying a sense of refinement. They blend elements of the techno genre and Bounce beats to create a unique style, allowing them to command the stage with their distinctive music across a wide spectrum.",
        image: "/artists/XTC Project/000.jpg",
        imagePosition: "center 40%",
        thumbnailPosition: "center center",
        weight: 8
    },
    {
        id: "21",
        name: "Siena",
        slug: "siena",
        category: "DJ",
        genre: "Open Format, EDM",
        bio: "As a top model, DJ SIENA has participated in many festivals and events around Asia, also has earned her fame as a multi-talented entertainer in advertising, TV program, fashion, sports industries. Pursuing the best in every way, after long preparation she debuted as a EDM DJ, now she is lifting her head around Korea and Asia each countries. As a beautiful and talented female DJ she has been receiving attention from whole the world beyond Korea, China and East Asia, now more and more has become popular.",
        image: "/artists/Siena/000.JPG",
        imagePosition: "center 15%",
        thumbnailPosition: "center center",
        weight: 7
    },
    {
        id: "22",
        name: "Hanna",
        slug: "hanna",
        category: "DJ",
        genre: "House, Hiphop",
        bio: "DJ HANNA is making a name for herself as a rising female DJ in both domestic and international club scenes. While her core genres are Hip-hop, R&B, and Moombahton, she seamlessly bridges diverse styles, including Electro House and Hard Techno. Based on her unique style and musical intuition, she is a rapidly growing artist currently playing at numerous venues such as HYPE, JACK, and RACE in Apgujeong, Gangnam. By participating in various events and festivals, she continues to expand her horizons, delivering a fresh and trendy mood every time by blending a solid Hip-hop foundation with EDM, House, and the latest global trends. She is consistently receiving love calls from around the world, including the United States, Indonesia, Vietnam, and Thailand. In 2024, she solidified her international presence by performing at major Asian festivals such as S2O Taiwan and Waterbomb Hong Kong.",
        image: "/artists/Hanna/000.JPG",
        imagePosition: "center 35%",
        thumbnailPosition: "center center",
        weight: 7
    },
    {
        id: "23",
        name: "Kwonyeonsu",
        slug: "kwonyeonsu",
        category: "DJ",
        genre: "House",
        bio: "DJ Kwon Yeonsu has been making waves in the global electronic music scene since her debut in 2018. Raised in Beijing, China, she grew up immersed in a diverse cultural landscape? An experience that continues to contribute to her vibrant musical identity. Specializing in house music, she blends elements from a variety of genres to deliver high-energy sets that captivate and move the crowd on the dancefloor. DJ Kwon Yeonsu recently had the privilege to work alongside talented DJs while residing in New York City earlier this year. Her reach now extends far beyond Korea, with growing recognition across global stages? particularly within the house music community. Recently she has begun stepping into production, crafting original tracks that reflect her evolving sound and vision. As DJ Kwon Yeonsu embarks on this new chapter in her creative journey she continues to develop and create music that can be shared, enjoyed and felt by all of her listeners.",
        image: "/artists/Kwonyeonsu/000.jpg",
        imagePosition: "center 25%",
        thumbnailPosition: "center center",
        weight: 7
    },
    {
        id: "24",
        name: "Gaho",
        slug: "gaho",
        category: "DJ",
        genre: "Open Format, EDM",
        bio: "",
        image: "/artists/Gaho/000.JPG",
        imagePosition: "center 25%",
        thumbnailPosition: "center center",
        weight: 7
    },
    {
        id: "25",
        name: "Harfstep ( Soo & Midori )",
        slug: "harfstep",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: "HALFSTEP (Soo & Midori) is a Korean DJ duo recognized for their high-energy performances and seamless genre-blending. Known for crafting unexpected mashup sets that captivate diverse audiences, they have released music on global labels such as Smash The House. With dozens of tracks charting on the Hypeddit Top 100, over 1 million SoundCloud streams, and 13K followers, their influence continues to grow?봣urther amplified by their ambitious 365-day challenge of releasing original music every single day. DJ Soo, distributor of the NXS2 series in South Korea, has performed at renowned venues including Club Volume, Playhouse, and the Conrad Hotel. A former producer at SIDUS HQ, he also appeared on SBS MTV's Mashup. DJ Midori is celebrated for her smooth mixing and creative transitions, skillfully blending sub-genres into mashups that resonate with both casual listeners and devoted fans. She has held main residencies at several Top 100 clubs and toured extensively across Asia. Their international tour history spans Peru, Taiwan, Laos, Thailand, China, the Philippines, Japan, Cambodia, Russia, Hong Kong, Macau, and beyond",
        image: "/artists/harfstep_duo/000.jpg",
        imagePosition: "center 24%",
        thumbnailPosition: "center center",
        weight: 7
    },
    {
        id: "26",
        name: "Harfstep (Soo)",
        slug: "harfstep-2",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: "He was Philippines Club Venus Director & Main DJ , Recently based in China as the main DJ in Club Playhouse. Receiving Many Booking Request From Peru, Taiwan, Laos, Thailand, China, Philippines, Japan, Cambodia, Russia, Macau etc.",
        image: "/artists/harfstep_soo/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 7
    },
    {
        id: "27",
        name: "ITMA",
        slug: "itma",
        category: "Producer, DJ",
        genre: "House, EDM",
        bio: "A rookie DJ armed with outstanding performance and the boundless talent of a former idol, BLISS. With a sophisticated image and a matching musical playstyle, DJ BLISS made her successful debut in January 2023. Following her rapid growth, she established herself as a Resident DJ at PREDEKAR, a hot spot in Apgujeong. Furthermore, since December 2023, she has been active as a Resident DJ at Club RACE, the trendiest club in Gangnam. Currently, she is receiving love calls for various domestic and international performances and events, making a name for herself as the next-generation female DJ in the EDM market.",
        image: "/artists/itma/000.jpg",
        imagePosition: "center 30%",
        thumbnailPosition: "center center",
        weight: 4
    },
    {
        id: "28",
        name: "Daywalker",
        slug: "daywalker",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: "DAY WALKER, one of the most passionate DJ in all clubs and festival scenes, makes the clubbers who have strongunique taste, go crazy. Extreme strong setting with his reputation!!! He plays based on HOUSE MUSIC and is flexible with Funky, Electro, Progressive, Trap, and Hardstyle. Able to create a harmony between commercial and underground music style. Let's enjoy his plays with progressive and skillful groove",
        image: "/artists/daywalker/000.jpg",
        imagePosition: "center 15%",
        thumbnailPosition: "center 10%",
        weight: 8
    },
    {
        id: "29",
        name: "NotXerius",
        slug: "notxerius",
        category: "Producer, DJ",
        genre: "Open Format, EDM",
        bio: "Notxerius is a Dj duo who take pride in their uniqueness. Coming from South Korea, they now own one of Asia's top clubs in Bangkok: Muin Bangkok. With this on their shoulders, they are quickly rising to work super stardom. With their experience from the past, they have a special set of skills that are already putting them on the map in terms of releases as well. With support from world's most renown artists, as well as an accumulated amount of 55 Million Spotify streams, Notxerius intends to take the scene by storm with their music.",
        image: "/artists/NotXerius/000.JPG",
        imagePosition: "center 50%",
        thumbnailPosition: "center 100%",
        weight: 8
    },
    {
        id: "30",
        name: "Sfuff",
        slug: "sfuff",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/SFUFF/000.jpg",
        imagePosition: "center center",
        thumbnailPosition: "center 100%",
        weight: 6
    },
    {
        id: "31",
        name: "Seorin",
        slug: "seorin",
        category: "DJ",
        genre: "House, EDM",
        bio: "SEORIN, an artist who is steadily building her own mania in club scenes such as Gangnam, Itaewon, and Hongdae with her own unique style, solidifying her position in the scene. SEORIN, who started her music activities inspired by performances of world-class DJs, is a versatile entertainer who is active as a model, such as photo shoots and music video shoots, as well as DJing. Her experience as a fashion major has become a source of creative activities, and she has also stood out in producing, such as releasing a single album she produced herself. Let's pay attention to SEORIN's move, which expressed her ambitions to give positive changes to many people in the world.",
        image: "/artists/seorin/000.jpg",
        imagePosition: "center 25%",
        thumbnailPosition: "center center",
        weight: 6
    },
    {
        id: "32",
        name: "DJ Breeze",
        slug: "dj-breeze",
        category: "DJ",
        genre: "Open Format, EDM",
        bio: "DJ BREEZE is a South Korean DJ and Producer who currently serves as the Music Director for Club MADE in Seoul and Club MASS, a Korean-style club in Shanghai, China. With extensive field experience and numerous stage performances accumulated since 2011, DJ BREEZE is renowned for his stable playing style and rhythmic performances. He has distinguished himself not only in clubs but also on the festival stage, performing at world-renowned festivals such as WORLD CLUB DOME and EDC KOREA, as well as major domestic events like the WORLD DJ FESTIVAL and COUNTDOWN FESTIVAL. Furthermore, he has been solidifying his influence both domestically and internationally by touring major clubs across more than 30 cities in China and serving as the Music Director for Club MASS, one of the most recognized venues in Shanghai.",
        image: "/artists/DJ Breeze/000.jpg",
        imagePosition: "center 19%",
        thumbnailPosition: "center 10%",
        weight: 7
    },
    {
        id: "33",
        name: "DJ Cold",
        slug: "dj-cold",
        category: "DJ",
        genre: "Open Format, EDM",
        bio: "",
        image: "/artists/DJ Cold/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center 10%",
        weight: 6
    },
    {
        id: "34",
        name: "DJ Kade",
        slug: "dj-kade",
        category: "DJ",
        genre: "Open Format, EDM",
        bio: "Starting his career in 2009 as a Resident DJ at Underground Club Tool, Kade has consistently performed at various venues, including Club Label and Club Octagon, to this day. Based on House Music, Kade plays a wide range of genres. As a member of the 90bomb crew, he continues to expand his musical spectrum by collaborating on various projects and parties with numerous DJs and producers. He began his discography in 2009 by participating in J Symposium's album Upper Case Voice under Logo Music Records. Since then, he has contributed to several albums, including Factor Dance (Single) and The Room Vol. 1. With the release of his third single, Room (Original Mix), Kade is further solidifying his unique presence in the scene.",
        image: "/artists/DJ Kade/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 6
    },
    {
        id: "35",
        name: "MUKTHI",
        slug: "mukthi",
        category: "DJ",
        genre: "Open Format, EDM",
        bio: "She is well known actress in Korea. Now, She has burst on to the DJ Scene",
        image: "/artists/Mukthi/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        instagram: "https://www.instagram.com/jungmin_thx",
        weight: 7
    },
    {
        id: "36",
        name: "DJ Roha",
        slug: "dj-roha",
        category: "Producer, DJ",
        genre: "Bass Music",
        bio: `DJ "ROHA" who appeared like a comet! She began to listen to Avicii's music and study production at the age of 17, and many years later, 'Roha' is loved by the public for showing various plays at clubs and festivals, not just one genre. She became a Korean female Dj and producer who produces her own style of music. She is currently preparing for her solo album and releasing it on various overseas labels, and has actively participated in various remix contests, making her stand out as a producer. Let's fall in love with 'ROHA's charm, which has strong Djing skills and producing skills that make us doubt our young age.`,
        image: "/artists/DJ Roha/000.jpg",
        imagePosition: "center 35%",
        thumbnailPosition: "center center",
        weight: 8
    },
    {
        id: "37",
        name: "Cream",
        slug: "cream",
        category: "Producer, DJ",
        genre: "Bass Music",
        bio: `DJ Cream is a standout artist in South Korea's EDM scene, celebrated for her exceptional musical talent and electrifying performances. With her distinctive sound and flawless track selection, she has earned the title of "The Most Sought-After DJ for Festivals," receiving countless invitations from major festivals and clubs. DJ Cream has graced the main stages of global Ultra festivals, the world-renowned water festival Songkran, and other prestigious events. Her performances on these iconic stages have solidified her position as a leading representative of South Korea, leaving a lasting impression on audiences worldwide. These shows are more than just music?they are artistic performances that resonate deeply with fans and highlight her undeniable presence in the global EDM scene.`,
        image: "/artists/Cream/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center 10%",
        weight: 8
    },
    {
        id: "38",
        name: "Dipcod",
        slug: "dipcod",
        category: "DJ",
        genre: "Techno",
        bio: "Based on Techno and House music, DIPCOD is a veteran DJ and producer who has been an active force in Seoul's electronic music scene for many years. Currently serving as the Music Director of Club Chroma at Paradise City.",
        image: "/artists/Dipcod/000.jpg",
        imagePosition: "center 60%",
        thumbnailPosition: "center center",
        weight: 8
    },
    {
        id: "39",
        name: "Risho",
        slug: "risho",
        category: "DJ",
        genre: "House, Techno",
        bio: "Risho is a Russian-born DJ and professional model based in Seoul, who is active in various fields. She has been fascinated by music since childhood and has built up her musical skills over the years. She then began her career as a model and has been active in various fashion and beauty industries. Her efforts to express the musical spectrum she encountered at numerous shows and events in her own unique style are gradually shining through. Risho values the flow of various atmospheres that fill the space, and her mixes showcase a pleasant rhythm that allows the body to naturally surrender, ranging from disco to techno and house. Risho, who is not simply focused on trendy music and events, wants to show her own show. Let's look forward to her groove.",
        image: "/artists/Risho/000.jpg",
        imagePosition: "center 35%",
        thumbnailPosition: "center center",
        weight: 5.9
    },
    {
        id: "40",
        name: "DJ Kara",
        slug: "dj-kara",
        category: "DJ",
        genre: "EDM, Hard Dance, Kpop",
        bio: "DJ Kara is a recently debuted female DJ from South Korea who exudes energy and passion in the world of music. Despite her short time in the industry, she has already gained a following of over 22,800 subscribers on her YouTube channel and 135,000 followers on TikTok, showcasing her unique and charming style that has won over the hearts of many. Recently, she completed a successful tour in Singapore, aiming to further grow in the Asian market. DJ Kara explores various music genres and delivers enjoyment with her distinct style. Her performances are extremely lively, and audiences dance and have a great time with her. DJ Kara not only inspires many with her talent but is also growing rapidly. She is gaining many fans from different countries through her YouTube channel and is being recognized for her talent and passion. DJ Kara is quickly rising in the music scene and will undoubtedly attract more attention in the future.",
        image: "/artists/DJ Kara/000.jpg",
        imagePosition: "center 40%",
        thumbnailPosition: "center center",
        weight: 5.9
    },
    {
        id: "41",
        name: "DJ Heejae",
        slug: "dj-heejae",
        category: "DJ, Performance",
        subcategory: "Dancer",
        genre: "EDM, Hard Dance, Kpop",
        bio: "DJ Heejae made her dazzling debut in 2017 as a K-pop idol through the show 'Queendom.' She immediately captured attention with her exceptional dance skills and charismatic performances. Since then, she has continued to shine as the main dancer in the group XOX. Renowned for her powerful dancing abilities, DJ Heejae enthralls audiences with her mesmerizing stage presence. She skillfully showcases a variety of DJing styles, including tech house and hardstyle, seamlessly blending music and dance into captivating performances. Her unique talent lies in harmoniously blending K-pop elements with her DJing, creating distinctive and outstanding stages. DJ Heejae is an artist of remarkable versatility, and her singing and rapping skills are forces to be reckoned with. Her musical spectrum is diverse, and she showcases her creative prowess on stage. Her dedication to musical exploration and performance passion brings audiences a unique and memorable experience. Continuously pushing her artistic boundaries, DJ Heejae is a multi-talented artist, and the anticipation for her future endeavors is high.",
        image: "/artists/DJ Heejae/000.jpeg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 6.9
    },
    {
        id: "42",
        name: "Liha (Produce48)",
        slug: "liha",
        category: "DJ, Performance",
        subcategory: "Dancer",
        genre: "EDM, Hard Dance, Kpop",
        bio: "DJ Liha, a DJ endowed with abundant musical talent, found herself in the midst of the intense competition in the world of K-pop before venturing into DJing. As a contestant who survived until the eighth round of the 2018 Produce 48, a program epitomized by groups like IZ*ONE, she received strong support from mentors. In her quest to explore her potential on a larger stage, DJ Liha chose to step back from her activities as a K-pop idol and embarked on a new challenge as a DJ. From the atmospheric sounds of house music to the heart-pounding beats of hardstyle, she aims to showcase her talent, not just playing music based on trends, but to connect with the many fans who support her. Her dream is to communicate with them through music on various stages and venues.",
        image: "/artists/Liha/000.jpg",
        imagePosition: "center 30%",
        thumbnailPosition: "center center",
        weight: 6.9
    },
    {
        id: "43",
        name: "DJ Kyuria",
        slug: "dj-kyuria",
        category: "DJ, Performance",
        subcategory: "Dancer",
        genre: "EDM, Hard Dance, Kpop",
        bio: "Kyuria, who has been a dancer and influencer in Kpop and Korea for several years, will take on the challenge of becoming a DJ starting in 2024. With her outstanding dancing skills and charismatic performances, she immediately captured the attention of audiences at performances in Korea, Taiwan, Vietnam, etc. Her extraordinary talent of creating a unique and outstanding stage by harmoniously combining K-pop elements and DJing is a talent that is unique to her. DJ Kyuria, is an artist with outstanding versatility, and her performances skillfully communicate with fans and present energetic stages. Her musical spectrum is diverse and she showcases her creative abilities on stage. Her dedication to musical exploration and passion for performance creates unique and memorable experiences for audiences. As a versatile artist who is constantly expanding his artistic boundaries, we have high expectations for the future of DJ Kyuria",
        image: "/artists/DJ Kyuria/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 6.8
    },
    {
        id: "44",
        name: "DJ Toxic B",
        slug: "dj-toxic-b",
        category: "DJ",
        genre: "House, EDM, Hard Dance",
        bio: "DJ Toxic B captivates audiences with her enchanting atmosphere and energetic stage presence. Igniting Seoul's scorching nights, her music, rooted in electronic dance music, traverses diverse genres like house, techno, and pop, delivering a unique sound. Equipped with intense beats and delicate mixing skills, as well as crowd-dominating performances and captivating visuals, DJ Toxic B is active on various stages, based in Seoul and extending to cities like Busan. In particular, her performances offer a thrilling experience beyond simple music listening, boasting a powerful addictiveness that's hard to escape once you're drawn in. DJ Toxic B consistently delivers top-tier performances at every moment through relentless musical exploration and passion. The instant you directly experience her music and performance, you will feel a new dimension of energy, entirely different from before. Please pay attention to the even more glamorous and sexy musical world she will create.",
        image: "/artists/DJ ToxicB/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 7
    },
    {
        id: "45",
        name: "DJ U.NA",
        slug: "dj-una",
        category: "DJ",
        genre: "EDM, Hard Dance, Kpop",
        bio: "DJ U.NA IS A SOUTH KOREAN DJ WHO SEAMLESSLY BLENDS K-POP, HIP-HOP, AND EDM INTO DYNAMIC SETS THAT CAPTIVATE BOTH PREMIUM EVENTS AND HIGH-ENERGY FESTIVAL STAGES. WITH HER MULTIFACETED BACKGROUND AS AN INFLUENCER, RACING MODEL, AND FITNESS MODEL, SHE ENHANCES EVERY PERFORMANCE WITH ELEGANT STAGE PRESENCE, EXPRESSIVE DANCE, AND STRIKING VISUALS CREATING SHOWS THAT ARE AT ONCE STYLISH AND UNFORGETTABLE.",
        image: "/artists/DJ Una/000.JPG",
        imagePosition: "center 20%",
        thumbnailPosition: "center 20%",
        weight: 7
    },
    {
        id: "46",
        name: "IRUMI",
        slug: "irumi",
        category: "DJ",
        genre: "House, EDM, Hard Dance",
        bio: "With a background in music since childhood, DJ IRUMI brings a unique depth and sensitivity to every performance. Despite her petite frame, the energy she radiates behind the decks is nothing short of explosive, captivating the crowd from the very first beat. Her sound seamlessly blends House, Tech House, and Hardstyle, creating a distinct musical identity that pulls listeners into a powerful state of immersion. Based in Seoul, she is a dynamic presence across various club stages, known for delivering performances that go far beyond simple listening experiences. Fueled by relentless passion and musical curiosity, DJ IRUMI continues to craft an ever-evolving, high-energy soundscape that leaves a lasting impression wherever she plays.",
        image: "/artists/DJ IRUMI/000.jpg",
        imagePosition: "center 23%",
        thumbnailPosition: "center 10%",
        weight: 7
    },
    {
        id: "47",
        name: "DJ Sarang",
        slug: "dj-sarang",
        category: "Producer, DJ",
        genre: "EDM, Hard Dance, Kpop",
        bio: "I'm a DJ and producer specializing in high-energy K-BOUNCE, with roots in tech house and techno. I love mixing across genres to keep the vibe fresh. Based at Supermoon Club in Korea, I also perform at various venues. With my unique style and bright energy, I light up every stage I play.",
        image: "/artists/DJ Sarang/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center 10%",
        weight: 7
    },
    {
        id: "48",
        name: "Jiwoo",
        slug: "jiwoo",
        category: "DJ",
        genre: "House",
        bio: "Jiwoo is a DJ as well as an active fashion model with 7 years of experience in ads, campaigns and runways for brands of Korea and international. With deep understanding of image, rhythm, and atmosphere I naturally create music and performance. Not only in underground scene, but also in major scene, I curates immersive, genre blending DJ sets that balance storytelling, groove, and emotional depth. I communicate well with audience based on artistic instinct and crowd intuition built on stage and behind camera as a fashion model for many years.",
        image: "/artists/Jiwoo/000.jpg",
        imagePosition: "center 28%",
        thumbnailPosition: "center center",
        weight: 7
    },
    {
        id: "49",
        name: "DJ Riya",
        slug: "dj-riya",
        category: "DJ, Performance",
        subcategory: "Dancer",
        genre: "EDM, Hard Dance, Kpop",
        bio: "A young girl who loves dance and the energy on the music stage and wants to constantly share her small but strong energy with people. The girl's name is DJ Riya Although her dream of becoming an idol has been postponed for a while, this girl, who is showing more activities as a DJ and dancer than anyone else, wants to get out of Korea and communicate with people on a bigger stage. As DJ Riya promises to bring the energy that she couldn't fully express in the Asia Dance music scene, delivering even more dynamic performances and sharing joyful energy with fans on various stages. As a versatile artist who constantly pushes the boundaries of her artistry, we have high expectations for the future of both DJ Riya",
        image: "/artists/DJ Riya/000.jpg",
        imagePosition: "center center",
        thumbnailPosition: "center 100%",
        weight: 5.8
    },
    {
        id: "50",
        name: "DJ Lant",
        slug: "dj-lant",
        category: "Producer, DJ",
        genre: "House, EDM",
        bio: "LANT started his First residency at Club MADE as a dj when he was 20. Since then, he have built his carear based on various DJ activities in various fields and he have continied to build his career He is challenging many genres without distinguishing them In particular, Electro house, bounce, funky house, disco and ETC based on bouce are the main genres and he can said to be DJs who comunicate with the public with fresh vibes and flow",
        image: "/artists/DJ Lant/000.JPG",
        imagePosition: "center 15%",
        thumbnailPosition: "center center",
        weight: 7
    },
    {
        id: "51",
        name: "DJ Sion",
        slug: "dj-sion",
        category: "Producer, DJ",
        genre: "K-bounce, EDM",
        bio: "DJ SION has been exposed to music since he was young. He worked as a dancer and an idol, and music has always followed SION's life, and he is currently working as a DJ and producer. In addition to DJing skills, SION also has outstanding producing skills. I worked on a lot of songs and uploaded them to SoundCloud in Korean style. Currently, I have a lot of unreleased music. SION's main genres are electro house, tech house, and minimal bounce. He has experience playing at the World DJ Festival and almost every club in Korea. Let's watch DJ SION's progress as he continues to grow and become more perfect",
        image: "/artists/Sion/000.jpg",
        imagePosition: "center 25%",
        thumbnailPosition: "center center",
        weight: 7
    },
    {
        id: "52",
        name: "DJ Mochi",
        slug: "dj-mochi",
        category: "Producer, DJ",
        genre: "House, EDM",
        bio: "DJ MOCHI is a South Korean DJ and producer based in Seoul. With a background in fashion design, she draws inspiration from visual aesthetics and creative collaboration, building her own artistic identity through diverse experiences as a model and actress. Having enjoyed electronic music and attended various festivals from a young age, she began her journey not just as a listener but as a DJ and music producer. Performing actively across clubs and festivals in Korea as well as on international stages, she continues to captivate audiences with her dynamic and expressive performances",
        image: "/artists/DJ Mochi/000.jpg",
        imagePosition: "center 35%",
        thumbnailPosition: "center 90%",
        weight: 6
    },
    {
        id: "53",
        name: "DJ Windy",
        slug: "dj-windy",
        category: "DJ",
        genre: "EDM, Hard Dance, Kpop",
        bio: "DJ WINDY is a South Korea-based DJ known for her energetic and dynamic performances, specializing in Electro House-based sounds including Tech House, House, Hard Bounce, and Minimal Bounce. She captivates audiences with her powerful stage presence and distinctive style, and has performed at major festivals such as S2O Festival, Waterbomb Korea, World DJ Festival Korea, Cass Cool Festival, and Walkerhill Pool Party. DJ WINDY has also been actively performing across Asian markets, including Thailand, Taiwan, China, Macau, Singapore, and Japan. She runs her own YouTube channel, 'DJ WINDY', with approximately 52,000 subscribers as of January 2026",
        image: "/artists/DJ Windy/000.jpg",
        imagePosition: "center 35%",
        thumbnailPosition: "center center",
        weight: 6
    },
    {
        id: "54",
        name: "DJ Bliss",
        slug: "dj-bliss",
        category: "DJ",
        genre: "EDM, Hard Dance, Kpop",
        bio: "A rookie DJ armed with outstanding performance and the boundless talent of a former idol, BLISS. With a sophisticated image and a matching musical playstyle, DJ BLISS made her successful debut in January 2023. Following her rapid growth, she established herself as a Resident DJ at PREDEKAR, a hot spot in Apgujeong. Furthermore, since December 2023, she has been active as a Resident DJ at Club RACE, the trendiest club in Gangnam. Currently, she is receiving love calls for various domestic and international performances and events, making a name for herself as the next-generation female DJ in the EDM market.",
        image: "/artists/DJ Bliss/000.jpg",
        imagePosition: "center 25%",
        thumbnailPosition: "center center",
        weight: 6
    },
    {
        id: "55",
        name: "DJ Siro",
        slug: "dj-siro",
        category: "Producer, DJ",
        genre: "K-bounce, EDM",
        bio: 'Siro is constantly sending messages to the world. Siro lost the opportunity to stand on stage due to the COVID-19 outbreak, and was worried. "How can I introduce good music to people?" It was the first step to upload music, mix sets, and lectures to YouTube. and now, various contents such as beauty for women and vlogs for communication with fans are in progress. Her creations continue to develop even today.',
        image: "/artists/DJ Siro/000.png",
        imagePosition: "center 35%",
        thumbnailPosition: "center center",
        weight: 5
    },
    {
        id: "56",
        name: "Tricky",
        slug: "tricky",
        category: "DJ",
        genre: "House, EDM, Hard Dance",
        bio: "He is a DJ centered in Gangnam, Seoul. He specializes in the tech house genre and is active in various event spaces, from clubs to lounges, beyond just playing music. He enjoys trying new things and challenges, and is always looking for new musical experiences. We present sensual and trendy music. She is highly praised in various spaces such as clubs and lounges, creating her own special atmosphere and presenting many people with impressions, inspiration, and enjoyment through her constant creative endeavors and musical exploration.",
        image: "/artists/Tricky/000.jpg",
        imagePosition: "center 30%",
        thumbnailPosition: "center center",
        weight: 5
    },
    {
        id: "57",
        name: "Hyebin(Momoland) & S2",
        slug: "s2",
        category: "DJ",
        genre: "EDM",
        bio: "S2 is a veteran DJ who has been active in famous clubs and festivals for over 10 years.",
        image: "/artists/S2/000.jpg",
        imagePosition: "center center",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "58",
        name: "Hwayoung(Tiara)",
        slug: "artist-58",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/Hwayoung/000.jpg",
        imagePosition: "center center",
        thumbnailPosition: "center center",
        weight: 5
    },
    {
        id: "59",
        name: "Hyunyoung(Rainbow)",
        slug: "artist-59",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/조현영/000.jpg",
        imagePosition: "center center",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "60",
        name: "MIU",
        slug: "miu",
        category: "DJ",
        genre: "K-bounce, EDM",
        bio: 'Miu is a DJ who possesses a "reversal charm," delivering powerful EDM sets that contrast with her cute appearance. She has a wide musical spectrum, expressing not only EDM but also Hip-hop, K-pop, and Trap in her own unique color. Alongside her powerful music, her professional stage presence?characterized by high energy and excellent communication with the audience?has led to numerous love calls. Her reach extends beyond Korea to various Chinese cities like Beijing, Shanghai, and Macau, as well as Taiwan and Malaysia. Recently, she has begun to establish herself as an international DJ by performing on the main stage at S2O Taiwan.',
        image: "/artists/miu/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 6
    },
    {
        id: "61",
        name: "DJ Hyunah",
        slug: "dj-hyunah",
        category: "DJ, Performance",
        subcategory: "Dancer",
        genre: "EDM, Hard Dance, Kpop",
        bio: "After a long period as an idol trainee, Hyunah fell in love with the charm of EDM and began her career as a DJ. Driven by a special passion for music, her main genre is powerful Big Room, through which she delivers high-energy performances at every show. Furthermore, DJ Hyunah creates original K-pop mashups in her own style, gaining love from both domestic and international fans. At the 2024 S2O Festival in Thailand, she proved herself as a talented DJ who leads the atmosphere, combining her exceptional dancing skills with her DJing to dance and enjoy the music together with the audience.",
        image: "/artists/DJ Hyunah/000.jpg",
        imagePosition: "center center",
        thumbnailPosition: "center center",
        weight: 4
    },
    {
        id: "62",
        name: "Joody",
        slug: "joody",
        category: "Producer, DJ",
        genre: "EDM",
        bio: "Joody showcases a diverse range of musical styles without being bound by specific genres. Her flexible music selection and technical skills have earned high praise from music fans, with her energy and creativity particularly standing out during live performances. Her exceptional DJing abilities are recognized not only on club and festival stages but also at popular music concerts. She continues to broaden her musical spectrum through collaborations with famous artists such as Sleepy and BJ Edge. Based on her musical talent, DJ Joody is also active as a producer attracting attention both domestically and internationally. These activities contribute to her securing a unique and influential position within the music industry.",
        image: "/artists/joody/000.jpg",
        imagePosition: "center 35%",
        thumbnailPosition: "center center",
        weight: 4
    },
    {
        id: "63",
        name: "DJ Chayou",
        slug: "dj-chayou",
        category: "DJ",
        genre: "EDM",
        bio: "Chayou began her career as a singer and model, but during her activities, she developed a deep interest in DJing?봞 medium that allows her to communicate with audiences and transform the atmosphere through music. Since her successful transition to a DJ in 2020, she has been actively performing. With a particular passion for Techno, she strives to showcase diverse music and performances by exploring the genre's unique sound and stage presence. Drawing from her multifaceted experience as a singer and model, Chayou's dream and next goal is to become a representative Techno DJ of South Korea.",
        image: "/artists/Chayou/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "64",
        name: "DJ Siwon",
        slug: "dj-siwon",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/DJ Siwon/000.jpg",
        imagePosition: "center 10%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "65",
        name: "Chawon",
        slug: "chawon",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/Chawon/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        instagram: "chawon.music",
        weight: 1
    },
    {
        id: "66",
        name: "DJ Dorothy",
        slug: "dj-dorothy",
        category: "DJ",
        genre: "K-bounce, EDM",
        bio: "Dorothy is a highly skilled DJ with a broad musical spectrum built over a long career. Based in Electro House, she excels in mainstage genres like Trap, Bounce, and Big Room, while also standing out in deeper genres such as Tech House. Utilizing her extensive experience, she curates live sets that blend seamlessly with the atmosphere of clubs and festivals. Above all, she excels at leading the crowd to become fully immersed in the moment. With her striking visuals and stable performance style, DJ Dorothy is garnering significant attention, making her future activities highly anticipated.",
        image: "/artists/DJ Dorothy/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "67",
        name: "Ruby",
        slug: "ruby",
        category: "DJ",
        genre: "K-bounce, EDM",
        bio: 'Ruby is an artist who delivers "gem-like" joy to her audience through her lovely charm and sparkling DJ performances. Having entered the entertainment industry as a model and actress, she officially started DJing after being introduced to EDM genres like Future House, Hardstyle, and Techno. Captivating the party atmosphere with her outstanding visuals and glamorous performances, she is receiving many love calls from festival and event organizers across the country.',
        image: "/artists/Ruby/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "68",
        name: "Suvin",
        slug: "suvin",
        category: "DJ",
        genre: "K-bounce, EDM",
        bio: "Moving beyond her time as a member of the girl group Dal Shabet and the solo artist Dalsooobin, Suvin is currently pioneering a new and original musical world as a DJ. Her DJing goes beyond standard performances; she reinterprets K-pop on the global stage to convey pride in Korean culture while sharing intense energy with her audience. On stage, she creates magical moments that unite the music and the crowd, often leading to fans singing along to her tracks. These moments of connection serve as her fuel to always provide the best performance. Suvin does not stop at DJing; she also produces her own tracks, ranging from intense summer anthems to emotional mid-tempo songs. This journey is not just a turning point for her, but a process of reinterpreting and expanding K-pop on the world stage",
        image: "/artists/Suvin/000.jpg",
        imagePosition: "center 30%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "69",
        name: "Babbyang",
        slug: "babbyang",
        category: "DJ",
        genre: "K-bounce, EDM",
        bio: "Babbyang gained widespread recognition through the personal broadcasting platform SOOP TV before expanding her activities into various fields. In 2022, she captured public attention and affection by winning first place in the Miss Maxim Contest. Since then, she has been rapidly receiving love calls from numerous venues, including Walkerhill, steadily building her reputation as a DJ. Recently, she has embarked on a journey as a serious artist by preparing a single album, while consistently releasing mixsets and performing live. These endeavors are significantly contributing to her growing recognition as DJ Babbyang, moving beyond being just an influencer.",
        image: "/artists/bobbyang/000.jpg",
        imagePosition: "center 28%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "70",
        name: "Hanini",
        slug: "hanini",
        category: "DJ",
        genre: "K-bounce, EDM",
        bio: "",
        image: "/artists/Hanini/000.jpg",
        imagePosition: "center 27%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "71",
        name: "DJ Green",
        slug: "dj-green",
        category: "DJ",
        genre: "K-bounce, EDM",
        bio: "AN INFLUENCER (INSTAGRAM 300,000) WHO DECORATED THE OCTOBER 2022 ISSUE OF MAXIM BY COLLECTING TOPICS SUCH AS 'GANGNAM MOTORCYCLE BIKINI GIRL'. SHE STARTED HIS DJ ACTIVITIES UNDER THE NAME OF 'GREEN', AND HAS BEEN WORKING IN VARIOUS FIELDS SUCH AS YOUTUBE, ENTERTAINMENT, AND TV DRAMAS. RECENTLY, SHE HAS BEEN WORKING AS A DJ NOT ONLY LOCALLY BUT ALSO AT OVERSEAS CLUBS, AND SHE WAS INVITED AS A DJ AT THE HOMECOMING DAY HELD IN THAI BINH, VIETNAM.",
        image: "/artists/Dj Green/000.jpg",
        imagePosition: "center 35%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "72",
        name: "Minky",
        slug: "minky",
        category: "DJ",
        genre: "Hiphop",
        bio: "",
        image: "/artists/DJ Minky/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 5
    },
    {
        id: "73",
        name: "Sua",
        slug: "sua",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/Sua/000.jpg",
        imagePosition: "center 40%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "74",
        name: "Xia",
        slug: "xia",
        category: "DJ",
        genre: "Techno",
        bio: "",
        image: "/artists/Xia/000.jpg",
        imagePosition: "center 18%",
        thumbnailPosition: "center center",
        weight: 4
    },
    {
        id: "75",
        name: "Jina",
        slug: "jina",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/Jina/000.jpg",
        imagePosition: "center 13%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "76",
        name: "Dana",
        slug: "dana",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/Dana/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "77",
        name: "Bae",
        slug: "bae",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/Bae/000.jpg",
        imagePosition: "center 25%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "78",
        name: "Acid",
        slug: "acid",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/acid/000.jpg",
        imagePosition: "center 45%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "79",
        name: "Beatberry",
        slug: "beatberry",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/BeatBerry/000.jpg",
        imagePosition: "center 30%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "80",
        name: "Jiggy",
        slug: "jiggy",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/Jiggy/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "81",
        name: "Jello",
        slug: "jello",
        category: "DJ",
        genre: "Hiphop",
        bio: "",
        image: "/artists/Jello/000.jpg",
        imagePosition: "center 30%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "82",
        name: "Cash",
        slug: "cash",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/Cash/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "83",
        name: "ARI",
        slug: "ari",
        category: "DJ",
        genre: "EDM",
        bio: "DJ ARI has majored in drawing. She has artistic emotions and it appears on her music play.Despite her girly appearance, she plays very powerful music and her great performances make people can't take their eyes off her on the stage. She is now hot rookie on the scene. Please keep your eyes on her development!",
        image: "/artists/ari/000.jpg",
        imagePosition: "center 30%",
        thumbnailPosition: "center center",
        weight: 4
    },
    {
        id: "84",
        name: "Pluma",
        slug: "pluma",
        category: "DJ",
        genre: "Hiphop",
        bio: "DJ Pluma, born in Seoul, South Korea, is an emerging turntablist with a distinctive sound and skillful performances. A member of the renowned \"thetakeover\" crew, led by the Red Bull 3Style champion DJ Tezz, Pluma was mentored under his guidance, acquiring the art of turntablism and refining her craft. Known for seamlessly blending various genres, Pluma creates dynamic and engaging routines that captivate audiences. With a deep passion for the technical aspects of DJing, she incorporates innovative techniques and intricate mixes to elevate the energy of every performance. DJ Pluma's journey is marked by her dedication to pushing the boundaries of DJ culture, bringing a unique touch to the stage with every set",
        image: "/artists/pluma/000.jpg",
        imagePosition: "center 32%",
        thumbnailPosition: "center center",
        weight: 7
    },
    {
        id: "85",
        name: "DJ Doha",
        slug: "dj-doha",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/DJ Doha/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center 20%",
        weight: 6
    },
    {
        id: "86",
        name: "DJ Erry",
        slug: "dj-erry",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/DJ Erry/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 3
    },
    {
        id: "87",
        name: "Magarin",
        slug: "magarin",
        category: "DJ",
        genre: "EDM",
        bio: "",
        image: "/artists/Magarin/000.jpg",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 1
    },
    {
        id: "88",
        name: "DJ BADMON",
        slug: "badmon",
        category: "DJ",
        genre: "Hiphop, Tech House, UK garage",
        bio: "DJ BADMON made his debut as a DJ in 2018, building on his distinctive career as a street fashion model. He combines a sharp sense for emerging trends with a deep understanding of music. Centered around Hip-hop, R&B, and Pop, his sets also span a wide spectrum including Tech and Bass House, Nu Disco, Funky House, UK Garage, Bassline, and Drum & Bass. He is currently active as a resident and time-slot DJ at major venues across Seoul, including Itaewon, Gangnam, and Apgujeong.",
        image: "/artists/DJ Badmon/000.JPG",
        imagePosition: "center 20%",
        thumbnailPosition: "center center",
        weight: 6
    }
];

export function getMainCategories(): string[] {
    return ["DJ", "Producer", "Performance"];
}

export function getGenres(): string[] {
    const genres = new Set<string>();
    djs.forEach(dj => {
        if (dj.category?.includes("DJ") && dj.genre) {
            dj.genre.split(",").forEach(g => {
                const trimmed = g.trim();
                if (trimmed) genres.add(trimmed);
            });
        }
    });
    return Array.from(genres).sort();
}

export function getPerformanceSubcategories(): string[] {
    return ["Dancer Team", "Dancer", "VJ", "Live Session"];
}

export function getDJsByFilter(category?: string, filterValue?: string): DJ[] {
    let filtered = [...djs].sort((a, b) => (b.weight || 0) - (a.weight || 0));

    if (!category) return filtered;

    let result = filtered.filter(dj => dj.category?.includes(category));

    if (filterValue) {
        if (category === "DJ") {
            result = result.filter(dj =>
                dj.genre?.split(",").map(g => g.trim()).includes(filterValue)
            );
        } else if (category === "Performance") {
            result = result.filter(dj => dj.subcategory === filterValue);
        }
    }

    return result;
}
