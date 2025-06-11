import { useQuiz } from '../../context/QuizContext'
import { ProgressBar } from '../ProgressBar'
import { Footer } from '../Footer'
import { Question } from '../Questions'

const QuestionScreen = () => {
  const { quizQuestions } = useQuiz()

  return (
    <div>
      <ProgressBar />
      <Question question={quizQuestions[0]} />
      <Footer />
    </div>
  )
}

export { QuestionScreen }
