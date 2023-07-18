const KEY_TEAMS = "@Championsship:teams";
const KEY_MATCHES = "@Championsship:matches";


function getRepository(key){
  let data = localStorage.getItem(key);
  if(!data){
    data = '[]';
  }
  data = JSON.parse(data);
  
  return data;
}
function save(key,teams=[]){
  localStorage.setItem(key,JSON.stringify(teams))
}
function create(team){
  const teams = getRepository(KEY_TEAMS)
  teams.push(team)

  repositories.teams.save(teams);
  

}

function calculateA(points,amountTeam){
  return Number(points/(amountTeam * 3) * 100).toFixed(2);
}



function calculatePoints(me,other){
  let points = 1;
  if(me>other){
    points = 3
  }
  if(me<other){
    points = 0;
  }
  return points;

}
function sortNames(a,b){
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
}


const repositories ={
  'teams':{
    save:(teams)=>save(KEY_TEAMS,teams),
    list:()=>{
      const teams = getRepository(KEY_TEAMS);
      return teams.sort(sortNames).sort((a,b)=>b.p-a.p);
    },
    create:(team)=>{
      const teams = getRepository(KEY_TEAMS)
      teams.push(team)
    
      repositories.teams.save(teams);
    },
    updateScores:(match)=>{
      
      const teamOne =match.game[0];
      const teamTwo = match.game[1];
      const teams = getRepository(KEY_TEAMS);
      
  
      const teamOneIndex = teams.findIndex(item=>item.id===teamOne.id);
      const teamTwoIndex = teams.findIndex(item=>item.id===teamTwo.id);
      const amountTeam= teams.length;
      const oldGp = teams[teamOneIndex].gp;
      const scoreOne = calculatePoints(teamOne.score,teamTwo.score);
    
      const gpOne = Number(teams[teamOneIndex].gp) + Number(teamOne.score);
      const gcOne = Number(teams[teamTwoIndex].gc) + Number(teamTwo.score);
      const pointsOne = Number(teams[teamOneIndex].p) + scoreOne;
      teams[teamOneIndex]={
        ...teams[teamOneIndex],
        p:pointsOne,
        j:Number(teams[teamOneIndex].j)+1,
        v:Number(teams[teamOneIndex].v)+ (scoreOne==3?1:0),
        e:Number(teams[teamOneIndex].e)+ (scoreOne==1?1:0),
        d:Number(teams[teamOneIndex].d)+ (scoreOne==0?1:0),
        gp:gpOne,
        gc:gcOne,
        sg:gpOne - gcOne,
        a:calculateA(pointsOne,amountTeam)
      }
      const scoreTwo = calculatePoints(teamTwo.score,teamOne.score);
      
      const gpTwo = Number(teams[teamTwoIndex].gp) + Number(teamTwo.score)
      const gcTwo = Number(oldGp) + Number(teamOne.score);
      const pointsTwo = Number(teams[teamTwoIndex].p) + scoreTwo;
      teams[teamTwoIndex]={
        ...teams[teamTwoIndex],
        p:Number(teams[teamTwoIndex].p) + scoreTwo,
        j:Number(teams[teamTwoIndex].j)+1,
        v:Number(teams[teamTwoIndex].v)+ (scoreTwo==3?1:0),
        e:Number(teams[teamTwoIndex].e)+ (scoreTwo==1?1:0),
        d:Number(teams[teamTwoIndex].d)+ (scoreTwo==0?1:0),
        gp:Number(teams[teamTwoIndex].gp) + Number(teamTwo.score),
        gc:Number(oldGp) + Number(teamOne.score),
        sg:gpTwo - gcTwo,
        a:calculateA(pointsTwo,amountTeam)
      }
      repositories.teams.save(teams);
      repositories.matches.update(match);
      return teams;
    },
  },
  'matches':{
    create:(team1,team2)=>{
      const matches = getRepository(KEY_MATCHES);
      const match = {
        principal_id:team1.id,
        principal_score:team1.score,
        guest_id:team2.id,
        guest_score:team2.score,
      }
      matches.push(match);
      repositories.matches.save(matches)
    },
    list:()=>{
      const matches = getRepository(KEY_MATCHES);
      return matches;
    },
    update:(match)=>{
      const matches = getRepository(KEY_MATCHES);
      const matchIndex = matches.findIndex(item=>item.id===match.id);
      matches[matchIndex].isPlayed = true;
      matches[matchIndex].game[0].score = match.game[0].score;
      matches[matchIndex].game[1].score = match.game[1].score;

      repositories.matches.save(matches);
    },
    createAll:(matches=[])=>{
      repositories.matches.save(matches)
    },
    save:(match)=>save(KEY_MATCHES,match)
  }

}