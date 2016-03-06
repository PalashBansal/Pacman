function changeStatus()
{
	if(1==play)
	{
		document.getElementById("ssmsg").innerHTML = "\u263a Stop game by left clicking again<br>on red dot.";
	}
	else
	{
		document.getElementById("ssmsg").innerHTML = "\u263a Reload page to start new game.";
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
		//SendObstacles();
		//CollisionDetection();
		ScoreTimer();
		//bestScore=getCookieScore();
		BestScoreChecker();
	}
	else
	{
		play=2;
		if(1==changeCookie)
			updateCookie();
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
		document.getElementById('redDot').setAttribute("style","position:absolute; top:" + redY + "px; left:" + redX + "px; width:10px;height:10px; background-color:#ff0000; border-radius:5px;");
	}
}

//function SendObstacles(){}
//function CollisionDetection(){}

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

function updateCookie()
{
	var cname="CollisionBestScore", cvalue=bestScore;
    var d = new Date();
    d.setTime(d.getTime() + (10000*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;	
}
//http://www.w3schools.com/js/js_cookies.asp
function getCookieScore()
{
	
}