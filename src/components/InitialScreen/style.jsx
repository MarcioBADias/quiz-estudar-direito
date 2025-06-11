import styled from 'styled-components'

export const StyledScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;

  h2 {
    font-size: 3.6rem;
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 4rem;
  }
`

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 30rem;
  margin-bottom: 2rem;

  label {
    font-size: 1.6rem;
    text-align: left;
  }

  select {
    font-size: 1.6rem;
    padding: 0.8rem;
    border-radius: 100px;
    border: 1px solid var(--color-dark-grey);
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`

export const Button = styled.button`
  display: block;
  font-family: inherit;
  color: inherit;
  font-size: 2rem;
  padding: 1.2rem 2.4rem;
  cursor: pointer;
  border-radius: 100px;
  transition: 0.3s;
  border: 1px solid var(--color-dark-grey);
  background-color: var(--color-lightest);

  &:not([disabled]):hover {
    background-color: #e3e3e3;
  }
`
