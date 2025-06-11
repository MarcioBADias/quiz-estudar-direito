import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  max-width: 70rem;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.8rem;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  label {
    font-size: 1.6rem;
    font-weight: bold;
  }

  input,
  select,
  textarea {
    font-size: 1.6rem;
    padding: 1rem 1.2rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    font-family: inherit;
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`

export const Button = styled.button`
  display: block;
  width: 100%;
  font-family: inherit;
  color: #fff;
  background-color: var(--color-theme);
  font-size: 2rem;
  padding: 1.2rem 2.4rem;
  cursor: pointer;
  border-radius: 100px;
  transition: 0.3s;
  border: none;

  &:hover {
    opacity: 0.9;
  }
  &.secondary {
    background-color: var(--color-dark-grey);
    margin-top: 1rem;
  }
`

export const Message = styled.p`
  text-align: center;
  font-size: 1.6rem;
  margin-top: 1.5rem;
  color: ${(props) => (props.$isError ? 'red' : 'green')};
`

export const OptionWithAction = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--color-theme);

  &:hover {
    opacity: 0.7;
  }

  &.danger {
    color: var(--color-wrong);
  }
`
