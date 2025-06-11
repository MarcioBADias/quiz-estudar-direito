import styled from 'styled-components'

export const StyledProgress = styled.header`
  margin-bottom: 4rem;
  font-size: 1.8rem;
  color: var(--color-dark);

  progress {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 12px;
    grid-column: 1 / -1;
    margin-bottom: 1rem;
  }

  ::-webkit-progress-bar {
    background-color: var(--color-dark-grey);
    border-radius: 100px;
  }

  ::-webkit-progress-value {
    background-color: var(--color-theme);
    border-radius: 100px;
    transition: all 0.35s;
  }
`

export const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
`
