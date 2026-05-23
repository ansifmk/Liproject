import { useState, useRef, useCallback, useEffect } from "react";

/* ── Font + global keyframes ── */
const Globals = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Cormorant+SC:wght@300;400;500&family=IM+Fell+English:ital@0;1&family=Great+Vibes&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <style>{`
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

      @keyframes ember      { 0%,100%{opacity:.55;transform:scale(1);}  50%{opacity:1;transform:scale(1.06);} }
      @keyframes rise       { 0%{opacity:0;transform:translateY(32px) scale(.96);} 100%{opacity:1;transform:translateY(0) scale(1);} }
      @keyframes shimmer    { 0%{background-position:200% center;} 100%{background-position:-200% center;} }
      @keyframes heartPulse { 0%,100%{transform:scale(1);} 15%{transform:scale(1.22);} 30%{transform:scale(1);} 45%{transform:scale(1.12);} 60%{transform:scale(1);} }
      @keyframes ripple     { 0%{box-shadow:0 0 0 0 rgba(210,130,100,.45);} 100%{box-shadow:0 0 0 22px rgba(210,130,100,0);} }
      @keyframes wax        { 0%{transform:scale(0) rotate(-18deg);opacity:0;} 55%{transform:scale(1.12) rotate(3deg);opacity:1;} 100%{transform:scale(1) rotate(0deg);opacity:1;} }
      @keyframes drift      { 0%,100%{transform:translateY(0) rotate(-4deg);} 50%{transform:translateY(-18px) rotate(4deg);} }
      @keyframes bgRise     { 0%{opacity:0;transform:translateY(0);} 25%{opacity:.25;} 85%{opacity:.12;} 100%{opacity:0;transform:translateY(-160px);} }
      @keyframes twink      { 0%,100%{opacity:1;} 50%{opacity:.18;} }
      @keyframes hintBlink  { 0%,100%{opacity:.38;} 50%{opacity:.9;} }

      .anim-rise    { animation: rise .9s cubic-bezier(.22,1,.36,1) both; }
      .anim-ember   { animation: ember 2.8s ease-in-out infinite; }
      .anim-pulse   { animation: heartPulse 1.8s ease-in-out infinite, ripple 2.2s ease-in-out infinite; }
      .anim-twink1  { animation: twink 2.4s ease-in-out infinite; }
      .anim-twink2  { animation: twink 2.4s .85s ease-in-out infinite; }
      .anim-drift   { animation: drift 4.5s ease-in-out infinite; }
      .anim-hint    { animation: hintBlink 2.8s ease-in-out infinite; }
      .anim-wax     { animation: wax .7s .25s cubic-bezier(.22,1,.36,1) both; }

      .page-node {
        position:absolute; inset:0;
        transform-style:preserve-3d;
        transform-origin:left center;
        transition:transform 1s cubic-bezier(.645,.045,.355,1);
        user-select:none;
      }
      .page-node.flipped { transform:rotateY(-180deg); }

      .face {
        position:absolute; inset:0;
        backface-visibility:hidden;
        -webkit-backface-visibility:hidden;
        border-radius:0 14px 14px 0;
        overflow:hidden;
      }
      .face-back { transform:rotateY(180deg); }

      .paper {
        background-color:#fefaf5;
        background-image:
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23f)' opacity='.04'/%3E%3C/svg%3E"),
          repeating-linear-gradient(transparent 0,transparent 29px,rgba(190,130,100,.07) 30px);
        background-size:400px 400px,100% 30px;
      }

      .lock-card {
        background:linear-gradient(160deg,rgba(251, 204, 255, 0.98),rgba(255,242,235,.96));
        border:1px solid rgba(210,130,100,.25);
        box-shadow:0 0 0 1px rgba(210,130,100,.06),0 32px 80px rgba(80,40,20,.18),0 8px 24px rgba(80,40,20,.12),inset 0 1px 0 rgba(255,255,255,.9);
        border-radius:24px;
        backdrop-filter:blur(24px);
      }

      .love-input {
        width:100%; padding:13px 14px 13px 44px;
        border-radius:12px; border:1.5px solid rgba(210, 100, 195, 0.35);
        background:rgba(254, 246, 253, 0.95);
        font-family:'Cormorant',serif; font-size:16px; color:#4a2a18;
        transition:border-color .25s,box-shadow .25s; outline:none;
      }
      .love-input:focus { border-color:rgba(190,110,80,.7); box-shadow:0 0 0 3px rgba(210,130,100,.12); }
      .love-input::placeholder { color:rgba(140,85,55,.45); }

      .unlock-btn {
        width:100%; padding:14px;
        background:linear-gradient(135deg,#b35d72,#9b4a5e);
        border:none; border-radius:12px;
        font-family:'Cormorant SC',serif; font-size:15px; letter-spacing:.12em; color:#fff6ed;
        cursor:pointer;
        box-shadow:0 8px 32px rgba(150,75,85,.35),inset 0 1px 0 rgba(255,220,200,.25);
        transition:transform .18s,opacity .18s,box-shadow .18s;
        display:flex; align-items:center; justify-content:center; gap:10px;
      }
      .unlock-btn:hover { transform:scale(1.025); box-shadow:0 12px 40px rgba(150,75,85,.5); }
      .unlock-btn:active { transform:scale(.97); }

      .nav-btn {
        background:transparent; border:1px solid rgba(210,130,100,.35); color:rgba(180,110,75,.9);
        border-radius:28px; padding:9px 24px; font-family:'Cormorant SC',serif;
        font-size:13px; letter-spacing:.12em; cursor:pointer; transition:all .22s;
        display:flex; align-items:center; gap:8px;
      }
      .nav-btn:hover:not(:disabled) { background:rgba(210,130,100,.1); border-color:rgba(210,130,100,.6); color:#b3667a; }
      .nav-btn:disabled { opacity:.3; cursor:default; }

      .seal {
        width:72px; height:72px; border-radius:50%;
        background:radial-gradient(circle at 38% 36%,#d47a8e,#b85c72 55%,#9a4256);
        box-shadow:0 4px 18px rgba(130,50,60,.45),inset 0 2px 4px rgba(255,180,170,.2);
        display:flex; align-items:center; justify-content:center; font-size:26px;
        color:#fff3e8;
      }

      .pc { padding:clamp(24px,5vw,48px) clamp(22px,5vw,48px) clamp(24px,5vw,44px) clamp(30px,7vw,60px); position:relative; height:100%; z-index:1; }
      .ruled { position:absolute; inset:0; pointer-events:none; z-index:0; background:repeating-linear-gradient(transparent 0,transparent 29px,rgba(170,100,70,.08) 30px); background-size:100% 30px; }
      .curl { position:absolute; bottom:0; right:0; width:34px; height:34px; background:linear-gradient(225deg,#e0bca0 42%,#f5ede3 44%,transparent 62%); border-radius:12px 0 10px 0; opacity:.55; pointer-events:none; }
      .spine { background:linear-gradient(180deg,#a14b60 0%,#823c4e 45%,#632c3a 100%); box-shadow:-8px 0 24px rgba(0,0,0,.5),inset -3px 0 8px rgba(0,0,0,.3); }
      .petal { position:absolute; pointer-events:none; font-size:22px; opacity:.4; }
      .bg-drift { position:absolute; opacity:0; pointer-events:none; font-size:18px; }

      @media(max-width:480px){ .pc { padding:18px 16px 18px 22px; } }
    `}</style>
  );
};

