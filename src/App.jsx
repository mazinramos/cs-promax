import React, { useState, useEffect, useRef } from 'react';
import { Layers, Book, Lock, User, Mail, Code, Terminal, Search, LogOut, Play, ChevronRight, Save, Cpu, Wifi, Shield, Database, Video, FileText, PenTool, Check, Menu, X, Monitor } from 'lucide-react';

/* =================================================================================
   1. CSS STYLES (HACKER THEME & RESPONSIVE LAYOUT)
   ================================================================================= */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Fira+Code:wght@400;500;700&family=Tajawal:wght@400;500;700;800&display=swap');

  :root { 
    --gold: #FFD54F; 
    --green: #0f0;
    --dark: #000000; 
    --panel: rgba(10, 10, 10, 0.95); 
    --border: rgba(255, 213, 79, 0.2);
  }
  
  * { box-sizing: border-box; margin: 0; padding: 0; outline: none; -webkit-tap-highlight-color: transparent; }
  
  body { 
    font-family: 'Tajawal', sans-serif; 
    background-color: #000; 
    color: #e0e0e0; 
    min-height: 100vh; 
    overflow-x: hidden; 
  }

  /* Utils */
  .font-code { font-family: 'Fira Code', monospace; }
  .font-cairo { font-family: 'Cairo', sans-serif; }
  .text-gold { color: var(--gold); }
  .text-green { color: var(--green); }
  .text-white { color: #fff; }
  
  /* Container & Grid */
  .app-container { max-width: 1280px; margin: 0 auto; padding: 20px 16px; position: relative; z-index: 2; }
  
  .grid-system { display: grid; gap: 16px; grid-template-columns: 1fr; }
  @media (min-width: 600px) { .grid-system { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
  @media (min-width: 1024px) { .grid-system { grid-template-columns: repeat(3, 1fr); gap: 24px; } }
  @media (min-width: 1280px) { .grid-system { grid-template-columns: repeat(4, 1fr); } }

  /* Hacker Panels */
  .dark-panel {
    background: var(--panel); 
    border: 1px solid var(--border);
    border-radius: 8px; 
    box-shadow: 0 0 10px rgba(0,0,0,0.8);
    overflow: hidden; 
    transition: 0.2s;
    position: relative;
  }
  /* Scanline effect overlay */
  .dark-panel::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
    z-index: 2;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
  }
  
  .clickable:active { transform: scale(0.98); }
  .clickable:hover { border-color: var(--gold); box-shadow: 0 0 15px rgba(255, 213, 79, 0.15); }

  /* Inputs */
  .hacker-input {
    background: #050505; border: 1px solid #333; color: var(--gold);
    font-family: 'Fira Code', monospace; width: 100%;
    padding: 12px 40px 12px 16px; border-radius: 4px; transition: 0.3s;
    font-size: 14px;
  }
  .hacker-input:focus { border-color: var(--gold); box-shadow: 0 0 10px rgba(255, 213, 79, 0.3); }
  .hacker-input::placeholder { color: #444; font-family: 'Cairo'; }

  /* Buttons */
  .btn-gold {
    background: rgba(255, 213, 79, 0.1); 
    color: var(--gold); border: 1px solid var(--gold);
    padding: 8px 16px; border-radius: 4px; cursor: pointer;
    text-align: center; display: inline-block; width: 100%; text-decoration: none;
    font-family: 'Fira Code', monospace; font-size: 12px; font-weight: bold;
    transition: all 0.2s;
  }
  .btn-gold:hover { background: var(--gold); color: #000; box-shadow: 0 0 15px var(--gold); }
  
  .btn-red { border-color: #ff4444; color: #ff4444; background: rgba(255, 68, 68, 0.1); }
  .btn-red:hover { background: #ff4444; color: #fff; box-shadow: 0 0 15px #ff4444; }

  /* Navbar */
  .navbar {
    position: sticky; top: 0; z-index: 50; background: rgba(0,0,0,0.95);
    border-bottom: 1px solid #333; padding: 12px 0;
  }
  
  /* Animations */
  @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .animate-entry { animation: slideUp 0.4s forwards; }
`;

/* =================================================================================
   2. INTERACTIVE MATRIX (BACKGROUND)
   ================================================================================= */
const InteractiveMatrix = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(1);
    const chars = "01CS_PROMAX<>ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // Trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const x = i * 20; const y = drops[i] * 20;
        
        // Interaction Logic
        const dx = mousePos.current.x - x;
        const dy = mousePos.current.y - y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        let color = '#1a1a1a';
        if (Math.random() > 0.98) color = '#FFD54F'; 
        if (dist < 100) { color = '#0f0'; ctx.shadowBlur = 10; ctx.shadowColor = '#0f0'; } 
        else { ctx.shadowBlur = 0; }

        ctx.fillStyle = color;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);
        if (y > canvas.height && Math.random() > 0.98) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 40);
    const move = (e) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    const touch = (e) => { if(e.touches[0]) mousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', touch);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', move); window.removeEventListener('touchmove', touch); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
};

/* =================================================================================
   3. DATA (FULL 8 SEMESTERS)
   ================================================================================= */
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
        lectures: [{ title: "Lec 1: Concepts", type: "pdf", link: "#", note: "Intro" }],
        videos: [{ title: "OOP Intro", duration: "45:00", link: "#" }],
        labs: [{title: "Lab 1", code: "#include <iostream>...", description: "C++ Basics"}], 
        assignments: [{ title: "OOP Task 1", question: "Create Student class", solutionCode: `class Student { int id; }` }] 
      },
      { name: "Data Structures", code: "CS204", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Database I", code: "IS204", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Sys Analysis II", code: "IS202", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "File Management", code: "CS205", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "HCI", code: "IS203", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Operation Research", code: "MATH203", lectures: [], videos: [], labs: [], assignments: [] }
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
      <div className="bg-[#111] px-3 py-2 flex justify-between items-center border-b border-[#333]">
        <div className="flex items-center gap-2"><Terminal size={14} className="text-gold"/><span className="font-code text-[#888] text-xs font-bold">{title}</span></div>
        <button onClick={handleCopy} className="text-gold font-code" style={{ fontSize:'10px', background:'none', border:'none', cursor:'pointer' }}>{copied ? "COPIED" : "COPY"}</button>
      </div>
      <pre className="p-4 text-xs font-code overflow-x-auto text-[#0f0] bg-[#000]">{code}</pre>
    </div>
  );
};

const SolutionViewer = ({ text, title }) => (
  <div className="dark-panel bg-[#0a0a0a] shadow-lg my-4 p-4 relative overflow-hidden group w-full text-right">
    <h5 className="text-gold text-xs font-bold mb-2 font-cairo flex items-center gap-2"><Check size={14}/> {title}</h5>
    <p className="font-cairo text-[#ccc] leading-relaxed whitespace-pre-line">{text}</p>
  </div>
);

const LoginScreen = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', secret: '' });
  const [error, setError] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); if (formData.secret !== 'NRU@Cs@21') { setError('⛔ ACCESS DENIED'); return; } onLogin(formData); };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', zIndex: 20, position: 'relative' }}>
      <div className="dark-panel animate-entry" style={{ padding: '30px', width: '100%', maxWidth: '400px', borderTop: '4px solid #FFD54F' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Shield size={40} className="text-gold" style={{ margin: '0 auto' }} />
          <h1 className="font-cairo text-white" style={{ fontSize: '24px', fontWeight: 'bold' }}>CS PROMAX</h1>
          <p className="font-code text-gold" style={{ fontSize: '10px', letterSpacing: '2px' }}>SECURE ACCESS</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '15px' }}>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: '#555' }} />
            <input required placeholder="الاسم" className="hacker-input" onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: '#555' }} />
            <input required type="email" placeholder="الإيميل" className="hacker-input" onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: '#555' }} />
            <input required type="password" placeholder="الكود السري" className="hacker-input" style={{ letterSpacing: '3px' }} onChange={e => setFormData({...formData, secret: e.target.value})} />
          </div>
          {error && <div className="font-code text-center" style={{ color: '#ff4444', fontSize: '12px' }}>{error}</div>}
          <button className="btn-gold">تسجيل الدخول</button>
        </form>
      </div>
    </div>
  );
};

/* =================================================================================
   5. MAIN APP
   ================================================================================= */
export default function CsProMaxV29() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [activeSem, setActiveSem] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => { const u = localStorage.getItem('cs_promax_v29'); if(u) setUser(JSON.parse(u)); }, []);
  const login = (u) => { setUser(u); localStorage.setItem('cs_promax_v29', JSON.stringify(u)); };
  const logout = () => { localStorage.removeItem('cs_promax_v29'); setUser(null); setView('home'); };

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
            <div className="app-container flex justify-between items-center">
              <div className="flex items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => setView('home')}>
                <div style={{ background: '#000', padding: '6px', borderRadius: '6px', border: '1px solid #FFD54F' }}><Terminal size={20} className="text-gold"/></div>
                <div><h1 className="font-cairo text-white" style={{ fontSize: '18px', fontWeight: 'bold' }}>CS PROMAX</h1><span className="font-code" style={{ fontSize: '10px', color: '#888' }}>BATCH 21</span></div>
              </div>
              <div className="hidden md-block relative" style={{ width: '350px' }}>
                   <input type="text" placeholder="بحث..." className="hacker-input" style={{ padding: '8px 35px 8px 12px', fontSize: '0.9rem' }} onChange={e => { setSearch(e.target.value); if(e.target.value) setView('home'); }} />
                   <Search className="absolute" style={{ right: '10px', top: '10px', color: '#666', pointerEvents: 'none' }} size={16}/>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button onClick={() => setShowSearch(!showSearch)} className="md-hidden text-gray-500"><Search size={20}/></button>
                <div style={{ textAlign: 'right', display: window.innerWidth < 600 ? 'none' : 'block' }}>
                   <div className="text-gold font-cairo" style={{ fontSize: '0.8rem' }}>{user.name}</div>
                   <div style={{ fontSize: '0.6rem', color: '#666' }} className="font-code">{user.email}</div>
                </div>
                <button onClick={logout} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><LogOut size={20}/></button>
              </div>
            </div>
            {showSearch && (
                <div className="app-container md-hidden animate-entry" style={{ marginTop: '0', paddingTop: '0' }}>
                  <input autoFocus type="text" placeholder="ابحث عن مادة..." className="hacker-input" onChange={(e) => { setSearchTerm(e.target.value); if(e.target.value) setView('home'); }} />
                </div>
            )}
          </nav>

          <main className="app-container">
            {view !== 'home' && (
              <div className="flex items-center gap-2 font-code" style={{ marginBottom: '20px', color: '#888', fontSize: '14px' }}>
                <span onClick={() => setView('home')} style={{ cursor: 'pointer', color: '#FFD54F' }}>HOME</span> <ChevronRight size={14}/>
                {activeSem && <span onClick={() => setView('subjects')} style={{ cursor: 'pointer', color: view === 'subjects' ? '#FFD54F' : 'inherit' }}>{activeSem.title}</span>}
                {activeSub && view === 'content' && <><ChevronRight size={14}/><span className="text-gold">{activeSub.code}</span></>}
              </div>
            )}

            {/* VIEWS */}
            {view === 'home' && (
              <div className="grid-system animate-entry">
                {filtered.map(sem => (
                  <div key={sem.id} onClick={() => { setActiveSem(sem); setView('subjects'); }} className="dark-panel clickable" style={{ padding: '20px', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.1 }}><Layers size={60} /></div>
                    <div>
                      <span className="font-code text-gold" style={{ border: '1px solid #FFD54F', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>{sem.year}</span>
                      <h2 className="font-cairo text-white" style={{ fontSize: '20px', marginTop: '10px' }}>{sem.title}</h2>
                    </div>
                    <div className="flex items-center gap-2" style={{ fontSize: '12px', color: '#888' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFD54F' }}></div> {sem.subjects.length} MODULES</div>
                  </div>
                ))}
              </div>
            )}

            {view === 'subjects' && activeSem && (
              <div className="grid-system animate-entry">
                {activeSem.subjects.map((sub, i) => (
                  <div key={i} onClick={() => { setActiveSub(sub); setView('content'); }} className="dark-panel clickable" style={{ padding: '20px', cursor: 'pointer' }}>
                    <div className="flex justify-between" style={{ marginBottom: '10px' }}><Code size={20} color="#666"/> <span className="font-code" style={{ fontSize: '12px', color: '#888' }}>{sub.code}</span></div>
                    <h3 className="font-cairo text-white" style={{ fontSize: '18px', fontWeight: 'bold' }}>{sub.name}</h3>
                  </div>
                ))}
              </div>
            )}

            {view === 'content' && activeSub && (
              <div className="animate-entry">
                <div className="dark-panel" style={{ padding: '24px', marginBottom: '24px' }}>
                  <div className="flex justify-between items-start">
                    <div><span className="font-code text-gold" style={{ fontSize: '14px' }}>{activeSub.code}</span><h1 className="font-cairo text-white" style={{ fontSize: '24px', fontWeight: 'bold' }}>{activeSub.name}</h1></div>
                    <Cpu size={40} style={{ opacity: 0.2, color: '#FFD54F' }} />
                  </div>
                </div>

                <div className="flex flex-col" style={{ gap: '24px' }}>
                  {/* Lectures */}
                  <div className="dark-panel" style={{ padding: '20px' }}>
                    <h3 className="font-cairo text-white flex items-center gap-2" style={{ marginBottom: '16px', fontWeight: 'bold' }}><FileText className="text-gold"/> المحاضرات</h3>
                    {activeSub.lectures.length > 0 ? (
                      <div className="grid-system">
                        {activeSub.lectures.map((lec, i) => (
                          <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                            <div style={{ marginBottom: '10px' }}><strong style={{ color: '#fff', display: 'block' }}>{lec.title}</strong><span style={{ fontSize: '12px', color: '#888' }}>{lec.note}</span></div>
                            <a href={lec.link} target="_blank" className="btn-gold">تحميل PDF</a>
                          </div>
                        ))}
                      </div>
                    ) : <p style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>NO DATA</p>}
                  </div>

                  {/* Videos Section */}
                  <div className="dark-panel" style={{ padding: '20px', borderLeft: '4px solid #ff4444' }}>
                     <h3 className="font-cairo text-white flex items-center gap-2" style={{ marginBottom: '16px', fontWeight: 'bold' }}><Video style={{color:'#ff4444'}}/> الفيديوهات</h3>
                     {activeSub.videos.length > 0 ? (
                        <div className="grid-system">
                          {activeSub.videos.map((vid, i) => (
                            <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                              <div style={{ marginBottom: '10px' }}><strong style={{ color: '#fff', display: 'block' }}>{vid.title}</strong><span style={{ fontSize: '12px', color: '#888' }}>{vid.duration}</span></div>
                              <a href={vid.link} target="_blank" className="btn-gold" style={{background: 'rgba(255,68,68,0.2)', border:'1px solid #ff4444', color:'#ff4444'}}>مشاهدة</a>
                            </div>
                          ))}
                        </div>
                     ) : <p style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>NO VIDEOS</p>}
                  </div>

                  {/* Labs Section */}
                  <div className="dark-panel" style={{ padding: '20px', borderLeft: '4px solid #448AFF' }}>
                     <h3 className="font-cairo text-white flex items-center gap-2" style={{ marginBottom: '16px', fontWeight: 'bold' }}><Terminal style={{color:'#448AFF'}}/> المعمل</h3>
                     {activeSub.labs.length > 0 ? (
                        <div>
                          {activeSub.labs.map((lab, i) => (
                             <div key={i} className="mb-8"><h4 className="font-cairo text-white mb-2">{lab.title}</h4><CodeViewer code={lab.code} title="source.cpp" /></div>
                          ))}
                        </div>
                     ) : <p style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>NO LABS</p>}
                  </div>

                  {/* Assignments Section */}
                  <div className="dark-panel" style={{ padding: '20px', borderLeft: '4px solid #4CAF50' }}>
                     <h3 className="font-cairo text-white flex items-center gap-2" style={{ marginBottom: '16px', fontWeight: 'bold' }}><Save style={{color:'#4CAF50'}}/> التكاليف</h3>
                     {activeSub.assignments.length > 0 ? (
                        <div>
                          {activeSub.assignments.map((assign, i) => (
                             <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                                <h4 className="font-cairo text-white mb-2">{assign.title}</h4>
                                <p className="font-cairo text-[#ccc] bg-[#000] p-3 rounded mb-4">{assign.question}</p>
                                {assign.solutionCode && <CodeViewer code={assign.solutionCode} title="Solution" />}
                                {assign.solutionText && <SolutionViewer text={assign.solutionText} title="الإجابة" />}
                             </div>
                          ))}
                        </div>
                     ) : <p style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>NO ASSIGNMENTS</p>}
                  </div>

                </div>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}


