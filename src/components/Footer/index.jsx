import { Timer } from '../Timer'
import { NextButton } from '../NextButton'
import { StyledFooter } from './style'
import { useQuiz } from '../../context/QuizContext'

const Footer = () => {
  const { answer } = useQuiz()
  const hasAnswered = answer !== null
  return (
    <StyledFooter>
      <Timer />
      {hasAnswered && <NextButton />}
    </StyledFooter>
  )
}

export { Footer }
