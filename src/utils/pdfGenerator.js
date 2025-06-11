import jsPDF from 'jspdf'

export const generatePdfCards = (questions) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const cardWidth = 95
  const cardHeight = 65
  const marginX = (210 - cardWidth * 2) / 3
  const marginY = (297 - cardHeight * 4) / 5

  let cardCount = 0

  questions.forEach((q, index) => {
    if (index > 0 && index % 8 === 0) {
      doc.addPage()
      cardCount = 0
    }

    const col = cardCount % 2
    const row = Math.floor(cardCount / 2)

    const x = marginX + col * (cardWidth + marginX)
    const y = marginY + row * (cardHeight + marginY)

    doc.setDrawColor(150, 150, 150)
    doc.rect(x, y, cardWidth, cardHeight, 'S')

    // Enunciado
    doc.setFontSize(9)
    doc.setFont(undefined, 'bold')
    const questionText = `Q: ${q.statement}`
    const questionLines = doc.splitTextToSize(questionText, cardWidth - 10)
    doc.text(questionLines, x + 5, y + 8)

    const answerY = y + 8 + questionLines.length * 4 + 5

    doc.setFont(undefined, 'normal')
    doc.setFontSize(8)
    let answerText = ''

    if (
      q.question_type === 'multiple_choice' ||
      q.question_type === 'true_false'
    ) {
      const optionsText = Object.entries(q.options)
        .map(
          ([key, value]) =>
            `${isNaN(key) ? key.toUpperCase() : Number(key) + 1}) ${value}`,
        )
        .join('\n')
      answerText = `GABARITO: ${q.answer.toUpperCase()}\n\n${optionsText}`
    } else {
      answerText = `GABARITO:\n${q.answer}`
    }

    const answerLines = doc.splitTextToSize(answerText, cardWidth - 10)

    const remainingHeight = y + cardHeight - answerY - 5
    const maxLines = Math.floor(remainingHeight / 3.5)

    doc.text(answerLines.slice(0, maxLines), x + 5, answerY)

    cardCount++
  })

  doc.save('cartoes-quiz-direito.pdf')
}
