function randomArray() {
    let arr = [];
    for (let i = 1; i <= 16; i++) {//doubt; why is 16 used there
        arr.push(Math.floor((Math.random() * 1.99)));//doubt: i still dont understand why float is used
    }
    return arr;
}
function zeroPositon() {
    start = (Math.floor(Math.random() * 3.99));
    return start;
}
function isValid(string) {
    let valid = true;
    for (let i = 0; i < string.length; i++) {
        if (string[i] == '0' || string[i] == '1') {
            continue;
        } else {
            valid = false;
        }
    }
    return valid;
}
// link: https://stackoverflow.com/questions/15677869/how-to-convert-a-string-of-numbers-to-an-array-of-numbers
function convertToIntArr(string) {
    let str = string.split('');
    let arr = str.map(Number);
    arr[arr.length] = arr[arr.length - 1];
    return arr;
}
function bitFlip(bit) {
    if (bit == 1) {
        return -1;
    } else {
        return 1;
    }
}

function min(a, b) {
    if (a < b) return a;
    else return b;
}


///////////////////////////////////////////////
/*--------- MANACHER'S ALGORITHM ---------*/ // O(N) Time Complexity
/////////////////////////////////////////////
// link: https://redquark.org/leetcode/0005-longest-palindromic-substring/#javascript
const LPS_ManachersAlgo = function (s) {//doubt:all of this
    let updatedString = getUpdatedString(s);
    const length = 2 * s.length + 1;
    let p = new Array(length);
    p.fill(0);
    let c = 0;
    let r = 0;
    let maxLength = 0;
    let position = -1;
    for (let i = 0; i < length; i++) {
        let mirror = 2 * c - i;
        if (i < r) {
            p[i] = Math.min(r - i, p[mirror]);
        }
        let a = i + (1 + p[i]);
        let b = i - (1 + p[i]);

        while (a < length && b >= 0 && updatedString[a] === updatedString[b]) {
            p[i]++;
            a++;
            b--;
        }
        if (i + p[i] > r) {
            c = i;
            r = i + p[i];
        }
        if (maxLength < p[i]) {
            maxLength = p[i];
            position = i;
        }
    }
    let offset = p[position];
    let result = "";
    for (let i = position - offset + 1; i <= position + offset - 1; i++) {
        if (updatedString[i] !== '#') {
            result += updatedString[i];
        }
    }
    return result;
};

function getUpdatedString(s) {
    let sb = "";
    for (let i = 0; i < s.length; i++) {
        sb += "#" + s[i];
    }
    sb += "#";
    return sb;
}
/*//////////////////////////////////////////////////////////////////////*/
/*--------------------SECTION NRZL-------------------------------------- */
/*//////////////////////////////////////////////////////////////////////*/
function nrzLencoder(arr) {
    let nrzL = [];
    for (let i = 0; i <= arr.length; i++) {
        if (arr[i] == 0) {
            nrzL[i] = -1
        } else {
            nrzL[i] = 1;
        }
    }
    return nrzL;
}

let cntNrzL = 0;
let ctx = document.querySelector('canvas');
function nrzLCanvasGenerator(dataArray, labelArray) {
    if (cntNrzL > 0) {
        document.getElementById('nrzLDivLPS').remove();
        document.getElementById('nrzLChart').remove();
    }
    let divLPS = document.createElement("div");
    divLPS.style.marginTop = '30px';
    divLPS.style.marginLeft = '20px';
    divLPS.style.display = 'flex';
    divLPS.setAttribute("class", "row nrzLDivLPS");
    divLPS.setAttribute("id", "nrzLDivLPS");
    let h4 = document.createElement("h4");
    h4.setAttribute("class", "nrzLPSHeading");
    let text = document.createTextNode("LONGEST PALINDROMIC SUBSTRING : ");
    h4.appendChild(text);
    let input = document.createElement("input");
    input.style.marginLeft = '5px';
    input.style.textAlign = 'center';
    input.style.height = '20px';
    input.style.marginTop = '20px';
    input.setAttribute("id", "nrzLPSForm");
    input.setAttribute("readonly", "true");
    input.value = LPS_ManachersAlgo(labelArray);
    divLPS.appendChild(h4);
    divLPS.appendChild(input);
    document.getElementById("putNrzLCanvas").appendChild(divLPS);
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "nrzLChart");
    document.getElementById("putNrzLCanvas").appendChild(canvas);
    var ctx = document.getElementById("nrzLChart").getContext("2d");
    let canvasWidth = document.getElementById("nrzLChart").offsetWidth;
    let noOfdataelements = dataArray.length;
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labelArray,
            datasets: [
                {
                    borderColor: "#ea1c2c",
                    data: dataArray,
                    steppedLine: true,
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            legend: {
                display: false,
            },
            responsive: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: -2,
                            max: 2,
                            stepSize: 1,
                            fontSize: canvasWidth / 30,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "VOLTAGE",
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            labelOffset: canvasWidth / (noOfdataelements * 2),
                            fontSize: canvasWidth / 20,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "SIGNAL ELEMENTS",
                        },
                    },
                ],
            },
        },
    });
    cntNrzL++;
}

