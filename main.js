$(document).ready(function() {
// Набор вспомогательных переменных, которые помогут
// мне отслеживать текущее состояние в калькуляторе
let doted      = false,
    operated   = false,
    zeroed     = false,
    minused    = false;

$('.num').click(function() {
    if(doted) {
        dotedOfNum = true;
    }

    let inputValue = $('.input-field').val(),
        thisNum    = $(this).text();
        minused    = false; // Убираю состояние "минус" для того, что бы его можно было постаивть снова

    if(zeroed) { //Если в поле ввода всего 1 число, и это число 0, то заменяю его новым
        zeroed = false;
        $('.input-field').val(`${thisNum}`);
        return
    }
    operated = false;

    $('.input-field').val(`${inputValue}${thisNum}`); // Вставляю новое значение в .input-field
}); // end click

$('.operation').click(function() {
    let inputValue    = $('.input-field').val(),
        thisOper      = $(this).text(),
        inputValueArr = inputValue.split(''); // (*)
        zeroed        = false;
        minused       = false;

    //(*) - Разбиваю строку на маасив для того что бы в дальнейшем отслеживать наличие
    // или отсутствие операторов в поле

    if(minused) {
        inputValue = inputValue.split('');
        let help   = inputValue.length - 1;
        inputValue = inputValue.splice(0, help);
        inputValue = inputValue.join('');

        $('.input-field').val(`${inputValue}${thisOper}`);
    }

    if(inputValueArr.length == 0) {
        return
    } // Если в поле ничего не введено, то и оператор соответсвенно не появится (кроме -, т.к он отдельный оператор)

    if(!operated && inputValueArr[inputValueArr.length - 1] != '.') { // Если ни оператора, ни точки нет, то просто вставляю нового оператора
        doted    = false; // Меняю знаечния на логичные :D
        operated = true;

        $('.input-field').val(`${inputValue}${thisOper}`);
    }else {
        //Если в поле уже есть точка или операция, то меняю последнее знаечние
        inputValue = inputValue.split('');
        let help   = inputValue.length - 1;
        inputValue = inputValue.splice(0, help);
        inputValue = inputValue.join('');

        $('.input-field').val(`${inputValue}${thisOper}`);
    }
}); // end click

/*
*
*  Короче, я устал. Коменчю как даун всё) Тут и так всё понятно)))
*
*/

$('.minus').click(function() {
    let inputValue = $('.input-field').val();
    inputValue = inputValue.split('');
    zeroed = false;
    if(inputValue[inputValue.length - 1] == '.') {
        let help   = inputValue.length - 1;
        inputValue = inputValue.splice(0, help);
        inputValue = inputValue.join('');

        $('.input-field').val(`${inputValue}-`);
        inputValue = inputValue.split('');
    }

    if(!minused && inputValue[inputValue.length - 1] != '-') {
        inputValue = inputValue.join('');
        $('.input-field').val(`${inputValue}-`);
        minused = true;
        if(!operated) {
            operated = true;
        }
    }
}); // end click

$('.zero').click(function() {
    let inputLength = $('.input-field').val();
    inputLength     = inputLength.split('');

    if(inputLength[0] == 0 && inputLength.length == 1) {
        return
    }else if(inputLength.length == 0){
        zeroed = true;
        $('.input-field').val('0');
    }else {
        let inputValue = $('.input-field').val();

        $('.input-field').val(`${inputValue}0`);
    }
}); // end click

$('.result').click(function() {
    try{
        let result = eval($('.input-field').val());
        if(result == Infinity || isNaN(result) || result == -Infinity) {
            alert('Error');
            $('.clear').click();
            return
        }else if(result == 0) {
            zeroed = true;
        }else {
            doted = false;
        }
        $('.input-field').val(result);
        minused = false;
        if(!(isInteger(result))) {
            doted = true;
        }
    }catch {
        $('.clear').click();
    }
}); // end click

$('.clear').click(function() {
    $('.input-field').val('');
    doted    = false;
    zeroed   = false;
    minused  = false;
    operated = false;
}); // end click

$('.dot').click(function() {
    if(!doted) {
        operated = false;
        doted    = true;
        zeroed   = false;
        minused  = false;
        let inputValue = $('.input-field').val(),
            dot        = $(this).text();

        $('.input-field').val(`${inputValue}${dot}`);
    }
}); // end click

$('.backspace').click(function() {
    if(operated) {
        operated = false
    }
    if(doted) {
        doted = false;
    }
    if(minused) {
        minused = false;
    }
    let inputValue = $('.input-field').val();
    inputValue = inputValue.split('');

    let help   = inputValue.length - 1;
    inputValue = inputValue.splice(0, help);
    inputValue = inputValue.join('');

    if(inputValue[inputValue.length-1] == '*' || inputValue[inputValue.length-1] == '/' || inputValue[inputValue.length-1] == '+') {
        operated = true;
    }else if(inputValue[inputValue.length-1] == '-') {
        minused = true;
    }else if(inputValue[inputValue.length-1] == '.' || inputValue[inputValue.length-2] == '.') {
        doted = true;
    }

    $('.input-field').val(`${inputValue}`);
}); // end click


function isInteger(num) {
  return (num ^ 0) === num;
}

}); // end ready
