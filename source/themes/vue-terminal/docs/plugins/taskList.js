// const USER_ID = parseInt(Math.random() * 1000)
function generateTime() {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  const minutes = timeNow.getMinutes();
  const seconds = timeNow.getSeconds();
  let timeString = '' + hours;
  timeString += (minutes < 10 ? ':0' : ':') + minutes;
  timeString += (seconds < 10 ? ':0' : ':') + seconds;
  return timeString
}

const mockData = [
  { time: generateTime(),
    type: 'system',
    label: 'System',
    message: '欢迎来到长颈鹿🦒 宁的终端,这是一个简单的窗口用来告诉你你想知道的东西.' },
    { time: generateTime(), type: 'info', label: 'Info', message: '终端正在初始化 ............' },
    { time: generateTime(), type: 'warning', label: 'warning', message: '这是一个警告消息!' },
    { time: generateTime(), type: 'error', label: 'Error', message: '呀！出错啦!' },
    { time: generateTime(), type: 'success', label: 'Success', message: 'So Easy! Everything OK!' }
]

const taskList = {
  echo: {
    description: 'Echoes input',
    echo(pushToList, input) {
      input = input.split(' ')
      input.splice(0, 1)
      const p = new Promise(resolve => {
        pushToList({ time: generateTime(), label: 'Echo', type: 'success', message: input.join(' ') });
        resolve({ type: 'success', label: '', message: '' })
      })
      return p
    }
  },
  defaultTask: {
    description: '一个默认的任务正在执行.',
    defaultTask(pushToList) {
      let i = 0;
      const p = new Promise(resolve => {
        const interval = setInterval(() => {
          mockData[i].time = generateTime()
          pushToList(mockData[i]);
          i++
          if (!mockData[i]) {
            clearInterval(interval)
            resolve({ type: 'success', label: 'Success', message: 'Example Over!' })
          }
        }, 1000);
      })
      return p
    }
  },
  open: {
    description: '在新选项卡中打开指定的url.',
    open(pushToList, input) {
      const p = new Promise((resolve, reject) => {
        let url = input.split(' ')[1]
        if (!url) {
          reject({ type: 'error', label: 'Error', message: 'a url is required!' })
          return
        }
        pushToList({ type: 'success', label: 'Success', message: 'Opening' })

        if (input.split(' ')[1].indexOf('http') === -1) {
          url = 'http://' + input.split(' ')[1]
        }
        window.open(url, '_blank')
        resolve({ type: 'success', label: 'Done', message: 'Page Opened!' })
      })
      return p;
    }
  }

}
