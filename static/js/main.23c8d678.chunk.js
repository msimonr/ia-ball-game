(this["webpackJsonpia-ball-game"]=this["webpackJsonpia-ball-game"]||[]).push([[0],{247:function(e,t,n){e.exports=n(274)},252:function(e,t,n){},258:function(e,t){},259:function(e,t){},267:function(e,t){},270:function(e,t){},271:function(e,t){},272:function(e,t,n){},274:function(e,t,n){"use strict";n.r(t);var a=n(44),r=n.n(a),i=n(226),o=n.n(i),c=(n(252),n(5)),l=n.n(c),u=n(13),s=n(6),d=n(11),f=n(14),h=n(15),p=(n(273),n(246)),b=n(245),x=n.n(b),v=(n(272),n(17)),y=n(8),m=function(e,t,n){t.fillStyle="#FF000080",t.beginPath(),t.arc(n.x,n.y,n.r,0,2*Math.PI,0),t.fill(),e.forEach((function(e){var n=Object(y.a)(e.bbox,4),a=n[0],r=n[1],i=n[2],o=n[3],c=e.class,l=Math.floor(100*e.score),u="green";"person"!==c&&(u="gray"),t.strokeStyle=u,t.font="18px Arial",t.fillStyle=u,t.beginPath(),t.scale(-1,1),t.fillText(c+" "+l+"%",-i-a,r),t.scale(-1,1),t.lineWidth=3,t.rect(a,r,i,o),t.stroke()}))},g=function(e,t){var n,a=Object(v.a)(e);try{for(a.s();!(n=a.n()).done;){var r=n.value;if("person"===r.class&&r.score>.5){var i=r.bbox[0],o=r.bbox[1],c=r.bbox[2],l=r.bbox[3],u=t.x,s=t.y;if(t.x<i?u=i:t.x>i+c&&(u=i+c),t.y<o?s=o:t.y>o+l&&(s=o+l),Math.sqrt(Math.pow(t.x-u,2)+Math.pow(t.y-s,2))+.7*t.r<t.r)return r}}}catch(d){a.e(d)}finally{a.f()}},E=function(e,t,n,a){n.drawImage(e,0,0);var r=Object(y.a)(t.bbox,4),i=r[0],o=r[1],c=r[2],l=r[3];n.strokeStyle="red",n.font="30px bold Arial",n.fillStyle="red",n.beginPath(),n.scale(-1,1),n.fillText("\xa1Toque!",-i-c,o-5),n.scale(-1,1),n.lineWidth=3,n.rect(i,o,c,l),n.stroke(),n.fillStyle="#FF000080",n.beginPath(),n.arc(a.x,a.y,a.r,0,2*Math.PI,0),n.fill()},w=function(e){return e[Math.floor(Math.random()*e.length)]},k=void 0,j={x:-100,y:-100,r:50,dx:1,dy:1,speed:20},O=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={speed:20,radio:50},e.reiniciar=function(){void 0!==k&&(j.x=-100,j.y=-100,j.r=e.state.radio,j.speed=e.state.speed,k=void 0)},e.setSpeed=function(t){e.setState({speed:parseFloat(t.target.value)})},e.setRadio=function(t){e.setState({radio:parseFloat(t.target.value)})},e}return Object(d.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"Control"},r.a.createElement("label",null,"Velocidad de bola"),r.a.createElement("input",{type:"number",min:"1",id:"speed",defaultValue:this.state.speed,onChange:this.setSpeed}),r.a.createElement("label",null,"Radio de bola"),r.a.createElement("input",{type:"number",min:"10",id:"radio",defaultValue:this.state.radio,onChange:this.setRadio}),r.a.createElement("button",{onClick:this.reiniciar},"Reiniciar"))}}]),n}(r.a.Component);var S=function(){var e=Object(a.useRef)(null),t=Object(a.useRef)(null),n=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a();case 2:t=e.sent,setInterval((function(){i(t)}),10);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),i=function(){var n=Object(u.a)(l.a.mark((function n(a){var r,i,o,c,u,s,d;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(void 0===k){n.next=3;break}n.next=17;break;case 3:if("undefined"===typeof e.current||null===e.current||4!==e.current.video.readyState){n.next=17;break}return r=e.current.video,i=e.current.video.videoWidth,o=e.current.video.videoHeight,e.current.video.width=i,e.current.video.height=o,t.current.width=i,t.current.height=o,c=t.current.getContext("2d"),n.next=14,a.detect(r);case 14:u=n.sent,void 0!==(k=g(u,j))?E(r,k,c,j):(s=[.95,1.05,1],d=.2*j.r,j.x+j.r>t.current.width+d?j.dx=-1*w(s):j.x-j.r<-d&&(j.dx=w(s)),j.y+j.r>t.current.height+d?j.dy=-1*w(s):j.y-j.r<-d&&(j.dy=w(s)),j.x=j.x+j.dx*j.speed,j.y=j.y+j.dy*j.speed,m(u,c,j));case 17:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return Object(a.useEffect)((function(){n()}),[]),r.a.createElement("div",{className:"App"},r.a.createElement(O,null),r.a.createElement("header",{className:"App-header"},r.a.createElement(x.a,{ref:e,muted:!0,style:{position:"absolute",marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:9,width:640,height:480}}),r.a.createElement("canvas",{ref:t,style:{position:"absolute",marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:8,width:640,height:480}})))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(S,null)),document.getElementById("root"))}},[[247,1,2]]]);
//# sourceMappingURL=main.23c8d678.chunk.js.map