import { useEffect } from 'react'
import { useQuiz } from '../../context/QuizContext'
import { TimerContainer } from './style'

const Timer = () => {
  const { secondsRemaining, dispatch } = useQuiz()
  const minutes = Math.floor(secondsRemaining / 60)
  const secs = secondsRemaining % 60

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'timer/tick' })
    }, 1000)

    return () => clearInterval(id)
  }, [dispatch])

  return (
    <TimerContainer>
      {minutes < 10 && '0'}
      {minutes}:{secs < 10 && '0'}
      {secs}
    </TimerContainer>
  )
}

export { Timer }
