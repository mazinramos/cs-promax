import React, { useState, useEffect, useRef } from 'react';
import { Layers, Book, Lock, User, Mail, Code, Terminal, Search, LogOut, Play, ChevronRight, Save, Cpu, Wifi, Shield, Database, Video, FileText, PenTool, Check, Menu, X } from 'lucide-react';

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
 videos: [], labs: [], assignments: [] },
      { name: "Linear Algebra", code: "MATH202", lectures: [{ title: "Full Course", type: "pdf", link: "https://drive.google.com/file/d/1N50ZtpnDzMFjRrU6mxXWHEP5JuPtaI1v/view?usp=drivesdk", note: "مقرر الجبر الخطي شامل" }], videos: [], labs: [], assignments: [] },
      { name: "Prog. Methods II", code: "CS201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Sys Analysis I", code: "IS201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Comm. Skills", code: "GEN201", lectures: [], videos: [], labs: [], assignments: [] },
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
 videos: [], labs: [], assignments: [] }
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
 labs: [], assignments: [{ title: "OOP Task 1", question: "Create Student class", solutionCode: `class Student { int id; }` }] }, { name: "Data Structures", code: "CS204", lectures: [
  { title: "Full Course Notes", type: "pdf", link: "https://drive.google.com/file/d/1IzoPr5I7YRlMi2Ei8ghphgFjeeb819zn/view?usp=drivesdk", note: "مقرر هياكل البيانات" }
], videos: [], labs: [
  {
    title: "Lab 1: Insertion Sort",
    description: "كود خوارزمية الترتيب بالإقحام (Insertion Sort) مع شرح الخطوات.",
    code: `#include <iostream>
using namespace std;

// Function to perform Insertion Sort
void insertionSort(int arr[], int n) {
    int key, j;
    for (int i = 1; i < n; i++) {
        key = arr[i]; // The card in our hand
        j = i - 1;

        // Move elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        // Place key in correct position
        arr[j + 1] = key;
    }
}

// Function to print array
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
    title: "Lab 2: Circular Queue",
    description: "تطبيق الصف الدائري (Circular Queue) باستخدام المصفوفات.",
    code: `#include <iostream>
using namespace std;
#define SIZE 5

int cQueue[SIZE];
int front = -1, rear = -1;

// Check if Queue is Full
bool isFull() {
    if ((front == 0 && rear == SIZE - 1) || (front == rear + 1)) {
        return true;
    }
    return false;
}

// Check if Queue is Empty
bool isEmpty() {
    if (front == -1)
        return true;
    else
        return false;
}

// Add Element (Enqueue)
void enqueue(int element) {
    if (isFull()) {
        cout << "Queue is full \\n";
    } else {
        if (front == -1) front = 0; // Set front if empty
        
        // Circular increment
        rear = (rear + 1) % SIZE;
        cQueue[rear] = element;
        cout << "Inserted " << element << endl;
    }
}

// Remove Element (Dequeue)
void dequeue() {
    int element;
    if (isEmpty()) {
        cout << "Queue is empty \\n";
    } else {
        element = cQueue[front];
        
        // If last element, reset pointers
        if (front == rear) {
            front = -1;
            rear = -1;
        } 
        // Circular decrement
        else {
            front = (front + 1) % SIZE;
        }
        cout << "Deleted element -> " << element << endl;
    }
}

// Display Queue
void display() {
    int i;
    if (isEmpty()) {
        cout << "Empty Queue \\n";
    } else {
        cout << "Front -> " << front << endl;
        cout << "Items -> ";
        
        // Loop smartly for circular nature
        for (i = front; i != rear; i = (i + 1) % SIZE)
            cout << cQueue[i] << " ";
        cout << cQueue[i]; // Print last element
        cout << endl;
        cout << "Rear -> " << rear << endl;
    }
}

int main() {
    // Testing Enqueue
    enqueue(1);
    enqueue(2);
    enqueue(3);
    enqueue(4);
    enqueue(5);

    // Testing Full Condition
    enqueue(6);

    display();

    // Testing Dequeue (Circular Proof)
    dequeue();
    
    // Now we can insert again (Circular property)
    enqueue(7); 

    display();

    return 0;
}`
  }
],
  assignments: [] }, { name: "Sys Analysis II", code: "IS202", lectures: [], videos: [], labs: [], assignments: [] }, { name: "File Management", code: "CS205", lectures: [], videos: [], labs: [], assignments: [] }, { name: "HCI", code: "IS203", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Operation Research", code: "MATH203", lectures: [
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
                {/* HEADER (اسم المادة والكود) - زي ما هو */}
                <div className="dark-panel p-6 mb-8 flex justify-between items-start relative overflow-hidden">
                  <div>
                     <span className="font-code text-gold text-sm badge mb-2">{activeSub.code}</span>
                     <h1 className="font-cairo text-white text-3xl font-black">{activeSub.name}</h1>
                  </div>
                  <Cpu size={60} style={{ opacity: 0.1, color: '#FFD54F', position:'absolute', left:'20px', top:'50%', transform:'translateY(-50%)' }} />
                </div>

                <div className="flex flex-col gap-10">
                  
                  {/* ================= SECTON 1: LECTURES (كروت فردية) ================= */}
                  <section>
                    <h3 className="font-cairo text-white text-xl font-bold mb-4 flex items-center gap-2 px-2 border-r-4 border-[#FFD54F]"><FileText className="text-gold"/> المحاضرات</h3>
                    {activeSub.lectures.length > 0 ? (
                      <div className="grid-system">
                        {activeSub.lectures.map((lec, i) => (
                          // هنا التغيير: الكارت بقا جوه اللوب
                          <div key={i} className="dark-panel p-5 clickable pointer flex flex-col justify-between relative overflow-hidden group" style={{minHeight: '160px'}}>
                            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity"><FileText size={40} className="text-gold"/></div>
                            <div className="mb-4 relative z-10">
                               <strong className="text-white block font-cairo text-lg mb-1">{lec.title}</strong>
                               <span className="font-code text-gray-500 text-xs">{lec.note}</span>
                            </div>
                            <a href={lec.link} target="_blank" rel="noopener noreferrer" className="btn-gold btn-outline relative z-10 hover:scale-105 transition-transform">
                               {lec.type === 'pptx' ? 'تحميل عرض (PPTX)' : 'تحميل PDF'}
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : <div className="dark-panel p-6 text-center opacity-50 font-code">NO_LECTURES_FOUND</div>}
                  </section>

                  {/* ================= SECTON 2: VIDEOS (كروت حمراء مميزة) ================= */}
                  <section>
                     <h3 className="font-cairo text-white text-xl font-bold mb-4 flex items-center gap-2 px-2 border-r-4 border-[#ff4444]"><Video style={{color:'#ff4444'}}/> الفيديوهات</h3>
                     {activeSub.videos.length > 0 ? (
                        <div className="grid-system">
                          {activeSub.videos.map((vid, i) => (
                            // ستايل خاص جداً للفيديوهات باللون الأحمر
                            <div key={i} className="p-5 rounded-xl clickable pointer flex flex-col justify-between relative overflow-hidden group" 
                                 style={{ 
                                     background: 'linear-gradient(145deg, rgba(40,0,0,0.9), rgba(20,0,0,0.95))', // خلفية حمراء داكنة
                                     border: '1px solid #ff4444', // حدود حمراء
                                     boxShadow: '0 4px 15px rgba(255, 0, 0, 0.15)', // ضل أحمر خفيف
                                     minHeight: '160px'
                                 }}>
                              {/* أيقونة تشغيل خلفية */}
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity scale-150">
                                  <Play size={80} color="#ff4444" fill="#ff4444" />
                              </div>
                              
                              <div className="mb-4 relative z-10">
                                 <strong className="text-white block font-cairo text-lg mb-1">{vid.title}</strong>
                                 <span className="font-code text-gray-400 text-xs flex items-center gap-1"><Play size={12}/> {vid.duration}</span>
                              </div>
                              {/* زر المشاهدة الأحمر الفاقع */}
                              <a href={vid.link} target="_blank" rel="noopener noreferrer" className="block w-full text-center font-bold py-3 rounded-lg relative z-10 hover:scale-105 transition-transform"
                                 style={{ background: '#ff4444', color: '#fff', boxShadow: '0 0 20px rgba(255,0,0,0.4)', fontFamily: 'Cairo' }}>
                                 مشاهدة الفيديو الآن
                              </a>
                            </div>
                          ))}
                        </div>
                     ) : <div className="dark-panel p-6 text-center opacity-50 font-code" style={{borderLeft:'4px solid #ff4444'}}>NO_VIDEOS_UPLOADED</div>}
                  </section>
                  
                  {/* ================= SECTON 3: LABS (كروت فردية) ================= */}
                  <section>
                     <h3 className="font-cairo text-white text-xl font-bold mb-4 flex items-center gap-2 px-2 border-r-4 border-[#448AFF]"><Terminal style={{color:'#448AFF'}}/> المعمل (Labs)</h3>
                     {activeSub.labs.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {activeSub.labs.map((lab, i) => (
                             <div key={i} className="dark-panel p-5" style={{ borderLeft: '4px solid #448AFF' }}>
                                <h4 className="font-cairo text-white text-lg font-bold mb-3 flex items-center gap-2"><Code size={16} className="text-blue-400"/> {lab.title}</h4>
                                {lab.type === 'file' ? (
                                    <div className="bg-black/50 p-4 rounded-lg border border-blue-900/50 flex justify-between items-center">
                                        <span className="text-gray-400 text-sm font-code">{lab.description}</span>
                                        <a href={lab.link} target="_blank" rel="noopener noreferrer" className="badge hover:bg-[#448AFF] hover:text-white pointer" style={{ borderColor: '#448AFF', color: '#448AFF', padding: '8px 16px', textDecoration: 'none' }}>Download {lab.fileType}</a>
                                    </div>
                                ) : (
                                    <CodeViewer code={lab.code} title="source_code.cpp" />
                                )}
                             </div>
                          ))}
                        </div>
                     ) : <div className="dark-panel p-6 text-center opacity-50 font-code" style={{borderLeft:'4px solid #448AFF'}}>NO_LABS_DATA</div>}
                  </section>

                  {/* ================= SECTON 4: ASSIGNMENTS (كروت فردية) ================= */}
                  <section>
                     <h3 className="font-cairo text-white text-xl font-bold mb-4 flex items-center gap-2 px-2 border-r-4 border-[#4CAF50]"><Save style={{color:'#4CAF50'}}/> التكاليف (Assignments)</h3>
                     {activeSub.assignments.length > 0 ? (
                        <div className="flex flex-col gap-6">
                          {activeSub.assignments.map((assign, i) => (
                             <div key={i} className="dark-panel p-6 relative overflow-hidden" style={{ borderLeft: '4px solid #4CAF50' }}>
                                <div className="absolute top-0 right-0 p-4 opacity-5"><Check size={50} color="#4CAF50"/></div>
                                
                                <h4 className="font-cairo text-white text-xl font-bold mb-3">{assign.title}</h4>
                                <div className="bg-black/80 p-4 rounded-lg border-r-2 border-[#4CAF50] mb-4">
                                   <p className="font-cairo text-gray-300 leading-relaxed">{assign.question}</p>
                                </div>
                                
                                {/* محتويات الحل المختلفة */}
                                <div className="flex flex-col gap-4 relative z-10">
                                    {assign.fileLink && <a href={assign.fileLink} target="_blank" rel="noopener noreferrer" className="btn-gold btn-outline" style={{ borderColor: '#4CAF50', color: '#4CAF50', width:'fit-content' }}>📎 تحميل الملف المرفق ({assign.fileType || 'File'})</a>}
                                    {assign.solutionCode && <CodeViewer code={assign.solutionCode} title="Solution Code" />}
                                    {assign.solutionText && <SolutionViewer text={assign.solutionText} title="الإجابة النموذجية" />}
                                    {assign.imageLink && <div className="rounded-lg overflow-hidden border border-[#333] mt-2"><img src={assign.imageLink} alt="Solution" className="w-full block" /></div>}
                                </div>
                             </div>
                          ))}
                        </div>
                     ) : <div className="dark-panel p-6 text-center opacity-50 font-code" style={{borderLeft:'4px solid #4CAF50'}}>NO_ASSIGNMENTS_PENDING</div>}
                  </section>
                </div>
              </div>
            )}


