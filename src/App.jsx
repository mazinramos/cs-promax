import React, { useState, useEffect, useRef } from 'react';
import { Layers, Book, Lock, User, Mail, Code, Terminal, Search, LogOut, Play, ChevronRight, Save, Cpu, Wifi, Shield, Database, Video, FileText, PenTool, Check, Menu, X, Map, Globe, Brain, Smartphone, Calculator, FileQuestion } from 'lucide-react';

/* =================================================================================
   1. CSS STYLES (CLEAN & ROBUST)
   ================================================================================= */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Fira+Code:wght@400;500;700&family=Tajawal:wght@400;500;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

  body { 
    font-family: 'Tajawal', sans-serif; 
    background-color: #000000;
    color: #e0e0e0;
    margin: 0; 
    padding: 0;
    overflow-x: hidden;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }

  /* Font Classes */
  .font-cairo { font-family: 'Cairo', sans-serif; }
  .font-code { font-family: 'Fira Code', monospace; }
  .text-gold { color: #FFD54F; }
  
  /* --- LAYOUT --- */
  .app-container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 20px 16px; position: relative; z-index: 2; }
  @media (min-width: 768px) { .app-container { padding: 20px 24px; } }

  /* --- PANELS --- */
  .dark-panel {
    background: rgba(12, 12, 12, 0.95);
    border: 1px solid rgba(255, 213, 79, 0.15);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.6);
    transition: all 0.3s ease;
    overflow: hidden;
    position: relative;
  }
  .dark-panel:active { transform: scale(0.98); }
  @media(hover: hover) {
    .dark-panel:hover { border-color: rgba(255, 213, 79, 0.5); transform: translateY(-4px); box-shadow: 0 8px 30px rgba(255, 213, 79, 0.15); }
  }

  /* --- GRID --- */
  .grid-system { display: grid; gap: 16px; grid-template-columns: 1fr; }
  @media (min-width: 640px) { .grid-system { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
  @media (min-width: 1024px) { .grid-system { grid-template-columns: repeat(3, 1fr); gap: 24px; } }
  @media (min-width: 1280px) { .grid-system { grid-template-columns: repeat(4, 1fr); } }

  /* --- INPUTS --- */
  .hacker-input {
    background-color: #080808; border: 1px solid #333; color: #fff;
    font-family: 'Cairo', 'Fira Code', sans-serif; font-weight: 600; width: 100%;
    padding: 12px 40px 12px 16px; border-radius: 8px; font-size: 16px; transition: 0.3s;
  }
  .hacker-input:focus { border-color: #FFD54F; outline: none; box-shadow: 0 0 10px rgba(255, 213, 79, 0.2); }

  /* --- NAVBAR --- */
  .navbar-wrapper {
    position: sticky; top: 0; z-index: 100; background: rgba(0,0,0,0.95);
    backdrop-filter: blur(10px); border-bottom: 1px solid #3E2723; padding: 12px 0;
  }
  .nav-content { display: flex; justify-content: space-between; align-items: center; }

  /* --- BUTTONS --- */
  .btn-gold {
    background: #FFD54F; color: #000; font-weight: bold; padding: 10px; border-radius: 6px;
    border: none; cursor: pointer; text-align: center; width: 100%; display: block; text-decoration: none;
    font-family: 'Cairo', sans-serif; transition: 0.2s;
  }
  .btn-gold:hover { background: #FFCA28; }
  
  .btn-outline { background: transparent; border: 1px solid #FFD54F; color: #FFD54F; }
  .btn-outline:hover { background: rgba(255, 213, 79, 0.1); }
  
  .badge { background: rgba(255, 213, 79, 0.1); border: 1px solid #FFD54F; color: #FFD54F; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-family: 'Fira Code', monospace; display: inline-block; }

  /* Animations */
  @keyframes slideUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
  .animate-entry { animation: slideUp 0.4s ease-out forwards; }
`;

/* =================================================================================
   2. INTERACTIVE MATRIX BACKGROUND
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
    const chars = "01CS_PROMAX<>"; 
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';
      for (let i = 0; i < drops.length; i++) {
        const x = i * 20; const y = drops[i] * 20;
        const dx = mousePos.current.x - x; const dy = mousePos.current.y - y; const dist = Math.sqrt(dx*dx + dy*dy);
        let color = '#1a1a1a'; if (Math.random() > 0.98) color = '#FFD54F'; 
        if (dist < 120) { color = '#fff'; ctx.shadowBlur = 10; ctx.shadowColor = '#FFD54F'; } else { ctx.shadowBlur = 0; }
        ctx.fillStyle = color; ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0; drops[i]++;
      }
    };
    const interval = setInterval(draw, 45);
    const move = (e) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    const touch = (e) => { if(e.touches[0]) mousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    window.addEventListener('mousemove', move); window.addEventListener('touchmove', touch);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', move); window.removeEventListener('touchmove', touch); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
};

/* =================================================================================
   3. DATA (WITH ALL SEMESTERS & MATERIALS)
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
        lectures: [
            { title: "Lec 1: Structures", type: "pdf", link: "https://drive.google.com/file/d/1OEC1Pik8xrw7RXt-RPm5TMK93BiuYaxC/view?usp=drivesdk", note: "الهياكل" },
            { title: "Lec 2: OOP Concepts", type: "pdf", link: "https://drive.google.com/file/d/1CcLL6TYz0znJnhN_z2X_pUg-sOrmcOHK/view?usp=drivesdk", note: "مفاهيم أساسية" },
            { title: "Lec 3.0: Constructors", type: "pdf", link: "https://drive.google.com/file/d/1y1i4sjKFSS_Rc0DTFSXSDr8srk9k75Ig/view?usp=drivesdk", note: "دوال البناء" },
            { title: "Lec 3.1: Destructors", type: "pdf", link: "https://drive.google.com/file/d/1eef9fPej3rqChJFJDetmUaZUEMnOMPZO/view?usp=drivesdk", note: "دوال الهدم" },
            { title: "Lec 3.2: Overloading", type: "pdf", link: "https://drive.google.com/file/d/1TG8gahEohfg6ITZ9UZ0K244UoZu0sodn/view?usp=drivesdk", note: "التحميل الزائد" },
            { title: "Lec 4: Pointers", type: "pdf", link: "https://drive.google.com/file/d/1rwB7PL5M0qGT85W4cqCNpQemF0myQs4b/view?usp=drivesdk", note: "المؤشرات" }
        ], 
        videos: [
            { title: "Lec 1 Video", duration: "شرح", link: "https://drive.google.com/file/d/10NS3J-fKiD0oBYjrdNmPdlmxNcF5XBfi/view?usp=drivesdk" },
            { title: "Lec 3.1 Video", duration: "شرح", link: "https://drive.google.com/file/d/1wOzWXscJojUONTUNDfP8utbuq-FEB4q4/view?usp=drivesdk" },
            { title: "Lec 4 Video", duration: "شرح", link: "https://drive.google.com/file/d/1_FJROjdlII4eO0sUnxNkA7BhYL6EUqa7/view?usp=drivesdk" }
        ], 
        labs: [], 
        assignments: [] 
      },
      { name: "Data Structures", code: "CS204", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Operation Research", code: "MATH203", lectures: [
          { title: "Lec 1: Intro", type: "pdf", link: "https://drive.google.com/file/d/1l0X6W9vEQXYAC7OOPFZS4Or-vUoSQtXc/view?usp=drivesdk", note: "مقدمة" },
          { title: "Lec 2: Decision Theory", type: "pdf", link: "https://drive.google.com/file/d/11GK2miG2z06Qj3suWEKO5IetBHZmqY-Y/view?usp=drivesdk", note: "اتخاذ القرار" },
          { title: "Lec 3: Certainty", type: "pdf", link: "https://drive.google.com/file/d/1oD53qJiGVwTwvo5rQIAQvrwG5aDMw4ZN/view?usp=drivesdk", note: "التأكد" },
          { title: "Lec 4: Risk", type: "pdf", link: "https://drive.google.com/file/d/1WoNVI9olEPu8TWhTaSm27QedBRBskn8Q/view?usp=drivesdk", note: "المخاطرة" },
          { title: "Lec 5: Uncertainty", type: "pdf", link: "https://drive.google.com/file/d/1122gWEhHISqwDZ2PfS49klJNRARJfV2L/view?usp=drivesdk", note: "عدم التأكد" },
          { title: "Lec 6: Linear Prog", type: "pdf", link: "https://drive.google.com/file/d/1dviTBA-sDyZp9MTvVG7M1-yO4SECQeFR/view?usp=drivesdk", note: "البرمجة الخطية" },
          { title: "Lec 7: Graphical Sol", type: "pdf", link: "https://drive.google.com/file/d/1luIg04jjI1WtxXH0TcnMJU-pJ8FE7qU3/view?usp=drivesdk", note: "الحل البياني" },
          { title: "Lec 8: Simplex", type: "pdf", link: "https://drive.google.com/file/d/155nAg3-jKQAjrfAKrtuPFxboyBYEDuYE/view?usp=drivesdk", note: "الطريقة البسيطة" }
      ], videos: [], labs: [], assignments: [] },
      { name: "Database I", code: "IS204", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Sys Analysis II", code: "IS202", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "File Management", code: "CS205", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "HCI", code: "IS203", lectures: [], videos: [], labs: [], assignments: [] }
  ]},
  { id: 5, title: "Semester 05", year: "Junior", subjects: [] },
  { id: 6, title: "Semester 06", year: "Junior", subjects: [] },
  { id: 7, title: "Semester 07", year: "Senior", subjects: [] },
  { id: 8, title: "Semester 08", year: "Senior", subjects: [] }
];

/* =================================================================================
   4. COMPONENTS
   ================================================================================= */
const CodeViewer = ({ code, title }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="dark-panel bg-[#050505] shadow-lg my-4 text-left w-full" dir="ltr" style={{minHeight:'auto'}}>
      <div className="bg-[#111] px-3 py-2 flex justify-between items-center border-b border-[#333]">
        <div className="flex items-center gap-2"><Terminal size={14} className="text-gold"/><span className="font-code text-gray-400 text-xs font-bold">{title}</span></div>
        <button onClick={handleCopy} className="badge pointer hover:bg-[#FFD54F] hover:text-black">{copied ? "COPIED" : "COPY"}</button>
      </div>
      <pre className="p-4 text-xs font-code overflow-x-auto text-[#0f0] bg-[#000]">{code}</pre>
    </div>
  );
};

const SolutionViewer = ({ text, title }) => (
  <div className="dark-panel bg-[#0a0a0a] shadow-lg my-4 p-4 relative overflow-hidden group w-full text-right" style={{minHeight:'auto'}}>
    <h5 className="font-cairo text-gold text-xs font-bold mb-2 flex items-center gap-2"><Check size={14}/> {title}</h5>
    <p className="font-cairo text-gray-300 leading-relaxed whitespace-pre-line">{text}</p>
  </div>
);

const GPACalculatorComponent = () => {
  const [courses, setCourses] = useState([]);
  const [hours, setHours] = useState('');
  const [grade, setGrade] = useState('4.0');
  
  const addCourse = () => {
    if(!hours) return;
    setCourses([...courses, { h: parseFloat(hours), g: parseFloat(grade), id: Date.now() }]);
    setHours('');
  };

  const calculate = () => {
    const totalPoints = courses.reduce((acc, curr) => acc + (curr.h * curr.g), 0);
    const totalHours = courses.reduce((acc, curr) => acc + curr.h, 0);
    return totalHours ? (totalPoints / totalHours).toFixed(2) : '0.00';
  };

  return (
    <div className="w-full">
       <div className="flex gap-4 mb-4">
          <input type="number" placeholder="الساعات" value={hours} onChange={e=>setHours(e.target.value)} className="hacker-input" style={{flex:1}} />
          <select value={grade} onChange={e=>setGrade(e.target.value)} className="hacker-input" style={{flex:1}}>
             <option value="4.0">A (4.0)</option><option value="3.5">B+ (3.5)</option><option value="3.0">B (3.0)</option>
             <option value="2.5">C+ (2.5)</option><option value="2.0">C (2.0)</option><option value="1.5">D (1.5)</option><option value="0.0">F (0.0)</option>
          </select>
          <button onClick={addCourse} className="btn-gold" style={{width:'auto'}}>إضافة</button>
       </div>
       {courses.length > 0 && (
         <div className="mb-6 grid-system">
           {courses.map(c => (<div key={c.id} className="dark-panel p-3 flex justify-between text-xs font-code"><span>{c.h} hrs</span><span>{c.g} pts</span></div>))}
         </div>
       )}
       <div className="text-center p-6 bg-black/50 rounded-xl border border-[#FFD54F]">
          <span className="text-gray-500 font-cairo block mb-2">المعدل الفصلي</span>
          <span className="text-5xl font-black text-[#FFD54F] font-code">{calculate()}</span>
       </div>
    </div>
  );
};

const LoginScreen = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', secret: '' });
  const [error, setError] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); if (formData.secret !== 'NRU@Cs@21') { setError('⛔ ACCESS DENIED'); return; } onLogin(formData); };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '80vh', padding: '16px', zIndex: 20, position: 'relative' }}>
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
export default function CsProMaxV35() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [activeSemester, setActiveSemester] = useState(null);
  const [activeSubject, setActiveSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => { const u = localStorage.getItem('cs_promax_v35_user'); if(u) setUser(JSON.parse(u)); }, []);
  const login = (u) => { setUser(u); localStorage.setItem('cs_promax_v35_user', JSON.stringify(u)); };
  const logout = () => { localStorage.removeItem('cs_promax_v35_user'); setUser(null); setView('home'); };

  // Smart Navigation
  const navigate = (newView, semester = null, subject = null) => {
    setView(newView);
    if (semester) setActiveSemester(semester);
    if (subject) setActiveSubject(subject);
    window.history.pushState({ view: newView, sem: semester, sub: subject }, '', '');
  };

  useEffect(() => {
     window.onpopstate = (e) => {
        if(e.state) { setView(e.state.view); setActiveSemester(e.state.sem); setActiveSubject(e.state.sub); }
        else { setView('home'); }
     };
  }, []);

  const filtered = initialData.map(s => ({
    ...s, subjects: s.subjects.filter(sub => sub.name.toLowerCase().includes(search.toLowerCase()) || sub.code.toLowerCase().includes(search.toLowerCase()))
  })).filter(s => s.subjects.length > 0);

  return (
    <div dir="rtl">
      <style>{styles}</style>
      <InteractiveMatrix />
      
      {!user ? <LoginScreen onLogin={login} /> : (
        <>
          <nav className="navbar-wrapper">
            <div className="app-container nav-content">
              {/* Left: Logo */}
              <div className="flex items-center gap-2 pointer" onClick={() => navigate('home')}>
                <div style={{ background: '#000', padding: '6px', borderRadius: '6px', border: '1px solid #FFD54F' }}><Terminal size={20} className="text-gold"/></div>
                <div><h1 className="font-cairo text-white" style={{ fontSize: '18px', fontWeight: 'bold' }}>CS PROMAX</h1><span className="font-code" style={{ fontSize: '10px', color: '#888' }}>BATCH 21</span></div>
              </div>
              
              {/* Middle: Actions */}
              <div className="hidden md-block relative" style={{ width: '350px' }}>
                 <input type="text" placeholder="بحث..." className="hacker-input" style={{ padding: '8px 35px 8px 12px', fontSize: '0.9rem' }} onChange={e => { setSearch(e.target.value); if(e.target.value) navigate('home'); }} />
                 <Search className="absolute" style={{ right: '10px', top: '10px', color: '#666', pointerEvents: 'none' }} size={16}/>
              </div>

              {/* Right: Buttons */}
              <div className="flex items-center gap-3">
                 <button onClick={() => navigate('gpa')} className="btn-gold btn-outline" style={{width:'auto', padding:'6px 12px', fontSize:'12px', display:'flex', gap:'5px'}}><Calculator size={14}/> معدل</button>
                 <button onClick={() => setShowSearch(!showSearch)} className="md-hidden text-gray-500"><Search size={20}/></button>
                 <div style={{ textAlign: 'right', display: window.innerWidth < 600 ? 'none' : 'block' }}><div className="text-gold font-cairo" style={{ fontSize: '0.8rem' }}>{user.name}</div></div>
                 <button onClick={logout} style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', padding: '8px', borderRadius: '50%', color: '#ff4444', cursor: 'pointer' }}><LogOut size={18}/></button>
              </div>
            </div>
            {showSearch && (
              <div className="app-container md-hidden animate-entry" style={{ marginTop: '0', paddingTop: '0' }}>
                <input autoFocus type="text" placeholder="ابحث عن مادة..." className="hacker-input" onChange={(e) => { setSearchTerm(e.target.value); if(e.target.value) navigate('home'); }} />
              </div>
            )}
          </nav>

          <main className="app-container py-8">
            {view !== 'home' && view !== 'gpa' && (
              <div className="flex items-center gap-2 font-code" style={{ marginBottom: '20px', color: '#888', fontSize: '14px' }}>
                <span onClick={() => navigate('home')} className="pointer hover:text-gold transition">HOME</span> <ChevronRight size={14}/>
                {activeSem && <span onClick={() => navigate('subjects', activeSem)} className={`pointer hover:text-gold ${view === 'subjects' ? 'text-gold' : ''}`}>{activeSem.title.split(' ')[0]}</span>}
                {activeSub && view === 'content' && <><ChevronRight size={14}/><span className="text-gold">{activeSub.code}</span></>}
              </div>
            )}

            {/* VIEWS */}
            {view === 'home' && (
              <div className="grid-system animate-entry">
                {filtered.map(sem => (
                  <div key={sem.id} onClick={() => navigate('subjects', sem)} className="dark-panel clickable pointer" style={{ padding: '20px', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
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
                  <div key={i} onClick={() => navigate('content', activeSem, sub)} className="dark-panel clickable pointer" style={{ padding: '20px', cursor: 'pointer' }}>
                    <div className="flex justify-between" style={{ marginBottom: '10px' }}><Code size={20} color="#666"/> <span className="font-code text-gray-500" style={{ fontSize: '12px' }}>{sub.code}</span></div>
                    <h3 className="font-cairo text-white" style={{ fontSize: '18px', fontWeight: 'bold' }}>{sub.name}</h3>
                  </div>
                ))}
              </div>
            )}

            {view === 'gpa' && (
               <div className="animate-entry">
                  <div className="dark-panel p-6 mb-8 text-center"><h2 className="text-3xl font-cairo text-white font-bold mb-2">حاسبة المعدل الفصلي</h2><p className="font-code text-gold">GPA_CALCULATOR</p></div>
                  <div className="dark-panel p-6"><GPACalculatorComponent /></div>
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

                <div className="flex flex-col gap-8">
                  {/* Lectures */}
                  <section>
                    <h3 className="font-cairo text-white flex items-center gap-2 mb-4" style={{ fontWeight: 'bold', borderRight:'4px solid #FFD54F', paddingRight:'10px' }}><FileText className="text-gold"/> المحاضرات</h3>
                    {activeSub.lectures.length > 0 ? (
                      <div className="grid-system">
                        {activeSub.lectures.map((lec, i) => (
                          <div key={i} className="dark-panel clickable relative overflow-hidden group" style={{ padding: '20px', minHeight: '160px' }}>
                            <div className="absolute top-[-10px] right-[-10px] opacity-5 group-hover:opacity-10 transition transform rotate-12"><FileText size={80} className="text-gold"/></div>
                            <div className="relative z-10 flex flex-col h-full justify-between">
                               <div>
                                  <span className="badge mb-2">LEC {i+1}</span>
                                  <h4 className="font-cairo text-white font-bold text-lg leading-tight mb-1">{lec.title}</h4>
                                  <p className="font-code text-gray-500 text-xs">// {lec.note}</p>
                               </div>
                               <a href={lec.link} target="_blank" rel="noopener noreferrer" className="btn-gold btn-outline mt-4">{lec.type === 'pptx' ? 'تحميل عرض (PPTX)' : 'تحميل PDF'}</a>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : <p className="text-center text-gray-500 font-code p-4 border border-[#333] rounded">NO DATA</p>}
                  </section>

                  {/* Videos */}
                  <section>
                    <h3 className="font-cairo text-white flex items-center gap-2 mb-4" style={{ fontWeight: 'bold', borderRight:'4px solid #ff4444', paddingRight:'10px' }}><Video style={{color:'#ff4444'}}/> الفيديوهات</h3>
                    {activeSub.videos.length > 0 ? (
                      <div className="grid-system">
                        {activeSub.videos.map((vid, i) => (
                          <div key={i} className="dark-panel clickable relative overflow-hidden group" style={{ padding: '20px', minHeight: '160px', borderLeft:'4px solid #ff4444' }}>
                            <div className="absolute top-[-10px] right-[-10px] opacity-5 group-hover:opacity-10 transition transform rotate-12"><Play size={80} color="#ff4444"/></div>
                            <div className="relative z-10 flex flex-col h-full justify-between">
                               <div>
                                  <div className="flex justify-between mb-2"><span className="badge" style={{borderColor:'#ff4444', color:'#ff4444'}}>VIDEO</span><span className="text-gray-500 text-xs font-code">{vid.duration}</span></div>
                                  <h4 className="font-cairo text-white font-bold text-lg">{vid.title}</h4>
                               </div>
                               <a href={vid.link} target="_blank" rel="noopener noreferrer" className="btn-gold mt-4" style={{background:'#ff4444', color:'#fff', borderColor:'#ff4444'}}>مشاهدة الشرح</a>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : <p className="text-center text-gray-500 font-code p-4 border border-[#333] rounded">NO VIDEOS</p>}
                  </section>

                  {/* Labs */}
                  <section>
                     <h3 className="font-cairo text-white flex items-center gap-2 mb-4" style={{ fontWeight: 'bold', borderRight:'4px solid #448AFF', paddingRight:'10px' }}><Terminal style={{color:'#448AFF'}}/> المعمل</h3>
                     {activeSub.labs.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {activeSub.labs.map((lab, i) => (
                             <div key={i} className="dark-panel p-5" style={{ borderLeft: '4px solid #448AFF' }}>
                                <h4 className="font-cairo text-white text-lg font-bold mb-3 flex items-center gap-2"><Code size={16} className="text-blue-400"/> {lab.title}</h4>
                                {lab.type === 'file' ? (
                                    <div className="bg-black/50 p-4 rounded-lg border border-blue-900/50 flex justify-between items-center">
                                        <span className="text-gray-400 text-sm font-code">{lab.description}</span>
                                        <a href={lab.link} target="_blank" rel="noopener noreferrer" className="badge pointer" style={{ borderColor: '#448AFF', color: '#448AFF', textDecoration: 'none' }}>Download</a>
                                    </div>
                                ) : ( <CodeViewer code={lab.code} title="source.cpp" /> )}
                             </div>
                          ))}
                        </div>
                     ) : <p className="text-center text-gray-500 font-code p-4 border border-[#333] rounded">NO LABS</p>}
                  </section>

                  {/* Assignments */}
                  <section>
                     <h3 className="font-cairo text-white flex items-center gap-2 mb-4" style={{ fontWeight: 'bold', borderRight:'4px solid #4CAF50', paddingRight:'10px' }}><Save style={{color:'#4CAF50'}}/> التكاليف</h3>
                     {activeSub.assignments.length > 0 ? (
                        <div className="grid-system">
                          {activeSub.assignments.map((assign, i) => (
                             <div key={i} className="dark-panel p-5 relative overflow-hidden" style={{ minHeight: 'auto', borderTop: '4px solid #4CAF50' }}>
                                <div className="absolute top-[-10px] right-[-10px] opacity-5"><Check size={80} color="#4CAF50"/></div>
                                <div className="relative z-10">
                                   <h4 className="font-cairo text-white text-lg font-bold mb-3">{assign.title}</h4>
                                   <p className="font-cairo text-gray-400 bg-black p-3 rounded mb-4 text-sm">{assign.question}</p>
                                   <div className="flex flex-col gap-3">
                                      {assign.fileLink && <a href={assign.fileLink} target="_blank" rel="noopener noreferrer" className="btn-gold btn-outline" style={{borderColor:'#4CAF50', color:'#4CAF50'}}>تحميل الملف</a>}
                                      {assign.solutionCode && <CodeViewer code={assign.solutionCode} title="Solution" />}
                                      {assign.solutionText && <SolutionViewer text={assign.solutionText} title="الإجابة" />}
                                      {assign.imageLink && <div className="rounded border border-[#333] overflow-hidden mt-2"><img src={assign.imageLink} className="w-full block" alt="Solution"/></div>}
                                   </div>
                                </div>
                             </div>
                          ))}
                        </div>
                     ) : <p className="text-center text-gray-500 font-code p-4 border border-[#333] rounded">NO ASSIGNMENTS</p>}
                  </section>
                </div>
              </div>
            )}
          </main>

          <footer className="dark-panel mt-auto py-8 border-t border-t-[#3E2723] text-center rounded-none border-x-0 border-b-0"><p className="text-gold font-bold">CS PROMAX</p><p className="font-code text-gray-500 text-xs">SECURE_SYSTEM_V35.0</p></footer>
        </>
      )}
    </div>
  );
}