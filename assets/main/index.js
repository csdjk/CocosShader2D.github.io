System.register("chunks:///_virtual/Controller.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){"use strict";var n,t,o,r,i,s,l,c,a,u,p;return{setters:[function(e){n=e.applyDecoratedDescriptor,t=e.inheritsLoose,o=e.initializerDefineProperty,r=e.assertThisInitialized},function(e){i=e.cclegacy,s=e._decorator,l=e.Button,c=e.Label,a=e.Node,u=e.director,p=e.Component}],execute:function(){var f,d,v,h,S,b,g,y,m,L,x,E;i._RF.push({},"8300fHNR3FHobkLKp88a3Lw","Controller",void 0);var B=s.ccclass,O=s.property,N=s.executeInEditMode,D=s.disallowMultiple;e("Controller",(f=B("Controller"),d=N(!0),v=D(!0),h=O(l),S=O(l),b=O(c),f(g=d(g=v(((E=function(e){function n(){for(var n,t=arguments.length,i=new Array(t),s=0;s<t;s++)i[s]=arguments[s];return n=e.call.apply(e,[this].concat(i))||this,o(n,"nextButton",m,r(n)),o(n,"prevButton",L,r(n)),o(n,"currentSceneLabel",x,r(n)),n}t(n,e);var i=n.prototype;return i.onEnable=function(){var e,n;null==(e=this.nextButton)||e.node.on(a.EventType.MOUSE_DOWN,this.onLoadNextScene,this),null==(n=this.prevButton)||n.node.on(a.EventType.MOUSE_DOWN,this.onLoadPrevScene,this);var t=u.getScene().name;this.currentSceneLabel.string=t},i.onDisable=function(){var e,n;null==(e=this.nextButton)||e.node.off(a.EventType.MOUSE_DOWN,this.onLoadNextScene,this),null==(n=this.prevButton)||n.node.off(a.EventType.MOUSE_DOWN,this.onLoadPrevScene,this)},i.onFocusInEditor=function(){},i.onLoadNextScene=function(){var e=u.getScene().name,t=n.scenes.indexOf(e);t<n.scenes.length-1?t++:t=0,console.log(n.scenes[t]),u.loadScene(n.scenes[t])},i.onLoadPrevScene=function(){var e=u.getScene().name,t=n.scenes.indexOf(e);t>0?t--:t=n.scenes.length-1,console.log(n.scenes[t]),u.loadScene(n.scenes[t])},n}(p)).scenes=["sprite-shv","sprite-flow","sprite-mask","sprite-mask-front","sprite-mask-universal","sprite-mask-universal2","sprite-glitchArt","sprite-zoom","sprite-mosaic","sprite-distortion","sprite-outline"],m=n((y=E).prototype,"nextButton",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),L=n(y.prototype,"prevButton",[S],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),x=n(y.prototype,"currentSceneLabel",[b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),g=y))||g)||g)||g));i._RF.pop()}}}));

System.register("chunks:///_virtual/EffectController.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){"use strict";var t,r,n,i,o,a,l,u,s,c,p,h,m,b,f,g,v,d,y,C,V,P;return{setters:[function(e){t=e.applyDecoratedDescriptor,r=e.inheritsLoose,n=e.initializerDefineProperty,i=e.assertThisInitialized},function(e){o=e.cclegacy,a=e._decorator,l=e.Enum,u=e.Color,s=e.CCInteger,c=e.Vec4,p=e.Texture2D,h=e.CCBoolean,m=e.Material,b=e.Layout,f=e.Prefab,g=e.Sprite,v=e.instantiate,d=e.Label,y=e.Button,C=e.EventHandler,V=e.Slider,P=e.Component}],execute:function(){var w,E,M,N,I,x,z,T,S,R,k,D,F,L,A,B,H,_,j,O,q,G,K,U,Z,J,Q,W,X,Y,$,ee,te,re,ne,ie,oe,ae;o._RF.push({},"5eabfnjIwhFmqOHvHs0AvZ+","EffectController",void 0);var le,ue=a.ccclass,se=a.property,ce=a.executeInEditMode,pe=a.disallowMultiple;!function(e){e[e.Color=0]="Color",e[e.Number=1]="Number",e[e.RangeNumber=2]="RangeNumber",e[e.Vector=3]="Vector",e[e.Texture=4]="Texture"}(le||(le={})),l(le);var he=(w=ue("MaterialProperty"),E=se(String),M=se({type:le}),N=se({type:[u],visible:function(){return this.type==le.Color}}),I=se({type:s,range:[1,4,1],visible:function(){return this.type==le.Vector}}),x=se({type:c,visible:function(){return this.type==le.Vector}}),z=se({type:p,visible:function(){return this.type==le.Texture}}),T=se({type:Number,visible:function(){return this.type==le.Number||this.type==le.RangeNumber}}),S=se({type:Number,visible:function(){return this.type==le.RangeNumber||this.type==le.Vector}}),R=se({type:Number,visible:function(){return this.type==le.RangeNumber||this.type==le.Vector}}),w((F=t((D=function(){function e(e){n(this,"name",F,this),n(this,"type",L,this),n(this,"colorValue",A,this),n(this,"sliderCount",B,this),n(this,"vectorValue",H,this),n(this,"textureValue",_,this),n(this,"numberValue",j,this),n(this,"min",O,this),n(this,"max",q,this)}var t=e.prototype;return t.progressToValue=function(e){return this.min+(this.max-this.min)*e},t.valueToProgress=function(e){return void 0!==e?(e-this.min)/(this.max-this.min):(this.numberValue-this.min)/(this.max-this.min)},e}()).prototype,"name",[E],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),L=t(D.prototype,"type",[M],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return le.RangeNumber}}),A=t(D.prototype,"colorValue",[N],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[u.BLACK,u.GREEN]}}),B=t(D.prototype,"sliderCount",[I],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 4}}),H=t(D.prototype,"vectorValue",[x],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new c}}),_=t(D.prototype,"textureValue",[z],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),j=t(D.prototype,"numberValue",[T],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),O=t(D.prototype,"min",[S],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),q=t(D.prototype,"max",[R],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),k=D))||k);e("EffectController",(G=ue("EffectController"),K=ce(!0),U=pe(!0),Z=se(h),J=se({type:m,visible:function(){return this.addMaterial}}),Q=se([he]),W=se(b),X=se(f),Y=se(f),G($=K($=U((te=t((ee=function(e){function t(){for(var t,r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return t=e.call.apply(e,[this].concat(o))||this,n(t,"addMaterial",te,i(t)),n(t,"materialList",re,i(t)),n(t,"properties",ne,i(t)),n(t,"valueItemContainer",ie,i(t)),n(t,"colorPrefab",oe,i(t)),n(t,"rangeNumberPrefab",ae,i(t)),t.material=void 0,t.propertiesMap=new Map,t}r(t,e);var o=t.prototype;return o.onFocusInEditor=function(){this.clear(),this.init()},o.onEnable=function(){this.clear(),this.init()},o.onDisable=function(){this.clear()},o.init=function(){var e,t,r=this;null!=this.valueItemContainer&&0!=this.properties.length&&(this.material=null==(e=this.node.getComponent(g))?void 0:e.sharedMaterial,this.propertiesMap.clear(),this.properties.forEach((function(e){r.propertiesMap.set(e.name,e)})),null==(t=this.properties)||t.forEach((function(e,t){r.createValueItem(e)})))},o.clear=function(){var e,t;null==(e=this.valueItemContainer)||e.node.destroyAllChildren(),null==(t=this.valueItemContainer)||t.node.removeAllChildren(),this.propertiesMap.clear()},o.setMaterialProperty=function(e,t){var r;null==(r=this.material)||r.setProperty(e,t),this.materialList.forEach((function(r){null==r||r.setProperty(e,t)}))},o.createValueItem=function(e){switch(e.type){case le.Color:this.initColor(e);break;case le.Number:break;case le.RangeNumber:this.initSlider(e);break;case le.Vector:this.initVectorSlider(e);break;case le.Texture:break;default:console.error("Unknown property type: "+e.type)}},o.initColor=function(e){var t=this;if(this.colorPrefab){var r=v(this.colorPrefab);this.valueItemContainer.node.addChild(r),r.active=!0,r.getComponentsInChildren(d)[0].string=e.name,this.setMaterialProperty(e.name,e.colorValue[0]);var n=r.getComponentInChildren(b),i=r.children[0];i.active=!1,e.colorValue.forEach((function(r,o){var a=v(i);a.active=!0,a.parent=n.node,a.getComponent(g).color=r;var l=a.getComponent(y);l.transition=y.Transition.NONE;var u=new C;u.target=t.node,u.component="EffectController",u.handler="onColorChangeValue",u.customEventData=e.name,l.clickEvents.push(u)}))}else console.error("numberPrefab is null")},o.onColorChangeValue=function(e,t){var r=this.propertiesMap.get(t),n=e.target.getComponent(g).color;r.colorValue[0]=n,this.setMaterialProperty(r.name,n)},o.initSlider=function(e){if(this.rangeNumberPrefab){var t=v(this.rangeNumberPrefab);this.valueItemContainer.node.addChild(t),t.active=!0;var r=t.getComponentsInChildren(d);r[0].string=e.name,r[1].string=e.numberValue.toFixed(2),this.setMaterialProperty(e.name,e.numberValue);var n=t.getComponent(V);n.progress=e.valueToProgress();var i=new C;i.target=this.node,i.component="EffectController",i.handler="onSliderChangeValue",i.customEventData=e.name,null==n||n.slideEvents.push(i)}else console.error("numberPrefab is null")},o.onSliderChangeValue=function(e,t){var r=this.propertiesMap.get(t),n=r.progressToValue(e.progress);this.setMaterialProperty(r.name,n),e.getComponentsInChildren(d)[1].string=n.toFixed(2)},o.initVectorSlider=function(e){for(var t=e.vectorValue,r=["x","y","z","w"],n=0;n<e.sliderCount;n++){var i=r[n],o=t[i],a=v(this.rangeNumberPrefab);this.valueItemContainer.node.addChild(a),a.active=!0;var l=a.getComponentsInChildren(d);l[0].string=e.name+"."+i,l[1].string=o.toFixed(2);var u=a.getComponent(V);u.progress=e.valueToProgress(o);var s=new C;s.target=this.node,s.component="EffectController",s.handler="onVectorSliderChangeValue",s.customEventData=e.name+"."+i,null==u||u.slideEvents.push(s)}this.setMaterialProperty(e.name,t)},o.onVectorSliderChangeValue=function(e,t){var r=t.split("."),n=r[0],i=this.propertiesMap.get(n),o=i.progressToValue(e.progress);e.getComponentsInChildren(d)[1].string=o.toFixed(2);var a=r[1],l=i.vectorValue;l[a]=o,this.setMaterialProperty(i.name,l)},t}(P)).prototype,"addMaterial",[Z],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),re=t(ee.prototype,"materialList",[J],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),ne=t(ee.prototype,"properties",[Q],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),ie=t(ee.prototype,"valueItemContainer",[W],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),oe=t(ee.prototype,"colorPrefab",[X],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),ae=t(ee.prototype,"rangeNumberPrefab",[Y],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),$=ee))||$)||$)||$));o._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./Controller.ts","./EffectController.ts","./SpriteMask.ts","./SpriteZoom.ts"],(function(){"use strict";return{setters:[null,null,null,null],execute:function(){}}}));

