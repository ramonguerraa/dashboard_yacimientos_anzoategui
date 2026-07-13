/* ==============================================================
   0. DATASET
   ============================================================== */
const DEMO_DATA = [
  {y:"Hamaca",         z:"Faja Orinoco",   op:"PDVSA-Chevron", t:"Extrapesado", api:8.5,  an:2022, prod:95000, vp:-3,   gor:180,  bsw:78, lc:19.2, pr:52.1, mo:32.9, ca:1850, ec:3.2, be:24.5, pa:480, pt:620, rpa:77, ppz:198, dt:22, ai:38, r1:1200, r2:2100, fr:12, cl:"2P", cv:0.22, inc:14, fl:42,  sa:1},
  {y:"Hamaca",         z:"Faja Orinoco",   op:"PDVSA-Chevron", t:"Extrapesado", api:8.5,  an:2023, prod:91200, vp:-4.0, gor:195,  bsw:80, lc:20.1, pr:55.8, mo:35.7, ca:1920, ec:3.0, be:25.8, pa:455, pt:620, rpa:73, ppz:200, dt:25, ai:39, r1:1200, r2:2100, fr:12, cl:"2P", cv:0.24, inc:15, fl:45,  sa:1},
  {y:"Hamaca",         z:"Faja Orinoco",   op:"PDVSA-Chevron", t:"Extrapesado", api:8.4,  an:2024, prod:87500, vp:-4.1, gor:200,  bsw:82, lc:20.8, pr:58.2, mo:37.4, ca:1980, ec:2.8, be:26.2, pa:430, pt:620, rpa:69, ppz:204, dt:27, ai:40, r1:1200, r2:2100, fr:12, cl:"2P", cv:0.25, inc:16, fl:48,  sa:1},
  {y:"Cerro Negro",    z:"Faja Orinoco",   op:"PDVSA-ENI",    t:"Extrapesado", api:8.0,  an:2022, prod:72000, vp:-5,   gor:160,  bsw:75, lc:18.5, pr:50.2, mo:31.7, ca:1200, ec:3.8, be:23.2, pa:310, pt:420, rpa:74, ppz:232, dt:20, ai:35, r1:980,  r2:1750, fr:11, cl:"2P", cv:0.20, inc:12, fl:38,  sa:1},
  {y:"Cerro Negro",    z:"Faja Orinoco",   op:"PDVSA-ENI",    t:"Extrapesado", api:8.0,  an:2023, prod:68400, vp:-5.0, gor:172,  bsw:77, lc:19.2, pr:53.5, mo:34.3, ca:1260, ec:3.5, be:24.1, pa:290, pt:420, rpa:69, ppz:236, dt:22, ai:36, r1:980,  r2:1750, fr:11, cl:"2P", cv:0.22, inc:13, fl:40,  sa:1},
  {y:"Cerro Negro",    z:"Faja Orinoco",   op:"PDVSA-ENI",    t:"Extrapesado", api:7.9,  an:2024, prod:65200, vp:-4.7, gor:180,  bsw:79, lc:19.8, pr:56.1, mo:36.3, ca:1310, ec:3.2, be:24.8, pa:275, pt:420, rpa:65, ppz:237, dt:24, ai:37, r1:980,  r2:1750, fr:11, cl:"2P", cv:0.23, inc:14, fl:42,  sa:1},
  {y:"Petroanzoátegui",z:"Faja Orinoco",   op:"PDVSA",        t:"Extrapesado", api:9.2,  an:2022, prod:55000, vp:-4,   gor:210,  bsw:72, lc:17.8, pr:51.8, mo:34.0, ca:980,  ec:3.5, be:22.8, pa:240, pt:330, rpa:73, ppz:229, dt:18, ai:34, r1:820,  r2:1480, fr:13, cl:"1P", cv:0.19, inc:10, fl:32,  sa:1},
  {y:"Petroanzoátegui",z:"Faja Orinoco",   op:"PDVSA",        t:"Extrapesado", api:9.1,  an:2023, prod:52800, vp:-4.0, gor:220,  bsw:74, lc:18.5, pr:55.2, mo:36.7, ca:1020, ec:3.3, be:23.5, pa:225, pt:330, rpa:68, ppz:235, dt:20, ai:35, r1:820,  r2:1480, fr:13, cl:"1P", cv:0.20, inc:11, fl:34,  sa:1},
  {y:"Petroanzoátegui",z:"Faja Orinoco",   op:"PDVSA",        t:"Extrapesado", api:9.0,  an:2024, prod:50600, vp:-4.2, gor:228,  bsw:76, lc:19.0, pr:57.5, mo:38.5, ca:1055, ec:3.1, be:24.0, pa:212, pt:330, rpa:64, ppz:239, dt:22, ai:36, r1:820,  r2:1480, fr:13, cl:"1P", cv:0.21, inc:12, fl:36,  sa:1},
  {y:"Zuata",          z:"Faja Orinoco",   op:"PDVSA",        t:"Extrapesado", api:8.8,  an:2022, prod:48000, vp:-6,   gor:155,  bsw:70, lc:16.5, pr:50.5, mo:34.0, ca:820,  ec:3.7, be:21.5, pa:195, pt:280, rpa:70, ppz:246, dt:25, ai:42, r1:720,  r2:1320, fr:10, cl:"2P", cv:0.28, inc:18, fl:28,  sa:1},
  {y:"Zuata",          z:"Faja Orinoco",   op:"PDVSA",        t:"Extrapesado", api:8.8,  an:2023, prod:45100, vp:-6.0, gor:165,  bsw:72, lc:17.2, pr:54.0, mo:36.8, ca:860,  ec:3.5, be:22.2, pa:180, pt:280, rpa:64, ppz:251, dt:28, ai:43, r1:720,  r2:1320, fr:10, cl:"2P", cv:0.30, inc:19, fl:30,  sa:1},
  {y:"Zuata",          z:"Faja Orinoco",   op:"PDVSA",        t:"Extrapesado", api:8.7,  an:2024, prod:42500, vp:-5.8, gor:172,  bsw:74, lc:17.8, pr:56.4, mo:38.6, ca:892,  ec:3.2, be:22.8, pa:168, pt:280, rpa:60, ppz:253, dt:30, ai:44, r1:720,  r2:1320, fr:10, cl:"2P", cv:0.31, inc:20, fl:32,  sa:1},
  {y:"Morichal",       z:"Faja Orinoco",   op:"PDVSA",        t:"Pesado",      api:13.5, an:2022, prod:38000, vp:-5,   gor:320,  bsw:62, lc:14.8, pr:56.5, mo:41.7, ca:580,  ec:4.2, be:19.5, pa:155, pt:230, rpa:67, ppz:245, dt:18, ai:32, r1:480,  r2:920,  fr:18, cl:"2P", cv:0.18, inc:8,  fl:18,  sa:0},
  {y:"Morichal",       z:"Faja Orinoco",   op:"PDVSA",        t:"Pesado",      api:13.4, an:2023, prod:36100, vp:-5.0, gor:335,  bsw:64, lc:15.4, pr:60.2, mo:44.8, ca:610,  ec:4.0, be:20.2, pa:145, pt:230, rpa:63, ppz:249, dt:20, ai:33, r1:480,  r2:920,  fr:18, cl:"2P", cv:0.19, inc:9,  fl:19,  sa:0},
  {y:"Morichal",       z:"Faja Orinoco",   op:"PDVSA",        t:"Pesado",      api:13.3, an:2024, prod:34400, vp:-4.7, gor:345,  bsw:65, lc:15.9, pr:62.5, mo:46.6, ca:635,  ec:3.8, be:20.8, pa:136, pt:230, rpa:59, ppz:253, dt:22, ai:34, r1:480,  r2:920,  fr:18, cl:"2P", cv:0.20, inc:9,  fl:20,  sa:0},
  {y:"El Furrial",     z:"Oficina Norte",  op:"PDVSA",        t:"Mediano",     api:28.0, an:2022, prod:18500, vp:-4,   gor:950,  bsw:28, lc:9.2,  pr:68.5, mo:59.3, ca:280,  ec:4.8, be:13.5, pa:78,  pt:120, rpa:65, ppz:237, dt:10, ai:28, r1:280,  r2:490,  fr:32, cl:"1P", cv:0.12, inc:3,  fl:5.2, sa:0},
  {y:"El Furrial",     z:"Oficina Norte",  op:"PDVSA",        t:"Mediano",     api:28.0, an:2023, prod:17760, vp:-4.0, gor:968,  bsw:29, lc:9.6,  pr:72.8, mo:63.2, ca:295,  ec:4.6, be:14.0, pa:74,  pt:120, rpa:62, ppz:240, dt:11, ai:29, r1:280,  r2:490,  fr:32, cl:"1P", cv:0.13, inc:4,  fl:5.5, sa:0},
  {y:"El Furrial",     z:"Oficina Norte",  op:"PDVSA",        t:"Mediano",     api:27.8, an:2024, prod:17050, vp:-4.0, gor:985,  bsw:30, lc:10.0, pr:75.6, mo:65.6, ca:308,  ec:4.3, be:14.4, pa:70,  pt:120, rpa:58, ppz:244, dt:12, ai:30, r1:280,  r2:490,  fr:32, cl:"1P", cv:0.13, inc:4,  fl:5.8, sa:0},
  {y:"Merey",          z:"Oficina Norte",  op:"PDVSA",        t:"Pesado",      api:16.0, an:2022, prod:31000, vp:-6,   gor:420,  bsw:52, lc:12.5, pr:60.2, mo:47.7, ca:420,  ec:4.5, be:17.2, pa:120, pt:200, rpa:60, ppz:258, dt:16, ai:30, r1:380,  r2:710,  fr:22, cl:"2P", cv:0.16, inc:6,  fl:12,  sa:0},
  {y:"Merey",          z:"Oficina Norte",  op:"PDVSA",        t:"Pesado",      api:16.0, an:2023, prod:29070, vp:-6.2, gor:438,  bsw:54, lc:13.0, pr:64.1, mo:51.1, ca:445,  ec:4.2, be:17.8, pa:112, pt:200, rpa:56, ppz:260, dt:18, ai:31, r1:380,  r2:710,  fr:22, cl:"2P", cv:0.17, inc:7,  fl:13,  sa:0},
  {y:"Merey",          z:"Oficina Norte",  op:"PDVSA",        t:"Pesado",      api:15.9, an:2024, prod:27300, vp:-6.1, gor:452,  bsw:55, lc:13.5, pr:66.8, mo:53.3, ca:466,  ec:3.9, be:18.2, pa:106, pt:200, rpa:53, ppz:258, dt:20, ai:32, r1:380,  r2:710,  fr:22, cl:"2P", cv:0.18, inc:7,  fl:14,  sa:0},
  {y:"Jobo",           z:"Oficina Norte",  op:"PDVSA",        t:"Pesado",      api:18.2, an:2022, prod:28000, vp:-7,   gor:480,  bsw:48, lc:11.8, pr:62.5, mo:50.7, ca:380,  ec:4.6, be:16.5, pa:112, pt:185, rpa:61, ppz:250, dt:15, ai:29, r1:350,  r2:640,  fr:24, cl:"1P", cv:0.15, inc:5,  fl:10,  sa:1},
  {y:"Jobo",           z:"Oficina Norte",  op:"PDVSA",        t:"Pesado",      api:18.1, an:2023, prod:26040, vp:-7.0, gor:498,  bsw:50, lc:12.3, pr:66.5, mo:54.2, ca:402,  ec:4.3, be:17.1, pa:104, pt:185, rpa:56, ppz:250, dt:17, ai:30, r1:350,  r2:640,  fr:24, cl:"1P", cv:0.16, inc:6,  fl:11,  sa:1},
  {y:"Jobo",           z:"Oficina Norte",  op:"PDVSA",        t:"Pesado",      api:18.0, an:2024, prod:24200, vp:-7.1, gor:510,  bsw:52, lc:12.8, pr:69.2, mo:56.4, ca:420,  ec:4.0, be:17.6, pa:98,  pt:185, rpa:53, ppz:247, dt:19, ai:31, r1:350,  r2:640,  fr:24, cl:"1P", cv:0.17, inc:6,  fl:12,  sa:1},
  {y:"Leona",          z:"Oficina Norte",  op:"PDVSA",        t:"Pesado",      api:17.5, an:2022, prod:22000, vp:-7,   gor:460,  bsw:45, lc:11.2, pr:61.5, mo:50.3, ca:340,  ec:4.8, be:16.0, pa:88,  pt:150, rpa:59, ppz:250, dt:14, ai:27, r1:300,  r2:560,  fr:25, cl:"2P", cv:0.14, inc:5,  fl:9,   sa:1},
  {y:"Leona",          z:"Oficina Norte",  op:"PDVSA",        t:"Pesado",      api:17.4, an:2023, prod:20460, vp:-7.0, gor:475,  bsw:47, lc:11.7, pr:65.4, mo:53.7, ca:358,  ec:4.5, be:16.6, pa:82,  pt:150, rpa:55, ppz:249, dt:16, ai:28, r1:300,  r2:560,  fr:25, cl:"2P", cv:0.15, inc:5,  fl:10,  sa:1},
  {y:"Leona",          z:"Oficina Norte",  op:"PDVSA",        t:"Pesado",      api:17.3, an:2024, prod:19030, vp:-7.1, gor:488,  bsw:49, lc:12.2, pr:68.0, mo:55.8, ca:374,  ec:4.2, be:17.0, pa:77,  pt:150, rpa:51, ppz:247, dt:18, ai:29, r1:300,  r2:560,  fr:25, cl:"2P", cv:0.16, inc:6,  fl:11,  sa:1},
  {y:"Oficina",        z:"Oficina Central",op:"PDVSA",        t:"Mediano",     api:24.0, an:2022, prod:14000, vp:-5,   gor:820,  bsw:35, lc:8.5,  pr:66.0, mo:57.5, ca:180,  ec:5.2, be:12.8, pa:55,  pt:92,  rpa:60, ppz:255, dt:9,  ai:25, r1:195,  r2:360,  fr:35, cl:"1P", cv:0.11, inc:3,  fl:4.2, sa:0},
  {y:"Oficina",        z:"Oficina Central",op:"PDVSA",        t:"Mediano",     api:24.0, an:2023, prod:13300, vp:-5.0, gor:840,  bsw:36, lc:8.9,  pr:70.2, mo:61.3, ca:190,  ec:5.0, be:13.2, pa:51,  pt:92,  rpa:55, ppz:261, dt:10, ai:26, r1:195,  r2:360,  fr:35, cl:"1P", cv:0.12, inc:3,  fl:4.5, sa:0},
  {y:"Oficina",        z:"Oficina Central",op:"PDVSA",        t:"Mediano",     api:23.8, an:2024, prod:12630, vp:-5.0, gor:858,  bsw:37, lc:9.2,  pr:73.0, mo:63.8, ca:198,  ec:4.8, be:13.5, pa:48,  pt:92,  rpa:52, ppz:263, dt:11, ai:27, r1:195,  r2:360,  fr:35, cl:"1P", cv:0.12, inc:3,  fl:4.8, sa:0},
  {y:"Santa Rosa",     z:"Oficina Central",op:"PDVSA",        t:"Mediano",     api:26.5, an:2022, prod:11000, vp:-5,   gor:780,  bsw:30, lc:8.0,  pr:67.5, mo:59.5, ca:145,  ec:5.5, be:12.2, pa:42,  pt:72,  rpa:58, ppz:262, dt:8,  ai:22, r1:158,  r2:295,  fr:38, cl:"1P", cv:0.10, inc:2,  fl:3.2, sa:0},
  {y:"Santa Rosa",     z:"Oficina Central",op:"PDVSA",        t:"Mediano",     api:26.4, an:2023, prod:10450, vp:-5.0, gor:795,  bsw:31, lc:8.4,  pr:71.8, mo:63.4, ca:152,  ec:5.3, be:12.6, pa:39,  pt:72,  rpa:54, ppz:268, dt:9,  ai:23, r1:158,  r2:295,  fr:38, cl:"1P", cv:0.11, inc:2,  fl:3.4, sa:0},
  {y:"Santa Rosa",     z:"Oficina Central",op:"PDVSA",        t:"Mediano",     api:26.3, an:2024, prod:9930,  vp:-4.9, gor:810,  bsw:32, lc:8.7,  pr:74.5, mo:65.8, ca:158,  ec:5.1, be:12.9, pa:37,  pt:72,  rpa:51, ppz:268, dt:10, ai:24, r1:158,  r2:295,  fr:38, cl:"1P", cv:0.11, inc:2,  fl:3.6, sa:0},
  {y:"Barinas",        z:"Oficina Central",op:"PDVSA",        t:"Mediano",     api:25.1, an:2022, prod:8800,  vp:-5,   gor:810,  bsw:33, lc:8.2,  pr:66.8, mo:58.6, ca:130,  ec:5.0, be:12.5, pa:35,  pt:60,  rpa:58, ppz:251, dt:9,  ai:24, r1:135,  r2:250,  fr:36, cl:"2P", cv:0.12, inc:2,  fl:2.8, sa:0},
  {y:"Barinas",        z:"Oficina Central",op:"PDVSA",        t:"Mediano",     api:25.0, an:2023, prod:8360,  vp:-5.0, gor:828,  bsw:34, lc:8.6,  pr:71.0, mo:62.4, ca:138,  ec:4.8, be:13.0, pa:33,  pt:60,  rpa:55, ppz:253, dt:10, ai:25, r1:135,  r2:250,  fr:36, cl:"2P", cv:0.13, inc:3,  fl:3.0, sa:0},
  {y:"Barinas",        z:"Oficina Central",op:"PDVSA",        t:"Mediano",     api:24.9, an:2024, prod:7940,  vp:-5.0, gor:845,  bsw:35, lc:9.0,  pr:73.8, mo:64.8, ca:144,  ec:4.6, be:13.4, pa:31,  pt:60,  rpa:52, ppz:256, dt:11, ai:26, r1:135,  r2:250,  fr:36, cl:"2P", cv:0.13, inc:3,  fl:3.2, sa:0},
  {y:"Tucupita",       z:"Oficina Sur",    op:"PDVSA",        t:"Mediano",     api:22.8, an:2022, prod:9500,  vp:-6,   gor:760,  bsw:40, lc:9.0,  pr:64.5, mo:55.5, ca:155,  ec:4.8, be:13.5, pa:38,  pt:65,  rpa:58, ppz:250, dt:12, ai:26, r1:148,  r2:272,  fr:30, cl:"2P", cv:0.14, inc:3,  fl:3.8, sa:0},
  {y:"Tucupita",       z:"Oficina Sur",    op:"PDVSA",        t:"Mediano",     api:22.7, an:2023, prod:8930,  vp:-6.0, gor:778,  bsw:42, lc:9.4,  pr:68.6, mo:59.2, ca:164,  ec:4.5, be:14.0, pa:35,  pt:65,  rpa:54, ppz:255, dt:14, ai:27, r1:148,  r2:272,  fr:30, cl:"2P", cv:0.15, inc:4,  fl:4.0, sa:0},
  {y:"Tucupita",       z:"Oficina Sur",    op:"PDVSA",        t:"Mediano",     api:22.6, an:2024, prod:8390,  vp:-5.8, gor:795,  bsw:43, lc:9.8,  pr:71.3, mo:61.5, ca:172,  ec:4.2, be:14.4, pa:33,  pt:65,  rpa:51, ppz:254, dt:15, ai:28, r1:148,  r2:272,  fr:30, cl:"2P", cv:0.15, inc:4,  fl:4.2, sa:0},
  {y:"Pirital",        z:"Oficina Sur",    op:"PDVSA",        t:"Pesado",      api:19.4, an:2022, prod:16500, vp:-6,   gor:510,  bsw:50, lc:11.5, pr:63.8, mo:52.3, ca:260,  ec:4.5, be:16.2, pa:65,  pt:110, rpa:59, ppz:254, dt:14, ai:28, r1:228,  r2:420,  fr:26, cl:"2P", cv:0.15, inc:4,  fl:7.5, sa:0},
  {y:"Pirital",        z:"Oficina Sur",    op:"PDVSA",        t:"Pesado",      api:19.3, an:2023, prod:15510, vp:-6.0, gor:525,  bsw:52, lc:12.0, pr:67.8, mo:55.8, ca:274,  ec:4.2, be:16.8, pa:61,  pt:110, rpa:55, ppz:254, dt:16, ai:29, r1:228,  r2:420,  fr:26, cl:"2P", cv:0.16, inc:5,  fl:8.0, sa:0},
  {y:"Pirital",        z:"Oficina Sur",    op:"PDVSA",        t:"Pesado",      api:19.2, an:2024, prod:14580, vp:-5.9, gor:538,  bsw:54, lc:12.5, pr:70.5, mo:58.0, ca:286,  ec:3.9, be:17.2, pa:58,  pt:110, rpa:53, ppz:252, dt:17, ai:30, r1:228,  r2:420,  fr:26, cl:"2P", cv:0.16, inc:5,  fl:8.5, sa:0},
  {y:"Anaco",          z:"Anaco",          op:"PDVSA",        t:"Liviano",     api:32.0, an:2022, prod:5200,  vp:-9,   gor:2800, bsw:18, lc:6.2,  pr:74.5, mo:68.3, ca:68,   ec:5.8, be:9.8,  pa:22,  pt:40,  rpa:55, ppz:236, dt:6,  ai:18, r1:62,   r2:112,  fr:45, cl:"1P", cv:0.08, inc:1,  fl:0.8, sa:0},
  {y:"Anaco",          z:"Anaco",          op:"PDVSA",        t:"Liviano",     api:31.9, an:2023, prod:4732,  vp:-9.0, gor:2880, bsw:19, lc:6.5,  pr:79.0, mo:72.5, ca:72,   ec:5.5, be:10.1, pa:20,  pt:40,  rpa:50, ppz:237, dt:7,  ai:19, r1:62,   r2:112,  fr:45, cl:"1P", cv:0.09, inc:1,  fl:0.9, sa:0},
  {y:"Anaco",          z:"Anaco",          op:"PDVSA",        t:"Liviano",     api:31.8, an:2024, prod:4306,  vp:-9.0, gor:2950, bsw:20, lc:6.8,  pr:82.0, mo:75.2, ca:75,   ec:5.2, be:10.4, pa:18,  pt:40,  rpa:45, ppz:239, dt:8,  ai:20, r1:62,   r2:112,  fr:45, cl:"1P", cv:0.09, inc:1,  fl:1.0, sa:0},
];


