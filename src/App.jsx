import React, { useState, useEffect, useRef } from 'react';
import { Layers, Book, Lock, User, Mail, Code, Terminal, Search, LogOut, Play, ChevronRight, Save, Cpu, Wifi, Shield, Database, Video, FileText, PenTool, Check, Menu, X } from 'lucide-react';

/* =================================================================================
   1. CSS STYLES (HARDCODED & RESPONSIVE)
   ================================================================================= */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Fira+Code:wght@400;500;700&family=Tajawal:wght@400;500;700;800&display=swap');

  :root { --gold: #FFD54F; --dark: #050505; --panel: rgba(18, 18, 18, 0.95); }
  * { box-sizing: border-box; margin: 0; padding: 0; outline: none; -webkit-tap-highlight-color: transparent; }
  
  body { font-family: 'Tajawal', sans-serif; background: #000; color: #e0e0e0; min-height: 100vh; overflow-x: hidden; }
  
  /* Utils */
  .font-code { font-family: 'Fira Code', monospace; }
  .font-cairo { font-family: 'Cairo', sans-serif; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .gap-2 { gap: 8px; }
  .text-gold { color: var(--gold); }
  .w-full { width: 100%; }
  
  /* Container */
  .app-container { max-width: 1200px; margin: 0 auto; padding: 20px 16px; position: relative; z-index: 2; }
  
  /* Inputs */
  .hacker-input {
    background: #080808; border: 1px solid #333; color: #fff;
    font-family: 'Cairo', sans-serif; font-weight: 600; width: 100%;
    padding: 12px 40px 12px 16px; border-radius: 8px; transition: 0.3s;
    font-size: 16px;
  }
  .hacker-input:focus { border-color: var(--gold); box-shadow: 0 0 10px rgba(255, 213, 79, 0.2); }

  /* Panels & Cards */
  .dark-panel {
    background: var(--panel); border: 1px solid rgba(255, 213, 79, 0.15);
    border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    overflow: hidden; transition: 0.2s;
  }
  .clickable:active { transform: scale(0.98); }
  
  /* Grid */
  .grid-system { display: grid; gap: 16px; grid-template-columns: 1fr; }
  @media (min-width: 600px) { .grid-system { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 900px) { .grid-system { grid-template-columns: repeat(3, 1fr); } }

  /* Buttons */
  .btn-gold {
    background: var(--gold); color: #000; font-weight: bold;
    padding: 10px; border-radius: 6px; border: none; cursor: pointer;
    text-align: center; display: block; width: 100%; text-decoration: none;
  }
  
  /* Navbar */
  .navbar {
    position: sticky; top: 0; z-index: 50; background: rgba(0,0,0,0.9);
    backdrop-filter: blur(10px); border-bottom: 1px solid #333; padding: 12px 0;
  }
  
  /* Animation */
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-entry { animation: slideUp 0.5s forwards; }
`;

/* =================================================================================
   2. INTERACTIVE MATRIX (BACKGROUND)
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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';
      for (let i = 0; i < drops.length; i++) {
        const x = i * 20; const y = drops[i] * 20;
        ctx.fillStyle = Math.random() > 0.98 ? '#FFD54F' : '#1a1a1a';
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);
        if (y > canvas.height && Math.random() > 0.98) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 40);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
};

/* =================================================================================
   3. DATA (FULL CONTENT)
   ================================================================================= */
const initialData = [
  { id: 1, title: "Semester 01", year: "Freshman", subjects: [{ name: "Intro to CS", code: "CS100", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Basic Mathematics", code: "MATH100", lectures: [], videos: [], labs: [], assignments: [] }, { name: "English I", code: "ENG101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Arabic I", code: "ARB101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Physics", code: "PHY101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Religious Culture", code: "REL101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Prog. Fundamentals", code: "CS102", lectures: [], videos: [], labs: [], assignments: [] }] },
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
  { id: 4, title: "Semester 04", year: "Sophomore", subjects: [{ name: "Object Oriented Prog.", code: "CS203", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Data Structures", code: "CS204", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Sys Analysis II", code: "IS202", lectures: [], videos: [], labs: [], assignments: [] }, { name: "File Management", code: "CS205", lectures: [], videos: [], labs: [], assignments: [] }, { name: "HCI", code: "IS203", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Operation Research", code: "MATH203", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Database I", code: "IS204", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 5, title: "Semester 05", year: "Junior", subjects: [{ name: "Internet Tech I", code: "IT301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Computer Networks", code: "CN301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Database II", code: "IS301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Algorithms", code: "CS301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Visual Prog.", code: "CS302", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Microprocessors", code: "CS303", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Software Eng I", code: "SE301", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 6, title: "Semester 06", year: "Junior", subjects: [{ name: "Internet Tech II", code: "IT302", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Computer Arch.", code: "CS304", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Operating Systems", code: "CS305", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Research Meth.", code: "GEN301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Software Eng II", code: "SE302", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Computer Graphics", code: "CS306", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Distributed DB", code: "IS302", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 7, title: "Semester 07", year: "Senior", subjects: [{ name: "Prog. Concepts", code: "CS401", lectures: [], videos: [], labs: [], assignments: [] }, { name: "AI", code: "CS402", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Simulation", code: "CS403", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Elective Course I", code: "EL401", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Elective Course II", code: "EL402", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Project I", code: "PROJ1", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 8, title: "Semester 08", year: "Senior", subjects: [{ name: "Ethical Issues", code: "GEN401", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Networks Security", code: "CN401", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Wireless Comp.", code: "CN402", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Prog. Concepts II", code: "CS404", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Project II", code: "PROJ2", lectures: [], videos: [], labs: [], assignments: [] }] }
];

/* =================================================================================
   4. COMPONENTS
   ================================================================================= */
const LoginScreen = ({ onLogin }) => {
  const [data, setData] = useState({ name: '', email: '', secret: '' });
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (data.secret !== 'NRU@Cs@21') return setError('رمز الأمان غير صحيح');
    onLogin(data);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', zIndex: 20, position: 'relative' }}>
      <div className="dark-panel animate-entry" style={{ padding: '30px', width: '100%', maxWidth: '400px', borderTop: '4px solid #FFD54F' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Shield size={40} className="text-gold" style={{ margin: '0 auto' }} />
          <h1 className="font-cairo" style={{ fontSize: '24px', color: '#fff', fontWeight: 'bold' }}>CS PROMAX</h1>
          <p className="font-code text-gold" style={{ fontSize: '12px', letterSpacing: '2px' }}>SECURE ACCESS</p>
        </div>
        <form onSubmit={submit} className="flex flex-col" style={{ gap: '15px' }}>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: '#555' }} />
            <input required placeholder="الاسم" className="hacker-input" onChange={e => setData({...data, name: e.target.value})} />
          </div>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: '#555' }} />
            <input required type="email" placeholder="الإيميل" className="hacker-input" onChange={e => setData({...data, email: e.target.value})} />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: '#555' }} />
            <input required type="password" placeholder="الكود السري" className="hacker-input" style={{ letterSpacing: '3px' }} onChange={e => setData({...data, secret: e.target.value})} />
          </div>
          {error && <div style={{ color: '#ff4444', fontSize: '12px', textAlign: 'center' }}>{error}</div>}
          <button className="btn-gold">تسجيل الدخول</button>
        </form>
      </div>
    </div>
  );
};

/* =================================================================================
   5. MAIN APP
   ================================================================================= */
export default function CsProMaxV28() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [activeSem, setActiveSem] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { const u = localStorage.getItem('cs_promax_v28'); if(u) setUser(JSON.parse(u)); }, []);
  const login = (u) => { setUser(u); localStorage.setItem('cs_promax_v28', JSON.stringify(u)); };
  const logout = () => { localStorage.removeItem('cs_promax_v28'); setUser(null); setView('home'); };

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
                <div><h1 className="font-cairo" style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>CS PROMAX</h1><span className="font-code" style={{ fontSize: '10px', color: '#888' }}>BATCH 21</span></div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input placeholder="بحث..." className="hacker-input" style={{ padding: '8px', width: '150px' }} onChange={e => { setSearch(e.target.value); if(e.target.value) setView('home'); }} />
                <button onClick={logout} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><LogOut size={20}/></button>
              </div>
            </div>
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
                      <h2 className="font-cairo" style={{ fontSize: '20px', color: '#fff', marginTop: '10px' }}>{sem.title}</h2>
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
                    <h3 className="font-cairo" style={{ fontSize: '18px', color: '#fff', fontWeight: 'bold' }}>{sub.name}</h3>
                  </div>
                ))}
              </div>
            )}

            {view === 'content' && activeSub && (
              <div className="animate-entry">
                <div className="dark-panel" style={{ padding: '24px', marginBottom: '24px' }}>
                  <div className="flex justify-between items-start">
                    <div><span className="font-code text-gold" style={{ fontSize: '14px' }}>{activeSub.code}</span><h1 className="font-cairo" style={{ fontSize: '24px', color: '#fff', fontWeight: 'bold' }}>{activeSub.name}</h1></div>
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
                </div>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}
