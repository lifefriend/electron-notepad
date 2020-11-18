## 1、正式打包，打包成一个应用程序

electron-packager <应用目录> < 应用名称> --platform=<打包平台> --out=<输出目录> ---arch=<架构> --app-version=<应用版本> --icon=<应用图标> --overwrite (是否覆盖)

- win 打包：平台 --paltform=win32 ｜ 架构 --arch=x64 ｜ 图标 --icon=\*\*.ico
- mac 打包：平台 --paltform=drawin ｜ 架构 --arch=x64 ｜ 图标 --icon=\*\*.ico

```shell
electron-packager ./ app --platform=win32 --out=./dist --arch=x64 --app-version=1.0.0 --icon=./public/ico.ico --overwite --asar --app-version=0.0.1
```

## 2、打包为安装包

下载：npm install electron-builder -g

- 配置启动脚本： 打开 package.json， 可以不用全部配置

```json
{
...
"script": {
    ...
    "builderwin": "electron-builder -win",  // 启动脚本    "buildermac": "electron-builder -mac"    ...
},
 build: {
    "appId": "com.itcast.app",  // 包名称
    "directories": {
        "app": "/", // 应用目录
        "output": "dist" // 输出目录
    },
    "productName": "计算器", // 项目名称 xxx.exe
    "dmg": {  // 这里主要用于mac下的配置
        "icon": "./xxx/mac.icns",  // 图标路径
        "window": {  // 窗口设置
        "x": "200",
        "y": "150"，
        "width": 500,
        "height": 400
        }
    },
    "mac": { "icon": "./images/mac.icns" },
    "win": {
        "icon": "./images/icon.ico", // 图标路径
        "extraResource": {   // 拷贝dll等静态文件到指定位置
            "from": "./app-update.yml",
            "to": "./b.txt"
        },
    },
    "asar": false, // asar打包
    "extraResource": {   // 拷贝dll等静态文件到指定位置
        "from": "./app-update.yml",
        "to": "./b.txt"
    },
    "nsis": {
   	 "oneClick": false, // 一件安装
    	"guid": "xxxx", //注册表名字，不推荐使用
    	"perMachine": true, // 是否开启安装史权限限制
    	"allowElevation": true, // 允许请求提升。如果为false，用户必须使用提升的权限重新启动安装程序
   	"allowToChangeInstallationDirectory": true, // 允许修改安装目录
   	"installerIcon": "./build/icons/aaa.ico", // 安装图标
  	 "uninstallerIcon": "./build/icons/bbb.ico", // 卸载图标
   	"installerHeaderIcon": "./build/icons/aaa.ico", // 安装时头部图标
  	 "createDesktopShortcut": true, // 创建桌面图标
   	"createStartMenuShortcut": true, // 创建开始菜单图标
   	"shortcutName": "xxxx" // 图标名称
    }
 }
...
}
```

参考：

https://github.com/electron/electron-quick-start

https://github.com/XMandarava/Demo-Electron-Notepad.git