// helpers (DATA es mutable: se reemplaza al cargar un archivo nuevo)
let DATA = [];
let yacs = [];
const BADGE = {Extrapesado:'badge-ext',Pesado:'badge-pes',Mediano:'badge-med',Liviano:'badge-liv'};
const COLORS = {
  "Faja Orinoco":   "#C8841A",
  "Oficina Norte":  "#5EC98A",
  "Oficina Central":"#60B4E8",
  "Oficina Sur":    "#A78BF0",
  "Anaco":          "#E87070",
};
const TIPO_C = {Extrapesado:"#E87070",Pesado:"#E8A832",Mediano:"#5EC98A",Liviano:"#60B4E8"};
function colorForZona(z){ return COLORS[z] || "#A78BF0"; }
function colorForTipo(t){ return TIPO_C[t] || "#A78BF0"; }

function avg(arr, key){ return arr.length ? arr.reduce((s,d)=>s+(d[key]||0),0)/arr.length : 0; }
function sum(arr, key){ return arr.reduce((s,d)=>s+(d[key]||0),0); }

function byYac(ds,key){ return yacs.map(y=>{ const r=ds.filter(d=>d.y===y); return avg(r,key); }); }
function byYacSum(ds,key){ return yacs.map(y=>{ const r=ds.filter(d=>d.y===y); return sum(r,key)/(r.length||1); }); }
function byYacField(ds,yac,key){ return ds.filter(d=>d.y===yac).sort((a,b)=>a.an-b.an).map(d=>d[key]); }
function firstOf(ds,yac,key){ return ds.find(d=>d.y===yac)?.[key]; }

// chart defaults
Chart.defaults.color = '#7A6A50';
Chart.defaults.font.family = "'IBM Plex Sans', sans-serif";
Chart.defaults.font.size = 10;

const CHART_OPTS = {
  responsive:true,
  maintainAspectRatio:false,
  plugins:{
    legend:{ labels:{ color:'#7A6A50', boxWidth:10, font:{size:10} } },
    tooltip:{ backgroundColor:'#2C1F0A', borderColor:'rgba(200,132,26,0.3)', borderWidth:1,
      titleColor:'#E8A832', bodyColor:'#C8B898', padding:10 }
  }
};

const gridOpts = {
  grid:{ color:'rgba(200,132,26,0.08)' },
  ticks:{ color:'#7A6A50' }
};

// ── navigation ──
function goTo(id, el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  el.classList.add('active');
}

function applyFilters(){
  const yearVal = document.getElementById('yearFilter').value;
  const zonaVal = document.getElementById('zonaFilter').value;

  const filtered = DATA.filter(d => {
    const matchYear = yearVal === 'all' || String(d.an) === yearVal;
    const matchZona = zonaVal === 'all' || d.z === zonaVal;
    return matchYear && matchZona;
  });

  if(filtered.length === 0){
    alert('No hay datos para la combinación de filtros seleccionada.');
    return;
  }

  yacs = [...new Set(filtered.map(d=>d.y))];

  Object.values(Chart.instances || {}).forEach(c=>c.destroy());
  document.querySelectorAll('canvas').forEach(cv=>{
    const ctx=cv.getContext('2d');
    ctx.clearRect(0,0,cv.width,cv.height);
  });

  updateGlobalKPIs_ds(filtered);
  updateInterpretationPage_ds(filtered);
  buildCharts(filtered);
}

