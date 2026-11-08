import { useEffect, useRef } from 'react';

/* ==========================================================================
   HOME BACKGROUND GRADIENT
   A grainy, slowly flowing WebGL gradient fixed behind the whole landing page.
   • Colours: your --blue token (follows light/dark theme) + orange #E9915A.
   • Bends away from the cursor; sinks lower and softer once you scroll past the hero.
   • Pauses off-screen; holds still for "reduce motion" users.
   • No WebGL? .hero::before in design-system.css draws a plain CSS version instead.
   Styles: design-system.css → "LANDING PAGE UPDATES".
   ========================================================================== */

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FRAG = `
precision highp float;
uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;uniform float uMouseAmt;
uniform vec3 uBlue,uSoft,uWarm;uniform float uAlpha;uniform float uLift;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.02+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
vec2 uv=gl_FragCoord.xy/uRes;
float asp=uRes.x/uRes.y;
vec2 p=vec2(uv.x*asp,uv.y);
vec2 m=vec2(uMouse.x*asp,uMouse.y);
vec2 dm=p-m;float md=length(dm);
float infl=exp(-md*md*7.)*uMouseAmt;
p+=(dm/(md+1e-4))*infl*.14;
float t=uTime*.06;
vec2 q=vec2(fbm(p*1.1+vec2(0.,t)),fbm(p*1.1+vec2(5.2,-t)));
vec2 r=vec2(fbm(p*1.3+2.*q+vec2(1.7,9.2)+t*.7),fbm(p*1.3+2.*q+vec2(8.3,2.8)-t*.5));
float n=fbm(p*1.2+2.4*r);
float edge=.62+.42*(fbm(vec2(uv.x*asp*.8+t*.9,t*.6+q.x))-.5)+infl*.28-uLift*.24;
float a=1.-smoothstep(edge-.55,edge,uv.y);
a=a*a*(3.-2.*a);
vec3 c=mix(uBlue,uSoft,smoothstep(.25,.75,n));
c=mix(c,uWarm,smoothstep(.36,.68,r.x));
c=mix(c,uBlue,(1.-smoothstep(0.,.3,uv.y))*.2);
float g=hash(gl_FragCoord.xy+fract(uTime*.37)*311.);
a=clamp(a*uAlpha*(1.-uLift*.4)*(.9+.28*(g-.5)),0.,1.);
c+=(g-.5)*.075;
gl_FragColor=vec4(c*a,a);
}`;

const probe = document.createElement('canvas').getContext('2d');
const rgb = (css, fb) => {
  probe.fillStyle = fb; probe.fillStyle = (css || '').trim() || fb;
  const h = probe.fillStyle; // normalised to #rrggbb when opaque
  if (h[0] === '#') return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const n = h.match(/[\d.]+/g) || [0, 0, 0]; return n.slice(0, 3).map((v) => v / 255);
};
const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);

function mountHeroGL(canvas) {
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true });
  if (!gl) return () => {};
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
  const vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return () => {};
  const prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return () => {};
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = {}; ['uRes', 'uTime', 'uMouse', 'uMouseAmt', 'uBlue', 'uSoft', 'uWarm', 'uAlpha', 'uLift'].forEach((k) => U[k] = gl.getUniformLocation(prog, k));
  const root = document.documentElement;
  document.documentElement.classList.add('has-gl');

  const setColours = () => {
    const cs = getComputedStyle(root), dark = root.dataset.theme === 'dark';
    const blue = rgb(cs.getPropertyValue('--blue'), '#455f8a');
    const band = rgb(cs.getPropertyValue('--band'), '#455f8a');
    gl.uniform3fv(U.uBlue, dark ? band : blue);
    gl.uniform3fv(U.uSoft, dark ? mix(band, blue, .55) : mix(blue, [.725, .784, .902], .65));
    gl.uniform3fv(U.uWarm, dark ? [.71, .376, .227] : [.914, .569, .353]);
    gl.uniform1f(U.uAlpha, dark ? .9 : .82);
  };
  setColours();
  const mo = new MutationObserver(setColours);
  mo.observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-mood'] });

  let w = 0, h = 0;
  const resize = () => {
    const r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = Math.max(1, Math.round(r.width * dpr)); h = Math.max(1, Math.round(r.height * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    gl.uniform2f(U.uRes, w, h);
  };
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();

  const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const mouse = { x: .5, y: -1, tx: .5, ty: -1, amt: 0, tamt: 0 };
  const lift = { v: 0, t: 0 };
  const onScroll = () => { lift.t = Math.min(1, window.scrollY / (window.innerHeight * .8)); kick(); };
  window.addEventListener('scroll', onScroll, { passive: true });
  lift.t = lift.v = Math.min(1, window.scrollY / (window.innerHeight * .8));
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.tx = (e.clientX - r.left) / r.width;
    mouse.ty = 1 - (e.clientY - r.top) / r.height;
    mouse.tamt = (mouse.tx > -.1 && mouse.tx < 1.1 && mouse.ty > -.1 && mouse.ty < 1.6) ? 1 : 0;
    kick();
  };
  const onLeave = () => { mouse.tamt = 0; kick(); };
  window.addEventListener('pointermove', onMove, { passive: true });
  root.addEventListener('mouseleave', onLeave);

  let visible = true, raf = 0, t0 = performance.now(), frozenAt = 0;
  const frame = (now) => {
    raf = 0;
    mouse.x += (mouse.tx - mouse.x) * .08; mouse.y += (mouse.ty - mouse.y) * .08; mouse.amt += (mouse.tamt - mouse.amt) * .05; lift.v += (lift.t - lift.v) * .08;
    gl.uniform1f(U.uLift, lift.v);
    const time = still ? frozenAt : (now - t0) / 1000;
    gl.uniform1f(U.uTime, time + 20);
    gl.uniform2f(U.uMouse, mouse.x, mouse.y);
    gl.uniform1f(U.uMouseAmt, mouse.amt);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    const settling = Math.abs(mouse.tx - mouse.x) + Math.abs(mouse.ty - mouse.y) + Math.abs(mouse.tamt - mouse.amt) + Math.abs(lift.t - lift.v) > .002;
    if (visible && (!still || settling)) raf = requestAnimationFrame(frame);
  };
  function kick() { if (!raf && visible) raf = requestAnimationFrame(frame); }
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); else if (raf) { cancelAnimationFrame(raf); raf = 0; } });
  io.observe(canvas);
  kick();

  return () => {
    if (raf) cancelAnimationFrame(raf);
    io.disconnect(); ro.disconnect(); mo.disconnect();
    window.removeEventListener('pointermove', onMove); window.removeEventListener('scroll', onScroll); root.removeEventListener('mouseleave', onLeave);
    document.documentElement.classList.remove('has-gl');
  };
}

/** Drop <HeroGradient /> once on a page; it fills the viewport behind the content. */
export default function HeroGradient() {
  const ref = useRef(null);
  useEffect(() => (ref.current ? mountHeroGL(ref.current) : undefined), []);
  return <canvas ref={ref} className="home-gl" aria-hidden="true" />;
}