let x = 0;
let customNrzLInput = document.querySelector('.customNrzLInput');
let customBtnNrzL = document.querySelector('#customBtnNrzL');
customBtnNrzL.addEventListener('click', () => {
    x++;
    let str = customNrzLInput.value;
    if (str.length === 0)
        alert("Data field is Empty!!");
    else if (isValid(str)) {
        let arr = convertToIntArr(str);
        let encodedSignal = nrzLencoder(arr);
        nrzLCanvasGenerator(encodedSignal, arr);
    } else {
        alert("Enter A Valid Data Stream");
    }
});
let randomNrzLInput = document.querySelector('.randomNrzLInput');
let randomBtnNrzL = document.querySelector('#randomBtnNrzL');

randomBtnNrzL.addEventListener('click', () => {
    x++;
    let arr = randomArray();
    let start = zeroPositon();
    end = Number(randomNrzLInput.value);
    for (let i = start; i < end + start; ++i) {
        arr[i] = 0;
    }
    let encodedSignal = nrzLencoder(arr);
    nrzLCanvasGenerator(encodedSignal, arr);
});

/*//////////////////////////////////////////////////////////////////////*/
/*--------------------SECTION NRZI-------------------------------------- */
/*//////////////////////////////////////////////////////////////////////*/
/*//////////////////////////////////////////////////////////////////////*/

function nrzIencoder(arr) {
    let nrzI = [];
    if (arr[0] == 1) {
        nrzI[0] = 1;
    } else {
        nrzI[0] = -1;
    }
    let currState = nrzI[0];
    for (let i = 1; i <= arr.length; i++) {
        if (arr[i] == 0) {
            nrzI[i] = currState;
        } else {
            if (currState == -1) {
                currState = 1;
            } else {
                currState = -1;
            }
            nrzI[i] = currState;
        }
    }
    return nrzI;
}

let cntNrzI = 0;
function nrzICanvasGenerator(dataArray, labelArray) {
    if (cntNrzI > 0) {
        document.getElementById("nrzIDivLPS").remove();
        document.getElementById("nrzIChart").remove();
    }
    let divLPS = document.createElement("div");
    divLPS.style.marginTop = '30px';
    divLPS.style.marginLeft = '20px';
    divLPS.style.display = 'flex';
    divLPS.setAttribute("class", "row nrzIDivLPS");
    divLPS.setAttribute("id", "nrzIDivLPS");
    let h4 = document.createElement("h4");
    h4.setAttribute("class", "nrzILPSHeading");
    let text = document.createTextNode("LONGEST PALINDROMIC SUBSTRING : ");
    h4.appendChild(text);
    let input = document.createElement("input");
    input.style.marginLeft = '5px';
    input.style.textAlign = 'center';
    input.style.height = '20px';
    input.style.marginTop = '20px';
    input.setAttribute("id", "nrzILPSForm");
    input.setAttribute("readonly", "true");
    input.value = LPS_ManachersAlgo(labelArray);
    divLPS.appendChild(h4);
    divLPS.appendChild(input);
    document.getElementById("putNrzICanvas").appendChild(divLPS);
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "nrzIChart");
    document.getElementById("putNrzICanvas").appendChild(canvas);
    var ctx = document.getElementById("nrzIChart").getContext("2d");
    let canvasWidth = document.getElementById("nrzIChart").offsetWidth;
    console.log(canvasWidth);
    let noOfdataelements = labelArray.length;
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labelArray,
            datasets: [
                {
                    borderColor: "#ea1c2c",
                    data: dataArray,
                    steppedLine: true,
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            legend: {
                display: false,
            },
            responsive: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: -2,
                            max: 2,
                            stepSize: 1,
                            fontSize: canvasWidth / 30,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "VOLTAGE",
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            labelOffset: canvasWidth / (noOfdataelements * 2),
                            fontSize: canvasWidth / 20,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "SIGNAL ELEMENTS",
                        },
                    },
                ],
            },
        },
    });
    cntNrzI++;
}

