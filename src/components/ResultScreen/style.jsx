import styled from 'styled-components'

export const StyledResult = styled.div`
  text-align: center;

  .result-summary {
    background-color: var(--color-theme);
    color: var(--color-dark);
    border-radius: 100px;
    text-align: center;
    padding: 2rem 0;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 4rem;
  }

  button {
    display: block;
    margin: 0 auto;
    font-family: inherit;
    color: inherit;
    font-size: 2rem;
    padding: 1.2rem 2.4rem;
    cursor: pointer;
    border-radius: 100px;
    transition: 0.3s;
    border: 1px solid var(--color-dark-grey);

    &:not([disabled]):hover {
      background-color: #e3e3e3;
    }
  }
`
