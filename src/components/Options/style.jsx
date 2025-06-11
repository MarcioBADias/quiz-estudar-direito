import styled from 'styled-components'

export const OptionsContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 3.2rem;
`

export const OptionButton = styled.button`
  width: 100%;
  text-align: left;
  display: block;
  font-family: inherit;
  color: var(--color-dark);
  background-color: var(--color-lightest);
  font-size: 2rem;
  padding: 1.2rem 2.4rem;
  cursor: pointer;
  border-radius: 100px;
  transition: 0.3s;
  border: 1px solid var(--color-dark-grey);

  &:not([disabled]):hover {
    background-color: #e3e3e3;
    transform: translateX(1rem);
  }

  &[disabled] {
    cursor: not-allowed;
  }

  ${(props) =>
    props.$isSelected &&
    `
    transform: translateX(1rem);
    border-width: 2px;
  `}

  ${(props) =>
    props.$isCorrect &&
    `
    background-color: var(--color-correct);
    border-color: var(--color-correct);
  `}

  ${(props) =>
    props.$isWrong &&
    `
    background-color: var(--color-wrong);
    border-color: var(--color-wrong);
    color: var(--color-lightest);
  `}
`
