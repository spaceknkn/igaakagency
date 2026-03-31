'use client';

// Test 2: Grid layout with colored squares (NO images)
export default function TestGridPage() {
  const items = Array.from({ length: 30 }, (_, i) => i);
  
  return (
    <div className="bg-white text-black p-10">
      <h1 className="text-4xl font-bold mb-4">Test 2: Grid + No Images</h1>
      <p className="mb-8">30 colored squares in a grid. No images, no overflow-hidden.</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map(i => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="w-[80%] mb-3">
              <div
                className="w-full rounded-full"
                style={{
                  aspectRatio: '1/1',
                  backgroundColor: `hsl(${i * 12}, 70%, 60%)`,
                }}
              />
            </div>
            <h3 className="text-sm font-semibold">Artist {i + 1}</h3>
            <p className="text-xs text-neutral-500">Genre {i + 1}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-10 bg-black text-white">
        <h2 className="text-2xl font-bold">TEST FOOTER - Grid No Images</h2>
        <p>If you see this, grids WITHOUT images work fine.</p>
      </div>
    </div>
  );
}