const SECRET = "love2024";
const TOTAL = 4;
const PAGE_LABELS = ["Cover","Page I","Page II","Page III","Page IV"];

const Orn = ({ big }) => (
  <div style={{ textAlign:"center", color:"#cc8a70", fontSize: big?20:14, letterSpacing:"0.4em", margin: big?"20px 0":"14px 0", opacity:.7 }}>❦ ✦ ❦</div>
);

const Highlight = ({ children }) => (
  <div style={{ margin:"20px 0", borderLeft:"2px solid rgba(210,130,100,.5)", paddingLeft:20, fontFamily:"'IM Fell English',serif", fontSize:"clamp(14px,2.2vw,16.5px)", fontStyle:"italic", color:"#7a3e2a", lineHeight:1.75 }}>
    {children}
  </div>
);

const Para = ({ children, indent=true }) => (
  <p style={{ fontFamily:"'Cormorant',serif", fontWeight:300, fontSize:"clamp(15px,2.6vw,18px)", lineHeight:1.9, color:"#0C0404", marginBottom:"clamp(10px,2vw,16px)", textIndent: indent?"2.2em":0 }}>{children}</p>
);

const PageLabel = ({ children }) => (
  <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:11, letterSpacing:"0.2em", color:"rgba(87, 27, 0, 0.6)", textAlign:"right", marginBottom:"clamp(14px,3vw,22px)" }}>{children}</div>
);

