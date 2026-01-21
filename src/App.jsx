import React, { useState, useEffect, useRef } from 'react';
import { Layers, Book, Lock, User, Mail, Code, Terminal, Search, LogOut, Play, ChevronRight, Save, Cpu, Wifi, Shield, Database, Video, FileText, PenTool, Check, Menu, X, Map, Globe, Brain, Smartphone } from 'lucide-react';

/* =================================================================================
   1. CSS STYLES (NAVBAR FIXES & RESPONSIVE)
   ================================================================================= */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Fira+Code:wght@400;500;700&family=Tajawal:wght@400;500;700;800&display=swap');

  :root { --gold: #FFD54F; --dark-bg: #000000; --panel-bg: rgba(18, 18, 18, 0.95); --border-color: rgba(255, 213, 79, 0.2); }
  * { box-sizing: border-box; margin: 0; padding: 0; outline: none; -webkit-tap-highlight-color: transparent; }
  body { font-family: 'Tajawal', sans-serif; background-color: var(--dark-bg); color: #e0e0e0; overflow-x: hidden; line-height: 1.5; min-height: 100vh; }
  
  .font-cairo { font-family: 'Cairo', sans-serif; }
  .font-code { font-family: 'Fira Code', monospace; }
  .text-gold { color: var(--gold); }
  .text-white { color: #fff; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .gap-2 { gap: 0.5rem; }
  .w-full { width: 100%; }
  .pointer { cursor: pointer; }

  /* Container */
  .app-container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 20px 16px; position: relative; z-index: 2; }
  
  /* Grid System */
  .grid-system { display: grid; gap: 16px; grid-template-columns: 1fr; }
  @media (min-width: 600px) { .grid-system { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
  @media (min-width: 1024px) { .grid-system { grid-template-columns: repeat(3, 1fr); gap: 24px; } }
  @media (min-width: 1280px) { .grid-system { grid-template-columns: repeat(4, 1fr); } }

  /* Panels */
  .dark-panel {
    background: var(--panel-bg); border: 1px solid var(--border-color);
    border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.6);
    transition: transform 0.2s ease, border-color 0.2s ease; overflow: hidden; position: relative;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .clickable:active { transform: scale(0.98); }
  .clickable:hover { border-color: rgba(255, 213, 79, 0.5); transform: translateY(-4px); }

  /* Inputs */
  .hacker-input {
    background-color: #080808; border: 1px solid #333; color: #fff;
    font-family: 'Cairo', sans-serif; font-weight: 600; width: 100%;
    padding: 12px 40px 12px 16px; border-radius: 8px; transition: all 0.3s ease; font-size: 16px;
  }
  .hacker-input:focus { border-color: var(--gold); box-shadow: 0 0 10px rgba(255, 213, 79, 0.2); }

  /* Navbar */
  .navbar {
    position: sticky; top: 0; z-index: 100; background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px); border-bottom: 1px solid #3E2723; padding: 12px 0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  }
  
  /* Mobile Menu */
  .mobile-menu {
    position: fixed; top: 60px; left: 0; right: 0; background: #0a0a0a;
    border-bottom: 1px solid #333; padding: 16px; z-index: 99;
    display: flex; flex-direction: column; gap: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
  }

  /* Buttons */
  .btn-gold {
    background: var(--gold); color: #000; font-weight: bold;
    padding: 10px; border-radius: 6px; border: none; cursor: pointer;
    font-family: 'Cairo', sans-serif; font-size: 0.9rem; transition: background 0.2s;
    text-align: center; display: block; width: 100%; text-decoration: none;
  }
  .btn-gold:hover { background: #FFCA28; }

  /* Animations */
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-entry { animation: fadeInUp 0.5s ease-out forwards; }
  
  /* Responsive Utils */
  .desktop-only { display: none; }
  .mobile-only { display: block; }
  @media (min-width: 768px) { .desktop-only { display: block; } .mobile-only { display: none; } }
`;

/* =================================================================================
   2. MATRIX BACKGROUND
   ================================================================================= */
const InteractiveMatrix = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(1);
    const chars = "01CS_PROMAX<>"; 
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';
      for (let i = 0; i < drops.length; i++) {
        const x = i * 20; const y = drops[i] * 20;
        ctx.fillStyle = Math.random() > 0.98 ? '#FFD54F' : '#222';
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);
        if (y > canvas.height && Math.random() > 0.98) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 50);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
};

/* =================================================================================
   3. DATA (WITH ROADMAPS)
   ================================================================================= */
const roadmapsData = [
  { id: 1, title: "Web Development", icon: <Globe size={32} className="text-gold" />, desc: "مسار تطوير المواقع (Full Stack)", steps: ["HTML, CSS, JS", "React (Frontend)", "Node.js (Backend)", "Databases", "Git/GitHub"] },
  { id: 2, title: "AI & Data Science", icon: <Brain size={32} className="text-gold" />, desc: "ذكاء اصطناعي وعلم بيانات", steps: ["Python", "Math & Stats", "Pandas & NumPy", "Machine Learning", "Deep Learning"] },
  { id: 3, title: "Mobile App Dev", icon: <Smartphone size={32} className="text-gold" />, desc: "تطوير تطبيقات الهواتف", steps: ["Dart / Kotlin", "Flutter Framework", "State Management", "API Integration", "Publishing"] },
  { id: 4, title: "Cyber Security", icon: <Shield size={32} className="text-gold" />, desc: "الأمن السيبراني", steps: ["Networking Basics", "Linux OS", "Python Scripting", "Penetration Testing", "Cryptography"] }
];

const initialData = [
  { id: 1, title: "Semester 01", year: "Freshman", subjects: [{ name: "Intro to CS", code: "CS100", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Basic Mathematics", code: "MATH100", lectures: [{title: "Limits", type: "pdf", link: "#", note: "Chapter 1"}], videos: [], labs: [], assignments: [{title: "Math Sheet #1", question: "Limit calculation?", solutionText: "Answer is 2."}] }, { name: "English I", code: "ENG101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Arabic I", code: "ARB101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Physics", code: "PHY101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Religious Culture", code: "REL101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Prog. Fundamentals", code: "CS102", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 2, title: "Semester 02", year: "Freshman", subjects: [{ name: "Arabic II", code: "ARB102", lectures: [], videos: [], labs: [], assignments: [] }, { name: "English II", code: "ENG102", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Religious Culture II", code: "REL102", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Calculus I", code: "MATH101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Prog. Methods I", code: "CS103", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Sudanese Studies", code: "SUD101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Discrete Math", code: "MATH102", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 3, title: "Semester 03", year: "Sophomore", subjects: [
      { name: "Calculus II", code: "MATH201", lectures: [{ title: "Full Course Notes", type: "pdf", link: "https://drive.google.com/file/d/10F5uzxD7uIjC57I_lN9-zR6f5AwjVKGX/view?usp=drivesdk", note: "مقرر الحسبان (نوتة شاملة)" }], videos: [], labs: [], assignments: [] },
      { name: "Statistics", code: "STAT201", lectures: [{ title: "Lec 1: Intro", type: "pdf", link: "#", note: "Intro" }], videos: [], labs: [], assignments: [] },
      { name: "Linear Algebra", code: "MATH202", lectures: [{ title: "Full Course", type: "pdf", link: "https://drive.google.com/file/d/1N50ZtpnDzMFjRrU6mxXWHEP5JuPtaI1v/view?usp=drivesdk", note: "مقرر الجبر الخطي شامل" }], videos: [], labs: [], assignments: [] },
      { name: "Prog. Methods II", code: "CS201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Sys Analysis I", code: "IS201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Comm. Skills", code: "GEN201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Digital Design", code: "CS202", lectures: [{ title: "Lec 1: Data Rep.", type: "pdf", link: "https://drive.google.com/file/d/1myETzAxTFMlp-FXh3kWNJlLiUNpOWgwW/view?usp=drivesdk", note: "تمثيل البيانات" }], videos: [], labs: [], assignments: [] }
  ]},
  { id: 4, title: "Semester 04", year: "Sophomore", subjects: [
      { 
        name: "Object Oriented Prog.", code: "CS203", 
        lectures: [
            { title: "Lec 1: Concepts", type: "pdf", link: "#", note: "Intro" },
            { title: "Lec 2: Slides", type: "pptx", link: "#", note: "PowerPoint" }
        ], 
        videos: [{ title: "OOP Intro", duration: "45:00", link: "#" }], 
        labs: [{title: "Lab 1", code: "#include <iostream>...", description: "C++ Basics"}], 
        assignments: [{ title: "OOP Task 1", question: "Create Student class", solutionCode: `class Student { int id; }` }] 
      },
      { name: "Data Structures", code: "CS204", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Sys Analysis II", code: "IS202", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "File Management", code: "CS205", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "HCI", code: "IS203", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Operation Research", code: "MATH203", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Database I", code: "IS204", lectures: [], videos: [], labs: [], assignments: [] }
  ]},
  { id: 5, title: "Semester 05", year: "Junior", subjects: [{ name: "Internet Tech I", code: "IT301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Computer Networks", code: "CN301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Database II", code: "IS301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Algorithms", code: "CS301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Visual Prog.", code: "CS302", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Microprocessors", code: "CS303", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Software Eng I", code: "SE301", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 6, title: "Semester 06", year: "Junior", subjects: [{ name: "Internet Tech II", code: "IT302", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Computer Arch.", code: "CS304", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Operating Systems", code: "CS305", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Research Meth.", code: "GEN301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Software Eng II", code: "SE302", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Computer Graphics", code: "CS306", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Distributed DB", code: "IS302", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 7, title: "Semester 07", year: "Senior", subjects: [{ name: "Prog. Concepts", code: "CS401", lectures: [], videos: [], labs: [], assignments: [] }, { name: "AI", code: "CS402", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Simulation", code: "CS403", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Elective Course I", code: "EL401", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Elective Course II", code: "EL402", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Project I", code: "PROJ1", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 8, title: "Semester 08", year: "Senior", subjects: [{ name: "Ethical Issues", code: "GEN401", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Networks Security", code: "CN401", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Wireless Comp.", code: "CN402", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Prog. Concepts II", code: "CS404", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Project II", code: "PROJ2", lectures: [], videos: [], labs: [], assignments: [] }] }
];

/* =================================================================================
   4. COMPONENTS
   ================================================================================= */
const CodeViewer = ({ code, title }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="dark-panel bg-[#050505] shadow-lg my-4 text-left w-full" dir="ltr">
      <div className="bg-[#111] px-3 py-2 flex justify-between items-center border-b border-[#3E2723]">
        <div className="flex items-center gap-2"><Terminal size={14} className="text-gold"/><span className="font-code text-gray-400 text-xs font-bold">{title}</span></div>
        <button onClick={handleCopy} className="badge pointer hover:bg-[#FFD54F] hover:text-black">{copied ? "COPIED" : "COPY"}</button>
      </div>
      <pre className="p-4 text-xs font-code overflow-x-auto text-[#0f0] bg-[#000]">{code}</pre>
    </div>
  );
};

const SolutionViewer = ({ text, title }) => (
  <div className="dark-panel bg-[#0a0a0a] shadow-lg my-4 p-4 relative overflow-hidden group w-full text-right">
    <h5 className="font-cairo text-gold text-xs font-bold mb-2 flex items-center gap-2"><Check size={14}/> {title}</h5>
    <p className="font-cairo text-gray-300 leading-relaxed whitespace-pre-line">{text}</p>
  </div>
);

const LoginScreen = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', secret: '' });
  const [error, setError] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); if (formData.secret !== 'NRU@Cs@21') { setError('⛔ ACCESS DENIED'); return; } onLogin(formData); };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', zIndex: 20, position: 'relative' }}>
      <div className="dark-panel animate-entry" style={{ padding: '30px', width: '100%', maxWidth: '400px', borderTop: '4px solid #FFD54F' }}>
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <div className="icon-box" style={{ display: 'inline-flex', borderRadius: '50%', marginBottom: '16px', border: '1px solid #FFD54F', padding: '10px' }}><Shield size={32} className="text-gold" /></div>
          <h1 className="font-cairo text-white" style={{ fontSize: '24px', fontWeight: '900', marginBottom: '4px' }}>CS PROMAX</h1>
          <p className="font-code text-gold" style={{ fontSize: '10px', letterSpacing: '4px' }}>SECURE_LOGIN</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative"><User size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: '#555' }}/><input required placeholder="الاسم" className="hacker-input" onChange={e => setFormData({...formData, name: e.target.value})} /></div>
          <div className="relative"><Mail size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: '#555' }}/><input required type="email" placeholder="الإيميل" className="hacker-input" onChange={e => setFormData({...formData, email: e.target.value})} /></div>
          <div className="relative"><Lock size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: '#555' }}/><input required type="password" placeholder="الكود السري" className="hacker-input" style={{ letterSpacing: '3px' }} onChange={e => setFormData({...formData, secret: e.target.value})} /></div>
          {error && <div className="font-code text-center" style={{ color: '#ff4444', fontSize: '12px', padding: '8px', border: '1px solid #ff4444', borderRadius: '4px', background: 'rgba(255,0,0,0.1)' }}>{error}</div>}
          <button className="btn-gold">تسجيل الدخول</button>
        </form>
      </div>
    </div>
  );
};

/* =================================================================================
   5. MAIN APP
   ================================================================================= */
export default function CsProMaxV32() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [activeSem, setActiveSem] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { const u = localStorage.getItem('cs_promax_v32'); if(u) setUser(JSON.parse(u)); }, []);
  const login = (u) => { setUser(u); localStorage.setItem('cs_promax_v32', JSON.stringify(u)); };
  const logout = () => { localStorage.removeItem('cs_promax_v32'); setUser(null); setView('home'); setMenuOpen(false); };

  const filtered = initialData.map(s => ({
    ...s, subjects: s.subjects.filter(sub => sub.name.toLowerCase().includes(search.toLowerCase()) || sub.code.toLowerCase().includes(search.toLowerCase()))
  })).filter(s => s.subjects.length > 0);

  return (
    <div dir="rtl">
      <style>{styles}</style>
      <InteractiveMatrix />
      
      {!user ? <LoginScreen onLogin={login} /> : (
        <>
          <nav className="navbar">
            <div className="app-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="flex items-center gap-2 pointer" onClick={() => setView('home')}>
                <div style={{ background: '#000', padding: '6px', borderRadius: '6px', border: '1px solid #FFD54F' }}><Terminal size={20} className="text-gold"/></div>
                <div><h1 className="font-cairo text-white" style={{ fontSize: '18px', fontWeight: 'bold' }}>CS PROMAX</h1><span className="font-code" style={{ fontSize: '10px', color: '#888' }}>BATCH 21</span></div>
              </div>
              
              {/* Desktop Nav */}
              <div className="desktop-only" style={{ display: 'flex', gap: '20px', alignItems: 'center', flex:1, justifyContent:'center' }}>
                <div style={{position:'relative', width:'300px'}}>
                   <input type="text" placeholder="بحث..." className="hacker-input" style={{ padding: '8px 35px 8px 12px', fontSize: '0.9rem' }} onChange={e => { setSearch(e.target.value); if(e.target.value) setView('home'); }} />
                   <Search className="absolute" style={{ right: '10px', top: '10px', color: '#666', pointerEvents: 'none' }} size={16}/>
                </div>
                <button onClick={() => setView('roadmaps')} className="badge pointer" style={{fontSize:'12px', display:'flex', alignItems:'center', gap:'5px', padding:'8px'}}><Map size={14}/> المسارات</button>
              </div>

              {/* Desktop Profile */}
              <div className="desktop-only" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ textAlign: 'right' }}><div className="text-gold font-cairo" style={{ fontSize: '0.8rem' }}>{user.name}</div><div style={{ fontSize: '0.6rem', color: '#666' }} className="font-code">{user.email}</div></div>
                <button onClick={logout} style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', padding: '8px', borderRadius: '50%', color: '#ff4444', cursor: 'pointer' }}><LogOut size={18}/></button>
              </div>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-only text-gold"><Menu size={24}/></button>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
              <div className="mobile-menu">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid #333' }}>
                   <div className="text-gold font-cairo" style={{ fontSize: '0.9rem', flex: 1 }}>{user.name}</div>
                   <button onClick={logout} style={{ color: '#ff4444' }}><LogOut size={18}/></button>
                </div>
                <input autoFocus type="text" placeholder="ابحث عن مادة..." className="hacker-input" onChange={(e) => { setSearch(e.target.value); if(e.target.value) setView('home'); }} />
                <button onClick={() => { setView('roadmaps'); setMenuOpen(false); }} className="btn-gold" style={{ background: '#333', color:'#fff', border:'1px solid #FFD54F' }}>🗺️ خارطة الطريق</button>
              </div>
            )}
          </nav>

          <main className="app-container">
            {view !== 'home' && view !== 'roadmaps' && (
              <div className="flex items-center gap-2 font-code" style={{ marginBottom: '20px', color: '#888', fontSize: '14px' }}>
                <span onClick={() => setView('home')} className="pointer hover:text-gold transition">HOME</span> <ChevronRight size={14}/>
                {activeSem && <span onClick={() => setView('subjects')} className={`pointer hover:text-gold ${view === 'subjects' ? 'text-gold' : ''}`}>{activeSem.title.split(' ')[0]}</span>}
                {activeSub && view === 'content' && <><ChevronRight size={14}/><span className="text-gold">{activeSub.code}</span></>}
              </div>
            )}

            {/* VIEWS */}
            {view === 'home' && (
              <div className="grid-system animate-entry">
                {filtered.map(sem => (
                  <div key={sem.id} onClick={() => { setActiveSem(sem); setView('subjects'); }} className="dark-panel clickable pointer" style={{ padding: '20px', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.1 }}><Layers size={60} /></div>
                    <div>
                      <span className="badge">{sem.year}</span>
                      <h2 className="font-cairo text-white" style={{ fontSize: '20px', marginTop: '10px' }}>{sem.title}</h2>
                    </div>
                    <div className="flex items-center gap-2" style={{ fontSize: '12px', color: '#888', marginTop: 'auto' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFD54F' }}></div> {sem.subjects.length} MODULES</div>
                  </div>
                ))}
              </div>
            )}

            {view === 'subjects' && activeSem && (
              <div className="grid-system animate-entry">
                {activeSem.subjects.map((sub, i) => (
                  <div key={i} onClick={() => { setActiveSub(sub); setView('content'); }} className="dark-panel clickable pointer" style={{ padding: '20px' }}>
                    <div className="flex justify-between" style={{ marginBottom: '10px' }}><Code size={20} color="#666"/> <span className="font-code text-gray-500" style={{ fontSize: '12px' }}>{sub.code}</span></div>
                    <h3 className="font-cairo text-white" style={{ fontSize: '18px', fontWeight: 'bold' }}>{sub.name}</h3>
                  </div>
                ))}
              </div>
            )}

            {view === 'content' && activeSub && (
              <div className="animate-entry">
                <div className="dark-panel" style={{ padding: '24px', marginBottom: '24px', minHeight: 'auto' }}>
                  <div className="flex justify-between items-start">
                    <div><span className="font-code text-gold" style={{ fontSize: '14px' }}>{activeSub.code}</span><h1 className="font-cairo text-white" style={{ fontSize: '24px', fontWeight: 'bold' }}>{activeSub.name}</h1></div>
                    <Cpu size={40} style={{ opacity: 0.2, color: '#FFD54F' }} />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="dark-panel" style={{ minHeight: 'auto' }}>
                    <h3 className="font-cairo text-white flex items-center gap-2" style={{ marginBottom: '16px', fontWeight: 'bold', padding: '16px', borderBottom: '1px solid #333' }}><FileText className="text-gold"/> المحاضرات</h3>
                    {activeSub.lectures.length > 0 ? (
                      <div className="grid-system" style={{ padding: '16px' }}>
                        {activeSub.lectures.map((lec, i) => (
                          <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                            <div style={{ marginBottom: '10px' }}><strong className="text-white block">{lec.title}</strong><span style={{ fontSize: '12px', color: '#888' }}>{lec.note}</span></div>
                            <a href={lec.link} target="_blank" rel="noopener noreferrer" className="btn-gold btn-outline">{lec.type === 'pptx' ? 'تحميل عرض (PPTX)' : 'تحميل PDF'}</a>
                          </div>
                        ))}
                      </div>
                    ) : <p className="text-center text-gray-500 font-code p-4">NO DATA</p>}
                  </div>

                  <div className="dark-panel" style={{ minHeight: 'auto', borderLeft: '4px solid #ff4444' }}>
                     <h3 className="font-cairo text-white flex items-center gap-2" style={{ marginBottom: '16px', fontWeight: 'bold', padding: '16px', borderBottom: '1px solid #333' }}><Video style={{color:'#ff4444'}}/> الفيديوهات</h3>
                     {activeSub.videos.length > 0 ? (
                        <div className="grid-system" style={{ padding: '16px' }}>
                          {activeSub.videos.map((vid, i) => (
                            <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                              <div style={{ marginBottom: '10px' }}><strong className="text-white block">{vid.title}</strong><span style={{ fontSize: '12px', color: '#888' }}>{vid.duration}</span></div>
                              <a href={vid.link} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', borderColor: '#ff4444' }}>مشاهدة</a>
                            </div>
                          ))}
                        </div>
                     ) : <p className="text-center text-gray-500 font-code p-4">NO VIDEOS</p>}
                  </div>
                  
                  <div className="dark-panel" style={{ minHeight: 'auto', borderLeft: '4px solid #448AFF' }}>
                     <h3 className="font-cairo text-white flex items-center gap-2" style={{ marginBottom: '16px', fontWeight: 'bold', padding: '16px', borderBottom: '1px solid #333' }}><Terminal style={{color:'#448AFF'}}/> المعمل</h3>
                     {activeSub.labs.length > 0 ? (
                        <div style={{ padding: '16px' }}>
                          {activeSub.labs.map((lab, i) => (
                             <div key={i} className="mb-8"><h4 className="font-cairo text-white mb-2">{lab.title}</h4><CodeViewer code={lab.code} title="source.cpp" /></div>
                          ))}
                        </div>
                     ) : <p className="text-center text-gray-500 font-code p-4">NO LABS</p>}
                  </div>

                  <div className="dark-panel" style={{ minHeight: 'auto', borderLeft: '4px solid #4CAF50' }}>
                     <h3 className="font-cairo text-white flex items-center gap-2" style={{ marginBottom: '16px', fontWeight: 'bold', padding: '16px', borderBottom: '1px solid #333' }}><Save style={{color:'#4CAF50'}}/> التكاليف</h3>
                     {activeSub.assignments.length > 0 ? (
                        <div style={{ padding: '16px' }}>
                          {activeSub.assignments.map((assign, i) => (
                             <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                                <h4 className="font-cairo text-white mb-2">{assign.title}</h4>
                                <p className="font-cairo text-[#ccc] bg-[#000] p-3 rounded mb-4">{assign.question}</p>
                                {assign.fileLink && <a href={assign.fileLink} target="_blank" className="btn-gold btn-outline mb-4">تحميل الملف المرفق</a>}
                                {assign.solutionCode && <CodeViewer code={assign.solutionCode} title="Solution" />}
                                {assign.solutionText && <SolutionViewer text={assign.solutionText} title="الإجابة" />}
                             </div>
                          ))}
                        </div>
                     ) : <p className="text-center text-gray-500 font-code p-4">NO ASSIGNMENTS</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ROADMAPS VIEW */}
            {view === 'roadmaps' && (
              <div className="animate-entry">
                <h2 className="font-cairo text-white mb-8" style={{ fontSize: '2rem', fontWeight: '900', textAlign: 'center' }}>🗺️ خارطة الطريق</h2>
                <div className="grid-system">
                  {roadmapsData.map((map) => (
                    <div key={map.id} className="dark-panel p-6">
                      <div className="flex justify-between items-start mb-4">
                         <div className="icon-box">{map.icon}</div>
                         <span className="font-code text-gray" style={{ fontSize: '10px' }}>TRACK_0{map.id}</span>
                      </div>
                      <h3 className="font-cairo text-white text-xl font-bold mb-2">{map.title}</h3>
                      <p className="font-cairo text-gray-400 text-sm mb-4">{map.desc}</p>
                      <div className="flex flex-col gap-2">
                        {map.steps.map((step, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-code text-[#888]">
                             <span className="text-gold">{i+1}.</span> {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>

          <footer className="hacker-card" style={{ marginTop: 'auto', borderRadius: '0', borderLeft: '0', borderRight: '0', textAlign: 'center' }}>
            <p className="text-gold font-bold">CS PROMAX</p>
            <p className="font-code text-gray-500 text-xs">SECURE_SYSTEM_V32.0</p>
          </footer>
        </>
      )}
    </div>
  );
}