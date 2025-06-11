import { useQuiz } from '../../context/QuizContext'
import { Options } from '../Options'
import { QuestionContainer } from './style'

const Question = () => {
  const { quizQuestions, currentIndex } = useQuiz()
  const question = quizQuestions[currentIndex]

  return (
    <QuestionContainer>
      <h4>{question.statement}</h4>
      <Options question={question} />
    </QuestionContainer>
  )
}

export { Question }
