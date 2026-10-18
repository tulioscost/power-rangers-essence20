import {SKILLS,LADDER,SYSTEM_ID} from "./config.mjs";
export function getSkillInfo(actor,key){
  for(const [essence,group] of Object.entries(SKILLS))if(group[key]) return {essence,label:group[key],rank:Number(actor.system.skills[key]?.rank??0),specialization:actor.system.skills[key]?.specialization??""};
  throw Error(`Perícia desconhecida: ${key}`);
}
export function resolveLadder(rank,shift=0){
  const idx=Math.max(0,Math.min(LADDER.length-1,2+Math.max(0,rank)+Math.trunc(shift)));
  return {value:LADDER[idx],index:idx};
}
export function buildSkillFormula({rank=0,shift=0,specialized=false,edge=false,snag=false,flat=0}={}){
  const step=resolveLadder(rank,shift); const effect=step.value;
  if(effect==="fumble"||effect==="fail"||effect==="auto"||effect==="critical")return {formula:null,step,effect};
  if(rank===0)snag=true; // Falta de treinamento: Snag (salvo benefício específico, aplicado pelo mestre).
  const d20=edge&&!snag?"2d20kh":snag&&!edge?"2d20kl":"1d20";
  let bonus="";
  if(typeof effect==="number"){
    if(specialized&&rank>0){
      const faces=[2,4,6,8,10,12].filter(x=>x<=effect);
      bonus=faces.length?`{${faces.map(x=>`1d${x}`).join(",")}}kh`:"";
    }else bonus=`1d${effect}`;
  }else if(effect==="2d8"||effect==="3d6")bonus=effect;
  return {formula:`${d20}${bonus?` + ${bonus}`:""}${flat?` + (${Number(flat)})`:""}`,step,effect};
}
export function assessRoll(roll,{dc=null,effect=null}={}){
  const success=dc===null?null:roll.total>=dc;
  const d20die=roll.dice.find(d=>d.faces===20);
  const d20Results=(d20die?.results??[]).filter(r=>r.active!==false).map(r=>Number(r.result));
  const selectedD20=d20Results.length?roll.formula.includes("kh")?Math.max(...d20Results):roll.formula.includes("kl")?Math.min(...d20Results):d20Results[0]:null;
  const skillDice=roll.dice.filter(d=>d.faces!==20);
  const crit=success===true&&skillDice.some(d=>d.results.some(r=>r.active!==false&&r.result===d.faces));
  const fumble=success===false&&selectedD20===1;
  return {success,crit,fumble,selectedD20,effect};
}
export async function performSkillRoll(actor,key,{shift=0,flat=0,specialized=false,edge=false,snag=false,dc=null,itemName=null,damage=0,damageType="blunt",defense=null}={}){
  const info=getSkillInfo(actor,key);
  const skill=actor.system.skills[key];
  const specializedAllowed=specialized&&info.rank>0&&Boolean(skill?.specialization?.trim());
  const result=buildSkillFormula({rank:info.rank,shift,specialized:specializedAllowed,edge,snag,flat});
  const target=Number.isFinite(Number(dc))&&dc!==null&&dc!==""?Number(dc):null;
  let roll=null;let score=null;let success=null;let critical=false;let fumble=false;
  if(["fail","fumble","auto","critical"].includes(result.effect)){
    if(result.effect==="fail"||result.effect==="fumble") success=false;
    else success=true;
    critical=result.effect==="critical";fumble=result.effect==="fumble";
  }else{
    roll=await new Roll(result.formula).evaluate();score=roll.total;
    const a=assessRoll(roll,{dc:target,effect:result.effect});
    success=a.success;critical=a.crit;fumble=a.fumble;
  }
  const label=itemName||info.label;
  const color=critical?"#147a5b":fumble?"#a62e3f":success===false?"#9e5136":"#284c7a";
  const doubled=success&&target!==null&&target>0&&score!==null?Math.max(1,Math.floor(score/target)):success?1:0;
  const mult=damage>0?doubled:0;
  const content=`<article class="ess20-chat" style="--result:${color}"><header>${foundry.utils.escapeHTML(actor.name)} — ${foundry.utils.escapeHTML(label)}</header><div class="ess20-chat-number">${score??(success?"SUCESSO":"FALHA")}</div><p>Perícia ${foundry.utils.escapeHTML(info.label)} (${info.rank?`d${info.rank*2}`:"sem treinamento"}) · Deslocamento ${shift>=0?"+":""}${shift}${target!==null?` · DIF ${target}`:""}</p>${success!==null?`<strong>${success?"Sucesso":"Falha"}${critical?" · Crítico!":""}${fumble?" · Desastre!":""}</strong>`:""}${damage>0?`<p>Dano base ${damage} (${foundry.utils.escapeHTML(damageType)})${target!==null&&success?` · Dano sugerido ${damage*mult} (×${mult})`:""}</p>`:""}</article>`;
  if(roll) await roll.toMessage({speaker:ChatMessage.getSpeaker({actor}),flavor:content});
  else await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content});
  if(fumble&&actor.type==="ranger"&&game.settings.get(SYSTEM_ID,"enableFumbleStory")) await adjustStoryPool(1,{silent:true});
  return {roll,total:score,success,critical,fumble,multiplier:doubled};
}
export function findTeam(){return game.actors.find(a=>a.type==="team");}
export async function adjustStoryPool(delta,{silent=false}={}){
  const team=findTeam();if(!team){if(!silent)ui.notifications.warn("Crie um Ator do tipo Equipe para compartilhar os Pontos de História.");return false;}
  if(!team.isOwner){if(!silent)ui.notifications.warn("É necessário possuir permissão Proprietário na ficha de Equipe.");return false;}
  const val=Number(team.system.resources.story.value||0),next=Math.max(0,val+delta);
  if(next===val&&delta<0){ui.notifications.warn("A equipe não possui Pontos de História.");return false;}
  await team.update({"system.resources.story.value":next});return true;
}
