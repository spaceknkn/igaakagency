'use client';

export default function TestScrollPage() {
  return (
    <div className="bg-white text-black p-10">
      <h1 className="text-4xl font-bold mb-10">Diagnostic Scroll Test</h1>
      <p className="mb-4">If you can see the footer at the very bottom of the "Full Page" screenshot, then our global CSS/Layout is working correctly.</p>
      
      {/* 5000px of spacer */}
      <div style={{ height: '5000px', background: 'linear-gradient(to bottom, #fff, #f0f0f0)', borderLeft: '5px solid #F5A623', padding: '20px' }}>
        <p>This is a 5000px tall container.</p>
        <p style={{ marginTop: '2500px' }}>This is the middle of the test page (2500px down).</p>
      </div>

      <div className="mt-10 p-10 bg-black text-white" id="test-footer">
        <h2 className="text-2xl font-bold">TEST FOOTER - BOTTOM REACHED</h2>
        <p>If you see this in your "Full Page" screenshot, the diagnosis is: <strong>Content Complexity</strong> causes the bug on other pages.</p>
        <p>If you DON'T see this, the diagnosis is: <strong>Global CSS/Layout</strong> blocks Safari's capture engine.</p>
      </div>
    </div>
  );
}
