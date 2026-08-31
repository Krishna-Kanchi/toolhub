import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// --- Master Database of All Tools across All Categories ---
const TOOLS_DATABASE = [
  { id: 'image-resizer', title: 'Image Resizer', category: 'image-tools', isPopular: true, isRecent: false, isFeatured: true, description: 'Crop, resize, and scale PNG, JPG, and WebP images quickly.' },
  { id: 'pdf-comp', title: 'PDF Compressor', category: 'pdf-tools', isPopular: true, isRecent: false, isFeatured: true, description: 'Compress and optimize PDF file sizes securely.' },
  { id: 'doc-gen', title: 'Document Generator', category: 'document-tools', isPopular: false, isRecent: true, isFeatured: false, description: 'Create custom PDF, Word, and Text files on the fly.' },
  { id: 'video-trimmer', title: 'Video Trimmer', category: 'video-tools', isPopular: false, isRecent: true, isFeatured: true, description: 'Cut, trim, and compress video clips online.' },
  { id: 'audio-cutter', title: 'Audio Cutter', category: 'audio-tools', isPopular: false, isRecent: true, isFeatured: false, description: 'Trim MP3 and WAV audio tracks easily.' },
  { id: 'file-converter', title: 'Universal File Converter (Any-to-Any)', category: 'converter-tools', isPopular: true, isRecent: true, isFeatured: true, description: 'Convert PDF, Word, Excel, Images, and Text between any formats with 100% layout and alignment accuracy.' },
  { id: 'ai-writer', title: 'AI Text Summarizer', category: 'ai-tools', isPopular: true, isRecent: true, isFeatured: true, description: 'Summarize long essays and documents using AI.' },
  { id: 'json-fmt', title: 'JSON Formatter', category: 'utility-tools', isPopular: false, isRecent: false, isFeatured: false, description: 'Validate, format, and minify JSON payloads instantly.' }
];

const CATEGORIES = [
  { slug: 'image-tools', name: 'Image Tools', icon: '🖼️' },
  { slug: 'pdf-tools', name: 'PDF Tools', icon: '📄' },
  { slug: 'document-tools', name: 'Document Tools', icon: '📝' },
  { slug: 'video-tools', name: 'Video Tools', icon: '🎬' },
  { slug: 'audio-tools', name: 'Audio Tools', icon: '🎵' },
  { slug: 'converter-tools', name: 'Converter Tools', icon: '🔄' },
  { slug: 'ai-tools', name: 'AI Tools', icon: '🤖' },
  { slug: 'utility-tools', name: 'Utility Tools', icon: '⚙️' }
];

export default function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('signin');
  const [copiedGlobal, setCopiedGlobal] = useState(false);

  // User & Admin session state
  const [currentUser, setCurrentUser] = useState(null);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Please enter email and password.');
    
    // Set the current logged-in user session
    setCurrentUser(email);
    setIsSignInOpen(false);
    setEmail('');
    setPassword('');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  const handleGlobalShare = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedGlobal(true);
    setTimeout(() => setCopiedGlobal(false), 2000);
  };

  const isAdmin = currentUser && (currentUser.toLowerCase().includes('admin') || currentUser === 'admin@toolhub.com');

  return (
    <Router>
      <div style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0f141c', color: '#f1f5f9' }}>
        
        {/* Header */}
        <header style={{ background: 'rgba(15, 20, 28, 0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(212, 175, 55, 0.15)', padding: '18px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000 }}>
          <Link to="/" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ background: 'linear-gradient(135deg, #d4af37 0%, #aa771c 100%)', padding: '6px 10px', borderRadius: '10px', fontSize: '18px', color: '#0f141c', fontWeight: 'bold' }}>⚡</span> 
            <span>Tool<span style={{ color: '#d4af37' }}>Hub</span></span>
          </Link>
          
          <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Home</Link>
            <Link to="/tools" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>All Tools</Link>
            <Link to="/tool/file-converter" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>Universal Converter 🔄</Link>
            
            {isAdmin && (
              <span style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.4)', padding: '4px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: '700' }}>
                👑 Admin Panel
              </span>
            )}
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '24px' }}>
              <button 
                onClick={() => setIsShareModalOpen(true)} 
                style={{ padding: '8px 16px', background: 'rgba(23, 30, 43, 0.8)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
              >
                Share Platform 🔗
              </button>

              {currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(23, 30, 43, 0.9)', padding: '6px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}></span>
                    <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '600' }}>{currentUser}</span>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    style={{ padding: '8px 14px', background: 'transparent', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { setAuthMode('signin'); setIsSignInOpen(true); }} 
                  style={{ padding: '8px 20px', background: 'linear-gradient(135deg, #d4af37 0%, #aa771c 100%)', color: '#0f141c', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}
                >
                  Sign In / Sign Up
                </button>
              )}
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '50px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<AllTools />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/tool/:toolId" element={<ToolDetail />} />
            <Route path="/page/:pageSlug" element={<InfoPage />} />
          </Routes>
        </main>

        {/* Sign In / Sign Up Modal */}
        {isSignInOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(10, 13, 19, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
            <div style={{ background: '#171e2b', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
              <button onClick={() => setIsSignInOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✕</button>
              
              <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px', color: '#f8fafc' }}>
                {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Tip: Use an email containing <code style={{ color: '#d4af37' }}>admin</code> to test admin privileges.</p>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: '#0f141c', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <button onClick={() => setAuthMode('signin')} style={{ flex: 1, padding: '10px', background: authMode === 'signin' ? '#d4af37' : 'transparent', color: authMode === 'signin' ? '#0f141c' : '#94a3b8', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
                <button onClick={() => setAuthMode('signup')} style={{ flex: 1, padding: '10px', background: authMode === 'signup' ? '#d4af37' : 'transparent', color: authMode === 'signup' ? '#0f141c' : '#94a3b8', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Sign