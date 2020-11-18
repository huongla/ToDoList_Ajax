var Validation = function () {
    this.checkNull = function (value, selectorError) {
        var specialLetter = /^[`~\{\[\}\]\\\|;:"'<,>\.?/]$/;
        if (value.trim() === '') {
            // document.querySelector(selectorError).placeholder = 'PLEASE ADD A TASK';
            document.querySelector(selectorError).value = 'PLEASE ENTER A TASK';
            document.querySelector(selectorError).style.color = '#2bfe72';
            

            return false;
        }
        if(specialLetter.test(value)){
            document.querySelector(selectorError).value = ' DONT ENTER A SPECIAL LETTER';
            // document.querySelector(selectorError).placeholder = 'PLS DONT ADD A SPECIAL LETTER';
            document.querySelector(selectorError).style.color = '#2bfe72';
            
            return false;
        }
        
        document.querySelector(selectorError).value = '';
       
        return true;
    }
    
}