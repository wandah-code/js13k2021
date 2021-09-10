const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;	
const scl = 2;
var wt = 5*scl;
var hex_w = 26;
var hex_h = 22;
var grid_x = 16;
var grid_y = 14;
var tGrid = 0;
var key;
var xs = 20;
var ys = 15;
var p1x = 3;
var p1y = 9;
var arr = [];
var px;
var py;
var i;
var j;
var bol = false;
var food = 10;
var man = 1;
var army = 0;
var menu = 0;
var mItem = 0;
var eBrk = 0;
var keyReady = 0;
var msg="";
var msgX=0;
var ui=0;
var temp;
var act;
var sWar=0;
var eWar=0;
var pWar=0;
var rWar=0;
var dWar=0;
var xWar=0;
var yWar=0;
var warAnim = 0;
var wOb;
var gTime = 0;
var eTime = 0;
var sId = 1;
var lvl = 0;
var glvl = ["Easy", "Normal", "Hard", "Super Hard", "Great Battle"];
var bgm;
var sfx;
var song = "cdfggfcc-fffaa-gbb-fcfacgggcde---fccfff";
var bgs2 = "dada-cfggcfgg--dada-cfggddeefgg--cdfggfcc-fffaa-gbb-fcfacgggcde---fccfff--";
var bgs = "d-d-dd-d-d-cfggcfgg--cfggddeefgg--";
var lstSnd = "eeeffaa-aaa";

var pic = new Image();
var game;
pic.src = "hex1.png";
pic.onload = function() {
	story(1);
	addEventListener("keydown", keydown);		
	addEventListener("keyup", keyup);	
}

function sn(sc){
	sfx = new snd(sc, 0);
	sfx.play();
}


function story(num){
	menu = 7;
	clear(0,0,900,600);
	panel(100, 300, 700, 100);
	addPic(64,25,11,15,120+num*10,180,88,120);
	var st;
	if (num>1)sn("ga");
	if (num == 1) st = "Oh no, our land is being attacked by the roman army";
	if (num == 2) st = "We need you to lead the battle";
	if (num == 3) st = "Get ready!! use SPACE and ARROW keys to control";
	addText(st, 450, 350, 20);
	addText("press SPACE to continue", 700, 420);
}

function cover(){
	//console.log("cover");	
	keyReady = 0;
	grid_x = 18;
	grid_y = 19;
	xs = -15;
	ys = -5;
	arr = [];
	drawGame(1);
	addEnemy(p1x,p1y);
	seeAll();
	drawGame(2);
	addText("13 A.D.", 450, 280, 100);
	addText("the great battle", 450, 320, 35);	
	panel(340, 20, 220, 40);
	clear(350,30,200,20,"#5c412b");
	addText("Game by Wandah - JS13K 2021", 450, 45);
	if (bgm) bgm.stop();
	bgm = new snd(song, 1);
	bgm.play();
	menu = 6;
	//console.log("cm = "+menu);
}

