/* empty css                  *//* empty css                   *//* empty css                  */import{_ as N}from"./PlayerCard-C-1FJV-s.js";/* empty css                  *//* empty css               *//* empty css                  */import{a as I,r as p,A as ae,c as v,g as l,e as a,w as t,t as n,i as ne,v as re,p as de,B as ce,C as ue,o as u,F as S,f as R,h as P,d as V,n as z,j as pe,u as ie,s as A,x as _e,D as me,G as ve,H as fe,I as he}from"./index-Bs2KS5_D.js";import{c as ye}from"./utils-BJkYNDuZ.js";import{C as F}from"./CustomTable-COAMCJRA.js";import{_ as ge}from"./_plugin-vue_export-helper-DlAUqK2U.js";/* empty css                        */const be={class:"second-round"},Se={class:"nextBt"},Re={class:"body"},we={class:"player-form"},Ce={class:"score"},Ie={key:0,class:"total-score"},Pe={class:"pool"},Ve={class:"player-pool"},Ge={class:"pp-table"},ke={class:"pool-cell"},xe={class:"player-name"},Be={class:"pool-cell"},Ee={class:"player-name"},Le={class:"pool-cell"},De={class:"player-name"},Me={class:"pool-cell"},Ue={class:"player-name"},$e={class:"bgm-pool"},Ne={class:"bp-table"},ze={class:"pool-cell"},Ae={class:"bgm-name"},Fe={class:"pool-cell"},He={class:"bgm-name"},Te={class:"pool-cell"},We={class:"bgm-name"},je={class:"player-select-list"},Oe={class:"player-select-item"},qe={class:"player-name"},Je={class:"player-select-list"},Ke={class:"player-select-item"},Qe={class:"player-name"},Xe={__name:"SecondRoundView",setup(Ye){const H=pe(),_=ie(),G=I(()=>_.getters["group/getBgm2"]),k=I(()=>_.getters["group/compGroup"]);console.log(k);const w=p([]);for(let s=0;s<4;s++)w.value.push(k.value.filter(o=>o.isFirstWinner&&o.firstRoundGroup%4===s).sort((o,c)=>o.firstRoundGroup-c.firstRoundGroup));const x=p([]);x.value=ye(G.value,3);const C=p(""),T=s=>{C.value=s},r=p(null),d=p(null),W=(s,o)=>{var c;(c=_.getters["group/compGroup"].find(f=>f.playerId===s))!=null&&c.secondRoundScore,_.dispatch("group/updatePlayerSecondRoundScore",{playerId:s,score:o})},j=(s,o)=>{var c;(c=_.getters["group/compGroup"].find(f=>f.playerId===s))!=null&&c.secondRoundScore,_.dispatch("group/updatePlayerSecondRoundScore",{playerId:s,score:o})},O=()=>{r.value=null},q=()=>{d.value=null},J=()=>{H.push("/SecondRound/SecondRoundWinnerListView")},g=p(!1),b=p(!1);function K(){g.value=!0}function Q(){b.value=!0}function B(){g.value=!1}function E(){b.value=!1}function X(s){var o;if(s.playerId===((o=d.value)==null?void 0:o.playerId)){A({message:"请选择不同的对手",type:"warning"});return}s.secondRoundScore||(s.secondRoundScore=0),r.value=s,B()}function Y(s){var o;if(s.playerId===((o=r.value)==null?void 0:o.playerId)){A({message:"请选择不同的对手",type:"warning"});return}s.secondRoundScore||(s.secondRoundScore=0),d.value=s,E()}const m=p(0);ae(m,()=>{r.value=null,d.value=null});const L=I(()=>w.value.map(s=>s[[m.value]])),Z=[{prop:"fist_group",label:"第一组"},{prop:"second_group",label:"第二组"},{prop:"third_group",label:"第三组"},{prop:"forth_group",label:"第四组"}],ee=[{prop:"column1",label:""},{prop:"column2",label:""},{prop:"column3",label:""}];return(s,o)=>{const c=_e,f=re,D=de,oe=me,le=ve,se=ce,M=fe,U=he,$=ue;return u(),v("div",be,[l("div",Se,[a(f,{modelValue:m.value,"onUpdate:modelValue":o[0]||(o[0]=e=>m.value=e),placeholder:"请选择当前组别"},{default:t(()=>[(u(),v(S,null,R(4,e=>a(c,{key:e,label:`第${e}组`,value:e-1},null,8,["label","value"])),64))]),_:1},8,["modelValue"]),o[6]||(o[6]=l("div",{style:{width:"10px"}},null,-1)),a(D,{onClick:J},{default:t(()=>o[5]||(o[5]=[P("结束小组循环")])),_:1})]),l("div",Re,[o[10]||(o[10]=l("div",{class:"title fire-text"},"十六强对决",-1)),a(se,{placement:"bottom-start",onCommand:T,style:{border:"0"}},{dropdown:t(()=>[a(le,null,{default:t(()=>[(u(!0),v(S,null,R(G.value,(e,i)=>(u(),V(oe,{key:i,command:e},{default:t(()=>[P(n(e),1)]),_:2},1032,["command"]))),128))]),_:1})]),default:t(()=>[a(D,{class:"bgm",style:{border:"0"}},{default:t(()=>[P(n(C.value?"BGM: "+C.value:"请选择BGM"),1)]),_:1})]),_:1}),l("div",we,[a(N,{player:r.value,"onUpdate:player":o[1]||(o[1]=e=>r.value=e),"allow-player-change":!0,"max-score":3,"fetch-score":e=>e.secondRoundScore||0,onScoreChange:W,onSelectPlayer:K,onResetPlayer:O},null,8,["player","fetch-score"]),l("div",Ce,[o[7]||(o[7]=l("div",{class:"score-txt"},"VS",-1)),r.value&&d.value?(u(),v("div",Ie,n(r.value.secondRoundScore||0)+" : "+n(d.value.secondRoundScore||0),1)):ne("",!0)]),a(N,{player:d.value,"onUpdate:player":o[2]||(o[2]=e=>d.value=e),"allow-player-change":!0,"max-score":3,"fetch-score":e=>e.secondRoundScore||0,onScoreChange:j,onSelectPlayer:Q,onResetPlayer:q},null,8,["player","fetch-score"])]),l("div",Pe,[l("div",Ve,[o[8]||(o[8]=l("div",{class:"pp-title"},"选手池",-1)),l("div",Ge,[a(F,{data:w.value,columns:Z,"show-header":!0},{fist_group:t(({row:e})=>[l("div",ke,[l("span",xe,n(e[0].name),1)])]),second_group:t(({row:e})=>[l("div",Be,[l("span",Ee,n(e[1].name),1)])]),third_group:t(({row:e})=>[l("div",Le,[l("span",De,n(e[2].name),1)])]),forth_group:t(({row:e})=>[l("div",Me,[l("span",Ue,n(e[3].name),1)])]),_:1},8,["data"])])]),l("div",$e,[o[9]||(o[9]=l("div",{class:"bp-title"},"BGM池",-1)),l("div",Ne,[a(F,{data:x.value,columns:ee,"show-header":!1},{column1:t(({row:e})=>[l("div",ze,[l("span",Ae,n(e[0]),1)])]),column2:t(({row:e})=>[l("div",Fe,[l("span",He,n(e[1]),1)])]),column3:t(({row:e})=>[l("div",Te,[l("span",We,n(e[2]),1)])]),_:1},8,["data"])])])])]),a($,{modelValue:g.value,"onUpdate:modelValue":o[3]||(o[3]=e=>g.value=e),title:`选择第${m.value+1}组选手`,onClose:B,width:"30%"},{default:t(()=>[l("div",je,[(u(!0),v(S,null,R(L.value,e=>{var i,h;return u(),V(U,{key:e.playerId,class:z({"disabled-card":e.playerId===((i=d.value)==null?void 0:i.playerId)}),shadow:e.playerId===((h=d.value)==null?void 0:h.playerId)?"never":"hover",onClick:te=>{var y;return e.playerId!==((y=d.value)==null?void 0:y.playerId)&&X(e)}},{default:t(()=>[l("div",Oe,[a(M,{size:50,src:e.avatar},null,8,["src"]),l("span",qe,n(e.name),1)])]),_:2},1032,["class","shadow","onClick"])}),128))])]),_:1},8,["modelValue","title"]),a($,{modelValue:b.value,"onUpdate:modelValue":o[4]||(o[4]=e=>b.value=e),title:`选择第${m.value+1}组选手`,onClose:E,width:"30%"},{default:t(()=>[l("div",Je,[(u(!0),v(S,null,R(L.value,e=>{var i,h;return u(),V(U,{key:e.playerId,class:z({"disabled-card":e.playerId===((i=r.value)==null?void 0:i.playerId)}),shadow:e.playerId===((h=r.value)==null?void 0:h.playerId)?"never":"hover",onClick:te=>{var y;return e.playerId!==((y=r.value)==null?void 0:y.playerId)&&Y(e)}},{default:t(()=>[l("div",Ke,[a(M,{size:50,src:e.avatar},null,8,["src"]),l("span",Qe,n(e.name),1)])]),_:2},1032,["class","shadow","onClick"])}),128))])]),_:1},8,["modelValue","title"])])}}},io=ge(Xe,[["__scopeId","data-v-983e79c6"]]);export{io as default};