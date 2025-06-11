import { useQuiz } from '../../context/QuizContext'
import { StyledResult } from './style'

const ResultScreen = () => {
  const { score, quizQuestions, dispatch } = useQuiz()
  const maxScore = quizQuestions.reduce((prev, cur) => prev + cur.points, 0)
  const percentage = Math.ceil((score / maxScore) * 100)

  return (
    <StyledResult>
      <p className="result-summary">
        Você fez <strong>{score}</strong> pontos de {maxScore} ({percentage}
        %)
      </p>
      <button onClick={() => dispatch({ type: 'quiz/restart' })}>
        Reiniciar Quiz
      </button>
    </StyledResult>
  )
}

export { ResultScreen }
