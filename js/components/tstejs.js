class MeuComponente extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    // Lista de atributos que você deseja observar
    return ['cor', 'tamanho'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Chamado sempre que um atributo observado é alterado
    if (name === 'cor') {
      this.shadowRoot.querySelector('.conteudo').style.color = newValue;
    } else if (name === 'tamanho') {
      this.shadowRoot.querySelector('.conteudo').style.fontSize = `${newValue}px`;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Estilos do componente aqui */
      </style>

      <!-- Conteúdo do componente -->
      <div class="container">
        <div class="card">
          <div class="conteudo">Este é um exemplo de componente com atributos.</div>
        </div>
      </div>
    `;
  }
}

customElements.define('meu-componente', MeuComponente);