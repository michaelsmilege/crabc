(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-fe1ddd36"],{"3b60":function(e,t,a){"use strict";a("9c6a")},5987:function(e,t,a){"use strict";a("ac5c")},6152:function(e,t,a){"use strict";a.r(t);a("cd17");var s=a("ed3b"),r=(a("a9e3"),{props:{tableType:{},tabcolumns:{type:Array,default:function(){return[]}},tabData:{type:Array,default:function(){return[]}},tabScrollX:{type:Number,default:1e3},operationBtn:{type:Array,default:function(){return[]}},isRowSelection:{type:Boolean,default:!1},defaultHeight:{type:Boolean,default:!1},pageNo:{type:Number,default:1},pageSize:{type:Number,default:10},total:{type:Number,default:0},showHead:{type:Boolean,default:!0}},data:function(){return{inputVal:"",currentPage:1,showRowSelection:null}},computed:{rowSelection:function(){return{onChange:function(e,t){}}},pagination:function(){var e=this;return{showSizeChanger:!0,pageSizeOptions:["10","20","50","100"],showQuickJumper:!0,size:"small",pageSize:this.pageSize,total:this.total,current:this.pageNo,showTotal:function(e){return"共 ".concat(e," 条")},onChange:function(t,a){e.$emit("changePage",{current:t,pageSize:a})},onShowSizeChange:function(t,a){e.$emit("changePage",{current:t,pageSize:a})}}}},created:function(){this.isRowSelection?this.showRowSelection=this.rowSelection:this.showRowSelection=null},methods:{detail:function(e){this.$api.serviceDetail.goDetail(e.apiId,e.apiCode)},btnClick:function(e,t,a){var r=this;if(this.clickItem=a,"删除"===e.text)s.a.confirm({title:this.$t("删除"),content:this.$t("当前操作会删除该条数据，是否继续？"),onOk:function(){var a=e.clickFunName;r.$emit("clickFunName",a),r.$emit("tabItem",t)},onCancel:function(){}});else{var o=e.clickFunName;this.$emit("clickFunName",o),this.$emit("tabItem",t)}"关联数据源"===e.text&&(this.$emit("visibleUser",!0),this.$emit("openTypeData","management",t)),"关联用户"===e.text&&(this.$emit("visibleUser",!0),this.$emit("openTypeData","Consumer",t)),"解绑"===e.text&&s.a.confirm({title:this.$t("解绑"),content:this.$t("当前操作会解绑该条数据，是否继续？"),onOk:function(){r.$api.serApproval.outerListDel({dataSourceId:t.datasourceId}).then((function(e){0===e.code&&(r.$message.success("解绑成功"),r.$parent.getDatasource())}))},onCancel:function(){}})},onDataSource:function(e,t){var a=this;"instance"===e||"UP"===e||"DOWN"===e?(this.$emit("clickFunName",e),this.$emit("tabItem",t)):s.a.confirm({title:this.$t("解绑"),content:this.$t("当前操作会解绑该条数据，是否继续？"),onOk:function(){a.$api.serApproval.outerListDel({dataSourceId:t.datasourceId}).then((function(e){0===e.code&&(a.$message.success("解绑成功"),a.$parent.getDatasource())}))},onCancel:function(){}})}}}),o=(a("8a29"),a("2877")),i=Object(o.a)(r,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"consumer-components-box",class:{"consumer-components-defaul-height":e.defaultHeight}},[e.showHead?a("div",{staticClass:"consumer-components-head"},[e._t("default")],2):e._e(),a("div",{staticClass:"consumer-components-table"},[a("a-table",{attrs:{"row-key":function(e,t){return"consumer"+t},columns:e.tabcolumns,"data-source":e.tabData,"row-selection":e.showRowSelection,pagination:"管理范围"!=e.tableType&&e.pagination,scroll:{x:e.tabScrollX}},scopedSlots:e._u([{key:"dataSourceStatus",fn:function(t){return[a("div",{style:{color:"DOWN"===t?"#F01010":""}},[e._v(e._s("UP"===t?"正常":"DOWN"===t?"已下线":""))])]}},{key:"versionCode",fn:function(t,s){return[a("a-button",{attrs:{type:"link"},on:{click:function(t){return e.detail(s)}}},[e._v(e._s(t))])]}},{key:"operation",fn:function(t,s){return[e._l(e.operationBtn,(function(t,r){return a("span",{key:r},[a("a-button",{class:t.roleCtrl&&"1"==s.roleId?{}:{"red-color":"删除"==t.text},attrs:{disabled:"DOWN"===s.status&&"下线"===t.text||"UP"===s.status&&"上线"===t.text||t.roleCtrl&&"1"==s.roleId,type:t.buttontype},on:{click:function(a){return e.btnClick(t,s,r)}}},[e._v(e._s(t.text))])],1)})),e._t("morebtn",null,{data:s})]}}],null,!0)})],1)])}),[],!1,null,"de2e8386",null).exports,n=(a("b0c0"),a("b37a"),{data:function(){return{typeList:[{name:"SQL",list:[{name:"MySQL",value:"icon-shujukuleixingtubiao-kuozhan-1",datasourceType:"mysql"},{name:"Oracle",value:"icon-shujukuleixingtubiao-kuozhan-",datasourceType:"oracle"},{name:"SQLServer",value:"icon-SQLServer",datasourceType:"sqlserver"},{name:"PostgreSQL",value:"icon-postgre-sql",datasourceType:"postgresql"}]},{name:"NoSQL",list:[{name:"ElasticSearch",value:"icon-ElasticSearch-orange",datasourceType:"elasticsearch"}]}]}},computed:{},created:function(){},methods:{typeClick:function(e){switch(e.name){case"mongoDB":this.$message.warning("开发中");break;default:this.$emit("SqlType",e)}}}}),c=(a("cc713"),Object(o.a)(n,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"components-box"},e._l(e.typeList,(function(t,s){return a("div",{key:s,staticClass:"data-source-type"},[a("div",{staticClass:"data-source-type-title"},[e._v(e._s(t.name))]),e._l(t.list,(function(t,s){return a("div",{key:s,staticClass:"data-source-type-content"},[a("div",{staticClass:"data-source-content-child",on:{click:function(a){return e.typeClick(t)}}},[a("i",{staticClass:"iconfont",class:t.value}),e._v(" "+e._s(t.name)+" ")])])}))],2)})),0)}),[],!1,null,"182d4e75",null).exports),u=a("9816"),l={inject:["reload"],props:{sqlTypeName:{type:Object,default:function(){}},rowItem:{type:Object,default:function(){}}},watch:{},data:function(){return{formLayout:"horizontal",form:this.$form.createForm(this,{name:"coordinated"}),datasourceType:"",disableDatasource:!1,isRequiredpasswd:!0,isChecked:!1,key:"",public:""}},computed:{},created:function(){var e=this;this.sqlTypeName.datasourceType;this.isRequiredpasswd=!1,setTimeout((function(){if(e.rowItem){e.datasourceType=e.rowItem.datasourceType,e.disableDatasource=!0;var t=e.rowItem.enabled?JSON.parse(e.rowItem.enabled):null;setTimeout((function(){e.form.setFieldsValue({datasourceName:e.rowItem.datasourceName,remarks:e.rowItem.remarks,host:e.rowItem.host,port:e.rowItem.port,requestTimeout:t?t.requestTimeout:"",connectTimeout:t?t.connectTimeout:"",retryTime:t?t.retryTime:"",refreshInterval:t?t.refreshInterval:"",username:e.rowItem.username,password:e.rowItem.password})}),500)}else e.datasourceType=e.sqlTypeName.datasourceType}),100)},methods:{handleSubmit:function(e){var t=this;this.form.validateFields((function(a,s){a||t.getRsaPublic(s,e)}))},newDatasource:function(e){var t=this,a=e.password;"******"==a||(a=a?this.encryptedData(this.public,a):"");var s=new FormData;s.append("datasourceName",e.datasourceName||""),s.append("datasourceType",this.sqlTypeName.datasourceType||""),s.append("remarks",e.remarks||""),s.append("jdbcUrl",e.host+":"+e.port),s.append("host",e.host||""),s.append("port",e.port||""),s.append("extra.requestTimeout",e.requestTimeout||""),s.append("extra.connectTimeout",e.connectTimeout||""),s.append("extra.retryTime",e.retryTime||""),s.append("extra.refreshInterval",e.refreshInterval||""),s.append("extra.enableSecurity",this.isChecked?"Y":"N"),this.isChecked&&(s.append("username",e.username||""),s.append("password",a||""),s.append("key",this.key||"")),this.$api.account.newDatasource(s).then((function(e){e.data&&t.$message.success(e.data),t.reload()}))},updateDatasource:function(e){var t=this,a=e.password;"******"==a||(a=a?this.encryptedData(this.public,a):"");var s=new FormData;s.append("datasourceId",this.rowItem.datasourceId),s.append("datasourceName",e.datasourceName),s.append("datasourceType",this.sqlTypeName.datasourceType),s.append("remarks",e.remarks||""),s.append("jdbcUrl",e.host+":"+e.port),s.append("host",e.host||""),s.append("port",e.port||""),s.append("extra.requestTimeout",e.requestTimeout||""),s.append("extra.connectTimeout",e.connectTimeout||""),s.append("extra.retryTime",e.retryTime||""),s.append("extra.refreshInterval",e.refreshInterval||""),s.append("extra.enableSecurity",this.isChecked?"Y":"N"),this.isChecked&&(s.append("username",e.username||""),s.append("password",a||""),s.append("key",this.key)),this.$api.account.updateDatasource(s).then((function(e){e.data&&t.$message.success(e.data),t.reload()}))},testDatasource:function(){var e=this;this.form.validateFields((function(t,a){t||e.getRsaPublic(a,"测试连通性")}))},testDatasourceApi:function(e){var t=this,a=e.password;"******"==a||(a=a?this.encryptedData(this.public,a):"");var s=new FormData;s.append("datasourceId",this.rowItem?this.rowItem.datasourceId:""),s.append("datasourceName",e.datasourceName),s.append("datasourceType",this.sqlTypeName.datasourceType||this.rowItem.datasourceType),s.append("remarks",e.remarks||""),s.append("host",e.host||""),s.append("port",e.port||""),s.append("extra.requestTimeout",e.requestTimeout||""),s.append("extra.connectTimeout",e.connectTimeout||""),s.append("extra.retryTime",e.retryTime||""),s.append("extra.refreshInterval",e.refreshInterval||""),s.append("extra.enableSecurity",this.isChecked?"Y":"N"),this.isChecked&&(s.append("username",e.username||""),s.append("password",a||""),s.append("key",this.key)),this.$api.account.testDatasource(s).then((function(e){e.data&&t.$message.success(e.data)}))},onceClick:function(){this.form.setFieldsValue({password:""})},getRsaPublic:function(e,t){var a=this;this.$api.account.getRsaPublic().then((function(s){a.key=s.data.key,a.public=s.data.public,t&&"新增数据源"==t&&a.newDatasource(e),t&&"修改数据源"==t&&a.updateDatasource(e),t&&"测试连通性"==t&&a.public&&a.testDatasourceApi(e)}))},encryptedData:function(e,t){var a=new u.a;return a.setPublicKey(e),a.encrypt(t)},kerverosChange:function(e){this.isChecked=e}}},d=(a("3b60"),Object(o.a)(l,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"components-box"},[a("a-form",{attrs:{form:e.form,"label-col":{span:4},"wrapper-col":{span:18}},on:{submit:e.handleSubmit}},[a("a-form-item",{attrs:{label:"数据源名称"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["datasourceName",{rules:[{required:!0,message:"请输入数据源名称!"}]}],expression:"['datasourceName', { rules: [{ required: true, message: '请输入数据源名称!' }] }]"}],attrs:{oninput:"value=value.replace(/\\s/g,'')",placeholder:"请输入数据源名称"}})],1),a("a-form-item",{attrs:{label:"IP地址",extra:"多个IP使用,逗号分隔"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["host",{rules:[{required:!0,message:"请输入主机IP地址!"}]}],expression:"['host', { rules: [{ required: true, message: '请输入主机IP地址!' }] }]"}],attrs:{oninput:"value=value.replace(/\\s/g,'')",placeholder:"127.0.0.1"}})],1),a("a-form-item",{attrs:{label:"端口"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["port",{rules:[{required:!0,message:"请输入端口!"}]}],expression:"['port', { rules: [{ required: true, message: '请输入端口!' }] }]"}],attrs:{oninput:"value=value.replace(/\\s/g,'')",placeholder:"9200"}})],1),a("a-form-item",{attrs:{label:"认证用户名："}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["username",{rules:[{required:!1,message:"请输入用户名"}]}],expression:"['username', { rules: [{ required: false, message: '请输入用户名' }] }]"}],attrs:{placeholder:"请输入用户名"}})],1),a("a-form-item",{attrs:{label:"认证密码"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!1,message:"请输入密码"}]}],expression:"['password', { rules: [{ required: false, message: '请输入密码' }] }]"}],attrs:{oninput:"value=value.replace(/\\s/g,'')",placeholder:"请输入密码",type:"password",autocomplete:"new-password"},on:{"~click":function(t){return e.onceClick(t)}}})],1),a("a-form-item",{attrs:{label:"数据源描述"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["remarks",{rules:[{required:!1,message:"请输入数据源描述!"}]}],expression:"['remarks', { rules: [{ required: false, message: '请输入数据源描述!' }] }]"}],attrs:{placeholder:"请输入数据源描述"}})],1)],1)],1)}),[],!1,null,"6586a00c",null).exports),p={inject:["reload"],props:{sqlTypeName:{type:Object,default:function(){}},rowItem:{type:Object,default:function(){}}},components:{EsForm:d},data:function(){return{formLayout:"horizontal",form:this.$form.createForm(this,{name:"coordinated"}),datasourceType:"",disableDatasource:!1,jbcdplaceholder:"请输入JDBC地址",jdbcLable:"JDBC URL",isRequiredPasswd:!0,key:"",public:"",showPublicForm:!0}},computed:{},created:function(){var e=this;switch(this.sqlTypeName.datasourceType){case"mysql":this.jbcdplaceholder="jdbc:mysql://localhost:3306?useSSL=false&autoReconnect=true";break;case"oracle":this.jbcdplaceholder="jdbc:oracle:thin:@//localhost:1521/instanceName";break;case"sqlserver":this.jbcdplaceholder="jdbc:sqlserver://localhost:1433;DatabaseName=xxx;encrypt=false";break;case"postgresql":this.jbcdplaceholder="jdbc:postgresql://localhost:5432/database";break;case"elasticsearch":this.isRequiredPasswd=!1,this.showPublicForm=!1;break;default:this.jbcdplaceholder="请输入JDBC连接地址"}setTimeout((function(){switch(e.rowItem?e.rowItem.datasourceType:e.sqlTypeName.datasourceType){case"hive-hadoop2":e.isRequiredPasswd=!1}e.rowItem?(e.datasourceType=e.rowItem.datasourceType,e.disableDatasource=!0,e.form.setFieldsValue({datasourceCode:e.rowItem.datasourceCode,datasourceName:e.rowItem.datasourceName,jdbcUrl:e.rowItem.jdbcUrl,username:e.rowItem.username,password:e.rowItem.password,remarks:e.rowItem.remarks})):(e.form.setFieldsValue({jdbcUrl:e.jbcdplaceholder}),e.datasourceType=e.sqlTypeName.datasourceType)}),300)},methods:{handleSubmit:function(e){var t=this;this.form.validateFields((function(a,s){a||t.getRsaPublic(s,e)}))},modalConfim:function(){},newDatasource:function(e){var t=this,a=e.password;a=a?this.encryptedData(this.public,a):"";var s=new FormData;s.append("datasourceCode",e.datasourceCode),s.append("datasourceName",e.datasourceName),s.append("datasourceType",this.sqlTypeName.datasourceType),s.append("jdbcUrl",e.jdbcUrl),s.append("username",e.username||""),s.append("password",a||""),s.append("remarks",e.remarks||""),s.append("key",this.key),this.$api.account.newDatasource(s).then((function(e){e.data&&t.$message.success(e.data),t.reload()}))},updateDatasource:function(e){var t=this,a=e.password;a="******"==a?null:a?this.encryptedData(this.public,a):"";var s=new FormData;s.append("datasourceId",this.rowItem.datasourceId),s.append("datasourceCode",e.datasourceCode),s.append("datasourceName",e.datasourceName),s.append("datasourceType",this.sqlTypeName.datasourceType),s.append("jdbcUrl",e.jdbcUrl),s.append("username",e.username||""),s.append("password",a||""),s.append("remarks",e.remarks||""),s.append("key",this.key),this.$api.account.updateDatasource(s).then((function(e){e.data&&t.$message.success(e.data),t.reload()}))},testDatasource:function(){var e=this;this.$api.account.getRsaPublic().then((function(t){e.key=t.data.key,e.public=t.data.public,e.form.validateFields((function(t,a){if(!t){var s=a.password;s="******"==s?null:s?e.encryptedData(e.public,s):"";var r=new FormData;r.append("datasourceId",e.rowItem?e.rowItem.datasourceId:""),r.append("datasourceCode",a.datasourceCode),r.append("datasourceName",a.datasourceName),r.append("datasourceType",e.sqlTypeName.datasourceType||e.rowItem.datasourceType),r.append("jdbcUrl",a.jdbcUrl),r.append("username",a.username||""),r.append("password",s||""),r.append("remarks",a.remarks||""),r.append("key",e.key),e.$api.account.testDatasource(r).then((function(t){t.data&&e.$message.success(t.data)}))}}))}))},onceClick:function(){this.form.setFieldsValue({password:""})},getRsaPublic:function(e,t){var a=this;this.$api.account.getRsaPublic().then((function(s){a.key=s.data.key,a.public=s.data.public,"新增数据源"==t&&a.newDatasource(e),"修改数据源"==t&&a.updateDatasource(e)}))},encryptedData:function(e,t){var a=new u.a;return a.setPublicKey(e),a.encrypt(t)}}},m={name:"DataSource",inject:["reload"],components:{JurisdictionTable:i,DataSourceType:c,DataSourceEdit:Object(o.a)(p,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"components-box"},[e.showPublicForm?a("a-form",{attrs:{form:e.form,"label-col":{span:4},"wrapper-col":{span:18}},on:{submit:e.handleSubmit}},[a("a-form-item",{attrs:{label:"数据源名称"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["datasourceName",{rules:[{required:!0,message:"请输入数据源名称!"}]}],expression:"['datasourceName', { rules: [{ required: true, message: '请输入数据源名称!' }] }]"}],attrs:{placeholder:"请输入数据源名称"}})],1),a("a-form-item",{attrs:{label:e.jdbcLable}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["jdbcUrl",{rules:[{required:!0,message:"请输入JDBC URL!"}]}],expression:"['jdbcUrl', { rules: [{ required: true, message: '请输入JDBC URL!' }] }]"}],attrs:{oninput:"value=value.replace(/\\s/g,'')",placeholder:e.jbcdplaceholder}})],1),a("a-form-item",{attrs:{label:"用户名"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["username",{rules:[{required:e.isRequiredPasswd,message:"请输入用户名!"}]}],expression:"['username', { rules: [{ required: isRequiredPasswd, message: '请输入用户名!' }] }]"}],attrs:{oninput:"value=value.replace(/\\s/g,'')",placeholder:"请输入用户名",autocomplete:"off"}})],1),a("a-form-item",{attrs:{label:"密码"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:e.isRequiredPasswd,message:"请输入密码!"}]}],expression:"['password', { rules: [{ required: isRequiredPasswd, message: '请输入密码!' }] }]"}],attrs:{oninput:"value=value.replace(/\\s/g,'')",placeholder:"请输入密码",type:"password",autocomplete:"new-password"},on:{"~click":function(t){return e.onceClick(t)}}})],1),a("a-form-item",{attrs:{label:"数据源描述"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["remarks",{rules:[{required:!1,message:"请输入数据源描述!"}]}],expression:"['remarks', { rules: [{ required: false, message: '请输入数据源描述!' }] }]"}],attrs:{placeholder:"请输入数据源描述"}})],1)],1):e._e(),(this.rowItem?"elasticsearch"==this.rowItem.datasourceType:"elasticsearch"==this.sqlTypeName.datasourceType)?a("EsForm",{ref:"EsForm",attrs:{sqlTypeName:e.sqlTypeName,rowItem:e.rowItem}}):e._e()],1)}),[],!1,null,"b0e21dd0",null).exports},data:function(){return{visibleDataSource:!1,visibleDataSourceEdit:!1,visibleMetadata:!1,isRowSelection:null,isShow:!0,datasourceName:"",datasourceType:void 0,rowItem:{},pageNum:1,pageSize:10,total:0,clickFun:"",SqlTypeName:{},tabcolumns:[{title:"ID",dataIndex:"datasourceId",key:"datasourceId",width:80},{title:"名称",dataIndex:"datasourceName",key:"datasourceName",width:120,ellipsis:!0,scopedSlots:{customRender:"datasourceName"}},{title:"类型",dataIndex:"datasourceType",key:"datasourceType",width:110},{title:"连接信息",dataIndex:"jdbcUrl",key:"jdbcUrl",ellipsis:!0,width:300,scopedSlots:{customRender:"jdbcUrl"}},{title:"描述",dataIndex:"remarks",key:"remarks",width:110,ellipsis:!0},{title:"更新时间",dataIndex:"updateTime",key:"updateTime",width:150},{title:"操作",dataIndex:"operation",scopedSlots:{customRender:"operation"},width:160}],tabData:[],operationBtn:[{buttontype:"link",text:"编辑",clickFunName:"editFun"},{buttontype:"link",text:"删除",clickFunName:"deleteFun"}],selectOptionsOfRMDB:[{name:"mysql",value:"mysql"},{name:"oracle",value:"oracle"},{name:"sqlserver",value:"sqlserver"},{name:"postgresql",value:"postgresql"}],selectOptionsOfBigDataDB:[],selectOptionsOfNoSqlDB:[{name:"es",value:"elasticsearch"}],showPublicForm:!0}},created:function(){switch(this.getDatasource(),this.rowItem.datasourceType){case"elasticsearch":this.showPublicForm=!1}},methods:{getDatasource:function(){var e=this,t={datasourceName:this.datasourceName,datasourceType:this.datasourceType,pageNum:this.pageNum,pageSize:this.pageSize};this.$api.account.dataSourceList(t).then((function(t){e.tabData=t.data.list,e.total=t.data.total}))},refreshCache:function(){var e=this,t={datasourceId:this.rowItem.datasourceId,datasourceCode:this.rowItem.datasourceCode};this.$api.datasource.refreshCache(t).then((function(t){e.$message.success(t.data),e.getDatasource()}))},hbaseShowModal:function(e){this.rowItem=e.data,this.visibleMetadata=!0},searchFun:function(){this.pageNum=1,this.getDatasource()},resetFun:function(){this.datasourceName="",this.datasourceType=void 0,this.pageNum=1,this.pageSize=10,this.getDatasource()},onlineFun:function(e){var t=this,a="online"===e?"确认上线？":"确认下线？",r="online"===e?"上线后，此数据源将正常响应API数据查询请求！":"下线后，关联此数据源的API将无法查询成功！";s.a.confirm({title:this.$t(a),content:this.$t(r),onOk:function(){t.confirmOnline()},onCancel:function(){}})},confirmOnline:function(){var e=this;this.$api.serApproval.datasource({datasourceId:this.rowItem.datasourceId,status:"UP"===this.rowItem.status?"DOWN":"UP"}).then((function(t){e.$message.success("UP"===e.rowItem.status?"下线成功":"上线成功"),e.getDatasource()}))},tabItem:function(e){switch(this.rowItem=e,this.clickFun){case"online":this.onlineFun("online");break;case"offline":this.onlineFun("offline");break;case"deleteFun":this.deleteFun();break;case"editFun":this.modalTitle="修改数据源",this.visibleDataSourceEdit=!0,this.SqlTypeName=this.rowItem;break;case"refreshCache":this.refreshCache()}},deleteFun:function(){var e=this;this.$api.account.deleteDatasource(this.rowItem.datasourceId).then((function(t){e.$message.success(t.data),e.reload()}))},clickFunName:function(e){this.clickFun=e},newlyBuild:function(){this.modalTitle="新增数据源",this.visibleDataSource=!0,this.isShow=!0},SqlType:function(e){e&&(this.isShow=!1,this.SqlTypeName=e)},hideModalConsumer:function(){},modalBack:function(){this.isShow=!0},modalCancel:function(){this.isShow=!1,this.visibleDataSource=!1,this.visibleDataSourceEdit=!1},modalTest:function(){switch(this.SqlTypeName.datasourceType){case"elasticsearch":"新增数据源"==this.modalTitle?this.$refs.DataSourceEdit.$refs.EsForm.testDatasource():this.$refs.DataSourceEditModal.$refs.EsForm.testDatasource();break;case"mongodb":"新增数据源"==this.modalTitle?this.$refs.DataSourceEdit.$refs.MongodbForm.testDatasource():this.$refs.DataSourceEditModal.$refs.MongodbForm.testDatasource();break;default:"新增数据源"==this.modalTitle?this.$refs.DataSourceEdit.testDatasource():this.$refs.DataSourceEditModal.testDatasource()}},modalConfim:function(){switch(this.SqlTypeName.datasourceType){case"elasticsearch":"新增数据源"==this.modalTitle?this.$refs.DataSourceEdit.$refs.EsForm.handleSubmit(this.modalTitle):this.$refs.DataSourceEditModal.$refs.EsForm.handleSubmit(this.modalTitle);break;case"mongodb":"新增数据源"==this.modalTitle?this.$refs.DataSourceEdit.$refs.MongodbForm.handleSubmit(this.modalTitle):this.$refs.DataSourceEditModal.$refs.MongodbForm.handleSubmit(this.modalTitle);break;default:"新增数据源"==this.modalTitle?this.$refs.DataSourceEdit.handleSubmit(this.modalTitle):this.$refs.DataSourceEditModal.handleSubmit(this.modalTitle)}},changePage:function(e){this.pageNum=e.pageSize===this.pageSize?e.current:1,this.pageSize=e.pageSize,this.getDatasource()}}},h=(a("5987"),Object(o.a)(m,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"jurisdiction-box"},[a("JurisdictionTable",{attrs:{tabcolumns:e.tabcolumns,"tab-data":e.tabData,"operation-btn":e.operationBtn,"is-row-selection":e.isRowSelection,"page-no":e.pageNum,"page-size":e.pageSize,total:e.total},on:{tabItem:e.tabItem,clickFunName:e.clickFunName,changePage:e.changePage},scopedSlots:e._u([{key:"morebtn",fn:function(t){return["hbase-connector"==t.data.datasourceType?a("a-button",{attrs:{type:"link"},on:{click:function(a){return e.hbaseShowModal(t)}}},[e._v("元数据维护")]):e._e()]}}])},[e._t("default",[a("div",{staticClass:"consumer-components-head-top"},[e._v(" 数据源名称： "),a("a-input",{staticClass:"consumer-components-input",attrs:{allowClear:"",placeholder:"请输入数据源名称"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchFun(t)}},model:{value:e.datasourceName,callback:function(t){e.datasourceName=t},expression:"datasourceName"}}),a("a-button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:e.searchFun}},[e._v("查询")]),a("a-button",{attrs:{icon:"plus"},on:{click:e.newlyBuild}},[e._v("新建")])],1)])],2),e.visibleDataSource?a("a-modal",{attrs:{title:e.modalTitle,width:680,maskClosable:!1,footer:null},model:{value:e.visibleDataSource,callback:function(t){e.visibleDataSource=t},expression:"visibleDataSource"}},[e.isShow?a("DataSourceType",{on:{SqlType:e.SqlType}}):e._e(),e.isShow?e._e():a("DataSourceEdit",{ref:"DataSourceEdit",attrs:{"sql-type-name":e.SqlTypeName}}),a("div",{staticClass:"modal-footer"},[e.isShow?e._e():a("a-button",{staticClass:"mr20",on:{click:e.modalBack}},[e._v("上一步")]),e.isShow?e._e():a("a-button",{staticClass:"mr20",on:{click:e.modalTest}},[e._v("测试连接")]),e.isShow?e._e():a("a-button",{staticClass:"mr20",attrs:{type:"primary"},on:{click:e.modalConfim}},[e._v("确定")])],1)],1):e._e(),e.visibleDataSourceEdit?a("a-modal",{attrs:{title:e.modalTitle,"ok-text":"确认","cancel-text":"取消",width:680,footer:null},on:{ok:e.hideModalConsumer},model:{value:e.visibleDataSourceEdit,callback:function(t){e.visibleDataSourceEdit=t},expression:"visibleDataSourceEdit"}},[e.showPublicForm?a("DataSourceEdit",{ref:"DataSourceEditModal",attrs:{"sql-type-name":e.SqlTypeName,"row-item":e.rowItem}}):e._e(),a("div",{staticClass:"modal-footer"},[a("a-button",{staticClass:"mr20",on:{click:e.modalCancel}},[e._v("取消")]),a("a-button",{staticClass:"mr20",on:{click:e.modalTest}},[e._v("测试连接")]),a("a-button",{staticClass:"mr20",attrs:{type:"primary"},on:{click:e.modalConfim}},[e._v("确定")])],1)],1):e._e(),e.visibleMetadata?a("a-modal",{staticClass:"metadata-modal",attrs:{title:"元数据维护",width:800,footer:null},model:{value:e.visibleMetadata,callback:function(t){e.visibleMetadata=t},expression:"visibleMetadata"}}):e._e()],1)}),[],!1,null,"4bda4a10",null));t.default=h.exports},7767:function(e,t,a){},"89a5":function(e,t,a){},"8a29":function(e,t,a){"use strict";a("7767")},"9c6a":function(e,t,a){},ac5c:function(e,t,a){},b37a:function(e,t,a){},cc713:function(e,t,a){"use strict";a("89a5")}}]);