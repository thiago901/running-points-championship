

class MyHeader extends HTMLElement {
  constructor() {
    super();
    
  }
  
  static get observedAttributes() {
    return [];
  }
  connectedCallback(){
    this.render()

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
        if(teams.length<3){
          throw Error('Deve ter pelo menos 3 times')
        }

        const allMatches = createAllMatches(teams);
        repositories.matches.createAll(allMatches);
        this.resetTeamPoints();
				window.location.reload()
    }

    
  convertToElement(text){
    const doc = document.createRange().createContextualFragment(text);
    return doc
  }

  handleCreateTeam(){
        
        
        const teamName = document.getElementById('team-name');
        if(teamName.value){
            const team = {
                id:generateUUID(),
                name:teamName.value,
                p:0,
                j:0,
                v:0,
                e:0,
                d:0,
                gp:0,
                gc:0,
                sg:0,
                a:'0%'
            }
            repositories.teams.create(team);

            window.location.reload();
        }
    }
  cleanAll(){
    localStorage.clear()
    window.location.reload();

  }
  styles(){
    const myStyles = document.createElement('style');
    myStyles.textContent= `
      @media screen and (max-width: 768px) {
        #content-header{
          flex-direction: column;
        }
        
      }
    `
    return myStyles;
  }
  render(){

    this.appendChild(this.styles());
    const teams = repositories.teams.list();
    const hasTeams = !!teams.length;


    
    const createMatches = document.createElement('button');
    createMatches.innerHTML = 'Criar Partidas';
    createMatches.type="button";
    createMatches.classList.add('btn', 'btn-primary');
    if(!hasTeams){
      createMatches.disabled;
    }
    
    const cleanStorageButton = document.createElement('button');
    cleanStorageButton.innerHTML = 'Limpar dados';
    cleanStorageButton.type="button";
    cleanStorageButton.classList.add('btn', 'btn-primary');

    createMatches.addEventListener('click',this.handleCreateAllMatches.bind(this));
    cleanStorageButton.addEventListener('click',this.cleanAll.bind(this));

    const template = `
      <div class="d-flex flex-md-row gap-2 flex-column mb-3 justify-content-between" id="content-header">
        <button
          type="button" 
          class="btn btn-primary" 
          data-bs-toggle="modal" 
          data-bs-target="#createTeamModal" 
          data-bs-whatever="@fat"
        >
          Adicione um Time
        </button>

      </div>
      <div class="modal fade" id="createTeamModal" tabindex="-1" aria-labelledby="createTeamModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="createTeamModalLabel">Crie um time</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form>
							<div class="mb-3">
								<label for="team-name" class="col-form-label">Nome do time:</label>
								<input type="text" class="form-control" id="team-name"/>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" id="create-new-team" class="btn btn-primary" onclick="handleCreateTeam()">Criar</button>
					</div>
				</div>
			</div>
		</div>
    `
    const element = this.convertToElement(template);
    const content = element.getElementById('content-header');
    const buttonCreateNewTeam = element.getElementById('create-new-team');
    buttonCreateNewTeam.addEventListener('click',this.handleCreateTeam.bind(this))
    content.appendChild(createMatches);
    content.appendChild(cleanStorageButton);
    
    this.appendChild(element);
  }
}

customElements.define('my-header', MyHeader);
