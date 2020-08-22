function sortPlayersByRank(player1, player2) {
    if (player1.rank < player2.rank) {
        return -1;
    }
    if (player1.rank > player2.rank) {
        return 1;
    }
    else
        return 0;
}
function displayRankings(ranking) {
    ranking.sort(function (player1, player2) {
        if (player1.rank < player2.rank)
            return -1;
        if (player1.rank > player2.rank)
            return 1;
        else
            return 0;
    });
    // console.log(ranking);
    // for (let pl of ranking) {
    //   //document.write(pl.rank + "  " + pl.player + "  " + pl.pos + "\n");
    // }
    var color = chroma.scale(['green', 'yellow', 'red']).domain([0, 15]);
    displayqb(ranking, color);
    displayte(ranking, color);
    displayrb(ranking, color);
    displaywr(ranking, color);
}
function displayqb(ranking, color) {
    var table = document.getElementById("qbtable");
    for (var _i = 0, ranking_1 = ranking; _i < ranking_1.length; _i++) {
        var p = ranking_1[_i];
        if (p.pos == "QB") {
            var row = table.insertRow(-1);
            row.id = "player" + p.player.replace(/\W/g, "");
            var tier = row.insertCell(-1);
            tier.innerHTML = "" + p.tier;
            var rank = row.insertCell(-1);
            rank.innerHTML = "" + p.rank;
            var team = row.insertCell(-1);
            team.innerHTML = p.team;
            var player = row.insertCell(-1);
            if (p.adp === undefined)
                p.adp = 999;
            player.innerHTML = p.player.substring(0, 15) + " (" + p.adp + ")";
            var value = row.insertCell(-1);
            value.innerHTML = p.value;
            var ps = row.insertCell(-1);
            ps.innerHTML = p.ps;
            ps.style.backgroundColor = color(p.tier);
            value.style.backgroundColor = color(p.tier);
            rank.style.backgroundColor = color(p.tier);
            team.style.backgroundColor = color(p.tier);
            player.style.backgroundColor = color(p.tier);
            player.style.fontWeight = "bold";
        }
    }
}
function displayte(ranking, color) {
    var table = document.getElementById("tetable");
    for (var _i = 0, ranking_2 = ranking; _i < ranking_2.length; _i++) {
        var p = ranking_2[_i];
        if (p.pos == "TE") {
            var row = table.insertRow(-1);
            row.id = "player" + p.player.replace(/\W/g, "");
            var tier = row.insertCell(-1);
            tier.innerHTML = "" + p.tier;
            var rank = row.insertCell(-1);
            rank.innerHTML = "" + p.rank;
            var team = row.insertCell(-1);
            team.innerHTML = p.team;
            var player = row.insertCell(-1);
            if (p.adp === undefined)
                p.adp = 999;
            player.innerHTML = p.player.substring(0, 15) + " (" + p.adp + ")";
            var value = row.insertCell(-1);
            var ps = row.insertCell(-1);
            ps.innerHTML = p.ps;
            ps.style.backgroundColor = color(p.tier);
            value.innerHTML = p.value;
            value.style.backgroundColor = color(p.tier);
            rank.style.backgroundColor = color(p.tier);
            team.style.backgroundColor = color(p.tier);
            player.style.backgroundColor = color(p.tier);
            player.style.fontWeight = "bold";
        }
    }
}
function displaywr(ranking, color) {
    var table = document.getElementById("wrtable");
    for (var _i = 0, ranking_3 = ranking; _i < ranking_3.length; _i++) {
        var p = ranking_3[_i];
        if (p.pos == "WR") {
            var row = table.insertRow(-1);
            row.id = "player" + p.player.replace(/\W/g, "");
            var tier = row.insertCell(-1);
            tier.innerHTML = "" + p.tier;
            var rank = row.insertCell(-1);
            rank.innerHTML = "" + p.rank;
            var team = row.insertCell(-1);
            team.innerHTML = p.team;
            var player = row.insertCell(-1);
            if (p.adp === undefined)
                p.adp = 999;
            player.innerHTML = p.player.substring(0, 15) + " (" + p.adp + ")";
            var value = row.insertCell(-1);
            value.innerHTML = p.value;
            value.style.backgroundColor = color(p.tier);
            var ps = row.insertCell(-1);
            ps.innerHTML = p.ps;
            ps.style.backgroundColor = color(p.tier);
            rank.style.backgroundColor = color(p.tier);
            team.style.backgroundColor = color(p.tier);
            player.style.backgroundColor = color(p.tier);
            player.style.fontWeight = "bold";
        }
    }
}
function displayrb(ranking, color) {
    var table = document.getElementById("rbtable");
    for (var _i = 0, ranking_4 = ranking; _i < ranking_4.length; _i++) {
        var p = ranking_4[_i];
        if (p.pos == "RB") {
            var row = table.insertRow(-1);
            row.id = "player" + p.player.replace(/\W/g, "");
            var tier = row.insertCell(-1);
            tier.innerHTML = "" + p.tier;
            var rank = row.insertCell(-1);
            rank.innerHTML = "" + p.rank;
            var team = row.insertCell(-1);
            team.innerHTML = p.team;
            var player = row.insertCell(-1);
            if (p.adp === undefined)
                p.adp = 999;
            player.innerHTML = p.player.substring(0, 15) + " (" + p.adp + ")";
            var value = row.insertCell(-1);
            var ps = row.insertCell(-1);
            ps.innerHTML = p.ps;
            ps.style.backgroundColor = color(p.tier);
            value.innerHTML = p.value;
            value.style.backgroundColor = color(p.tier);
            rank.style.backgroundColor = color(p.tier);
            team.style.backgroundColor = color(p.tier);
            player.style.backgroundColor = color(p.tier);
            player.style.fontWeight = "bold";
        }
    }
}
function failureCallback(error) {
    console.log("Error: " + error);
}
function update(draft) {
    console.log("Refresh");
    fetch('https://api.sleeper.app/v1/draft/' + draft + '/picks').then(function (response) {
        return response.json();
    }).then(function (res) {
        for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
            var pick = res_1[_i];
            var searchstring = "player" + pick.metadata.first_name.replace(/\W/g, "") + pick.metadata.last_name.replace(/\W/g, "");
            try {
                var playerrow = document.getElementById(searchstring);
                //playerrow.style.textDecoration="line-through";
                //playerrow.style.display="none";
                playerrow.style.opacity = "0.3";
                //if (searchstring.indexOf("Valdes")>=0) console.log(searchstring);
                //console.log(pick.pick_no);
            }
            catch (error) {
                console.log(error);
                //console.error(searchstring);
            }
            finally {
                continue;
            }
        }
        return "";
    })["catch"](failureCallback);
}
fetch('https://raw.githubusercontent.com/drossegger/draftaid/master/rankings.json')
    .then(function (response) {
    return response.json();
}).then(function (a) {
    var players = [];
    for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
        var p = a_1[_i];
        var myplayer = { player: p.player, tier: p.tier, pos: p.pos, rank: p.rank, pos_rank: p.pos_rank, adp: p.adp, team: p.team, value: p.value, ps: p.ps };
        players.push(myplayer);
    }
    return players;
}).then(function (res) { return displayRankings(res); });
var timerId;
var draftId = '461916529437437952';
window.onload = function () {
    document.getElementById("startbtn").onclick = function () {
        console.log("Start clicked");
        var btn = document.getElementById("startbtn");
        if (btn.innerHTML == "Start") {
            timerId = setInterval(update, 10000, draftId);
            btn.innerHTML = "Stop";
        }
        else {
            clearInterval(timerId);
            btn.innerHTML = "Start";
        }
    };
    document.getElementById("setbtn").onclick = function () {
        draftId = document.getElementById("draftid").value;
        console.log(draftId);
        var button = document.getElementById("setbtn");
        button.disabled = true;
    };
    document.getElementById("resetbtn").onclick = function () {
        location.reload();
    };
    document.getElementById("hidebtn").onclick = function () {
    };
};
// console.log(players);
