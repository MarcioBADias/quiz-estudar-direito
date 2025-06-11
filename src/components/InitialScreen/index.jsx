import { useState } from 'react'
import { useQuiz } from '../../context/QuizContext'
import { Button, ButtonGroup, Controls, StyledScreen } from './style'

const InitialScreen = () => {
  const { questions, dispatch } = useQuiz()
  const [numQuestions, setNumQuestions] = useState(5)
  const [subject, setSubject] = useState('All')
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = async (actionType) => {
    setIsLoading(true)
    try {
      let query = supabase.from('questions').select('*')
      if (subject !== 'All') {
        query = query.eq('subject', subject)
      }
      const { data, error } = await query
      if (error) throw error

      let shuffled = data.sort(() => Math.random() - 0.5)
      const filteredQuestions =
        numQuestions > 0 ? shuffled.slice(0, numQuestions) : shuffled

      if (actionType === 'start') {
        dispatch({ type: 'quiz/start', payload: filteredQuestions })
      } else if (actionType === 'download') {
        generatePdfCards(filteredQuestions)
      }
    } catch (err) {
      dispatch({ type: 'questions/failed' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <StyledScreen>
      <h2>Bem-vindo(a) ao Quiz de Direito!</h2>
      <h3>{questions.length} questões prontas para testar você.</h3>
      <Controls>
        <label htmlFor="subject">Matéria:</label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="All">Todas</option>
          <option value="Constitutional">Constitucional</option>
          <option value="Administrative">Administrativo</option>
          <option value="Criminal">Penal</option>
          <option value="Civil">Civil</option>
          <option value="Criminal Procedure">Processual Penal</option>
          <option value="Civil Procedure">Processual Civil</option>
        </select>

        <label htmlFor="numQuestions">Número de Questões:</label>
        <select
          id="numQuestions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="0">Todas</option>
        </select>
      </Controls>

      <ButtonGroup>
        <Button onClick={() => handleAction('start')} disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Iniciar Quiz'}
        </Button>
        <Button onClick={() => handleAction('download')} disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Baixar Cartões'}
        </Button>
        <Button onClick={() => dispatch({ type: 'view/register' })}>
          Cadastrar Questão
        </Button>
      </ButtonGroup>
    </StyledScreen>
  )
}

export { InitialScreen }
