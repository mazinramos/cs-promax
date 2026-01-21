import React, { useState, useEffect, useRef } from 'react';
import { Layers, Book, Lock, User, Mail, Code, Terminal, Search, LogOut, Play, ChevronRight, Save, Cpu, Wifi, Shield, Database, Video, FileText, PenTool, Check, Menu, X } from 'lucide-react';

/* =================================================================================
   1. PURE CSS STYLES (NO EXTERNAL LIBRARIES)
   ================================================================================= */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&family=Fira+Code:wght@300;400;500;700&family=Tajawal:wght@300;400;500;700;800&display=swap');

  :root {
    --gold: #FFD54F;
    --dark-bg: #000000;
    --panel-bg: rgba(18, 18, 18, 0.95);
    --border-color: rgba(255, 213, 79, 0.15);
    --text-primary: #e0e0e0;
    --text-secondary: #a0a0a0;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; outline: none; -webkit-tap-highlight-color: transparent; }

  body {
    font-family: 'Tajawal', sans-serif;
    background-color: var(--dark-bg);
    color: var(--text-primary);
    overflow-x: hidden;
    line-height: 1.5;
  }

  /* Utility Classes */
  .font-cairo { font-family: 'Cairo', sans-serif; }
  .font-code { font-family: 'Fira Code', monospace; }
  .text-gold { color: var(--gold); }
  .text-white { color: #fff; }
  .text-gray { color: var(--text-secondary); }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .justify-center { justify-content: center; }
  .gap-2 { gap: 0.5rem; }
  .gap-4 { gap: 1rem; }
  .w-full { width: 100%; }
  .text-center { text-align: center; }
  .pointer { cursor: pointer; }
  .relative { position: relative; }
  .absolute { position: absolute; }
  .hidden { display: none; }

  /* Container */
  .container-max {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }
  @media (min-width: 768px) { .container-max { padding: 0 24px; } }

  /* Panels */
  .dark-panel {
    background: var(--panel-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.6);
    transition: transform 0.2s ease, border-color 0.2s ease;
    overflow: hidden;
  }
  .dark-panel:hover {
    border-color: rgba(255, 213, 79, 0.5);
    transform: translateY(-4px);
  }

  /* Grid System */
  .grid-system {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
  }
  @media (min-width: 600px) { .grid-system { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
  @media (min-width: 900px) { .grid-system { grid-template-columns: repeat(3, 1fr); gap: 24px; } }
  @media (min-width: 1200px) { .grid-system { grid-template-columns: repeat(4, 1fr); } }

  /* Inputs */
  .hacker-input {
    background-color: #080808;
    border: 1px solid #333;
    color: #fff;
    font-family: 'Cairo', sans-serif;
    font-weight: 600;
    width: 100%;
    padding: 12px 16px;
    padding-right: 40px; /* Space for icon */
    border-radius: 8px;
    transition: all 0.3s ease;
    font-size: 16px;
  }
  .hacker-input:focus {
    border-color: var(--gold);
    box-shadow: 0 0 10px rgba(255, 213, 79, 0.2);
  }

  /* Navbar */
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #3E2723;
    padding: 12px 0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  }

  /* Buttons */
  .btn-gold {
    background: var(--gold);
    color: #000;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-family: 'Cairo', sans-serif;
    font-size: 0.9rem;
    transition: background 0.2s;
    text-decoration: none; /* For links */
    display: inline-block;
    text-align: center;
  }
  .btn-gold:hover { background: #FFCA28; }

  /* Animations */
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-entry { animation: fadeInUp 0.5s ease-out forwards; }
  
  /* Helpers */
  .icon-box {
    background: #000;
    border: 1px solid var(--gold);
    padding: 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .badge {
    background: rgba(255, 213, 79, 0.1);
    border: 1px solid rgba(255, 213, 79, 0.3);
    color: var(--gold);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.7rem;
    font-family: 'Fira Code', monospace;
  }
  
  /* Responsive Visibility */
  @media (min-width: 768px) { .md-block { display: block !important; } .md-flex { display: flex !important; } .md-hidden { display: none !important; } }
  .hidden { display: none; }
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
    const chars = "01<>"; 
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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
  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />;
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
  { id: 6, title: "Semester 06", year: "Junior", subjects: [{ name: "Internet Tech II", code: "IT302", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Computer Arch.", code: "CS304", lectures


