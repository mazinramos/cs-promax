import { Layers, Book, Lock, User, Mail, Code, Terminal, Search, LogOut, Play, ChevronRight, Save, Cpu, Wifi, Shield, Database, Video, FileText, PenTool, Check, Menu, X, Map, Globe, Brain, Smartphone, Calculator, FileQuestion, Languages, Bot, Send } from 'lucide-react';


/* =================================================================================
   1. CSS STYLES (PIXEL PERFECT LAYOUT)
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

  /* Utility Classes */
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
  .gap-4 { gap: 16px; }
  .w-full { width: 100%; }
  .text-center { text-align: center; }
  .pointer { cursor: pointer; }
  .relative { position: relative; }
  .absolute { position: absolute; }

  /* Container (The Frame) */
  .app-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 16px;
    position: relative;
    z-index: 2;
  }

  /* Grid System (The Structure) */
  .grid-layout {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr; /* Mobile: 1 Column */
  }
  
  @media (min-width: 640px) {
    .grid-layout { grid-template-columns: repeat(2, 1fr); } /* Tablet: 2 Columns */
  }
  
  @media (min-width: 1024px) {
    .grid-layout { grid-template-columns: repeat(3, 1fr); gap: 24px; } /* Laptop: 3 Columns */
  }
  
  @media (min-width: 1280px) {
    .grid-layout { grid-template-columns: repeat(4, 1fr); } /* Large Screen: 4 Columns */
  }

  /* Hacker Card (The Look) */
  .hacker-card {
    background: var(--panel-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 180px; /* Fixed Height for consistency */
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
  
  .card-icon-bg {
    position: absolute;
    top: 10px;
    right: 10px;
    opacity: 0.05;
    transform: rotate(-15deg);
  }

  /* Inputs */
  .hacker-input {
    background-color: #080808;
    border: 1px solid #333;
    color: #fff;
    font-family: 'Cairo', sans-serif;
    font-weight: 600;
    width: 100%;
    padding: 12px 40px 12px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-size: 14px;
  }
  .hacker-input:focus {
    border-color: var(--gold);
    box-shadow: 0 0 10px rgba(255, 213, 79, 0.2);
  }

  /* Buttons */
  .btn-gold {
    background: var(--gold);
    color: #000;
    font-weight: bold;
    padding: 10px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-family: 'Cairo', sans-serif;
    font-size: 0.9rem;
    transition: background 0.2s;
    text-align: center;
    width: 100%;
    display: block;
    text-decoration: none;
  }
  .btn-gold:hover { background: #FFCA28; }
  
  .btn-outline {
    background: transparent;
    color: var(--gold);
    border: 1px solid var(--gold);
  }
  .btn-outline:hover { background: rgba(255, 213, 79, 0.1); }

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
  
  .nav-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  /* Animations */
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-entry { animation: fadeInUp 0.5s ease-out forwards; }
  
  /* Helpers */
  .badge {
    background: rgba(255, 213, 79, 0.1);
    border: 1px solid var(--gold);
    color: var(--gold);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.7rem;
    font-family: 'Fira Code', monospace;
    display: inline-block;
    margin-bottom: 8px;
  }
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
   3. DATA
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
  { title: "Lec 6: Advanced Logic", type: "pdf", link: "https://drive.google.com/file/d/1_mzdGZQx0660uzqd2EQZGTjO_dAmvcxZ/view?usp=drivesdk", note: "المحاضرة السادسة" },
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
  {
    title: "Lab 1: Class & Object Basics",
    description: "أساسيات إنشاء الكلاس وتعريف الدوال داخله وخارجه.",
    code: `#include <iostream>
using namespace std;

class Rectangle {
    float heigh, width; // متغيرات خاصة (Private)

public:
    // الإعلان عن الدوال (Prototypes)
    void setside(float h, float w);
    float area();
};

// تعريف دالة setside خارج الكلاس
void Rectangle::setside(float h, float w) {
    width = w;
    heigh = h;
}

// تعريف دالة area خارج الكلاس
float Rectangle::area() {
    return width * heigh;
}

int main() {
    Rectangle Myrect; // تعريف كائن
    float Rectarea;

    Myrect.setside(3.0, 4.0); // إعطاء قيم
    Rectarea = Myrect.area(); // حساب المساحة

    cout << "The area of rect = " << Rectarea << endl;
    
    return 0;
}`
  },
  {
    title: "Lab 2: Array of Objects",
    description: "كيفية التعامل مع مصفوفة من الكائنات (Array of Objects).",
    code: `#include <iostream>
using namespace std;

class Rectangle {
    float width, heigh;
public:
    void setside(float w, float h) {
        width = w;
        heigh = h;
    }
    float area() {
        return width * heigh;
    }
};

int main() {
    Rectangle rect[3]; // مصفوفة فيها 3 كائنات
    int i;

    // حلقة تكرار لإدخال البيانات وحساب المساحة
    for(i = 0; i < 3; i++) {
        // معادلة بسيطة لتغيير الأرقام في كل لفة
        rect[i].setside(i + 2.5, i + 1.5);
        
        cout << "the area of rect = " << rect[i].area() << endl;
    }

    return 0;
}`
  },
  {
    title: "Lab 3: The 'this' Pointer",
    description: "شرح استخدام المؤشر this للإشارة للكائن الحالي.",
    code: `#include <iostream>
using namespace std;

class Test {
    int x;
public:
    Test(int a);
    void print();
};

Test::Test(int a) {
    x = a;
}

void Test::print() {
    // الثلاثة أسطر دي بتطبع نفس الحاجة
    cout << "x = " << x << endl;            // مباشر
    cout << "this->x = " << this->x << endl; // باستخدام السهم
    cout << "(*this).x = " << (*this).x << endl; // بفك المؤشر
}

int main() {
    Test t(12);
    t.print();
    return 0;
}`
  },
  {
    title: "Lab 4: Constructors",
    description: "أنواع دوال البناء (الافتراضية والمعاملات).",
    code: `#include <iostream>
using namespace std;

class rect {
    float width, heigh;

public:
    // 1. دالة بناء افتراضية (بدون قيم)
    rect() {
        width = 0.0;
        heigh = 0.0;
    }

    // 2. دالة بناء بمعاملات (بتاخد قيم)
    rect(float w, float h) {
        width = w;
        heigh = h;
    }

    float area() {
        return width * heigh;
    }
};

int main() {
    rect r1;             // حينادي الفاضية (أصفار)
    rect r2(4.5, 5.5);   // حينادي التانية (بالأرقام)

    cout << "the area of r1=" << r1.area() << endl;
    cout << "the area of r2=" << r2.area() << endl;

    return 0;
}`
  }
], assignments: [
  
  { title: "OOP Task 1", question: "Create Student class", solutionCode: `class Student { int id; }` },

  { 
    title: "Assignment 1: OOP Theory & Practice", 
    question: "تمرين شامل في مفاهيم الـ OOP (حمل الملف)", 
    fileLink: "https://drive.google.com/file/d/1IamaKK-w3i89sPUREt71j9i4btLUGSfj/view?usp=drivesdk", 
    fileType: "PDF" 
  }
],
 }, { name: "Data Structures", code: "CS204", lectures: [
  { title: "Full Course Notes", type: "pdf", link: "https://drive.google.com/file/d/1IzoPr5I7YRlMi2Ei8ghphgFjeeb819zn/view?usp=drivesdk", note: "مقرر هياكل البيانات" }
], videos: [], labs: [
  {
    title: "Lab 1: Linear Search",
    description: "كود البحث الخطي (Linear Search) للبحث عن عنصر في مصفوفة.",
    code: `#include <iostream>
using namespace std;

// Function to search linearly
int lin(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            return i; // Found, return index
        }
    }
    return -1; // Not Found
}

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = 5;
    
    // Search for 30
    int result = lin(arr, n, 30);
    
    if(result != -1) 
        cout << "Found at index " << result;
    else 
        cout << "Not Found";
        
    return 0;
}`
  },
  {
    title: "Lab 2: Binary Search",
    description: "كود البحث الثنائي (Binary Search) - يتطلب مصفوفة مرتبة.",
    code: `#include <iostream>
using namespace std;

// Function for Binary Search
int binarySearch(int arr[], int n, int num) {
    int low = 0;
    int high = n - 1;
    
    while (low <= high) {
        int mid = (low + high) / 2;
        
        if (arr[mid] == num)
            return mid; // Found
        else if (arr[mid] < num)
            low = mid + 1; // Search Right
        else
            high = mid - 1; // Search Left
    }
    return -1; // Not Found
}

int main() {
    int arr[] = {2, 3, 4, 10, 40}; // Must be sorted
    int n = 5;
    
    cout << "Index: " << binarySearch(arr, n, 10);
    return 0;
}`
  },
  {
    title: "Lab 3: Selection Sort",
    description: "خوارزمية الترتيب بالاختيار (Selection Sort).",
    code: `#include <iostream>
#include <algorithm> // For swap
using namespace std;

void select(int arr[], int n) {
    int min;
    for (int i = 0; i < n - 1; i++) {
        min = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min]) // Find smaller element
                min = j;
        }
        swap(arr[min], arr[i]); // Swap found minimum with current
    }
}

int main() {
    int arr[] = {60, 40, 50, 30, 10};
    int n = 5;
    
    select(arr, n);
    
    // Print Sorted Array
    for(int i=0; i<n; i++) cout << arr[i] << " ";
    return 0;
}`
  },
  {
    title: "Lab 4: Bubble Sort",
    description: "خوارزمية الترتيب الفقاعي (Bubble Sort).",
    code: `#include <iostream>
#include <algorithm>
using namespace std;

void bubb(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) { // If current is greater than next
                swap(arr[j], arr[j + 1]); // Swap them
            }
        }
    }
}

int main() {
    int arr[] = {60, 40, 50, 30, 10};
    int n = 5;
    
    bubb(arr, n);
    
    for(int i=0; i<n; i++) cout << arr[i] << " ";
    return 0;
}`
  },
  {
    title: "Lab 5: Stack Implementation",
    description: "تطبيق المكدس (Stack) باستخدام المصفوفات (LIFO).",
    code: `#include <iostream>
using namespace std;
#define SIZE 5

int stack[SIZE];
int top = -1;

void push(int value) {
    if (top == SIZE - 1)
        cout << "Stack Overflow\\n";
    else {
        top++;
        stack[top] = value;
    }
}

int pop() {
    if (top == -1) {
        cout << "Stack Underflow\\n";
        return -1;
    } else {
        return stack[top--];
    }
}

int peek() {
    if (top == -1) return -1;
    return stack[top];
}

int main() {
    push(10);
    push(20);
    
    cout << "Popped: " << pop() << endl; // Should print 20
    return 0;
}`
  },
  {
    title: "Lab 6: Queue Implementation",
    description: "تطبيق الطابور (Queue) باستخدام المصفوفات (FIFO).",
    code: `#include <iostream>
using namespace std;
#define SIZE 5

int queue[SIZE];
int front = -1, rear = -1;

void enqueue(int value) {
    if (rear == SIZE - 1)
        cout << "Queue is Full\\n";
    else {
        if (front == -1) front = 0; // Initialize front if empty
        rear++;
        queue[rear] = value;
    }
}

void dequeue() {
    if (front == -1 || front > rear)
        cout << "Queue is Empty\\n";
    else {
        cout << "Deleted: " << queue[front] << endl;
        front++;
    }
}

void display() {
    if (front == -1 || front > rear)
        cout << "Empty";
    else {
        for (int i = front; i <= rear; i++)
            cout << queue[i] << " ";
        cout << endl;
    }
}

int main() {
    enqueue(10);
    enqueue(20);
    
    dequeue(); // Removes 10
    display(); // Prints 20
    
    return 0;
}`
  }
],
  assignments: [
  { 
    title: "Assignment 1: Insertion Sort", 
    question: "اكتب برنامج لترتيب مصفوفة باستخدام خوارزمية الإقحام (Insertion Sort).", 
    solutionCode: `#include <iostream>
using namespace std;

// دالة الترتيب بالإقحام
void insertionSort(int arr[], int n) {
    int key, j;
    for (int i = 1; i < n; i++) {
        key = arr[i]; 
        j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << endl;
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);

    cout << "Original Array: \\n";
    printArray(arr, n);

    insertionSort(arr, n);

    cout << "Sorted Array: \\n";
    printArray(arr, n);

    return 0;
}` 
  },
  { 
    title: "Assignment 2: Circular Queue", 
    question: "اكتب برنامج لتطبيق الصف الدائري (Circular Queue) باستخدام المصفوفات.", 
    solutionCode: `#include <iostream>
using namespace std;
#define SIZE 5

int cQueue[SIZE];
int front = -1, rear = -1;

bool isFull() {
    if ((front == 0 && rear == SIZE - 1) || (front == rear + 1)) {
        return true;
    }
    return false;
}

bool isEmpty() {
    if (front == -1)
        return true;
    else
        return false;
}

void enqueue(int element) {
    if (isFull()) {
        cout << "Queue is full \\n";
    } else {
        if (front == -1) front = 0;
        rear = (rear + 1) % SIZE;
        cQueue[rear] = element;
        cout << "Inserted " << element << endl;
    }
}

void dequeue() {
    int element;
    if (isEmpty()) {
        cout << "Queue is empty \\n";
    } else {
        element = cQueue[front];
        if (front == rear) {
            front = -1;
            rear = -1;
        } else {
            front = (front + 1) % SIZE;
        }
        cout << "Deleted element -> " << element << endl;
    }
}

void display() {
    int i;
    if (isEmpty()) {
        cout << "Empty Queue \\n";
    } else {
        cout << "Front -> " << front << endl;
        cout << "Items -> ";
        for (i = front; i != rear; i = (i + 1) % SIZE)
            cout << cQueue[i] << " ";
        cout << cQueue[i];
        cout << endl;
        cout << "Rear -> " << rear << endl;
    }
}

int main() {
    enqueue(1);
    enqueue(2);
    enqueue(3);
    enqueue(4);
    enqueue(5);
    enqueue(6); // Full check
    display();
    dequeue();
    enqueue(7); // Circular check
    display();
    return 0;
}` 
  }
],
 }, { name: "Sys Analysis II", code: "IS202", lectures: [], videos: [], labs: [], assignments: [] }, { name: "File Management", code: "CS205", lectures: [], videos: [], labs: [], assignments: [] }, { name: "HCI", code: "IS203", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Operation Research", code: "MATH203", lectures: [
  { title: "Lec 1: Intro to OR", type: "pdf", link: "https://drive.google.com/file/d/1l0X6W9vEQXYAC7OOPFZS4Or-vUoSQtXc/view?usp=drivesdk", note: "بحوث العمليات واستخداماتها" },
  { title: "Lec 2: Decision Theory", type: "pdf", link: "https://drive.google.com/file/d/11GK2miG2z06Qj3suWEKO5IetBHZmqY-Y/view?usp=drivesdk", note: "نظرية اتخاذ القرار" },
  { title: "Lec 3: Certainty", type: "pdf", link: "https://drive.google.com/file/d/1oD53qJiGVwTwvo5rQIAQvrwG5aDMw4ZN/view?usp=drivesdk", note: "مفهوم التأكد" },
  { title: "Lec 4: Risk Concept", type: "pdf", link: "https://drive.google.com/file/d/1WoNVI9olEPu8TWhTaSm27QedBRBskn8Q/view?usp=drivesdk", note: "مفهوم المخاطرة" },
  { title: "Lec 5: Uncertainty", type: "pdf", link: "https://drive.google.com/file/d/1122gWEhHISqwDZ2PfS49klJNRARJfV2L/view?usp=drivesdk", note: "حالة عدم التأكد" },
  { title: "Lec 6: Linear Programming", type: "pdf", link: "https://drive.google.com/file/d/1dviTBA-sDyZp9MTvVG7M1-yO4SECQeFR/view?usp=drivesdk", note: "دالة الهدف والقيود" },
  { title: "Lec 7: Graphical Solution", type: "pdf", link: "https://drive.google.com/file/d/1luIg04jjI1WtxXH0TcnMJU-pJ8FE7qU3/view?usp=drivesdk", note: "طريقة الحل البياني" },
  { title: "Lec 8: Simplex Method", type: "pdf", link: "https://drive.google.com/file/d/155nAg3-jKQAjrfAKrtuPFxboyBYEDuYE/view?usp=drivesdk", note: "الطريقة البسيطة" }
],  videos: [], labs: [], assignments: [] }, { name: "Database I", code: "IS204", lectures: [], videos: [], labs: [], assignments: [] }] },
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
    <div className="hacker-card" style={{ marginTop: '16px', background: '#050505', minHeight: 'auto' }} dir="ltr">
      <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #333', paddingBottom: '8px', marginBottom: '8px' }}>
        <div className="flex items-center gap-2"><Terminal size={14} className="text-gold"/><span className="font-code text-gray-400 text-xs font-bold">{title}</span></div>
        <button onClick={handleCopy} className="badge pointer hover:bg-[#FFD54F] hover:text-black">{copied ? "COPIED" : "COPY"}</button>
      </div>
      <pre className="font-code" style={{ fontSize: '12px', overflowX: 'auto', color: '#abb2bf' }}>{code}</pre>
    </div>
  );
};