function clear(x,y,w,h,c=""){
	ctx.clearRect(x, y, w, h);
	if (c ==""){
		ctx.fillStyle = "#4f5c52";
	}else{
		ctx.fillStyle = c;
	}
	ctx.fillRect(x, y, w, h);
}
function cMenu(num){
	mMenu = num;
	if (menu!= 6 && man==1)mMenu = 2;
	var pH = posHero();
	if (menu>0 && menu<7){
		if (key == 39 || key==40) {mItem++; if (mItem>mMenu)mItem = 1; console.log("mi = "+mItem);}
		if (key == 37 || key==38) {mItem--; if (mItem<1)mItem=mMenu;}
		if (key == 32 && keyReady == 0){			
			act = menu*10+mItem;
			//console.log("> menu = "+menu+ " "+mItem+" "+act);
			if (act == 12) {
				if (food>4){
					arr[pH][2] = 1;
					food-=5;
					if (arr[pH][0]==4)arr[pH][0]=2;
					arr[pH][6] = arr[pH][0]+seeAround(p1x,p1y).a;
					if (man==1)addMsg("wait until the colony grow");
					rst();
				}else{
					addMsg("Need 5 foods, grow more!");
				}
				menu = 0;				
			}
			if (act == 13){				
				arr[pH][2]=4;
				food+=3+arr[pH][3]*(arr[pH][0]+seeAround(p1x,p1y).a);
				arr[pH][0]=4;
				arr[pH][3]=0;
				rst();
			}
			if (act == 14){
				if (food>4){
					arr[pH][2] = 2;
					food-=5;
					var tr = arr[pH][3];
					arr[pH][3]=0;
					if (arr[pH][0]==4)arr[pH][0]=2;
					arr[pH][4]=tr-1;
					addMsg("Send Settler here to train an Army");
					rst();
				}else{
					addMsg("Need 5 foods, grow more!");
				}
				menu = 0;
			}
			if (act == 11){
				if (arr[pH][9]>0){
					arr[pH][9]--;
					act = 21;
				}else{
					addMsg("Can't move anymore");
					menu = 0;
				}				
			}
			if (act == 22){
				if (food>19 && arr[pH][3]>9){
					arr[pH][2] = 3;
					food-=20;
					arr[pH][3]-=10;
					arr[pH][6] = arr[pH][6]*2;
					rst();
				}else{
					addMsg("Need 20 foods & 10 Settler!");
				}
				menu = 0;
			}
			if (act == 21 || act == 31 || act == 41 || act == 42){
				temp = around(p1x,p1y);
				menu = -1;
				mItem = 0;
				keyReady = 1;
			}
			if (act == 62){
				keyReady = 1;
				//game start
				bgm.stop();
				sn(lstSnd);
				menu = 0;				
				p1x = 3;
				p1y = 9;
				grid_x = 16;
				grid_y = 14;
				gTime = 0;
				food = 10;
				xs = 20;
				ys = 15;
				arr = [];
				//console.log("b menu = "+menu+" > "+arr.length);
				init();
				//console.log("c menu = "+menu+" > "+arr.length);
				game = setInterval(run, 50);
			}
			if (act == 61){
				lvl++;
				if (lvl>glvl.length-1) lvl = 0;
				cover();
			}
		}
	}
	if (menu == -1){
		//select destination
		if (key==39 || key==40) mItem++;
		if (key==37 || key==38) mItem--;
		if (mItem>temp.length-1) mItem = 0;
		if (mItem<0) mItem = temp.length-1;		
		drawGame();
		for(i=0;i<temp.length;i++){
			var tA = temp[i];
			var pi = tA[1];
			var pj = tA[2];
			var krs = xyTile(pi, pj);
			if (i==mItem) drawTile(krs.x,krs.y,6);
			else drawTile(krs.x,krs.y,7);
		}
		var tmI = temp[mItem];
		if (key == 32 && keyReady == 0){
			var tar = arr[tmI[0]];
			if (act == 21 || act==41){
				var mv = Math.floor(arr[pH][3]/2);	
				if (arr[pH][2]!=1 && arr[pH][2]!=3) mv = arr[pH][3];
				if (arr[pH][2]==1 || arr[pH][2]==3) arr[pH][9] = 3;
				if (mv<1)mv = 1;
				if ((tar[0]<3 || tar[0]==4) && tar[4] == 0 && (tar[2]<2 || tar[2]==3 || tar[2]==4) && tar[7]==0 && tar[8]==0){		
					tar[3] += mv;
					tar[9] = arr[pH][9];
					tar[1] = 1;
					arr[pH][3]-=mv;
					arr[pH][9]=0;
				}
				if (tar[0]==3){
					tar[1] = 1;
					arr[pH][3]-=mv;
					arr[pH][9]=0;
					addMsg("Settler drown and die");
				}
				if (tar[2] == 2){
					if (food>1){
						arr[pH][3]-=mv;
						tar[4] += mv;
						addMsg("Troop trained");
					}else{
						addMsg("Need more food!!");
					}						
				}
				p1x = tmI[1];
				p1y = tmI[2]
				rst();
			}
			if (act == 31 || act==42){
				//move army
				if (tar[2]==1){
					rst();
					return;
				}
				if (tar[0]<3 || tar[0]==4) {
					if (tar[2]<5 && tar[2]!=1 && tar[7]==0 && tar[8]==0) {
						tar[4]+=arr[pH][4];						
					}					
					if (tar[2] == 5 || tar[2]==7) {
						tar[4]+=arr[pH][4];
						tar[2] = 0;
						food+=10+rnd(5);
						addMsg("The area was plundered and pillaged");
						
					}
					if (tar[2] == 6 || tar[2] == 8 || tar[7]>0 || tar[8]>0){
						if (sWar>0)return;
						sWar = 10;
						eWar = tmI[0];
						pWar = arr[pH][4];
						xWar = tmI[1];
						yWar = tmI[2];						
					}
				}		
				if (tar[0]==3) {
					arr[pH][4] = 0;
					addMsg("Troops drown and die");
				}
				tar[1]=1;
				p1x = tmI[1];
				p1y = tmI[2];
				var epos = seeAround(tmI[1],tmI[2]).e;
				//console.log(epos);
				if (epos>0 && tar[0]!=3 && (arr[epos][7]+arr[epos][8])>arr[pH][4]){
					sWar = 20;
					eWar = epos;
					pWar = arr[pH][4];					
					//console.log("ambush"+pWar+" "+eWar);
					tar[4] = arr[pH][4];
					xWar = tmI[1];
					yWar = tmI[2];
				} 
				arr[pH][4] = 0;
				rst();
			}
		}
	}
	
}
function keydown(event) {
	key = event.keyCode;	
	var opt = arr[posHero()];
	if (menu == 0){
		if (key == 39 && p1x<grid_x-1)p1x++;		
		if (key == 37 && p1x>0) p1x--;
		if (key == 38 && p1y>0) p1y--;
		if (key == 40 && p1y<grid_y-1) p1y++;
		//spasi		
		if (key == 32 && menu == 0){
			keyReady = 1;
			mItem = 1;			
			if (opt[3]>0 && (opt[2] == 0 || opt[2]==4) && opt[4]==0) menu = 1;
			if (opt[3]>1 && opt[2] == 1) menu = 2;
			if (opt[4]>0) menu = 3;
			if (opt[2] == 3 && (opt[3]>1 || opt[4]>0)) menu = 4;
		}
		drawGame();
	}		
	if (key == 32 && keyReady == 0 && menu>6){
		keyReady = 1;
		//console.log("b menu = "+menu);
		if (menu==7){
			sId++;
			if (sId == 4) {mItem = 1;cover();}
			else story(sId);
		}else if (menu==10){
			sfx.stop();			
			arr = [];
			clearInterval(game);			
			menu = 6;
			//console.log("v menu = "+menu+" > "+arr.length);
			mItem = 1;
			cover();
		}
	}
	if ((menu>0 && menu<7) || menu == -1) addMenu();
		
}
function rst(){
	menu = 0;
	drawGame();
}

