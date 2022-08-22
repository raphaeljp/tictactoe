const intervals = {
  match: '',
  game: ''
}

export const startTimer = (recipient, type) => {
  let seconds = 0
  let minutes = 0
  let hours = 0

  const holder = document.getElementById(recipient)

  intervals[type] = setInterval(() => {
    holder.innerHTML = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`

    seconds++

    if (seconds === 60) {
      minutes++
      seconds = 0
    }

    if (minutes === 60) {
      hours++
      minutes = 0
    }
  }, 1000)
}

export const stopTimer = type => {
  clearInterval(intervals[type])
}

export const resetTimer = recipient => {
  document.getElementById(recipient).innerHTML = '00:00:00'
}