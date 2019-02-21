'use strict'

var calculateFormula = function (fString) {

  var formula = fString
  var marks = ['/', '*', '-', '+']
  var marksNumber = {}
  var index

  marks.forEach(function (val) {
    index = formula.indexOf(val)
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
      }
    }
  }

  return arr[0]
}

function calculateWithBrackets(fString) {
  var strTemp = fString
  var brackets = []
  var j = 0
  var N = strTemp.length
  var subStr = ''
  var newStr = ''
  var result = ''
  var signBefore = '+'

  while(true) {
    switch (strTemp[j]) {
      case '(':
        brackets[brackets.length] = {'open': j}
        break
      case ')':
        for (var i = brackets.length - 1; i > -1; i--) {
          if (!brackets[i].close) {
            brackets[i].close = j

            subStr = strTemp.substring(brackets[i].open + 1, brackets[i].close)
            result = calculateFormula(subStr)
            signBefore = strTemp.substring(brackets[i].open - 1, brackets[i].open)

            if (result >= 0 && (signBefore === '+' || signBefore === '-')) {
              newStr = strTemp.substring(0, brackets[i].open) + result + strTemp.substring(brackets[i].close + 1)
            } else if (result < 0 && signBefore === '-') {
              result = Math.abs(result)
              newStr = strTemp.substring(0, brackets[i].open - 1) + '+' + result + strTemp.substring(brackets[i].close + 1)
            } else {
              newStr = strTemp.substring(0, brackets[i].open - 1) + Math.abs(result) + strTemp.substring(brackets[i].close + 1)
            }

            strTemp = newStr
            N = strTemp.length
            j = brackets[i].open - 1

            i = -1
          }
        }
        break
    }


    if (j === N) {
      break
    } else {
      j++
    }
  }

  return calculateFormula(strTemp)
}

var f = calculateWithBrackets('23+(7*3+24)+(56/3-23/2+(8-(8/4+7*6-56))+45)+(24+70*2)-5')

// it`s working too
//console.log('calculateFormula = ', (new Function('return (' + '23+(7*3+24)+(56/3-23/2+(8-(8/4+7*6-56))+45)+(24+70*2)-5' + ')'))())
//console.log('calculateFormula = ', eval('23+(7*3+24)+(56/3-23/2+(8-(8/4+7*6-56))+45)+(24+70*2)-5'))