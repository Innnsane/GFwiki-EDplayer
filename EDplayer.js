/* ED列表 */
var EDlist = document.querySelectorAll(".EDLIST");
for(var i=0; i<EDlist.length; i++){
    EDlist[i].setAttribute("index", i);
    EDlist[i].addEventListener("click", function(){EDselect(this);});
}

/* ED名称 */
var EDnames = new Array(EDlist.length + 1);
EDnames[0] = "塌缩点 What am I Fighting for";
EDnames[1] = "异构体 シラカバの光";
EDnames[2] = "裂变链接 Connexion";
EDnames[3] = "偏振光 Polaris";
EDnames[4] = "双联乱数 Rainfall";
for(var i=0; i<EDlist.length; i++)EDlist[i].innerHTML = EDnames[i];

/* ED地址 */
var EDsongs = new Array(EDlist.length + 1);
EDsongs[0] = "http://www.gfwiki.org/images/4/47/GF_Song.wav";
EDsongs[1] = "http://www.gfwiki.org/images/1/13/GF_MAP_EX_8_4_1.mp3";
EDsongs[2] = "http://www.gfwiki.org/images/8/82/M_19summer_song.wav";
EDsongs[3] = "http://www.gfwiki.org/images/e/eb/M_20winter_end.wav";
EDsongs[4] = "http://www.gfwiki.org/images/4/47/GF_EV9_ED_1.wav";

/* ED配图地址 */
var EDpics = new Array(EDlist.length + 1);
EDpics[0] = "http://www.gfwiki.org/images/4/49/ED_PIC_%E5%9D%8D%E7%BC%A9%E7%82%B9.png";
EDpics[1] = "http://www.gfwiki.org/images/8/8a/ED_PIC_%E5%BC%82%E6%9E%84%E4%BD%93.jpg";
EDpics[2] = "http://www.gfwiki.org/images/4/42/ED_PIC_%E8%A3%82%E5%8F%98%E9%93%BE%E6%8E%A5.jpg";
EDpics[3] = "http://www.gfwiki.org/images/4/43/ED_PIC_%E5%81%8F%E6%8C%AF%E5%85%89.jpg";
EDpics[4] = "http://www.gfwiki.org/images/f/f0/ED_PIC_%E5%8F%8C%E8%81%94%E4%B9%B1%E6%95%B0.png";

var EDnow = new Audio;
var EDlast = 0;
EDnow.setAttribute("src", EDsongs[0]);
EDnow.setAttribute("controls", "controls");
EDnow.setAttribute("preload", "preload");

var EDcg = new Image;
EDcg.style.width = "600px";
EDcg.style.padding = "20px";
EDcg.style.borderRadius = "300px";
document.querySelector("#EDCG").appendChild(EDcg);

/* 首次加载 */
EDlist[0].style.backgroundColor = "#f4c430";
EDlist[0].style.color = "black";
EDcg.setAttribute("src", EDpics[0]);
document.querySelector("#EDNAME").innerHTML = EDnames[0];

/* ED选择 */
function EDselect(element){
    EDlast = EDnow.getAttribute("number");

    for(var i=0; i<EDlist.length; i++){
        EDlist[i].style.backgroundColor = "inherit"; 
        EDlist[i].style.color = "inherit";}
    element.style.backgroundColor = "#f4c430";
    element.style.color = "black";

    EDnow.setAttribute("number", Number(element.getAttribute("index")));
    EDnow.setAttribute("src", EDsongs[Number(element.getAttribute("index"))]);
    EDnow.currentTime = 0;
    EDnow.play();

    document.querySelector("#EDNAME").innerHTML = EDnames[Number(element.getAttribute("index"))];
    EDcg.setAttribute("src", EDpics[Number(element.getAttribute("index"))]);

    EDstop.setAttribute("status", "start");
    EDstop.innerHTML = "∥";
}

/* 动态效果 */
EDdynamic();
function EDdynamic(){
    var slider = document.querySelector("#EDSLIDE");
    var timenow = EDnow.currentTime;
    var timeall = EDnow.duration;
    document.querySelector("#EDTIMENOW").innerHTML = EDdisplaytime(timenow);  
    document.querySelector("#EDTIMEALL").innerHTML = EDdisplaytime(timeall);
    slider.style.width = Number(timenow) / Number(timeall) * 100 + "%";
    setTimeout("EDdynamic()",500);
}

function EDdisplaytime(time){
    var str = "";
    str +=  parseInt(Number(time) / 60) + ":";
    if((Number(time) % 60) < 10){str += "0";}
    str += parseInt(Number(time) % 60);
    return str;
}

/* 开始暂停 */
var EDstop = document.querySelector("#EDSTOP");
EDstop.setAttribute("status", "stop");
EDstop.innerHTML = "▷";
EDstop.addEventListener("click", function(){EDstartstop();});

function EDstartstop(){
    if(EDstop.getAttribute("status") == "stop"){
        EDstop.setAttribute("status", "start");
        EDstop.innerHTML = "∥";
        EDnow.play();
    } else{
        EDstop.setAttribute("status", "stop");
        EDstop.innerHTML = "▷";
        EDnow.pause();
    }
}

/* 重新播放 */
document.querySelector("#EDRE").addEventListener("click", function(){EDreplay();});
function EDreplay(){
    EDnow.pause();
    EDnow.currentTime = 0;
    EDnow.play();
}

/* 上首ED */
document.querySelector("#EDBACK").addEventListener("click", function(){EDlastplay();});
function EDlastplay(){
    EDselect(EDlist[EDlast]);
}

/* 下首ED */
document.querySelector("#EDNEXT").addEventListener("click", function(){EDnextplay();});
function EDnextplay(){
    var num = 0;
    switch(EDorder.getAttribute("status")){
        case "list":
            if(Number(EDnow.getAttribute("number")) >= EDlist.length - 1){ num = 0;}
            else num = Number(EDnow.getAttribute("number")) + 1;
            break;
        case "random":
            do{
                num = new Date().getTime() % EDlist.length;
            }while(num == EDlast || num == Number(EDnow.getAttribute("number")));
            break;
        case "loop":
            num = Number(EDnow.getAttribute("number"))
            break;
        default: break;
    }
    EDselect(EDlist[num]);
}

/* 循环方式切换 */
var EDorder = document.querySelector("#EDORDER");
EDorder.setAttribute("status", "list");
EDorder.innerHTML = "list";
EDorder.addEventListener("click", function(){EDorderchange();});
function EDorderchange(){
    switch(EDorder.getAttribute("status")){
        case "list":
            EDorder.setAttribute("status", "random");
            EDorder.innerHTML = "rand";
            break;
        case "random":
            EDorder.setAttribute("status", "loop");
            EDorder.innerHTML = "loop";
            break;
        case "loop":
            EDorder.setAttribute("status", "list");
            EDorder.innerHTML = "list";
            break;
        default: break;
    }
}

EDnow.addEventListener("ended", function(){EDnextplay();});

/* 按钮的over&out显示 */
var EDbtn = document.querySelectorAll(".EDBTN");
for(var i=0; i<EDbtn.length; i++){
    EDbtn[i].addEventListener("mouseover", function(){overme(this);});
    EDbtn[i].addEventListener("mouseout", function(){outme(this);});
}

function overme(e){
    e.style.padding = "3px";
    e.style.color = "#f4c430";
    e.style.border = "2px solid";
}
function outme(e){
    e.style.padding = "5px";
    e.style.color = "inherit";
    e.style.border = "inherit";
}