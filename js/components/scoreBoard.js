class ScoreBoard extends HTMLElement {
  constructor() {
    super();
    // this.attachShadow({mode:'open'});
    
  }
  
  static get observedAttributes() {
    return ['matches'];
  }
  connectedCallback(){
    this.render()
    const matches = repositories.matches.list();
    const match = matches.find(item=>!item.isPlayed);
    if(!match && !!matches.length){
      const finished = document.createElement('button');
      finished.type='button';
      finished.classList.add('btn', 'btn-primary');
      finished.setAttribute('data-bs-toggle','modal');
      finished.setAttribute('data-bs-target','#finish');
      finished.setAttribute('data-bs-whatever','@fat');
      finished.innerHTML ='te'
      finished.style='display:none';
      this.appendChild(finished);
      finished.click();
    }


  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attr changed: ',name, oldValue, newValue);
    window.location.reload()
  }
  
  handleRegisterScore(match) {
    
    const playerOneScore = this.querySelector(`#player-${match.id}-${match.game[0].id}`);
    const playerTwoScore = this.querySelector(`#player-${match.id}-${match.game[1].id}`);
    match.game[0].score = playerOneScore.value;
    match.game[1].score = playerTwoScore.value;
    repositories.teams.updateScores(match);
    
    window.location.reload();

    
    
    
    
  }

  handleCreateCarrouselMatches() {
        const matches = repositories.matches.list();
    		let positionInitial = matches.findIndex(item=>item.isPlayed ===false);
        if(positionInitial<0){
          positionInitial = 0;
        }
        
        const itemsCarousel =[];

        
        matches.forEach((item,i)=>{
					
          const buttonRegisterScore = document.createElement('button');
          buttonRegisterScore.innerHTML = 'Registrar Placar';
          buttonRegisterScore.type="button";
          buttonRegisterScore.setAttribute('date-match',JSON.stringify(item));
          buttonRegisterScore.addEventListener('click',this.handleRegisterScore.bind(this,item));
          

          const teste = item.isPlayed?'d-none':null;
          buttonRegisterScore.classList.add('btn','btn-primary',teste);
          
          const itemCarrouselText =  `
                <div class="carousel-item ${i===positionInitial?'active':''} mb-1">

                    <div class="d-flex justify-content-center">
                        <div class="card-match" id="card-match-id">
                            <strong class="text-center mb-1" >#${i+1}</strong>
                            <div 
                              class="status mb-3 rounded p-1 flex-grow-1 ${item.isPlayed?'sucess':''}"
                            >
                              ${item.isPlayed?'Finalizado':'Não Jogado'}
                            </div>
                            

                            <div class="partida">
                                <div class="time">
                                    <img src="https://robohash.org/${item.game[0].name}" alt="Time A" class="logo-time">
                                    <span class="nome-time">${item.game[0].name}</span>
                                    <div class="score-input">
                                      <input id="player-${item.id}-${item.game[0].id}" ${item.isPlayed?'disabled':''} type="number" min="0" max="99" step="1" value="${item.game[0].score}">
                                    </div>
                                </div>
                                <span class="versus">X</span>
                                <div class="time">
                                    <div class="score-input">
                                      <input id="player-${item.id}-${item.game[1].id}" ${item.isPlayed?'disabled':''} type="number" min="0" max="99" step="1" value="${item.game[1].score}">
                                    </div>
                                    <img src="https://robohash.org/${item.game[1].name}" alt="Time B" class="logo-time">
                                    <span class="nome-time">${item.game[1].name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            const itemCarousel = this.convertToElement(itemCarrouselText);
            
            const card = itemCarousel.getElementById('card-match-id');
            card.appendChild(buttonRegisterScore);
            itemsCarousel.push(itemCarousel);
            
          })
          
        return itemsCarousel;
  }

  styles(){
    const myStyles = document.createElement('style');
    myStyles.textContent= `
      
      .versus {
        font-size: 24px;
        margin: 0 10px;
      }
      .status{
          background: var(--bs-light);
          color: var(--bs-dark);
          text-align: center;
      }
      .card-match{
          max-width: 70%;
          display: flex;
          flex-direction: column;
          
      }
      .partida {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
        font-size: 18px;
        margin-bottom: 20px;
      }
  
      .time {
        display: flex;
        align-items: center;
        margin-right: 10px;
      }
      .score-input {
        display: flex;
        align-items: center;
        margin: 0 1rem;
      }
      .sucess{
        background: #198754 !important;
        color:#000000 !important;
        font-weight: 500;
      }
      .score-input input {
        
        width: 50px;
        text-align: center;
        font-size: 2rem;
        border: none;
        background: none;
        -moz-appearance: textfield; /* Para Firefox */
      }
      
      .score-input input::-webkit-inner-spin-button,
      .score-input input::-webkit-outer-spin-button {
        display: none; /* Para Chrome, Safari e Opera */
      }
      .logo-time {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .ranking{
        display: flex;
        gap: 1rem;
        align-items: end;
        justify-content: center;
        min-height: 20rem;
        
    
      }
      .podium{
        position: relative;
        width: 6rem;
        
      }
      .first{
        height: 10rem;
      }
      .first-color{
        background: #10ac84;
      }
      .second{
        height: 6rem;
        
      }
      .second-color{
        background: #feca57;
      }
      .third{
        height: 4rem;
        
      }
      .third-color{
        background: #5f27cd;
      }
      .logo-time-2{
        width: 6rem;
        position: absolute;
        top: calc(-6rem - 1rem);
      }
      .winner-label {
          position: absolute;
          top: calc(-6rem - 2rem);
          left: 100%;
          transform: translateX(-50%);
          
          padding: 5px 10px;
          border-radius: 5px;
          color: #fff;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 14px;
        }
        .congratulations {
          
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #fff;
        }
        .podium-name{
          margin-bottom: .3rem;
          padding: 0;
          text-align: center;
          font-weight: bold;
          color: #fff;
    
        }
    `;
    
    return myStyles;
  }
  
  convertToElement(text){
    const doc = document.createRange().createContextualFragment(text);
    return doc
  }

  resetTeamPoints(){
    const teams = repositories.teams.list();
    const cleanPoints = teams.map(item=>({
      ...item,
      p:0,
      j:0,
      v:0,
      e:0,
      d:0,
      gp:0,
      gc:0,
      sg:0,
      a:'0%'
    }))

    repositories.teams.save(cleanPoints);
  }
handleCreateAllMatches(){
  
      const teams = repositories.teams.list();

      const allMatches = createAllMatches(teams);
      repositories.matches.createAll(allMatches);
      this.resetTeamPoints();
      window.location.reload()
  }
  createCarousel(){
    const teams = repositories.teams.list();
    const template = `
    
      <div id="matches" class="carousel slide">
        <div class="carousel-inner">
          
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#matches" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#matches" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div class="modal fade" id="finish" tabindex="-1" aria-labelledby="finishLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
				
					<div class="modal-body">
						<div class="ranking-container">
							<div class="congratulations">Parabéns aos ganhadores!</div>
							<div class="ranking" id="ranking-id">
							
								
								
								
							</div>
						</div>
						<button type="button" id="restart" class="btn btn-primary mt-2 w-100">Reiniciar</button>
					</div>
					

				</div>
			</div>
		</div>
    `;
    const doc = this.convertToElement(template);
    if(teams.length<3){
      return doc
    }
    const newTeams = [teams[1],teams[0],teams[2]];
    console.log('newTeams',newTeams);
    const allElementsItems =[];
    for (let index = 0; index < newTeams.length; index++) {
      const pos ={
        0:{
          name:'second',
          pos:2
        },
        1:{
          name:'first',
          pos:1
        },
        2:{
          name:'third',
          pos:3
        }
      }
      const itemText = `
        <div class="podium">
          <img src="https://robohash.org/${newTeams[index].name}" class="logo-time-2">
          <div class="${pos[index].name} ${pos[index].name}-color rounded">
            <p class="podium-name">${newTeams[index].name}</p>
            <div class="winner-label ${pos[index].name}-color">${pos[index].pos}º</div>
          </div>
        </div>
        `
        const item = this.convertToElement(itemText);
        allElementsItems.push(item);
        
      }
    const button = doc.getElementById('restart');
    button.addEventListener('click',this.handleCreateAllMatches.bind(this))

    const rankingId = doc.getElementById('ranking-id');
    allElementsItems.forEach(item=>rankingId.appendChild(item))

    
    return doc;

  }

  render() {
    
    
    this.appendChild(this.styles());
    
    
    const carouselContainer = this.createCarousel();
    const carrouselItems = this.handleCreateCarrouselMatches();
        
    
    const carrouselInner = carouselContainer.querySelector('.carousel-inner');
    
    carrouselItems.forEach(item=>carrouselInner.appendChild(item))
    this.appendChild(carouselContainer)
    
    
  }
}

customElements.define('score-board', ScoreBoard);
