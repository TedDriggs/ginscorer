(this.webpackJsonpginscorer=this.webpackJsonpginscorer||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,n){},,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(6),s=n(1),r=n.n(s),c=n(3),i=n(11),l=n(7);n(30);const o=e=>{const[t,n]=u(e),[a,s]=u(e,1,[n]),[r]=u(e,2,[n,s]);return[t,a,r]},d=e=>Boolean(e.finalResult),u=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const a={[p.One]:-1*t,[p.Two]:-1*t},s={[p.One]:0,[p.Two]:0},r=[],c=[];n.reverse();let i=n.pop();for(const[l,o]of e.entries()){if("number"===typeof i&&l>=i+1&&(a[p.One]=Math.max(-1*n.length,a[p.One]),a[p.Two]=Math.max(-1*n.length,a[p.Two]),i=n.pop()),a[o.winner]+=1,a[o.winner]<=0)continue;s[o.winner]+=o.points;const e=s[o.winner];if(r.push({...o,runningTotal:e}),e>=100){c.push({player:o.winner,points:100,label:"Going out"}),O.forEach((e=>{a[e]>0&&c.push({player:e,points:10*a[e],label:"Wins"})})),O.forEach((e=>{const t=r.filter(h(e)).reduce(((e,t)=>e+j(t.gin)),0);t&&c.push({player:e,points:t,label:"Gins"})})),a[p.Two]<=0&&c.push({player:p.One,points:e+c.filter((e=>e.player===p.One)).reduce(((e,t)=>{let{points:n}=t;return e+n}),0),label:"Blitz"}),a[p.One]<=0&&c.push({player:p.Two,points:e+c.filter((e=>e.player===p.Two)).reduce(((e,t)=>{let{points:n}=t;return e+n}),0),label:"Blitz"}),s[p.One]+=c.filter((e=>e.player===p.One)).reduce(((e,t)=>{let{points:n}=t;return e+n}),0),s[p.Two]+=c.filter((e=>e.player===p.Two)).reduce(((e,t)=>{let{points:n}=t;return e+n}),0);const t={winner:m(s),points:Math.abs(s[p.One]-s[p.Two])};return[{bonuses:c,finalResult:t,games:r},l]}}return[{bonuses:c,currentScores:s,games:r},void 0]},m=e=>e[p.One]>e[p.Two]?p.One:p.Two,j=e=>{switch(e){case x.None:return 0;case x.Normal:return 25;case x.Super:return 50}},h=e=>t=>t.winner===e,b=(e,t)=>{const n={[p.One]:0,[p.Two]:0};e.forEach((e=>n[e.finalResult.winner]+=e.finalResult.points));const a=m(n),s=t.every(h(a));return{winner:a,isHollywood:s,points:s?2*n[a]:n[a]-n[w(a)]}};let p;!function(e){e[e.One=1]="One",e[e.Two=2]="Two"}(p||(p={}));const O=[p.One,p.Two],v=(e,t)=>t===p.One?e.player1Name:e.player2Name,w=e=>e===p.One?p.Two:p.One;let x;!function(e){e.None="none",e.Normal="normal",e.Super="super"}(x||(x={}));const f=e=>null!==e.winner&&"object"===typeof e&&"number"===typeof e.points&&"string"===typeof e.gin&&void 0!==e.winner,g=e=>{switch(e.version){case 2:return e;case 1:return S(e);default:throw new y(e)}};class N extends Error{constructor(e,t){super(e),this.state=t}}class y extends N{constructor(e){super("Unknown state version '".concat(e.version,"'"),e),this.version=void 0,this.version=e.version}}const _={version:2,player1Name:"Player 1",player2Name:"Player 2",games:[],initialDealer:p.One},S=e=>({...e,version:2,initialDealer:p.One}),k="reduxState",T=e=>(window.localStorage.setItem(k,JSON.stringify(e)),Promise.resolve());n(31);var C=n(0);const R=()=>Object(C.jsx)("header",{className:"c-app-header",children:Object(C.jsx)("h1",{children:"Gin Scorer"})});var E=n(2),D=n.n(E);const G=e=>{e.stopPropagation(),e.preventDefault()};n(33);const M=Object(s.forwardRef)(((e,t)=>{let{primary:n,...a}=e;return Object(C.jsx)("button",{...a,ref:t,className:D()("c-button",n&&"c-button--primary",a.className),onClick:e=>{!e.button&&a.onClick&&(G(e),a.confirmation&&!window.confirm(a.confirmation)||a.onClick())}})})),F={UndoGame:()=>({type:"UndoGame"}),RenamePlayers:e=>({...e,type:"RenamePlayers"}),FinishGame:e=>({type:"FinishGame",result:e}),StartNewMatch:()=>({type:"StartNewMatch"}),SetInitialDealer:e=>({type:"SetInitialDealer",dealer:e})};var P=n(51),W=n(19),U=n(17);const L=e=>{var t;null===(t=e.current)||void 0===t||t.focus()};n(34);const B=e=>{const t=Object(s.useRef)(null),n=Object(s.useRef)(null),[r,c]=Object(s.useState)(window.innerHeight);return Object(s.useEffect)((()=>{if(e.hideTitle||!e.title)return;const t=()=>c(window.innerHeight);return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)}),[e.title,e.hideTitle]),Object(s.useLayoutEffect)((()=>{var e;if(!n.current)return;if("standalone"in navigator&&navigator.standalone)return;const{bottom:a}=n.current.getBoundingClientRect(),s=Math.max(0,a-r);null===(e=t.current)||void 0===e||e.style.setProperty("--safari-correction","".concat(s,"px"))}),[r]),Object(a.createPortal)(Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(P.a,{in:e.open,timeout:125,classNames:"c-drawer__backdrop",appear:!0,mountOnEnter:!0,unmountOnExit:!0,children:Object(C.jsx)("div",{onClick:t=>{var n;0===t.button&&(null===(n=e.onDismiss)||void 0===n||n.call(e))},className:"c-drawer__backdrop"})}),Object(C.jsx)(P.a,{in:e.open,classNames:"c-drawer",timeout:125,onExit:()=>L(n),onEntered:e.onEntered,onExited:e.onExited,appear:!0,children:Object(C.jsxs)("div",{ref:t,className:D()("c-drawer",{"c-drawer--has-title":Boolean(e.title)&&!e.hideTitle}),onKeyDown:t=>{t.key===U.a.Escape&&e.onDismiss&&(G(t),e.onDismiss())},role:"dialog",children:[e.title&&Object(C.jsx)("button",{ref:n,className:"c-drawer__title",onClick:t=>{var n;G(t),null===(n=e.onTitleClick)||void 0===n||n.call(e)},children:Object(C.jsx)("span",{className:"c-drawer__title__text",children:e.title})}),Object(C.jsx)(W.a,{in:e.open,timeout:125,appear:!0,mountOnEnter:!0,unmountOnExit:!0,children:e.children})]})})]}),document.body)},I=()=>Object(C.jsx)("div",{className:"c-drawer-title-placeholder"}),z=e=>{let{activator:t,children:n}=e;const[a,r]=Object(s.useState)(!1);return Object(C.jsxs)(C.Fragment,{children:[t({openDrawer:()=>r(!0)}),Object(C.jsx)(B,{open:a,onDismiss:()=>r(!1),children:n})]})},A=e=>Object(C.jsxs)("form",{style:e.style,className:e.className,onSubmit:t=>{G(t),e.disableSubmit||e.onSubmit()},children:[e.children,e.submitLabel&&Object(C.jsx)(M,{primary:!0,disabled:e.disableSubmit,type:"submit",children:e.submitLabel})]}),X=e=>(t,n)=>{const{value:a,onChange:s,disabled:r,name:c}=e;r||(void 0!==n?null===s||void 0===s||s({...a,[n]:t},c):console.error("Field change handler got value",t,"with no field name"))};n(15);const H=Object(s.forwardRef)(((e,t)=>Object(C.jsx)("input",{ref:t,...e,className:D()("c-base-input",e.className)}))),J=Object(s.forwardRef)(((e,t)=>{let{onChange:n,label:a,className:s,...r}=e;return Object(C.jsxs)("label",{className:D()("c-input",s),children:[a&&Object(C.jsx)("div",{className:"c-input-label",children:a}),Object(C.jsx)(H,{...r,ref:t,onChange:e=>n(e.target.value,r.name)})]})})),V=e=>{const{value:t,className:n,...a}=e;return Object(C.jsx)(H,{...a,className:D()("c-number-input",n),type:"number",value:null!==t?t.toString():"",onChange:t=>{e.onChange(q(t.target.value),e.name)}})},q=e=>""===e?null:Number.parseInt(e,10);n(35);const Y=Object(s.forwardRef)(((e,t)=>{const n=X(e),{value:a,disabled:s}=e;return Object(C.jsxs)("div",{className:"c-players-input",children:[Object(C.jsx)(J,{ref:t,label:"Player 1",name:"player1Name",value:a.player1Name,disabled:s,onChange:n,required:!0,maxLength:15}),Object(C.jsx)(J,{label:"Player 2",name:"player2Name",value:a.player2Name,disabled:s,onChange:n,required:!0,maxLength:15})]})})),K=e=>{const[t,n]=Object(s.useState)(null),a=Object(s.useRef)(null),r=Object(s.useRef)(null),c=()=>n(null);return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(M,{ref:a,onClick:()=>n(e.defaultValue),children:"Rename Players"}),Object(C.jsx)(B,{hideTitle:!0,title:"Rename Players",open:null!==t,onDismiss:c,onEntered:()=>{var e;return null===(e=r.current)||void 0===e?void 0:e.focus()},onExited:()=>{var e;return null===(e=a.current)||void 0===e?void 0:e.focus()},children:Object(C.jsxs)(A,{style:{marginLeft:10,marginRight:10,maxWidth:"30em",display:"flex",flexDirection:"column"},onSubmit:()=>{t&&(e.onSubmit(t),c())},children:[Object(C.jsx)(Y,{ref:r,value:null!==t&&void 0!==t?t:e.defaultValue,onChange:e=>n(e)}),Object(C.jsx)("div",{style:{height:20}}),Object(C.jsx)(M,{primary:!0,type:"submit",children:"Update"})]})})]})},Z=e=>{let{player1Name:t,player2Name:n}=e;return{player1Name:t,player2Name:n}},$=e=>{let{games:t}=e;return Boolean(t.length)},Q=e=>{let{games:t,initialDealer:n}=e;return t.length%2===0?n:w(n)},ee=e=>Boolean(e.games.length),te=e=>Object(l.c)(e,l.a.run(T,{args:[e]})),ne={onStartNewMatch:F.StartNewMatch,onRenamePlayers:F.RenamePlayers,onUndoGame:F.UndoGame},ae=Object(c.b)((e=>({playerNames:Z(e),canUndo:$(e),hasMatchStarted:ee(e)})),ne)((e=>Object(C.jsxs)("div",{className:"c-command-bar",children:[Object(C.jsx)(M,{onClick:e.onUndoGame,disabled:!e.canUndo,children:"Undo Last Game"}),Object(C.jsx)(M,{onClick:e.onStartNewMatch,disabled:!e.hasMatchStarted,confirmation:"Are you sure you want to start a new match?",children:"New Match"}),Object(C.jsx)(K,{defaultValue:e.playerNames,onSubmit:e.onRenamePlayers})]})));var se=n(18),re=n(8),ce=n.n(re);const ie=()=>({[p.One]:0,[p.Two]:0}),le=e=>e.reduce(((e,t)=>(e[t.winner]+=1,e)),ie()),oe=(e,t)=>{const n=e.reduce(((e,t)=>(e[t.winner]+=t.points,e)),ie());return t[p.One]&&(n[p.One]/=t[p.One]),t[p.Two]&&(n[p.Two]/=t[p.Two]),n},de=e=>{const t=ie(),n=ie();for(const a of e)t[a.winner]+=1,t[w(a.winner)]=0,t[a.winner]>n[a.winner]&&(n[a.winner]=t[a.winner]);return n},ue=e=>e.reduce(((e,t)=>(e[t.winner]=Math.max(e[t.winner],t.points),e)),ie()),me=e=>e.reduce(((e,t)=>(t.gin!==x.None&&(e[t.winner][t.gin]+=1),e)),{[p.One]:{[x.Normal]:0,[x.Super]:0},[p.Two]:{[x.Normal]:0,[x.Super]:0}});n(36);class je extends s.Component{constructor(){var e;super(...arguments),this.root=Object(s.createRef)(),this.hasFocus=(e=this.root,()=>{var t,n;return null!==(t=null===(n=e.current)||void 0===n?void 0:n.contains(document.activeElement))&&void 0!==t&&t}),this.focus=()=>L(this.root),this.handleFocusChange=()=>this.forceUpdate(),this.handleChange=()=>{var e,t;null===(e=(t=this.props).onChange)||void 0===e||e.call(t,this.props.value,this.props.name)}}render(){const{className:e,children:t,value:n,label:a,...s}=this.props;return Object(C.jsxs)("label",{ref:this.root,className:D()("c-radio",e,{"c-radio--checked":s.selected,"c-radio--disabled":s.disabled,"c-radio--nonative":s.hideNative,"c-radio--has-focus":this.hasFocus()}),children:[Object(C.jsx)("input",{name:s.name,disabled:s.disabled,checked:s.selected,onChange:this.handleChange,value:n.toString(),type:"radio",onFocus:this.handleFocusChange,onBlur:this.handleFocusChange}),a]})}}n(37);class he extends r.a.Component{constructor(){super(...arguments),this.first=r.a.createRef(),this.focus=()=>L(this.first)}render(){const{className:e,name:t,...n}=this.props;return Object(C.jsxs)("div",{className:D()("c-radio-group",e,{"c-radio-group--horizontal":n.horizontal,"c-radio-group--hide-native":n.hideNative}),children:[n.label&&Object(C.jsx)("span",{className:"c-radio-group__label",children:n.label}),n.choices.map(((e,a)=>Object(s.createElement)(je,{...e,key:e.value,ref:0===a?this.first:void 0,name:t,disabled:n.disabled,hideNative:n.hideNative,selected:n.value===e.value,onChange:n.onChange})))]})}}n(38);const be={DEFAULT:{winner:p.One,points:null,gin:x.None}},pe=Object(s.forwardRef)(((e,t)=>{const n=Object(s.useRef)(null),a=X(e),{value:r,disabled:c}=e;return Object(s.useImperativeHandle)(t,(()=>({focus:()=>{var e;return null===(e=n.current)||void 0===e?void 0:e.focus()}}))),Object(C.jsxs)("div",{className:"c-game-input",children:[Object(C.jsx)(he,{name:"winner",className:"c-game-input__players",choices:[{value:p.One,label:e.player1Name},{value:p.Two,label:e.player2Name}],value:r.winner,disabled:c,label:"Winner",onChange:a,hideNative:!0,horizontal:!0,ref:n}),Object(C.jsxs)("div",{className:"c-game-input__points",children:[Object(C.jsx)(V,{name:"points",value:r.points,min:1,disabled:c,onChange:a}),"\xa0 points"]}),Object(C.jsx)(he,{name:"gin",value:r.gin,className:"c-game-input__gin",choices:[{value:x.None,label:"No Gin"},{value:x.Normal,label:"Gin"},{value:x.Super,label:"Super Gin"}],disabled:c,onChange:a,horizontal:!0,hideNative:!0})]})}));n(39);const Oe=e=>{let{value:t,...n}=e;return Object(C.jsxs)("div",{className:D()("c-scorecolumn",n.className),children:[Object(C.jsxs)("div",{className:"c-scorecolumn__header",children:[Object(C.jsx)("div",{className:"c-scorecolumn__player",children:n.player1Name}),Object(C.jsx)("div",{className:"c-scorecolumn__player",children:n.player2Name})]}),t.games.map(((e,t)=>Object(s.createElement)(ve,{...e,key:"game-".concat(t)}))),t.bonuses.map(((e,t)=>Object(C.jsx)(we,{...e,isFirst:0===t},"bonus-".concat(t))))]})},ve=e=>{let{winner:t,gin:n,runningTotal:a}=e;const s=Object(C.jsxs)("div",{className:"c-scorerow__winner","data-gin":n,children:[a,n!==x.None&&Object(C.jsxs)("span",{className:"c-scorerow__winner__gin__star",children:[" ",n===x.Normal&&"\u2605",n===x.Super&&"\u2605\u2605"]})]},"winner"),r=Object(C.jsx)("div",{className:"c-scorerow__loser"},"loser");return Object(C.jsx)("div",{className:"c-scorerow",children:t===p.One?[s,r]:[r,s]})},we=e=>{const t=Object(C.jsxs)("div",{className:"c-bonusrow__recipient",children:[Object(C.jsx)("span",{className:"c-bonusrow__points",children:e.points}),Object(C.jsx)("span",{className:"c-bonusrow__label",children:e.label})]},"winner"),n=Object(C.jsx)("div",{className:"c-bonusrow__loser"},"loser");return Object(C.jsx)("div",{className:D()("c-bonusrow",{"c-bonusrow--first":e.isFirst}),children:e.player===p.One?[t,n]:[n,t]})};n(40);const xe=e=>{let{className:t,children:n,overflowX:a="auto",overflowY:s="auto"}=e;return Object(C.jsx)("div",{className:D()("c-scroll-viewer",t),style:{overflowX:a,overflowY:s},children:n})};n(41),n(42);const fe=e=>{const{value:t,...n}=e;return d(t)?Object(C.jsxs)(ge,{...n,finished:!0,children:[Object(C.jsxs)("span",{className:"c-set-summary--final__winner",children:[v(e,t.finalResult.winner)," won"]}),Object(C.jsx)("span",{className:"c-set-summary--final__points",children:t.finalResult.points})]}):Object(C.jsxs)(ge,{...n,children:[Object(C.jsxs)("div",{className:"c-set-summary__player",children:[Object(C.jsx)("span",{className:"c-set-summary__player-name",children:e.player1Name}),Object(C.jsx)("span",{className:"c-set-summary__points",children:t.currentScores[p.One]})]}),Object(C.jsxs)("div",{className:"c-set-summary__player",children:[Object(C.jsx)("span",{className:"c-set-summary__player-name",children:e.player2Name}),Object(C.jsx)("span",{className:"c-set-summary__points",children:t.currentScores[p.Two]})]})]})},ge=e=>{let{className:t,onClick:n,finished:a,children:s}=e;return Object(C.jsx)("div",{className:D()("c-set-summary",a?"c-set-summary--final":"c-set-summary--in-progress",t,{"c-set-summary--clickable":Boolean(n)}),onClick:n,children:s})};class Ne extends s.PureComponent{render(){return Object(C.jsx)(z,{activator:e=>{let{openDrawer:t}=e;return Object(C.jsx)(fe,{...this.props,onClick:t,className:"c-set-view"})},children:Object(C.jsx)(Oe,{...this.props,className:"c-set-view__score-column"})})}}var ye=n(10);n(45);const _e=e=>{let{layout:t,value:n,showDealer:a}=e;const s=Object(c.d)(Q);switch(t){case"stack":return Object(C.jsx)(Se,{value:n,dealer:a?s:void 0});case"grid":return Object(C.jsx)(Re,{value:n,dealer:a?s:void 0})}},Se=e=>{let{value:t,dealer:n}=e;const a=Object(c.d)(Z);return Object(C.jsxs)("div",{className:"c-stats-viewer",children:[void 0!==n&&Object(C.jsxs)("div",{children:["Dealer: ",v(a,n)]}),De(((e,t,n)=>Object(C.jsx)(ke,{title:e,value:t,formatter:n})),t)]})},ke=e=>{const t=Object(c.d)(Z);return Object(C.jsxs)("div",{className:"c-share-chart",children:[Object(C.jsx)("h3",{children:e.title}),v(t,p.One),":"," ",e.formatter(e.value[p.One]),Object(C.jsx)("br",{}),v(t,p.Two),":"," ",e.formatter(e.value[p.Two]),Object(C.jsx)("br",{})]})},Te=e=>e%1===0?e.toString():e.toFixed(2),Ce=e=>{const t=e[x.Normal],n=e[x.Super],a=Object(C.jsxs)("span",{style:{whiteSpace:"nowrap"},children:[t,"\u2605"]}),s=Object(C.jsxs)("span",{style:{whiteSpace:"nowrap"},children:[n,"\u2605\u2605"]});return t&&n?Object(C.jsxs)(C.Fragment,{children:[a," ",Object(C.jsx)("span",{style:{opacity:.5},children:"|"})," ",s]}):t?a:n?s:0},Re=e=>{let{value:t,dealer:n}=e;const a=Object(c.d)(Z);return Object(C.jsxs)("table",{className:"c-stats-viewer c-stats-viewer--grid",children:[Object(C.jsx)("thead",{children:Object(C.jsxs)("tr",{children:[Object(C.jsx)("td",{className:"c-stats-viewer--grid__player",children:v(a,p.One)}),Object(C.jsx)("td",{children:void 0!==n&&Object(C.jsx)(Ge,{dealer:n})}),Object(C.jsx)("td",{className:"c-stats-viewer--grid__player",children:v(a,p.Two)})]})}),Object(C.jsx)("tbody",{children:De(((e,t,n)=>Object(C.jsx)(Ee,{title:e,value:t,formatter:n})),t)})]})},Ee=e=>Object(C.jsxs)("tr",{children:[Object(C.jsx)("td",{children:e.formatter(e.value[p.One])}),Object(C.jsx)("td",{children:e.title}),Object(C.jsx)("td",{children:e.formatter(e.value[p.Two])})]}),De=(e,t)=>Object(C.jsxs)(C.Fragment,{children:[e("Wins",t.wins,ye.identity),e("Max Streak",t.maxStreak,ye.identity),e("Mean PPG",t.meanWinSize,Te),e("Biggest Win",t.biggestWin,ye.identity),e("Gins",t.ginGames,Ce)]}),Ge=e=>{let{dealer:t}=e;const n=Object(c.d)(ee),a=Object(c.c)();return Object(C.jsxs)("div",{className:D()("c-dealer-token",t===p.One?"c-dealer-token--p1":"c-dealer-token--p2"),onClick:n?void 0:()=>a(F.SetInitialDealer(w(t))),children:[Object(C.jsx)("span",{className:"c-dealer-token__arrow c-dealer-token__arrow--p1",children:Object(C.jsx)(Me,{direction:"left"})})," ","Dealer"," ",Object(C.jsx)("span",{className:"c-dealer-token__arrow c-dealer-token__arrow--p2",children:Object(C.jsx)(Me,{direction:"right"})})]})},Me=e=>{let{direction:t}=e;return Object(C.jsx)("svg",{viewBox:"0 0 5 6",width:10,height:12,children:Object(C.jsx)("path",{d:"M 0 0 L 5 3 L 0 6 Z",style:{fill:"var(--text-color)"},transform:"left"===t?"rotate(180 2.5 3)":void 0})})};n(46);const Fe=e=>Object(C.jsxs)("div",{className:D()("c-match-result-viewer",D.a),children:[Object(C.jsxs)("div",{className:"c-match-result-viewer__winner",children:[e.winner===p.One?e.player1Name:e.player2Name," ","wins!"]}),Object(C.jsxs)("div",{className:"c-match-result-viewer__points",children:[Object(C.jsx)("span",{className:"c-match-result-viewer__points-value",children:e.points}),"\xa0",Object(C.jsx)("span",{className:"c-match-result-viewer__points-label",children:"points"})]}),Object(C.jsx)("div",{className:"c-match-result-viewer__actions",children:e.onNewMatch&&Object(C.jsx)(M,{onClick:e.onNewMatch,children:"Play again"})})]});n(47);const Pe=Object(s.forwardRef)(((e,t)=>{const n=Object(s.useRef)(null),[a,r]=Object(s.useState)(be.DEFAULT);return Object(s.useImperativeHandle)(t,(()=>({focus:()=>{var e;return null===(e=n.current)||void 0===e?void 0:e.focus()}})),[]),Object(C.jsx)(A,{className:"c-gameform",onSubmit:()=>{var t,s;f(a)&&(null===(t=e.onSubmitGame)||void 0===t||t.call(e,a),r(be.DEFAULT),null===(s=n.current)||void 0===s||s.focus())},disableSubmit:e.disabled||!f(a),submitLabel:"Submit",children:Object(C.jsx)(pe,{ref:n,player1Name:e.player1Name,player2Name:e.player2Name,disabled:e.disabled,value:a,onChange:e=>r(e)})})})),We=Object(se.createSelector)((e=>e.games),(e=>{const t=o(e),n=t.every(d)?b(t,e):void 0;return{games:e,sets:t,finalResult:n}})),Ue={onSubmitGame:F.FinishGame,onNewMatch:F.StartNewMatch},Le=Object(c.b)((e=>({value:We(e),players:Z(e)})),Ue)((e=>{let{players:t,value:n,readOnly:a,...r}=e;const c=Object(s.useRef)(null),i=Object(s.useMemo)((()=>(e=>{const t=le(e);return{wins:t,meanWinSize:oe(e,t),maxStreak:de(e),biggestWin:ue(e),ginGames:me(e)}})(n.games)),[n.games]),[l,o]=Object(s.useState)(!1),d=()=>{o(!1)},u=Object(C.jsx)(Pe,{ref:c,...t,onSubmitGame:e=>{var t;null===(t=r.onSubmitGame)||void 0===t||t.call(r,e),d()}});return Object(C.jsxs)("div",{className:D()("c-match-viewer",{"c-match-viewer--finished":Boolean(n.finalResult)}),children:[Object(C.jsx)(ce.a,{minWidth:600,children:Object(C.jsxs)(xe,{className:"c-match-viewer__main",children:[Object(C.jsx)("div",{className:"c-match-viewer__sets",children:n.sets.map(((e,n)=>Object(C.jsx)(Oe,{...t,value:e},n)))}),Object(C.jsx)(_e,{layout:"stack",value:i,showDealer:!n.finalResult})]})}),Object(C.jsx)(ce.a,{maxWidth:600,children:Object(C.jsxs)(xe,{overflowX:"hidden",children:[n.sets.map(((e,n)=>Object(C.jsx)(Ne,{value:e,...t},n))),Object(C.jsx)(_e,{layout:"grid",value:i,showDealer:!n.finalResult})]})}),n.finalResult&&Object(C.jsx)(Fe,{...t,...n.finalResult,onNewMatch:r.onNewMatch}),!a&&Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)(ce.a,{maxWidth:1e3,children:[Object(C.jsx)(I,{}),Object(C.jsx)(B,{open:l,title:"Add game",onTitleClick:()=>o(!0),onEntered:()=>{var e;return null===(e=c.current)||void 0===e?void 0:e.focus()},onDismiss:d,hideTitle:!!n.finalResult,children:u})]}),Object(C.jsx)(ce.a,{minWidth:1e3,children:Object(C.jsxs)("div",{className:"c-match-viewer__add-game",children:[Object(C.jsx)("h1",{children:"Add game"}),u]})})]})]})}));n(48);const Be=e=>Object(C.jsxs)("div",{className:"l-playing",children:[Object(C.jsx)(R,{}),Object(C.jsx)(ae,{}),Object(C.jsx)(Le,{})]}),Ie=(Object(i.b)(Object(i.a)((()=>window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())),Object(l.b)()),Object(i.c)(((e,t)=>{switch(t.type){case"RenamePlayers":{const{player1Name:n,player2Name:a}=t;return te({...e,player1Name:n,player2Name:a})}case"FinishGame":return te({...e,games:[...e.games,t.result]});case"UndoGame":return te({...e,games:e.games.slice(0,e.games.length-1)});case"StartNewMatch":return te({...e,games:[]});case"SetInitialDealer":return e.games.length?e:te({...e,initialDealer:t.dealer});default:return e}}),(()=>{const e=window.localStorage.getItem(k);var t;if(e)try{const a=JSON.parse(e);if("object"!==typeof(t=a)||"string"!==typeof t.player1Name||"string"!==typeof t.player2Name||"number"!==typeof t.version)return;try{return g(a)}catch(n){return void console.error(n)}}catch(n){return void console.error("Could not read state as JSON",n)}})()||_,Object(l.b)()));class ze extends s.Component{render(){return Object(C.jsx)(c.a,{store:Ie,children:Object(C.jsx)(Be,{})})}}var Ae=ze;const Xe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function He(e,t){navigator.serviceWorker.register(e).then((e=>{e.onupdatefound=()=>{const n=e.installing;null!=n&&(n.onstatechange=()=>{"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((e=>{console.error("Error during service worker registration:",e)}))}a.render(Object(C.jsx)(Ae,{}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/ginscorer",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(()=>{const t="".concat("/ginscorer","/service-worker.js");Xe?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((n=>{const a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((e=>{e.unregister().then((()=>{window.location.reload()}))})):He(e,t)})).catch((()=>{console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((()=>{console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):He(t,e)}))}}()}],[[49,1,2]]]);
//# sourceMappingURL=main.03c99118.chunk.js.map