function addMenu(){
	var aM = arr[posTile(p1x, p1y)];
	if (menu == 1){	
		cMenu(4);
		if (aM[2]==1 || aM[2]==3) aM[9]=3;		
		btn("Move Settler ("+aM[9]+"/3)", 200,525, 150, 1);		
		btn("Build Colony", 360,525, 150, 2);
		if (man>1) {
			if (aM[0]==4) btn("Harvest Crops", 520,525, 150, 3);
			else btn("Build Farm", 520,525, 150, 3);
		}
		if (man>1) btn("Build Barrack", 680,525, 150, 4);							
	}
	if (menu == 2){
		cMenu(2);				
		btn("Move Settler", 200,525, 150, 1);	
		btn("Build Castle", 360,525, 150, 2);	
	}
	if (menu == 3){
		cMenu(1);				
		btn("Move Army", 200,525, 150, 1);		
	}
	if (menu == 4){
		var tM = 0;
		if (aM[3]>1) tM++;  
		if (aM[4]>0) tM++;  
		cMenu(tM);
		if (aM[3]>1)btn("Move Settler", 200,525, 150, 1);		
		if (aM[4]>0)btn("Move Army", 360,525, 150, 2);
	}
	if (menu == -1)cMenu(6);	
	if (menu == 6){
		cMenu(2);
		btn("START BATTLE", 350,350, 200, 2);
		btn("Game Level: "+glvl[lvl], 350,400, 200, 1);
	}
}
function keyup(event) {
	keyReady = 0;
	key = null;
}

function init() {
  drawGame(1);
}

