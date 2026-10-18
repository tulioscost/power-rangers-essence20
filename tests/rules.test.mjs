import test from "node:test";
import assert from "node:assert/strict";
import {buildSkillFormula,resolveLadder,assessRoll} from "../module/dice.mjs";
import {SKILLS,ESSENCES} from "../module/config.mjs";

test("21 skills spread across four essences",()=>{
  assert.equal(Object.keys(ESSENCES).length,4);
  assert.equal(Object.values(SKILLS).reduce((sum,s)=>sum+Object.keys(s).length,0),21);
});
test("normal skill ranks 1..6 climb d2..d12",()=>{
  for(let i=1;i<=6;i++)assert.equal(resolveLadder(i).value,2*i);
});
test("d20 plus skill die with default rank 3",()=>{
  assert.equal(buildSkillFormula({rank:3}).formula,"1d20 + 1d6");
});
test("untrained means snag on d20",()=>{
  assert.equal(buildSkillFormula({rank:0}).formula,"2d20kl");
});
test("edge cancels the untrained snag",()=>{
  assert.equal(buildSkillFormula({rank:0,edge:true}).formula,"1d20");
});
test("edge and snag cancel",()=>{
  assert.equal(buildSkillFormula({rank:4,edge:true,snag:true}).formula,"1d20 + 1d8");
});
test("specialization adds step dice and retains highest",()=>{
  assert.equal(buildSkillFormula({rank:4,specialized:true}).formula,"1d20 + {1d2,1d4,1d6,1d8}kh");
});
test("above d12: extended stair",()=>{
  assert.equal(buildSkillFormula({rank:6,shift:1}).formula,"1d20 + 2d8");
  assert.equal(buildSkillFormula({rank:6,shift:2}).formula,"1d20 + 3d6");
  assert.equal(buildSkillFormula({rank:6,shift:3}).effect,"auto");
});
test("at or below base step",()=>{
  assert.equal(buildSkillFormula({rank:1,shift:-1}).formula,"1d20");
  assert.equal(buildSkillFormula({rank:1,shift:-2}).effect,"fail");
  assert.equal(buildSkillFormula({rank:1,shift:-3}).effect,"fumble");
});
test("fumble by failing on natural one",()=>{
  const roll={total:4,formula:"2d20kl",dice:[{faces:20,results:[{result:1,active:true},{result:19,active:false}]}]};
  const r=assessRoll(roll,{dc:10});assert.equal(r.success,false);assert.equal(r.fumble,true);
});
test("critical when max of skill die and test succeeds",()=>{
  const roll={total:17,formula:"1d20 + 1d8",dice:[{faces:20,results:[{result:9,active:true}]},{faces:8,results:[{result:8,active:true}]}]};
  const r=assessRoll(roll,{dc:15});assert.equal(r.success,true);assert.equal(r.crit,true);
});
