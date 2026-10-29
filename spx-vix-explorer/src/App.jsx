import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, BarChart, Bar, Cell, ReferenceLine,
} from "recharts";

// ─── BUILT-IN DATASET ────────────────────────────────────────────────────────
const BUILTIN_SPX = {"2026-02-27":6878.88,"2026-02-20":6909.51,"2026-02-13":6836.17,"2026-02-06":6932.30,"2026-01-30":6939.03,"2026-01-23":6915.61,"2026-01-16":6940.01,"2026-01-09":6966.28,"2026-01-02":6858.47,"2025-12-26":6929.94,"2025-12-19":6834.50,"2025-12-12":6827.41,"2025-12-05":6870.40,"2025-11-28":6849.09,"2025-11-21":6602.99,"2025-11-14":6734.11,"2025-11-07":6728.80,"2025-10-31":6840.20,"2025-10-24":6791.69,"2025-10-17":6664.01,"2025-10-10":6552.51,"2025-10-03":6715.79,"2025-09-26":6643.70,"2025-09-19":6664.36,"2025-09-12":6584.29,"2025-09-05":6481.50,"2025-08-29":6460.26,"2025-08-22":6466.91,"2025-08-15":6449.80,"2025-08-08":6389.45,"2025-08-01":6238.01,"2025-07-25":6388.64,"2025-07-18":6296.79,"2025-07-11":6259.75,"2025-07-03":6279.35,"2025-06-27":6173.07,"2025-06-20":5967.84,"2025-06-13":5976.97,"2025-06-06":6000.36,"2025-05-30":5911.69,"2025-05-23":5802.82,"2025-05-16":5958.38,"2025-05-09":5659.91,"2025-05-02":5686.67,"2025-04-25":5525.21,"2025-04-17":5282.70,"2025-04-11":5363.36,"2025-04-04":5074.08,"2025-03-28":5580.94,"2025-03-21":5667.56,"2025-03-14":5638.94,"2025-03-07":5770.20,"2025-02-28":5954.50,"2025-02-21":6013.13,"2025-02-14":6114.63,"2025-02-07":6025.99,"2025-01-31":6040.53,"2025-01-24":6101.24,"2025-01-17":5996.66,"2025-01-10":5827.04,"2025-01-03":5942.47,"2024-12-27":5970.84,"2024-12-20":5930.85,"2024-12-13":6051.09,"2024-12-06":6090.27,"2024-11-29":6032.38,"2024-11-22":5969.34,"2024-11-15":5870.62,"2024-11-08":5995.54,"2024-11-01":5728.80,"2024-10-25":5808.12,"2024-10-18":5864.67,"2024-10-11":5815.03,"2024-10-04":5751.07,"2024-09-27":5738.17,"2024-09-20":5702.55,"2024-09-13":5626.02,"2024-09-06":5408.42,"2024-08-30":5648.40,"2024-08-23":5634.61,"2024-08-16":5554.25,"2024-08-09":5344.16,"2024-08-02":5346.56,"2024-07-26":5459.10,"2024-07-19":5505.00,"2024-07-12":5615.35,"2024-07-05":5567.19,"2024-06-28":5460.48,"2024-06-21":5464.62,"2024-06-14":5431.60,"2024-06-07":5346.99,"2024-05-31":5277.51,"2024-05-24":5304.72,"2024-05-17":5303.27,"2024-05-10":5222.68,"2024-05-03":5127.79,"2024-04-26":5099.96,"2024-04-19":4967.23,"2024-04-12":5123.41,"2024-04-05":5204.34,"2024-03-28":5254.35,"2024-03-22":5234.18,"2024-03-15":5117.09,"2024-03-08":5123.69,"2024-03-01":5137.08,"2024-02-23":5088.80,"2024-02-16":5005.57,"2024-02-09":5026.61,"2024-02-02":4958.61,"2024-01-26":4890.97,"2024-01-19":4839.81,"2024-01-12":4783.83,"2024-01-05":4697.24,"2023-12-29":4769.83,"2023-12-22":4754.63,"2023-12-15":4719.19,"2023-12-08":4604.37,"2023-12-01":4594.63,"2023-11-24":4559.34,"2023-11-17":4514.02,"2023-11-10":4415.24,"2023-11-03":4358.34,"2023-10-27":4117.37,"2023-10-20":4224.16,"2023-10-13":4327.78,"2023-10-06":4308.50,"2023-09-29":4288.05,"2023-09-22":4320.06,"2023-09-15":4450.32,"2023-09-08":4457.49,"2023-09-01":4515.77,"2023-08-25":4405.71,"2023-08-18":4369.71,"2023-08-11":4464.05,"2023-08-04":4478.03,"2023-07-28":4582.23,"2023-07-21":4536.34,"2023-07-14":4505.42,"2023-07-07":4398.95,"2023-06-30":4450.38,"2023-06-23":4348.33,"2023-06-16":4409.59,"2023-06-09":4298.86,"2023-06-02":4282.37,"2023-05-26":4205.45,"2023-05-19":4191.98,"2023-05-12":4124.08,"2023-05-05":4136.25,"2023-04-28":4169.48,"2023-04-21":4133.52,"2023-04-14":4137.64,"2023-04-06":4105.02,"2023-03-31":4109.31,"2023-03-24":3970.99,"2023-03-17":3916.64,"2023-03-10":3861.59,"2023-03-03":4045.64,"2023-02-24":3970.04,"2023-02-17":4079.09,"2023-02-10":4090.46,"2023-02-03":4136.48,"2023-01-27":4070.56,"2023-01-20":3972.61,"2023-01-13":3999.09,"2023-01-06":3895.08,"2022-12-30":3839.50,"2022-12-23":3844.82,"2022-12-16":3852.36,"2022-12-09":3934.38,"2022-12-02":4071.70,"2022-11-25":4026.12,"2022-11-18":3965.34,"2022-11-11":3992.93,"2022-11-04":3770.55,"2022-10-28":3901.06,"2022-10-21":3752.75,"2022-10-14":3583.07,"2022-10-07":3639.66,"2022-09-30":3585.62,"2022-09-23":3693.23,"2022-09-16":3873.33,"2022-09-09":4067.36,"2022-09-02":3924.26,"2022-08-26":4057.66,"2022-08-19":4228.48,"2022-08-12":4280.15,"2022-08-05":4145.19,"2022-07-29":4130.29,"2022-07-22":3961.63,"2022-07-15":3863.16,"2022-07-08":3899.38,"2022-07-01":3825.33,"2022-06-24":3911.74,"2022-06-17":3674.84,"2022-06-10":3900.86,"2022-06-03":4108.54,"2022-05-27":4158.24,"2022-05-20":3901.36,"2022-05-13":4023.89,"2022-05-06":4123.34,"2022-04-29":4131.93,"2022-04-22":4271.78,"2022-04-14":4392.59,"2022-04-08":4488.28,"2022-04-01":4545.86,"2022-03-25":4543.06,"2022-03-18":4463.12,"2022-03-11":4204.31,"2022-03-04":4328.87,"2022-02-25":4384.65,"2022-02-18":4348.87,"2022-02-11":4418.64,"2022-02-04":4500.53,"2022-01-28":4431.85,"2022-01-21":4397.94,"2022-01-14":4662.85,"2022-01-07":4677.03,"2021-12-31":4766.18,"2021-12-23":4725.79,"2021-12-17":4620.64,"2021-12-10":4712.02,"2021-12-03":4538.43,"2021-11-26":4594.62,"2021-11-19":4697.96,"2021-11-12":4682.85,"2021-11-05":4697.53,"2021-10-29":4605.38,"2021-10-22":4544.90,"2021-10-15":4471.37,"2021-10-08":4391.34,"2021-10-01":4357.04,"2021-09-24":4455.48,"2021-09-17":4432.99,"2021-09-10":4458.58,"2021-09-03":4535.43,"2021-08-27":4509.37,"2021-08-20":4441.67,"2021-08-13":4468.00,"2021-08-06":4436.52,"2021-07-30":4395.26,"2021-07-23":4411.79,"2021-07-16":4327.16,"2021-07-09":4369.55,"2021-07-02":4352.34,"2021-06-25":4280.70,"2021-06-18":4166.45,"2021-06-11":4247.44,"2021-06-04":4229.89,"2021-05-28":4204.11,"2021-05-21":4155.86,"2021-05-14":4173.85,"2021-05-07":4232.60,"2021-04-30":4181.17,"2021-04-23":4180.17,"2021-04-16":4185.47,"2021-04-09":4128.80,"2021-04-01":4019.87,"2021-03-26":3974.54,"2021-03-19":3913.10,"2021-03-12":3943.34,"2021-03-05":3841.94,"2021-02-26":3811.15,"2021-03-01":3901.82};
const BUILTIN_VIX = {"2026-02-27":19.86,"2026-02-20":19.09,"2026-02-13":20.60,"2026-02-06":20.37,"2026-01-30":17.44,"2026-01-23":16.09,"2026-01-16":15.86,"2026-01-09":14.49,"2026-01-02":14.51,"2025-12-26":13.60,"2025-12-19":14.91,"2025-12-12":15.74,"2025-12-05":15.41,"2025-11-28":16.35,"2025-11-21":23.43,"2025-11-14":19.83,"2025-11-07":19.08,"2025-10-31":17.44,"2025-10-24":16.37,"2025-10-17":20.78,"2025-10-10":21.66,"2025-10-03":16.65,"2025-09-26":15.29,"2025-09-19":15.45,"2025-09-12":14.76,"2025-09-05":15.18,"2025-08-29":15.36,"2025-08-22":14.22,"2025-08-15":15.09,"2025-08-08":15.15,"2025-08-01":20.38,"2025-07-25":14.93,"2025-07-18":16.41,"2025-07-11":16.40,"2025-07-03":16.38,"2025-06-27":16.32,"2025-06-20":20.62,"2025-06-13":20.82,"2025-06-06":16.77,"2025-05-30":18.57,"2025-05-23":22.29,"2025-05-16":17.24,"2025-05-09":21.90,"2025-05-02":22.68,"2025-04-25":24.84,"2025-04-17":29.65,"2025-04-11":37.56,"2025-04-04":45.31,"2025-03-28":21.65,"2025-03-21":19.28,"2025-03-14":21.77,"2025-03-07":23.37,"2025-02-28":19.63,"2025-02-21":18.21,"2025-02-14":14.77,"2025-02-07":16.54,"2025-01-31":16.43,"2025-01-24":14.85,"2025-01-17":15.97,"2025-01-10":19.54,"2025-01-03":16.13,"2024-12-27":15.95,"2024-12-20":18.36,"2024-12-13":13.81,"2024-12-06":12.77,"2024-11-29":13.51,"2024-11-22":15.24,"2024-11-15":16.14,"2024-11-08":14.94,"2024-11-01":21.88,"2024-10-25":20.33,"2024-10-18":18.03,"2024-10-11":20.46,"2024-10-04":19.21,"2024-09-27":16.96,"2024-09-20":16.15,"2024-09-13":16.56,"2024-09-06":22.38,"2024-08-30":15.00,"2024-08-23":15.86,"2024-08-16":14.80,"2024-08-09":20.37,"2024-08-02":23.39,"2024-07-26":16.39,"2024-07-19":16.52,"2024-07-12":12.46,"2024-07-05":12.48,"2024-06-28":12.44,"2024-06-21":13.18,"2024-06-14":12.66,"2024-06-07":12.22,"2024-05-31":12.92,"2024-05-24":11.86,"2024-05-17":12.34,"2024-05-10":14.55,"2024-05-03":13.49,"2024-04-26":15.61,"2024-04-19":18.71,"2024-04-12":17.31,"2024-04-05":15.03,"2024-03-28":13.01,"2024-03-22":12.93,"2024-03-15":14.41,"2024-03-08":14.07,"2024-03-01":13.43,"2024-02-23":13.75,"2024-02-16":14.22,"2024-02-09":12.93,"2024-02-02":13.84,"2024-01-26":13.27,"2024-01-19":13.30,"2024-01-12":12.70,"2024-01-05":13.22,"2023-12-29":12.45,"2023-12-22":13.03,"2023-12-15":12.28,"2023-12-08":12.35,"2023-12-01":12.63,"2023-11-24":12.46,"2023-11-17":14.29,"2023-11-10":14.17,"2023-11-03":15.00,"2023-10-27":19.75,"2023-10-20":21.71,"2023-10-13":19.32,"2023-10-06":19.10,"2023-09-29":17.52,"2023-09-22":17.52,"2023-09-15":13.79,"2023-09-08":13.83,"2023-09-01":14.34,"2023-08-25":17.20,"2023-08-18":17.03,"2023-08-11":15.71,"2023-08-04":15.65,"2023-07-28":13.33,"2023-07-21":13.75,"2023-07-14":13.34,"2023-07-07":14.97,"2023-06-30":13.59,"2023-06-23":14.35,"2023-06-16":13.48,"2023-06-09":14.60,"2023-06-02":14.61,"2023-05-26":17.95,"2023-05-19":17.02,"2023-05-12":16.66,"2023-05-05":17.40,"2023-04-28":15.78,"2023-04-21":16.03,"2023-04-14":17.07,"2023-04-06":18.40,"2023-03-31":18.70,"2023-03-24":21.74,"2023-03-17":25.51,"2023-03-10":24.80,"2023-03-03":18.64,"2023-02-24":21.67,"2023-02-17":20.51,"2023-02-10":20.02,"2023-02-03":18.33,"2023-01-27":18.86,"2023-01-20":19.85,"2023-01-13":18.35,"2023-01-06":21.13,"2022-12-30":21.67,"2022-12-23":20.87,"2022-12-16":22.62,"2022-12-09":22.10,"2022-12-02":19.03,"2022-11-25":20.58,"2022-11-18":23.31,"2022-11-11":23.53,"2022-11-04":24.55,"2022-10-28":25.88,"2022-10-21":29.92,"2022-10-14":32.02,"2022-10-07":31.36,"2022-09-30":31.62,"2022-09-23":31.62,"2022-09-16":26.22,"2022-09-09":22.79,"2022-09-02":25.47,"2022-08-26":25.47,"2022-08-19":22.82,"2022-08-12":21.17,"2022-08-05":21.97,"2022-07-29":21.33,"2022-07-22":23.03,"2022-07-15":24.23,"2022-07-08":24.64,"2022-07-01":28.99,"2022-06-24":27.36,"2022-06-17":31.25,"2022-06-10":31.25,"2022-06-03":24.00,"2022-05-27":25.72,"2022-05-20":29.43,"2022-05-13":28.81,"2022-05-06":30.19,"2022-04-29":33.40,"2022-04-22":28.21,"2022-04-14":22.68,"2022-04-08":21.16,"2022-04-01":22.26,"2022-03-25":20.24,"2022-03-18":23.87,"2022-03-11":30.75,"2022-03-04":31.62,"2022-02-25":27.59,"2022-02-18":27.75,"2022-02-11":27.36,"2022-02-04":24.20,"2022-01-28":30.19,"2022-01-21":31.96,"2022-01-14":19.19,"2022-01-07":18.76,"2021-12-31":17.22,"2021-12-23":18.05,"2021-12-17":23.04,"2021-12-10":19.60,"2021-12-03":30.67,"2021-11-26":28.62,"2021-11-19":18.88,"2021-11-12":16.48,"2021-11-05":16.48,"2021-10-29":16.26,"2021-10-22":15.43,"2021-10-15":15.08,"2021-10-08":19.62,"2021-10-01":22.83,"2021-09-24":19.85,"2021-09-17":20.93,"2021-09-10":18.34,"2021-09-03":16.41,"2021-08-27":16.98,"2021-08-20":22.59,"2021-08-13":17.28,"2021-08-06":17.17,"2021-07-30":18.24,"2021-07-23":17.95,"2021-07-16":22.50,"2021-07-09":18.45,"2021-07-02":15.07,"2021-06-25":15.62,"2021-06-18":20.70,"2021-06-11":15.65,"2021-06-04":16.42,"2021-05-28":17.15,"2021-05-21":18.61,"2021-05-14":18.81,"2021-05-07":16.69,"2021-04-30":18.61,"2021-04-23":17.33,"2021-04-16":17.35,"2021-04-09":16.69,"2021-04-01":18.86,"2021-03-26":19.40,"2021-03-19":21.59,"2021-03-12":21.06,"2021-03-05":24.66,"2021-02-26":28.89,"2021-03-01":27.95};
const BUILTIN_DS = { id:"builtin-2021-2026", name:"S&P 500 × VIX — Bull, Bear & Recovery (2021–2026)", spx:BUILTIN_SPX, vix:BUILTIN_VIX, createdAt:"2021-03-01T00:00:00.000Z", builtin:true };

