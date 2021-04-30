
const end = 28;
const select = [0, 0, 0, 0];


const main = document.querySelector("#main");
const test = document.querySelector('#test');
const result = document.querySelector('#result');

function start() {
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        test.style.WebkitAnimation = "fadeIn 1s";
        test.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            test.style.display = "block"
        }, 450)
        let qNum = 0;
        goTest(qNum);
    }, 450);
}

function goTest(qNum) {
    if (qNum == end) {
        goResult();
        return;
    }

    var q = document.querySelector('.q');
    q.innerHTML = testList[qNum].q;

    for (let i in testList[qNum].a) {
        addAnswer(testList[qNum].a[i].answer, qNum, i);
    }
}


function addAnswer(answerText, qNum, idx) {
    var a = document.querySelector('.a');
    var answer = document.createElement('button');
    answer.classList.add('aList');
    answer.classList.add('fadeIn');

    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function() {
        var children = document.querySelectorAll('.aList');
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            var target = testList[qNum].a[idx].type;
            for (let i = 0; i < target.length; i++) {
                select[target[i]] += 1;
            }
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goTest(++qNum);
        }, 450)
    }, false);
}



function goResult() {
    test.style.WebkitAnimation = "fadeOut 1s";
    test.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            test.style.display = "none";
            result.style.display = "block"
        }, 450)
    })
    setResult();
}


function setResult() {
    let point = calResult();
    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = '"'+resultList[point].name+'"';

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = './image/House-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('house');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = resultList[point].desc;
}

function calResult() {
    console.log(select);
    var result = select.indexOf(Math.max(...select));
    return result;
}