const SolutionViewer = ({ text, title }) => (
  <div className="hacker-card" style={{ marginTop: '16px', background: '#0a0a0a', textAlign: 'right', minHeight: 'auto' }}>
    <h5 className="font-cairo text-gold" style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14}/> {title}</h5>
    <p className="font-cairo text-gray-300" style={{ whiteSpace: 'pre-line' }}>{text}</p>
  </div>
);

/* =================================================================================
   AI ASSISTANT COMPONENT (TRANSLATOR & HELPER)
   ================================================================================= */
const AIAssistant = ({ data }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'أهلاً يا هندسة! 👋\nأنا مساعد CS PROMAX الذكي.\n\nبقدر أعمل ليك:\n1. ترجمة أي نص (اكتب طوالي).\n2. ترجمة المحاضرات (اكتب "ترجم لي محاضرة كذا").' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // 1. CHECK IF USER WANTS TO TRANSLATE A FILE (SMART SEARCH)
    const searchFile = input.toLowerCase();
    let foundFile = null;

    if (searchFile.includes("شيت") || searchFile.includes("محاضرة") || searchFile.includes("ملف") || searchFile.includes("lec")) {
       // Search in all semesters and subjects
       data.forEach(sem => {
         sem.subjects.forEach(sub => {
           sub.lectures.forEach(lec => {
             if (searchFile.includes(lec.title.toLowerCase()) || searchFile.includes(sub.code.toLowerCase())) {
               foundFile = lec;
             }
           });
         });
       });
    }

    if (foundFile) {
       // Generate Google Translate Link for the PDF
       const translateUrl = `https://translate.google.com/translate?sl=auto&tl=ar&u=${encodeURIComponent(foundFile.link)}`;
       
       setTimeout(() => {
         setMessages(prev => [...prev, { 
           id: Date.now()+1, 
           sender: 'bot', 
           text: `لقيت ليك المحاضرة: "${foundFile.title}" 📄\n\nاضغط الرابط ده عشان تترجمها للعربي طوالي:`,
           link: translateUrl 
         }]);
         setLoading(false);
       }, 1000);
       return;
    }

    // 2. TEXT TRANSLATION (FREE API)
    try {
      // Detect language roughly (if arabic chars > english) -> Translate to English, else to Arabic
      const isArabic = /[\u0600-\u06FF]/.test(userMsg.text);
      const targetLang = isArabic ? 'en' : 'ar';
      const sourceLang = isArabic ? 'ar' : 'en';

      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(userMsg.text)}&langpair=${sourceLang}|${targetLang}`);
      const result = await response.json();
      
      const translatedText = result.responseData.translatedText;

      setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: translatedText }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: 'معليش، حصل خطأ في الاتصال بالسيرفر. حاول تاني.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[600px] flex flex-col dark-panel overflow-hidden border-2 border-gold">
       {/* Header */}
       <div className="p-4 bg-black/50 border-b border-[#333] flex items-center gap-3">
         <div className="p-2 rounded-full bg-[#FFD54F]/20 border border-[#FFD54F]"><Bot size={24} className="text-gold"/></div>
         <div><h3 className="font-cairo text-white font-bold">المساعد الذكي</h3><span className="text-green-500 text-xs font-code">● ONLINE</span></div>
       </div>

       {/* Chat Area */}
       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
         {messages.map((msg) => (
           <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
             <div className={`max-w-[80%] p-3 rounded-xl font-cairo text-sm whitespace-pre-wrap ${
               msg.sender === 'user' 
                 ? 'bg-[#333] text-white rounded-br-none' 
                 : 'bg-[#FFD54F] text-black rounded-bl-none font-bold'
             }`}>
               {msg.text}
               {msg.link && (
                 <a href={msg.link} target="_blank" rel="noreferrer" className="block mt-2 px-3 py-1 bg-black text-white rounded text-xs text-center no-underline hover:bg-gray-800">
                   فتح الترجمة 🔗
                 </a>
               )}
             </div>
           </div>
         ))}
         {loading && <div className="text-gray-500 text-xs text-center font-code animate-pulse">TRANSLATING...</div>}
         <div ref={chatEndRef} />
       </div>

       {/* Input Area */}
       <div className="p-4 bg-black/50 border-t border-[#333] flex gap-2">
         <input 
           value={input}
           onChange={(e) => setInput(e.target.value)}
           onKeyPress={(e) => e.key === 'Enter' && handleSend()}
           placeholder="اكتب نص للترجمة أو اسم محاضرة..." 
           className="hacker-input"
           style={{borderRadius:'50px', padding:'10px 20px'}}
         />
         <button onClick={handleSend} className="p-3 bg-[#FFD54F] rounded-full hover:scale-110 transition"><Send size={20} color="black"/></button>
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
      <div className="hacker-card animate-entry" style={{ width: '100%', maxWidth: '400px', padding: '32px', borderTop: '4px solid #FFD54F' }}>
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
export default function CsProMaxV28() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [activeSem, setActiveSem] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

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
            <div className="app-container nav-inner">
              <div className="flex items-center gap-2 pointer" onClick={() => setView('home')}>
                 <div style={{ background: '#000', padding: '6px', borderRadius: '6px', border: '1px solid #FFD54F' }}><Terminal size={20} className="text-gold"/></div>
                 <div><h1 className="font-cairo text-white" style={{ fontSize: '18px', fontWeight: 'bold' }}>CS PROMAX</h1><span className="font-code" style={{ fontSize: '10px', color: '#888' }}>BATCH 21</span></div>
              </div>
              <div className="hidden md-block relative" style={{ width: '350px' }}>
                 <input type="text" placeholder="بحث..." className="hacker-input" style={{ padding: '8px 35px 8px 12px', fontSize: '0.9rem' }} onChange={e => { setSearch(e.target.value); if(e.target.value) setView('home'); }} />
                 <Search className="absolute" style={{ right: '10px', top: '10px', color: '#666', pointerEvents: 'none' }} size={16}/>
              </div>
              <div className="flex items-center gap-3">
                
 <div style={{ textAlign: 'right', display: window.innerWidth < 600 ? 'none' : 'block' }}><div className="text-gold font-cairo" style={{ fontSize: '0.8rem' }}>{user.name}</div></div>
                 <button onClick={logout} style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', padding: '8px', borderRadius: '50%', color: '#ff4444', cursor: 'pointer' }}><LogOut size={18}/></button>
              </div>
            </div>
            {showSearch && (
              <div className="app-container md-hidden animate-entry" style={{ marginTop: '0', paddingTop: '0' }}>
                <input autoFocus type="text" placeholder="ابحث عن مادة..." className="hacker-input" onChange={(e) => { setSearchTerm(e.target.value); if(e.target.value) setView('home'); }} />
              </div>
<button onClick={() => setView('ai')} className="btn-gold btn-outline" style={{width:'auto', padding:'6px 12px', fontSize:'12px', display:'flex', gap:'5px'}}>
   <Bot size={14}/> المترجم
</button>

            )}
          </nav>

          <main className="app-container">
            {view !== 'home' && (
              <div className="flex items-center gap-2 font-code" style={{ marginBottom: '20px', color: '#888', fontSize: '14px' }}>
                <span onClick={() => setView('home')} className="pointer hover:text-gold transition">HOME</span> <ChevronRight size={14}/>
                {activeSem && <span onClick={() => setView('subjects')} className={`pointer hover:text-gold ${view === 'subjects' ? 'text-gold' : ''}`}>{activeSem.title.split(' ')[0]}</span>}
                {activeSub && view === 'content' && <><ChevronRight size={14}/><span className="text-gold">{activeSub.code}</span></>}
              </div>
            )}

            {view === 'home' && (
              <div className="grid-layout animate-entry">
                {filtered.map(sem => (
                  <div key={sem.id} onClick={() => { setActiveSem(sem); setView('subjects'); }} className="hacker-card pointer">
                    <div className="card-icon-bg"><Layers size={100} /></div>
                    <div>
                      <span className="badge">{sem.year}</span>
                      <h2 className="font-cairo text-white" style={{ fontSize: '20px', marginTop: '10px' }}>{sem.title}</h2>
                    </div>
                    <div className="flex items-center gap-2" style={{ fontSize: '12px', color: '#888' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFD54F' }}></div> {sem.subjects.length} MODULES</div>
                  </div>
                ))}
              </div>
            )}
            {/* AI BOT VIEW */}
            {view === 'ai' && (
               <div className="animate-entry">
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-black text-white font-cairo">المترجم الذكي</h2>
                    <p className="text-[#FFD54F] font-code text-xs">AI_TRANSLATION_MODULE</p>
                  </div>
                  {/* بنمرر الداتا للبوت عشان يقدر يفتش فيها */}
                  <AIAssistant data={initialData} />
               </div>
            )}


            {view === 'subjects' && activeSem && (
              <div className="grid-layout animate-entry">
                {activeSem.subjects.map((sub, i) => (
                  <div key={i} onClick={() => { setActiveSub(sub); setView('content'); }} className="hacker-card pointer">
                    <div className="flex justify-between" style={{ marginBottom: '10px' }}><Code size={20} color="#666"/> <span className="font-code text-gray-500" style={{ fontSize: '12px' }}>{sub.code}</span></div>
                    <h3 className="font-cairo text-white" style={{ fontSize: '18px', fontWeight: 'bold' }}>{sub.name}</h3>
                  </div>
                ))}
              </div>
            )}

            {view === 'content' && activeSub && (
              <div className="animate-entry">
                <div className="hacker-card" style={{ padding: '24px', marginBottom: '24px', minHeight: 'auto' }}>
                  <div className="flex justify-between items-start">
                    <div><span className="font-code text-gold" style={{ fontSize: '14px' }}>{activeSub.code}</span><h1 className="font-cairo text-white" style={{ fontSize: '24px', fontWeight: 'bold' }}>{activeSub.name}</h1></div>
                    <Cpu size={40} style={{ opacity: 0.2, color: '#FFD54F' }} />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Lectures */}
                  <div className="hacker-card" style={{ minHeight: 'auto' }}>
                    <h3 className="font-cairo text-white flex items-center gap-2" style={{ marginBottom: '16px', fontWeight: 'bold' }}><FileText className="text-gold"/> المحاضرات</h3>
                    {activeSub.lectures.length > 0 ? (
                      <div className="grid-layout">
                        {activeSub.lectures.map((lec, i) => (
                          <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                            <div style={{ marginBottom: '10px' }}><strong className="text-white block">{lec.title}</strong><span style={{ fontSize: '12px', color: '#888' }}>{lec.note}</span></div>
                            <a href={lec.link} target="_blank" className="btn-gold btn-outline">تحميل PDF</a>
                          </div>
                        ))}
                      </div>
                    ) : <p className="text-center text-gray-500 font-code">NO DATA</p>}
                  </div>

                  {/* Videos */}
                  <div className="hacker-card" style={{ minHeight: 'auto', borderLeft: '4px solid #ff4444' }}>
                     <h3 className="font-cairo text-white flex items-center gap-2" style={{ marginBottom: '16px', fontWeight: 'bold' }}><Video style={{color:'#ff4444'}}/> الفيديوهات</h3>
                     {activeSub.videos.length > 0 ? (
                        <div className="grid-layout">
                          {activeSub.videos.map((vid, i) => (
                            <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                              <div style={{ marginBottom: '10px' }}><strong className="text-white block">{vid.title}</strong><span style={{ fontSize: '12px', color: '#888' }}>{vid.duration}</span></div>
                              <a href={vid.link} target="_blank" className="btn-gold btn-red">مشاهدة</a>
                            </div>
                          ))}
                        </div>
                     ) : <p className="text-center text-gray-500 font-code">NO VIDEOS</p>}
                  </div>
                  
                     {/* Labs & Assignments */}
                  <div className="hacker-card" style={{ minHeight: 'auto', borderLeft: '4px solid #4CAF50' }}>
                     <h3 className="font-cairo text-white flex items-center gap-2" style={{ marginBottom: '16px', fontWeight: 'bold' }}><Save style={{color:'#4CAF50'}}/> التكاليف والمعمل</h3>
                     {activeSub.assignments.length > 0 || activeSub.labs.length > 0 ? (
                        <div>
                          {activeSub.labs.map((lab, i) => (
                             <div key={i} className="mb-8"><h4 className="font-cairo text-white mb-2">{lab.title}</h4><CodeViewer code={lab.code} title="source.cpp" /></div>
                          ))}
                          {activeSub.assignments.map((assign, i) => (
                             <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                                <h4 className="font-cairo text-white mb-2">{assign.title}</h4>
                                <p className="font-cairo text-[#ccc] bg-[#000] p-3 rounded mb-4">{assign.question}</p>
                                {assign.solutionCode && <CodeViewer code={assign.solutionCode} title="Solution" />}
                                {assign.solutionText && <SolutionViewer text={assign.solutionText} title="الإجابة" />}
                             </div>
                          ))}
                        </div>
                     ) : <p className="text-center text-gray-500 font-code">NO ASSIGNMENTS</p>}
                  </div>
                </div>
              </div>               
            )}
          </main>

          <footer className="hacker-card" style={{ marginTop: 'auto', borderRadius: '0', borderLeft: '0', borderRight: '0', textAlign: 'center' }}>
            <p className="text-gold font-bold">CS PROMAX</p>
            <p className="font-code text-gray-500 text-xs">SECURE_SYSTEM_V28.0</p>
          </footer>
        </>
      )}
    </div>
  );
}


