import styled from 'styled-components'

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
