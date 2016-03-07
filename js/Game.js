function changeStatus()
{
	if(1==play)
	{
		document.getElementById("ssmsg").innerHTML = "\u263a Stop game by left clicking again<br>on red dot.";
	}
	else
	{
		document.getElementById("ssmsg").innerHTML = "\u263a Reload page to start new game.";
		document.getElementById("ssmsgdiv").setAttribute("style", "position:absolute; top:410px; left:139px; color:#009700;");
	}
}

var play=0; // Start and Stop game trigger
var redX=705; // Left of red dot
var redY=405; // Top of red dot
var currentScore=0;
var bestScore=0; // in Cookie

function Game(e) /*Game entry point*/
{
	if(0==play)
	{
		play=1;
		/*var CookieScore = getCookieValue("CollisionBestScore");//Cookie
		if(CookieScore=="")
		{
			createCookie();//Cookie
			alert(CookieScore + "af1");
		}
		else
		{
			bestScore=parseInt(CookieScore, 10);//Cookie
			alert(bestScore + "af2");
		}*/
		SendObstacles();
		CollisionDetection();
		ScoreTimer();
		BestScoreChecker();
	}
	else
	{
		play=2;
		/*if(1==changeCookie)
			createCookie();//Cookie*/
	}
}

onmousemove = function(e)
{
	if(1==play)
	{
		redX=e.clientX-5;
		redY=e.clientY-5;
		if(e.clientX<455)
			redX=450;
		else if(e.clientX>945)
			redX=940;
		if(e.clientY<205)
			redY=200;
		else if(e.clientY>595)
			redY=590;
		document.getElementById('RedDot').setAttribute("style","position:absolute; top:" + redY + "px; left:" + redX + "px; width:10px; height:10px; background-color:#ff0000; border-radius:5px;");
	}
}

//redX=left=705 redY=top=405
var wd_top_sourceMain=300, wd_left_sourceMain=900, wd_delayRange1=1, wd_delayRange2=10, wd_top_destRange1=200, wd_top_destRange2=590, wd_left_destRange1=450, wd_left_destRange2=940, stylestr="width:10px; height:10px; border-radius:5px; ";//white dot = wd_

var id="";

function SendObstacles()
{
	SendWhiteDot(wd_top_sourceMain, wd_left_sourceMain, wd_delayRange1, wd_delayRange2, wd_top_destRange1, wd_top_destRange2, wd_left_destRange1, wd_left_destRange2, id, stylestr);
}

function SendWhiteDot(wd_top_source, wd_left_source, wd_delayRange1, wd_delayRange2, wd_top_destRange1, wd_top_destRange2, wd_left_destRange1, wd_left_destRange2, id, stylestr)
{
	var delay=getRandomNumber(1, 10);
	var wd_top_dest=getRandomNumber(200, 590), wd_left_dest=getRandomNumber(450, 940);
	MoveWhiteDot(wd_top_source, wd_left_source, wd_delayRange1, wd_delayRange2, wd_top_destRange1, wd_top_destRange2, wd_left_destRange1, wd_left_destRange2, id, stylestr);
}

function MoveWhiteDot(wd_top_source, wd_left_source, wd_delayRange1, wd_delayRange2, wd_top_destRange1, wd_top_destRange2, wd_left_destRange1, wd_left_destRange2, id, stylestr)
{
	if(1==play)
	{
		setTimeout(function(){
			if(wd_top_source<wd_top_dest)
				wd_top_source++;
			else if(wd_top_source>wd_top_dest)
				wd_top_source--;
			if(wd_left_source<wd_left_dest)
				wd_left_source++;
			else if(wd_left_source>wd_left_dest)
				wd_left_source--;
			wd_top_sourceMain=wd_top_source;
			wd_left_sourceMain=wd_left_source;
			document.getElementById(id).setAttribute("style","position:absolute; top:" + wd_top_source + "px; left:" + wd_left_source + "px; " + "width:10px; height:10px; border-radius:5px; " + "background-color:#ffffff;");
			if(!(wd_top_source==wd_top_dest && wd_left_source==wd_left_dest))
				MoveWhiteDot(wd_top_source, wd_left_source, wd_delayRange1, wd_delayRange2, wd_top_destRange1, wd_top_destRange2, wd_left_destRange1, wd_left_destRange2, id, stylestr);
			else
				SendWhiteDot(wd_top_source, wd_left_source, wd_delayRange1, wd_delayRange2, wd_top_destRange1, wd_top_destRange2, wd_left_destRange1, wd_left_destRange2, id, stylestr);
		}, delay);
	}
}

function CollisionDetection()
{
	DetectWhiteDot();
}

function DetectWhiteDot()
{
	var x1, y1, x2, y2;
	setTimeout(function(){
		x1=redX, y1=redY, x2=wd_left_sourceMain, y2=wd_top_sourceMain;
		if(Math.sqrt( ( x2-x1 ) * ( x2-x1 )  + ( y2-y1 ) * ( y2-y1 ) )<10)
			CollisionDetected();
		DetectWhiteDot();
		}, 1);
}

function CollisionDetected()
{
	play=2;
	document.getElementById("ssmsg").innerHTML = "\u263a Reload page to start new game.";
	document.getElementById("currS").setAttribute("style", "text-align:justify;text-align:center; color:#009700; font-size:20px");
	document.getElementById("bestS").setAttribute("style", "text-align:justify;text-align:center; color:#009700; font-size:20px");
	document.getElementById("ssmsgdiv").setAttribute("style", "position:absolute; top:410px; left:139px; color:#009700;");
	callBlink();
}

var show=1;
function callBlink()
{	
	setTimeout(function(){
		if(show)
		{
			show=0;
			document.getElementById("cd").setAttribute("style", "position:absolute; top:375px; left:575px; color:#009700; z-index:0;");
		}
		else
		{
			show=1;
			document.getElementById("cd").setAttribute("style", "position:absolute; top:375px; left:575px; color:#009700; z-index:1;");
		}
		callBlink();
		}, 1000);
}

function getRandomNumber(range1, range2)
{
	var x = (Math.floor(Math.random()*100000));
	x %= (range2-range1+1);
	x += range1;
	return x;
}

function ScoreTimer()
{
	if(1==play)
	{
		var delay=100;
		setTimeout(function(){
			currentScore+=1;
			document.getElementById("currS").innerHTML=currentScore;
			ScoreTimer();
		}, delay);
	}
}

var changeCookie=0;

function BestScoreChecker()
{
	var delay=10;
	setTimeout(function(){
		if(currentScore>bestScore)
		{
			bestScore=currentScore;
			document.getElementById("bestS").innerHTML=bestScore;
			changeCookie=1;
		}
		BestScoreChecker();
	}, delay);
}

//Cookie Code
//http://www.w3schools.com/js/js_cookies.asp

/*function getCookieValue(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(',');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
		alert(c + "gg" + i);
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function createCookie()
{
	var cname="CollisionBestScore", cvalue=bestScore;
    var d = new Date();
    d.setTime(d.getTime() + (10000*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
	//alert( cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
}*/