let customNrzIInput = document.querySelector('.customNrzIInput');
let customBtnNrzI = document.querySelector('#customBtnNrzI');
customBtnNrzI.addEventListener('click', () => {
    x++;
    let str = customNrzIInput.value;
    if (str.length === 0)
        alert("Data field is empty!!");
    else if (isValid(str)) {
        let arr = convertToIntArr(str);
        let encodedSignal = nrzIencoder(arr);
        nrzICanvasGenerator(encodedSignal, arr);
    } else {
        alert("Enter A Valid Digital Data Stream");
    }
});



let randomNrzIInput = document.querySelector('.randomNrzIInput');
let randomBtnNrzI = document.querySelector('#randomBtnNrzI');
randomBtnNrzI.addEventListener('click', () => {
    x++;
    let arr = randomArray();
    let start = zeroPositon();
    end = Number(randomNrzIInput.value);
    for (let i = start; i < end + start; ++i) {
        arr[i] = 0;
    }
    let encodedSignal = nrzIencoder(arr);
    nrzICanvasGenerator(encodedSignal, arr);
});



/*//////////////////////////////////////////////////////////////////////*/
/*----------------------------MANCHESTER------------------------------- */
/*//////////////////////////////////////////////////////////////////////*/
function manEncoder(arr) {
    let man = [];
    let index = 0;
    for (let i = 0; i <= arr.length; i++) {
        if (arr[i] == 0) {
            man[index++] = -1;
            man[index++] = 1;
        } else {
            man[index++] = 1;
            man[index++] = -1;
        }
    }
    return man;
}

function manLabelArray(arr) {
    let labelArray = [];
    let indexLA = 0;
    let indexA = 0;
    while (indexA < arr.length) {
        if (indexLA % 2 == 0) {
            labelArray[indexLA++] = arr[indexA++];
        } else {
            labelArray[indexLA++] = -1;
        }
    }
    return labelArray;
}

let cntMan = 0;
function manCanvasGenerator(dataArray, labelArray, arr) {
    if (cntMan > 0) {
        document.getElementById("manDivLPS").remove();
        document.getElementById("manChart").remove();
    }
    let divLPS = document.createElement("div");
    divLPS.style.marginTop = '30px';
    divLPS.style.marginLeft = '20px';
    divLPS.style.display = 'flex';
    divLPS.setAttribute("class", "row manDivLPS");
    divLPS.setAttribute("id", "manDivLPS");
    let h4 = document.createElement("h4");
    h4.setAttribute("class", "manLPSHeading");
    let text = document.createTextNode("LONGEST PALINDROMIC SUBSTRING : ");
    h4.appendChild(text);
    let input = document.createElement("input");
    input.style.marginLeft = '5px';
    input.style.textAlign = 'center';
    input.style.height = '20px';
    input.style.marginTop = '20px';
    input.setAttribute("id", "manLPSForm");
    input.setAttribute("readonly", "true");
    input.value = LPS_ManachersAlgo(arr);
    divLPS.appendChild(h4);
    divLPS.appendChild(input);
    document.getElementById("putManCanvas").appendChild(divLPS);
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "manChart");
    document.getElementById("putManCanvas").appendChild(canvas);
    var ctx = document.getElementById("manChart").getContext("2d");
    let canvasWidth = document.getElementById('manChart').offsetWidth;
    let noOfdataelements = labelArray.length / 2;
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labelArray,
            datasets: [
                {
                    borderColor: "#ea1c2c",
                    data: dataArray,
                    steppedLine: true,
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            elements: {
                point: {
                    radius: 0,
                },
            },
            legend: {
                display: false,
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: -2,
                            max: 2,
                            stepSize: 1,
                            fontSize: canvasWidth / 30,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "VOLTAGE",
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            fontSize: canvasWidth / 20,
                            labelOffset: canvasWidth / (noOfdataelements * 2),
                            callback: function (value, index, values) {
                                if (index % 2 === 0) {
                                    return value;
                                } else {
                                    return " ";
                                }
                            },
                        },
                        gridLines: {
                            lineWidth: 1,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "SIGNAL ELEMENTS",
                        },
                    },
                ],
            },
        },
    });
    cntMan++;
}