// ══════════════════════════════════════════════════════════════
// MOTOR DE CARGA DE ARCHIVOS · CSV / XLSX → DATA[] CON CÁLCULOS DERIVADOS
// ══════════════════════════════════════════════════════════════

// Mapa: nombre de columna esperado (varias variantes aceptadas) → campo interno corto
const COLUMN_MAP = {
  yacimiento: 'y', nombre_yacimiento: 'y', campo: 'y',
  zona: 'z', area: 'z', región: 'z', region: 'z',
  operadora: 'op', operador: 'op',
  'año': 'an', anio: 'an', year: 'an', ano: 'an',
  tipo_crudo: 't', tipo: 't',
  gravedad_api: 'api', api: 'api', grados_api: 'api',
  prod_diaria_bbl: 'prod', produccion_diaria_bbl: 'prod', produccion: 'prod', prod_bbl_dia: 'prod',
  variacion_prod_pct: 'vp', variacion_produccion: 'vp',
  gor: 'gor',
  bsw_pct: 'bsw', bsw: 'bsw',
  lifting_cost_usd: 'lc', lifting_cost: 'lc', costo_extraccion: 'lc',
  precio_realizado_usd: 'pr', precio_realizado: 'pr', precio: 'pr',
  capex_acumulado_musd: 'ca', capex: 'ca', capex_musd: 'ca',
  pozos_activos: 'pa',
  pozos_totales: 'pt',
  downtime_pct: 'dt', downtime: 'dt',
  antiguedad_infraestructura_años: 'ai', antiguedad_infraestructura: 'ai', antiguedad: 'ai',
  reservas_1p_mmbbl: 'r1', reservas_1p: 'r1',
  reservas_2p_mmbbl: 'r2', reservas_2p: 'r2',
  factor_recobro_pct: 'fr', factor_recobro: 'fr',
  clasificacion_reservas: 'cl', clasificacion: 'cl',
  cv_produccion: 'cv',
  incidentes_operativos: 'inc', incidentes: 'inc',
  flaring_mmscfd: 'fl', flaring: 'fl',
  sancion_activa: 'sa', sancion: 'sa',
  // campos opcionalmente pre-calculados (si vienen, se respetan)
  margen_operativo_usd: 'mo', margen: 'mo',
  breakeven_usd: 'be', breakeven: 'be',
  eficiencia_capex: 'ec',
  ratio_pozos_activos_pct: 'rpa',
  prod_por_pozo_bbl: 'ppz',
};

const REQUIRED_FIELDS = ['y','an','prod','lc','pr'];

function normalizeHeader(h){
  return String(h).trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'') // strip accents for matching keys
    .replace(/\s+/g,'_');
}

function parseRows(rawRows){
  // rawRows: array of objects with raw headers as keys
  const out = [];
  const warnings = [];
  rawRows.forEach((raw, idx) => {
    const row = {};
    Object.keys(raw).forEach(h => {
      const norm = normalizeHeader(h);
      const mapped = COLUMN_MAP[norm] || COLUMN_MAP[h.trim().toLowerCase()];
      if (mapped) {
        let val = raw[h];
        if (typeof val === 'string') val = val.trim();
        row[mapped] = val;
      }
    });
    // skip completely empty rows
    const hasAny = Object.values(row).some(v => v !== undefined && v !== '');
    if (!hasAny) return;

    // type coercion
    ['an','api','prod','vp','gor','bsw','lc','pr','ca','pa','pt','dt','ai','r1','r2','fr','cv','inc','fl','sa','mo','be','ec','rpa','ppz']
      .forEach(k => { if (row[k] !== undefined && row[k] !== '') row[k] = parseFloat(String(row[k]).replace(',','.')); });

    row.y  = row.y  ? String(row.y).trim() : '';
    row.z  = row.z  ? String(row.z).trim() : 'Sin zona';
    row.op = row.op ? String(row.op).trim() : 'N/D';
    row.t  = row.t  ? String(row.t).trim() : 'Mediano';
    row.cl = row.cl ? String(row.cl).trim().toUpperCase() : '2P';
    row.sa = (row.sa === 1 || row.sa === '1' || String(row.sa).toLowerCase()==='si' || String(row.sa).toLowerCase()==='sí' || row.sa === true) ? 1 : 0;

    const missing = REQUIRED_FIELDS.filter(f => row[f] === undefined || row[f] === '' || (typeof row[f]==='number' && isNaN(row[f])));
    if (missing.length) {
      warnings.push(`Fila ${idx+2}: faltan campos obligatorios (${missing.join(', ')}) — omitida`);
      return;
    }
    out.push(row);
  });
  return { rows: out, warnings };
}

function computeDerived(rows){
  // agrupar por yacimiento para variación interanual si no vino dada
  const byY = {};
  rows.forEach(r => { (byY[r.y] = byY[r.y]||[]).push(r); });

  rows.forEach(r => {
    // defaults razonables si faltan opcionales
    if (r.api === undefined || isNaN(r.api)) r.api = 20;
    if (r.gor === undefined || isNaN(r.gor)) r.gor = 500;
    if (r.bsw === undefined || isNaN(r.bsw)) r.bsw = 35;
    if (r.ca  === undefined || isNaN(r.ca))  r.ca  = 0;
    if (r.pa  === undefined || isNaN(r.pa))  r.pa  = 0;
    if (r.pt  === undefined || isNaN(r.pt))  r.pt  = Math.max(r.pa,1);
    if (r.dt  === undefined || isNaN(r.dt))  r.dt  = 0;
    if (r.ai  === undefined || isNaN(r.ai))  r.ai  = 15;
    if (r.r1  === undefined || isNaN(r.r1))  r.r1  = 0;
    if (r.r2  === undefined || isNaN(r.r2))  r.r2  = r.r1;
    if (r.fr  === undefined || isNaN(r.fr))  r.fr  = 20;
    if (r.cv  === undefined || isNaN(r.cv))  r.cv  = 0.15;
    if (r.inc === undefined || isNaN(r.inc)) r.inc = 0;
    if (r.fl  === undefined || isNaN(r.fl))  r.fl  = 0;

    // ── margen operativo: precio realizado − lifting cost ──
    if (r.mo === undefined || isNaN(r.mo)) r.mo = +(r.pr - r.lc).toFixed(2);

    // ── breakeven: estimado como 1.25x lifting cost si no viene dado ──
    if (r.be === undefined || isNaN(r.be)) r.be = +(r.lc * 1.25).toFixed(2);

    // ── eficiencia capex: bbl/año producidos (en millones) / capex (en miles de MM) ──
    if (r.ec === undefined || isNaN(r.ec)) {
      r.ec = r.ca > 0 ? +(((r.prod * 365) / 1e6) / (r.ca / 1000)).toFixed(3) : 0;
    }

    // ── ratio pozos activos ──
    if (r.rpa === undefined || isNaN(r.rpa)) {
      r.rpa = r.pt > 0 ? +((r.pa / r.pt) * 100).toFixed(1) : 0;
    }

    // ── producción por pozo activo ──
    if (r.ppz === undefined || isNaN(r.ppz)) {
      r.ppz = r.pa > 0 ? +(r.prod / r.pa).toFixed(1) : 0;
    }
  });

  // ── variación de producción interanual (si no vino dada) ──
  Object.values(byY).forEach(group => {
    group.sort((a,b) => a.an - b.an);
    group.forEach((r, i) => {
      if (r.vp === undefined || isNaN(r.vp)) {
        if (i === 0) { r.vp = 0; }
        else {
          const prev = group[i-1];
          r.vp = prev.prod > 0 ? +(((r.prod - prev.prod) / prev.prod) * 100).toFixed(2) : 0;
        }
      }
    });
  });

  return rows;
}

function loadIntoDashboard(rows, sourceLabel){
  DATA = rows;
  yacs = [...new Set(DATA.map(d=>d.y))];
  document.getElementById('footerZona').textContent = sourceLabel || 'Datos cargados';
  document.getElementById('footerStats').textContent = `${yacs.length} yacimientos · ${DATA.length} registros`;
  buildAll();
  enterDashboard();
}

function loadDemoData(){
  const { rows } = parseRows(DEMO_DATA.map(d => ({
    yacimiento:d.y, zona:d.z, operadora:d.op, año:d.an, tipo_crudo:d.t, gravedad_api:d.api,
    prod_diaria_bbl:d.prod, variacion_prod_pct:d.vp, gor:d.gor, bsw_pct:d.bsw, lifting_cost_usd:d.lc,
    precio_realizado_usd:d.pr, capex_acumulado_musd:d.ca, pozos_activos:d.pa, pozos_totales:d.pt,
    downtime_pct:d.dt, antiguedad_infraestructura:d.ai, reservas_1p_mmbbl:d.r1, reservas_2p_mmbbl:d.r2,
    factor_recobro_pct:d.fr, clasificacion_reservas:d.cl, cv_produccion:d.cv, incidentes_operativos:d.inc,
    flaring_mmscfd:d.fl, sancion_activa:d.sa
  })));
  computeDerived(rows);
  showStatus('ok', `✓ Datos de ejemplo cargados: ${[...new Set(rows.map(r=>r.y))].length} yacimientos, ${rows.length} registros.`);
  loadIntoDashboard(rows, 'Datos de ejemplo · Sur de Anzoátegui');
}

function showStatus(type, msg){
  const el = document.getElementById('uploadStatus');
  el.className = 'upload-status show ' + type;
  el.innerHTML = msg;
}

function handleFile(file){
  if (!file) return;
  const isCSV = /\.csv$/i.test(file.name);
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      let rawRows;
      if (isCSV) {
        const wb = XLSX.read(e.target.result, { type:'string' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        rawRows = XLSX.utils.sheet_to_json(ws, { defval:'' });
      } else {
        const wb = XLSX.read(e.target.result, { type:'array' });
        // si hay una hoja llamada "Datos_Maestros" se prioriza, si no, la primera
        const sheetName = wb.SheetNames.includes('Datos_Maestros') ? 'Datos_Maestros' : wb.SheetNames[0];
        const ws = wb.Sheets[sheetName];
        rawRows = XLSX.utils.sheet_to_json(ws, { defval:'', range: wb.SheetNames.includes('Datos_Maestros') ? 3 : 0 });
      }

      if (!rawRows || !rawRows.length) {
        showStatus('err', '✗ El archivo no contiene filas de datos legibles.');
        return;
      }

      const { rows, warnings } = parseRows(rawRows);

      if (!rows.length) {
        showStatus('err', '✗ No se pudo interpretar ninguna fila. Verifica que las columnas tengan los nombres esperados (revisa la lista de columnas más abajo) y que incluyan al menos: yacimiento, año, producción, lifting cost y precio.');
        return;
      }

      computeDerived(rows);
      const nYac = [...new Set(rows.map(r=>r.y))].length;
      let msg = `✓ Archivo leído correctamente: <b>${nYac} yacimientos</b>, <b>${rows.length} registros</b>.`;
      if (warnings.length) msg += `<br><span style="opacity:0.8">⚠ ${warnings.length} fila(s) omitida(s) por datos incompletos.</span>`;
      showStatus('ok', msg);

      window._pendingRows = rows;
      window._pendingLabel = file.name;
      document.getElementById('btnEnter').disabled = false;
      document.getElementById('btnEnter').textContent = `Entrar al dashboard (${nYac} yacimientos) →`;

    } catch (err) {
      showStatus('err', '✗ Error al procesar el archivo: ' + err.message + '. Verifica que sea un CSV o Excel válido.');
    }
  };
  if (isCSV) reader.readAsText(file, 'UTF-8');
  else reader.readAsArrayBuffer(file);
}

function enterDashboard(){
  if (window._pendingRows) {
    loadIntoDashboard(window._pendingRows, window._pendingLabel);
    window._pendingRows = null;
  } else if (DATA.length) {
    document.getElementById('uploadScreen').style.display = 'none';
    document.getElementById('dashboardRoot').style.display = 'flex';
    document.getElementById('dashboardRoot').style.flexDirection = 'column';
    document.getElementById('dashboardRoot').style.minHeight = '100vh';
  }
}

function resetTool(){
  document.getElementById('dashboardRoot').style.display = 'none';
  document.getElementById('uploadScreen').style.display = 'flex';
  document.getElementById('fileInput').value = '';
  document.getElementById('uploadStatus').className = 'upload-status';
  document.getElementById('btnEnter').disabled = true;
  document.getElementById('btnEnter').textContent = 'Entrar al dashboard →';
}