function panel(x,y,w,h){
	//corner	
	addPic( 241, 0, 5, 5, x,y, wt, wt);
	addPic( 251, 0, 5, 5, x+w-wt,y, wt, wt);
	addPic( 241, 10, 5, 5, x,y+h-wt, wt, wt);
	addPic( 251, 10, 5, 5, x+w-wt,y+h-wt, wt, wt);
	//
	for (i=1;i<Math.floor((w-wt)/wt);i++){
		addPic( 246, 0, 5, 5, x+i*wt,y, wt, wt);
		addPic( 246, 10, 5, 5, x+i*wt,y+h-wt, wt, wt);
	}
	for (i=1;i<Math.floor((h-wt)/wt);i++){
		addPic( 241, 5, 5, 5, x,y+i*wt, wt, wt);
		addPic( 251, 5, 5, 5, x+w-wt,y+i*wt, wt, wt);
	}
}

function btn(str,x,y,p,id){
	if (menu==0) return;
	var sx = 1;
	if (id == mItem)sx = 0;
	addPic( 210+(sx*15), 0, 5, 20, x,y, wt, 20*scl);
	addPic( 220+(sx*15), 0, 5, 20, x+p-wt,y, wt, 20*scl);
	for (i=1;i<Math.floor((p-wt)/wt);i++){
		addPic( 215+(sx*15), 0, 5, 20, x+i*wt,y, wt, 20*scl);		
	}
	addText(str, x+p/2, y+24);
}

function addPic(x1,y1,w1,h1,x,y,w,h){
	ctx.drawImage(pic, x1, y1, w1, h1, x,y, w, h);
}
function addText(str, x, y, s=14, al=0){
	ctx.textAlign = "center";
	ctx.fillStyle = '#f1f097';
	ctx.font = s+'px Times';
	if (al==0) ctx.textAlign = "center"; else ctx.textAlign = "start"; 	
	if (s>14){
		ctx.strokeStyle = '#896913';
		ctx.lineWidth = Math.round(s/6);	
		ctx.strokeText(str, x, y);
	}
	ctx.fillText(str, x, y);
}
function drawTile(x,y,num){
	addPic( num*hex_w, 0, hex_w, hex_h, x,y, hex_w*scl, hex_h*scl);
}
function posHero(){
	return p1y+p1x*grid_y;
}
function posTile(x, y){
	if (x<0 || y<0 || x>grid_x-1 || y>grid_y-1) return -1;
	else return y+x*grid_y;
}
function cTile(num){
	var tx = Math.floor(num/grid_y);
	var ty = num-(tx*grid_y);
	return {x:tx, y:ty}
}

function xyTile(tx, ty){
	var hx = xs+((hex_w)*tx+(ty%2)*hex_w/2)*scl;
	var hy = ys+16*ty*scl;
	return {x:hx, y:hy}
}