let customManInput = document.querySelector('.customManInput');
let customBtnMan = document.querySelector('#customBtnMan');
customBtnMan.addEventListener('click', () => {
    x++;
    let str = customManInput.value;
    if (str.length === 0)
        alert("Data field is empty!!");
    else if (isValid(str)) {
        let arr = convertToIntArr(str);
        let encodedSignal = manEncoder(arr);
        let labelArray = manLabelArray(arr);
        manCanvasGenerator(encodedSignal, labelArray, arr);
    } else {
        alert("Enter A Valid Digital Data Stream");
    }
});
let randomManInput = document.querySelector('.randomManInput');
let randomBtnMan = document.querySelector('#randomBtnMan');

randomBtnMan.addEventListener('click', () => {
    x++;
    let arr = randomArray();
    let start = zeroPositon();
    end = Number(randomManInput.value);
    for (let i = start; i < end + start; ++i) {
        arr[i] = 0;
    }
    let encodedSignal = manEncoder(arr);
    let labelArray = manLabelArray(arr);
    manCanvasGenerator(encodedSignal, labelArray, arr);
});

/*//////////////////////////////////////////////////////////////////////*/
/*-----------------------DIFFERENTIAL MANCHESTER----------------------- */
/*//////////////////////////////////////////////////////////////////////*/
function diffManEncoder(arr) {
    let diffMan = [];
    let currState;
    let indexLA = 0;
    let indexA = 1;
    if (arr[0] == 1) {
        diffMan[indexLA++] = 1;
        diffMan[indexLA++] = -1;
        currState = -1;
    } else {
        diffMan[indexLA++] = -1;
        diffMan[indexLA++] = 1;
        currState = 1;
    }
    while (indexA < arr.length) {
        if (arr[indexA] == 1) {
            diffMan[indexLA++] = currState;
            currState = bitFlip(currState);
            diffMan[indexLA++] = currState;
        } else {
            currState = bitFlip(currState);
            diffMan[indexLA++] = currState;
            currState = bitFlip(currState);
            diffMan[indexLA++] = currState;
        }
        indexA++;
    }
    return diffMan;
}

function diffManLabelArray(arr) {
    let labelArray = [];
    let indexLA = 0;
    let indexA = 0;
    while (indexA < arr.length) {
        if (indexLA % 2 == 0) {
            labelArray[indexLA++] = arr[indexA++];
        } else {
            labelArray[indexLA++] = -1;
        }
    }
    return labelArray;
}

