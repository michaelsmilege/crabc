(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-88a5ed08"],{"3e1f":function(t,e,n){"use strict";n.r(e);var i=n("680a"),a=n("5530"),o=n("2f62"),s={name:"Account",mixins:[{computed:Object(a.a)(Object(a.a)({},Object(o.b)({layout:function(t){return t.app.layout},navTheme:function(t){return t.app.theme},primaryColor:function(t){return t.app.color},colorWeak:function(t){return t.app.weak},fixedHeader:function(t){return t.app.fixedHeader},fixedSidebar:function(t){return t.app.fixedSidebar},contentWidth:function(t){return t.app.contentWidth},autoHideHeader:function(t){return t.app.autoHideHeader},isMobile:function(t){return t.app.isMobile},sideCollapsed:function(t){return t.app.sideCollapsed},multiTab:function(t){return t.app.multiTab}})),{},{isTopMenu:function(){return"topmenu"===this.layout}}),methods:{isSideMenu:function(){return!this.isTopMenu}}}],components:{RouteView:i.c},data:function(){return{mode:"inline",openKeys:["sub1","sub2","sub3","sub4","sub5"],selectedKeys:[],list:[{title:"数据源",key:"sub2",children:[{name:"数据源",icon:"database",url:"DataSource"}]},{title:"应用管理",key:"sub3",children:[{name:"应用列表",icon:"appstore",url:"Application"}]},{title:"接口管理",key:"sub4",children:[{name:"接口列表",icon:"api",url:"MyApi"}]},{title:"安全策略",key:"sub5",children:[{name:"流控规则",icon:"sliders",url:"Flow"},{name:"接口日志",icon:"file-search",url:"UseLogList"}]}],defUrl:"",user:{nickname:""}}},beforeRouteEnter:function(t,e,n){n((function(t){t.defUrl=t.$route.meta.val}))},watch:{$route:function(t,e){this.defUrl=this.$route.meta.val}},created:function(){this.user.nickname=this.$store.state.user.info.nickname},methods:{onOpenChange:function(t){this.openKeys=t},openChange:function(){},goto:function(t){this.defUrl=t.url,this.$router.push({name:t.url})}}},r=(n("925c"),n("2877")),u=Object(r.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"account-page-main"},[n("a-card",{style:{height:"100%"},attrs:{bordered:!1,bodyStyle:{padding:"16px 0",height:"100%"}}},[n("div",{staticClass:"account-settings-info-main",class:{mobile:t.isMobile}},[n("div",{staticClass:"account-settings-info-left"},[n("a-menu",{style:{border:"0",width:t.isMobile?"560px":"auto"},attrs:{mode:t.isMobile?"horizontal":"inline","open-keys":t.openKeys,type:"inner"},on:{openChange:t.onOpenChange}},t._l(t.list,(function(e){return n("a-sub-menu",{key:e.key},[n("span",{staticClass:"menu-title",attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))]),t._l(e.children,(function(e){return n("a-menu-item",{key:e.url,staticClass:"account-list-item",class:t.defUrl==e.url?"active":"",on:{click:function(n){return t.goto(e)}}},[n("a-icon",{attrs:{type:e.icon}}),t._v(t._s(e.name)+" ")],1)}))],2)})),1)],1),n("div",{staticClass:"account-settings-info-right"},[n("div",{staticClass:"account-settings-info-title"},[this.$route.meta.detail?n("span",[n("router-link",{attrs:{to:{name:this.$route.meta.val}}},[n("a-icon",{staticStyle:{"font-size":"16px",cursor:"pointer",color:"#545c70"},attrs:{type:"arrow-left"}})],1),n("a-divider",{attrs:{type:"vertical"}})],1):t._e(),n("span",[t._v(" "+t._s(t.$t(t.$route.meta.title))+" ")])]),n("route-view")],1)])])],1)])}),[],!1,null,"1fa5638a",null);e.default=u.exports},7992:function(t,e,n){},"925c":function(t,e,n){"use strict";n("7992")}}]);