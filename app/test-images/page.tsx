'use client';

// Test 3: Grid layout WITH real external images
export default function TestImagesPage() {
  const items = Array.from({ length: 30 }, (_, i) => i);
  
  return (
    <div className="bg-white text-black p-10">
      <h1 className="text-4xl font-bold mb-4">Test 3: Grid + Images</h1>
      <p className="mb-8">30 images in a grid using standard img tags + aspect-ratio.</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map(i => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="w-[80%] mb-3">
              <img
                src={`https://picsum.photos/seed/${i}/400/400`}
                alt={`Test ${i}`}
                loading="eager"
                decoding="sync"
                className="w-full rounded-full object-cover"
                style={{ aspectRatio: '1/1' }}
              />
            </div>
            <h3 className="text-sm font-semibold">Artist {i + 1}</h3>
            <p className="text-xs text-neutral-500">Genre {i + 1}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-10 bg-black text-white">
        <h2 className="text-2xl font-bold">TEST FOOTER - Grid With Images</h2>
        <p>If you see this, grids WITH images work fine.</p>
        <p>If you DON't see this, IMAGES in grids are the problem.</p>
      </div>
    </div>
  );
}