let cntDiffMan = 0;
function diffManCanvasGenerator(dataArray, labelArray, arr) {
    if (cntDiffMan > 0) {
        document.getElementById("diffManDivLPS").remove();
        document.getElementById("diffManChart").remove();
    }
    let divLPS = document.createElement("div");
    divLPS.style.marginTop = '30px';
    divLPS.style.marginLeft = '20px';
    divLPS.style.display = 'flex';
    divLPS.setAttribute("class", "row diffManDivLPS");
    divLPS.setAttribute("id", "diffManDivLPS");
    let h4 = document.createElement("h4");
    h4.setAttribute("class", "diffManLPSHeading");
    let text = document.createTextNode("LONGEST PALINDROMIC SUBSTRING : ");
    h4.appendChild(text);
    let input = document.createElement("input");
    input.style.marginLeft = '5px';
    input.style.textAlign = 'center';
    input.style.height = '20px';
    input.style.marginTop = '20px';
    input.setAttribute("id", "diffManLPSForm");
    input.setAttribute("readonly", "true");
    input.value = LPS_ManachersAlgo(arr);
    divLPS.appendChild(h4);
    divLPS.appendChild(input);
    document.getElementById("putDiffManCanvas").appendChild(divLPS);
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "diffManChart");
    document.getElementById("putDiffManCanvas").appendChild(canvas);
    var ctx = document.getElementById("diffManChart").getContext("2d");
    let canvasWidth = document.getElementById('diffManChart').offsetWidth;
    let noOfdataelements = labelArray.length / 2;
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labelArray,
            datasets: [
                {
                    borderColor: "#ea1c2c",
                    data: dataArray,
                    steppedLine: true,
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            elements: {
                point: {
                    radius: 0,
                },
            },
            legend: {
                display: false,
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: -2,
                            max: 2,
                            stepSize: 1,
                            fontSize: canvasWidth / 30,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "VOLTAGE",
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            fontSize: canvasWidth / 20,
                            labelOffset: canvasWidth / (noOfdataelements * 2),
                            callback: function (value, index, values) {
                                if (index % 2 === 0) {
                                    return value;
                                } else {
                                    return " ";
                                }
                            },
                        },
                        gridLines: {
                            lineWidth: 1,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "SIGNAL ELEMENTS",
                        },
                    },
                ],
            },
        },
    });
    cntDiffMan++;
}

let customDiffManInput = document.querySelector('.customDiffManInput');
let customBtnDiffMan = document.querySelector('#customBtnDiffMan');
customBtnDiffMan.addEventListener('click', () => {
    x++;
    let str = customDiffManInput.value;
    if (str.length === 0)
        alert("Data field is empty!!");
    else if (isValid(str)) {
        let arr = convertToIntArr(str);
        let encodedSignal = diffManEncoder(arr);
        let labelArray = diffManLabelArray(arr);
        diffManCanvasGenerator(encodedSignal, labelArray, arr);
    } else {
        alert("Enter A Valid Digital Data Stream");
    }
});

let randomDiffManInput = document.querySelector('.randomDiffManInput');
let randomBtnDiffMan = document.querySelector('#randomBtnDiffMan');
randomBtnDiffMan.addEventListener('click', () => {
    x++;
    let arr = randomArray();
    let start = zeroPositon();
    end = Number(randomDiffManInput.value);
    for (let i = start; i < end + start; ++i) {
        arr[i] = 0;
    }
    let encodedSignal = diffManEncoder(arr);
    let labelArray = diffManLabelArray(arr);
    diffManCanvasGenerator(encodedSignal, labelArray, arr);
});

/*//////////////////////////////////////////////////////////////////////*/
/*---------------------------SECTION AMI------------------------------- */
/*//////////////////////////////////////////////////////////////////////*/
function amiEncoder(arr) {
    let prevState = -1;
    let ami = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
                prevState = bitFlip(prevState);
                ami[i] = prevState;
        } else {
            ami[i] = 0;
        }
    }
    return ami;
}

function amiLabelArray(arr) {
    let labelArray = arr;
    return labelArray;
}

