import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --color-lightest: #e8ebee;
    --color-dark: #495057;
    --color-theme: #29aefd;
    --color-wrong: #fd6085;
    --color-correct: #7befb7;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
      Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    height: 100vh;
    color: var(--color-dark);
    background-color: var(--color-lightest);
    padding: 3.2rem;
  }
`

export default GlobalStyles
