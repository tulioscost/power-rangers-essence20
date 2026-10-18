import test from "node:test";
import assert from "node:assert/strict";
class Field{constructor(options={}){this.options=options;}}
class Model{prepareDerivedData(){}}
globalThis.foundry={data:{fields:{NumberField:Field,StringField:Field,BooleanField:Field,SchemaField:Field}},abstract:{TypeDataModel:Model}};
const {RangerActorData,RangerItemData}=await import("../module/models.mjs");
test("schema actor defines resources, all skills and defense",()=>{
  const s=RangerActorData.defineSchema();
  for(const k of ["identity","essences","skills","resources","morph","movement","attributes","defenses","zord"])assert.ok(s[k]);
  assert.equal(Object.keys(s.skills.options).length,21);
});
test("schema item supports combat actions, equipment and consumables",()=>{
  const s=RangerItemData.defineSchema();
  for(const k of ["attackSkill","defense","damage","armorBonus","equipped","powerCost","charges","consumable"])assert.ok(s[k]);
});
test("morphed ranger starts with nonstacking +1 protection",()=>{
  const a=new RangerActorData();
  a.parent={type:"ranger",items:{filter:()=>[]}};
  a.morph={active:true};a.essences={strength:4,speed:3,smarts:3,social:2};
  a.attributes={armor:0,toughnessBonus:0,evasionBonus:0,willpowerBonus:0,clevernessBonus:0};
  a.defenses={};a.prepareDerivedData();
  assert.deepEqual(a.defenses,{toughness:15,evasion:13,willpower:13,cleverness:12});
});
test("highest equipped armor replaces base, not stacks",()=>{
  const a=new RangerActorData();
  a.parent={type:"ranger",items:{filter:(fn)=>[{type:"armor",system:{equipped:true,morphedOnly:true,armorBonus:3}},{type:"armor",system:{equipped:true,morphedOnly:true,armorBonus:1}}].filter(fn)}};
  a.morph={active:true};a.essences={strength:3,speed:3,smarts:3,social:3};
  a.attributes={armor:0,toughnessBonus:0,evasionBonus:0,willpowerBonus:0,clevernessBonus:0};a.defenses={};a.prepareDerivedData();
  assert.equal(a.defenses.toughness,16);
  a.morph.active=false;a.prepareDerivedData();assert.equal(a.defenses.toughness,13);
});