let cntAmi = 0;
function amiCanvasGenerator(dataArray, labelArray) {
    if (cntAmi > 0) {
        document.getElementById('amiDivLPS').remove();
        document.getElementById("amiChart").remove();
    }
    let divLPS = document.createElement("div");
    divLPS.style.marginTop = '30px';
    divLPS.style.marginLeft = '20px';
    divLPS.style.display = 'flex';
    divLPS.setAttribute("class", "row amiDivLPS");
    divLPS.setAttribute("id", "amiDivLPS");
    let h4 = document.createElement("h4");
    h4.setAttribute("class", "amiLPSHeading");
    let text = document.createTextNode("LONGEST PALINDROMIC SUBSTRING : ");
    h4.appendChild(text);
    let input = document.createElement("input");
    input.style.marginLeft = '5px';
    input.style.textAlign = 'center';
    input.style.height = '20px';
    input.style.marginTop = '20px';
    input.setAttribute("id", "amiLPSForm");
    input.setAttribute("readonly", "true");
    input.value = LPS_ManachersAlgo(labelArray);
    divLPS.appendChild(h4);
    divLPS.appendChild(input);
    document.getElementById("putAmiCanvas").appendChild(divLPS);
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "amiChart");
    document.getElementById("putAmiCanvas").appendChild(canvas);
    var ctx = document.getElementById("amiChart").getContext("2d");
    let canvasWidth = document.getElementById('amiChart').offsetWidth;
    let noOfdataelements = labelArray.length;
    let myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labelArray,
            datasets: [
                {
                    borderColor: "#ea1c2c",
                    data: dataArray,
                    steppedLine: true,
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            elements: {
                point: {
                    radius: 0,
                },
            },
            legend: {
                display: false,
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: -2,
                            max: 2,
                            stepSize: 1,
                            fontSize: canvasWidth / 30,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "VOLTAGE",
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            fontSize: canvasWidth / 20,
                            labelOffset: canvasWidth / (noOfdataelements * 2),
                        },
                        gridLines: {
                            lineWidth: 1,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "SIGNAL ELEMENTS",
                        },
                    },
                ],
            },
        },
    });
    cntAmi++;
}

let customAmiInput = document.querySelector('.customAmiInput');
let customBtnAmi = document.querySelector('#customBtnAmi');
customBtnAmi.addEventListener('click', () => {
    x++;
    let str = customAmiInput.value;
    if (str.length === 0)
        alert("Data field is empty!!");
    else if (isValid(str)) {
        let arr = convertToIntArr(str);
        let encodedSignal = amiEncoder(arr);
        let labelArray = amiLabelArray(arr);
        amiCanvasGenerator(encodedSignal, labelArray);
    } else {
        alert("Enter A Valid Digital Data Stream");
    }
});

let randomAmiInput = document.querySelector('.randomAmiInput');
let randomBtnAmi = document.querySelector('#randomBtnAmi');
randomBtnAmi.addEventListener('click', () => {
    x++;
    let arr = randomArray();
    let start = zeroPositon();
    end = Number(randomAmiInput.value);
    for (let i = start; i < end + start; ++i) {
        arr[i] = 0;
    }
    let encodedSignal = amiEncoder(arr);
    let labelArray = amiLabelArray(arr);
    amiCanvasGenerator(encodedSignal, labelArray);
});

/*//////////////////////////////////////////////////////////////////////*/
/*---------------------------SECTION B8ZS------------------------------- */
/*//////////////////////////////////////////////////////////////////////*/
function bezsEncoder(arr) {
    let bezs = [];
    let count8 = 0;
    let prevState = -2;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
            count8++;
            if (count8 == 8) {
                if (prevState == -2) {
                    bezs[i - 4] = 1;
                    prevState = 1;
                    prevState = bitFlip(prevState);
                    bezs[i - 3] = prevState;
                    bezs[i - 1] = prevState;
                    prevState = bitFlip(prevState);
                    bezs[i] = prevState;
                } else {
                    bezs[i - 4] = prevState;
                    prevState = bitFlip(prevState);
                    bezs[i - 3] = prevState;
                    bezs[i - 1] = prevState;
                    prevState = bitFlip(prevState);
                    bezs[i] = prevState;
                }
                count8 = 0;
            } else {
                bezs[i] = 0;
            }
        } else {
            count8 = 0;
            if (prevState == -2) {
                bezs[i] = 1;
                prevState = 1;
            } else {
                prevState = bitFlip(prevState);
                bezs[i] = prevState;
            }
        }
    }
    return bezs;
}
function bezsLabelArray(arr) {
    let labelArray = arr;
    return labelArray;
}