const Dots = ({ active }) => (
  <div style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:6 }}>
    {[0,1,2,3].map(i=>(
      <div key={i} style={{ width:i===active?6:4, height:i===active?6:4, borderRadius:"50%", background:i===active?"#cc8a70":"rgba(190,110,75,.3)", transition:"all .3s" }} />
    ))}
  </div>
);

const Face = ({ back, children, className="", style={} }) => (
  <div className={`face${back?" face-back":""} ${className}`} style={style}>{children}</div>
);

const CoverFront = ({ onOpen }) => (
  <Face style={{ background:"linear-gradient(155deg,#5F0202 0%,#5F0202 35%,#5F0202 35%,#5F0202 100%)" }}>
    <div style={{ position:"absolute", inset:16, border:"1px solid rgba(210,130,100,.2)", borderRadius:6, pointerEvents:"none" }} />
    <div style={{ position:"absolute", inset:22, border:"1px solid rgba(210,130,100,.1)", borderRadius:4, pointerEvents:"none" }} />
    {[{top:26,left:26},{top:26,right:26},{bottom:26,left:26},{bottom:26,right:26}].map((pos,i)=>(
      <div key={i} style={{ position:"absolute", ...pos, color:"#d48e72", fontSize:14, opacity:.35 }}>✦</div>
    ))}
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", padding:"40px 32px", position:"relative" }}>
      <div className="anim-drift" style={{ fontSize:"clamp(52px,12vw,72px)", marginBottom:8, filter:"drop-shadow(0 6px 20px rgba(180,90,80,.35))", color:"#c5717a" }}>✧</div>
      <div style={{ display:"flex", alignItems:"center", gap:12, width:"80%", maxWidth:260, marginBottom:20 }}>
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,rgba(210,130,100,.5))" }} />
        <span style={{ color:"#cc8a70", fontSize:11, opacity:.8 }}>✦</span>
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(210,130,100,.5),transparent)" }} />
      </div>
      <h1 style={{ fontFamily:"'Cormorant SC',serif", fontSize:"clamp(20px,5vw,30px)", fontWeight:400, color:"#FFFFFF", textAlign:"center", letterSpacing:"0.14em", lineHeight:1.35, marginBottom:10, textShadow:"0 2px 12px rgba(180,90,80,.15)" }}>
        A Letter From<br />My Heart
      </h1>
      <p style={{ fontFamily:"'IM Fell English',serif", fontStyle:"italic", fontSize:"clamp(12px,2.2vw,14px)", color:"rgba(255, 255, 255, 0.8)", textAlign:"center", letterSpacing:"0.08em", marginBottom:32 }}>
        — written only for you —
      </p>
      <button onClick={e=>{ e.stopPropagation(); onOpen(); }} className="unlock-btn" style={{ maxWidth:260 }}>
        <span style={{ fontSize:17 }}></span> Open the Letter
      </button>
      <p style={{ marginTop:18, fontFamily:"'Cormorant',serif", fontSize:12, color:"rgba(150,85,55,.55)", textAlign:"center", letterSpacing:"0.1em", fontStyle:"italic" }}>
        swipe or press Next →
      </p>
    </div>
  </Face>
);

