import { useQuiz } from './context/QuizContext'
import { Header } from '@/components/Header'
import { InitialScreen } from '@/components/InitialScreen'
import { RegisterQuestion } from '@/components/RegisterQuestion'
import { QuestionScreen } from '@/components/QuestionScreen'
import { ResultScreen } from '@/components/ResultScreen'
import GlobalStyles from './styles/GlobalStyles'
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Main = styled.main`
  width: 100%;
  max-width: 80rem;
`

function App() {
  const { status } = useQuiz()

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Main>
          {status === 'loading' && <p>Loading questions...</p>}
          {status === 'error' && <p>Error fetching questions.</p>}
          {status === 'ready' && <InitialScreen />}
          {status === 'register' && <RegisterQuestion />}
          {status === 'active' && <QuestionScreen />}
          {status === 'finished' && <ResultScreen />}
        </Main>
      </AppContainer>
    </>
  )
}

export { App }