let cntBezs = 0;
function bezsCanvasGenerator(dataArray, labelArray) {
    if (cntBezs > 0) {
        document.getElementById("bezsDivLPS").remove();
        document.getElementById("bezsChart").remove();
    }
    let divLPS = document.createElement("div");
    divLPS.style.marginTop = '30px';
    divLPS.style.marginLeft = '20px';
    divLPS.style.display = 'flex';
    divLPS.setAttribute("class", "row bezsDivLPS");
    divLPS.setAttribute("id", "bezsDivLPS");
    let h4 = document.createElement("h4");
    h4.setAttribute("class", "bezsLPSHeading");
    let text = document.createTextNode("LONGEST PALINDROMIC SUBSTRING : ");
    h4.appendChild(text);
    let input = document.createElement("input");
    input.style.marginLeft = '5px';
    input.style.textAlign = 'center';
    input.style.height = '20px';
    input.style.marginTop = '20px';
    input.setAttribute("id", "bezsLPSForm");
    input.setAttribute("readonly", "true");
    input.value = LPS_ManachersAlgo(labelArray);
    divLPS.appendChild(h4);
    divLPS.appendChild(input);
    document.getElementById("putBezsCanvas").appendChild(divLPS);
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "bezsChart");
    document.getElementById("putBezsCanvas").appendChild(canvas);
    var ctx = document.getElementById("bezsChart").getContext("2d");
    let canvasWidth = document.getElementById('bezsChart').offsetWidth;
    let noOfdataelements = labelArray.length;
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labelArray,
            datasets: [
                {
                    borderColor: "#ea1c2c",
                    data: dataArray,
                    steppedLine: true,
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            elements: {
                point: {
                    radius: 0,
                },
            },
            legend: {
                display: false,
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: -2,
                            max: 2,
                            stepSize: 1,
                            fontSize: canvasWidth / 30,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "VOLTAGE",
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            fontSize: canvasWidth / 20,
                            labelOffset: canvasWidth / (noOfdataelements * 2),
                        },
                        gridLines: {
                            lineWidth: 1,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "SIGNAL ELEMENTS",
                        },
                    },
                ],
            },
        },
    });
    cntBezs++;
}

let customBezsInput = document.querySelector('.customBezsInput');
let customBtnBezs = document.querySelector('#customBtnBezs');
customBtnBezs.addEventListener('click', () => {
    x++;
    let str = customBezsInput.value;
    if (str.length === 0)
        alert("Data field is empty!!");
    else if (isValid(str)) {
        let arr = convertToIntArr(str);
        let encodedSignal = bezsEncoder(arr);
        let labelArray = bezsLabelArray(arr);
        bezsCanvasGenerator(encodedSignal, labelArray);
    } else {
        alert("Enter A Valid Digital Data Stream");
    }
});

let randomBezsInput = document.querySelector('.randomBezsInput');
let randomBtnBezs = document.querySelector('#randomBtnBezs');
randomBtnBezs.addEventListener('click', () => {
    x++;
    let arr = randomArray();
    let start = zeroPositon();
    end = Number(randomBezsInput.value);
    for (let i = start; i < end + start; ++i) {
        arr[i] = 0;
    }
    let encodedSignal = bezsEncoder(arr);
    let labelArray = bezsLabelArray(arr);
    bezsCanvasGenerator(encodedSignal, labelArray);
});

//////////////////////////////////////////////////////////////////////////
/*------------------------------- HDB3 -------------------------------- */
//////////////////////////////////////////////////////////////////////////
function hdbtEncoder(arr) {
    let hdb3 = [];
    let count4 = 0;
    let countPulses = 0;
    let prevState = -2;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
            count4++;
            if (count4 == 4) {
                console.log("testing");
                if (prevState == -2) {
                    hdb3[i - 3] = 1;
                    prevState = 1;
                    hdb3[i] = prevState;
                    countPulses += 2;
                } else {
                    if (countPulses % 2 == 0) {
                        prevState = bitFlip(prevState);
                        hdb3[i - 3] = prevState;
                        hdb3[i] = prevState;
                        countPulses += 2;
                    } else {
                        hdb3[i] = prevState;
                        countPulses += 1;
                    }
                }
                count4 = 0;
            } else {
                hdb3[i] = 0;
            }
        } else {
            count4 = 0;
            countPulses++;
            if (prevState == -2) {
                hdb3[i] = 1;
                prevState = 1;
            } else {
                prevState = bitFlip(prevState);
                hdb3[i] = prevState;
            }
        }
    }
    return hdb3;
}
function hdbtLabelArray(arr) {
    let labelArray = arr;
    return labelArray;
}