function downloadTemplate(){
  const headers = ['yacimiento','zona','operadora','año','tipo_crudo','gravedad_api','prod_diaria_bbl',
    'variacion_prod_pct','gor','bsw_pct','lifting_cost_usd','precio_realizado_usd','capex_acumulado_musd',
    'pozos_activos','pozos_totales','downtime_pct','antiguedad_infraestructura','reservas_1p_mmbbl',
    'reservas_2p_mmbbl','factor_recobro_pct','clasificacion_reservas','cv_produccion',
    'incidentes_operativos','flaring_mmscfd','sancion_activa'];
  const example = ['Hamaca','Faja Orinoco','PDVSA-Chevron',2024,'Extrapesado',8.5,87500,-4.1,200,82,
    20.8,58.2,1980,430,620,27,40,1200,2100,12,'2P',0.25,16,48,1];
  const csv = headers.join(',') + '\n' + example.join(',') + '\n';
  const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'plantilla_yacimientos.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── drag & drop wiring ──
document.addEventListener('DOMContentLoaded', () => {
  const dz = document.getElementById('dropzone');
  const input = document.getElementById('fileInput');
  input.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); });
  ['dragenter','dragover'].forEach(evt => dz.addEventListener(evt, (e) => { e.preventDefault(); dz.classList.add('dragover'); }));
  ['dragleave','drop'].forEach(evt => dz.addEventListener(evt, (e) => { e.preventDefault(); dz.classList.remove('dragover'); }));
  dz.addEventListener('drop', (e) => { if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
});

// ══════════════════════════════════════════════════════════════
// KPIs GLOBALES (cabecera) — recalculados dinámicamente con cada carga
// ══════════════════════════════════════════════════════════════
function updateGlobalKPIs(){
  if (!DATA.length) return;
  const years = [...new Set(DATA.map(d=>d.an))].sort((a,b)=>a-b);
  const lastYear = years[years.length-1];
  const prevYear = years.length>1 ? years[years.length-2] : null;

  // Producción total (último año disponible, suma de yacimientos)
  const prodLast = sum(DATA.filter(d=>d.an===lastYear), 'prod');
  const prodPrev = prevYear ? sum(DATA.filter(d=>d.an===prevYear), 'prod') : null;
  const prodDeltaPct = prodPrev ? ((prodLast - prodPrev) / prodPrev) * 100 : null;

  document.getElementById('kpi-prod').innerHTML = `${Math.round(prodLast).toLocaleString('es-VE')}<span class="kpi-unit">bbl/día</span>`;
  const dEl1 = document.getElementById('kpi-prod-d');
  if (prodDeltaPct !== null) {
    dEl1.textContent = `${prodDeltaPct>=0?'▲':'▼'} ${prodDeltaPct>=0?'+':''}${prodDeltaPct.toFixed(1)}% vs ${prevYear}`;
    dEl1.className = 'kpi-delta ' + (prodDeltaPct>=0?'up':'down');
  } else { dEl1.textContent = `Año ${lastYear}`; dEl1.className='kpi-delta'; }

  // Margen operativo promedio (ponderado simple, todos los registros)
  const moAll = avg(DATA, 'mo');
  const moFirstYear = avg(DATA.filter(d=>d.an===years[0]), 'mo');
  document.getElementById('kpi-margen').innerHTML = `${moAll.toFixed(1)}<span class="kpi-unit">USD/bbl</span>`;
  const dEl2 = document.getElementById('kpi-margen-d');
  if (years.length>1) {
    const diff = moAll - moFirstYear;
    dEl2.textContent = `${diff>=0?'▲':'▼'} ${diff>=0?'+':''}${diff.toFixed(1)} USD vs ${years[0]}`;
    dEl2.className = 'kpi-delta ' + (diff>=0?'up':'down');
  } else { dEl2.textContent = `Año ${lastYear}`; dEl2.className='kpi-delta'; }

  // % yacimientos sobre breakeven (último año, por yacimiento único)
  const lastRows = DATA.filter(d=>d.an===lastYear);
  const overBE = lastRows.filter(d => d.mo > d.be).length;
  const pctBE = lastRows.length ? (overBE/lastRows.length)*100 : 0;
  const underBE = lastRows.length - overBE;
  document.getElementById('kpi-be').innerHTML = `${pctBE.toFixed(0)}<span class="kpi-unit">%</span>`;
  const dEl3 = document.getElementById('kpi-be-d');
  dEl3.textContent = underBE>0 ? `⚠ ${underBE} campo(s) bajo breakeven` : `✓ Todos sobre breakeven`;
  dEl3.className = 'kpi-delta ' + (underBE>0?'warn':'up');

  // Ratio de pozos activos promedio
  const rpaLast = avg(lastRows, 'rpa');
  const rpaFirst = avg(DATA.filter(d=>d.an===years[0]), 'rpa');
  document.getElementById('kpi-pozos').innerHTML = `${rpaLast.toFixed(0)}<span class="kpi-unit">%</span>`;
  const dEl4 = document.getElementById('kpi-pozos-d');
  if (years.length>1) {
    const diffP = rpaLast - rpaFirst;
    dEl4.textContent = `${diffP>=0?'▲ +':'▼ '}${diffP.toFixed(0)}pts vs ${years[0]}`;
    dEl4.className = 'kpi-delta ' + (diffP>=0?'up':'down');
  } else { dEl4.textContent = `Año ${lastYear}`; dEl4.className='kpi-delta'; }

  // Reservas 1P totales (último año, por yacimiento único — evita doble conteo si hay multi-año)
  const yacsLast = [...new Set(lastRows.map(d=>d.y))];
  const r1Total = yacsLast.reduce((s,y)=> s + (lastRows.find(d=>d.y===y)?.r1||0), 0);
  document.getElementById('kpi-res').innerHTML = `${Math.round(r1Total).toLocaleString('es-VE')}<span class="kpi-unit">MMbbl</span>`;
  document.getElementById('kpi-res-d').textContent = `${yacsLast.length} yacimientos activos`;

  // Índice de riesgo compuesto (normalizado simple 0–1) + sanciones
  const cvN = avg(lastRows,'cv') / 0.4;
  const incN = avg(lastRows,'inc') / 20;
  const flN = avg(lastRows,'fl') / 60;
  const riskIdx = Math.min(1, (cvN+incN+flN)/3);
  const sancionados = lastRows.filter(d=>d.sa===1).length;
  document.getElementById('kpi-risk').innerHTML = `${riskIdx.toFixed(2)}<span class="kpi-unit">/1.0</span>`;
  const dEl6 = document.getElementById('kpi-risk-d');
  dEl6.textContent = sancionados>0 ? `▼ ${sancionados} campo(s) con sanción` : `✓ Sin sanciones activas`;
  dEl6.className = 'kpi-delta ' + (sancionados>0?'down':'up');
}
function updateGlobalKPIs_ds(ds){
  if (!ds.length) return;
  const years = [...new Set(ds.map(d=>d.an))].sort((a,b)=>a-b);
  const lastYear = years[years.length-1];
  const prevYear = years.length>1 ? years[years.length-2] : null;

  // Producción total (último año disponible, suma de yacimientos)
  const prodLast = sum(ds.filter(d=>d.an===lastYear), 'prod');
  const prodPrev = prevYear ? sum(ds.filter(d=>d.an===prevYear), 'prod') : null;
  const prodDeltaPct = prodPrev ? ((prodLast - prodPrev) / prodPrev) * 100 : null;

  document.getElementById('kpi-prod').innerHTML = `${Math.round(prodLast).toLocaleString('es-VE')}<span class="kpi-unit">bbl/día</span>`;
  const dEl1 = document.getElementById('kpi-prod-d');
  if (prodDeltaPct !== null) {
    dEl1.textContent = `${prodDeltaPct>=0?'▲':'▼'} ${prodDeltaPct>=0?'+':''}${prodDeltaPct.toFixed(1)}% vs ${prevYear}`;
    dEl1.className = 'kpi-delta ' + (prodDeltaPct>=0?'up':'down');
  } else { dEl1.textContent = `Año ${lastYear}`; dEl1.className='kpi-delta'; }

  // Margen operativo promedio (ponderado simple, todos los registros)
  const moAll = avg(DATA, 'mo');
  const moFirstYear = avg(ds.filter(d=>d.an===years[0]), 'mo');
  document.getElementById('kpi-margen').innerHTML = `${moAll.toFixed(1)}<span class="kpi-unit">USD/bbl</span>`;
  const dEl2 = document.getElementById('kpi-margen-d');
  if (years.length>1) {
    const diff = moAll - moFirstYear;
    dEl2.textContent = `${diff>=0?'▲':'▼'} ${diff>=0?'+':''}${diff.toFixed(1)} USD vs ${years[0]}`;
    dEl2.className = 'kpi-delta ' + (diff>=0?'up':'down');
  } else { dEl2.textContent = `Año ${lastYear}`; dEl2.className='kpi-delta'; }

  // % yacimientos sobre breakeven (último año, por yacimiento único)
  const lastRows = ds.filter(d=>d.an===lastYear);
  const overBE = lastRows.filter(d => d.mo > d.be).length;
  const pctBE = lastRows.length ? (overBE/lastRows.length)*100 : 0;
  const underBE = lastRows.length - overBE;
  document.getElementById('kpi-be').innerHTML = `${pctBE.toFixed(0)}<span class="kpi-unit">%</span>`;
  const dEl3 = document.getElementById('kpi-be-d');
  dEl3.textContent = underBE>0 ? `⚠ ${underBE} campo(s) bajo breakeven` : `✓ Todos sobre breakeven`;
  dEl3.className = 'kpi-delta ' + (underBE>0?'warn':'up');

  // Ratio de pozos activos promedio
  const rpaLast = avg(lastRows, 'rpa');
  const rpaFirst = avg(ds.filter(d=>d.an===years[0]), 'rpa');
  document.getElementById('kpi-pozos').innerHTML = `${rpaLast.toFixed(0)}<span class="kpi-unit">%</span>`;
  const dEl4 = document.getElementById('kpi-pozos-d');
  if (years.length>1) {
    const diffP = rpaLast - rpaFirst;
    dEl4.textContent = `${diffP>=0?'▲ +':'▼ '}${diffP.toFixed(0)}pts vs ${years[0]}`;
    dEl4.className = 'kpi-delta ' + (diffP>=0?'up':'down');
  } else { dEl4.textContent = `Año ${lastYear}`; dEl4.className='kpi-delta'; }

  // Reservas 1P totales (último año, por yacimiento único — evita doble conteo si hay multi-año)
  const yacsLast = [...new Set(lastRows.map(d=>d.y))];
  const r1Total = yacsLast.reduce((s,y)=> s + (lastRows.find(d=>d.y===y)?.r1||0), 0);
  document.getElementById('kpi-res').innerHTML = `${Math.round(r1Total).toLocaleString('es-VE')}<span class="kpi-unit">MMbbl</span>`;
  document.getElementById('kpi-res-d').textContent = `${yacsLast.length} yacimientos activos`;

  // Índice de riesgo compuesto (normalizado simple 0–1) + sanciones
  const cvN = avg(lastRows,'cv') / 0.4;
  const incN = avg(lastRows,'inc') / 20;
  const flN = avg(lastRows,'fl') / 60;
  const riskIdx = Math.min(1, (cvN+incN+flN)/3);
  const sancionados = lastRows.filter(d=>d.sa===1).length;
  document.getElementById('kpi-risk').innerHTML = `${riskIdx.toFixed(2)}<span class="kpi-unit">/1.0</span>`;
  const dEl6 = document.getElementById('kpi-risk-d');
  dEl6.textContent = sancionados>0 ? `▼ ${sancionados} campo(s) con sanción` : `✓ Sin sanciones activas`;
  dEl6.className = 'kpi-delta ' + (sancionados>0?'down':'up');
}


