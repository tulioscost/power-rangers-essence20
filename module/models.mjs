import {ESSENCES,SKILLS} from "./config.mjs";
const f = foundry.data.fields;
const n = (initial=0,min=0,max=999) => new f.NumberField({required:true,initial,integer:true,min,max});
const s = (initial="") => new f.StringField({required:true,initial});
const b = (initial=false) => new f.BooleanField({required:true,initial});
function pool(value=0,max=0){return new f.SchemaField({value:n(value),max:n(max)});}
function skillFields(){const out={};for(const group of Object.values(SKILLS)) for(const key of Object.keys(group)) out[key]=new f.SchemaField({rank:n(0,0,key==="conditioning"?6:6),specialization:s()}); return out;}
function essenceFields(){return Object.fromEntries(Object.keys(ESSENCES).map(k=>[k,n(0,0,30)]));}
const modelSchema=()=>({
  identity:new f.SchemaField({alias:s(),role:s("red"),origin:s(),influences:s(),level:n(1,1,20),team:s(),background:s(),notes:s()}),
  essences:new f.SchemaField(essenceFields()),
  skills:new f.SchemaField(skillFields()),
  resources:new f.SchemaField({health:pool(2,2),power:pool(0,0),story:pool(0,99)}),
  morph:new f.SchemaField({active:b(false),suit:s("Padrão"),notes:s()}),
  movement:new f.SchemaField({ground:n(30),flying:n(0),swimming:n(0)}),
  attributes:new f.SchemaField({armor:n(0),toughnessBonus:n(0,-99,99),evasionBonus:n(0,-99,99),willpowerBonus:n(0,-99,99),clevernessBonus:n(0,-99,99),initiativeBonus:n(0,-99,99),size:s("medium"),conditions:s(),description:s()}),
  defenses:new f.SchemaField({toughness:n(10),evasion:n(10),willpower:n(10),cleverness:n(10)}),
  zord:new f.SchemaField({pilot:s(),combiner:b(false),crew:s(),linked:s(),megaTraits:s(),isDefeated:b(false)}),
});
export class RangerActorData extends foundry.abstract.TypeDataModel{
  static defineSchema(){return modelSchema();}
  prepareDerivedData(){
    super.prepareDerivedData();
    const a=this.parent;
    const armors=a?.items?.filter?.(i=>i.type==="armor"&&i.system.equipped&&(!i.system.morphedOnly||this.morph.active))??[];
    const defaultSuit=(a?.type==="ranger"&&this.morph.active)?1:0;
    const armorBonus=Math.max(defaultSuit, ...armors.map(i=>Number(i.system.armorBonus||0)),0);
    const e=this.essences;const x=this.attributes;
    this.defenses.toughness=10+e.strength+x.toughnessBonus+x.armor+armorBonus;
    this.defenses.evasion=10+e.speed+x.evasionBonus;
    this.defenses.willpower=10+e.smarts+x.willpowerBonus;
    this.defenses.cleverness=10+e.social+x.clevernessBonus;
  }
}
export class RangerItemData extends foundry.abstract.TypeDataModel{
  static defineSchema(){return {
    description:s(),quantity:n(1),equipped:b(false),morphedOnly:b(false),
    attackSkill:s("might"),defense:s("toughness"),damage:n(1),damageType:s("blunt"),
    bonusShift:n(0,-12,12),bonusFlat:n(0,-99,99),armorBonus:n(0),
    powerCost:n(0),range:s("Corpo a corpo"),
    charges:pool(0,0),consumable:b(false),usesSkill:b(false),
    requirement:s(),notes:s(),
  };}
}