function drawGame(stat=0) {	
	tGrid = grid_x*grid_y;
	clear(5,5,895,595);
	for (var x=0; x<grid_x; x++) {
		for (var y=0; y<grid_y; y++) {
			var hex_x = xyTile(x,y).x;
			var hex_y = xyTile(x,y).y;
			var hex_n = y+x*grid_y;
			var tz = 2;
			if (stat==1){
				var tt = Math.floor(Math.random()*15);
				if (tt == 6) tz = 0;
				if (tt == 4) tz = 2;
				if (tt == 7) tz = 3;
				if (tt < 4) tz = 1;
				//tile,open,build,man,arm,grow,spd, ehero,ehors
				arr.push([tz,0,0,0,0,0,0,0,0,0]);
				tz = 5;
			}else{
				if (arr[hex_n][1]==0){
					tz = 5;							
				}else{
					tz = arr[hex_n][0];
				}
			}
			drawTile(hex_x,hex_y,tz);
			if (arr[hex_n][1]>0){
				if (arr[hex_n][2] == 5){
					addPic(198, 22, 26, 22, hex_x, hex_y, 52,44);
				}else if (arr[hex_n][2] == 6){
					addPic(172, 22, 26, 22, hex_x, hex_y, 52,44);
				}else if (arr[hex_n][2] == 7){
					addPic(104, 0, 26, 22, hex_x, hex_y, 52,44);
				}else if (arr[hex_n][2] == 8){
					addPic(130, 22, 26, 22, hex_x, hex_y, 52,44);
				}
				if (arr[hex_n][8] > 0){
					if (arr[hex_n][2]!=8) addPic(157, 22, 15, 18, hex_x+8, hex_y+2, 30,36);
				}else if (arr[hex_n][7] > 0){
					if (arr[hex_n][2]!=8) addPic(75, 22, 12, 18, hex_x+12, hex_y, 24,36);
				}
				if (arr[hex_n][2] == 1){
					addPic(0, 22, 26, 22, hex_x, hex_y, 52, 44);
				}else if (arr[hex_n][2] == 3){
					addPic(104, 22, 26, 22, hex_x, hex_y, 52, 44);
				}else if (arr[hex_n][2] == 2){
					addPic(26, 22, 26, 22, hex_x, hex_y, 52, 44);
				}else if (arr[hex_n][4]>0){
					addPic(64,25,11,15,hex_x+16,hex_y+5,22,30);
				}else if (arr[hex_n][3]>0){
					addPic(55,25,9,15,hex_x+18,hex_y+5,18,30);
				}
			}			
		}
	}
	//pos	
	var xy = xyTile(p1x, p1y);		
	if (stat==1) {
		addEnemy(grid_x-3-rnd(4), 2+rnd(3));
		if (lvl==glvl.length-1 && menu!=6) addEnemy(grid_x-3-rnd(4), 7+rnd(3));
		arr[posHero()] = [2, 1, 0, 1, 0, 750, 0, 0, 0, 1];		
		drawTile(xy.x,xy.y,2);
		addPic(55,25,9,15,xy.x+18,xy.y+5,18,30);
		addMsg("Select area and press SPACE");
	}
	crew();	
	var th = arr[posHero()];
	ui = 0;
	if (th[3]>0){
		addPic(55,25,9,15,110,530,18,30);
		addText("x "+th[3], 150, 550);
	}
	if (th[2]== 1 || th[2]==3) {
		ui = posHero();
		if (th[2]==1)addPic(0,22,26,22,40,530,56,44);
		if (th[2]==3)addPic(104,22,26,22,40,530,56,44);
	}
	if (th[4]>0){
		if (th[2]==3){
			addPic(64,25,11,15,210,530,22,30);
			addText("x "+th[4], 250, 550);
		}else{
			addPic(64,25,11,15,110,530,22,30);
			addText("x "+th[4], 150, 550);
		}
	}
	if (th[2]== 2) {
		addPic(26,26,26,22,40,530,56,44);		
	}
	//gui
	panel(0,0,900,600);
	if (stat==2) return;
	panel(15,505, 870, 80);	
	if (menu>-1) drawTile(xy.x,xy.y,6);
	//icon
	addPic(90,25,15,15,40,485,20,20);
	addText("x "+food, 75, 495, 16);
	addPic(55,25,9,15,100,482,14,20);
	addText("x "+man, 132, 495, 16);
	addPic(64,25,11,15,160,482,14,20);
	addText("x "+army, 192, 495, 16);		
}

function crew(){
	if (menu>5) return;
	man = 0;
	army = 0;
	eBrk = 0;
	var enTotal=0;
	for (i=0;i<tGrid-1;i++){
		man+=arr[i][3];
		army+=arr[i][4];
		enTotal+=arr[i][7];
		enTotal+=arr[i][8];
		if (arr[i][2] == 6) eBrk++;
	}
	if (gTime>10){
	if (man<=0){
		menu = 10;
		seeAll();
		drawGame();
		addText("DEFEATED", 450, 300, 60);
		sfx.stop();
		sn(bgs2);
	}
	if (enTotal<=0){
		menu = 10;
		seeAll();
		drawGame();
		addText("VICTORY", 450, 300, 60);
		sfx.stop();
		sn(bgs2);
	}
	}
	//console.log("crew "+menu);
}

function seeAll(){
	for (i=0;i<tGrid;i++)	arr[i][1] = 1;
}

function around(hx, hy){
	var dir = [
		[[1,  0], [ 0, -1], [-1, -1], 
		 [-1,  0], [-1, 1], [ 0, 1]],
		[[1,  0], [1, -1], [ 0, -1], 
		 [-1,  0], [ 0, 1], [1, 1]],
	]
	var par = hy & 1;
	var ar = [];
	for (i=0;i<6;i++){
		var rx = hx+dir[par][i][0];
		var ry = hy+dir[par][i][1];
		j = posTile(rx, ry);
		if (j>-1) ar.push([j,rx,ry]);
	}
	return ar;
}

