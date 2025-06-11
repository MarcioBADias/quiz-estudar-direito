import { useState } from 'react'
import { useQuiz } from '../../context/QuizContext'
import { supabase } from '@/supabaseClient'
import { FaPlus, FaTrash } from 'react-icons/fa'
import {
  Button,
  Form,
  FormContainer,
  FormGroup,
  IconButton,
  Message,
  OptionWithAction,
} from './style'

const RegisterQuestion = () => {
  const { dispatch: dispatchQuiz } = useQuiz()

  const [subject, setSubject] = useState('Constitutional')
  const [questionType, setQuestionType] = useState('multiple_choice')
  const [statement, setStatement] = useState('')
  const [options, setOptions] = useState({ a: '', b: '', c: '', d: '', e: '' })
  const [trueFalseOptions, setTrueFalseOptions] = useState([''])
  const [answer, setAnswer] = useState('')
  const [essayAnswer, setEssayAnswer] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const resetForm = () => {
    setSubject('Constitutional')
    setQuestionType('multiple_choice')
    setStatement('')
    setOptions({ a: '', b: '', c: '', d: '', e: '' })
    setTrueFalseOptions([''])
    setAnswer('')
    setEssayAnswer('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setIsError(false)

    let payloadOptions = {}
    let payloadAnswer = ''

    if (questionType === 'multiple_choice') {
      payloadOptions = options
      payloadAnswer = answer
    } else if (questionType === 'true_false') {
      payloadOptions = { ...trueFalseOptions }
      payloadAnswer = answer // Ex: 'C,E,C'
    } else {
      // essay
      payloadOptions = {}
      payloadAnswer = essayAnswer
    }

    const payload = {
      subject,
      question_type: questionType,
      statement,
      options: payloadOptions,
      answer: payloadAnswer,
      points: 10,
    }

    const { error } = await supabase.from('questions').insert([payload])

    if (error) {
      setMessage(`Erro ao cadastrar: ${error.message}`)
      setIsError(true)
    } else {
      setMessage('Questão cadastrada com sucesso!')
      setIsError(false)
      resetForm()
    }

    setLoading(false)
  }

  const handleTrueFalseChange = (index, value) => {
    const newOptions = [...trueFalseOptions]
    newOptions[index] = value
    setTrueFalseOptions(newOptions)
  }

  const addTrueFalseOption = () => {
    setTrueFalseOptions([...trueFalseOptions, ''])
  }

  const removeTrueFalseOption = (index) => {
    const newOptions = trueFalseOptions.filter((_, i) => i !== index)
    setTrueFalseOptions(newOptions)
  }

  return (
    <FormContainer>
      <h2>Cadastrar Nova Questão</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Matéria</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="Constitutional">Constitucional</option>
            <option value="Administrative">Administrativo</option>
            <option value="Criminal">Penal</option>
            <option value="Civil">Civil</option>
            <option value="Criminal Procedure">Processual Penal</option>
            <option value="Civil Procedure">Processual Civil</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label>Tipo de Questão</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="multiple_choice">Múltipla Escolha</option>
            <option value="true_false">Certo ou Errado</option>
            <option value="essay">Discursiva</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label>Enunciado</label>
          <textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            required
          />
        </FormGroup>

        {questionType === 'multiple_choice' && (
          <FormGroup>
            <label>Alternativas (A, B, C, D, E)</label>
            {Object.keys(options).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={`Alternativa ${key.toUpperCase()}`}
                value={options[key]}
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            ))}
            <label>Gabarito (ex: a)</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.toLowerCase())}
              maxLength="1"
            />
          </FormGroup>
        )}

        {questionType === 'true_false' && (
          <FormGroup>
            <label>Afirmações</label>
            {trueFalseOptions.map((opt, index) => (
              <OptionWithAction key={index}>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleTrueFalseChange(index, e.target.value)}
                />
                <IconButton type="button" onClick={addTrueFalseOption}>
                  <FaPlus size={16} />
                </IconButton>
                {trueFalseOptions.length > 1 && (
                  <IconButton
                    type="button"
                    className="danger"
                    onClick={() => removeTrueFalseOption(index)}
                  >
                    <FaTrash size={16} />
                  </IconButton>
                )}
              </OptionWithAction>
            ))}
            <label>Gabarito (separado por vírgula, ex: C,E,C)</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.toUpperCase())}
            />
          </FormGroup>
        )}

        {questionType === 'essay' && (
          <FormGroup>
            <label>Resposta Esperada</label>
            <textarea
              value={essayAnswer}
              onChange={(e) => setEssayAnswer(e.target.value)}
              required
            />
          </FormGroup>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Questão'}
        </Button>
      </Form>

      {message && <Message $isError={isError}>{message}</Message>}

      <Button
        className="secondary"
        onClick={() => dispatchQuiz({ type: 'quiz/restart' })}
      >
        Voltar para o Quiz
      </Button>
    </FormContainer>
  )
}
export { RegisterQuestion }
