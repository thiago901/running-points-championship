function createAllMatches(teams=[]){

  const matches = [];

  // Cria as partidas de ida
  for (let i = 0; i < teams.length - 1; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push(
        {
          isPlayed:false,
          id:generateUUID(),
          game:[
            {
              id:teams[i].id,
              image:teams[i].image,
              name:teams[i].name,
              score:0,
            }, 
            {
              id:teams[j].id,
              image:teams[j].image,
              name:teams[j].name,
              score:0,
            }
          ]
        }
      );
    }
  }

  // Cria as partidas de volta
  for (let i = 0; i < teams.length - 1; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push(
        {
          isPlayed:false,
          id:generateUUID(),
          game:[
            {
              id:teams[j].id,
              image:teams[j].image,
              name:teams[j].name,
              score:0,
            },
            {
              id:teams[i].id,
              image:teams[i].image,
              name:teams[i].name,
              score:0,
            }
          ]
        }
      );
    }
  }

  // // Imprime as partidas
  // matches.forEach((match, index) => {
    
  //   console.log('maaaa',match);
  //   // console.log(`Partida ${index + 1}: ${match.game[0]} x ${match.game[1]}`);
  // });

  return matches;
}