function seeAround(hx, hy, ev=0){
	var ar = around(hx, hy);
	var wtr = 0;
	var en = 0;
	var pl = 0;
	for (i=0;i<ar.length;i++) {
		var par = arr[ar[i][0]];
		if (par == undefined) return;
		if (ev==0) par[1] = 1;
		if (par[0] == 3) wtr = 1;
		if (par[7]>0 || par[8]>0) en = ar[i][0];
		if ((par[2]>0 && par[2]<5) || par[3]>0 || par[4]>0) pl = ar[i][0];			
	}
	var res = {a:wtr, e:en, p:pl};
	return res;
}
function addMsg(str){
	if (msg == ""){
		msg = str;
		msgX = 50;
		sn("-ga");
	}
}

function rnd(n){
	return Math.floor(Math.random()*n);
}

function addEnemy(ex,ey){	
	for (i=0;i<4+rnd(3);i++){
		arr[posTile(ex+rnd(3)-rnd(3), ey+rnd(3)-rnd(3))] = [1, 0, 5, 0, 0, 0, 0, 0, 0];
		arr[posTile(ex+rnd(3)-rnd(3), ey+rnd(3)-rnd(3))] = [1, 0, 6, 0, 0, 0, 0, 0, 0];
		arr[posTile(ex+rnd(3)-rnd(3), ey+rnd(3)-rnd(3))] = [1, 0, 7, 0, 0, 0, 0, 0, 0];
		arr[posTile(ex+rnd(2)-rnd(2), ey+rnd(2)-rnd(2))] = [1, 0, 7, 0, 0, 0, 0, 0, 0];
		if (i<4) arr[posTile(ex+rnd(4)-rnd(4), ey+rnd(4)-rnd(4))] = [rnd(3), 0, 0, 0, 0, 0, 0, 4+rnd(5), 0];
		if (i<3) arr[posTile(ex+rnd(4)-rnd(4), ey+rnd(4)-rnd(4))] = [rnd(3), 0, 0, 0, 0, 0, 0, 0, 2+rnd(5)];		
	}
	arr[posTile(ex, ey)] = [2, 1, 8, 0, 0, 0, 0, 5, 2];
}

function moveE(p1, p2){
	//war
	if (sWar>0) return;
	if (arr[p2][4]>0){
		if ((arr[p2][4]>arr[p1][7]+arr[p1][8]*1.4) && rnd(10)<5) return;
		sWar = 10;
		eWar = p1;
		pWar = arr[p2][4];
		xWar = cTile(p2).x;
		yWar = cTile(p2).y;
		addMsg("Enemy attacking");
		drawGame();
	}else{
		arr[p2][7] += arr[p1][7];
		arr[p2][8] += arr[p1][8];
		arr[p1][7] = 0;
		arr[p1][8] = 0;
		//plundered
		if (arr[p2][2] == 4) {
			arr[p2][2] = 0;
			arr[p2][0] = 1;
			food-=3+rnd(2); if (food<0) food = 0;
			addMsg("farm field plundered");
		}
		if (arr[p2][2] == 1 || arr[p2][3]>0) {
			arr[p2][2] = 0;
			arr[p2][3] = 0;
			arr[p2][0] = 1;
			addMsg("colony plundered");
		}
		drawGame();
	}
}

