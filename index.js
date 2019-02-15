'use strict'

// 23+24+(56/3-23/2)+24+70*2

var calculateFormula = function (fString) {

  // find hooks opened and closed
  // get substring between hooks and
  // put it to the function for calculate
  // then replace all in hooks with hooks with calculated 





  var formula = fString
  var marks = ['/', '*', '-', '+']
  var marksNumber = {}
  var index

  marks.forEach(function (val) {
    index = formula.indexOf(marks[0])
    if (index > -1) {
      marksNumber[val] = formula.split(val).length - 1
    }
  })

  var arr = []
  var tempInt = []
  var formulaL = formula.length

  formula.split('').forEach(function (val, index) {
    if (marks.indexOf(val) > -1) {
      arr.push(tempInt.join(''))
      arr.push(val)
      tempInt = []
    } else {
      tempInt.push(val)
    }

    if (tempInt.length > 0 && (formulaL - 1) === index) {
      arr.push(tempInt.join(''))
      tempInt = []
    }
  })

  var indexMark = 0
  var number1 = 0
  var number2 = 0
  var result = 0

  for (var key in marksNumber) {
    for (var i = 0; i < marksNumber[key]; i++) {
      number1 = 0
      number2 = 0
      result = 0

      indexMark = arr.indexOf(key)
      console.log('было = ', arr)

      if (indexMark) {
        number1 = parseInt(arr[indexMark - 1])
        number2 = parseInt(arr[indexMark + 1])

        switch (key) {
          case '/':
            if (number2 > 0) {
              result = Math.round(number1 / number2)
            }
            break
          case '*':
            result = number1 * number2
            break
          case '-':
            result = number1 - number2
            break
          case '+':
            result = number1 + number2
        }

        arr.splice(indexMark - 1, 3, result + '')
        console.log('стало = ', arr)
      }
    }
  }
}

var f = calculateFormula('23+7*3+24+56/3-23/2+24+70*2-5')
console.log(f)