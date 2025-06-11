import { useQuiz } from '../../context/QuizContext'
import { Button } from './style'

const NextButton = () => {
  const { dispatch, currentIndex, quizQuestions } = useQuiz()
  const isLastQuestion = currentIndex === quizQuestions.length - 1

  return (
    <Button
      onClick={() =>
        dispatch({
          type: isLastQuestion ? 'quiz/finish' : 'quiz/nextQuestion',
        })
      }
    >
      {isLastQuestion ? 'Finalizar' : 'Próxima'}
    </Button>
  )
}

export { NextButton }
