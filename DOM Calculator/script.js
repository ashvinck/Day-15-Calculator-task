


let eCalculator = document.getElementById('calculator');
let eNumSave = document.getElementById('numSave');
let eNumCur = document.getElementById('numCur');
let eBtnWrap = document.getElementById('calculatorKeys');
let eShowM = document.getElementById('showM');





let sStep = '';
let sCurValue = '0'; 
let nResult = null;
let sMark = ''; //operator
let nMvalue = 0; //Memory
let bLogStatus = false; //input status


// Outsourcing container adds mouse down event , Used to prevent text from being selected 
eCalculator.addEventListener('mousedown',function(event){
    // Prevent the default behavior when the mouse is pressed , Prevent selecting text when clicking the button too fast 
    event.preventDefault();
});
    


// key events
eBtnWrap.addEventListener('click',function(event){
     const eTarget = event.target;
     const key = eTarget.dataset.key;
     const value = eTarget.dataset.value;
    if(key){
        switch(key){
    
        // The number key
        case 'Num':
          fnInputNum(value);
        break;
    
        // Decimal operation 
        case 'Point':
          if(sCurValue.indexOf('.')==-1){
          sCurValue = sCurValue + '.';
          bLogStatus = true;
          }
        break;
    
        // Basic operations of addition, subtraction, multiplication and division 
        case 'Base':
          fnBaseCount(value);
        break;
    
        // be equal to 
        case 'Equal':
          fnEqual();
        break;
    
        // eliminate 
        case 'Clear':
          fnClear()
        break;
    
        // Backspace 
        case 'BACK':
          fnBack();
        break;
          
        //CE
        case 'CE': 
          sCurValue = '0';
          bLogStatus = false;
        break;
          
        // Take the opposite 
        case 'Negate':
          sCurValue = ''+(-sCurValue);
        break;
          
        // Square root 
        case 'Square': 
          nResult = Math.sqrt(+sCurValue);
        // Other data initialization 
          sCurValue = ''+nResult;
          sStep = '';
          sMark = '';
          bLogStatus = false;
        break;
          
        // Reciprocal 
        case 'Reciprocal':
        // Other data initialization 
          nResult = 1/sCurValue;
          sCurValue = ''+nResult;
          sStep = '';
          sMark = '';
          bLogStatus = false;
        break;
          
    
        //M series 
           
        case 'MC':// The memory value is cleared
            nMvalue = 0;
            fnShowM()
        break;
          
        case 'MR':  // Display memory values 
            sCurValue = '' + nMvalue;
            fnShowM()
        break;
            
        case 'MS': // Change the memory value to the current value 
            nMvalue = +sCurValue;
            fnShowM()
        break;
            
        case 'MA': // Add the current value to the memory value 
            nMvalue += +sCurValue;
            fnShowM()
        break;
            
        case 'ML':  // Subtract the current value from the memory value 
            nMvalue -= +sCurValue;
            fnShowM()
        break;
        }
        // Display data to display digital area 
        fnShowResult();
     }
    
});



function fnClear(){ // eliminate 
    // Initialize all data 
    sStep = '';
    sCurValue = '0';
    nResult = null;
    sMark = '';
    bLogStatus = false;
}


function fnBack(){   // Backspace  
   if(bLogStatus){
       sCurValue = sCurValue.slice(0,sCurValue.length-1); // Subtract the last digit of the number 
   if(sCurValue==''||sCurValue=='-'){ // If the last value is empty or negative (-), Change it to 0, Reset the input status to false, No more backspace 
       sCurValue = '0';
       bLogStatus = false;
    }
    }
}


function fnShowM(){ // To determine if there is M Memory storage 
   bLogStatus = false; 
   eShowM.style.display = nMvalue==0?'none':'block';
}

    
    
function fnInputNum(num){ // Input number 
    if(bLogStatus){
    sCurValue = sCurValue + num;
    }else{
    if(num!=0){
    bLogStatus = true;
    }
    sCurValue = num;
    }
}
      

function fnCountResult(){  // The result of the calculation is
  switch(sMark){ // Determine the current operator and perform the operation 
    case '+':
        nResult = nResult===null?+sCurValue:nResult + (+sCurValue);
    break; 

    case '-':
        nResult = nResult===null?+sCurValue:nResult - sCurValue;
    break;
    
    case '*':
        nResult = nResult===null?+sCurValue:nResult * sCurValue;
    break;
    
    case '/':
        nResult = nResult===null?+sCurValue:nResult / sCurValue;
    break;
    case '%':
        nResult = nResult === null?+sCurValue:nResult % sCurValue;
    break;
    
    default:
        nResult = +sCurValue;
    }
}
    
// Basic operations of addition, subtraction, multiplication and division 
function fnBaseCount(key){
    if(bLogStatus){
        bLogStatus = false;
        sStep = sStep + ' ' + sCurValue + ' ' + key;
        fnCountResult();
        sCurValue = ''+nResult;
    }
    else{
      if(sStep==''){
       sStep = sCurValue + ' ' + key;
      }
      else{ 
        sStep = sStep.slice(0,sStep.length-1) + ' ' + key;
      }
    }
    sMark = key;
}



function fnEqual(){  // be equal to  
        if(sMark=='')return; // If there is no operator , Prevent subsequent operations
         fnCountResult(); // The result of the calculation is
         sCurValue = ''+nResult;
        // Reset the data 
         sStep = '';
         sMark = '';
        bLogStatus = false;
}

    
    
// Show calculation results 
function fnShowResult(){
       eNumSave.innerHTML = sStep; // Display the calculation formula 
    if(sCurValue.length>14){ //numlimit to 14
       sCurValue = sCurValue.slice(0,14);
    }
    // Show the current number 
    eNumCur.innerHTML = sCurValue;
}



/////////
// Keyboard events ////////
/////////

document.addEventListener('keyup',function(event){
    let key = event.key;
    let code = event.keyCode; 
    let comply = false;
    // Input number 
    if((code>=48&&code<=57)||(code>=96&&code<=105)){
        fnInputNum(key);
        comply = true;
    }
    
    // Add, subtract, multiply and divide 
    if( key=='*'||key=='+'||key=='/'||key=='-'){
        fnBaseCount(key);
        comply = true;
    }

    //esc key 
    if(code==27){
       fnClear();
       comply = true;
    }
    
    // Enter key 
    if(code==13){
       fnEqual();
       comply = true;
    }
    
    // backspace 
    if(code==8){  
       fnBack();
       comply = true;
    }
    
    if(comply){
    // Display data to calculator screen 
    fnShowResult();
    }
    else{
        alert('Only numbers are allowed');

    }
});
    