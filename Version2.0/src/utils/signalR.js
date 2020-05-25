//引入安装的signalr包
import * as signalR from '@aspnet/signalr'

const signal = new signalR.HubConnectionBuilder()
　　　//服务器地址
    .withUrl('http://localhost:51543/messageHub')
    //日志信息
    .configureLogging(signalR.LogLevel.Information)
    .build()

// var signal = new signalR.HubConnectionBuilder()
//     .withUrl("http://localhost:51543/messageHub")
//     .withAutomaticReconnect()
//     .Build();

/* const signalr = function () {
  var hub
  if (hub === undefined) {
    hub = signal
  }
  return hub
} */
//  自动重连
/* async function start () {
  try {
    await signal.start()
    console.log('connected')
  } catch (err) {
    console.log(err)
    setTimeout(() => start(), 5000)
  }
}

signal.onclose(async () => {
  await start()
}) */
//将创建的signal赋值给Vue实例
export default {
    //install方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
    install: function(Vue) {
        Vue.prototype.signalr = signal
    }
}