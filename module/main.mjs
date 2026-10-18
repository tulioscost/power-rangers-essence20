import {SYSTEM_ID,ACTOR_TYPES,ITEM_TYPES} from "./config.mjs";
import {RangerActorData,RangerItemData} from "./models.mjs";
import {RangersActor,RangersItem,createMegaformFromSelected} from "./documents.mjs";
import {RangersActorSheet,RangersItemSheet} from "./sheets.mjs";
import {performSkillRoll,adjustStoryPool,buildSkillFormula} from "./dice.mjs";

async function createStarterContent(){
  if(!game.user.isGM){ui.notifications.error("Somente o Mestre pode gerar os exemplos.");return;}
  const folder=game.folders.find(f=>f.type==="Item"&&f.name==="Rangers • Catálogo Inicial")||await Folder.create({name:"Rangers • Catálogo Inicial",type:"Item",sorting:"a"});
  const createItem=async(data)=>{
    if(game.items.some(i=>i.folder?.id===folder.id&&i.name===data.name))return;
    await Item.create({...data,folder:folder.id});
  };
  for(const entry of [
    {name:"Armadura Mighty Morphin",type:"armor",system:{armorBonus:1,morphedOnly:true,description:"Proteção padrão do traje; amplia Resistência quando transformado."}},
    {name:"Armadura Zeo",type:"armor",system:{armorBonus:2,morphedOnly:true,description:"Proteção do traje, ativada na forma morfada."}},
    {name:"Armadura Turbo",type:"armor",system:{armorBonus:2,morphedOnly:true,description:"Proteção do traje, ativada na forma morfada."}},
    {name:"Armadura In Space",type:"armor",system:{armorBonus:2,morphedOnly:true,description:"Proteção do traje, ativada na forma morfada."}},
    {name:"Armadura Metálica",type:"armor",system:{armorBonus:3,morphedOnly:true,description:"Proteção reforçada; exigências adicionais ficam a critério do Mestre."}},
    {name:"Lâmina de Treino",type:"weapon",system:{attackSkill:"finesse",defense:"evasion",damage:1,damageType:"sharp",usesSkill:true,description:"Arma de treino genérica criada para demonstrar rolagens."}},
    {name:"Blaster de Treino",type:"weapon",system:{attackSkill:"targeting",defense:"evasion",damage:1,damageType:"energy",range:"30 / 60 pés",usesSkill:true,description:"Arma de demonstração sem associação oficial a equipamentos específicos."}},
    {name:"Kit de Primeiros Socorros",type:"gear",system:{consumable:true,usesSkill:false,charges:{value:3,max:3},description:"Item de demonstração: Mestre arbitra o efeito de cura."}},
    ...["Preto","Azul","Verde","Rosa","Vermelho","Amarelo","Branco"].map(name=>({name:`Papel Ranger ${name}`,type:"role",system:{description:"Registre aqui as características e progressão do papel, consultando o livro-base."}})),
    ...["Atleta","Estudioso","Curioso","Rebelde"].map(name=>({name:`Origem: ${name}`,type:"origin",system:{description:"Anote os benefícios mecânicos aplicáveis conforme a origem escolhida no livro-base."}}))
  ])await createItem(entry);
  if(!game.actors.some(a=>a.type==="team")){
    const team=await Actor.create({name:"Equipe Ranger • Pontos de História",type:"team",ownership:{default:CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER}});
    await team.update({"system.resources.story.value":Math.max(1,game.users.filter(u=>!u.isGM&&u.active).length)});
  }
  ui.notifications.info("Catálogo de exemplo criado. Abra Itens > Rangers • Catálogo Inicial.");
}

Hooks.once("init",()=>{
  CONFIG.Actor.documentClass=RangersActor;
  CONFIG.Item.documentClass=RangersItem;
  for(const t of Object.keys(ACTOR_TYPES))CONFIG.Actor.dataModels[t]=RangerActorData;
  for(const t of Object.keys(ITEM_TYPES))CONFIG.Item.dataModels[t]=RangerItemData;
  CONFIG.Actor.trackableAttributes=Object.fromEntries(Object.keys(ACTOR_TYPES).map(t=>[t,{bar:["resources.health","resources.power"],value:[]}]));
  const register=foundry.applications.apps.DocumentSheetConfig.registerSheet;
  register(foundry.documents.Actor,SYSTEM_ID,RangersActorSheet,{makeDefault:true,label:"Ficha Ranger · Essence20",types:Object.keys(ACTOR_TYPES)});
  register(foundry.documents.Item,SYSTEM_ID,RangersItemSheet,{makeDefault:true,label:"Item Ranger · Essence20",types:Object.keys(ITEM_TYPES)});
  game.settings.register(SYSTEM_ID,"enableFumbleStory",{name:"Críticos/falhas com história",scope:"world",config:true,type:Boolean,default:true});
  game.settings.register(SYSTEM_ID,"autoDamageGM",{name:"Aplicar dano automaticamente a alvos próprios (Mestre)",hint:"Quando ativado, o ataque acertado com arma aplica o dano sugerido ao token-alvo que você pode editar. Padrão desligado.",scope:"world",config:true,type:Boolean,default:false});
  game.system.api={performSkillRoll,adjustStoryPool,createMegaformFromSelected,createStarterContent,buildSkillFormula};
  console.info("Rangers Essence20 | sistema carregado: V14");
});

// Condicionamento dá +1 Saúde máxima por nível. Ajuste apenas a diferença na perícia.
Hooks.on("preUpdateActor",(actor,changes)=>{
  if(!["ranger","npc"].includes(actor.type))return;
  const rank=foundry.utils.getProperty(changes,"system.skills.conditioning.rank");
  if(rank===undefined)return;
  const old=Number(actor.system.skills.conditioning.rank||0);
  const delta=Math.trunc(Number(rank))-old;
  if(!delta)return;
  const hp=actor.system.resources.health;
  const requestedMax=foundry.utils.getProperty(changes,"system.resources.health.max");
  const requestedValue=foundry.utils.getProperty(changes,"system.resources.health.value");
  foundry.utils.setProperty(changes,"system.resources.health.max",Math.max(0,Number(requestedMax??hp.max)+delta));
  foundry.utils.setProperty(changes,"system.resources.health.value",Math.max(0,Number(requestedValue??hp.value)+delta));
});

Hooks.once("ready",async()=>{
  if(game.user.isGM&&!game.macros.some(m=>m.name==="Rangers • Gerar catálogo inicial")){
    await Macro.create({name:"Rangers • Gerar catálogo inicial",type:"script",command:"await game.system.api.createStarterContent();",img:"icons/skills/trades/academics-study-reading-book.webp"});
  }
});
