import React, { useState, useEffect, useRef } from 'react';
import { Layers, Book, Lock, User, Mail, Code, Terminal, Search, LogOut, Play, ChevronRight, Save, Cpu, Wifi, Shield, Database, Video, FileText, PenTool, Check, Menu, X } from 'lucide-react';

/* =================================================================================
   1. GLOBAL CSS STYLES (FORCED LAYOUT & FONTS)
   ================================================================================= */
const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Fira+Code:wght@400;500;700&family=Tajawal:wght@400;500;700;800&display=swap');

/* Reset */
* { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

body { 
  font-family: 'Tajawal', sans-serif; 
  background-color: #000000;
  color: #e0e0e0;
  overflow-x: hidden; /* يمنع الصفحة تطلع يمين وشمال في الموبايل */
  width: 100%;
  min-height: 100vh;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #3E2723; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #FFD54F; }

/* Font Classes */
.font-cairo { font-family: 'Cairo', sans-serif; }
.font-code { font-family: 'Fira Code', monospace; }

/* --- CONTAINER (ضبط الأبعاد) --- */
.app-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px; /* هامش جانبي آمن للموبايل */
  position: relative;
  z-index: 2;
}

@media (min-width: 768px) {
  .app-container { padding: 0 24px; }
}

/* --- PANELS --- */
.dark-panel {
  background: rgba(12, 12, 12, 0.95);
  border: 1px solid rgba(255, 213, 79, 0.15);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.dark-panel:active { transform: scale(0.98); } /* تأثير ضغط للموبايل */

@media (hover: hover) {
  .dark-panel:hover {
    border-color: rgba(255, 213, 79, 0.5);
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(255, 213, 79, 0.15);
  }
}

/* --- GRID SYSTEM (ترتيب المواد) --- */
.grid-system {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr; /* الموبايل: عمود واحد */
  width: 100%;
}

@media (min-width: 640px) { .grid-system { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
@media (min-width: 1024px) { .grid-system { grid-template-columns: repeat(3, 1fr); gap: 24px; } }
@media (min-width: 1280px) { .grid-system { grid-template-columns: repeat(4, 1fr); } }

/* --- INPUTS --- */
.hacker-input {
  background-color: #080808;
  border: 1px solid #333;
  color: #fff;
  font-family: 'Cairo', 'Fira Code', sans-serif; 
  font-weight: 600;
  width: 100%;
  padding: 12px 40px 12px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 16px; /* حجم خط مناسب للموبايل عشان ما يعمل زوم */
}
.hacker-input:focus {
  border-color: #FFD54F;
  box-shadow: 0 0 10px rgba(255, 213, 79, 0.2);
  outline: none;
}

/* --- NAVBAR --- */
.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid #3E2723;
  padding: 12px 0;
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 768px) {
  .nav-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

/* Animations */
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-entry { animation: slideUp 0.5s ease-out forwards; }
`;

/* =================================================================================
   2. INTERACTIVE MATRIX BACKGROUND (FIXED)
   ================================================================================= */
const InteractiveMatrix = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(1);
    const chars = "01CS_PROMAX_NRU_<>{}"; 
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';

      for (let i = 0; i < drops.length; i++) {
        const x = i * 20;
        const y = drops[i] * 20;
        
        // Interaction Logic
        const dx = mousePos.current.x - x;
        const dy = mousePos.current.y - y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        let color = '#111'; // لون خافت جداً
        if (Math.random() > 0.98) color = '#3E2723'; // وميض بني
        // التفاعل مع اللمس/الماوس
        if (dist < 120) { color = '#FFD54F'; ctx.shadowBlur = 10; ctx.shadowColor = '#FFD54F'; } 
        else { ctx.shadowBlur = 0; }

        ctx.fillStyle = color;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
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
      { name: "Statistics", code: "STAT201", lectures: [
          { title: "Lec 1: Intro to Statistics", type: "pdf", link: "https://drive.google.com/file/d/1WhpvG29H6ErnIga1yz0B_UQyj_3nFZ79/view?usp=drivesdk", note: "مفاهيم أساسية" },
          { title: "Lec 2: Branches", type: "pdf", link: "https://drive.google.com/file/d/1uCO22nmKzUsIsX-k471E9DW_0OeZuO6C/view?usp=drivesdk", note: "فروع الإحصاء" },
          { title: "Lec 3: Data Presentation", type: "pdf", link: "https://drive.google.com/file/d/1EoNSP3Ohng-hS7m5NokdQCJNjduP7Lm0/view?usp=drivesdk", note: "عرض وتبويب البيانات" },
          { title: "Lec 4: Descriptive Measures", type: "pdf", link: "https://drive.google.com/file/d/1rANMgZebtl43zBKmHyTJxSPFkfcJY1u0/view?usp=drivesdk", note: "مقاييس الوصف" },
          { title: "Lec 5: Grouped Data", type: "pdf", link: "https://drive.google.com/file/d/11PCpIX-b3nqm2JljLoIRtd1ajUAFnVOD/view?usp=drivesdk", note: "البيانات المبوبة" },
          { title: "Lec 6: Probability", type: "pdf", link: "https://drive.google.com/file/d/1DvYejbepMiiJizQAaXLM9Idsg6Qgp-8X/view?usp=drivesdk", note: "الاحتمالات والتوزيعات" },
          { title: "Lec 7: Conditional Prob", type: "pdf", link: "https://drive.google.com/file/d/1Ohmz_jdYL1ClMZvHr0_59JeC_svF_6g2/view?usp=drivesdk", note: "الاحتمال الشرطي" },
          { title: "Lec 8: Bayes Theorem", type: "pdf", link: "https://drive.google.com/file/d/10oXTZcyTE7bCAtaJIa-0DCozyPHADY_D/view?usp=drivesdk", note: "نظرية بايز" },
          { title: "Lec 9: Random Variables", type: "pdf", link: "https://drive.google.com/file/d/1jVH8jYnFAZANJe-I2jkjgwwSfuUPr0bl/view?usp=drivesdk", note: "المتغيرات العشوائية" },
          { title: "Lec 10: Probability Func", type: "pdf", link: "https://drive.google.com/file/d/1Sd2RzMDNjJOy-IuqSo7fdbLZIYBpZ_L0/view?usp=drivesdk", note: "دوال الاحتمال" },
          { title: "Lec 11: Continuous Dist", type: "pdf", link: "https://drive.google.com/file/d/1Rew15AnXoG5SWk14JP4TyRaojNOm9A8i/view?usp=drivesdk", note: "التوزيعات المتصلة" },
          { title: "Lec 12: Standard Normal", type: "pdf", link: "https://drive.google.com/file/d/17oz39JNyvbbD3WasnQDrOBMLEM_jEpAT/view?usp=drivesdk", note: "التوزيع الطبيعي" }
      ], videos: [], labs: [], assignments: [] },
      { name: "Linear Algebra", code: "MATH202", lectures: [{ title: "Full Course", type: "pdf", link: "https://drive.google.com/file/d/1N50ZtpnDzMFjRrU6mxXWHEP5JuPtaI1v/view?usp=drivesdk", note: "مقرر الجبر الخطي شامل" }], videos: [], labs: [], assignments: [] },
      { name: "Prog. Methods II", code: "CS201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Sys Analysis I", code: "IS201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Comm. Skills", code: "GEN201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Digital Design", code: "CS202", lectures: [
          { title: "Lec 1: Data Rep.", type: "pdf", link: "https://drive.google.com/file/d/1myETzAxTFMlp-FXh3kWNJlLiUNpOWgwW/view?usp=drivesdk", note: "تمثيل البيانات" },
          { title: "Lec 2: Real Numbers", type: "pdf", link: "https://drive.google.com/file/d/1nvQjAypYquNqTBDtUGtgcfYMgki68dMd/view?usp=drivesdk", note: "الأعداد الحقيقية" },
          { title: "Lec 3: Logic Ops", type: "pdf", link: "https://drive.google.com/file/d/1k3xbWG4ifZdSuhPoVhII99ld3cFPvRAB/view?usp=drivesdk", note: "العمليات المنطقية" },
          { title: "Lec 4: NAND Gate", type: "pdf", link: "https://drive.google.com/file/d/1jJEzn2whnDn9zBrOhA-scDBopsE7ZaBO/view?usp=drivesdk", note: "بوابة NAND" },
          { title: "Lec 5: Boolean Vars", type: "pdf", link: "https://drive.google.com/file/d/1k0qZUwdkPUTiW8hfaX9l_OO9u1GCBTIr/view?usp=drivesdk", note: "المتغيرات المنطقية" },
          { title: "Lec 6: Advanced Logic", type: "pdf", link: "https://drive.google.com/file/d/1_mzdGZQx0660uzqd2EQZGTjO_dAmvcxZ/view?usp=drivesdk", note: "تابع المنطق" },
          { title: "Lec 7: Simplification 1", type: "pdf", link: "https://drive.google.com/file/d/1YWGb1HZ5glXQUvPPOsRtOH6NFL1Cm3vi/view?usp=drivesdk", note: "التبسيط 1" },
          { title: "Lec 8: K-Map", type: "pdf", link: "https://drive.google.com/file/d/1YwJzCbvvPUykWXucKV-FSVZz-nDM63Ee/view?usp=drivesdk", note: "مخططات كارنو" },
          { title: "Lec 9: 5-Var K-Map", type: "pdf", link: "https://drive.google.com/file/d/1-rtb38fSmXNlsU0X2eUB9U2usKvOnV_N/view?usp=drivesdk", note: "كارنو 5 متغيرات" }
      ], videos: [], labs: [], assignments: [] }
  ]},
  { id: 4, title: "Semester 04", year: "Sophomore", subjects: [{ name: "Object Oriented Prog.", code: "CS203", lectures: [{ title: "Lec 1: Concepts", type: "pdf", link: "#", note: "Intro" }], videos: [{ title: "OOP Intro", duration: "45:00", link: "#" }], labs: [], assignments: [{ title: "OOP Task 1", question: "Create Student class", solutionCode: `class Student { int id; }` }] }, { name: "Data Structures", code: "CS204", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Sys Analysis II", code: "IS202", lectures: [], videos: [], labs: [], assignments: [] }, { name: "File Management", code: "CS205", lectures: [], videos: [], labs: [], assignments: [] }, { name: "HCI", code: "IS203", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Operation Research", code: "MATH203", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Database I", code: "IS204", lectures: [], videos: [], labs: [], assignments: [] }] },
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
        <div className="flex items-center gap-2"><Terminal size={14} className="text-[#FFD54F]"/><span className="font-code text-gray-400 text-xs font-bold">{title}</span></div>
        <button onClick={handleCopy} className="text-[#FFD54F] hover:text-white flex items-center gap-1 text-[10px] font-code bg-[#3E2723]/20 px-2 py-1 rounded transition hover:bg-[#FFD54F]">{copied ? "COPIED" : "COPY"}</button>
      </div>
      <pre className="p-4 text-xs md:text-sm font-code leading-relaxed overflow-x-auto text-[#abb2bf] bg-[#000]">{code}</pre>
    </div>
  );
};

const SolutionViewer = ({ text, title }) => (
  <div className="dark-panel bg-[#0a0a0a] shadow-lg my-4 p-4 relative overflow-hidden group w-full text-right">
    <h5 className="text-[#FFD54F] text-xs font-bold mb-2 font-cairo flex items-center gap-2"><Check size={14}/> {title}</h5>
    <p className="text-gray-300 font-cairo leading-relaxed whitespace-pre-line">{text}</p>
  </div>
);

const LoginScreen = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', secret: '' });
  const [error, setError] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); if (formData.secret !== 'NRU@Cs@21') { setError('⛔ ACCESS DENIED: الكود السري غير صحيح'); return; } onLogin(formData); };

  return (
    <div className="flex items-center justify-center p-4 relative font-cairo z-20" style={{ minHeight: '80vh' }}>
      <div className="w-full max-w-md dark-panel p-8 rounded-xl animate-entry border-t-2 border-t-[#FFD54F]">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-full bg-black border border-[#FFD54F] mb-4 shadow-[0_0_15px_#FFD54F] animate-pulse">
             <Shield size={40} className="text-[#FFD54F]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter">CS PROMAX</h1>
          <p className="text-[#FFD54F] font-code text-[10px] tracking-[0.4em]">SECURE_LOGIN</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {['IDENTITY_NAME', 'EMAIL_ADDRESS', 'SECURITY_TOKEN'].map((label, idx) => (
            <div className="group" key={label}>
              <label className="text-[#FFD54F] text-[10px] font-bold mb-2 block font-code tracking-widest ml-1">{label}</label>
              <div className="relative">
                 {idx === 0 && <User className="absolute right-3.5 top-3.5 text-[#5D4037] pointer-events-none" size={18}/>}
                 {idx === 1 && <Mail className="absolute right-3.5 top-3.5 text-[#5D4037] pointer-events-none" size={18}/>}
                 {idx === 2 && <Lock className="absolute right-3.5 top-3.5 text-[#5D4037] pointer-events-none" size={18}/>}
                 <input required type={idx === 2 ? 'password' : idx === 1 ? 'email' : 'text'} placeholder={idx === 0 ? 'الاسم الثلاثي' : idx === 1 ? 'student@example.com' : '•••••••••'} className={`hacker-input ${idx === 2 ? 'tracking-[0.3em]' : ''}`} value={idx === 0 ? formData.name : idx === 1 ? formData.email : formData.secret} onChange={e => setFormData({...formData, [idx === 0 ? 'name' : idx === 1 ? 'email' : 'secret']: e.target.value})} />
              </div>
            </div>
          ))}
          {error && <div className="bg-red-900/20 text-red-500 text-xs p-3 rounded border border-red-900 font-code text-center tracking-wide">{error}</div>}
          <button className="w-full bg-[#FFD54F] hover:bg-[#FFC107] text-black font-black py-4 rounded-lg shadow-[0_0_15px_rgba(255,213,79,0.4)] transition-all active:scale-95 flex justify-center items-center gap-2 font-cairo text-lg mt-4"><Cpu size={24}/> تسجيل الدخول</button>
        </form>
      </div>
    </div>
  );
};

/* =================================================================================
   5. MAIN APPLICATION
   ================================================================================= */
export default function CsProMaxV27() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [activeSemester, setActiveSemester] = useState(null);
  const [activeSubject, setActiveSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { const saved = localStorage.getItem('cs_promax_v27_user'); if (saved) setUser(JSON.parse(saved)); }, []);
  const handleLogin = (data) => { setUser(data); localStorage.setItem('cs_promax_v27_user', JSON.stringify(data)); };
  const handleLogout = () => { localStorage.removeItem('cs_promax_v27_user'); setUser(null); setView('home'); };

  const filteredSemesters = initialData.map(sem => ({
    ...sem, subjects: sem.subjects ? sem.subjects.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.code.toLowerCase().includes(searchTerm.toLowerCase())) : []
  })).filter(sem => sem.subjects && (sem.subjects.length > 0 || searchTerm === ''));

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#000000', color: '#e0e0e0' }} dir="rtl">
      <style>{globalStyles}</style>
      <InteractiveMatrix />

      <div style={{ position: 'relative', zIndex: 10 }}>
      {!user ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <>
          {/* NAVBAR */}
          <nav className="navbar-wrapper">
            <div className="app-container nav-content">
              <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('home')}>
                 <div className="bg-black p-2 rounded-lg border border-[#FFD54F] group-hover:bg-[#FFD54F] group-hover:text-black transition-colors"><Terminal size={24} className="text-[#FFD54F] group-hover:text-black"/></div>
                 <div><h1 className="text-xl md:text-2xl font-black tracking-tighter text-white group-hover:text-[#FFD54F] transition-colors">CS PROMAX</h1><p className="text-[10px] text-gray-500 font-code tracking-widest">BATCH 21 & 22</p></div>
              </div>
              <div className="relative w-full md:w-1/3 group max-w-md">
                 <input type="text" placeholder="بحث عن مادة / كود..." className="hacker-input" onChange={(e) => { setSearchTerm(e.target.value); if(e.target.value) setView('home'); }} />
                 <Search className="absolute right-3.5 top-3.5 text-gray-600 pointer-events-none" size={16}/>
              </div>
              <div className="flex items-center justify-between w-full md:w-auto gap-4">
                <div className="flex items-center gap-3">
                   <div className="hidden md:block leading-tight text-right"><div className="text-[#FFD54F] font-bold text-sm font-code">{user.name}</div><div className="text-[10px] text-gray-500 font-code">{user.email}</div></div>
                   <img src={`https://ui-avatars.com/api/?name=${user.name}&background=FFD54F&color=000&size=128&bold=true`} alt="Profile" className="w-10 h-10 rounded-full border-2 border-[#3E2723] shadow-md flex-shrink-0" />
                   <button onClick={handleLogout} className="bg-red-900/10 p-2 rounded-full hover:bg-red-600 hover:text-white text-red-500 transition border border-red-900/30 flex-shrink-0"><LogOut size={18}/></button>
                </div>
              </div>
            </div>
          </nav>

          {/* CONTENT */}
          <main className="app-container py-8">
            {/* Breadcrumbs */}
            {view !== 'home' && (
               <div className="flex items-center gap-2 mb-6 text-sm text-gray-400 font-code animate-entry">
                 <button onClick={() => setView('home')} className="hover:text-[#FFD54F] transition">root</button><ChevronRight size={14}/>
                 {activeSemester && <span onClick={() => setView('subjects')} className={`cursor-pointer hover:text-[#FFD54F] transition ${view === 'subjects' ? 'text-[#FFD54F]' : ''}`}>{activeSemester.title}</span>}
                 {activeSubject && view === 'content' && <><ChevronRight size={14}/><span className="text-[#FFD54F]">{activeSubject.code}</span></>}
               </div>
            )}

            {/* SEMESTERS VIEW */}
            {view === 'home' && (
              <div className="animate-entry">
                <div className="mb-8 flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-right">
                  <div className="p-3 bg-black border border-[#FFD54F] rounded-full text-[#FFD54F] shadow-[0_0_15px_#FFD54F]"><Database size={24}/></div>
                  <div><h2 className="text-2xl md:text-3xl font-black text-white">الأرشيف الأكاديمي</h2><p className="text-gray-500 text-xs md:text-sm font-code">SELECT_SEMESTER_</p></div>
                </div>
                <div className="grid-system">
                  {filteredSemesters.map((sem, index) => (
                    <div key={sem.id} onClick={() => {setActiveSemester(sem); setView('subjects')}} className="group relative dark-panel h-56 rounded-xl cursor-pointer flex flex-col justify-between p-6">
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition duration-500"><Layers size={80} /></div>
                      <div><div className="flex justify-between items-start mb-4"><span className="font-code text-[10px] text-[#FFD54F] border border-[#FFD54F]/30 px-2 py-1 rounded bg-[#FFD54F]/5">{sem.year.toUpperCase()}</span><span className="text-4xl font-black text-[#1a1a1a] group-hover:text-[#FFD54F] transition-all duration-500">0{sem.id}</span></div><h3 className="text-xl font-bold text-white group-hover:text-[#FFD54F] transition font-cairo">{sem.title}</h3></div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-code group-hover:text-white transition"><div className="w-2 h-2 bg-[#FFD54F] rounded-full animate-pulse"></div> {sem.subjects.length} MODULES</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUBJECTS VIEW */}
            {view === 'subjects' && activeSemester && (
              <div className="animate-entry">
                <h2 className="text-2xl md:text-4xl font-black mb-8 flex flex-col md:flex-row items-center gap-3 text-white"><span className="text-[#FFD54F]">{activeSemester.title}</span><span className="hidden md:inline text-gray-600 text-2xl font-light">|</span><span className="text-gray-400 text-lg md:text-2xl">المواد</span></h2>
                <div className="grid-system">
                  {activeSemester.subjects.map((sub, idx) => (
                    <div key={idx} onClick={() => {setActiveSubject(sub); setView('content')}} className="dark-panel p-6 rounded-xl border-l-4 border-l-[#3E2723] hover:border-l-[#FFD54F] cursor-pointer group">
                       <div className="flex justify-between items-start mb-4"><div className="p-3 rounded-lg bg-black border border-[#3E2723] group-hover:border-[#FFD54F] transition"><Code size={20} className="text-gray-500 group-hover:text-[#FFD54F]"/></div><span className="font-code text-xs text-[#8D6E63] font-bold group-hover:text-[#FFD54F] transition">{sub.code}</span></div>
                       <h3 className="text-lg md:text-xl font-bold text-white font-cairo group-hover:translate-x-2 transition-transform">{sub.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTENT VIEW */}
            {view === 'content' && activeSubject && (
              <div className="animate-entry">
                <div className="relative overflow-hidden rounded-2xl border border-[#3E2723] mb-8 bg-[#0a0a0a]">
                   <div className="p-6 md:p-8 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                     <div><div className="flex items-center gap-3 mb-2"><span className="px-3 py-1 bg-[#FFD54F] text-black text-xs font-bold rounded font-code shadow-[0_0_15px_#FFD54F]">{activeSubject.code}</span><span className="text-green-500 text-xs flex items-center gap-1 font-code"><Wifi size={12} className="animate-pulse"/> ONLINE</span></div><h1 className="text-3xl md:text-5xl font-black text-white font-cairo">{activeSubject.name}</h1></div>
                     <Cpu className="hidden md:block text-[#FFD54F] w-32 h-32 opacity-10 animate-pulse"/>
                   </div>
                </div>

                <div className="space-y-12">
                  <section>
                     <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3 border-r-4 border-[#FFD54F] pr-4 font-cairo"><FileText className="text-[#FFD54F]"/> المحاضرات (PDF)</h3>
                     <div className="grid-system">
                        {activeSubject.lectures.length > 0 ? activeSubject.lectures.map((lec, i) => (
                          <div key={i} className="dark-panel p-5 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                             <div className="flex items-center gap-4"><div className="p-3 bg-[#FFD54F]/10 rounded-full text-[#FFD54F] border border-[#FFD54F]/20 flex-shrink-0"><FileText size={20}/></div><div><h4 className="font-bold text-lg text-white font-cairo">{lec.title}</h4><p className="text-sm text-gray-500 font-code text-left" dir="ltr">// {lec.note}</p></div></div>
                             <a href={lec.link} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-[#FFD54F] text-black font-bold rounded hover:bg-[#FFC107] hover:shadow-[0_0_20px_#FFD54F] transition font-cairo text-sm w-full sm:w-auto text-center">تحميل</a>
                          </div>
                        )) : <div className="dark-panel p-8 text-center opacity-60 col-span-full"><p className="text-gray-500 font-code">NO_DATA</p></div>}
                     </div>
                  </section>

                  <section>
                     <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3 border-r-4 border-red-500 pr-4 font-cairo"><Video className="text-red-500"/> الفيديوهات</h3>
                     <div className="grid-system">
                        {activeSubject.videos && activeSubject.videos.length > 0 ? activeSubject.videos.map((vid, i) => (
                          <div key={i} className="dark-panel p-5 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-2 border-l-red-500">
                             <div className="flex items-center gap-4"><div className="p-3 bg-red-900/20 rounded-full text-red-500 border border-red-500/20 flex-shrink-0"><Play size={20}/></div><div><h4 className="font-bold text-lg text-white font-cairo">{vid.title}</h4><p className="text-sm text-gray-500 font-code text-left" dir="ltr">{vid.duration}</p></div></div>
                             <a href={vid.link} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition font-cairo text-sm w-full sm:w-auto text-center">مشاهدة</a>
                          </div>
                        )) : <div className="dark-panel p-6 text-center opacity-50 col-span-full"><p className="text-gray-500 font-code">NO_VIDEOS</p></div>}
                     </div>
                  </section>

                  <section>
                     <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3 border-r-4 border-blue-500 pr-4 font-cairo"><Terminal className="text-blue-500"/> العملي (Labs)</h3>
                     {activeSubject.labs.length > 0 ? activeSubject.labs.map((lab, i) => (
                        <div key={i} className="mb-8 w-full"><h4 className="text-blue-400 font-bold text-lg mb-2 font-cairo">{lab.title}</h4><CodeViewer code={lab.code} title="source.cpp" /></div>
                     )) : <div className="dark-panel p-6 text-center opacity-50"><p className="text-gray-500 font-code">NO_LABS</p></div>}
                  </section>

                  <section>
                     <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3 border-r-4 border-green-500 pr-4 font-cairo"><Save className="text-green-500"/> التكاليف (Assignments)</h3>
                     {activeSubject.assignments.length > 0 ? activeSubject.assignments.map((assign, i) => (
                        <div key={i} className="dark-panel p-6 rounded-xl border border-green-900/30 mb-6">
                           <h4 className="text-xl font-bold text-white mb-2 font-cairo">{assign.title}</h4><p className="text-gray-300 bg-black p-3 rounded mb-4 font-cairo border-r-2 border-green-500">{assign.question}</p>
                           {assign.solutionCode && <CodeViewer code={assign.solutionCode} title="solution.cpp" />}
                           {assign.solutionText && <SolutionViewer text={assign.solutionText} title="الإجابة النموذجية" />}
                        </div>
                     )) : <div className="dark-panel p-6 text-center opacity-50"><p className="font-code text-gray-500">NO_ASSIGNMENTS</p></div>}
                  </section>
                </div>
              </div>
            )}
          </main>

          <footer className="dark-panel mt-12 py-8 border-t border-t-[#3E2723] text-center relative z-10"><p className="text-[#FFD54F] font-black text-lg tracking-widest font-cairo">CS PROMAX</p><p className="text-gray-600 text-xs font-code mt-2">SECURE_ARCHIVE_SYSTEM_V27.0</p></footer>
        </>
      )}
      </div>
    </div>
  );
}