"use strict";(self.webpackChunkfastdish=self.webpackChunkfastdish||[]).push([[78],{4078:function(e,a,r){r.r(a),r.d(a,{default:function(){return $}});var n=r(4942),t=r(3433),i=r(5861),s=r(9439),l=r(7757),c=r.n(l),o=r(2791),u=r(9062),p=r(2813),d=r(3086),_=r(7496),m=r(3695),h=r(9389),f=r(6106),g=r(914),x=r(3099),v=r(7528),Z=r(7309),j=r(8243),b=r(1549),w=r(2622),C=r(4492),N=r(3108),P=r(7834),y=r(1872),k=r(3178),M=r(8742),z=r(8730),F=r(1694),I=r.n(F),S="VisualizeRecipeForm_visualize__8-kTP",V="VisualizeRecipeForm_visualize__title__XRxtX",T="VisualizeRecipeForm_visualize__input__V5UV9",R="VisualizeRecipeForm_visualize__form__iVE2x",q="VisualizeRecipeForm_servings_input__sY4nd",E="VisualizeRecipeForm_input__HStk9",L="VisualizeRecipeForm_label__EjFjS",A="VisualizeRecipeForm_button__al5tM",U="VisualizeRecipeForm_submit_btn__A-L3K",D="VisualizeRecipeForm_ingredients_tags__ahUd1",J="VisualizeRecipeForm_upload__3ypkJ",O="VisualizeRecipeForm_upload__after__n8Lva",X="VisualizeRecipeForm_instruction__azMw4",H="VisualizeRecipeForm_instruction__delete__hmIw0",Q="VisualizeRecipeForm_instruction__step__WlnI0",B=r(184),Y=p.Z.Title,K=p.Z.Text,W=d.Z.Dragger,$=function(){var e=(0,o.useState)(null),a=(0,s.Z)(e,2),r=a[0],l=a[1],p=(0,o.useState)(""),d=(0,s.Z)(p,2),F=d[0],$=d[1],G=(0,o.useState)([]),ee=(0,s.Z)(G,2),ae=ee[0],re=ee[1],ne=(0,o.useState)(""),te=(0,s.Z)(ne,2),ie=te[0],se=te[1],le=(0,o.useState)([]),ce=(0,s.Z)(le,2),oe=ce[0],ue=ce[1],pe=(0,o.useState)(null),de=(0,s.Z)(pe,2),_e=de[0],me=de[1],he=(0,y.Z)("(max-width: 992px)"),fe=_.Z.useForm(),ge=(0,s.Z)(fe,1)[0],xe=(0,P.a)().userAuth,ve=(0,C.Rw)(),Ze=(0,s.Z)(ve,2),je=Ze[0],be=Ze[1].isLoading,we=function(){var e=(0,i.Z)(c().mark((function e(a){var r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,k.y)(a.file);case 2:r=e.sent,l(r),me(a.file);case 5:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),Ce=function(){var e=(0,i.Z)(c().mark((function e(a){var r,n,t,i,s,o;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=60*a.time.hour+a.time.min,n=ae.join(",").replace(/,/g,"\n"),t=oe.join(",").replace(/,/g,"\n"),(i=new FormData).append("backgroundImage","background2"),i.append("mask","ellipseMask"),Object.keys(a).forEach((function(e){i.append(e,a[e]),i.set("readyInMinutes",r),i.set("image",_e),i.set("ingredients",n),i.set("instructions",t)})),m.ZP.loading("Loading card"),e.next=10,je(i).unwrap();case 10:return s=e.sent,o=s.url,e.next=14,(0,u.ET)((0,u.hJ)(N.U,"posts"),{title:a.title,url:o,likes:0,liked:[],author:{id:xe.uid,name:xe.displayName,avatar:xe.photoURL}});case 14:ge.resetFields(),re([]),ue([]),l(null),m.ZP.success("Card created");case 19:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return(0,B.jsxs)("div",{className:S,children:[(0,B.jsx)(Y,{className:V,level:1,children:"Visualize your recipe:"}),(0,B.jsxs)(_.Z,{className:R,layout:"vertical",onFinish:Ce,scrollToFirstError:{behavior:"smooth",scrollMode:"always",block:"center",inline:"center"},form:ge,initialValues:{time:{hour:0,min:0},servings:1,fontColor:"#000"},children:[(0,B.jsx)(_.Z.Item,{name:"title",rules:[{required:!0,validateTrigger:"onSubmit",message:"Please enter a visualize recipe name"},{required:!0,message:"Symbols should not be in the name",pattern:/^[A-Za-z0-9/\s]*$/},{required:!0,message:"The name cannot be empty",whitespace:!0}],wrapperCol:{span:24},children:(0,B.jsx)(h.Z,{type:"text",className:I()(T,E),placeholder:"Visualize recipe name",autoComplete:"off"})}),(0,B.jsxs)(f.Z,{gutter:16,children:[(0,B.jsxs)(g.Z,{xs:24,lg:12,children:[(0,B.jsx)(_.Z.Item,{name:"ingredients",label:(0,B.jsx)("span",{className:L,children:"Ingredients"}),rules:[{required:!0,validateTrigger:"onSubmit",validator:function(){var e=(0,i.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(ae.length){e.next=2;break}return e.abrupt("return",Promise.reject(new Error("Please specify the ingredients")));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{validateTrigger:"onChange",validator:function(){var e=(0,i.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!ae.includes(F.trim())){e.next=2;break}return e.abrupt("return",Promise.reject(new Error("There is already such an ingredient")));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}],wrapperCol:{span:24},children:(0,B.jsx)(h.Z,{disabled:9===ae.length,placeholder:"Ingredients",size:"large",className:E,autoComplete:"off",suffix:(0,B.jsx)(b.Z,{onClick:function(){null!==F&&void 0!==F&&F.trim()&&!ae.includes(F.trim())&&(re([].concat((0,t.Z)(ae),[F])),$(""),ge.resetFields(["ingredients"]))}}),value:F,onChange:function(e){return $(e.target.value)}})}),(0,B.jsx)("div",{className:D,children:(0,B.jsx)(x.Z,{wrap:!0,children:ae.map((function(e){return(0,B.jsx)(v.Z,{closable:!0,onClose:function(){return function(e){var a=ae.filter((function(a){return a!==e}));re(a)}(e)},children:e},e)}))})})]}),(0,B.jsxs)(g.Z,{xs:24,lg:12,children:[(0,B.jsx)(_.Z.Item,{name:"instructions",required:!0,label:(0,B.jsx)("span",{className:L,children:"Instructions"}),rules:[{validateTrigger:"onSubmit",validator:function(){var e=(0,i.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(oe.length){e.next=2;break}return e.abrupt("return",Promise.reject(new Error("Please specify the instructions")));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{validateTrigger:"onChange",validator:function(){var e=(0,i.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!oe.includes(ie.trim())){e.next=2;break}return e.abrupt("return",Promise.reject(new Error("There is already such an instruction")));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}],wrapperCol:{span:24},children:(0,B.jsx)(h.Z.TextArea,{disabled:6===oe.length,showCount:!0,className:E,maxLength:250,placeholder:"Specify the instructions",size:"large",autoComplete:"off",value:ie,onChange:function(e){return se(e.target.value)}})}),(0,B.jsx)(f.Z,{justify:"end",children:(0,B.jsx)(Z.Z,{disabled:ie.length<1||6===oe.length||!ie.trim(),size:he?"middle":"small",className:A,onClick:function(){null!==ie&&void 0!==ie&&ie.trim()&&!oe.includes(ie.trim())&&(ue([].concat((0,t.Z)(oe),[ie])),se(""),ge.resetFields(["instructions"]))},children:"Add"})}),oe.map((function(e,a){return(0,B.jsxs)(K,{className:X,children:[(0,B.jsxs)("span",{className:Q,children:[(0,B.jsx)(w.Z,{className:H,onClick:function(){return function(e){var a=oe.filter((function(a){return a!==e}));ue(a)}(e)}}),"Step ",a+1,":"," "]}),e]},e)}))]})]}),(0,B.jsxs)(f.Z,{align:"middle",justify:"space-between",gutter:16,children:[(0,B.jsx)(g.Z,{xs:24,lg:12,children:(0,B.jsx)(_.Z.Item,{name:"time",label:(0,B.jsx)("span",{className:L,children:"Time for preparing"}),rules:[{required:!0,validateTrigger:"onSubmit",validator:function(){var e=(0,i.Z)(c().mark((function e(a,r){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==r.hour||0!==r.min){e.next=2;break}return e.abrupt("return",Promise.reject(new Error("Specify the correct time")));case 2:case"end":return e.stop()}}),e)})));return function(a,r){return e.apply(this,arguments)}}()}],children:(0,B.jsx)(z.Z,{})})}),(0,B.jsx)(g.Z,{xs:24,lg:12,children:(0,B.jsx)(_.Z.Item,{name:"servings",label:(0,B.jsx)("span",{className:L,children:"Servings"}),rules:[{required:!0,message:"Please indicate how many servings"}],children:(0,B.jsx)(j.Z,{className:I()(q,E),type:"number",size:"large",min:1,max:10,placeholder:"How many servings",autoComplete:"off"})})})]}),(0,B.jsx)(_.Z.Item,{name:"image",valuePropName:"filelist",label:(0,B.jsx)("span",{className:L,children:"Image of the finished dish"}),rules:[{required:!0,message:"Please select a image"}],children:(0,B.jsx)(W,{name:"file",className:I()(J,(0,n.Z)({},O,r)),beforeUpload:function(){return!1},showUploadList:!1,accept:".png,.jpeg,.jpg",onChange:we,disabled:be,children:(0,B.jsx)(M.Z,{uploadedImage:r})})}),(0,B.jsxs)(f.Z,{gutter:16,children:[(0,B.jsx)(g.Z,{xs:24,lg:12,children:(0,B.jsx)(_.Z.Item,{name:"author",label:(0,B.jsx)("span",{className:L,children:"Author"}),rules:[{required:!0,message:"Please specify the author"}],children:(0,B.jsx)(h.Z,{placeholder:"Specify the author",size:"large",autoComplete:"off",className:E})})}),(0,B.jsx)(g.Z,{xs:24,lg:12,children:(0,B.jsx)(_.Z.Item,{name:"fontColor",label:(0,B.jsx)("span",{className:L,children:"Font color"}),children:(0,B.jsx)(h.Z,{className:E,type:"color",placeholder:"Specify the font color",size:"large",autoComplete:"off"})})})]}),(0,B.jsx)(f.Z,{justify:"center",children:(0,B.jsx)(_.Z.Item,{children:(0,B.jsx)(Z.Z,{type:"primary",htmlType:"submit",disabled:be,size:"large",className:U,children:"Save"})})})]})]})}},8742:function(e,a,r){var n=r(4942),t=r(1992),i=r(8817),s=r(2351),l=r(1694),c=r.n(l),o=r(7790),u=r(184);a.Z=function(e){var a=e.uploadedImage,r=e.isUploadLoading,l=e.percentLoading;return a?(0,u.jsxs)("div",{className:o.Z.preview,children:[(0,u.jsx)(t.Z,{className:c()(o.Z.preview__image,(0,n.Z)({},o.Z.image__blur,!r)),preview:!1,src:a}),r&&(0,u.jsx)("div",{className:o.Z.preview__progress,children:(0,u.jsx)(i.Z,{type:"circle",percent:l,strokeColor:"#e27d60"})}),!r&&(0,u.jsxs)("div",{className:o.Z.preview__body,children:[(0,u.jsx)("p",{className:o.Z.text,children:(0,u.jsx)(s.Z,{className:o.Z.icon_upload})}),(0,u.jsx)("p",{className:o.Z.text,children:"Add photo (upload)"}),(0,u.jsx)("p",{className:o.Z.text,children:"Drag photos here or click on the icon"})]})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("p",{className:"ant-upload-text",children:(0,u.jsx)(s.Z,{})}),(0,u.jsx)("p",{className:"ant-upload-text",children:"Add photo (upload)"}),(0,u.jsx)("p",{className:"ant-upload-hint",children:"Drag photos here or click on the icon"})]})}},8730:function(e,a,r){r.d(a,{Z:function(){return p}});var n=r(1413),t=r(9439),i=r(2791),s=r(3099),l=r(9389),c="TimeInput_input_time__0Od-C",o="TimeInput_input_span__ireST",u=r(184),p=function(e){var a=e.value,r=void 0===a?{}:a,p=e.onChange,d=(0,i.useState)(0),_=(0,t.Z)(d,2),m=_[0],h=_[1],f=(0,i.useState)(0),g=(0,t.Z)(f,2),x=g[0],v=g[1],Z=function(e){null===p||void 0===p||p((0,n.Z)((0,n.Z)({hour:m,min:x},r),e))};return(0,u.jsxs)(s.Z,{align:"baseline",children:[(0,u.jsx)(l.Z,{size:"large",type:"number",min:0,max:10,value:r.hour||m,onChange:function(e){var a=parseInt(e.target.value||"0",10);Number.isNaN(m)||("hour"in r||h(a),Z(a>10?{hour:10}:{hour:a}))},className:c}),(0,u.jsx)("span",{className:o,children:"hour"}),(0,u.jsx)(l.Z,{size:"large",type:"number",min:0,max:59,value:r.min||x,onChange:function(e){var a=parseInt(e.target.value||"0",10);Number.isNaN(x)||("min"in r||v(a),Z(a>59?{min:59}:{min:a}))},className:c}),(0,u.jsx)("span",{className:o,children:"min"})]})}},7790:function(e,a){a.Z={createMealPlan__wrapper:"CreateMealPlan_createMealPlan__wrapper__aQB5M",createMealPlan__title:"CreateMealPlan_createMealPlan__title__8V86X",createMealPlan__input:"CreateMealPlan_createMealPlan__input__ludkT",createMealPlan__form:"CreateMealPlan_createMealPlan__form__nt0ok",input:"CreateMealPlan_input__suwq6",label:"CreateMealPlan_label__tkhjo",input_span:"CreateMealPlan_input_span__Nq-sZ",upload_container:"CreateMealPlan_upload_container__mi-R2",upload:"CreateMealPlan_upload__lZUjH",preview__body:"CreateMealPlan_preview__body__qOrrv",image__blur:"CreateMealPlan_image__blur__FX3sV",icon_close:"CreateMealPlan_icon_close__9LF5S",upload__loading:"CreateMealPlan_upload__loading__F9NhN",upload__after:"CreateMealPlan_upload__after__IvDel",submit_btn:"CreateMealPlan_submit_btn__esn8t",preview:"CreateMealPlan_preview__YL7MB",preview__image:"CreateMealPlan_preview__image__icQCJ",preview__progress:"CreateMealPlan_preview__progress__zc3wP",text:"CreateMealPlan_text__5JIOQ",icon_upload:"CreateMealPlan_icon_upload__EE7Sw"}}}]);
//# sourceMappingURL=78.6f901804.chunk.js.map