






class TablePoints extends HTMLElement {
  constructor() {
    super();
    this.teams = repositories.teams.list();
    this.render();
    
  }


  styles(){
    const myStyles = document.createElement('style');
    myStyles.textContent= `
      .td-img{
        width: 50px;
      }
      
    `;
    
    return myStyles;
  }
  
  convertToElement(text){
    const doc = document.createRange().createContextualFragment(text);
    
    return doc;
  }
  createTablePoints(){
    const template = `
    
        <table  class="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">P</th>
                    <th scope="col">J</th>
                    <th scope="col">V</th>
                    <th scope="col">E</th>
                    <th scope="col">D</th>
                    <th scope="col">GP</th>
                    <th scope="col">GC</th>
                    <th scope="col">SG</th>
                    <th scope="col">%</th>
                </tr>
            </thead>
            <tbody id="tbody-teams-2">
            </tbody>

          

        </table>
    `;
    const doc = this.convertToElement(template);
    
    return doc;

  }
  createTableRows(){
    
    const rows = [];
    this.teams.forEach((team, index) => {
      const row = `
        <table>
          <tr>
            <td scope="row">${index + 1}</td>                    
            <td class="td-img" >
              <img class="logo-time" src="https://robohash.org/${
                team.name
              }"/>
            </td>
            <td>
              <div>
                <p>${team.name}</p>
              </div>
            </td>
            <td><b>${team.p}</b></td>
            <td>${team.j}</td>
            <td>${team.v}</td>
            <td>${team.e}</td>
            <td>${team.d}</td>
            <td>${team.gp}</td>
            <td>${team.gc}</td>
            <td>${team.sg}</td>
            <td>${team.a}</td>
        </tr>
            
            
          
        </table>
        `;
  
      rows.push(this.convertToElement(row).querySelector('tr'));
    });
    
    return rows;
  }
  render() {
    // const shadow = this.attachShadow({mode:'open'});
    
    this.appendChild(this.styles());
    
    
    const tablePoints = this.createTablePoints();
    const tableRows = this.createTableRows();
    

    const tbody = tablePoints.getElementById('tbody-teams-2');
    tableRows.forEach(item=>tbody.appendChild(item));
    
    



    this.appendChild(tablePoints)
    
    
  }
}

customElements.define('table-points', TablePoints);