const P1Back = () => (
  <Face back className="paper">
    <div className="ruled" />
    <div className="pc">
      <PageLabel>May 2026</PageLabel>
      <div style={{ fontFamily:"'Cormorant',serif", fontWeight:500, fontSize:"clamp(18px,4vw,26px)", color:"#34010E", marginBottom:"clamp(14px,3vw,22px)", fontStyle:"italic" }}>My dearest love,</div>
      <Para>Every time I think of you, the world becomes quieter — and somehow more beautiful. You arrived like a season I never knew was missing, filling every corner of my life with warmth I didn't know I needed.</Para>
      <Orn />
      <Para>Your laughter is the melody I hum in my happiest moments. Your voice, even in silence, is the comfort I reach for when the day feels too heavy to carry alone.</Para>
      <Dots active={0} />
    </div>
    <div className="curl" />
  </Face>
);

const P2Front = () => (
  <Face className="paper">
    <div className="ruled" />
    <div className="pc">
      <PageLabel>Page I of IV</PageLabel>
      <Para>I have loved you in a thousand quiet, ordinary ways — and in each one, I have meant it with everything I am. Some loves are loud and brilliant; ours is steady, sure, and deep as roots.</Para>
      <Highlight>"You are the reason the world feels softer. You are the warmth I didn't know I was missing until you walked in and made every room feel like home."</Highlight>
      <Para>There are words that live below language — a feeling in the chest when you smile, the way silence between us is never empty. That is where my love for you lives.</Para>
      <Dots active={1} />
    </div>
    <div className="curl" />
  </Face>
);

const P2Back = () => (
  <Face back className="paper">
    <div className="ruled" />
    <div className="pc">
      <PageLabel>Page II of IV</PageLabel>
      <Para>There are mornings when I wake and my first thought is gratitude — that I get to love someone as remarkable as you. Not because you are perfect, but because you are real. Because your kindness is not performance. Because your heart is the truest place I have ever felt at home.</Para>
      <Orn />
      <Highlight>I love you — not in spite of who you are, but entirely because of it.</Highlight>
      <Para>You are my favourite story, and I intend to keep reading every chapter.</Para>
      <Dots active={2} />
    </div>
    <div className="curl" />
  </Face>
);

const P3Front = () => (
  <Face className="paper">
    <div className="ruled" />
    <div className="pc">
      <PageLabel>Page III of IV</PageLabel>
      <Para>I want you to know, on every ordinary Tuesday and every trembling milestone, that I choose you. Steadily. Tenderly. Without reservation.</Para>
      <Orn />
      <Highlight>"To love and be loved is to feel the sun from both sides."</Highlight>
      <Para>In every version of my life I could have lived, I would find my way back to you. There is no story I would rather be in — no place I'd rather arrive.</Para>
      <Dots active={2} />
    </div>
    <div className="curl" />
  </Face>
);

const P3Back = () => (
  <Face back className="paper">
    <div className="ruled" />
    <div className="pc">
      <PageLabel>Page IV of IV</PageLabel>
      <Para>Thank you for letting me love you. Thank you for loving me back — in the soft, steady way that makes ordinary days feel like grace.</Para>
      <Para>I carry you with me in every room I enter, in every quiet moment when the world settles and the only thing left is the sound of my own heart — which says your name.</Para>
      <Orn big />
      <Para indent={false}>Forever and without hesitation,</Para>
      <Dots active={3} />
    </div>
    <div className="curl" />
  </Face>
);

