const commandList = {
  version: {
    description: '返回这个项目的版本号',
    messages: [
      { message: '1.0.0' }
    ]
  },
  contact: {
    description: '联系作者',
    messages: [
    { message: 'Website: http:www.ningdali.com' },
    { message: 'Email: mrning1213@gmail.com' },
    { message: 'Github: https://github.com/MrDalili' },
    { message: 'WeChat Offical Account: 15099443576' }
    ] },
  about: {
    description: '关于作者',
    messages: [
    { message: '我叫宁夯. 一个码农,你可以访问我的网站 http://www.ningdali.com 去了解我.' }
    ]
  },
  readme: {
    description: '关于这个项目.',
    messages: [
    { message: '这是一个在Vue中模拟命令终端的组件（套的模板）' }
    ] },
  document: {
    description: 'Document of this project.',
    messages: [
      { message: {
        text: 'Under Construction',
        list: [
        { label: 'hello', type: 'error', message: 'this is a test message' }
        ]
      } }]
  }
}
