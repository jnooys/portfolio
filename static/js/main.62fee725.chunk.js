(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{177:function(e,t,a){e.exports=a(375)},374:function(e,t,a){},375:function(e,t,a){"use strict";a.r(t);a(178),a(187);var n=a(1),r=a.n(n),c=a(176),l=a.n(c),o=a(65),i=a.n(o),u=a(111),s=a(82),m=(a(374),a(64)),d=a(49),E={originProject:[],sortedProject:[],sortCategory:[],sortYear:[],imagePath:"https://rongchyo.cafe24.com/resources/images/thumbnail/",item:!1,loading:!0,activeCategory:!1},f=function(e){return{type:"OPEN_ITEM",item:e}},p=function(e){return{type:"ACTIVE_CATEGORY",activeCategory:e}},g=function(e){return{type:"SORT_PROJECT",sortedProject:e}},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOAD_DATA":return Object(d.a)({},e,{originProject:t.originProject,sortedProject:Object(m.a)(t.originProject),sortCategory:t.sortCategory,sortYear:t.sortYear,loading:t.loading});case"OPEN_ITEM":return Object(d.a)({},e,{item:t.item});case"CLOSE_ITEM":return Object(d.a)({},e,{item:!1});case"ACTIVE_CATEGORY":return Object(d.a)({},e,{activeCategory:t.activeCategory});case"SORT_PROJECT":return Object(d.a)({},e,{sortedProject:t.sortedProject});default:return e}},h=Object(n.createContext)(),b=Object(n.createContext)(),y=function(e){var t=e.value,a=e.children;return r.a.createElement(b.Provider,{value:t.state},r.a.createElement(h.Provider,{value:t.dispatch},a))},j=function(){var e=Object(n.useContext)(b);if(!e)throw new Error("Cannot find StateProvider");return e},O=function(){var e=Object(n.useContext)(h);if(!e)throw new Error("Cannot find DispatchProvider");return e},C=function(){var e=j(),t=e.activeCategory,a=e.sortCategory,c=e.originProject,l=Object(n.useState)(!1),o=Object(s.a)(l,2),i=o[0],u=o[1],d=O(),E=Object(n.useCallback)((function(e){e.preventDefault(),i&&(d(g(Object(m.a)(c))),d(p(!1))),u(!i)}),[i]),f=Object(n.useCallback)((function(e,n){var r,l;n.preventDefault(),t.id===e?(r=!1,l=Object(m.a)(c)):(r=a.find((function(t){return t.id===e})),l=c.filter((function(t){return e?t.id===e:t.id})).sort((function(e,t){return e.id<t.id}))),d(g(l)),d(p(r)),window.scrollTo(0,0)}),[t,a]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("header",{id:"header"},r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,r.a.createElement("a",{href:"/portfolio"},"seoyoon jung")),r.a.createElement("div",{className:"category_wrap"},r.a.createElement("h2",{className:t&&"open"},r.a.createElement("a",{href:"#n",onClick:E},r.a.createElement("svg",{width:"200",height:"200",viewBox:"0 0 200 200"},r.a.createElement("g",null,r.a.createElement("rect",{x:"0",y:"0",width:"80",height:"80"}),r.a.createElement("rect",{x:"120",width:"80",height:"80"}),r.a.createElement("rect",{y:"120",width:"80",height:"80"}),r.a.createElement("rect",{x:"120",y:"120",width:"80",height:"80"}))))),i&&r.a.createElement("ul",null,a.map((function(e){return r.a.createElement("li",{key:e.id,className:t.id===e.id?"active":""},r.a.createElement("a",{href:"#n",onClick:function(t){return f(e.id,t)}},e.name))})))))))},k=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"loading"}))},w=Object(n.memo)((function(e){var t=e.item,a=j().imagePath,c=O(),l=t.title,o=t.subtitle,i=t.date,u=t.url,s=t.thumbnail,m=Object(n.useCallback)((function(e){!function(){var e=document.querySelector("html"),t=document.querySelector("body");e.style.overflowY="hidden",t.style.overflowY="scroll"}(),c(f(e))}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("li",null,r.a.createElement("img",{src:a+s,alt:l}),r.a.createElement("div",null,r.a.createElement("div",{className:"info"},r.a.createElement("span",{className:"title"},l),r.a.createElement("span",{className:"subtitle"},o),r.a.createElement("span",{className:"date"},i)),r.a.createElement("div",{className:"anchor"},r.a.createElement("a",{href:u,target:"_blank",rel:"noopener noreferrer",className:"btn link"},"link"),r.a.createElement("button",{type:"button",className:"btn detail",onClick:function(){return m(t)}},"details")))))})),N=Object(n.memo)((function(e){var t=e.title,a=e.project;return r.a.createElement("article",null,r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,t),r.a.createElement("ul",null,a.map((function(e,t){return r.a.createElement(w,{item:e,key:e.id+t})})))))}),(function(e,t){return e.title===t.title})),P=function(){var e=j(),t=e.sortedProject,a=e.sortYear,n=e.sortCategory,c=e.loading,l=e.activeCategory;return r.a.createElement("main",null,c&&r.a.createElement(k,null),l?n.filter((function(e){return l.id?e.id===l.id:e.id})).map((function(e){return r.a.createElement(N,{title:e.name,project:t.filter((function(t){return t.id===e.id})),key:e.id})})):a.map((function(e){return r.a.createElement(N,{title:e,project:t.filter((function(t){return 1*t.date.slice(0,4)===e})),key:e})})))},x=Object(n.memo)((function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("footer",null,r.a.createElement("div",{className:"container"},r.a.createElement("p",null,"\xa9 seoyoon jung All Rights Reserved. "))))})),T=function(){var e=j(),t=e.item,a=e.imagePath,c=e.sortedProject,l=O(),o=t.title,i=t.subtitle,u=t.url,s=t.mainDev,m=t.info,d=t.images,E=t.pages,p=t.date,g=Object(n.useCallback)((function(){!function(){var e=document.querySelector("html"),t=document.querySelector("body");e.style.overflowY="",t.style.overflowY=""}(),l({type:"OPEN_ITEM"})}),[]),v=Object(n.useCallback)((function(e){var a,n=e.target.dataset.move,r=c.indexOf(t),o=c.length-1;"prev"===n?a=0===r?o:r-1:"next"===n&&(a=r===o?0:r+1),l(f(c[a]))}),[c,t]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("article",{id:"modal"},r.a.createElement("span",{className:"dim",onClick:g}),r.a.createElement("div",{className:"modal_popup"},r.a.createElement("div",null,r.a.createElement("header",null,r.a.createElement("h1",null,o),r.a.createElement("span",{className:"subtitle"},i),r.a.createElement("span",{className:"date"},p)),r.a.createElement("section",null,r.a.createElement("a",{href:u,target:"_blank",className:"link"},s?u:"HTML\ud398\uc774\uc9c0 \ubc14\ub85c\uac00\uae30"),E&&r.a.createElement("ul",{className:"page"},E.map((function(e,t){return r.a.createElement("li",{key:"page".concat(t)},r.a.createElement("a",{href:e.url,target:"_blank"},e.name))}))),r.a.createElement("ul",{className:"info"},m.map((function(e,t){return r.a.createElement("li",{key:"info".concat(t)},e)}))),r.a.createElement("ul",{className:"img"},d.map((function(e,t){return r.a.createElement("li",{key:"image".concat(t)},r.a.createElement("span",null,r.a.createElement("img",{src:a+e,alt:"".concat(o," ").concat(i)})))}))))),r.a.createElement("button",{type:"button",className:"close",onClick:g},r.a.createElement("span",null),r.a.createElement("span",null))),r.a.createElement("button",{type:"button",className:"move prev","data-move":"prev",onClick:v},r.a.createElement("span",null),r.a.createElement("span",null)),r.a.createElement("button",{type:"button",className:"move next","data-move":"next",onClick:v},r.a.createElement("span",null),r.a.createElement("span",null))))},_=function(){var e=Object(n.useReducer)(v,E),t=Object(s.a)(e,2),a=t[0],c=t[1],l=a.item;return Object(n.useEffect)((function(){Object(u.a)(i.a.mark((function e(){var t,a,n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=function(){var e=Object(u.a)(i.a.mark((function e(t){var a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/portfolio/data/db.json",e.next=3,fetch("/portfolio/data/db.json");case 3:return a=e.sent,e.next=6,a.json();case 6:return n=e.sent,e.abrupt("return",n[t]);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.next=3,t("project");case 3:return a=e.sent,e.next=6,t("category");case 6:n=e.sent,r=a.reduce((function(e,t){var a=1*t.date.slice(0,4);return-1===e.indexOf(a)&&e.push(a),e}),[]),c({type:"LOAD_DATA",originProject:(l={originProject:a,sortCategory:n,sortYear:r,loading:!1}).originProject,sortCategory:l.sortCategory,sortYear:l.sortYear,loading:l.loading});case 9:case"end":return e.stop()}var l}),e)})))()}),[]),r.a.createElement(y,{value:{state:a,dispatch:c}},r.a.createElement(C,null),r.a.createElement(P,null),r.a.createElement(x,null),l&&r.a.createElement(T,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[177,1,2]]]);
//# sourceMappingURL=main.62fee725.chunk.js.map