function findPBase(){
	var ab = {x:-1, y:0};
	for(i=0;i<tGrid-1;i++){
		if (arr[i][2] == 1 || arr[i][2]==3 || arr[i][3]>0){
			ab = cTile(i);
			return ab;
		}			
	}
	return ab;
}
function eAI(){	
	if (menu==0)eTime++;
	if (eTime>tGrid-1) eTime = 0;
	var en = -1;	 
	if (arr[eTime][2]==6 && gTime>10000-lvl*300 && rnd(15)==13) arr[eTime][7]=3+lvl+rnd(4+lvl);
	if (arr[eTime][2]==6 && gTime>10000-lvl*300 && rnd(25)==14) arr[eTime][8]=2+lvl+rnd(3+lvl);
	if (arr[eTime][2]==8 && eBrk==0 && gTime>4000) arr[eTime+1][2]=6;
	if ((arr[eTime][7]>0 || arr[eTime][8]>0) && arr[eTime][2]!=8 && rnd(10)<5) en = eTime;
	if (en>-1){
		var ep=cTile(en);
		var look=seeAround(ep.x, ep.y,1).p;
		var fEn=around(ep.x, ep.y);	
		if (look>0) {
			moveE(en, look);
		}else{
			if (gTime<8000) return;
			var tg = -1;
			var pB = findPBase();			
			if (pB.x == -1) return;
			if (pB.x<ep.x && pB.y<ep.y) tg = 2;
			if (pB.x>ep.x && pB.y<ep.y) tg = 1;
			if (pB.x>ep.x && pB.y>ep.y) tg = 5;
			if (pB.x<ep.x && pB.y>ep.y) tg = 4;
			if (rnd(4)==2) {
				if (pB.x<ep.x) tg=3; else tg=0;
			}
			if (rnd(4)==1) {
				if (pB.y<ep.y) tg=2; else tg=5;
			}
			if (tg == -1) return;
			if (fEn.length-1>=tg){				
				var ok = arr[fEn[tg][0]];
				if (ok[0]==3) return;
				if (ok[2]<5 && ok[7]==0 && ok[8]==0) {
					moveE(en, fEn[tg][0]);
					eTime+=3;
				}
			}
		}				
	}	
}