System.register("chunks:///_virtual/SpriteMask.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){"use strict";var t,i,n,r,o,a,l,s,u,c,p,f,h;return{setters:[function(e){t=e.applyDecoratedDescriptor,i=e.inheritsLoose,n=e.initializerDefineProperty,r=e.assertThisInitialized},function(e){o=e.cclegacy,a=e._decorator,l=e.Material,s=e.Texture2D,u=e.Sprite,c=e.Node,p=e.view,f=e.Vec2,h=e.Component}],execute:function(){var d,y,b,g,m,v,M,E,z,w,S,x,T;o._RF.push({},"ecf0f/zAL5GtKt8rqRIhmEQ","SpriteMask",void 0);var _=a.ccclass,k=a.property,D=a.executeInEditMode,I=a.disallowMultiple;e("SpriteMask",(d=_("SpriteMask"),y=D(!0),b=I(!0),g=k(l),m=k(s),v=k({range:[.01,.5],slide:!0,step:.01}),M=k({range:[0,.2],slide:!0,step:.01}),d(E=y(E=b((w=t((z=function(e){function t(){for(var t,i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return t=e.call.apply(e,[this].concat(o))||this,n(t,"material",w,r(t)),n(t,"frontTexture",S,r(t)),n(t,"size",x,r(t)),n(t,"smoothness",T,r(t)),t}i(t,e);var o=t.prototype;return o.start=function(){},o.onEnable=function(){var e=this.getComponent(u);this.material=e.sharedMaterial,this.node.on(c.EventType.MOUSE_MOVE,(function(e){if(0===e.getButton()){var t=e.getLocation();this.updateZoomCenter(t)}}),this)},o.onDisable=function(){this.node.off(c.EventType.MOUSE_MOVE)},o.updateZoomCenter=function(e){var t,i=p.getVisibleSize(),n=new f(e.x/i.width,e.y/i.height);n.y=1-n.y,null==(t=this.material)||t.setProperty("center",n)},o.onFocusInEditor=function(){console.log("onFocusInEditor")},o.update=function(e){},t}(h)).prototype,"material",[g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),S=t(z.prototype,"frontTexture",[m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),x=t(z.prototype,"size",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.3}}),T=t(z.prototype,"smoothness",[M],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.01}}),E=z))||E)||E)||E));o._RF.pop()}}}));

System.register("chunks:///_virtual/SpriteZoom.ts",["./rollupPluginModLoBabelHelpers.js","cc","./env"],(function(e){"use strict";var t,i,o,n,r,a,l,c,u,s,p,f,d;return{setters:[function(e){t=e.applyDecoratedDescriptor,i=e.inheritsLoose,o=e.initializerDefineProperty,n=e.assertThisInitialized},function(e){r=e.cclegacy,a=e._decorator,l=e.Material,c=e.Sprite,u=e.Node,s=e.view,p=e.Vec2,f=e.Component},function(e){d=e.EDITOR}],execute:function(){var g,m,h,y,b,v,E,z,w,M,S,F,I;r._RF.push({},"e8d24Ba3atBBI8tZ8ltP3Bs","SpriteZoom",void 0);var Z=a.ccclass,B=a.property,D=a.executeInEditMode,O=a.disallowMultiple;e("SpriteZoom",(g=Z("SpriteZoom"),m=D(!0),h=O(!0),y=B(l),b=B({range:[.01,.5],slide:!0,step:.01}),v=B({range:[0,.2],slide:!0,step:.01}),E=B({range:[-2,2],slide:!0,step:.01}),g(z=m(z=h((M=t((w=function(e){function t(){for(var t,i=arguments.length,r=new Array(i),a=0;a<i;a++)r[a]=arguments[a];return t=e.call.apply(e,[this].concat(r))||this,o(t,"material",M,n(t)),o(t,"size",S,n(t)),o(t,"edgeFactor",F,n(t)),o(t,"zoomFactor",I,n(t)),t}i(t,e);var r=t.prototype;return r.start=function(){},r.onEnable=function(){var e=this.getComponent(c);this.material=e.sharedMaterial,this.node.on(u.EventType.MOUSE_MOVE,(function(e){if(0===e.getButton()){var t=e.getLocation();this.updateZoomCenter(t)}}),this)},r.onDisable=function(){this.node.off(u.EventType.MOUSE_MOVE)},r.updateZoomCenter=function(e){var t,i=s.getVisibleSize(),o=new p(e.x/i.width,e.y/i.height);o.y=1-o.y,null==(t=this.material)||t.setProperty("center",o)},r.onFocusInEditor=function(){console.log("onFocusInEditor")},r.update=function(e){console.log("EDITOR:",d)},t}(f)).prototype,"material",[y],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),S=t(w.prototype,"size",[b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.3}}),F=t(w.prototype,"edgeFactor",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.1}}),I=t(w.prototype,"zoomFactor",[E],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.2}}),z=w))||z)||z)||z));r._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});