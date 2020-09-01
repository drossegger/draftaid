interface player {
  player: string;
  tier: number;
  pos: string;
  rank: number;
  pos_rank: number;
  adp: number;
  drafted?: boolean;
  team: string;
  value: string;
  ps: string;
}
interface playerJSON{
    player: string;
    tier: number;
    pos: string;
    rank: number;
    pos_rank: number;
    adp: number;
    scoring:string;
    team: string;
    bye: number;
    best: number;
    worst: number;
    value: string;
    ps: string;
}
// function parseRankings(fname: playerJSON[]): player[] {
//   let players: player[] = [];
//   for (let p of fname) {
//     let myplayer = { player: p.player, tier: p.tier, pos: p.pos, rank: p.rank, pos_rank: p.pos_rank, adp: p.adp }
//     players.push(myplayer);
//   }
//   return players;
// }
declare var chroma: any;
function sortPlayersByRank(player1: player, player2: player) {
  if (player1.rank < player2.rank) {
    return -1;
  }
  if (player1.rank > player2.rank) {
    return 1;
  }
  else return 0;
}
function displayRankings(ranking: player[]) {
  ranking.sort((player1, player2): number => {
     if (player1.rank < player2.rank)
       return -1;
     if (player1.rank > player2.rank)
       return 1;
     else return 0;
  });
  // console.log(ranking);
  // for (let pl of ranking) {
  //   //document.write(pl.rank + "  " + pl.player + "  " + pl.pos + "\n");
  // }
  let color=chroma.scale(['green','yellow','red']).domain([0,15]);
  displayqb(ranking,color);
  displayte(ranking,color);
  displayrb(ranking,color);
  displaywr(ranking,color);
}
function displayqb(ranking:player[],color){
  let table = <HTMLTableElement> document.getElementById("qbtable");
  for( let p of ranking){
    if(p.pos=="QB"){
        let row=table.insertRow(-1);
        row.id="player"+p.player.replace(/\W/g, "");
        let tier=row.insertCell(-1);
        tier.innerHTML=""+p.tier;
        let rank=row.insertCell(-1);
        rank.innerHTML=""+p.rank;

        let team=row.insertCell(-1);
        team.innerHTML=p.team;
        let player=row.insertCell(-1);
	if(p.adp === undefined) p.adp=999;
        player.innerHTML=p.player+ " ("+p.adp+")";
	let value=row.insertCell(-1);
	value.innerHTML=p.value;
	let ps=row.insertCell(-1);
	ps.innerHTML=p.ps;
	ps.style.backgroundColor=color(p.tier);
	value.style.backgroundColor=color(p.tier);
        rank.style.backgroundColor=color(p.tier);
        team.style.backgroundColor=color(p.tier);
        player.style.backgroundColor=color(p.tier);
        //player.style.fontWeight="bold";

    }
  }
}
function displayte(ranking:player[],color){
  let table = <HTMLTableElement> document.getElementById("tetable");
  for( let p of ranking){
    if(p.pos=="TE"){
        let row=table.insertRow(-1);
        row.id="player"+p.player.replace(/\W/g, "");
        let tier=row.insertCell(-1);
        tier.innerHTML=""+p.tier;
        let rank=row.insertCell(-1);
        rank.innerHTML=""+p.rank;

        let team=row.insertCell(-1);
        team.innerHTML=p.team;
        let player=row.insertCell(-1);
	if(p.adp === undefined) p.adp=999;
        player.innerHTML=p.player+ " ("+p.adp+")";
	let value=row.insertCell(-1);
	let ps=row.insertCell(-1);
	ps.innerHTML=p.ps;
	ps.style.backgroundColor=color(p.tier);
value.innerHTML=p.value;
	value.style.backgroundColor=color(p.tier);
        rank.style.backgroundColor=color(p.tier);
        team.style.backgroundColor=color(p.tier);
        player.style.backgroundColor=color(p.tier);
        //player.style.fontWeight="bold";

    }
  }
}
function displaywr(ranking:player[],color){
  let table = <HTMLTableElement> document.getElementById("wrtable");
  for( let p of ranking){
    if(p.pos=="WR"){
        let row=table.insertRow(-1);
        row.id="player"+p.player.replace(/\W/g, "");
        let tier=row.insertCell(-1);
        tier.innerHTML=""+p.tier;
        let rank=row.insertCell(-1);
        rank.innerHTML=""+p.rank;

        let team=row.insertCell(-1);
        team.innerHTML=p.team;
        let player=row.insertCell(-1);
	if(p.adp === undefined) p.adp=999;
        player.innerHTML=p.player+ " ("+p.adp+")";
	let value=row.insertCell(-1);
	value.innerHTML=p.value;
	value.style.backgroundColor=color(p.tier);
        let ps=row.insertCell(-1);
	ps.innerHTML=p.ps;
	ps.style.backgroundColor=color(p.tier);
	rank.style.backgroundColor=color(p.tier);
        team.style.backgroundColor=color(p.tier);
        player.style.backgroundColor=color(p.tier);
        //player.style.fontWeight="bold";

    }
  }
}
function displayrb(ranking:player[],color){
  let table = <HTMLTableElement> document.getElementById("rbtable");
  for( let p of ranking){
    if(p.pos=="RB"){
        let row=table.insertRow(-1);
        row.id="player"+p.player.replace(/\W/g, "");
        let tier=row.insertCell(-1);
        tier.innerHTML=""+p.tier;
        let rank=row.insertCell(-1);
        rank.innerHTML=""+p.rank;

        let team=row.insertCell(-1);
        team.innerHTML=p.team;
        let player=row.insertCell(-1);
	if(p.adp === undefined) p.adp=999;
        player.innerHTML=p.player+ " ("+p.adp+")";
	let value=row.insertCell(-1);
	let ps=row.insertCell(-1);
	ps.innerHTML=p.ps;
	ps.style.backgroundColor=color(p.tier);
value.innerHTML=p.value;
	value.style.backgroundColor=color(p.tier);
        rank.style.backgroundColor=color(p.tier);
        team.style.backgroundColor=color(p.tier);
        player.style.backgroundColor=color(p.tier);
        //player.style.fontWeight="bold";

    }
  }
}
function failureCallback(error){
  console.log("Error: "+error);
}
function update(draft:string){
  console.log("Refresh");
  fetch('https://api.sleeper.app/v1/draft/'+draft+'/picks').then(function(response){
    return response.json();
  }).then((res) => {
    for(let pick of res){
      let searchstring="player"+pick.metadata.first_name.replace(/\W/g, "")+pick.metadata.last_name.replace(/\W/g, "");
      try{
        let playerrow=<HTMLTableRowElement> document.getElementById(searchstring);
        //playerrow.style.textDecoration="line-through";
	//playerrow.style.display="none";
        playerrow.style.opacity="0.3";
        //if (searchstring.indexOf("Valdes")>=0) console.log(searchstring);
        //console.log(pick.pick_no);
      }
      catch(error){
        console.log(error);
        //console.error(searchstring);
      }
      finally{
        continue;
      }
    }
    return "";
  }).catch(failureCallback);
}
fetch('https://raw.githubusercontent.com/drossegger/draftaid/master/rankings.json')
  .then(function(response) {
    return response.json();
  }).then(function (a): player[]{
    let players:player[]=[];
    for (let p of a){
      let myplayer = { player: p.player, tier: p.tier, pos: p.pos, rank: p.rank, pos_rank: p.pos_rank, adp: p.adp , team:p.team, value:p.value, ps: p.ps}
      players.push(myplayer);
    }
    return players;
  }).then((res) => displayRankings(res));
  let timerId;
  let draftId:string='461916529437437952';
  window.onload =function(){

   (<HTMLButtonElement> document.getElementById("startbtn")).onclick=function(){
    console.log("Start clicked");
    let btn=document.getElementById("startbtn");
    if(btn.innerHTML=="Start"){
    timerId = setInterval(update, 3000,draftId);
    btn.innerHTML="Stop";
    }
    else{
      clearInterval(timerId);
      btn.innerHTML="Start";
    }
  };
  (<HTMLButtonElement> document.getElementById("setbtn")).onclick=function(){
    draftId=(<HTMLInputElement> document.getElementById("draftid")).value;
    console.log(draftId);
    let button=<HTMLButtonElement> document.getElementById("setbtn");
    button.disabled=true;
  };
  document.getElementById("resetbtn").onclick=function(){
    location.reload();
  };
  document.getElementById("hidebtn").onclick=function(){

  };
};
// console.log(players);