// ══════════════════════════════════════════════════════════════
// PÁGINA DE INTERPRETACIÓN — genera 3 hallazgos narrativos a partir de los datos cargados
// ══════════════════════════════════════════════════════════════
function updateInterpretationPage(){
  if (!DATA.length) return;
  const years = [...new Set(DATA.map(d=>d.an))].sort((a,b)=>a-b);
  const lastYear = years[years.length-1];
  const lastRows = DATA.filter(d=>d.an===lastYear);
  const nYac = yacs.length;

  document.getElementById('heroTags').innerHTML = `
    <span class="interp-tag">${nYac} yacimiento${nYac!==1?'s':''} analizado${nYac!==1?'s':''}</span>
    <span class="interp-tag">${years.length} año${years.length!==1?'s':''} de datos (${years[0]}${years.length>1?'–'+years[years.length-1]:''})</span>
    <span class="interp-tag">3 hallazgos principales</span>
    <span class="interp-tag">Análisis descriptivo</span>`;

  // ── HALLAZGO 1: Concentración productiva (regla de Pareto sobre el último año) ──
  const sortedByProd = [...lastRows].sort((a,b)=>b.prod-a.prod);
  const totalProd = sum(lastRows,'prod') || 1;
  let cum=0, topN=0, topYacs=[];
  for (const r of sortedByProd){ cum+=r.prod; topN++; topYacs.push(r.y); if (cum/totalProd>=0.6) break; }
  const topShare = (cum/totalProd)*100;
  const topRows = sortedByProd.slice(0, topN);
  const restRows = sortedByProd.slice(topN);
  const dtTop = avg(topRows,'dt'), dtRest = restRows.length?avg(restRows,'dt'):dtTop;
  const bswTop = avg(topRows,'bsw');
  const sancTop = topRows.filter(d=>d.sa===1).length;

  document.getElementById('s1-title').textContent =
    nYac<=2 ? 'Perfil de concentración productiva del portafolio'
    : `El portafolio depende fuertemente de ${topN} yacimiento${topN!==1?'s':''}`;
  document.getElementById('s1-plain').innerHTML = nYac<3
    ? `Con solo ${nYac} yacimiento(s) cargado(s), todavía no hay base suficiente para hablar de "concentración" — esta lectura cobra más sentido con un portafolio más amplio.`
    : `En palabras simples: <b>${topN} de ${nYac} yacimientos (${topYacs.slice(0,3).join(', ')}${topYacs.length>3?'…':''}) generan cerca del ${topShare.toFixed(0)}% de toda la producción</b> del portafolio en ${lastYear}. ${dtTop>dtRest ? 'Y son, en promedio, los que más tiempo pasan detenidos por fallas.' : 'Conviene vigilar su estabilidad operativa de cerca, ya que cualquier problema en ellos golpea fuerte al total.'}`;
  document.getElementById('s1-detail').textContent =
    `La concentración productiva no es un problema en sí misma, pero combinada con downtime elevado, alto contenido de agua (BSW) o sanciones activas, reduce la capacidad del portafolio de absorber un choque en esos campos clave.`;
  document.getElementById('s1-evidence').innerHTML = `
    <div class="evidence-chip"><div class="ev-num">${topShare.toFixed(0)}%</div><div class="ev-lbl">Producción en ${topN} campo(s)</div></div>
    <div class="evidence-chip"><div class="ev-num">${dtTop.toFixed(0)}%</div><div class="ev-lbl">Downtime prom. en esos campos</div></div>
    <div class="evidence-chip"><div class="ev-num">${bswTop.toFixed(0)}%</div><div class="ev-lbl">Agua en el crudo (BSW)</div></div>
    <div class="evidence-chip"><div class="ev-num">${sancTop} de ${topN}</div><div class="ev-lbl">Bajo sanción activa</div></div>`;
  document.getElementById('s1-action').innerHTML =
    `<b>Qué hacer con esto:</b> ${topShare>55 ? 'antes de seguir invirtiendo más en estos campos dominantes, vale la pena evaluar si el portafolio necesita diversificarse hacia campos más pequeños pero más estables.' : 'el portafolio muestra una distribución relativamente equilibrada; el foco puede estar en sostener esa diversificación.'}`;

  // ── HALLAZGO 2: Brecha de rentabilidad entre tipos de crudo ──
  const tipos = [...new Set(lastRows.map(d=>d.t))];
  const tipoStats = tipos.map(t=>({ t, mo: avg(lastRows.filter(d=>d.t===t),'mo'), n: lastRows.filter(d=>d.t===t).length }))
    .sort((a,b)=>b.mo-a.mo);
  const best = tipoStats[0], worst = tipoStats[tipoStats.length-1];
  const underBE = lastRows.filter(d=>d.mo <= d.be);
  document.getElementById('s2-title').textContent = tipoStats.length>1
    ? `Brecha de rentabilidad entre crudo ${best.t.toLowerCase()} y ${worst.t.toLowerCase()}`
    : 'Análisis de margen operativo del portafolio';
  document.getElementById('s2-plain').innerHTML = tipoStats.length>1
    ? `En palabras simples: <b>los yacimientos de crudo ${best.t.toLowerCase()} dejan en promedio $${(best.mo-worst.mo).toFixed(1)} más de ganancia por barril</b> que los de crudo ${worst.t.toLowerCase()}. No siempre el campo que más produce es el que más conviene financieramente.`
    : `En palabras simples: el margen operativo promedio del portafolio es de <b>$${avg(lastRows,'mo').toFixed(1)} por barril</b> en ${lastYear}.`;
  document.getElementById('s2-detail').textContent =
    `Esto suele deberse a que los crudos más pesados se venden con descuento frente al petróleo de referencia y cuestan más extraer (más energía, diluyentes, tratamiento de agua), mientras que los crudos más livianos tienen mejor precio y menor costo operativo.`;
  document.getElementById('s2-evidence').innerHTML = tipoStats.length>1 ? `
    <div class="evidence-chip"><div class="ev-num">$${worst.mo.toFixed(1)}/bbl</div><div class="ev-lbl">Margen prom. ${worst.t}</div></div>
    <div class="evidence-chip"><div class="ev-num">$${best.mo.toFixed(1)}/bbl</div><div class="ev-lbl">Margen prom. ${best.t}</div></div>
    <div class="evidence-chip"><div class="ev-num">${tipoStats.length}</div><div class="ev-lbl">Tipos de crudo en el portafolio</div></div>
    <div class="evidence-chip"><div class="ev-num">${underBE.length}</div><div class="ev-lbl">Campo(s) en/bajo breakeven</div></div>` : `
    <div class="evidence-chip"><div class="ev-num">$${avg(lastRows,'mo').toFixed(1)}</div><div class="ev-lbl">Margen prom. (USD/bbl)</div></div>
    <div class="evidence-chip"><div class="ev-num">${underBE.length}</div><div class="ev-lbl">Campo(s) en/bajo breakeven</div></div>`;
  document.getElementById('s2-action').innerHTML =
    `<b>Qué hacer con esto:</b> "producir más" no siempre significa "ganar más". Conviene comparar el retorno marginal de invertir en volumen contra el de mejorar márgenes en los campos ya rentables.`;

  // ── HALLAZGO 3: Estado de la base de pozos ──
  const rpaAll = avg(lastRows,'rpa');
  const lowRpa = lastRows.filter(d=>d.rpa<55);
  const aiMax = lastRows.length ? Math.max(...lastRows.map(d=>d.ai)) : 0;
  const aiMin = lastRows.length ? Math.min(...lastRows.map(d=>d.ai)) : 0;
  let rpaDeltaTxt = '';
  if (years.length>1){
    const rpaFirst = avg(DATA.filter(d=>d.an===years[0]),'rpa');
    const diff = rpaAll - rpaFirst;
    rpaDeltaTxt = `<div class="evidence-chip"><div class="ev-num">${diff>=0?'↑':'↓'} ${Math.abs(diff).toFixed(0)} pts</div><div class="ev-lbl">Cambio del ratio desde ${years[0]}</div></div>`;
  }
  document.getElementById('s3-title').textContent = 'Estado de la base de pozos del portafolio';
  document.getElementById('s3-plain').innerHTML =
    `En palabras simples: <b>en promedio, ${rpaAll.toFixed(0)}% de los pozos perforados del portafolio están activos</b> en ${lastYear}. ${rpaAll<65 ? 'Una parte considerable está detenida — no necesariamente porque se agotó el petróleo, sino por falta de mantenimiento o reactivación.' : 'Es un nivel saludable de aprovechamiento de la infraestructura ya construida.'}`;
  document.getElementById('s3-detail').textContent =
    `Los yacimientos con infraestructura más antigua suelen mostrar menor ratio de pozos activos y mayor downtime. Si esos mismos campos aún tienen reservas 2P remanentes, la reactivación de pozos puede ser más barata que perforar pozos nuevos.`;
  document.getElementById('s3-evidence').innerHTML = `
    <div class="evidence-chip"><div class="ev-num">${rpaAll.toFixed(0)}%</div><div class="ev-lbl">Pozos activos (promedio)</div></div>
    <div class="evidence-chip"><div class="ev-num">${lowRpa.length}</div><div class="ev-lbl">Campo(s) con &lt;55% activos</div></div>
    <div class="evidence-chip"><div class="ev-num">${aiMin.toFixed(0)}–${aiMax.toFixed(0)}</div><div class="ev-lbl">Rango de antigüedad (años)</div></div>
    ${rpaDeltaTxt}`;
  document.getElementById('s3-action').innerHTML =
    `<b>Qué hacer con esto:</b> ${lowRpa.length>0 ? 'antes de invertir en nuevas perforaciones, vale la pena evaluar si reactivar los pozos inactivos de ' + lowRpa.map(d=>d.y).slice(0,3).join(', ') + ' ofrece mejor retorno inmediato.' : 'el portafolio aprovecha razonablemente bien su base de pozos existente.'}`;

  // ── CONCLUSIÓN DINÁMICA ──
  document.getElementById('conclusionBanner').innerHTML = `
    <h3>✅ En resumen: ¿en qué se debería pensar primero?</h3>
    <p>Con base en los datos cargados, estas son las ideas clave que se desprenden del diagnóstico:</p>
    <ul class="conclusion-list">
      <li><b>Concentración y riesgo no están repartidos por igual.</b> ${topN} de ${nYac} campo(s) generan ~${topShare.toFixed(0)}% de la producción — vale la pena revisar si ese nivel de dependencia es aceptable.</li>
      <li><b>El volumen no es lo mismo que la rentabilidad.</b> ${tipoStats.length>1 ? `El crudo ${best.t.toLowerCase()} entrega mejor margen por barril que el ${worst.t.toLowerCase()}, aunque produzca menos volumen.` : `El margen operativo promedio es de $${avg(lastRows,'mo').toFixed(1)}/bbl — conviene monitorear su evolución.`}</li>
      <li><b>La oportunidad más barata puede ser reactivar, no perforar.</b> Con ${rpaAll.toFixed(0)}% de pozos activos en promedio, ${lowRpa.length>0 ? 'hay ' + lowRpa.length + ' campo(s) con potencial de reactivación de bajo costo relativo.' : 'el portafolio ya aprovecha bien su infraestructura.'}</li>
    </ul>`;
}
function updateInterpretationPage_ds(ds){
  if (!ds.length) return;
  const years = [...new Set(ds.map(d=>d.an))].sort((a,b)=>a-b);
  const lastYear = years[years.length-1];
  const lastRows = ds.filter(d=>d.an===lastYear);
  const nYac = yacs.length;

  document.getElementById('heroTags').innerHTML = `
    <span class="interp-tag">${nYac} yacimiento${nYac!==1?'s':''} analizado${nYac!==1?'s':''}</span>
    <span class="interp-tag">${years.length} año${years.length!==1?'s':''} de datos (${years[0]}${years.length>1?'–'+years[years.length-1]:''})</span>
    <span class="interp-tag">3 hallazgos principales</span>
    <span class="interp-tag">Análisis descriptivo</span>`;

  // ── HALLAZGO 1: Concentración productiva (regla de Pareto sobre el último año) ──
  const sortedByProd = [...lastRows].sort((a,b)=>b.prod-a.prod);
  const totalProd = sum(lastRows,'prod') || 1;
  let cum=0, topN=0, topYacs=[];
  for (const r of sortedByProd){ cum+=r.prod; topN++; topYacs.push(r.y); if (cum/totalProd>=0.6) break; }
  const topShare = (cum/totalProd)*100;
  const topRows = sortedByProd.slice(0, topN);
  const restRows = sortedByProd.slice(topN);
  const dtTop = avg(topRows,'dt'), dtRest = restRows.length?avg(restRows,'dt'):dtTop;
  const bswTop = avg(topRows,'bsw');
  const sancTop = topRows.filter(d=>d.sa===1).length;

  document.getElementById('s1-title').textContent =
    nYac<=2 ? 'Perfil de concentración productiva del portafolio'
    : `El portafolio depende fuertemente de ${topN} yacimiento${topN!==1?'s':''}`;
  document.getElementById('s1-plain').innerHTML = nYac<3
    ? `Con solo ${nYac} yacimiento(s) cargado(s), todavía no hay base suficiente para hablar de "concentración" — esta lectura cobra más sentido con un portafolio más amplio.`
    : `En palabras simples: <b>${topN} de ${nYac} yacimientos (${topYacs.slice(0,3).join(', ')}${topYacs.length>3?'…':''}) generan cerca del ${topShare.toFixed(0)}% de toda la producción</b> del portafolio en ${lastYear}. ${dtTop>dtRest ? 'Y son, en promedio, los que más tiempo pasan detenidos por fallas.' : 'Conviene vigilar su estabilidad operativa de cerca, ya que cualquier problema en ellos golpea fuerte al total.'}`;
  document.getElementById('s1-detail').textContent =
    `La concentración productiva no es un problema en sí misma, pero combinada con downtime elevado, alto contenido de agua (BSW) o sanciones activas, reduce la capacidad del portafolio de absorber un choque en esos campos clave.`;
  document.getElementById('s1-evidence').innerHTML = `
    <div class="evidence-chip"><div class="ev-num">${topShare.toFixed(0)}%</div><div class="ev-lbl">Producción en ${topN} campo(s)</div></div>
    <div class="evidence-chip"><div class="ev-num">${dtTop.toFixed(0)}%</div><div class="ev-lbl">Downtime prom. en esos campos</div></div>
    <div class="evidence-chip"><div class="ev-num">${bswTop.toFixed(0)}%</div><div class="ev-lbl">Agua en el crudo (BSW)</div></div>
    <div class="evidence-chip"><div class="ev-num">${sancTop} de ${topN}</div><div class="ev-lbl">Bajo sanción activa</div></div>`;
  document.getElementById('s1-action').innerHTML =
    `<b>Qué hacer con esto:</b> ${topShare>55 ? 'antes de seguir invirtiendo más en estos campos dominantes, vale la pena evaluar si el portafolio necesita diversificarse hacia campos más pequeños pero más estables.' : 'el portafolio muestra una distribución relativamente equilibrada; el foco puede estar en sostener esa diversificación.'}`;

  // ── HALLAZGO 2: Brecha de rentabilidad entre tipos de crudo ──
  const tipos = [...new Set(lastRows.map(d=>d.t))];
  const tipoStats = tipos.map(t=>({ t, mo: avg(lastRows.filter(d=>d.t===t),'mo'), n: lastRows.filter(d=>d.t===t).length }))
    .sort((a,b)=>b.mo-a.mo);
  const best = tipoStats[0], worst = tipoStats[tipoStats.length-1];
  const underBE = lastRows.filter(d=>d.mo <= d.be);
  document.getElementById('s2-title').textContent = tipoStats.length>1
    ? `Brecha de rentabilidad entre crudo ${best.t.toLowerCase()} y ${worst.t.toLowerCase()}`
    : 'Análisis de margen operativo del portafolio';
  document.getElementById('s2-plain').innerHTML = tipoStats.length>1
    ? `En palabras simples: <b>los yacimientos de crudo ${best.t.toLowerCase()} dejan en promedio $${(best.mo-worst.mo).toFixed(1)} más de ganancia por barril</b> que los de crudo ${worst.t.toLowerCase()}. No siempre el campo que más produce es el que más conviene financieramente.`
    : `En palabras simples: el margen operativo promedio del portafolio es de <b>$${avg(lastRows,'mo').toFixed(1)} por barril</b> en ${lastYear}.`;
  document.getElementById('s2-detail').textContent =
    `Esto suele deberse a que los crudos más pesados se venden con descuento frente al petróleo de referencia y cuestan más extraer (más energía, diluyentes, tratamiento de agua), mientras que los crudos más livianos tienen mejor precio y menor costo operativo.`;
  document.getElementById('s2-evidence').innerHTML = tipoStats.length>1 ? `
    <div class="evidence-chip"><div class="ev-num">$${worst.mo.toFixed(1)}/bbl</div><div class="ev-lbl">Margen prom. ${worst.t}</div></div>
    <div class="evidence-chip"><div class="ev-num">$${best.mo.toFixed(1)}/bbl</div><div class="ev-lbl">Margen prom. ${best.t}</div></div>
    <div class="evidence-chip"><div class="ev-num">${tipoStats.length}</div><div class="ev-lbl">Tipos de crudo en el portafolio</div></div>
    <div class="evidence-chip"><div class="ev-num">${underBE.length}</div><div class="ev-lbl">Campo(s) en/bajo breakeven</div></div>` : `
    <div class="evidence-chip"><div class="ev-num">$${avg(lastRows,'mo').toFixed(1)}</div><div class="ev-lbl">Margen prom. (USD/bbl)</div></div>
    <div class="evidence-chip"><div class="ev-num">${underBE.length}</div><div class="ev-lbl">Campo(s) en/bajo breakeven</div></div>`;
  document.getElementById('s2-action').innerHTML =
    `<b>Qué hacer con esto:</b> "producir más" no siempre significa "ganar más". Conviene comparar el retorno marginal de invertir en volumen contra el de mejorar márgenes en los campos ya rentables.`;

  // ── HALLAZGO 3: Estado de la base de pozos ──
  const rpaAll = avg(lastRows,'rpa');
  const lowRpa = lastRows.filter(d=>d.rpa<55);
  const aiMax = lastRows.length ? Math.max(...lastRows.map(d=>d.ai)) : 0;
  const aiMin = lastRows.length ? Math.min(...lastRows.map(d=>d.ai)) : 0;
  let rpaDeltaTxt = '';
  if (years.length>1){
    const rpaFirst = avg(ds.filter(d=>d.an===years[0]),'rpa');
    const diff = rpaAll - rpaFirst;
    rpaDeltaTxt = `<div class="evidence-chip"><div class="ev-num">${diff>=0?'↑':'↓'} ${Math.abs(diff).toFixed(0)} pts</div><div class="ev-lbl">Cambio del ratio desde ${years[0]}</div></div>`;
  }
  document.getElementById('s3-title').textContent = 'Estado de la base de pozos del portafolio';
  document.getElementById('s3-plain').innerHTML =
    `En palabras simples: <b>en promedio, ${rpaAll.toFixed(0)}% de los pozos perforados del portafolio están activos</b> en ${lastYear}. ${rpaAll<65 ? 'Una parte considerable está detenida — no necesariamente porque se agotó el petróleo, sino por falta de mantenimiento o reactivación.' : 'Es un nivel saludable de aprovechamiento de la infraestructura ya construida.'}`;
  document.getElementById('s3-detail').textContent =
    `Los yacimientos con infraestructura más antigua suelen mostrar menor ratio de pozos activos y mayor downtime. Si esos mismos campos aún tienen reservas 2P remanentes, la reactivación de pozos puede ser más barata que perforar pozos nuevos.`;
  document.getElementById('s3-evidence').innerHTML = `
    <div class="evidence-chip"><div class="ev-num">${rpaAll.toFixed(0)}%</div><div class="ev-lbl">Pozos activos (promedio)</div></div>
    <div class="evidence-chip"><div class="ev-num">${lowRpa.length}</div><div class="ev-lbl">Campo(s) con &lt;55% activos</div></div>
    <div class="evidence-chip"><div class="ev-num">${aiMin.toFixed(0)}–${aiMax.toFixed(0)}</div><div class="ev-lbl">Rango de antigüedad (años)</div></div>
    ${rpaDeltaTxt}`;
  document.getElementById('s3-action').innerHTML =
    `<b>Qué hacer con esto:</b> ${lowRpa.length>0 ? 'antes de invertir en nuevas perforaciones, vale la pena evaluar si reactivar los pozos inactivos de ' + lowRpa.map(d=>d.y).slice(0,3).join(', ') + ' ofrece mejor retorno inmediato.' : 'el portafolio aprovecha razonablemente bien su base de pozos existente.'}`;

  // ── CONCLUSIÓN DINÁMICA ──
  document.getElementById('conclusionBanner').innerHTML = `
    <h3>✅ En resumen: ¿en qué se debería pensar primero?</h3>
    <p>Con base en los datos cargados, estas son las ideas clave que se desprenden del diagnóstico:</p>
    <ul class="conclusion-list">
      <li><b>Concentración y riesgo no están repartidos por igual.</b> ${topN} de ${nYac} campo(s) generan ~${topShare.toFixed(0)}% de la producción — vale la pena revisar si ese nivel de dependencia es aceptable.</li>
      <li><b>El volumen no es lo mismo que la rentabilidad.</b> ${tipoStats.length>1 ? `El crudo ${best.t.toLowerCase()} entrega mejor margen por barril que el ${worst.t.toLowerCase()}, aunque produzca menos volumen.` : `El margen operativo promedio es de $${avg(lastRows,'mo').toFixed(1)}/bbl — conviene monitorear su evolución.`}</li>
      <li><b>La oportunidad más barata puede ser reactivar, no perforar.</b> Con ${rpaAll.toFixed(0)}% de pozos activos en promedio, ${lowRpa.length>0 ? 'hay ' + lowRpa.length + ' campo(s) con potencial de reactivación de bajo costo relativo.' : 'el portafolio ya aprovecha bien su infraestructura.'}</li>
    </ul>`;
}