// ─── PARSERS ─────────────────────────────────────────────────────────────────
const MONTHS = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 };
function parseDate(str) {
  const s = str.trim().replace(/,/g,"");
  const m1 = s.match(/^([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4})$/);
  if (m1) { const mo=MONTHS[m1[1]]; if(mo!==undefined) return `${m1[3]}-${String(mo+1).padStart(2,"0")}-${String(m1[2]).padStart(2,"0")}`; }
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m2 = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (m2) return `${m2[3]}-${m2[1]}-${m2[2]}`;
  return null;
}
function parseNum(s) { return parseFloat(String(s).replace(/,/g,"")); }
function parseTable(raw) {
  const lines = raw.trim().split("\n").map(l=>l.trim()).filter(Boolean);
  const result = {};
  for (const line of lines) {
    const cols = line.split("\t");
    if (cols.length < 5) continue;
    if (/date|open/i.test(cols[0])) continue;
    const d = parseDate(cols[0]);
    if (!d) continue;
    const close = parseNum(cols[4]);
    if (isNaN(close)) continue;
    result[d] = close;
  }
  return result;
}
function buildRows(spxMap, vixMap) {
  const dates = [...new Set([...Object.keys(spxMap),...Object.keys(vixMap)])]
    .filter(d=>spxMap[d]&&vixMap[d]).sort();
  const rows = [];
  for (let i=1;i<dates.length;i++) {
    const d=dates[i],p=dates[i-1],sc=spxMap[d],sp=spxMap[p],vc=vixMap[d];
    if(!sc||!sp||!vc) continue;
    const pct=((sc-sp)/sp)*100;
    rows.push({date:d,year:d.slice(0,4),spxClose:sc,spxPct:+pct.toFixed(3),spxAbsPct:+Math.abs(pct).toFixed(3),vix:vc});
  }
  return rows;
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function pearson(xs,ys) {
  const n=xs.length; if(n<3) return 0;
  const mx=xs.reduce((a,b)=>a+b,0)/n,my=ys.reduce((a,b)=>a+b,0)/n;
  let num=0,dx2=0,dy2=0;
  for(let i=0;i<n;i++){const dx=xs[i]-mx,dy=ys[i]-my;num+=dx*dy;dx2+=dx*dx;dy2+=dy*dy;}
  return dx2===0||dy2===0?0:num/Math.sqrt(dx2*dy2);
}

// ─── BINS ─────────────────────────────────────────────────────────────────────
const BIN_ORDER=["< 15","15–20","20–25","25–30","> 30"];
const VIX_COLORS={"< 15":"#34d399","15–20":"#fbbf24","20–25":"#f97316","25–30":"#ef4444","> 30":"#dc2626"};
function vixBin(v){if(v<15)return"< 15";if(v<20)return"15–20";if(v<25)return"20–25";if(v<30)return"25–30";return"> 30";}

// ─── STORAGE ─────────────────────────────────────────────────────────────────
const SK="spxvix_v2";
function loadDS(){
  try {
    const saved = JSON.parse(localStorage.getItem(SK)) || [];
    // Inject built-in if not already present
    if (!saved.find(d => d.id === BUILTIN_DS.id)) return [BUILTIN_DS, ...saved];
    return saved;
  } catch { return [BUILTIN_DS]; }
}
function saveDS(ds){try{localStorage.setItem(SK,JSON.stringify(ds.filter(d=>!d.builtin)));}catch{}}

// ─── TOOLTIPS ────────────────────────────────────────────────────────────────
function ScatterTip({active,payload}){
  if(!active||!payload?.length) return null;
  const d=payload[0].payload;
  return(
    <div style={{background:"#090f1c",border:"1px solid #1e3050",borderRadius:8,padding:"10px 14px",fontSize:12,lineHeight:1.9,fontFamily:"monospace",pointerEvents:"none"}}>
      <div style={{color:"#4b6282",marginBottom:3}}>{d.date}</div>
      <div><span style={{color:"#4b6282"}}>VIX    </span><span style={{color:VIX_COLORS[vixBin(d.vix)],fontWeight:700}}>{d.vix.toFixed(2)}</span></div>
      <div><span style={{color:"#4b6282"}}>|Δ%|   </span><span style={{color:"#93c5fd",fontWeight:700}}>{d.spxAbsPct.toFixed(3)}%</span></div>
      <div><span style={{color:"#4b6282"}}>Δ%     </span><span style={{color:d.spxPct>=0?"#34d399":"#f87171",fontWeight:700}}>{d.spxPct>=0?"+":""}{d.spxPct.toFixed(3)}%</span></div>
      <div><span style={{color:"#4b6282"}}>SPX    </span><span style={{color:"#e2e8f0"}}>{d.spxClose.toFixed(2)}</span></div>
    </div>
  );
}
function LineTip({active,payload,label}){
  if(!active||!payload?.length) return null;
  return(
    <div style={{background:"#090f1c",border:"1px solid #1e3050",borderRadius:8,padding:"10px 14px",fontSize:12,lineHeight:1.9,fontFamily:"monospace"}}>
      <div style={{color:"#4b6282",marginBottom:3}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i}><span style={{color:p.color}}>{p.name}  </span>
          <span style={{color:"#e2e8f0",fontWeight:700}}>{typeof p.value==="number"?p.value.toFixed(p.name==="VIX"?2:3):"—"}{p.name!=="VIX"?"%":""}</span></div>
      ))}
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({label,value,sub,accent="#e2e8f0"}){
  return(
    <div style={{background:"#080f1a",border:"1px solid #1a2840",borderRadius:10,padding:"12px 16px",flex:1,minWidth:130}}>
      <div style={{fontSize:10,color:"#3d5a7a",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:5}}>{label}</div>
      <div style={{fontSize:22,fontWeight:900,color:accent,fontFamily:"'Courier New',monospace",letterSpacing:"-0.02em"}}>{value}</div>
      {sub&&<div style={{fontSize:10,color:"#3d5a7a",marginTop:3}}>{sub}</div>}
    </div>
  );
}