const P4Front = () => (
  <Face className="paper">
    <div className="ruled" />
    <div className="pc">
      <div className="anim-wax" style={{ textAlign:"center", padding:"24px 0 60px" }}>
        <div className="seal anim-ember" style={{ margin:"0 auto 16px" }}>✧</div>
        <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:"clamp(32px,7vw,50px)", color:"#b35d72", marginBottom:6, lineHeight:1.2 }}>Forever yours</div>
        <div style={{ fontFamily:"'Cormorant',serif", fontStyle:"italic", fontSize:14, color:"rgba(130,75,55,.7)", marginBottom:10 }}>— written with every heartbeat</div>
        <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:"clamp(18px,4vw,24px)", color:"#c5717a", letterSpacing:"0.1em", marginBottom:24 }}>[Your Name]</div>
        <div style={{ display:"flex", alignItems:"center", gap:12, maxWidth:200, margin:"0 auto 12px" }}>
          <div style={{ flex:1, height:0.5, background:"linear-gradient(90deg,transparent,rgba(180,100,70,.5))" }} />
          <span style={{ fontSize:13, color:"#cc8a70" }}>❦</span>
          <div style={{ flex:1, height:0.5, background:"linear-gradient(90deg,rgba(180,100,70,.5),transparent)" }} />
        </div>
        <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:11, color:"rgba(150,85,55,.55)", letterSpacing:"0.22em" }}>FINIS</div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"12px 24px", background:"linear-gradient(135deg,rgba(255,245,238,.98),rgba(255,240,230,.95))", borderTop:"0.5px solid rgba(210,130,100,.2)", display:"flex", alignItems:"center", justifyContent:"center", gap:10, fontFamily:"'Cormorant',serif", fontStyle:"italic", fontSize:13, color:"rgba(130,75,55,.7)" }}>
        <span style={{ color:"#c5717a", fontSize:12 }}>✧</span> sealed with love, written from the heart <span style={{ color:"#c5717a", fontSize:12 }}>✧</span>
      </div>
    </div>
    <div className="curl" />
  </Face>
);

const LockScreen = ({ onUnlock }) => {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const attempt = () => {
    if (val === SECRET) { setErr(false); onUnlock(); }
    else { setErr(true); setVal(""); }
  };
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#FFE7FF 0%,#FDF4FF 40%,#FDD7F8 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1.5rem", position:"relative", overflow:"hidden" }}>
      {[{top:"6%",left:"5%",dur:"4.2s",del:"0s"},{top:"14%",right:"7%",dur:"5.8s",del:"1s"},{bottom:"12%",left:"8%",dur:"6.2s",del:"2s"},{bottom:"20%",right:"5%",dur:"3.9s",del:".5s"}].map((p,i)=>(
        <div key={i} className="petal" style={{ ...p, animation:`drift ${p.dur} ${p.del} ease-in-out infinite` }}>
          {["✿","❀","✾","✤"][i]}
        </div>
      ))}
      <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translateX(-50%)", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(200,110,90,.08),transparent 70%)", pointerEvents:"none" }} />
      <div className="lock-card anim-rise" style={{ maxWidth:400, width:"100%", padding:"clamp(2rem,5vw,3rem) clamp(1.5rem,4vw,2.5rem)" }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:"1.5rem" }}>
          {/* <div className="seal anim-pulse">✧</div> */}
        </div>
        <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:10, letterSpacing:"0.22em", color:"#CC70B0", textAlign:"center", marginBottom:6, opacity:.85 }}>SEALED WITH LOVE</div>
        <h2 style={{ fontFamily:"'Cormorant',serif", fontWeight:500, fontSize:"clamp(22px,4vw,28px)", color:"#4a2a18", textAlign:"center", marginBottom:6 }}>Secret Letter</h2>
        <p style={{ fontFamily:"'Cormorant',serif", fontStyle:"italic", fontSize:15, color:"rgba(110,65,45,.7)", textAlign:"center", marginBottom:"1.75rem", lineHeight:1.6 }}>
          Enter the secret password to unlock<br />a message written just for you
        </p>
        <div style={{ position:"relative", marginBottom:"0.75rem" }}>
          <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#cc8a70", fontSize:17 }}>✧</span>
          <input className="love-input" type="password" value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&attempt()} placeholder="Enter secret code…" autoComplete="off"
            style={err?{borderColor:"rgba(255, 255, 255, 0.5)",background:"rgba(255,245,240,.95)"}:{}} />
        </div>
        {err && (
          <div style={{ fontFamily:"'Cormorant',serif", fontStyle:"italic", fontSize:14, color:"#b35d72", background:"rgba(180,80,70,.06)", border:"1px solid rgba(180,80,70,.15)", borderRadius:10, padding:"9px 14px", marginBottom:"0.75rem", display:"flex", alignItems:"center", gap:8 }}>
            <span>✧</span> Oops — wrong password, my love. Try again.
          </div>
        )}
        <button className="unlock-btn" onClick={attempt}><span>✧</span> Unlock the Letter</button>
        <p style={{ fontFamily:"'Cormorant',serif", fontStyle:"italic", fontSize:13, color:"rgba(150,85,55,.6)", textAlign:"center", marginTop:"1.25rem", letterSpacing:"0.06em" }}>
          <span className="anim-twink1">✦</span> For my special someone <span className="anim-twink2">✦</span>
        </p>
      </div>
    </div>
  );
};