function run(){
	//console.log("run");
	gTime++;
	eAI();
	if (msg!=""){
		clear(250, 478, 595, 25);		
		msgX-=5;
		addText("> "+msg, 280+Math.max(msgX,0), 495, 14, 1);
		if (msgX<-150) {msg = ""; clear(250, 478, 595, 25);}		
	}
	if (sWar>0){
		sWar--;
		if (sWar == 0){
			menu = 9;
			warAnim = 1;
			wOb = [];
			for (i=0;i<pWar;i++) wOb.push([1,120+i*(5+rnd(10)),520+rnd(3),2+rnd(1),520+rnd(3)]); 
			if (arr[eWar][7]==0 && arr[eWar][8]==0) arr[eWar][7]=1+rnd(5);
			for (i=0;i<arr[eWar][7];i++) wOb.push([2,780-i*(5+rnd(10)),520+rnd(3),-2-rnd(1),520+rnd(3)]); 
			for (i=0;i<arr[eWar][8];i++) wOb.push([3,820-i*(5+rnd(10)),523+rnd(3),-2-rnd(2),523+rnd(3)]); 
			var t1 = pWar*(1+rnd(5)/10);
			//di dalam castle
			var ctr = posTile(xWar, yWar);
			var t2 = arr[eWar][7]*(1+rnd(4)/10)+arr[eWar][8]*(1.2+rnd(5)/10);
			if (arr[ctr][2]==3) t1+=3;
			if (arr[ctr][2]==8) t2+=3;			
			if (t1>t2) rWar = 1; else rWar = 2;
			dWar = 0;
			//war icon
			var ci = cTile(eWar);
			var ic = xyTile(ci.x, ci.y);			
			if (arr[eWar][2]!=6 && arr[eWar][2]!=8) drawTile(ic.x, ic.y, arr[eWar][0]);
			ic = xyTile(xWar,yWar);
			addPic(225,25,16,13,ic.x+10, ic.y+8, 32, 26);
			sn(bgs);
		}
	}
	if (warAnim==1 || warAnim == 2){
		dWar++;
		if (dWar>200) warAnim = 2;
		if (dWar>250) warAnim = 3;
		clear(28, 518, 842, 58);
		for (i=0;i<wOb.length;i++){
			var tW = wOb[i];
			if (warAnim == 1){
				if (tW[3]>0 && tW[1]<730)tW[1]+=tW[3];
				if (tW[3]<0 && tW[1]>170)tW[1]+=tW[3];
			}
			tW[2]=tW[4];
			if (rnd(3)==1)tW[2]=tW[4]+rnd(3);	
			if (warAnim == 2 & rnd(8)==3)tW[2]=tW[4]+rnd(6);				
			if (tW[0] == 1) addPic(64,25,11,15,tW[1],tW[2],22,30);
			if (tW[0] == 2) addPic(75,22,12,18,tW[1],tW[2],24,36);
			if (tW[0] == 3) addPic(157,22,15,18,tW[1],tW[2],30,36);
			if (Math.abs(tW[1]-450)<5){					
				if (tW[0]==1){					
					if(rWar == 2) tW[1] = 10000;
					if (rWar == 1 && i<(wOb.length-pWar)) tW[1] = 10000;
				}
				if (tW[0]>1) {
					if (rWar == 1)tW[1] = 10000;
					if (rWar == 2 && i>pWar && i<2*pWar)tW[1] = 10000;
				}				
			}
		}		
	}
	if (warAnim == 3){
		var ew = arr[eWar];
		var pw = posTile(xWar,yWar);
		if (rWar == 1){
			ew[4]=pWar-Math.floor(ew[7]+ew[8]*1.5);
			if (ew[4]<1)ew[4] = 1;
			ew[7] = 0;
			ew[8] = 0;
			if (ew[2]>4)ew[2]=0;
			if (pw != eWar){
				arr[pw][7] = 0;
				arr[pw][8] = 0;
				arr[pw][4] = 0;
				if (arr[pw][2]>4)arr[pw][2]=0;
			}			
			addMsg("Victory!!");
			sn(lstSnd);
			warAnim = 0;
			rst();
		}else{
			if (ew[7]==0 && ew[8]>0) {
				ew[8]-=Math.floor(pWar*0.8);
				if (ew[8]<1) ew[8]=1;
			}
			if (ew[7]>0 && ew[8]==0) {
				ew[7]-=pWar;
				if (ew[7]<1) ew[7]=1;
			}
			if (ew[7]>0 && ew[8]>0) {
				var nw = pWar-ew[7];
				if (nw<0) nw = 0;
				ew[7]-=pWar;
				if (ew[7]<1) ew[7]=1;
				ew[8]-=nw;
				if (ew[8]<1) ew[8]=1;
			}
			ew[4] = 0;
			if (ew[2]<5)ew[2]=0;
			if (pw != eWar){
				arr[pw][7] = ew[7];
				arr[pw][8] = ew[8];
				arr[pw][4] = 0;
				ew[7]=0;
				ew[8]=0;				
				ew[4]=0;
				if (arr[pw][2]<5)arr[pw][2]=0;
			}			
			addMsg("Defeated!!");
			sn(lstSnd);
			warAnim = 0;
			rst();
		}
	}
	if (menu>8) return;
	if (ui>0){
		clear(28, 518, arr[ui][5]*0.842, 3, "#1bdf49");
	}
	for (i=0;i<tGrid-1 ;i++){		
		if (arr[i][2]==1 || arr[i][2]==3){
			//colony growth
			arr[i][5]+=arr[i][6];
			if (arr[i][5]>1000){
				arr[i][5] = 0;
				if (arr[i][3]<arr[i][2]*10){
					if (food>0){
						food--;
						arr[i][3]++;
						addMsg("citizen grow");
					}else{
						addMsg("citizen need food");
					}
				}else{
					addMsg("citizen need more space");
				}
				if (menu==0) drawGame();				
			}
		}
	}
}

var scale = {
            c: 261.63,
			d: 293.66,
			e: 329.63,
			f: 349.23,
			g: 392,
            b: 493.88,
			a: 440.00
        }
function snd(ns, lp=0){
	var audio = new AudioContext();
    var position = 0;
	var loop = lp;
	this.play = function(){
		this.inter = setInterval( function() { 
			var note = ns.charAt(position),
				freq = scale[note];
				position += 1;
				if(position >= ns.length && loop==1) {
					position = 0;
				}else{
					stop();
				}
			if(freq) {
				 var attack = 1,
					decay = 260,
					gain = audio.createGain(),
					osc = audio.createOscillator();

				gain.connect(audio.destination);
				gain.gain.setValueAtTime(0, audio.currentTime);
				gain.gain.linearRampToValueAtTime(.01, audio.currentTime + attack / 300);
				gain.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 300);

				osc.frequency.value = freq/2;
				osc.type = "square";
				osc.connect(gain);
				osc.start(0);

				setTimeout(function() {
					osc.stop(0);
					osc.disconnect(gain);
					gain.disconnect(audio.destination);
				}, decay)
			}
		}, 250 );
	}
	this.stop = function(){
		clearInterval(this.inter);
	}
}