let cntHdbt = 0;
function hdbtCanvasGenerator(dataArray, labelArray) {
    if (cntHdbt > 0) {
        document.getElementById("hdbtDivLPS").remove();
        document.getElementById("hdbtChart").remove();
    }
    let divLPS = document.createElement("div");
    divLPS.style.marginTop = '30px';
    divLPS.style.marginLeft = '20px';
    divLPS.style.display = 'flex';
    divLPS.setAttribute("class", "row hdbtDivLPS");
    divLPS.setAttribute("id", "hdbtDivLPS");
    let h4 = document.createElement("h4");
    h4.setAttribute("class", "hdbtLPSHeading");
    let text = document.createTextNode("LONGEST PALINDROMIC SUBSTRING : ");
    h4.appendChild(text);
    let input = document.createElement("input");
    input.style.marginLeft = '5px';
    input.style.textAlign = 'center';
    input.style.height = '20px';
    input.style.marginTop = '20px';
    input.setAttribute("id", "hdbtLPSForm");
    input.setAttribute("readonly", "true");
    input.value = LPS_ManachersAlgo(labelArray);
    divLPS.appendChild(h4);
    divLPS.appendChild(input);
    document.getElementById("putHdbtCanvas").appendChild(divLPS);
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "hdbtChart");
    document.getElementById("putHdbtCanvas").appendChild(canvas);
    var ctx = document.getElementById("hdbtChart").getContext("2d");
    let canvasWidth = document.getElementById('hdbtChart').offsetWidth;
    let noOfdataelements = labelArray.length;
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labelArray,
            datasets: [
                {
                    borderColor: "#ea1c2c",
                    data: dataArray,
                    steppedLine: true,
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            elements: {
                point: {
                    radius: 0,
                },
            },
            legend: {
                display: false,
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: -2,
                            max: 2,
                            stepSize: 1,
                            fontSize: canvasWidth / 30,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "VOLTAGE",
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            fontSize: canvasWidth / 20,
                            labelOffset: canvasWidth / (noOfdataelements * 2),
                        },
                        gridLines: {
                            lineWidth: 1,
                        },
                        scaleLabel: {
                            display: true,
                            align: "center",
                            labelString: "SIGNAL ELEMENTS",
                        },
                    },
                ],
            },
        },
    });
    cntHdbt++;
}

let customHdbtInput = document.querySelector('.customHdbtInput');
let customBtnHdbt = document.querySelector('#customBtnHdbt');
customBtnHdbt.addEventListener('click', () => {
    x++;
    let str = customHdbtInput.value;
    if (str.length === 0)
        alert("Data field is empty!!");
    else if (isValid(str)) {
        let arr = convertToIntArr(str);
        let encodedSignal = hdbtEncoder(arr);
        let labelArray = hdbtLabelArray(arr);
        hdbtCanvasGenerator(encodedSignal, labelArray);
    } else {
        alert("Enter A Valid Digital Data Stream");
    }
});

let randomHdbtInput = document.querySelector('.randomHdbtInput');
let randomBtnHdbt = document.querySelector('#randomBtnHdbt');
randomBtnHdbt.addEventListener('click', () => {
    x++;
    let arr = randomArray();
    let start = zeroPositon();
    end = Number(randomHdbtInput.value);
    for (let i = start; i < end + start; ++i) {
        arr[i] = 0;
    }
    let encodedSignal = hdbtEncoder(arr);
    let labelArray = hdbtLabelArray(arr);
    hdbtCanvasGenerator(encodedSignal, labelArray);
});