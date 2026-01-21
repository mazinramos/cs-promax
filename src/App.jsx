import React, { useState, useEffect, useRef } from 'react';
import { Layers, Book, Lock, User, Mail, Code, Terminal, Search, LogOut, Play, ChevronRight, Save, Cpu, Wifi, Shield, Database, Video, FileText, PenTool, Check, Menu, X } from 'lucide-react';

/* =================================================================================
   1. DATA & LOGIC
   ================================================================================= */
const initialData = [
  { id: 1, title: "Semester 01", year: "Freshman", subjects: [{ name: "Intro to CS", code: "CS100", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Basic Mathematics", code: "MATH100", lectures: [], videos: [], labs: [], assignments: [] }, { name: "English I", code: "ENG101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Arabic I", code: "ARB101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Physics", code: "PHY101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Religious Culture", code: "REL101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Prog. Fundamentals", code: "CS102", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 2, title: "Semester 02", year: "Freshman", subjects: [{ name: "Arabic II", code: "ARB102", lectures: [], videos: [], labs: [], assignments: [] }, { name: "English II", code: "ENG102", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Religious Culture II", code: "REL102", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Calculus I", code: "MATH101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Prog. Methods I", code: "CS103", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Sudanese Studies", code: "SUD101", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Discrete Math", code: "MATH102", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 3, title: "Semester 03", year: "Sophomore", subjects: [
      { name: "Calculus II", code: "MATH201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Statistics", code: "STAT201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Linear Algebra", code: "MATH202", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Prog. Methods II", code: "CS201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Sys Analysis I", code: "IS201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Comm. Skills", code: "GEN201", lectures: [], videos: [], labs: [], assignments: [] },
      { name: "Digital Design", code: "CS202", lectures: [], videos: [], labs: [], assignments: [] }
  ]},
  { id: 4, title: "Semester 04", year: "Sophomore", subjects: [{ name: "Object Oriented Prog.", code: "CS203", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Data Structures", code: "CS204", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Database I", code: "IS204", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Sys Analysis II", code: "IS202", lectures: [], videos: [], labs: [], assignments: [] }, { name: "File Management", code: "CS205", lectures: [], videos: [], labs: [], assignments: [] }, { name: "HCI", code: "IS203", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Operation Research", code: "MATH203", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 5, title: "Semester 05", year: "Junior", subjects: [{ name: "Internet Tech I", code: "IT301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Computer Networks", code: "CN301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Database II", code: "IS301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Algorithms", code: "CS301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Visual Prog.", code: "CS302", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Microprocessors", code: "CS303", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Software Eng I", code: "SE301", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 6, title: "Semester 06", year: "Junior", subjects: [{ name: "Internet Tech II", code: "IT302", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Computer Arch.", code: "CS304", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Operating Systems", code: "CS305", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Research Meth.", code: "GEN301", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Software Eng II", code: "SE302", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Computer Graphics", code: "CS306", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Distributed DB", code: "IS302", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 7, title: "Semester 07", year: "Senior", subjects: [{ name: "Prog. Concepts", code: "CS401", lectures: [], videos: [], labs: [], assignments: [] }, { name: "AI", code: "CS402", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Simulation", code: "CS403", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Elective Course I", code: "EL401", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Elective Course II", code: "EL402", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Project I", code: "PROJ1", lectures: [], videos: [], labs: [], assignments: [] }] },
  { id: 8, title: "Semester 08", year: "Senior", subjects: [{ name: "Ethical Issues", code: "GEN401", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Networks Security", code: "CN401", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Wireless Comp.", code: "CN402", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Prog. Concepts II", code: "CS404", lectures: [], videos: [], labs: [], assignments: [] }, { name: "Project II", code: "PROJ2", lectures: [], videos: [], labs: [], assignments: [] }] }
];

/* --- INLINE STYLES FOR SAFETY --- */
const styles = {
  appContainer: {
    backgroundColor: '#000000',
    color: '#e0e0e0',
    minHeight: '100vh',
    fontFamily: '"Cairo", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    direction: 'rtl',
    position: 'relative',
    overflowX: 'hidden',
  },
  matrix: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    borderBottom: '1px solid #3E2723',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    backdropFilter: 'blur(10px)',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '10px',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  logoIcon: {
    background: '#000',
    border: '1px solid #FFD54F',
    borderRadius: '8px',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchArea: {
    flex: 1,
    maxWidth: '400px',
    position: 'relative',
    margin: '0 10px',
  },
  input: {
    width: '100%',
    backgroundColor: '#080808',
    border: '1px solid #333',
    color: '#fff',
    padding: '10px 40px 10px 15px',
    borderRadius: '8px',
    fontFamily: 'inherit',
    fontSize: '14px',
  },
  main: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '20px 16px',
    flex: 1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'rgba(18, 18, 18, 0.95)',
    border: '1px solid rgba(255, 213, 79, 0.15)',
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '180px',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHover: {
    transform: 'translateY(-4px)',
    borderColor: 'rgba(255, 213, 79, 0.5)',
  },
  headerPanel: {
    backgroundColor: 'rgba(18, 18, 18, 0.95)',
    border: '1px solid rgba(255, 213, 79, 0.15)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    position: 'relative',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRight: '4px solid #FFD54F',
    paddingRight: '12px',
  },
  itemRow: {
    backgroundColor: 'rgba(12, 12, 12, 0.8)',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  btn: {
    backgroundColor: '#FFD54F',
    color: '#000',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
  },
  loginCard: {
    maxWidth: '400px',
    width: '100%',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: 'rgba(18, 18, 18, 0.95)',
    borderTop: '4px solid #FFD54F',
    borderRadius: '12px',
    textAlign: 'center',
  }
};

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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.98 ? '#FFD54F' : '#1a1a1a';
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > canvas.height && Math.random() > 0.98) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 50);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={styles.matrix} />;
};

/* =================================================================================
   3. COMPONENTS
   ================================================================================= */
const LoginScreen = ({ onLogin }) => {
  const [data, setData] = useState({ name: '', email: '', secret: '' });
  const [error, setError] = useState('');
  return (
    <div style={{ ...styles.contentWrapper, justifyContent: 'center' }}>
      <div style={styles.loginCard}>
        <div style={{ marginBottom: '24px' }}>
          <Shield size={40} color="#FFD54F" style={{ margin: '0 auto 10px' }} />
          <h1 style={{ color: '#fff', margin: 0 }}>CS PROMAX</h1>
          <p style={{ color: '#FFD54F', fontSize: '12px', letterSpacing: '2px' }}>SECURE LOGIN</p>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (data.secret !== 'NRU@Cs@21') return setError('الكود السري غير صحيح');
          onLogin(data);
        }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input required placeholder="الاسم الثلاثي" style={styles.input} onChange={e => setData({...data, name: e.target.value})} />
          <input required type="email" placeholder="البريد الإلكتروني" style={styles.input} onChange={e => setData({...data, email: e.target.value})} />
          <input required type="password" placeholder="الكود السري" style={{...styles.input, letterSpacing: '4px'}} onChange={e => setData({...data, secret: e.target.value})} />
          {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
          <button style={{...styles.btn, width: '100%'}}>تسجيل الدخول</button>
        </form>
      </div>
    </div>
  );
};

/* =================================================================================
   4. MAIN APP
   ================================================================================= */
export default function CsProMaxV26() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [activeSem, setActiveSem] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { const u = localStorage.getItem('cs_promax_v26'); if(u) setUser(JSON.parse(u)); }, []);
  const login = (u) => { setUser(u); localStorage.setItem('cs_promax_v26', JSON.stringify(u)); };
  const logout = () => { localStorage.removeItem('cs_promax_v26'); setUser(null); setView('home'); };

  const filtered = initialData.map(s => ({
    ...s, subjects: s.subjects.filter(sub => sub.name.toLowerCase().includes(search.toLowerCase()) || sub.code.toLowerCase().includes(search.toLowerCase()))
  })).filter(s => s.subjects.length > 0);

  if (!user) return <div style={styles.appContainer}><InteractiveMatrix /><LoginScreen onLogin={login} /></div>;

  return (
    <div style={styles.appContainer}>
      <InteractiveMatrix />
      <div style={styles.contentWrapper}>
        <nav style={styles.navbar}>
          <div style={styles.navContainer}>
            <div style={styles.logoArea} onClick={() => setView('home')}>
              <div style={styles.logoIcon}><Terminal size={20} color="#FFD54F"/></div>
              <div>
                <h1 style={{ color: '#fff', fontSize: '1.2rem', margin: 0, fontWeight: 'bold' }}>CS PROMAX</h1>
                <span style={{ color: '#888', fontSize: '0.7rem' }}>BATCH 21 & 22</span>
              </div>
            </div>
            <div style={styles.searchArea}>
              <input placeholder="بحث عن مادة..." style={styles.input} onChange={e => { setSearch(e.target.value); if(e.target.value) setView('home'); }} />
              <Search size={16} color="#666" style={{ position: 'absolute', right: '12px', top: '12px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right', display: window.innerWidth < 600 ? 'none' : 'block' }}>
                <div style={{ color: '#FFD54F', fontSize: '0.9rem', fontWeight: 'bold' }}>{user.name}</div>
                <div style={{ color: '#888', fontSize: '0.7rem' }}>{user.email}</div>
              </div>
              <button onClick={logout} style={{ background: 'none', border: '1px solid #555', borderRadius: '50%', padding: '8px', cursor: 'pointer', color: '#ff4444' }}><LogOut size={16}/></button>
            </div>
          </div>
        </nav>

        <main style={styles.main}>
          {view !== 'home' && (
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#888' }}>
              <span onClick={() => setView('home')} style={{ cursor: 'pointer', color: '#FFD54F' }}>الرئيسية</span> <ChevronRight size={14}/>
              {activeSem && <span onClick={() => setView('subjects')} style={{ cursor: 'pointer', color: view === 'subjects' ? '#FFD54F' : 'inherit' }}>{activeSem.title}</span>}
              {activeSub && view === 'content' && <><ChevronRight size={14}/><span style={{ color: '#FFD54F' }}>{activeSub.code}</span></>}
            </div>
          )}

          {view === 'home' && (
            <div style={styles.grid}>
              {filtered.map(sem => (
                <div key={sem.id} style={styles.card} onClick={() => { setActiveSem(sem); setView('subjects'); }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#FFD54F', border: '1px solid #FFD54F', padding: '2px 6px', borderRadius: '4px' }}>{sem.year}</span>
                    <h2 style={{ color: '#fff', marginTop: '10px', fontSize: '1.5rem' }}>{sem.title}</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#888', marginTop: '20px' }}>
                    <Layers size={14} /> {sem.subjects.length} مواد
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === 'subjects' && activeSem && (
            <>
              <h2 style={{ color: '#fff', marginBottom: '20px', borderRight: '4px solid #FFD54F', paddingRight: '12px' }}>{activeSem.title}</h2>
              <div style={styles.grid}>
                {activeSem.subjects.map((sub, i) => (
                  <div key={i} style={styles.card} onClick={() => { setActiveSub(sub); setView('content'); }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Code size={24} color="#666" />
                      <span style={{ fontSize: '12px', color: '#888' }}>{sub.code}</span>
                    </div>
                    <h3 style={{ color: '#fff', marginTop: '12px' }}>{sub.name}</h3>
                  </div>
                ))}
              </div>
            </>
          )}

          {view === 'content' && activeSub && (
            <>
              <div style={styles.headerPanel}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: '#FFD54F', fontSize: '14px', fontWeight: 'bold' }}>{activeSub.code}</span>
                    <h1 style={{ color: '#fff', margin: '4px 0' }}>{activeSub.name}</h1>
                  </div>
                  <Cpu size={40} color="#3E2723" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <section>
                  <div style={styles.sectionTitle}><FileText size={20} color="#FFD54F"/> المحاضرات</div>
                  {activeSub.lectures.length > 0 ? activeSub.lectures.map((item, i) => (
                    <div key={i} style={styles.itemRow}>
                      <div>
                        <strong style={{ color: '#fff', display: 'block' }}>{item.title}</strong>
                        <small style={{ color: '#888' }}>{item.note}</small>
                      </div>
                      <a href={item.link} target="_blank" rel="noreferrer" style={styles.btn}>تحميل PDF</a>
                    </div>
                  )) : <div style={{ textAlign: 'center', color: '#666', padding: '20px', border: '1px dashed #333', borderRadius: '8px' }}>لا توجد محاضرات</div>}
                </section>

                <section>
                  <div style={styles.sectionTitle}><Video size={20} color="#ff4444"/> الفيديوهات</div>
                  {activeSub.videos.length > 0 ? activeSub.videos.map((item, i) => (
                    <div key={i} style={{ ...styles.itemRow, borderLeft: '4px solid #ff4444' }}>
                      <div>
                        <strong style={{ color: '#fff', display: 'block' }}>{item.title}</strong>
                        <small style={{ color: '#888' }}>{item.duration}</small>
                      </div>
                      <a href={item.link} target="_blank" rel="noreferrer" style={{ ...styles.btn, backgroundColor: '#ff4444', color: '#fff' }}>مشاهدة</a>
                    </div>
                  )) : <div style={{ textAlign: 'center', color: '#666', padding: '20px', border: '1px dashed #333', borderRadius: '8px' }}>لا توجد فيديوهات</div>}
                </section>

                <section>
                  <div style={styles.sectionTitle}><Save size={20} color="#4CAF50"/> التكاليف</div>
                  {activeSub.assignments.length > 0 ? activeSub.assignments.map((item, i) => (
                    <div key={i} style={{ ...styles.itemRow, borderLeft: '4px solid #4CAF50' }}>
                      <strong style={{ color: '#fff' }}>{item.title}</strong>
                      <p style={{ color: '#ccc', fontSize: '14px', background: '#000', padding: '10px', borderRadius: '4px' }}>{item.question}</p>
                      {item.solutionCode && <pre style={{ direction: 'ltr', background: '#111', color: '#aaffaa', padding: '10px', overflowX: 'auto', borderRadius: '4px', fontSize: '12px' }}>{item.solutionCode}</pre>}
                      {item.solutionText && <p style={{ color: '#aaffaa', fontSize: '14px' }}>الإجابة: {item.solutionText}</p>}
                    </div>
                  )) : <div style={{ textAlign: 'center', color: '#666', padding: '20px', border: '1px dashed #333', borderRadius: '8px' }}>لا توجد تكاليف</div>}
                </section>
              </div>
            </>
          )}
        </main>

        <footer style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid #333', textAlign: 'center' }}>
          <p style={{ color: '#FFD54F', fontWeight: 'bold', margin: 0 }}>CS PROMAX</p>
          <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>SECURE SYSTEM V26</p>
        </footer>
      </div>
    </div>
  );
}