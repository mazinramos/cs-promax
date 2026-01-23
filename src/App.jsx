import React, { useState, useEffect, useRef } from 'react';
import { Layers, Book, Lock, User, Mail, Code, Terminal, Search, LogOut, Play, ChevronRight, Save, Cpu, Wifi, Shield, Database, Video, FileText, PenTool, Check, Menu, X, Languages, Bot, Send } from 'lucide-react';

/* =================================================================================
   1. CSS STYLES (WITH INTRO & BOT ANIMATIONS)
   ================================================================================= */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Fira+Code:wght@400;500;700&family=Tajawal:wght@400;500;700;800&display=swap');

  :root {
    --gold: #FFD54F;
    --dark-bg: #000000;
    --panel-bg: rgba(15, 15, 15, 0.95);
    --border-color: rgba(255, 213, 79, 0.2);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; outline: none; -webkit-tap-highlight-color: transparent; }

  body {
    font-family: 'Tajawal', sans-serif;
    background-color: var(--dark-bg);
    color: #e0e0e0;
    overflow-x: hidden;
    line-height: 1.5;
    min-height: 100vh;
  }

  .font-cairo { font-family: 'Cairo', sans-serif; }
  .font-code { font-family: 'Fira Code', monospace; }
  .text-gold { color: var(--gold); }
  .text-white { color: #fff; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .justify-center { justify-content: center; }
  .gap-2 { gap: 8px; }
  .gap-3 { gap: 12px; }
  .gap-4 { gap: 16px; }
  .w-full { width: 100%; }
  .text-center { text-align: center; }
  .pointer { cursor: pointer; }
  .relative { position: relative; }
  .fixed { position: fixed; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .z-high { z-index: 9999; }

  /* Loading Bar Animation */
  @keyframes loading-bar {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
  }
  .animate-loading-bar {
    width: 100%;
    animation: loading-bar 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  /* Fade Out Intro */
  .fade-out-intro {
    animation: fadeOut 0.8s forwards;
    animation-delay: 2.2s;
  }
  @keyframes fadeOut {
    from { opacity: 1; visibility: visible; }
    to { opacity: 0; visibility: hidden; }
  }

  .app-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 16px;
    position: relative;
    z-index: 2;
  }

  .grid-layout {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
  }
  
  @media (min-width: 640px) { .grid-layout { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .grid-layout { grid-template-columns: repeat(3, 1fr); gap: 24px; } }
  @media (min-width: 1280px) { .grid-layout { grid-template-columns: repeat(4, 1fr); } }

  .hacker-card {
    background: var(--panel-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 180px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
    position: relative;
    overflow: hidden;
  }
  
  .hacker-card:hover {
    transform: translateY(-5px);
    border-color: var(--gold);
    box-shadow: 0 10px 25px rgba(255, 213, 79, 0.15);
  }

  .hacker-input {
    background-color: #080808;
    border: 1px solid #333;
    color: #fff;
    font-family: 'Cairo', sans-serif;
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .btn-gold {
    background: var(--gold);
    color: #000;
    font-weight: bold;
    padding: 10px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-family: 'Cairo', sans-serif;
    transition: background 0.2s;
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    gap: 8px;
  }
  
  .btn-outline { background: transparent; color: var(--gold); border: 1px solid var(--gold); }
  .btn-outline:hover { background: rgba(255, 213, 79, 0.1); }

  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #3E2723;
    padding: 12px 0;
  }
  
  .nav-inner { display: flex; justify-content: space-between; align-items: center; gap: 10px; }

  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-entry { animation: fadeInUp 0.5s ease-out forwards; }
  
  .badge {
    background: rgba(255, 213, 79, 0.1);
    border: 1px solid var(--gold);
    color: var(--gold);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.7rem;
    font-family: 'Fira Code', monospace;
  }

  /* Chat Bot Custom Styles */
  .chat-box {
    height: 500px;
    display: flex;
    flex-direction: column;
    background: #050505;
    border: 1px solid #333;
    border-radius: 12px;
    overflow: hidden;
  }
  .messages-area { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
  .msg { padding: 10px 15px; border-radius: 15px; max-width: 80%; font-size: 14px; line-height: 1.4; }
  .msg-bot { background: var(--gold); color: #000; align-self: flex-start; border-bottom-left-radius: 2px; font-weight: bold; }
  .msg-user { background: #333; color: #fff; align-self: flex-end; border-bottom-right-radius: 2px; }
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
    const interval = setInterval(draw, 50);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
};

/* =================================================================================
   3. AI ASSISTANT COMPONENT
   ================================================================================= */
const AIAssistant = ({ data }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'أهلاً بك في مساعد CS PROMAX الذكي! 👋\n\n- أرسل أي نص لترجمته فوراً.\n- اطلب شيت معين (مثلاً: "ترجم لي شيت الإحصاء").' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleAction = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Search Logic
    const query = input.toLowerCase();
    let foundLec = null;
    data.forEach(sem => sem.subjects.forEach(sub => sub.lectures.forEach(lec => {
      if (query.includes(lec.title.toLowerCase()) || query.includes(sub.name.toLowerCase())) foundLec = lec;
    })));

    if (foundLec) {
      const translateUrl = `https://translate.google.com/translate?sl=auto&tl=ar&u=${encodeURIComponent(foundLec.link)}`;
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: `وجدت الملف: ${foundLec.title} 📄\n\nاضغط أدناه لفتحه مترجماً بالكامل:`, link: translateUrl }]);
        setLoading(false);
      }, 800);
      return;
    }

    // Translation Logic
    try {
      const isAr = /[\u0600-\u06FF]/.test(userMsg.text);
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(userMsg.text)}&langpair=${isAr ? 'ar|en' : 'en|ar'}`);
      const result = await res.json();
      setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: result.responseData.translatedText }]);
    } catch {
      setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: 'عذراً، حدث خطأ في الترجمة.' }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="chat-box">
      <div className="messages-area font-cairo">
        {messages.map(m => (
          <div key={m.id} className={`msg ${m.sender === 'bot' ? 'msg-bot' : 'msg-user'}`}>
            {m.text}
            {m.link && <a href={m.link} target="_blank" className="block mt-2 text-center p-1 bg-black text-white rounded text-xs">فتح الرابط المترجم</a>}
          </div>
        ))}
        {loading && <div className="text-xs text-gold animate-pulse">Thinking...</div>}
        <div ref={endRef} />
      </div>
      <div className="p-3 bg-black/50 border-t border-[#333] flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAction()} placeholder="اكتب هنا..." className="hacker-input" />
        <button onClick={handleAction} className="btn-gold" style={{width: '50px'}}><Send size={18}/></button>
      </div>
    </div>
  );
};

/* =================================================================================
   4. DATA (SAME AS BEFORE)
   ================================================================================= */
const initialData = [
  { id: 1, title: "Semester 01", year: "Freshman", subjects: [{ name: "Intro to CS", code: "CS100", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Basic Mathematics", code: "MATH100", lectures: [{title: "Limits", type: "pdf", link: "#", note: "Chapter 1"}], videos: [], labs: [], assignments: [{title: "Math Sheet #1", question: "Limit calculation?", solutionText: "Answer is 2."}] }, { name: "English I", code: "ENG101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Arabic I", code: "ARB101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Physics", code: "PHY101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Religious Culture", code: "REL101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Prog. Fundamentals", code: "CS102", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 2, title: "Semester 02", year: "Freshman", subjects: [{ name: "Arabic II", code: "ARB102", lectures: [], videos: [], labs: [], assignments: [] }, { name: "English II", code: "ENG102", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Religious Culture II", code: "REL102", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Calculus I", code: "MATH101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Prog. Methods I", code: "CS103", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Sudanese Studies", code: "SUD101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Discrete Math", code: "MATH102", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 3, title: "Semester 03", year: "Sophomore", subjects: [
      { name: "Calculus II", code: "MATH201", lectures: [{ title: "Full Course Notes", type: "pdf", link: "https://drive.google.com/file/d/10F5uzxD7uIjC57I_lN9-zR6f5AwjVKGX/view?usp=drivesdk", note: "مقرر الحسبان (نوتة شاملة)" }], videos: [], labs: [], assignments: [] },
      { name: "Statistics", code: "STAT201", lectures: [
  { title: "Lec 1: Intro to Statistics", type: "pdf", link: "https://drive.google.com/file/d/1WhpvG29H6ErnIga1yz0B_UQyj_3nFZ79/view?usp=drivesdk", note: "مقدمة الاحصاء" },
  { title: "Lec 2: Branches of Statistics", type: "pdf", link: "https://drive.google.com/file/d/1uCO22nmKzUsIsX-k471E9DW_0OeZuO6C/view?usp=drivesdk", note: "تقسيمات علم الإحصاء" },
  { title: "Lec 3: Data Presentation", type: "pdf", link: "https://drive.google.com/file/d/1EoNSP3Ohng-hS7m5NokdQCJNjduP7Lm0/view?usp=drivesdk", note: "عرض وتبويب البيانات" },
  { title: "Lec 4: Descriptive Measures", type: "pdf", link: "https://drive.google.com/file/d/1rANMgZebtl43zBKmHyTJxSPFkfcJY1u0/view?usp=drivesdk", note: "مقاييس وصف البيانات" },
  { title: "Lec 5: Grouped Data", type: "pdf", link: "https://drive.google.com/file/d/11PCpIX-b3nqm2JljLoIRtd1ajUAFnVOD/view?usp=drivesdk", note: "البيانات المبوبة" },
  { title: "Lec 6: Probability & Distributions", type: "pdf", link: "https://drive.google.com/file/d/1DvYejbepMiiJizQAaXLM9Idsg6Qgp-8X/view?usp=drivesdk", note: "الإحتمالات والتوزيعات الاحتمالية" },
  { title: "Lec 7: Conditional Probability", type: "pdf", link: "https://drive.google.com/file/d/1Ohmz_jdYL1ClMZvHr0_59JeC_svF_6g2/view?usp=drivesdk", note: "الإحتمال الشرطي" },
  { title: "Lec 8: Bayes Theorem", type: "pdf", link: "https://drive.google.com/file/d/10oXTZcyTE7bCAtaJIa-0DCozyPHADY_D/view?usp=drivesdk", note: "نظرية بايز" },
  { title: "Lec 9: Random Variables", type: "pdf", link: "https://drive.google.com/file/d/1jVH8jYnFAZANJe-I2jkjgwwSfuUPr0bl/view?usp=drivesdk", note: "المتغيرات العشوائية" },
  { title: "Lec 10: Lecture 10", type: "pdf", link: "https://drive.google.com/file/d/1Sd2RzMDNjJOy-IuqSo7fdbLZIYBpZ_L0/view?usp=drivesdk", note: "المحاضرة العاشرة" },
  { title: "Lec 11: Continuous Distributions", type: "pdf", link: "https://drive.google.com/file/d/1Rew15AnXoG5SWk14JP4TyRaojNOm9A8i/view?usp=drivesdk", note: "التوزيعات الإحتمالية المتصلة" },
  { title: "Lec 12: Standard Normal Dist.", type: "pdf", link: "https://drive.google.com/file/d/17oz39JNyvbbD3WasnQDrOBMLEM_jEpAT/view?usp=drivesdk", note: "التوزيع الطبيعي المعياري" }
],
 videos: [], labs: [], assignments: [
  { 
    title: "Assignment 1: Statistics Problems", 
    question: "تمارين وتطبيقات في الإحصاء (حمل الملف للحل)", 
    fileLink: "https://drive.google.com/file/d/1gApJmLfM0IuijaWxMFGOofz61FwopiMj/view?usp=drivesdk", 
    fileType: "PDF" 
  }
],
 },
      { name: "Linear Algebra", code: "MATH202", lectures: [{ title: "Full Course", type: "pdf", link: "https://drive.google.com/file/d/1N50ZtpnDzMFjRrU6mxXWHEP5JuPtaI1v/view?usp=drivesdk", note: "مقرر الجبر الخطي شامل" }], videos: [], labs: [], assignments: [] },
      { name: "Prog. Methods II", code: "CS201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Sys Analysis I", code: "IS201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Comm. Skills", code: "GEN201", lectures: [
  { title: "Lec 1-3: Concepts & Models", type: "pdf", link: "https://drive.google.com/file/d/1GYxwX659C_BqcWFVKJK7Acp0gqmueGip/view?usp=drivesdk", note: "المفهوم، العناصر، ونماذج الاتصال" },
  { title: "Lec 4: Reading Skills", type: "pdf", link: "https://drive.google.com/file/d/1L1UUVvrzrO3TOmtO7UsVK438q-u5JooX/view?usp=drivesdk", note: "مهارات القراءة" },
  { title: "Lec 5: Message Acceptance", type: "pdf", link: "https://drive.google.com/file/d/1_lHUfB2ME23skG9hkMWglSL3aPOHKNCw/view?usp=drivesdk", note: "كيفية التأثير على قبول الرسالة" },
  { title: "Lec 6: Comprehension Barriers", type: "pdf", link: "https://drive.google.com/file/d/1MlhwlKQeL65qI3Cu0lp3j1yYRrfR8dNF/view?usp=drivesdk", note: "حواجز الاستيعاب والفهم الدقيق" },
  { title: "Lec 7: Effective Writing", type: "pdf", link: "https://drive.google.com/file/d/1GuiVbRa24U8vTiIW9ltB0M5NP_5FYJ3w/view?usp=drivesdk", note: "الكتابة الفعّالة" },
  { title: "Lec 8: Speaking Confidence", type: "pdf", link: "https://drive.google.com/file/d/19uCvA6AoVqruB65ApjhLYVN3kXf4QE9w/view?usp=drivesdk", note: "التحدث بثقة" },
  { title: "Lec 9: Speaking Skills", type: "pdf", link: "https://drive.google.com/file/d/1sx5X4X3TUY3d02AGCmyweO7vCCWvfK95/view?usp=drivesdk", note: "مهارات التحدّث بثقة" },
  { title: "Lec 10: Master Speaker", type: "pdf", link: "https://drive.google.com/file/d/1qT78YPiyBMyCszzMMVIDiceoFWSGVmg2/view?usp=drivesdk", note: "كيف تصبح متحدثاً بارعاً" }
],
  videos: [], labs: [], assignments: [] },
      { name: "Digital Design", code: "CS202", lectures: [
  { title: "Lec 1: Data Representation", type: "pdf", link: "https://drive.google.com/file/d/1myETzAxTFMlp-FXh3kWNJlLiUNpOWgwW/view?usp=drivesdk", note: "تمثيل البيانات في الأنظمة الرقمية" },
  { title: "Lec 2: Real Numbers", type: "pdf", link: "https://drive.google.com/file/d/1nvQjAypYquNqTBDtUGtgcfYMgki68dMd/view?usp=drivesdk", note: "الأعداد الحقيقية" },
  { title: "Lec 3: Logical Operations", type: "pdf", link: "https://drive.google.com/file/d/1k3xbWG4ifZdSuhPoVhII99ld3cFPvRAB/view?usp=drivesdk", note: "العمليات المنطقية" },
  { title: "Lec 4: NAND Gate Sufficiency", type: "pdf", link: "https://drive.google.com/file/d/1jJEzn2whnDn9zBrOhA-scDBopsE7ZaBO/view?usp=drivesdk", note: "كفاية بوابة NAND" },
  { title: "Lec 5: Boolean Variables", type: "pdf", link: "https://drive.google.com/file/d/1k0qZUwdkPUTiW8hfaX9l_OO9u1GCBTIr/view?usp=drivesdk", note: "كتابة المتغيرات المنطقية" },
  { title: "Lec 6: Advanced Logic", type: "pdf", link: "https://drive.google.com/file/d/1_mzdGZQx0660uzqd2EQZGTjO_dAmvcxZ/view?usp=drivesdk", note: "المحاضرة السابعة" },
  { title: "Lec 7: Simplification (Part 1)", type: "pdf", link: "https://drive.google.com/file/d/1YWGb1HZ5glXQUvPPOsRtOH6NFL1Cm3vi/view?usp=drivesdk", note: "تبسيط المتغيرات المنطقية" },
  { title: "Lec 8: Karnaugh Maps (K-Map)", type: "pdf", link: "https://drive.google.com/file/d/1YwJzCbvvPUykWXucKV-FSVZz-nDM63Ee/view?usp=drivesdk", note: "التبسيط باستخدام مخططات كارنو" },
  { title: "Lec 9: 5-Variable K-Map", type: "pdf", link: "https://drive.google.com/file/d/1-rtb38fSmXNlsU0X2eUB9U2usKvOnV_N/view?usp=drivesdk", note: "مخططات كارنو لخمسة متغيرات" }
],
 videos: [], labs: [], assignments: [
  { 
    title: "Assignment 1: Theoretical Task", 
    question: "اسايمنت نظري (حمل الملف المرفق للإجابة)", 
    fileLink: "https://drive.google.com/file/d/1z7qfi5n11qQYiD-SD9VT-dbd7pdVkJCk/view?usp=drivesdk", 
    fileType: "PDF" 
  }
],
 }
  ]},
  { id: 4, title: "Semester 04", year: "Sophomore", subjects: [{ name: "Object Oriented Prog.", code: "CS203", lectures: [
  { title: "Lec 1: Structures", type: "pdf", link: "https://drive.google.com/file/d/1OEC1Pik8xrw7RXt-RPm5TMK93BiuYaxC/view?usp=drivesdk", note: "الهياكل (Structs)" },
  { title: "Lec 2: OOP Concepts", type: "pdf", link: "https://drive.google.com/file/d/1CcLL6TYz0znJnhN_z2X_pUg-sOrmcOHK/view?usp=drivesdk", note: "المفاهيم الأساسية للبرمجة الكائنية" },
  { title: "Lec 3.0: Constructors", type: "pdf", link: "https://drive.google.com/file/d/1y1i4sjKFSS_Rc0DTFSXSDr8srk9k75Ig/view?usp=drivesdk", note: "دوال البناء" },
  { title: "Lec 3.1: Destructors", type: "pdf", link: "https://drive.google.com/file/d/1eef9fPej3rqChJFJDetmUaZUEMnOMPZO/view?usp=drivesdk", note: "دوال الهدم" },
  { title: "Lec 3.2: Overloading", type: "pdf", link: "https://drive.google.com/file/d/1TG8gahEohfg6ITZ9UZ0K244UoZu0sodn/view?usp=drivesdk", note: "التحميل الزائد (Operator Overloading)" },
  { title: "Lec 4: Pointers & Arrays", type: "pdf", link: "https://drive.google.com/file/d/1rwB7PL5M0qGT85W4cqCNpQemF0myQs4b/view?usp=drivesdk", note: "استخدام المؤشرات ومصفوفة الكائنات" }
],
 videos: [
  { title: "Lec 1 Video: الهياكل والمقدمة", duration: "شرح", link: "https://drive.google.com/file/d/10NS3J-fKiD0oBYjrdNmPdlmxNcF5XBfi/view?usp=drivesdk" },
  { title: "Lec 3.1 Video: دوال الهدم", duration: "شرح", link: "https://drive.google.com/file/d/1wOzWXscJojUONTUNDfP8utbuq-FEB4q4/view?usp=drivesdk" },
  { title: "Lec 4 Video: المؤشرات والمصفوفات", duration: "شرح", link: "https://drive.google.com/file/d/1_FJROjdlII4eO0sUnxNkA7BhYL6EUqa7/view?usp=drivesdk" }
],
 labs: [
  { title: "Lab 1: Class Basics", code: `class Rectangle { float h, w; public: void set(float a, float b); };` }
], assignments: [
  { title: "Assignment 1: OOP Theory", question: "تمرين شامل في مفاهيم الـ OOP (حمل الملف)", fileLink: "https://drive.google.com/file/d/1IamaKK-w3i89sPUREt71j9i4btLUGSfj/view?usp=drivesdk", fileType: "PDF" }
],
 }, { name: "Data Structures", code: "CS204", lectures: [{ title: "Full Course", type: "pdf", link: "https://drive.google.com/file/d/1IzoPr5I7YRlMi2Ei8ghphgFjeeb819zn/view?usp=drivesdk" }], videos: [], labs: [], assignments: [] }, { name: "Sys Analysis II", code: "IS202", lectures: [], videos: [], labs: [], assignments: [] }, { name: "File Management", code: "CS205", lectures: [], videos: [], labs: [], assignments: [] }, { name: "HCI", code: "IS203", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Operation Research", code: "MATH203", lectures: [{ title: "Lec 1: Intro", link: "https://drive.google.com/file/d/1l0X6W9vEQXYAC7OOPFZS4Or-vUoSQtXc/view?usp=drivesdk" }],  videos: [], labs: [], assignments: [] }, { name: "Database I", code: "IS204", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 5, title: "Semester 05", year: "Junior", subjects: [] }
];

/* =================================================================================
   5. HELPERS
   ================================================================================= */
const CodeViewer = ({ code, title }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="hacker-card" style={{ marginTop: '16px', background: '#050505', minHeight: 'auto' }} dir="ltr">
      <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #333', paddingBottom: '8px', marginBottom: '8px' }}>
        <div className="flex items-center gap-2"><Terminal size={14} className="text-gold"/><span className="font-code text-gray-400 text-xs font-bold">{title}</span></div>
        <button onClick={handleCopy} className="badge pointer">{copied ? "COPIED" : "COPY"}</button>
      </div>
      <pre className="font-code" style={{ fontSize: '12px', overflowX: 'auto', color: '#abb2bf' }}>{code}</pre>
    </div>
  );
};

const LoginScreen = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', secret: '' });
  const [error, setError] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); if (formData.secret !== 'NRU@Cs@21') { setError('⛔ ACCESS DENIED'); return; } onLogin(formData); };
  return (
    <div className="flex items-center justify-center" style={{ minHeight: '80vh', padding: '16px', zIndex: 20, position: 'relative' }}>
      <div className="hacker-card animate-entry" style={{ width: '100%', maxWidth: '400px', padding: '32px', borderTop: '4px solid #FFD54F' }}>
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', borderRadius: '50%', marginBottom: '16px', border: '1px solid #FFD54F', padding: '10px' }}><Shield size={32} className="text-gold" /></div>
          <h1 className="font-cairo text-white" style={{ fontSize: '24px', fontWeight: '900' }}>CS PROMAX</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input required placeholder="الاسم" className="hacker-input" onChange={e => setFormData({...formData, name: e.target.value})} />
          <input required type="email" placeholder="الإيميل" className="hacker-input" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input required type="password" placeholder="الكود السري" className="hacker-input" onChange={e => setFormData({...formData, secret: e.target.value})} />
          {error && <div className="text-center text-red-500 text-xs">{error}</div>}
          <button className="btn-gold">دخول</button>
        </form>
      </div>
    </div>
  );
};

/* =================================================================================
   6. MAIN EXPORT
   ================================================================================= */
export default function CsProMaxV29() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [activeSem, setActiveSem] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [search, setSearch] = useState('');
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2800);
    const u = localStorage.getItem('cs_promax_v29'); 
    if(u) setUser(JSON.parse(u));
    return () => clearTimeout(timer);
  }, []);

  const login = (u) => { setUser(u); localStorage.setItem('cs_promax_v29', JSON.stringify(u)); };
  const logout = () => { localStorage.removeItem('cs_promax_v29'); setUser(null); setView('home'); };

  const filtered = initialData.map(s => ({
    ...s, subjects: s.subjects.filter(sub => sub.name.toLowerCase().includes(search.toLowerCase()) || sub.code.toLowerCase().includes(search.toLowerCase()))
  })).filter(s => s.subjects.length > 0);

  return (
    <div dir="rtl">
      <style>{styles}</style>

      {/* 🚀 PERPLEXITY STYLE INTRO */}
      {showIntro && (
        <div className="fixed inset-0 z-high bg-[#050505] flex flex-col items-center justify-center fade-out-intro">
          <div className="relative">
            <div className="absolute inset-0 bg-[#FFD54F] blur-[60px] opacity-20 animate-pulse"></div>
            <div className="relative flex flex-col items-center">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2 font-code">
                CS <span className="text-[#FFD54F]">PRO</span>MAX
              </h1>
              <div className="w-48 h-[2px] bg-[#333] mt-4 overflow-hidden rounded-full">
                <div className="h-full bg-[#FFD54F] animate-loading-bar shadow-[0_0_10px_#FFD54F]"></div>
              </div>
              <p className="mt-6 text-gray-500 font-code text-xs tracking-[0.3em] uppercase">Initializing Intelligence...</p>
            </div>
          </div>
        </div>
      )}

      <InteractiveMatrix />
      
      {!user ? <LoginScreen onLogin={login} /> : (
        <>
          <nav className="navbar">
            <div className="app-container nav-inner">
              <div className="flex items-center gap-2 pointer" onClick={() => setView('home')}>
                 <Terminal size={24} className="text-gold"/>
                 <h1 className="font-cairo text-white text-lg font-bold">CS PROMAX</h1>
              </div>
              <div className="flex items-center gap-3">
                 <button onClick={() => setView('ai')} className="btn-gold btn-outline" style={{padding:'5px 12px', width:'auto', fontSize:'12px'}}><Bot size={14}/> المترجم</button>
                 <button onClick={logout} style={{ color: '#ff4444' }}><LogOut size={18}/></button>
              </div>
            </div>
          </nav>

          <main className="app-container">
            {view === 'home' && (
              <div className="grid-layout animate-entry">
                {filtered.map(sem => (
                  <div key={sem.id} onClick={() => { setActiveSem(sem); setView('subjects'); }} className="hacker-card pointer">
                    <span className="badge">{sem.year}</span>
                    <h2 className="font-cairo text-white text-xl mt-2">{sem.title}</h2>
                    <p className="text-gray-500 text-xs mt-2">{sem.subjects.length} MODULES</p>
                  </div>
                ))}
              </div>
            )}

            {view === 'subjects' && activeSem && (
              <div className="grid-layout animate-entry">
                {activeSem.subjects.map((sub, i) => (
                  <div key={i} onClick={() => { setActiveSub(sub); setView('content'); }} className="hacker-card pointer">
                    <h3 className="font-cairo text-white font-bold">{sub.name}</h3>
                    <span className="font-code text-gold text-xs">{sub.code}</span>
                  </div>
                ))}
              </div>
            )}

            {view === 'ai' && <AIAssistant data={initialData} />}

            {view === 'content' && activeSub && (
              <div className="animate-entry space-y-4">
                <div className="hacker-card min-h-auto">
                   <h1 className="font-cairo text-white text-2xl font-bold">{activeSub.name}</h1>
                   <span className="text-gold font-code">{activeSub.code}</span>
                </div>
                
                <div className="grid-layout">
                   <div className="hacker-card min-h-auto">
                      <h3 className="font-cairo text-white mb-4 flex items-center gap-2"><FileText size={18} className="text-gold"/> المحاضرات</h3>
                      {activeSub.lectures.map((l, i) => (
                        <a key={i} href={l.link} target="_blank" className="btn-gold btn-outline mb-2">{l.title}</a>
                      ))}
                   </div>
                   <div className="hacker-card min-h-auto">
                      <h3 className="font-cairo text-white mb-4 flex items-center gap-2"><Save size={18} className="text-gold"/> التكاليف</h3>
                      {activeSub.assignments.map((a, i) => (
                        <div key={i} className="mb-4 p-2 bg-black/40 rounded">
                           <p className="text-white text-sm mb-2">{a.title}</p>
                           {a.fileLink && <a href={a.fileLink} target="_blank" className="btn-gold btn-outline text-xs">تحميل الملف</a>}
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}
          </main>

          <footer className="text-center p-8 opacity-40">
            <p className="text-gold font-bold">CS PROMAX AI</p>
          </footer>
        </>
      )}
    </div>
  );
}