const BookScreen = ({ onClose }) => {
  const [cur, setCur] = useState(0);
  const startX = useRef(null);
  const THRESH = 55;
  const goTo = useCallback(t => setCur(Math.max(0, Math.min(TOTAL, t))), []);
  const next = useCallback(() => goTo(cur + 1), [cur, goTo]);
  const prev = useCallback(() => goTo(cur - 1), [cur, goTo]);

  useEffect(() => {
    const h = e => {
      if (e.key==="ArrowRight"||e.key==="ArrowDown") next();
      if (e.key==="ArrowLeft"||e.key==="ArrowUp") prev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  const flipped = i => cur > i;

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(155deg,#FFDDFB 0%,#FFD7F9 40%,#FFDFF7 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-start", padding:"clamp(18px,3.5vw,40px) clamp(8px,3vw,20px) 56px", position:"relative", overflow:"hidden" }}>
      {[{left:"8%",top:"18%",dur:"7s",del:"0s",e:"✿"},{left:"85%",top:"14%",dur:"9s",del:"1.5s",e:"❀"},{left:"18%",top:"72%",dur:"8s",del:"3s",e:"✤"},{left:"78%",top:"62%",dur:"6s",del:".8s",e:"✾"}].map((p,i)=>(
        <div key={i} className="bg-drift" style={{ left:p.left, top:p.top, animation:`bgRise ${p.dur} ${p.del} ease-in-out infinite` }}>{p.e}</div>
      ))}
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:600, height:200, background:"radial-gradient(ellipse,rgba(180,100,80,.07),transparent 70%)", pointerEvents:"none" }} />

      <div className="anim-hint" style={{ color:"rgba(170,100,75,.7)", fontSize:11, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:10, fontFamily:"'Cormorant SC',serif" }}>
        ← drag · swipe · arrows to turn pages →
      </div>
      <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:12, letterSpacing:"0.18em", color:"rgba(160,85,60,.65)", marginBottom:14 }}>
        {PAGE_LABELS[Math.min(cur, PAGE_LABELS.length-1)]}
      </div>

      <div style={{ perspective:2000, width:"100%", display:"flex", justifyContent:"center" }}>
        <div style={{ position:"relative", width:"min(580px,92vw)", transformStyle:"preserve-3d", transform:"rotateX(3deg) rotateY(-2deg)", filter:"drop-shadow(0 60px 90px rgba(0,0,0,.25))", transition:"transform .4s ease" }}
          onMouseEnter={e=>e.currentTarget.style.transform="rotateX(1deg) rotateY(-1deg)"}
          onMouseLeave={e=>e.currentTarget.style.transform="rotateX(3deg) rotateY(-2deg)"}>

          <div className="spine" style={{ position:"absolute", left:"calc(-1 * clamp(22px,5vw,36px))", top:0, bottom:0, width:"clamp(22px,5vw,36px)", borderRadius:"6px 0 0 6px", zIndex:10, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:12, left:"50%", transform:"translateX(-50%)", width:1.5, height:36, background:"linear-gradient(180deg,transparent,rgba(210,130,100,.6),transparent)" }} />
            <span style={{ writingMode:"vertical-rl", textOrientation:"mixed", transform:"rotate(180deg)", fontFamily:"'Cormorant SC',serif", fontSize:"clamp(9px,1.4vw,11px)", color:"rgba(210,130,100,.8)", letterSpacing:"0.2em", whiteSpace:"nowrap" }}>A Love Letter</span>
            <div style={{ position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)", width:1.5, height:36, background:"linear-gradient(180deg,transparent,rgba(210,130,100,.6),transparent)" }} />
          </div>

          <div style={{ position:"relative", width:"100%", minHeight:560 }}>
            <div style={{ position:"absolute", right:-3, top:6, bottom:6, width:7, background:"linear-gradient(90deg,#4B0505,#f8ede3,#e8d0bc)", borderRadius:"0 4px 4px 0", opacity:.6 }} />
            <div style={{ position:"absolute", right:-7, top:10, bottom:10, width:6, background:"linear-gradient(90deg,#dcc0a8,#ecdac8)", borderRadius:"0 4px 4px 0", opacity:.35 }} />

            <div className={`page-node${flipped(3)?" flipped":""}`} style={{ zIndex:1 }}>
              <P4Front />
              <Face back style={{ background:"#f5d5c6", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ opacity:.2, fontSize:48, color:"#c5717a" }}>✧</div>
              </Face>
            </div>
            <div className={`page-node${flipped(2)?" flipped":""}`} style={{ zIndex:2 }}>
              <P3Front /><P3Back />
            </div>
            <div className={`page-node${flipped(1)?" flipped":""}`} style={{ zIndex:3 }}>
              <P2Front /><P2Back />
            </div>
            <div className={`page-node${flipped(0)?" flipped":""}`} style={{ zIndex:4 }}>
              <CoverFront onOpen={next} /><P1Back />
            </div>

            <div style={{ position:"absolute", inset:0, zIndex:5, cursor:"grab" }}
              onMouseDown={e=>{ startX.current=e.clientX; }}
              onMouseUp={e=>{ if(startX.current===null)return; const dx=e.clientX-startX.current; if(dx<-THRESH)next(); else if(dx>THRESH)prev(); startX.current=null; }}
              onTouchStart={e=>{ startX.current=e.touches[0].clientX; }}
              onTouchEnd={e=>{ if(startX.current===null)return; const dx=e.changedTouches[0].clientX-startX.current; if(dx<-THRESH)next(); else if(dx>THRESH)prev(); startX.current=null; }}
            />
          </div>
        </div>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:"clamp(10px,3vw,24px)", marginTop:"clamp(18px,3vw,28px)" }}>
        <button className="nav-btn" onClick={prev} disabled={cur===0}>← Prev</button>
        <div style={{ display:"flex", gap:7 }}>
          {[0,1,2,3,4].map(i=>(
            <div key={i} onClick={()=>goTo(i)} style={{ width:i===cur?10:5, height:i===cur?10:5, borderRadius:"50%", background:i===cur?"#cc8a70":"rgba(190,110,75,.3)", cursor:"pointer", transition:"all .3s", marginTop:i===cur?0:2.5 }} />
          ))}
        </div>
        <button className="nav-btn" onClick={next} disabled={cur>=TOTAL}>Next →</button>
      </div>
      <button className="nav-btn" onClick={onClose} style={{ marginTop:14, fontSize:11, opacity:.6 }}>📖 Close the letter</button>
    </div>
  );
};

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Globals />
      {open ? <BookScreen onClose={()=>setOpen(false)} /> : <LockScreen onUnlock={()=>setOpen(true)} />}
    </>
  );
}