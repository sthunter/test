const axios = require('axios')

module.exports = async (event, context) => {
  const responses = event.body
  // example responses
  // {
  //   "1": {
  //      question: "What is the capitol of Idaho?", 
  //      answer: "A", 
  //      answerText: "Boise"
  //    },
  //    "2": {...}
  // }
  const id = event.queryStringParameter.id
  let results = {
    summary: {
      skipped: 0,
      correct: 0,
      incorrect: 0
    },
    answers: [

    ]
  }
  try {
    const answers = await axios.get(`https://test.drc.com/api/v1/${id}`)
    // {
    //   "responsekey": [
    //     { "question": "1", "correctresponse": "A"},
    //     { "question": "2", "correctresponse": "C"},
    //     { "question": "3", "correctresponse": "B"}
    //     ]
    // }
    
    answers.responsekey.forEach((answer) => {
      let correct = false
      if(responses[answer.question] === answer.correctresponse) {
        results.summary.correct++
        correct = true
      } else {
        if(responses[answer.question] === null) {
          results.summary.skipped++
        }
        results.summary.incorrect++
      }
      results.answer.push({
        question: responses[answer.question].question,
        answer: responses[answer.question].answer,
        correctResponse: answer.correctresponse,
        correct
      })
    })

    context.succeed(results)
    
  } catch(error) {
    return context.fail({
      error
    })
  }
}