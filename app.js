var _ = require('underscore');

//랜덤 integer 발생 함수
function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var obj = {}; //key val 자료구조 (list)
var arr = []; //array 자료구조 (array)
var count = 1000000; //자료갯수
var testCount = 100; //테스트 횟수

/*
*   테스트 자료 만들기
* */
for(var i=0;i<count;i++){

    // 1. obj 를 만들자
    obj['a'+i] = {idx:'a'+i,x:i,y:i+100};

    // 2. arr 를 만들자
    arr.push({idx:'a'+i,x:i,y:i+100})

}

/*
*   검색할 인덱스를 만들어 보자
* */
var index = [];
for(var x = 0;x<10;x++){
    index.push('a'+randomIntInc(0,count));
}

/*
*   테스트 결과
* */
var report = {};

/*
*
*   list 에서 key 로 검색 해봅니다. 그야말로 index 를 가지고 찾아 가는것 이겠지요
*
* */

var start1 = new Date().getTime();
for(var cnt=0;cnt<testCount;cnt++){
    //검색 테스트
    for(var i= 0,len=index.length;i<len;i++){
        console.log( 'list',cnt,obj[index[i]]);
    }
}
var elapsed1 = new Date().getTime() - start1;
report['list'] = elapsed1;


/*
 *
 *   array 에서 loop 로 검색 해봅니다. 검색이 되면 break 합니다.
 *
 * */

var start2 = new Date().getTime();
for(var cnt=0;cnt<testCount;cnt++){
    //검색 테스트
    for(var i= 0,len=index.length;i<len;i++){
        for(var j= 0,ln=arr.length;j<ln;j++){
            if(index[i] === arr[j].idx){
                console.log( 'array',cnt,arr[j]);
                break;
            }
        }
    }
}
var elapsed2 = new Date().getTime() - start2;
report['arr'] = elapsed2;


/*
 *
 *   underscore 가지고 arr 를 찾아 봅니다.
 *
 * */

var start3 = new Date().getTime();
for(var cnt=0;cnt<testCount;cnt++){
    //검색 테스트
    for(var i= 0,len=index.length;i<len;i++){

        console.log( 'underscore',cnt,_.findWhere(arr,{idx:index[i]}) );

    }
}
var elapsed3 = new Date().getTime() - start3;
report['listUnderscore'] = elapsed3;

/*
 *
 *   underscore 가지고 arr-->object 로 변환후 해봅니다.
 *
 * */

var start4 = new Date().getTime();

var nice = _.indexBy(arr, 'idx');

var convert4 = new Date().getTime() - start4;

for(var cnt=0;cnt<testCount;cnt++){
    //검색 테스트
    for(var i= 0,len=index.length;i<len;i++){
        console.log( 'list2obj',cnt,nice[index[i]]);
    }
}
var elapsed4 = new Date().getTime() - start4;

//변환속도
report['list2obj_convert4'] = convert4;
report['list2obj'] = elapsed4;

console.log(report);

