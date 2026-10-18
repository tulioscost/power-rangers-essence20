import {SKILLS,SYSTEM_ID} from "./config.mjs";
import {performSkillRoll,adjustStoryPool} from "./dice.mjs";
export class RangersActor extends Actor {
  async rollSkill(key,options={}){return performSkillRoll(this,key,options);}
  async rollItem(item,options={}){
    if(typeof item==="string")item=this.items.get(item);
    if(!item)return ui.notifications.warn("Item não encontrado.");
    if(item.system.morphedOnly&&!this.system.morph.active) return ui.notifications.warn("É necessário estar transformado para utilizar este item.");
    if(item.system.usesSkill||["weapon","gridpower"].includes(item.type)){
      const cost=item.system.powerCost;
      if(cost>this.system.resources.power.value)return ui.notifications.warn("Poder pessoal insuficiente.");
      const selectedTarget=[...(game.user.targets??[])].find(t=>t.actor)?.actor??null;
      const difficulty=(options.dc===null||options.dc===undefined||options.dc==="")?selectedTarget?.system?.defenses?.[item.system.defense]??null:options.dc;
      const result=await this.rollSkill(item.system.attackSkill,{
        ...options,dc:difficulty,shift:Number(options.shift||0)+Number(item.system.bonusShift||0),
        flat:Number(options.flat||0)+Number(item.system.bonusFlat||0),
        itemName:selectedTarget?`${item.name} → ${selectedTarget.name}`:item.name,damage:item.system.damage,damageType:item.system.damageType,defense:item.system.defense
      });
      if(selectedTarget&&result?.success&&selectedTarget.isOwner&&game.settings.get(SYSTEM_ID,"autoDamageGM")&&Number(item.system.damage)>0)
        await selectedTarget.applyDamage(Number(item.system.damage)*result.multiplier);
      if(cost>0&&result)await this.update({"system.resources.power.value":Math.max(0,this.system.resources.power.value-cost)});
      if(item.system.consumable)await this.consumeItem(item);
      return result;
    }
    if(item.system.consumable)return this.consumeItem(item);
    return item.sheet?.render({force:true});
  }
  async consumeItem(item){
    if(!item)return;
    if(item.system.charges.max>0){
      if(item.system.charges.value<1)return ui.notifications.warn("Item sem cargas.");
      await item.update({"system.charges.value":item.system.charges.value-1});
    }else if(item.system.quantity>1)await item.update({"system.quantity":item.system.quantity-1});
    else await item.delete();
    ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this}),content:`<p><b>${foundry.utils.escapeHTML(this.name)}</b> utiliza ${foundry.utils.escapeHTML(item.name)}.</p>`});
  }
  async applyDamage(amount,{healing=false}={}){
    const num=Math.max(0,Math.floor(Number(amount)||0));
    if(this.type==="megaform"&&!healing){
      const ids=this.system.zord.linked.split(",").filter(Boolean);
      const sources=ids.map(id=>game.actors.get(id)).filter(z=>z&&z.system.resources.health.value>0);
      if(sources.length){
        const hit=Math.max(1,Math.ceil(num/sources.length));
        for(const z of sources)await z.applyDamage(hit);
        const living=ids.map(id=>game.actors.get(id)).filter(Boolean);
        const total=living.reduce((n,a)=>n+a.system.resources.health.value,0);
        const max=living.reduce((n,a)=>n+a.system.resources.health.max,0);
        await this.update({"system.resources.health.value":total,"system.resources.health.max":max,
          "system.zord.isDefeated":living.filter(a=>a.system.resources.health.value===0).length>living.length/2});
        if(living.filter(a=>a.system.resources.health.value===0).length>living.length/2)
          ui.notifications.warn("Mais da metade dos Zords da Megaforma foi derrotada. A combinação se desfaz.");
        return;
      }
    }
    const hp=this.system.resources.health;
    await this.update({"system.resources.health.value":healing?Math.min(hp.max,hp.value+num):Math.max(0,hp.value-num)});
  }
  async rest(){
    await this.update({"system.resources.health.value":this.system.resources.health.max});
    ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this}),content:"<p>Descanso de 6 horas: Saúde recuperada. Ajuste eventuais pontos de Essência conforme a situação.</p>"});
  }
  async toggleMorph(){
    if(this.type!=="ranger")return;
    const active=!this.system.morph.active;
    await this.update({"system.morph.active":active});
    await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this}),content:`<article class="ess20-chat"><header>${foundry.utils.escapeHTML(this.name)}</header><strong>${active?"É HORA DE MORFAR!":"Transformação desfeita."}</strong></article>`});
  }
  async unmorphSurvive(){
    if(this.type!=="ranger"||!this.system.morph.active||this.system.resources.health.value>0)return;
    await this.update({"system.morph.active":false,"system.resources.health.value":1,"system.attributes.conditions":"Inconsciente"});
  }
  async spendStory(){return adjustStoryPool(-1);}
}
export class RangersItem extends Item{}
export async function createMegaformFromSelected(){
  if(!game.user.isGM)return ui.notifications.warn("Somente o Mestre pode criar Megaformas.");
  const selected=[...new Map((canvas.tokens.controlled??[]).filter(t=>t.actor?.type==="zord").map(t=>[t.actor.id,t.actor])).values()];
  if(selected.length<2)return ui.notifications.warn("Selecione pelo menos dois tokens Zord na cena.");
  const total=(field)=>selected.reduce((sum,a)=>sum+Number(field(a)),0);
  const max=t=>Math.max(...selected.map(a=>Number(t(a))));
  const min=t=>Math.min(...selected.map(a=>Number(t(a))));
  const leader=selected[0];
  const health=total(a=>a.system.resources.health.value),healthMax=total(a=>a.system.resources.health.max);
  const attrs={strength:max(a=>a.system.essences.strength),speed:max(a=>a.system.essences.speed),smarts:leader.system.essences.smarts,social:leader.system.essences.social};
  const actor=await Actor.create({name:`Megaforma (${selected.map(a=>a.name).join(" + ")})`,type:"megaform",system:{
    essences:attrs,resources:{health:{value:health,max:healthMax}},movement:{ground:min(a=>a.system.movement.ground)},
    zord:{linked:selected.map(a=>a.id).join(","),combiner:true,crew:selected.map(a=>a.system.zord.pilot).filter(Boolean).join(", ")},
    identity:{role:leader.system.identity.role},attributes:{size:"colossal"}
  }});
  await actor.sheet.render({force:true});
  ui.notifications.info("Megaforma criada. Revise os bônus de combinação e as habilidades escolhidas pelo grupo.");
  return actor;
}
