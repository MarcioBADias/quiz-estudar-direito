// src/contexts/QuizContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react'
import { supabase } from '@/supabaseClient'

const QuizContext = createContext()

const SECS_PER_QUESTION = 30

const initialState = {
  status: 'loading',
  questions: [],
  quizQuestions: [],
  currentIndex: 0,
  selectedOption: null,
  answer: null,
  score: 0,
  secondsRemaining: null,
}

const reducer = (state, action) => {
  const question = state.quizQuestions.at(state.currentIndex)

  if (action.type === 'questions/loaded') {
    return { ...state, status: 'ready', questions: action.payload }
  }
  if (action.type === 'questions/failed') {
    return { ...state, status: 'error' }
  }
  if (action.type === 'view/register') {
    return { ...state, status: 'register' }
  }
  if (action.type === 'quiz/start') {
    const quizQuestions = action.payload
    return {
      ...state,
      status: 'active',
      quizQuestions,
      currentIndex: 0,
      selectedOption: null,
      answer: null,
      score: 0,
      secondsRemaining: quizQuestions.length * SECS_PER_QUESTION,
    }
  }
  if (action.type === 'quiz/newAnswer') {
    const isCorrect = action.payload === question.answer
    return {
      ...state,
      selectedOption: action.payload,
      answer: question.answer,
      score: isCorrect ? state.score + question.points : state.score,
    }
  }
  if (action.type === 'quiz/nextQuestion') {
    return {
      ...state,
      currentIndex: state.currentIndex + 1,
      selectedOption: null,
      answer: null,
    }
  }
  if (action.type === 'quiz/finish') {
    return { ...state, status: 'finished', secondsRemaining: null }
  }
  if (action.type === 'quiz/restart') {
    return { ...initialState, status: 'ready', questions: state.questions }
  }
  if (action.type === 'timer/tick') {
    return {
      ...state,
      secondsRemaining: state.secondsRemaining - 1,
      status: state.secondsRemaining === 1 ? 'finished' : state.status,
    }
  }
  return state
}

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(function () {
    async function getQuestions() {
      try {
        const { data, error } = await supabase.from('questions').select('*')
        if (error) throw new Error('Could not fetch questions')
        dispatch({ type: 'questions/loaded', payload: data })
      } catch (err) {
        dispatch({ type: 'questions/failed' })
      }
    }
    getQuestions()
  }, [])

  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

const useQuiz = () => {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}

export { QuizProvider, useQuiz }
