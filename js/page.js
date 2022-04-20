// Charts
let ctx = document.getElementById('alphabetArray').getContext('2d');

  
//Fn to get random color for bar background
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    return color;
}

//Fn to define range for making labels 
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
//Fn to making sequentic labels
let alphabetLabels = range('A'.charCodeAt(), 'Z'.charCodeAt(), 1).map(x => String.fromCharCode(x));

//Fn to randomize background color
let backgroundColor = Array.apply(null, Array(26)).map(function(x,i){return getRandomColor()});

let alphabetArray = new Array(26);

$("input").keydown(function(){
    textInputSubmit();
  });

$("input").keyup(function(){
textInputSubmit();
});

function textInputSubmit() {

    let input = document.getElementById("textInput").value;
    let inputArray = input.toUpperCase().split("");

    for (let i=0; i<26; ++i) alphabetArray[i] = 0;

    //Writing the data onto the AlphArray

    for (iter of inputArray){
        if(iter.charCodeAt()>= 'A'.charCodeAt() && iter.charCodeAt()<= 'Z'.charCodeAt()){            
            let letterIndex = iter.charCodeAt()-'A'.charCodeAt();
            alphabetArray[letterIndex]++;
        }
    } 
    alphabetChart.update();
}

function textInputReset(){
    document.getElementById("textInput").value = null;
    textInputSubmit();
}

// Bar
var alphabetChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: alphabetLabels,
        datasets: [{
            label: '# of letters',
            data: alphabetArray,
            backgroundColor,
            borderWidth: 0
        }]
    },

    plugins: {
        datalabels: {
            display: true,
            align: 'center',
            anchor: 'center',
            formatter: function (value, context) { return value || null;},
                }
         },

    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                        }
                    }]
                }
            },
        responsive: true,
        maintainAspectRatio: false,
});
        

