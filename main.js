$(document).ready(function() {

let doted    = false,
    operated = false,
    zeroed   = false;

$('.num').click(function() {
    let inputValue = $('.input-field').val(),
        thisNum    = $(this).text();

    if(zeroed) {
        zeroed = false;
        $('.input-field').val(`${thisNum}`);
        return
    }
    operated = false;

    $('.input-field').val(`${inputValue}${thisNum}`);
}); // end click

$('.operation').click(function() {
    let inputValue = $('.input-field').val(),
        thisOper   = $(this).text();

    if(!operated) {
        doted    = false;
        operated = true;

        $('.input-field').val(`${inputValue}${thisOper}`);
    }else {
        inputValue = inputValue.split('');
        let help   = inputValue.length - 1;
        inputValue = inputValue.splice(0, help);
        inputValue = inputValue.join('');

        $('.input-field').val(`${inputValue}${thisOper}`);
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
        result = +result.toFixed(10);
        if(result == Infinity) {
            alert('Error');
            $('.clear').click();
            return
        }else if(result == 0) {
            zeroed = true;
        }
        $('.input-field').val(result);
        if(!(isInteger(result))) {
            doted = true;
        }
    }catch {
        $('.clear').click();
    }
}); // end click

$('.clear').click(function() {
    $('.input-field').val('');
    doted  = false;
    zeroed = false;
}); // end click

$('.dot').click(function() {
    if(!doted) {
        operated = false;
        doted = true;
        zeroed = false;
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
    let inputValue = $('.input-field').val();
    inputValue = inputValue.split('');

    let help   = inputValue.length - 1;
    inputValue = inputValue.splice(0, help);
    inputValue = inputValue.join('');

    if(inputValue[inputValue.length-1] == '*' || inputValue[inputValue.length-1] == '/' || inputValue[inputValue.length-1] == '-' || inputValue[inputValue.length-1] == '+') {
        console.log('in');
        operated = true;
    }

    $('.input-field').val(`${inputValue}`);
}); // end click


function isInteger(num) {
  return (num ^ 0) === num;
}

}); // end ready
