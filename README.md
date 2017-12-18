## 目录结构说明

所有文件命名驼峰命名。

* src 
	* actions redux架构的actions
        
         ActionType.js 调用各个业务的 type ，这样做防止每个人在修改这个文件导致经常冲突

	* reducers redux架构的reducers

	* components 一些视图的组件 

	* utils 工具类函数
    
        * style  存放样式属性

	* service

	* pages 各个页面 目录按业务区分
		
		* history
* node_modules 
* package.json
* index.ios.js
* index.android.js
* ios
* android
* android-packager.sh ： 安卓打包脚本
* iOS-packager.sh ： iOS打包脚本
* app.json :app相关信息


* =============其他说明============
代码规范：
   采用:“Airbnb JavaScript Style Guide”
   链接: http://airbnb.io/javascript/
   代码检测: 在ReactComponent目录下运行：npm run lint:eslint
