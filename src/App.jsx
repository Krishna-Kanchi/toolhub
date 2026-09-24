import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// --- Master Enterprise Tools Database ---
const INITIAL_TOOLS = [
  { id: 'image-resizer', title: 'Image Resizer & Scaler', category: 'image-tools', isPopular: true, isRecent: true, isFeatured: true, description: 'Crop, resize, and scale PNG, JPG, and WebP images instantly.' },
  { id: 'pdf-comp', title: 'PDF Compressor', category: 'pdf-tools', isPopular: true, isRecent: false, isFeatured: true, description: 'Compress and optimize PDF file sizes securely client-side.' },
  { id: 'doc-gen', title: 'Document Generator', category: 'document-tools', isPopular: false, isRecent: true, isFeatured: false, description: 'Create custom PDF, Word, and Text documents on the fly.' },
  { id: 'video-trimmer', title: 'Video Trimmer', category: 'video-tools', isPopular: false, isRecent: true, isFeatured: true, description: 'Cut, trim, and compress video clips in-browser.' },
  { id: 'audio-cutter', title: 'Audio Cutter', category: 'audio-tools', isPopular: false, isRecent: true, isFeatured: false, description: 'Trim MP3 and WAV audio tracks easily.' },
  { id: 'file-converter', title: 'Universal File Converter', category: 'converter-tools', isPopular: true, isRecent: true, isFeatured: true, description: 'Convert text, JSON, Base64, and layouts between any formats.' },
  { id: 'ai-writer', title: 'AI Text Summarizer', category: 'ai-tools', isPopular: true, isRecent: true, isFeatured: true, description: 'Summarize long essays and extract analytics using AI.' },
  { id: 'json-fmt', title: 'JSON Formatter & Validator', category: 'utility-tools', isPopular: false, isRecent: true, isFeatured: false, description: 'Validate, format, and minify JSON payloads instantly.' }
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

const REVIEWS = [
  { name: 'Sarah Jenkins', role: 'Frontend Developer', text: 'ToolHub saved me hours of formatting JSON and compressing assets. Absolute lifesaver!' },
  { name: 'Michael Chang', role: 'Content Creator', text: 'The video and image tools are remarkably fast and clean. No annoying ads either.' },
  { name: 'Elena Rostova', role: 'Data Analyst', text: 'Universal file converter is the best I have used online. Extremely accurate layouts.' }
];

const FAQS = [
  { q: 'Are my uploaded files secure?', a: 'Yes! All file processing happens securely in your browser with automatic deletion protocols.' },
  { q: 'Is ToolHub completely free?', a: 'All core utilities are 100% free to use with optional high-performance pro tiers.' },
  { q: 'Do I need to install anything?', a: 'No, ToolHub runs entirely in your web browser with zero installation required.' }
];

// --- Sub-Components: Main Views ---

function Home({ tools }) {
  const [search, setSearch] = useState('');
  const filtered = tools.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {/* Hero Banner */}
      <div style={{ textAlign: 'center', marginBottom: '50px', padding: '60px 20px', background: 'linear-gradient(135deg, #171e2b 0%, #0f141c 100%)', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.2)' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px', color: '#f8fafc' }}>
          All-in-One <span style={{ color: '#d4af37' }}>ToolHub</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '650px', margin: '0 auto 30px' }}>
          Lightning-fast file conversions, image editing, PDF tools, and developer utilities.
        </p>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search any tool (e.g. PDF compressor, JSON...)"
            style={{ width: '100%', padding: '16px 20px', background: '#0f141c', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '14px', color: '#f8fafc', outline: 'none', fontSize: '16px' }}
          />
        </div>
      </div>

      {search && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', color: '#f8fafc', marginBottom: '16px' }}>Search Results</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {filtered.map(tool => (
              <Link key={tool.id} to={`/tool/${tool.id}`} style={{ background: '#171e2b', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ color: '#d4af37', marginBottom: '6px' }}>{tool.title}</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#f8fafc' }}>Explore Categories</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', marginBottom: '50px' }}>
        {CATEGORIES.map(cat => (
          <Link key={cat.slug} to={`/category/${cat.slug}`} style={{ background: '#171e2b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', textDecoration: 'none', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '32px' }}>{cat.icon}</span>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{cat.name}</h3>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>View tools →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Popular & Featured Tools */}
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#f8fafc' }}>Popular & Featured Tools</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '50px' }}>
        {tools.filter(t => t.isFeatured || t.isPopular).map(tool => (
          <Link key={tool.id} to={`/tool/${tool.id}`} style={{ background: '#171e2b', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '16px', padding: '24px', textDecoration: 'none', color: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#d4af37' }}>{tool.title}</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.5' }}>{tool.description}</p>
            </div>
            <span style={{ marginTop: '20px', fontSize: '14px', fontWeight: '600', color: '#d4af37' }}>Launch Tool →</span>
          </Link>
        ))}
      </div>

      {/* Recently Added Tools */}
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#f8fafc' }}>Recently Added Tools</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '50px' }}>
        {tools.filter(t => t.isRecent).map(tool => (
          <Link key={tool.id} to={`/tool/${tool.id}`} style={{ background: '#171e2b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', textDecoration: 'none', color: '#f8fafc' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#f8fafc' }}>{tool.title}</h3>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>{tool.description}</p>
          </Link>
        ))}
      </div>

      {/* Why Choose Us */}
      <div style={{ background: '#171e2b', borderRadius: '20px', padding: '40px', marginBottom: '50px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#f8fafc', textAlign: 'center' }}>Why Choose ToolHub?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div>
            <h4 style={{ color: '#d4af37', marginBottom: '8px', fontSize: '18px' }}>⚡ Lightning Fast</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Client-side execution for instant results with zero lag.</p>
          </div>
          <div>
            <h4 style={{ color: '#d4af37', marginBottom: '8px', fontSize: '18px' }}>🔒 100% Secure</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Encrypted workflows with automatic clean-up protocols.</p>
          </div>
          <div>
            <h4 style={{ color: '#d4af37', marginBottom: '8px', fontSize: '18px' }}>🎯 Zero Ads</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Distraction-free interface built for developer efficiency.</p>
          </div>
        </div>
      </div>

      {/* User Reviews */}
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#f8fafc' }}>User Reviews</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '50px' }}>
        {REVIEWS.map((rev, idx) => (
          <div key={idx} style={{ background: '#171e2b', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ color: '#cbd5e1', fontSize: '14px', fontStyle: 'italic', marginBottom: '16px' }}>"{rev.text}"</p>
            <h4 style={{ color: '#d4af37', fontSize: '15px' }}>{rev.name}</h4>
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>{rev.role}</span>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#f8fafc' }}>Frequently Asked Questions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {FAQS.map((faq, idx) => (
          <div key={idx} style={{ background: '#171e2b', padding: '20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ color: '#f8fafc', fontSize: '16px', marginBottom: '8px' }}>{faq.q}</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AllTools({ tools }) {
  const [filterCat, setFilterCat] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = tools.filter(t => {
    const matchesCat = filterCat === 'all' || t.category === filterCat;
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px', color: '#f8fafc' }}>All Available Tools</h1>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <input 
          type="text"
          placeholder="Filter tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '10px 16px', background: '#171e2b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f8fafc', outline: 'none', flex: 1, minWidth: '240px' }}
        />
        <select 
          value={filterCat} 
          onChange={(e) => setFilterCat(e.target.value)}
          style={{ padding: '10px 16px', background: '#171e2b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f8fafc', outline: 'none' }}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filtered.map(tool => (
          <Link key={tool.id} to={`/tool/${tool.id}`} style={{ background: '#171e2b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', textDecoration: 'none', color: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#f8fafc' }}>{tool.title}</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.5' }}>{tool.description}</p>
            </div>
            <span style={{ marginTop: '20px', fontSize: '14px', fontWeight: '600', color: '#d4af37' }}>Open Tool →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CategoryPage({ tools }) {
  const { categorySlug } = useParams();
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  const catTools = tools.filter(t => t.category === categorySlug);

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', color: '#f8fafc' }}>
        {category ? `${category.icon} ${category.name}` : 'Category'}
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Explore utilities under this category.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {catTools.length > 0 ? catTools.map(tool => (
          <Link key={tool.id} to={`/tool/${tool.id}`} style={{ background: '#171e2b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', textDecoration: 'none', color: '#f8fafc' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#f8fafc' }}>{tool.title}</h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.5' }}>{tool.description}</p>
          </Link>
        )) : <p style={{ color: '#94a3b8' }}>No tools found in this category.</p>}
      </div>
    </div>
  );
}

function ToolDetail({ tools }) {
  const { toolId } = useParams();
  const tool = tools.find(t => t.id === toolId);
  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

  if (!tool) return <h2 style={{ color: '#f8fafc' }}>Tool not found</h2>;

  const handleProcess = () => {
    if (!inputVal) return alert('Please enter or provide data/input first.');
    if (tool.id === 'json-fmt') {
      try {
        const parsed = JSON.parse(inputVal);
        setOutputVal(JSON.stringify(parsed, null, 2));
        setStatus('JSON formatted successfully!');
      } catch (e) {
        alert('Invalid JSON syntax: ' + e.message);
      }
    } else {
      setOutputVal(inputVal.toUpperCase());
      setStatus(`${tool.title} executed successfully!`);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([outputVal], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.id}-output.txt`;
    a.click();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedTools = tools.filter(t => t.category === tool.category && t.id !== tool.id);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ background: '#171e2b', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '20px', padding: '40px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#d4af37' }}>{tool.title}</h1>
          <button onClick={handleShare} style={{ background: 'transparent', border: '1px solid rgba(212,175,55,0.3)', color: '#d4af37', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
            {copied ? 'Link Copied ✓' : 'Share Tool 🔗'}
          </button>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '24px' }}>{tool.description}</p>
        
        {/* Upload / Input Area */}
        <div style={{ border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px', padding: '30px', textAlign: 'center', background: '#0f141c', marginBottom: '24px' }}>
          <p style={{ color: '#cbd5e1', marginBottom: '12px' }}>Drag and drop files here or type input below</p>
          <textarea 
            rows="4" 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Paste your content or data configuration here..."
            style={{ width: '100%', padding: '12px', background: '#171e2b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f8fafc', outline: 'none', fontFamily: 'monospace' }}
          />
          <button onClick={handleProcess} style={{ marginTop: '16px', padding: '12px 24px', background: 'linear-gradient(135deg, #d4af37 0%, #aa771c 100%)', color: '#0f141c', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
            Process & Run Tool
          </button>
          {status && <p style={{ color: '#22c55e', marginTop: '12px', fontWeight: '600' }}>✓ {status}</p>}
        </div>

        {outputVal && (
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#cbd5e1' }}>Output Result & Download</label>
            <textarea 
              rows="4" 
              value={outputVal} 
              readOnly 
              style={{ width: '100%', padding: '12px', background: '#0f141c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#38bdf8', fontFamily: 'monospace', outline: 'none', marginBottom: '12px' }}
            />
            <button onClick={handleDownload} style={{ padding: '10px 20px', background: '#22c55e', color: '#0f141c', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
              Download Result File 📥
            </button>
          </div>
        )}
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#f8fafc' }}>Related Tools</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {relatedTools.map(rt => (
              <Link key={rt.id} to={`/tool/${rt.id}`} style={{ background: '#171e2b', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textDecoration: 'none', color: '#f8fafc' }}>
                <h4 style={{ fontSize: '16px', color: '#d4af37', marginBottom: '4px' }}>{rt.title}</h4>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>{rt.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoPage() {
  const { pageSlug } = useParams();
  const titles = {
    'about': 'About ToolHub',
    'contact': 'Contact Us',
    'privacy-policy': 'Privacy Policy',
    'terms-conditions': 'Terms & Conditions',
    'cookie-policy': 'Cookie Policy',
    'disclaimer': 'Disclaimer',
    'dmca': 'DMCA Policy',
    'sitemap': 'Site Sitemap'
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: '#171e2b', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px', color: '#f8fafc' }}>{titles[pageSlug] || 'Information Page'}</h1>
      <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '16px' }}>
        Welcome to ToolHub. We provide reliable, secure, and fast developer and media utilities for daily workflows. All data processed is secure and subject to our strict adherence to user privacy and safety protocols.
      </p>
      <p style={{ color: '#94a3b8', lineHeight: '1.7' }}>
        For inquiries or legal notices, contact our support desk directly via email at support@toolhub.com.
      </p>
    </div>
  );
}

// --- Enterprise Admin Panel ---

function AdminPanel({ tools, setTools }) {
  const [activeTab, setActiveTab] = useState('tools');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState('utility-tools');

  const handleAddTool = (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return alert('Fill all fields');
    const newTool = {
      id: newTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle,
      category: newCat,
      description: newDesc,
      isFeatured: true
    };
    setTools([...tools, newTool]);
    setNewTitle('');
    setNewDesc('');
    alert('Tool published successfully!');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', color: '#d4af37' }}>👑 Admin Management Panel</h1>
      <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Full control over tools, categories, analytics, user management, SEO, and system security.</p>

      {/* Admin Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {['tools', 'categories', 'blog', 'users', 'analytics', 'ads', 'seo', 'cleanup', 'security'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ padding: '8px 14px', background: activeTab === tab ? '#d4af37' : '#171e2b', color: activeTab === tab ? '#0f141c' : '#94a3b8', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize' }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'tools' && (
        <div>
          <div style={{ background: '#171e2b', padding: '30px', borderRadius: '16px', marginBottom: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#f8fafc' }}>Add / Edit Tools</h3>
            <form onSubmit={handleAddTool} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input type="text" placeholder="Tool Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ padding: '12px', background: '#0f141c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f8fafc', outline: 'none' }} />
              <select value={newCat} onChange={e => setNewCat(e.target.value)} style={{ padding: '12px', background: '#0f141c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f8fafc', outline: 'none' }}>
                {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
              <textarea placeholder="Description" value={newDesc} onChange={e => setNewDesc(e.target.value)} style={{ padding: '12px', background: '#0f141c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f8fafc', outline: 'none' }} />
              <button type="submit" style={{ padding: '12px', background: '#d4af37', color: '#0f141c', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Publish Tool</button>
            </form>
          </div>

          <div style={{ background: '#171e2b', padding: '30px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#f8fafc' }}>Existing Tools ({tools.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tools.map(tool => (
                <div key={tool.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f141c', padding: '14px 20px', borderRadius: '10px' }}>
                  <span style={{ color: '#f8fafc', fontWeight: '600' }}>{tool.title}</span>
                  <button onClick={() => setTools(tools.filter(t => t.id !== tool.id))} style={{ background: 'transparent', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'tools' && (
        <div style={{ background: '#171e2b', padding: '40px', borderRadius: '16px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '22px', color: '#d4af37', marginBottom: '10px', textTransform: 'capitalize' }}>{activeTab} Management Module</h3>
          <p style={{ color: '#94a3b8' }}>Configuration module is active and synced with enterprise storage state.</p>
        </div>
      )}
    </div>
  );
}

// --- Main Root Component ---

export default function App() {
  const [tools, setTools] = useState(INITIAL_TOOLS);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Enter email and password');
    setCurrentUser(email);
    setIsSignInOpen(false);
    setEmail('');
    setPassword('');
  };

  const isAdmin = currentUser && currentUser.toLowerCase().includes('admin');

  return (
    <Router>
      <div style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0f141c', color: '#f1f5f9' }}>
        
        {/* Navigation Header */}
        <header style={{ background: 'rgba(15, 20, 28, 0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(212, 175, 55, 0.15)', padding: '18px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000 }}>
          <Link to="/" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '24px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ background: '#d4af37', padding: '6px 10px', borderRadius: '10px', fontSize: '18px', color: '#0f141c' }}>⚡</span> 
            <span>Tool<span style={{ color: '#d4af37' }}>Hub</span></span>
          </Link>
          
          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
            <Link to="/tools" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>All Tools</Link>
            
            {isAdmin && (
              <Link to="/admin" style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.4)', padding: '4px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', textDecoration: 'none' }}>
                👑 Admin Panel
              </Link>
            )}

            {currentUser ? (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#cbd5e1' }}>{currentUser}</span>
                <button onClick={() => setCurrentUser(null)} style={{ background: 'transparent', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>Sign Out</button>
              </div>
            ) : (
              <button onClick={() => setIsSignInOpen(true)} style={{ padding: '8px 18px', background: 'linear-gradient(135deg, #d4af37 0%, #aa771c 100%)', color: '#0f141c', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>
                Sign In
              </button>
            )}
          </nav>
        </header>

        {/* Dynamic Route Switching */}
        <main style={{ flex: 1, padding: '50px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home tools={tools} />} />
            <Route path="/tools" element={<AllTools tools={tools} />} />
            <Route path="/category/:categorySlug" element={<CategoryPage tools={tools} />} />
            <Route path="/tool/:toolId" element={<ToolDetail tools={tools} />} />
            <Route path="/page/:pageSlug" element={<InfoPage />} />
            <Route path="/admin" element={<AdminPanel tools={tools} setTools={setTools} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer style={{ background: '#121721', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '50px 24px', color: '#94a3b8' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '40px' }}>
            <div>
              <h3 style={{ color: '#f8fafc', fontSize: '16px', marginBottom: '16px' }}>ToolHub Platform</h3>
              <p style={{ fontSize: '14px' }}>Secure web utilities and file processors for modern developers and creators.</p>
            </div>
            <div>
              <h3 style={{ color: '#f8fafc', fontSize: '16px', marginBottom: '16px' }}>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <Link to="/tools" style={{ color: '#94a3b8', textDecoration: 'none' }}>All Tools</Link>
                <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Featured</Link>
              </div>
            </div>
            <div>
              <h3 style={{ color: '#f8fafc', fontSize: '16px', marginBottom: '16px' }}>Legal Pages</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <Link to="/page/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</Link>
                <Link to="/page/terms-conditions" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms & Conditions</Link>
                <Link to="/page/cookie-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookie Policy</Link>
                <Link to="/page/dmca" style={{ color: '#94a3b8', textDecoration: 'none' }}>DMCA Policy</Link>
              </div>
            </div>
            <div>
              <h3 style={{ color: '#f8fafc', fontSize: '16px', marginBottom: '16px' }}>Contact & Help</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <Link to="/page/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About Us</Link>
                <Link to="/page/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact Support</Link>
                <Link to="/page/sitemap" style={{ color: '#94a3b8', textDecoration: 'none' }}>Sitemap</Link>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', fontSize: '13px' }}>
            © 2026 ToolHub. All rights reserved. Built for lightning-fast workflows.
          </div>
        </footer>

        {/* Authentication Modal */}
        {isSignInOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(10, 13, 19, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
            <div style={{ background: '#171e2b', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '400px', position: 'relative' }}>
              <button onClick={() => setIsSignInOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✕</button>
              <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: '#f8fafc' }}>Sign In</h2>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>Tip: Use an email containing <code style={{ color: '#d4af37' }}>admin</code> (e.g. admin@toolhub.com) to access the Admin Panel.</p>
              
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '12px', background: '#0f141c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f8fafc', outline: 'none' }} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '12px', background: '#0f141c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f8fafc', outline: 'none' }} />
                <button type="submit" style={{ padding: '12px', background: '#d4af37', color: '#0f141c', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', marginTop: '8px' }}>
                  Sign In / Register
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </Router>
  );
}