// ══════════════════════════════════════════════════════════════
// CHARTS
// ══════════════════════════════════════════════════════════════
function buildCharts(ds){

  // gráficos alimentados por el dataset 'ds' recibido como parámetro

  // ── P0: Zona prod bar ──
  const zonas = [...new Set(ds.map(d=>d.z))];
  const zonaProd = zonas.map(z=>{ const r=ds.filter(d=>d.z===z); return avg(r,'prod')/1000; });
  new Chart(document.getElementById('c-zona-prod'), {
    type:'bar',
    data:{ labels: zonas.map(z=>z.replace(' ','\n')),
      datasets:[{ data:zonaProd, backgroundColor: zonas.map(z=>COLORS[z]+'CC'),
        borderColor: zonas.map(z=>COLORS[z]), borderWidth:1.5, borderRadius:3 }]},
    options:{ ...CHART_OPTS,
      plugins:{...CHART_OPTS.plugins, legend:{display:false}},
      scales:{ y:{...gridOpts, title:{display:true,text:'Mbbl/día',color:'#7A6A50'}},
               x:{...gridOpts} } }
  });

  // ── P0: Scatter exec (prod vs margen) ──
  const scatterExec = yacs.map(y=>{
    const r=ds.filter(d=>d.y===y);
    return { x: avg(r,'prod')/1000, y: avg(r,'mo'), r: Math.sqrt(avg(r,'r1'))*0.28,
             label:y, tipo: r[0].t, zona: r[0].z };
  });
  new Chart(document.getElementById('c-scatter-exec'), {
    type:'bubble',
    data:{ datasets:[{ data: scatterExec,
      backgroundColor: scatterExec.map(d=>TIPO_C[d.tipo]+'88'),
      borderColor:     scatterExec.map(d=>TIPO_C[d.tipo]),
      borderWidth:1.5 }]},
    options:{ ...CHART_OPTS,
      plugins:{...CHART_OPTS.plugins, legend:{display:false},
        tooltip:{ ...CHART_OPTS.plugins.tooltip,
          callbacks:{ label: ctx=>{ const d=ctx.raw; return `${d.label}: ${d.x.toFixed(0)}Mbbl · ${d.y.toFixed(1)} USD/bbl`; }}}},
      scales:{ x:{...gridOpts, title:{display:true,text:'Producción (Mbbl/día)',color:'#7A6A50'}},
               y:{...gridOpts, title:{display:true,text:'Margen Op. (USD/bbl)',color:'#7A6A50'}} } }
  });

  // ── P0: Top5 / Bot5 ──
  const scored = yacs.map(y=>{
    const r=ds.filter(d=>d.y===y);
    const normProd = avg(r,'prod')/95000;
    const normMo   = avg(r,'mo')/75;
    const normRes  = avg(r,'r1')/1200;
    const normRisk = 1-(avg(r,'cv')+avg(r,'inc')/24)*0.5;
    return { y, score: (normProd+normMo+normRes+normRisk)/4, mo: avg(r,'mo'), prod: avg(r,'prod') };
  }).sort((a,b)=>b.score-a.score);
  const t5=scored.slice(0,5), b5=[...scored].reverse().slice(0,5);
  const mkScore=(id,arr,good)=>{
    const el=document.getElementById(id);
    arr.forEach((d,i)=>{
      el.innerHTML += `<div class="score-row">
        <div class="score-rank">${i+1}</div>
        <div class="score-name">${d.y}</div>
        <div style="font-size:10px;color:var(--text-lo);flex:1">${(d.prod/1000).toFixed(0)}K bbl/d</div>
        <div class="score-val" style="color:${good?'#5EC98A':'#E87070'}">${(d.mo).toFixed(1)} $/bbl</div>
      </div>`;
    });
  };
  mkScore('top5',t5,true); mkScore('bot5',b5,false);

  // ── P0: Heatmap ──
  const dims = ['Producción','Margen Op.','Pozos Activos','Factor Rec.','Riesgo Inv.'];
  const vals = yacs.map(y=>{
    const r=ds.filter(d=>d.y===y);
    return [
      avg(r,'prod')/95000,
      avg(r,'mo')/75,
      avg(r,'rpa')/95,
      avg(r,'fr')/55,
      1-((avg(r,'cv')/0.35)+(avg(r,'inc')/24)+(avg(r,'fl')/85))/3
    ];
  });
  const hc=document.getElementById('heatmap-container');
  const cols=dims.length+1;
  hc.style.cssText='display:grid;grid-template-columns:140px repeat(5,1fr);gap:2px;font-size:10px';
  hc.innerHTML = '<div></div>' + dims.map(d=>`<div style="text-align:center;padding:4px 2px;font-family:IBM Plex Mono,monospace;font-size:9px;letter-spacing:.06em;color:var(--amber);text-transform:uppercase">${d}</div>`).join('');
  yacs.forEach((y,i)=>{
    hc.innerHTML += `<div style="display:flex;align-items:center;padding:0 8px 0 0;font-size:11px;color:var(--text-hi);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${y}</div>`;
    vals[i].forEach(v=>{
      const r=Math.round(v*255),g=Math.round(v*180),b=Math.round(50);
      const bg=v>0.66?'#1A4A2E':v>0.33?'#7B4F0A':'#5A1A1A';
      const fg=v>0.5?'#5EC98A':v>0.3?'#E8A832':'#E87070';
      hc.innerHTML+=`<div style="background:${bg};color:${fg};display:flex;align-items:center;justify-content:center;border-radius:2px;height:28px;font-family:IBM Plex Mono,monospace;font-size:10px;font-weight:600">${(v*100).toFixed(0)}%</div>`;
    });
  });

  // ── P1: Prod bar ──
  const prodAvg = yacs.map(y=>avg(ds.filter(d=>d.y===y),'prod')/1000);
  new Chart(document.getElementById('c-prod-bar'),{
    type:'bar',
    data:{ labels:yacs,
      datasets:[{ data:prodAvg, backgroundColor: yacs.map(y=>TIPO_C[firstOf(ds,y,'t')]+'AA'),
        borderColor: yacs.map(y=>TIPO_C[firstOf(ds,y,'t')]), borderWidth:1.5, borderRadius:3 }]},
    options:{ ...CHART_OPTS, indexAxis:'y',
      plugins:{...CHART_OPTS.plugins,legend:{display:false}},
      scales:{ x:{...gridOpts,title:{display:true,text:'Mbbl/día',color:'#7A6A50'}}, y:{...gridOpts} } }
  });

  // ── P1: Trend lines ──
  const top6=yacs.slice(0,6);
  const trendColors=['#C8841A','#E87070','#5EC98A','#60B4E8','#A78BF0','#F2DFA8'];
  new Chart(document.getElementById('c-trend-line'),{
    type:'line',
    data:{ labels:['2022','2023','2024'],
      datasets: top6.map((y,i)=>({
        label:y, data: byYacField(ds,y,'prod').map(v=>v/1000),
        borderColor:trendColors[i], backgroundColor:'transparent',
        borderWidth:2, pointRadius:4, pointBackgroundColor:trendColors[i], tension:0.3
      }))},
    options:{ ...CHART_OPTS,
      scales:{ y:{...gridOpts,title:{display:true,text:'Mbbl/día',color:'#7A6A50'}}, x:{...gridOpts} } }
  });

  // ── P1: API bar ──
  const apiAvg=yacs.map(y=>avg(ds.filter(d=>d.y===y),'api'));
  new Chart(document.getElementById('c-api'),{
    type:'bar',
    data:{ labels:yacs,
      datasets:[{data:apiAvg, backgroundColor:yacs.map(y=>TIPO_C[firstOf(ds,y,'t')]+'AA'),
        borderColor:yacs.map(y=>TIPO_C[firstOf(ds,y,'t')]),borderWidth:1.5,borderRadius:3}]},
    options:{...CHART_OPTS, indexAxis:'y',
      plugins:{...CHART_OPTS.plugins,legend:{display:false},
        annotation:{annotations:{line1:{type:'line',xMin:10,xMax:10,borderColor:'#E87070',borderWidth:1.5,borderDash:[4,4]}}}},
      scales:{ x:{...gridOpts,title:{display:true,text:'°API',color:'#7A6A50'},min:0,max:40}, y:{...gridOpts} } }
  });

  // ── P1: BSW vs GOR scatter ──
  const bswGor=yacs.map(y=>{const r=ds.filter(d=>d.y===y);return{x:avg(r,'bsw'),y:avg(r,'gor'),label:y,t:r[0].t};});
  new Chart(document.getElementById('c-bsw-gor'),{
    type:'scatter',
    data:{datasets:[{data:bswGor,backgroundColor:bswGor.map(d=>TIPO_C[d.t]+'AA'),
      borderColor:bswGor.map(d=>TIPO_C[d.t]),borderWidth:1.5,pointRadius:7,pointHoverRadius:9}]},
    options:{...CHART_OPTS,
      plugins:{...CHART_OPTS.plugins,legend:{display:false},
        tooltip:{...CHART_OPTS.plugins.tooltip,callbacks:{label:ctx=>`${ctx.raw.label}: BSW ${ctx.raw.x.toFixed(0)}% · GOR ${ctx.raw.y.toFixed(0)}`}}},
      scales:{ x:{...gridOpts,title:{display:true,text:'BSW (%)',color:'#7A6A50'}},
               y:{...gridOpts,title:{display:true,text:'GOR (scf/bbl)',color:'#7A6A50'}} } }
  });

  // ── P1: Table ──
  const tProd=document.getElementById('t-prod');
  tProd.innerHTML=`<thead><tr><th>Yacimiento</th><th>Zona</th><th>Tipo</th><th>API °</th><th>Prod. Prom (Kbbl/d)</th><th>Var. 2024 %</th><th>BSW %</th><th>GOR</th></tr></thead><tbody>`;
  yacs.sort((a,b)=>avg(ds.filter(d=>d.y===b),'prod')-avg(ds.filter(d=>d.y===a),'prod')).forEach(y=>{
    const r=ds.filter(d=>d.y===y);
    const vp24=ds.find(d=>d.y===y&&d.an===2024)?.vp||0;
    tProd.innerHTML+=`<tr>
      <td class="bold">${y}</td>
      <td>${r[0].z}</td>
      <td><span class="badge ${BADGE[r[0].t]}">${r[0].t}</span></td>
      <td class="mono">${avg(r,'api').toFixed(1)}</td>
      <td class="mono">${(avg(r,'prod')/1000).toFixed(1)}</td>
      <td class="mono" style="color:${vp24<0?'#E87070':'#5EC98A'}">${vp24.toFixed(1)}%</td>
      <td class="mono">${avg(r,'bsw').toFixed(1)}</td>
      <td class="mono">${avg(r,'gor').toFixed(0)}</td>
    </tr>`;
  });
  tProd.innerHTML+='</tbody>';

  // ── P2: Lifting scatter ──
  const liftScatter=yacs.map(y=>{const r=ds.filter(d=>d.y===y);return{x:avg(r,'lc'),y:avg(r,'mo'),label:y,t:r[0].t,z:r[0].z};});
  new Chart(document.getElementById('c-lifting-scatter'),{
    type:'scatter',
    data:{datasets:[{data:liftScatter,backgroundColor:liftScatter.map(d=>TIPO_C[d.t]+'AA'),
      borderColor:liftScatter.map(d=>TIPO_C[d.t]),borderWidth:1.5,pointRadius:7,pointHoverRadius:9}]},
    options:{...CHART_OPTS,
      plugins:{...CHART_OPTS.plugins,legend:{display:false},
        tooltip:{...CHART_OPTS.plugins.tooltip,callbacks:{label:ctx=>`${ctx.raw.label}: LC ${ctx.raw.x.toFixed(1)} · Mo ${ctx.raw.y.toFixed(1)} USD/bbl`}}},
      scales:{ x:{...gridOpts,title:{display:true,text:'Lifting Cost (USD/bbl)',color:'#7A6A50'}},
               y:{...gridOpts,title:{display:true,text:'Margen Operativo (USD/bbl)',color:'#7A6A50'}} } }
  });

  // ── P2: Margen bar ──
  const moAvg=yacs.map(y=>avg(ds.filter(d=>d.y===y),'mo'));
  const beAvg=yacs.map(y=>avg(ds.filter(d=>d.y===y),'be'));
  new Chart(document.getElementById('c-margen-bar'),{
    type:'bar',
    data:{labels:yacs,datasets:[
      {label:'Margen Op.',data:moAvg,backgroundColor:moAvg.map((v,i)=>v>beAvg[i]?'#1A4A2ECC':'#5A1A1ACC'),
        borderColor:moAvg.map((v,i)=>v>beAvg[i]?'#5EC98A':'#E87070'),borderWidth:1.5,borderRadius:3},
    ]},
    options:{...CHART_OPTS,indexAxis:'y',
      plugins:{...CHART_OPTS.plugins,legend:{display:false}},
      scales:{ x:{...gridOpts,title:{display:true,text:'USD/bbl',color:'#7A6A50'}}, y:{...gridOpts} } }
  });

  // ── P2: Precio vs Lifting grouped ──
  const pr=yacs.map(y=>avg(ds.filter(d=>d.y===y),'pr'));
  const lc=yacs.map(y=>avg(ds.filter(d=>d.y===y),'lc'));
  new Chart(document.getElementById('c-precio-lifting'),{
    type:'bar',
    data:{labels:yacs,datasets:[
      {label:'Precio Realizado',data:pr,backgroundColor:'#1A4A2ECC',borderColor:'#5EC98A',borderWidth:1.5,borderRadius:3},
      {label:'Lifting Cost',data:lc,backgroundColor:'#5A1A1ACC',borderColor:'#E87070',borderWidth:1.5,borderRadius:3},
    ]},
    options:{...CHART_OPTS,
      scales:{ y:{...gridOpts,title:{display:true,text:'USD/bbl',color:'#7A6A50'}}, x:{...gridOpts,ticks:{maxRotation:45}} } }
  });

  // ── P2: CAPEX efficiency ──
  const efCap=yacs.map(y=>avg(ds.filter(d=>d.y===y),'ec'));
  new Chart(document.getElementById('c-capex-eff'),{
    type:'bar',
    data:{labels:yacs,datasets:[{data:efCap,
      backgroundColor:efCap.map(v=>v>4.5?'#1A4A2ECC':v>3.5?'#7B4F0ACC':'#5A1A1ACC'),
      borderColor:efCap.map(v=>v>4.5?'#5EC98A':v>3.5?'#E8A832':'#E87070'),borderWidth:1.5,borderRadius:3}]},
    options:{...CHART_OPTS,indexAxis:'y',
      plugins:{...CHART_OPTS.plugins,legend:{display:false}},
      scales:{ x:{...gridOpts,title:{display:true,text:'bbl/USD',color:'#7A6A50'}}, y:{...gridOpts} } }
  });

  // ── P2: Table fin ──
  const tFin=document.getElementById('t-fin');
  tFin.innerHTML=`<thead><tr><th>Yacimiento</th><th>Tipo</th><th>Precio Real.</th><th>Lifting Cost</th><th>Margen Op.</th><th>Breakeven</th><th>Estado</th><th>CAPEX (MMUSD)</th></tr></thead><tbody>`;
  yacs.forEach(y=>{
    const r=ds.filter(d=>d.y===y);
    const mo=avg(r,'mo'),be=avg(r,'be');
    const ok=mo>be*1.2;const warn=mo>be&&mo<=be*1.2;
    tFin.innerHTML+=`<tr>
      <td class="bold">${y}</td>
      <td><span class="badge ${BADGE[r[0].t]}">${r[0].t}</span></td>
      <td class="mono">$${avg(r,'pr').toFixed(1)}</td>
      <td class="mono">$${avg(r,'lc').toFixed(1)}</td>
      <td class="mono" style="color:${mo>be?'#5EC98A':'#E87070'}">$${mo.toFixed(1)}</td>
      <td class="mono">$${be.toFixed(1)}</td>
      <td><span class="traffic ${ok?'green':warn?'yellow':'red'}"></span></td>
      <td class="mono">${avg(r,'ca').toFixed(0)}</td>
    </tr>`;
  });
  tFin.innerHTML+='</tbody>';

  // ── P3: Pozos bar ──
  const paAvg=yacs.map(y=>avg(ds.filter(d=>d.y===y),'pa'));
  const ptAvg=yacs.map(y=>avg(ds.filter(d=>d.y===y),'pt'));
  const piAvg=paAvg.map((v,i)=>ptAvg[i]-v);
  new Chart(document.getElementById('c-pozos-bar'),{
    type:'bar',
    data:{labels:yacs,datasets:[
      {label:'Activos',data:paAvg,backgroundColor:'#1A4A2ECC',borderColor:'#5EC98A',borderWidth:1.5,borderRadius:3,stack:'s'},
      {label:'Inactivos',data:piAvg,backgroundColor:'#5A1A1A88',borderColor:'#E87070',borderWidth:1,borderRadius:3,stack:'s'},
    ]},
    options:{...CHART_OPTS,indexAxis:'y',
      scales:{ x:{...gridOpts,title:{display:true,text:'Pozos',color:'#7A6A50'}}, y:{...gridOpts} } }
  });

  // ── P3: Edad vs downtime scatter ──
  const edDt=yacs.map(y=>{const r=ds.filter(d=>d.y===y);return{x:avg(r,'ai'),y:avg(r,'dt'),label:y,t:r[0].t};});
  new Chart(document.getElementById('c-edad-down'),{
    type:'scatter',
    data:{datasets:[{data:edDt,backgroundColor:edDt.map(d=>TIPO_C[d.t]+'AA'),
      borderColor:edDt.map(d=>TIPO_C[d.t]),borderWidth:1.5,pointRadius:7}]},
    options:{...CHART_OPTS,
      plugins:{...CHART_OPTS.plugins,legend:{display:false},
        tooltip:{...CHART_OPTS.plugins.tooltip,callbacks:{label:ctx=>`${ctx.raw.label}: ${ctx.raw.x.toFixed(0)} años · DT ${ctx.raw.y.toFixed(0)}%`}}},
      scales:{ x:{...gridOpts,title:{display:true,text:'Antigüedad infraestructura (años)',color:'#7A6A50'}},
               y:{...gridOpts,title:{display:true,text:'Downtime (%)',color:'#7A6A50'}} } }
  });

  // ── P3: Prod/pozo bar ──
  const ppz=yacs.map(y=>avg(ds.filter(d=>d.y===y),'ppz'));
  new Chart(document.getElementById('c-prod-pozo'),{
    type:'bar',
    data:{labels:yacs,datasets:[{data:ppz,
      backgroundColor:ppz.map(v=>v>250?'#1A4A2ECC':v>150?'#7B4F0ACC':'#5A1A1ACC'),
      borderColor:ppz.map(v=>v>250?'#5EC98A':v>150?'#E8A832':'#E87070'),borderWidth:1.5,borderRadius:3}]},
    options:{...CHART_OPTS,indexAxis:'y',
      plugins:{...CHART_OPTS.plugins,legend:{display:false}},
      scales:{ x:{...gridOpts,title:{display:true,text:'bbl/día/pozo',color:'#7A6A50'}}, y:{...gridOpts} } }
  });

  // ── P3: Ratio pozos bar ──
  const rpaAvg=yacs.map(y=>avg(ds.filter(d=>d.y===y),'rpa'));
  new Chart(document.getElementById('c-ratio-pozos'),{
    type:'bar',
    data:{labels:yacs,datasets:[{data:rpaAvg,
      backgroundColor:rpaAvg.map(v=>v>65?'#1A4A2ECC':v>50?'#7B4F0ACC':'#5A1A1ACC'),
      borderColor:rpaAvg.map(v=>v>65?'#5EC98A':v>50?'#E8A832':'#E87070'),borderWidth:1.5,borderRadius:3}]},
    options:{...CHART_OPTS,
      scales:{ y:{...gridOpts,title:{display:true,text:'% Pozos Activos',color:'#7A6A50'},max:100},
               x:{...gridOpts,ticks:{maxRotation:45}} } }
  });

  // ── P3: Table infra ──
  const tInfra=document.getElementById('t-infra');
  tInfra.innerHTML=`<thead><tr><th>Yacimiento</th><th>Pozos Activos</th><th>Pozos Totales</th><th>Ratio Activos %</th><th>Prod/Pozo</th><th>Downtime %</th><th>Antigüedad (años)</th><th>Estado</th></tr></thead><tbody>`;
  yacs.forEach(y=>{
    const r=ds.filter(d=>d.y===y);
    const ra=avg(r,'rpa'),dt=avg(r,'dt');
    const ok=ra>65&&dt<15; const warn=ra>50||dt<25;
    tInfra.innerHTML+=`<tr>
      <td class="bold">${y}</td>
      <td class="mono">${avg(r,'pa').toFixed(0)}</td>
      <td class="mono">${avg(r,'pt').toFixed(0)}</td>
      <td class="mono">${ra.toFixed(1)}%
        <div class="prog-wrap" style="margin-top:3px"><div class="prog-bar" style="width:${ra}%;background:${ra>65?'#5EC98A':ra>50?'#E8A832':'#E87070'}"></div></div>
      </td>
      <td class="mono">${avg(r,'ppz').toFixed(0)}</td>
      <td class="mono" style="color:${dt>20?'#E87070':dt>12?'#E8A832':'#5EC98A'}">${dt.toFixed(1)}%</td>
      <td class="mono">${avg(r,'ai').toFixed(0)}</td>
      <td><span class="traffic ${ok?'green':warn?'yellow':'red'}"></span></td>
    </tr>`;
  });
  tInfra.innerHTML+='</tbody>';

  // ── P4: Reservas bar ──
  const r1=yacs.map(y=>avg(ds.filter(d=>d.y===y),'r1'));
  const r2=yacs.map(y=>avg(ds.filter(d=>d.y===y),'r2'));
  new Chart(document.getElementById('c-reservas-bar'),{
    type:'bar',
    data:{labels:yacs,datasets:[
      {label:'Reservas 1P',data:r1,backgroundColor:'#1A4A2ECC',borderColor:'#5EC98A',borderWidth:1.5,borderRadius:3},
      {label:'Reservas 2P',data:r2.map((v,i)=>v-r1[i]),backgroundColor:'#0E3A5888',borderColor:'#60B4E8',borderWidth:1,borderRadius:3},
    ]},
    options:{...CHART_OPTS,indexAxis:'y',
      scales:{ x:{...gridOpts,title:{display:true,text:'MMbbl',color:'#7A6A50'},stacked:true}, y:{...gridOpts,stacked:true} } }
  });

  // ── P4: CAPEX vs Reservas scatter ──
  const cpRes=yacs.map(y=>{const r=ds.filter(d=>d.y===y);return{x:avg(r,'ca'),y:avg(r,'r1'),r:avg(r,'fr')*0.8,label:y,cl:r[0].cl};});
  const clColors={'1P':'#5EC98A','2P':'#E8A832','3P':'#E87070'};
  new Chart(document.getElementById('c-capex-res'),{
    type:'bubble',
    data:{datasets:[{data:cpRes,backgroundColor:cpRes.map(d=>clColors[d.cl]+'88'),
      borderColor:cpRes.map(d=>clColors[d.cl]),borderWidth:1.5}]},
    options:{...CHART_OPTS,
      plugins:{...CHART_OPTS.plugins,legend:{display:false},
        tooltip:{...CHART_OPTS.plugins.tooltip,callbacks:{label:ctx=>`${ctx.raw.label}: CAPEX $${ctx.raw.x.toFixed(0)}MM · 1P ${ctx.raw.y.toFixed(0)} MMbbl`}}},
      scales:{ x:{...gridOpts,title:{display:true,text:'CAPEX Acumulado (MMUSD)',color:'#7A6A50'}},
               y:{...gridOpts,title:{display:true,text:'Reservas 1P (MMbbl)',color:'#7A6A50'}} } }
  });

  // ── P4: Factor recobro ──
  const frAvg=yacs.map(y=>avg(ds.filter(d=>d.y===y),'fr'));
  new Chart(document.getElementById('c-recobro'),{
    type:'bar',
    data:{labels:yacs,datasets:[{data:frAvg,
      backgroundColor:frAvg.map(v=>v>35?'#1A4A2ECC':v>22?'#7B4F0ACC':'#5A1A1ACC'),
      borderColor:frAvg.map(v=>v>35?'#5EC98A':v>22?'#E8A832':'#E87070'),borderWidth:1.5,borderRadius:3}]},
    options:{...CHART_OPTS,
      scales:{ y:{...gridOpts,title:{display:true,text:'Factor de Recobro (%)',color:'#7A6A50'},max:60},
               x:{...gridOpts,ticks:{maxRotation:45}} } }
  });

  // ── P4: Pie clasificacion ──
  const clasif={'1P':0,'2P':0,'3P':0};
  yacs.forEach(y=>{clasif[ds.find(d=>d.y===y).cl]++;});
  new Chart(document.getElementById('c-clasif'),{
    type:'doughnut',
    data:{labels:['1P','2P','3P'],datasets:[{data:[clasif['1P'],clasif['2P'],clasif['3P']],
      backgroundColor:['#1A4A2ECC','#7B4F0ACC','#5A1A1ACC'],
      borderColor:['#5EC98A','#E8A832','#E87070'],borderWidth:2}]},
    options:{...CHART_OPTS,cutout:'60%',
      plugins:{...CHART_OPTS.plugins,legend:{display:true,position:'bottom'}}}
  });

  // ── P4: Table reservas ──
  const tRes=document.getElementById('t-res');
  tRes.innerHTML=`<thead><tr><th>Yacimiento</th><th>Tipo</th><th>Clasificación</th><th>Reservas 1P (MMbbl)</th><th>Reservas 2P (MMbbl)</th><th>Factor Recobro %</th><th>CAPEX (MMUSD)</th><th>Ef. CAPEX (bbl/USD)</th></tr></thead><tbody>`;
  yacs.sort((a,b)=>avg(ds.filter(d=>d.y===b),'r1')-avg(ds.filter(d=>d.y===a),'r1')).forEach(y=>{
    const r=ds.filter(d=>d.y===y);
    const cl=r[0].cl;
    tRes.innerHTML+=`<tr>
      <td class="bold">${y}</td>
      <td><span class="badge ${BADGE[r[0].t]}">${r[0].t}</span></td>
      <td><span class="badge badge-${cl.toLowerCase()}">${cl}</span></td>
      <td class="mono">${avg(r,'r1').toFixed(0)}</td>
      <td class="mono">${avg(r,'r2').toFixed(0)}</td>
      <td class="mono">${avg(r,'fr').toFixed(1)}%</td>
      <td class="mono">${avg(r,'ca').toFixed(0)}</td>
      <td class="mono">${avg(r,'ec').toFixed(2)}</td>
    </tr>`;
  });
  tRes.innerHTML+='</tbody>';

  // ── P5: CV vs Incidentes scatter ──
  const cvInc=yacs.map(y=>{const r=ds.filter(d=>d.y===y);return{x:avg(r,'cv'),y:avg(r,'inc'),label:y,t:r[0].t,sa:r[0].sa};});
  new Chart(document.getElementById('c-riesgo-scatter'),{
    type:'scatter',
    data:{datasets:[{data:cvInc,backgroundColor:cvInc.map(d=>d.sa?'#E8707088':'#60B4E888'),
      borderColor:cvInc.map(d=>d.sa?'#E87070':'#60B4E8'),borderWidth:2,pointRadius:8}]},
    options:{...CHART_OPTS,
      plugins:{...CHART_OPTS.plugins,legend:{display:false},
        tooltip:{...CHART_OPTS.plugins.tooltip,callbacks:{label:ctx=>`${ctx.raw.label}: CV ${ctx.raw.x.toFixed(2)} · ${ctx.raw.y.toFixed(0)} incidentes`}}},
      scales:{ x:{...gridOpts,title:{display:true,text:'CV Producción',color:'#7A6A50'}},
               y:{...gridOpts,title:{display:true,text:'Incidentes/año',color:'#7A6A50'}} } }
  });

  // ── P5: Flaring bar ──
  const flAvg=yacs.map(y=>avg(ds.filter(d=>d.y===y),'fl'));
  new Chart(document.getElementById('c-flaring'),{
    type:'bar',
    data:{labels:yacs,datasets:[{data:flAvg,
      backgroundColor:flAvg.map(v=>v>30?'#5A1A1ACC':v>10?'#7B4F0ACC':'#1A4A2ECC'),
      borderColor:flAvg.map(v=>v>30?'#E87070':v>10?'#E8A832':'#5EC98A'),borderWidth:1.5,borderRadius:3}]},
    options:{...CHART_OPTS,indexAxis:'y',
      plugins:{...CHART_OPTS.plugins,legend:{display:false}},
      scales:{ x:{...gridOpts,title:{display:true,text:'MMscf/día',color:'#7A6A50'}}, y:{...gridOpts} } }
  });

  // ── P5: Table riesgo ──
  const tRiesgo=document.getElementById('t-riesgo');
  tRiesgo.innerHTML=`<thead><tr><th>Yacimiento</th><th>Tipo</th><th>CV Prod.</th><th>Incidentes/año</th><th>Flaring (MMscf/d)</th><th>Sanción</th><th>CV</th><th>Incid.</th><th>Flaring</th><th>Riesgo Global</th></tr></thead><tbody>`;
  yacs.forEach(y=>{
    const r=ds.filter(d=>d.y===y);
    const cv=avg(r,'cv'),inc=avg(r,'inc'),fl=avg(r,'fl'),sa=r[0].sa;
    const cvOk=cv<0.15,cvWarn=cv<0.25;
    const incOk=inc<5,incWarn=inc<12;
    const flOk=fl<5,flWarn=fl<20;
    const global=sa===1||(!cvOk&&!cvWarn)||(!incOk&&!incWarn)?'red':(!cvOk||!incOk||!flOk)?'yellow':'green';
    tRiesgo.innerHTML+=`<tr>
      <td class="bold">${y}</td>
      <td><span class="badge ${BADGE[r[0].t]}">${r[0].t}</span></td>
      <td class="mono">${cv.toFixed(3)}</td>
      <td class="mono">${inc.toFixed(0)}</td>
      <td class="mono">${fl.toFixed(1)}</td>
      <td class="mono" style="color:${sa?'#E87070':'#5EC98A'}">${sa?'Sí':'No'}</td>
      <td><span class="traffic ${cvOk?'green':cvWarn?'yellow':'red'}"></span></td>
      <td><span class="traffic ${incOk?'green':incWarn?'yellow':'red'}"></span></td>
      <td><span class="traffic ${flOk?'green':flWarn?'yellow':'red'}"></span></td>
      <td><span class="traffic ${global}"></span></td>
    </tr>`;
  });
  tRiesgo.innerHTML+='</tbody>';

}

function buildAll(){
  Object.values(Chart.instances || {}).forEach(c=>c.destroy());
  document.querySelectorAll('canvas').forEach(cv=>{
    const ctx=cv.getContext('2d');
    ctx.clearRect(0,0,cv.width,cv.height);
  });
  updateGlobalKPIs_ds(DATA);
  updateInterpretationPage_ds(DATA);
  buildCharts(DATA);
}

document.addEventListener('DOMContentLoaded', () => { /* buildAll() se invoca solo tras cargar datos, vía loadIntoDashboard() */ });