// ─── ZOOMABLE SCATTER ────────────────────────────────────────────────────────
function ZoomableScatter({data,scenario}){
  const containerRef=useRef(null);
  const [zoom,setZoom]=useState({xMin:null,xMax:null,yMin:null,yMax:null});
  const [dragging,setDragging]=useState(false);
  const dragStart=useRef(null);
  const dragOrigin=useRef(null);

  const fullBounds=useMemo(()=>{
    if(!data.length) return{xMin:0,xMax:50,yMin:0,yMax:10};
    const xs=data.map(d=>d.vix),ys=data.map(d=>d.spxAbsPct);
    const xPad=(Math.max(...xs)-Math.min(...xs))*0.06||2;
    const yPad=(Math.max(...ys)-Math.min(...ys))*0.06||0.3;
    return{xMin:Math.min(...xs)-xPad,xMax:Math.max(...xs)+xPad,yMin:Math.max(0,Math.min(...ys)-yPad),yMax:Math.max(...ys)+yPad};
  },[data]);

  const ab=useMemo(()=>({
    xMin:zoom.xMin??fullBounds.xMin,xMax:zoom.xMax??fullBounds.xMax,
    yMin:zoom.yMin??fullBounds.yMin,yMax:zoom.yMax??fullBounds.yMax,
  }),[zoom,fullBounds]);

  const resetZoom=useCallback(()=>setZoom({xMin:null,xMax:null,yMin:null,yMax:null}),[]);

  const handleWheel=useCallback((e)=>{
    e.preventDefault();
    const factor=e.deltaY>0?1.18:0.85;
    const xMid=(ab.xMin+ab.xMax)/2,yMid=(ab.yMin+ab.yMax)/2;
    const xR=(ab.xMax-ab.xMin)*factor/2,yR=(ab.yMax-ab.yMin)*factor/2;
    setZoom({xMin:xMid-xR,xMax:xMid+xR,yMin:Math.max(0,yMid-yR),yMax:yMid+yR});
  },[ab]);

  useEffect(()=>{
    const el=containerRef.current;
    if(!el) return;
    el.addEventListener("wheel",handleWheel,{passive:false});
    return()=>el.removeEventListener("wheel",handleWheel);
  },[handleWheel]);

  function onMouseDown(e){
    if(e.button!==0) return;
    setDragging(true);
    dragStart.current={x:e.clientX,y:e.clientY};
    dragOrigin.current={...ab};
  }
  function onMouseMove(e){
    if(!dragging||!dragStart.current) return;
    const rect=containerRef.current?.getBoundingClientRect();
    if(!rect) return;
    const W=rect.width-80,H=rect.height-60;
    const o=dragOrigin.current;
    const xs=(o.xMax-o.xMin)/W,ys=(o.yMax-o.yMin)/H;
    const dx=(e.clientX-dragStart.current.x)*xs;
    const dy=(e.clientY-dragStart.current.y)*ys;
    setZoom({xMin:o.xMin-dx,xMax:o.xMax-dx,yMin:Math.max(0,o.yMin+dy),yMax:o.yMax+dy});
  }
  function onMouseUp(){setDragging(false);}

  const isZoomed=zoom.xMin!==null;
  const scenLabel={
    same:"VIX (same week) vs SPX Weekly |Δ%|",
    lag1:"Previous week VIX vs current week SPX |Δ%|  (lag-1)",
    lead1:"Current week VIX vs next week SPX |Δ%|  (predictive)",
  }[scenario];

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
        <div style={{fontSize:11,color:"#3d5a7a"}}>{scenLabel}</div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div style={{fontSize:10,color:"#2a4060",background:"#080f1a",border:"1px solid #1a2840",borderRadius:5,padding:"3px 10px"}}>
            🖱 Scroll to zoom · Drag to pan
          </div>
          {isZoomed&&(
            <button onClick={resetZoom} style={{padding:"4px 12px",borderRadius:5,border:"1px solid #3b82f6",background:"#0c1f40",color:"#60a5fa",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"monospace"}}>
              ↺ Reset zoom
            </button>
          )}
        </div>
      </div>

      <div ref={containerRef}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        style={{cursor:dragging?"grabbing":"crosshair",userSelect:"none",background:"#060c14",border:"1px solid #1a2840",borderRadius:12,padding:"16px 8px 8px 0",touchAction:"none"}}>
        <ResponsiveContainer width="100%" height={440}>
          <ScatterChart margin={{top:10,right:30,bottom:32,left:20}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0c1a28"/>
            <XAxis dataKey="vix" type="number" name="VIX"
              domain={[ab.xMin,ab.xMax]} tickFormatter={v=>v.toFixed(1)}
              label={{value:"VIX Close",position:"insideBottom",offset:-16,fill:"#3d5a7a",fontSize:12}}
              tick={{fill:"#3d5a7a",fontSize:11}} tickLine={{stroke:"#1a2840"}} axisLine={{stroke:"#1a2840"}}/>
            <YAxis dataKey="spxAbsPct" type="number" name="SPX |Δ%|"
              domain={[Math.max(0,ab.yMin),ab.yMax]} tickFormatter={v=>v.toFixed(1)+"%"}
              label={{value:"SPX Weekly |Δ%|",angle:-90,position:"insideLeft",offset:12,fill:"#3d5a7a",fontSize:12}}
              tick={{fill:"#3d5a7a",fontSize:11}} tickLine={{stroke:"#1a2840"}} axisLine={{stroke:"#1a2840"}}/>
            <Tooltip content={<ScatterTip/>} cursor={{strokeDasharray:"3 3",stroke:"#2a4060"}}/>
            <Scatter data={data}
              shape={(props)=>{
                const{cx,cy,payload}=props;
                const col=VIX_COLORS[vixBin(payload.vix)];
                return(
                  <circle cx={cx} cy={cy} r={7}
                    fill={col} fillOpacity={0.22}
                    stroke={col} strokeWidth={1.2} strokeOpacity={0.65}/>
                );
              }}/>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div style={{display:"flex",gap:18,marginTop:12,justifyContent:"center",flexWrap:"wrap"}}>
        {BIN_ORDER.map(label=>(
          <div key={label} style={{display:"flex",alignItems:"center",gap:6,fontSize:12}}>
            <div style={{width:12,height:12,borderRadius:"50%",background:VIX_COLORS[label],opacity:0.5,border:`1.5px solid ${VIX_COLORS[label]}`}}/>
            <span style={{color:"#4b6282"}}>VIX {label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function App(){
  const[datasets,setDatasets]=useState(()=>loadDS());
  const[activeId,setActiveId]=useState(BUILTIN_DS.id);
  const[screen,setScreen]=useState("analyze");
  const[sidebarOpen,setSidebarOpen]=useState(false);

  // wizard
  const[step,setStep]=useState(0);
  const[dsName,setDsName]=useState("");
  const[spxText,setSpxText]=useState("");
  const[vixText,setVixText]=useState("");
  const[wizErr,setWizErr]=useState("");
  const[preview,setPreview]=useState(null);

  // analysis
  const[tab,setTab]=useState("scatter");
  const[scenario,setScenario]=useState("same");
  const[yearFilter,setYearFilter]=useState("all");
  const[vixFilter,setVixFilter]=useState("all");


  const activeDs=useMemo(()=>datasets.find(d=>d.id===activeId)||null,[datasets,activeId]);
  const rows=useMemo(()=>activeDs?buildRows(activeDs.spx,activeDs.vix):[],[activeDs]);

  function openWizard(){setStep(0);setDsName("");setSpxText("");setVixText("");setWizErr("");setPreview(null);setScreen("wizard");setSidebarOpen(false);}

  function wizNext(){
    if(step===0){
      if(!dsName.trim()){setWizErr("Please enter a name for this dataset.");return;}
      setWizErr("");setStep(1);
    }else if(step===1){
      const m=parseTable(spxText);
      if(Object.keys(m).length<2){setWizErr("Could not parse SPX data. Ensure it is tab-separated with Close price in column 5 (index 4).");return;}
      setWizErr("");setStep(2);
    }else if(step===2){
      const spxMap=parseTable(spxText),vixMap=parseTable(vixText);
      if(Object.keys(vixMap).length<2){setWizErr("Could not parse VIX data.");return;}
      const r=buildRows(spxMap,vixMap);
      if(r.length<2){setWizErr("No overlapping dates found between SPX and VIX. Check date format consistency.");return;}
      setPreview({spxMap,vixMap,rows:r});setWizErr("");setStep(3);
    }
  }

  function wizSave(){
    if(!preview) return;
    const ds={id:Date.now().toString(),name:dsName.trim(),spx:preview.spxMap,vix:preview.vixMap,createdAt:new Date().toISOString()};
    const next=[...datasets,ds];
    setDatasets(next);saveDS(next);setActiveId(ds.id);setScreen("analyze");
  }

  function deleteDs(id){
    if(id===BUILTIN_DS.id) return;
    const next=datasets.filter(d=>d.id!==id);
    setDatasets(next);saveDS(next);
    if(activeId===id){setActiveId(next[0]?.id||null);if(!next[0])setScreen("analyze");}
  }

  const years=useMemo(()=>["all",...[...new Set(rows.map(r=>r.year))].sort().reverse()],[rows]);
  const filtered=useMemo(()=>{
    let d=rows;
    if(yearFilter!=="all") d=d.filter(r=>r.year===yearFilter);
    if(vixFilter!=="all") d=d.filter(r=>vixBin(r.vix)===vixFilter);
    return d;
  },[rows,yearFilter,vixFilter]);

  const scatterData=useMemo(()=>{
    if(scenario==="same") return filtered;
    if(scenario==="lag1") return filtered.map((r,i)=>i===0?null:{...r,vix:filtered[i-1].vix}).filter(Boolean);
    if(scenario==="lead1") return filtered.map((r,i)=>i>=filtered.length-1?null:{...r,spxAbsPct:filtered[i+1].spxAbsPct,spxPct:filtered[i+1].spxPct}).filter(Boolean);
    return filtered;
  },[filtered,scenario]);

  const r=useMemo(()=>pearson(scatterData.map(d=>d.vix),scatterData.map(d=>d.spxAbsPct)),[scatterData]);
  const rColor=Math.abs(r)>0.4?"#34d399":Math.abs(r)>0.25?"#fbbf24":"#94a3b8";

  const buckets=useMemo(()=>{
    const b={};BIN_ORDER.forEach(k=>b[k]=[]);
    filtered.forEach(r=>b[vixBin(r.vix)].push(r.spxAbsPct));
    return BIN_ORDER.map(label=>({label,count:b[label].length,color:VIX_COLORS[label],mean:b[label].length?b[label].reduce((a,c)=>a+c,0)/b[label].length:0}));
  },[filtered]);

  const allR=useMemo(()=>{
    if(!rows.length) return[];
    return[
      {label:"VIX (same week)",r:pearson(rows.map(d=>d.vix),rows.map(d=>d.spxAbsPct))},
      {label:"VIX (prev week)",r:pearson(rows.slice(1).map(d=>d.vix),rows.slice(1).map((_,i)=>rows[i].spxAbsPct))},
      {label:"VIX → next week",r:pearson(rows.slice(0,-1).map(d=>d.vix),rows.slice(1).map(d=>d.spxAbsPct))},
      {label:"VIX change",r:pearson(rows.slice(1).map((d,i)=>d.vix-rows[i].vix),rows.slice(1).map(d=>d.spxAbsPct))},
    ];
  },[rows]);

  const tsData=useMemo(()=>[...filtered].reverse(),[filtered]);
  const avgVix=filtered.length?+(filtered.reduce((a,b)=>a+b.vix,0)/filtered.length).toFixed(2):0;
  const avgAbsPct=filtered.length?+(filtered.reduce((a,b)=>a+b.spxAbsPct,0)/filtered.length).toFixed(3):0;
  const maxRow=filtered.length?filtered.reduce((a,b)=>b.spxAbsPct>a.spxAbsPct?b:a):null;

  const S={
    page:{background:"#060c14",minHeight:"100vh",fontFamily:"'JetBrains Mono','Fira Code','Courier New',monospace",color:"#e2e8f0"},
    card:{background:"#080f1a",border:"1px solid #1a2840",borderRadius:12},
    input:{background:"#070d1c",border:"1px solid #1a2840",borderRadius:8,padding:"10px 14px",color:"#e2e8f0",fontFamily:"monospace",fontSize:13,outline:"none",width:"100%",boxSizing:"border-box"},
    textarea:{background:"#050a15",border:"1px solid #1a2840",borderRadius:8,padding:"12px 14px",color:"#e2e8f0",fontFamily:"'Courier New',monospace",fontSize:11,outline:"none",resize:"vertical",width:"100%",boxSizing:"border-box",lineHeight:1.6},
    btn:(col="#3b82f6",bg="#0c1f40")=>({padding:"9px 20px",borderRadius:8,border:`1px solid ${col}`,cursor:"pointer",fontSize:13,fontWeight:700,background:bg,color:col,fontFamily:"monospace",transition:"all 0.15s"}),
    ghost:{padding:"7px 16px",borderRadius:7,border:"1px solid #1a2840",cursor:"pointer",fontSize:12,fontWeight:600,background:"transparent",color:"#4b6282",fontFamily:"monospace"},
    tabBtn:(a)=>({padding:"8px 20px",borderRadius:6,border:"none",cursor:"pointer",fontSize:13,fontWeight:700,letterSpacing:"0.04em",background:a?"#1e3a6e":"#080f1a",color:a?"#93c5fd":"#3d5a7a",fontFamily:"monospace",transition:"all 0.15s"}),
    scenBtn:(a,col="#3b82f6")=>({padding:"6px 14px",borderRadius:6,border:`1px solid ${a?col:"#1a2840"}`,cursor:"pointer",fontSize:12,fontWeight:700,background:a?"#0c1f40":"transparent",color:a?col:"#4b6282",fontFamily:"monospace",transition:"all 0.15s"}),
    fBtn:(a,col="#3b82f6")=>({padding:"5px 12px",borderRadius:5,border:`1px solid ${a?col:"#1a2840"}`,cursor:"pointer",fontSize:12,fontWeight:600,background:a?"#0c1f40":"transparent",color:a?col:"#4b6282",fontFamily:"monospace",transition:"all 0.15s"}),
    lbl:{fontSize:10,color:"#3d5a7a",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:6,display:"block"},
  };

  // ─── WIZARD ──────────────────────────────────────────────────────────────────
  if(screen==="wizard") return(
    <div style={{...S.page,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:32}}>
      <div style={{width:"100%",maxWidth:820}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:11,color:"#3b82f6",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8}}>● SPX / VIX Explorer</div>
          <div style={{fontSize:26,fontWeight:900,letterSpacing:"-0.03em",color:"#f1f5f9"}}>Import Dataset</div>
          <div style={{fontSize:13,color:"#3d5a7a",marginTop:6}}>Paste weekly Yahoo Finance data to begin analysis</div>
        </div>

        {/* Step indicator */}
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:0,marginBottom:32}}>
          {["Name","SPX Data","VIX Data","Preview"].map((l,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center"}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:88}}>
                <div style={{width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,
                  background:step>i?"#1d4ed8":step===i?"#0c1f40":"#080f1a",
                  border:`2px solid ${step>=i?"#3b82f6":"#1a2840"}`,
                  color:step>i?"#fff":step===i?"#93c5fd":"#3d5a7a"}}>
                  {step>i?"✓":i+1}
                </div>
                <div style={{fontSize:10,color:step>=i?"#60a5fa":"#3d5a7a",marginTop:5}}>{l}</div>
              </div>
              {i<3&&<div style={{width:36,height:2,background:step>i?"#1d4ed8":"#1a2840",marginBottom:18,flexShrink:0}}/>}
            </div>
          ))}
        </div>

        <div style={{...S.card,padding:32}}>
          {step===0&&(
            <>
              <label style={S.lbl}>Dataset name</label>
              <input style={S.input} value={dsName} onChange={e=>setDsName(e.target.value)}
                placeholder='e.g. SPX 2021–2026'
                onKeyDown={e=>e.key==="Enter"&&wizNext()} autoFocus/>
            </>
          )}

          {step===1&&(
            <>
              <label style={S.lbl}>SPX Weekly Data — paste tab-separated from Yahoo Finance</label>
              <div style={{fontSize:11,color:"#3d5a7a",marginBottom:12,lineHeight:1.9,background:"#050a15",border:"1px solid #0f1e30",borderRadius:7,padding:"10px 14px"}}>
                <strong style={{color:"#60a5fa"}}>Expected columns:</strong>
                <span style={{color:"#4b6282"}}> Date · Open · High · Low · </span>
                <strong style={{color:"#fbbf24"}}>Close</strong>
                <span style={{color:"#4b6282"}}> · Adj Close · Volume</span><br/>
                <strong style={{color:"#60a5fa"}}>Date formats:</strong>
                <span style={{color:"#4b6282"}}> "Feb 27, 2026" · "2026-02-27" · "02/27/2026"</span>
              </div>
              <textarea style={{...S.textarea,height:260}} value={spxText} onChange={e=>setSpxText(e.target.value)}
                placeholder={"Date\tOpen\tHigh\tLow\tClose\tAdj Close\tVolume\nFeb 27, 2026\t6,856.54\t6,882.96\t6,831.74\t6,878.88\t6,878.88\t6,665,660,000\n..."}/>
              <div style={{fontSize:11,color:Object.keys(parseTable(spxText)).length>0?"#34d399":"#3d5a7a",marginTop:8}}>
                {spxText.trim()?`${Object.keys(parseTable(spxText)).length} rows detected`:"No data entered yet"}
              </div>
            </>
          )}

          {step===2&&(
            <>
              <label style={S.lbl}>VIX Weekly Data — paste tab-separated from Yahoo Finance</label>
              <div style={{fontSize:11,color:"#3d5a7a",marginBottom:12,lineHeight:1.9,background:"#050a15",border:"1px solid #0f1e30",borderRadius:7,padding:"10px 14px"}}>
                Same format as SPX. Volume column may show <span style={{color:"#4b6282"}}>"–"</span> — that's fine.
              </div>
              <textarea style={{...S.textarea,height:260}} value={vixText} onChange={e=>setVixText(e.target.value)}
                placeholder={"Date\tOpen\tHigh\tLow\tClose\tAdj Close\tVolume\nFeb 27, 2026\t19.28\t21.74\t18.77\t19.86\t19.86\t-\n..."}/>
              <div style={{fontSize:11,color:Object.keys(parseTable(vixText)).length>0?"#34d399":"#3d5a7a",marginTop:8}}>
                {vixText.trim()?`${Object.keys(parseTable(vixText)).length} rows detected`:"No data entered yet"}
              </div>
            </>
          )}

          {step===3&&preview&&(
            <>
              <div style={{fontSize:13,color:"#34d399",fontWeight:700,marginBottom:18}}>✓ Data parsed successfully</div>
              <div style={{display:"flex",gap:12,marginBottom:24,flexWrap:"wrap"}}>
                {[
                  {l:"SPX rows",v:Object.keys(preview.spxMap).length},
                  {l:"VIX rows",v:Object.keys(preview.vixMap).length},
                  {l:"Common weeks",v:preview.rows.length},
                  {l:"Date range",v:`${preview.rows[0]?.date} → ${preview.rows.at(-1)?.date}`},
                ].map(({l,v})=>(
                  <div key={l} style={{...S.card,padding:"10px 16px",flex:1,minWidth:130}}>
                    <div style={{fontSize:10,color:"#3d5a7a",textTransform:"uppercase",letterSpacing:"0.08em"}}>{l}</div>
                    <div style={{fontSize:16,fontWeight:800,color:"#93c5fd",marginTop:3}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:10,color:"#3d5a7a",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.08em"}}>First 5 rows preview</div>
              <div style={{...S.card,padding:12,overflowX:"auto"}}>
                <table style={{fontSize:11,borderCollapse:"collapse",width:"100%"}}>
                  <thead><tr>
                    {["Date","SPX Close","SPX Δ%","SPX |Δ%|","VIX"].map(h=>(
                      <th key={h} style={{textAlign:"left",padding:"4px 12px",color:"#3d5a7a",borderBottom:"1px solid #1a2840",fontWeight:600}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {preview.rows.slice(0,5).map((row,i)=>(
                      <tr key={i} style={{borderBottom:"1px solid #0d1a28"}}>
                        <td style={{padding:"5px 12px",color:"#64748b"}}>{row.date}</td>
                        <td style={{padding:"5px 12px",color:"#e2e8f0"}}>{row.spxClose.toFixed(2)}</td>
                        <td style={{padding:"5px 12px",color:row.spxPct>=0?"#34d399":"#f87171",fontWeight:700}}>{row.spxPct>=0?"+":""}{row.spxPct.toFixed(3)}%</td>
                        <td style={{padding:"5px 12px",color:"#93c5fd",fontWeight:700}}>{row.spxAbsPct.toFixed(3)}%</td>
                        <td style={{padding:"5px 12px",color:VIX_COLORS[vixBin(row.vix)],fontWeight:700}}>{row.vix.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {wizErr&&(
            <div style={{marginTop:14,padding:"10px 14px",background:"#1c0808",border:"1px solid #7f1d1d",borderRadius:8,fontSize:12,color:"#fca5a5"}}>{wizErr}</div>
          )}

          <div style={{display:"flex",justifyContent:"space-between",marginTop:26}}>
            <button style={S.ghost} onClick={()=>step>0?setStep(step-1):setScreen(datasets.length>0?"analyze":"wizard")}>
              {step>0?"← Back":datasets.length>0?"← Cancel":""}
            </button>
            {step<3
              ?<button style={S.btn()} onClick={wizNext}>Next →</button>
              :<button style={S.btn("#34d399","#042013")} onClick={wizSave}>✓ Save & Analyze</button>}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── ANALYSIS ────────────────────────────────────────────────────────────────
  return(
    <div style={S.page}>
      {/* Sidebar */}
      {sidebarOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:50,display:"flex"}}>
          <div style={{flex:1,background:"rgba(0,0,0,0.65)"}} onClick={()=>setSidebarOpen(false)}/>
          <div style={{width:340,background:"#080f1a",borderLeft:"1px solid #1a2840",height:"100%",overflowY:"auto",padding:24,display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <div style={{fontSize:13,fontWeight:800,color:"#93c5fd"}}>Saved Datasets</div>
              <button style={S.ghost} onClick={()=>setSidebarOpen(false)}>✕</button>
            </div>
            {datasets.map(ds=>{
              const dsRows=buildRows(ds.spx,ds.vix);
              return(
                <div key={ds.id} onClick={()=>{setActiveId(ds.id);setSidebarOpen(false);}}
                  style={{...S.card,padding:"12px 16px",cursor:"pointer",position:"relative",
                    borderColor:ds.id===activeId?"#3b82f6":"#1a2840",
                    background:ds.id===activeId?"#0c1f40":"#080f1a"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,paddingRight:24}}>
                    <span style={{fontSize:13,fontWeight:700,color:ds.id===activeId?"#93c5fd":"#e2e8f0"}}>{ds.name}</span>
                    {ds.builtin&&<span style={{fontSize:9,color:"#1d4ed8",background:"#0c1a30",border:"1px solid #1d4ed8",borderRadius:4,padding:"1px 6px",letterSpacing:"0.08em"}}>BUILT-IN</span>}
                  </div>
                  <div style={{fontSize:10,color:"#3d5a7a",marginTop:4}}>{dsRows.length} weeks · {dsRows[0]?.date} → {dsRows.at(-1)?.date}</div>
                  {!ds.builtin&&<button onClick={e=>{e.stopPropagation();deleteDs(ds.id);}}
                    style={{position:"absolute",top:10,right:12,background:"none",border:"none",color:"#ef4444",cursor:"pointer",fontSize:15,padding:2}}>🗑</button>}
                </div>
              );
            })}
            <button style={S.btn()} onClick={openWizard}>+ Import New Dataset</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{background:"linear-gradient(90deg,#080f1a,#0c1525,#080f1a)",borderBottom:"1px solid #1a2840",
        padding:"16px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#3b82f6",boxShadow:"0 0 8px #3b82f6"}}/>
            <span style={{fontSize:11,color:"#3b82f6",letterSpacing:"0.15em",textTransform:"uppercase",fontWeight:700}}>SPX / VIX Explorer</span>
          </div>
          <div style={{fontSize:18,fontWeight:900,color:"#f1f5f9",marginTop:3,letterSpacing:"-0.02em"}}>{activeDs?.name||"—"}</div>
          <div style={{fontSize:11,color:"#3d5a7a",marginTop:2}}>{rows.length} weeks · {rows[0]?.date} → {rows.at(-1)?.date}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:10,color:"#3d5a7a",letterSpacing:"0.08em",textTransform:"uppercase"}}>Pearson r</div>
            <div style={{fontSize:34,fontWeight:900,color:rColor,letterSpacing:"-0.04em",lineHeight:1}}>{r.toFixed(4)}</div>
            <div style={{fontSize:10,color:"#3d5a7a"}}>{scatterData.length} obs</div>
          </div>
          <button style={S.btn()} onClick={()=>setSidebarOpen(true)}>☰ Datasets</button>
        </div>
      </div>

      <div style={{padding:"20px 28px"}}>
        {/* Filters */}
        <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:10,color:"#3d5a7a",textTransform:"uppercase",letterSpacing:"0.08em",marginRight:2}}>Year:</span>
          {years.map(y=>(
            <button key={y} style={S.fBtn(yearFilter===y)} onClick={()=>setYearFilter(y)}>{y==="all"?"All":y}</button>
          ))}
          <span style={{fontSize:10,color:"#3d5a7a",textTransform:"uppercase",letterSpacing:"0.08em",marginLeft:10,marginRight:2}}>VIX:</span>
          {["all",...BIN_ORDER].map(bin=>(
            <button key={bin} style={S.fBtn(vixFilter===bin,VIX_COLORS[bin]||"#3b82f6")} onClick={()=>setVixFilter(bin)}>
              {bin==="all"?"All":bin}
            </button>
          ))}
        </div>

        {/* Stat cards */}
        <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
          <StatCard label="Avg VIX" value={avgVix.toFixed(1)} sub="selected period" accent="#fbbf24"/>
          <StatCard label="Avg |ΔSPX%|" value={avgAbsPct.toFixed(2)+"%"} sub="weekly abs change" accent="#60a5fa"/>
          <StatCard label="Max |ΔSPX%|" value={maxRow?maxRow.spxAbsPct.toFixed(2)+"%":"—"} sub={maxRow?.date} accent="#f87171"/>
          <StatCard label="Pearson r" value={r.toFixed(4)} sub={Math.abs(r)>0.4?"Strong ✓":Math.abs(r)>0.25?"Moderate":"Weak"} accent={rColor}/>
          <StatCard label="Observations" value={scatterData.length} sub="weeks"/>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          <button style={S.tabBtn(tab==="scatter")} onClick={()=>setTab("scatter")}>📊 Scatter Plot</button>
          <button style={S.tabBtn(tab==="timeseries")} onClick={()=>setTab("timeseries")}>📈 Time Series</button>
          <button style={S.tabBtn(tab==="buckets")} onClick={()=>setTab("buckets")}>📦 VIX Levels</button>
        </div>

        {/* ── SCATTER */}
        {tab==="scatter"&&(
          <div>
            <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{fontSize:10,color:"#3d5a7a",textTransform:"uppercase",letterSpacing:"0.08em",marginRight:4}}>Scenario:</span>
              <button style={S.scenBtn(scenario==="same")} onClick={()=>setScenario("same")}>VIX (same week)</button>
              <button style={S.scenBtn(scenario==="lag1")} onClick={()=>setScenario("lag1")}>VIX (prev week)</button>
              <button style={S.scenBtn(scenario==="lead1")} onClick={()=>setScenario("lead1")}>VIX → next week</button>
            </div>
            <ZoomableScatter data={scatterData} scenario={scenario}/>
          </div>
        )}

        {/* ── TIME SERIES */}
        {tab==="timeseries"&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{...S.card,padding:"18px 8px 8px 0"}}>
              <div style={{fontSize:11,color:"#3d5a7a",padding:"0 0 10px 24px"}}>SPX Weekly % Change (directional)</div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={tsData} margin={{top:5,right:30,bottom:5,left:20}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0d1e30"/>
                  <XAxis dataKey="date" tick={{fill:"#3d5a7a",fontSize:10}} tickLine={{stroke:"#1a2840"}} axisLine={{stroke:"#1a2840"}}
                    interval={Math.floor(tsData.length/8)} angle={-20} textAnchor="end"/>
                  <YAxis tick={{fill:"#3d5a7a",fontSize:10}} tickLine={{stroke:"#1a2840"}} axisLine={{stroke:"#1a2840"}} tickFormatter={v=>v.toFixed(1)+"%"}/>
                  <Tooltip content={<LineTip/>}/>
                  <ReferenceLine y={0} stroke="#1e3050" strokeDasharray="4 4"/>
                  <Line type="monotone" dataKey="spxPct" name="SPX Δ%" stroke="#60a5fa" strokeWidth={1.5} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{...S.card,padding:"18px 8px 8px 0"}}>
              <div style={{fontSize:11,color:"#3d5a7a",padding:"0 0 10px 24px"}}>SPX |Δ%| &amp; VIX (dual axis)</div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={tsData} margin={{top:5,right:60,bottom:5,left:20}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0d1e30"/>
                  <XAxis dataKey="date" tick={{fill:"#3d5a7a",fontSize:10}} tickLine={{stroke:"#1a2840"}} axisLine={{stroke:"#1a2840"}}
                    interval={Math.floor(tsData.length/8)} angle={-20} textAnchor="end"/>
                  <YAxis yAxisId="pct" tick={{fill:"#3d5a7a",fontSize:10}} tickLine={{stroke:"#1a2840"}} axisLine={{stroke:"#1a2840"}}
                    tickFormatter={v=>v.toFixed(1)+"%"} label={{value:"|Δ%|",angle:-90,position:"insideLeft",fill:"#3d5a7a",fontSize:11}}/>
                  <YAxis yAxisId="vix" orientation="right" tick={{fill:"#fbbf24",fontSize:10}} tickLine={{stroke:"#1a2840"}} axisLine={{stroke:"#1a2840"}}
                    label={{value:"VIX",angle:90,position:"insideRight",fill:"#fbbf24",fontSize:11}}/>
                  <Tooltip content={<LineTip/>}/>
                  <Line yAxisId="pct" type="monotone" dataKey="spxAbsPct" name="|Δ%|" stroke="#34d399" strokeWidth={1.5} dot={false}/>
                  <Line yAxisId="vix" type="monotone" dataKey="vix" name="VIX" stroke="#fbbf24" strokeWidth={1.5} dot={false} strokeDasharray="4 4"/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ── BUCKETS */}
        {tab==="buckets"&&(
          <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
            <div style={{flex:2,minWidth:300,...S.card,padding:"18px 8px 10px 0"}}>
              <div style={{fontSize:11,color:"#3d5a7a",padding:"0 0 10px 24px"}}>Avg |ΔSPX%| by VIX Level</div>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={buckets} margin={{top:10,right:30,bottom:20,left:20}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0d1e30" vertical={false}/>
                  <XAxis dataKey="label" tick={{fill:"#94a3b8",fontSize:13,fontWeight:600}} tickLine={{stroke:"#1a2840"}} axisLine={{stroke:"#1a2840"}}/>
                  <YAxis tick={{fill:"#3d5a7a",fontSize:11}} tickLine={{stroke:"#1a2840"}} axisLine={{stroke:"#1a2840"}}
                    tickFormatter={v=>v.toFixed(1)+"%"} label={{value:"Avg |Δ%|",angle:-90,position:"insideLeft",fill:"#3d5a7a",fontSize:11}}/>
                  <Tooltip formatter={v=>[v.toFixed(3)+"%","Avg |ΔSPX%|"]}
                    contentStyle={{background:"#090f1c",border:"1px solid #1e3050",borderRadius:8,fontSize:12,fontFamily:"monospace"}}
                    labelStyle={{color:"#94a3b8"}} itemStyle={{color:"#e2e8f0"}}/>
                  <Bar dataKey="mean" radius={[6,6,0,0]}
                    label={{position:"top",fill:"#94a3b8",fontSize:11,formatter:v=>v.toFixed(2)+"%"}}>
                    {buckets.map((b,i)=><Cell key={i} fill={b.color} fillOpacity={0.82}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{flex:1,minWidth:260,display:"flex",flexDirection:"column",gap:12}}>
              <div style={{...S.card,padding:20}}>
                <div style={{fontSize:10,color:"#3d5a7a",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:14}}>VIX Distribution</div>
                {buckets.map(b=>(
                  <div key={b.label} style={{marginBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontSize:13,color:b.color,fontWeight:700}}>VIX {b.label}</span>
                      <span style={{fontSize:11,color:"#3d5a7a"}}>{b.count} weeks</span>
                    </div>
                    <div style={{background:"#0a1525",borderRadius:4,height:6,overflow:"hidden"}}>
                      <div style={{width:filtered.length?`${(b.count/filtered.length*100).toFixed(1)}%`:"0%",height:"100%",background:b.color,borderRadius:4,transition:"width 0.5s"}}/>
                    </div>
                    <div style={{fontSize:10,color:"#3d5a7a",marginTop:2}}>
                      Avg |Δ%|: <span style={{color:b.color}}>{b.mean.toFixed(3)}%</span> · {filtered.length?`${(b.count/filtered.length*100).toFixed(0)}%`:"—"}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{...S.card,padding:20}}>
                <div style={{fontSize:10,color:"#3d5a7a",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:14}}>Scenario Comparison (full dataset)</div>
                {allR.map(s=>{
                  const col=Math.abs(s.r)>0.4?"#34d399":Math.abs(s.r)>0.25?"#fbbf24":"#4b6282";
                  return(
                    <div key={s.label} style={{marginBottom:12}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                        <span style={{fontSize:11,color:"#94a3b8"}}>{s.label}</span>
                        <span style={{fontSize:13,color:col,fontWeight:700}}>{s.r.toFixed(4)}</span>
                      </div>
                      <div style={{background:"#0a1525",borderRadius:4,height:5}}>
                        <div style={{width:`${Math.abs(s.r)*100}%`,height:"100%",background:col,borderRadius:4,transition:"width 0.5s"}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}