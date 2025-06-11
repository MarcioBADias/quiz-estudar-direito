import { useQuiz } from '../../context/QuizContext'
import { OptionButton, OptionsContainer } from './style'

const Options = ({ question }) => {
  const { dispatch, answer, selectedOption } = useQuiz()
  const hasAnswered = answer !== null

  return (
    <OptionsContainer>
      {Object.entries(question.options).map(([key, optionText]) => (
        <li key={key}>
          <OptionButton
            onClick={() => dispatch({ type: 'quiz/newAnswer', payload: key })}
            disabled={hasAnswered}
            $isSelected={key === selectedOption}
            $isCorrect={hasAnswered && key === answer}
            $isWrong={hasAnswered && key !== answer && key === selectedOption}
          >
            {optionText}
          </OptionButton>
        </li>
      ))}
    </OptionsContainer>
  )
}

export { Options }
