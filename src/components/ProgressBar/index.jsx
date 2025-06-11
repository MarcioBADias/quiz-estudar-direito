import { useQuiz } from '../../context/QuizContext'
import { ProgressInfo, StyledProgress } from './style'

const ProgressBar = () => {
  const { currentIndex, quizQuestions, score, answer } = useQuiz()
  const numQuestions = quizQuestions.length
  const maxScore = quizQuestions.reduce((prev, cur) => prev + cur.points, 0)

  return (
    <StyledProgress>
      <progress
        max={numQuestions}
        value={currentIndex + Number(answer !== null)}
      />
      <ProgressInfo>
        <span>
          Questão <strong>{currentIndex + 1}</strong> de {numQuestions}
        </span>
        <span>
          <strong>
            {score} / {maxScore}
          </strong>{' '}
          pontos
        </span>
      </ProgressInfo>
    </StyledProgress>
  )
}

export { ProgressBar }
