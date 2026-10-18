import {SYSTEM_ID,ESSENCES,SKILLS,DEFENSES,ROLES,COLOR_HEX,ITEM_TYPES,ACTOR_TYPES,TYPICAL_DCS,RANK_DICE,DAMAGE_TYPES} from "./config.mjs";
import {adjustStoryPool} from "./dice.mjs";
import {createMegaformFromSelected} from "./documents.mjs";
const app=foundry.applications;
const SHEET_BASE={classes:["rangers","ess20-sheet"],position:{width:910,height:800},window:{resizable:true},form:{submitOnChange:true,closeOnSubmit:false}};
const aAction = (event,button)=>button?.dataset??event?.currentTarget?.dataset??{};
export class RangersActorSheet extends app.api.HandlebarsApplicationMixin(app.sheets.ActorSheetV2){
  static DEFAULT_OPTIONS={...SHEET_BASE,classes:[...SHEET_BASE.classes,"ranger-actor-sheet"],actions:{
    portrait:async function(){const picker=new foundry.applications.apps.FilePicker({type:"image",current:this.actor.img,callback:(path)=>this.actor.update({img:path})});picker.render({force:true});},
    rollSkill:async function(e,btn){const d=aAction(e,btn);const root=this.element;const controls={dc:root.querySelector('[data-control="dc"]')?.value||"",shift:root.querySelector('[data-control="shift"]')?.value||0,flat:root.querySelector('[data-control="flat"]')?.value||0,edge:root.querySelector('[data-control="edge"]')?.checked||false,snag:root.querySelector('[data-control="snag"]')?.checked||false,specialized:root.querySelector(`[data-specialized="${d.skill}"]`)?.checked||false};await this.actor.rollSkill(d.skill,{dc:controls.dc===""?null:Number(controls.dc),shift:Number(controls.shift),flat:Number(controls.flat),edge:controls.edge,snag:controls.snag,specialized:controls.specialized});},
    initiative:async function(){const result=await this.actor.rollSkill("initiative");if(game.combat){const c=game.combat.combatants.find(c=>c.actor?.id===this.actor.id);if(c&&result.total!==null)await game.combat.setInitiative(c.id,result.total+this.actor.system.attributes.initiativeBonus);}},
    toggleMorph:async function(){await this.actor.toggleMorph();},
    unmorphSurvive:async function(){await this.actor.unmorphSurvive();},
    rest:async function(){await this.actor.rest();},
    damage:async function(e,btn){await this.actor.applyDamage(Number(aAction(e,btn).amount??1));},
    heal:async function(e,btn){await this.actor.applyDamage(Number(aAction(e,btn).amount??1),{healing:true});},
    newItem:async function(e,btn){const type=aAction(e,btn).type||"gear";await this.actor.createEmbeddedDocuments("Item",[{name:`Novo ${ITEM_TYPES[type]||"Item"}`,type}]);},
    openItem:async function(e,btn){this.actor.items.get(aAction(e,btn).id)?.sheet.render({force:true});},
    rollItem:async function(e,btn){const root=this.element;await this.actor.rollItem(aAction(e,btn).id,{dc:root.querySelector('[data-control="dc"]')?.value?Number(root.querySelector('[data-control="dc"]').value):null,shift:Number(root.querySelector('[data-control="shift"]')?.value||0),flat:Number(root.querySelector('[data-control="flat"]')?.value||0),edge:root.querySelector('[data-control="edge"]')?.checked||false,snag:root.querySelector('[data-control="snag"]')?.checked||false,specialized:true});},
    equipItem:async function(e,btn){const i=this.actor.items.get(aAction(e,btn).id);if(i)await i.update({"system.equipped":!i.system.equipped});},
    consumeItem:async function(e,btn){await this.actor.consumeItem(this.actor.items.get(aAction(e,btn).id));},
    deleteItem:async function(e,btn){const item=this.actor.items.get(aAction(e,btn).id);if(item&&await foundry.applications.api.DialogV2.confirm({window:{title:"Excluir item"},content:`Excluir ${foundry.utils.escapeHTML(item.name)}?`}))await item.delete();},
    tab:async function(e,btn){this.activeTab=aAction(e,btn).tab||"stats";this.render();},
    storyPlus:async function(){if(this.actor.type==="team")await this.actor.update({"system.resources.story.value":this.actor.system.resources.story.value+1});else await adjustStoryPool(1);},
    storyMinus:async function(){if(this.actor.type==="team")await this.actor.update({"system.resources.story.value":Math.max(0,this.actor.system.resources.story.value-1)});else await adjustStoryPool(-1);},
    createMegaform:async function(){await createMegaformFromSelected();},
    newZord:async function(){if(!game.user.isGM)return ui.notifications.warn("Solicite ao Mestre a criação de Zords.");const z=await Actor.create({name:`Zord de ${this.actor.name}`,type:"zord",system:{resources:{health:{value:6,max:6}},essences:{strength:6,speed:4},movement:{ground:40},attributes:{armor:1,size:"huge"},zord:{pilot:this.actor.id,combiner:true},identity:{role:this.actor.system.identity.role}}});await z.sheet.render({force:true});},
  }};
  static PARTS={body:{template:`systems/${SYSTEM_ID}/templates/actor.hbs`}};
  activeTab="stats";
  async _prepareContext(options){
    const context=await super._prepareContext(options);const system=this.actor.system;
    const groups=Object.entries(SKILLS).map(([key,skills])=>({key,name:ESSENCES[key],entries:Object.entries(skills).map(([id,name])=>({key:id,name,rank:system.skills[id]?.rank??0,rollable:id!=="conditioning",die:id==="conditioning"?`${system.skills[id]?.rank??0} PV`:RANK_DICE[system.skills[id]?.rank??0]||"d12",specialization:system.skills[id]?.specialization||""}))}));
    const defense=[{key:"toughness",name:DEFENSES.toughness,value:system.defenses.toughness},{key:"evasion",name:DEFENSES.evasion,value:system.defenses.evasion},{key:"willpower",name:DEFENSES.willpower,value:system.defenses.willpower},{key:"cleverness",name:DEFENSES.cleverness,value:system.defenses.cleverness}];
    return {...context,actor:this.actor,system,essences:Object.entries(ESSENCES).map(([key,name])=>({key,name,value:system.essences[key]})),defense,skills:groups,
      roles:Object.entries(ROLES).map(([value,label])=>({value,label,selected:system.identity.role===value})),
      items:Object.entries(ITEM_TYPES).map(([type,label])=>({type,label,items:this.actor.items.filter(i=>i.type===type).map(i=>({id:i.id,name:i.name,equipped:i.system.equipped,charges:i.system.charges.value,quantity:i.system.quantity,canEquip:["weapon","armor","gear"].includes(i.type),canUse:["weapon","gridpower","gear"].includes(i.type),canConsume:i.system.consumable,damage:i.system.damage,armor:i.system.armorBonus}))})),
      hasStory:this.actor.type==="team",isRanger:this.actor.type==="ranger",isZord:["zord","megaform"].includes(this.actor.type),isMega:this.actor.type==="megaform",isNpc:this.actor.type==="npc",isTeam:this.actor.type==="team",roleColor:COLOR_HEX[system.identity.role]||"#c33443",actorType:ACTOR_TYPES[this.actor.type]||this.actor.type,
      tabStats:this.activeTab==="stats",tabItems:this.activeTab==="items",tabBackground:this.activeTab==="background",tabZord:this.activeTab==="zord",tabs:[{id:"stats",name:"Atributos e testes"},{id:"items",name:"Itens e poderes"},{id:"background",name:"Identidade e história"},{id:"zord",name:"Zord / Combate"}].map(t=>({...t,active:this.activeTab===t.id})),activeTab:this.activeTab,dcs:TYPICAL_DCS};
  }
}
export class RangersItemSheet extends app.api.HandlebarsApplicationMixin(app.sheets.ItemSheetV2){
  static DEFAULT_OPTIONS={...SHEET_BASE,classes:[...SHEET_BASE.classes,"ranger-item-sheet"],position:{width:650,height:670},actions:{
    portrait:async function(){const picker=new foundry.applications.apps.FilePicker({type:"image",current:this.item.img,callback:(path)=>this.item.update({img:path})});picker.render({force:true});},
    roll:async function(){if(this.item.parent?.type&&this.item.parent.rollItem)await this.item.parent.rollItem(this.item,{specialized:true});else ui.notifications.warn("Coloque o item em uma ficha para poder rolar.");}
  }};
  static PARTS={body:{template:`systems/${SYSTEM_ID}/templates/item.hbs`}};
  async _prepareContext(options){const c=await super._prepareContext(options);return {...c,item:this.item,system:this.item.system,skills:Object.entries(SKILLS).flatMap(([essence,group])=>Object.entries(group).map(([value,label])=>({value,label,essence,selected:this.item.system.attackSkill===value}))),defenses:Object.entries(DEFENSES).map(([value,label])=>({value,label,selected:this.item.system.defense===value})),damages:Object.entries(DAMAGE_TYPES).map(([value,label])=>({value,label,selected:this.item.system.damageType===value})),typeLabel:ITEM_TYPES[this.item.type],isWeapon:this.item.type==="weapon",isArmor:this.item.type==="armor"};}
}
