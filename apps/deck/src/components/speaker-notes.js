/**
 * Painel de roteiro de fala (tecla N).
 *
 * Cada slide traz suas notas em um `<div class="notes">` oculto; o painel
 * apenas espelha o conteúdo do slide atual.
 */
export class SpeakerNotes {
  #panel;
  #body;

  constructor(panel, body) {
    this.#panel = panel;
    this.#body = body;
  }

  get isOpen() {
    return this.#panel.classList.contains('on');
  }

  toggle() {
    const open = this.#panel.classList.toggle('on');
    this.#panel.setAttribute('aria-hidden', String(!open));
  }

  /** Espelha as notas do slide informado. */
  showFor(slide) {
    const notes = slide.querySelector('.notes');
    this.#body.replaceChildren();

    if (notes) {
      // cloneNode preserva a formatação (<b>, <p>) sem reinterpretar HTML.
      Array.from(notes.childNodes).forEach((node) => {
        this.#body.appendChild(node.cloneNode(true));
      });
    } else {
      const placeholder = document.createElement('p');
      placeholder.textContent = 'Sem notas para este slide.';
      this.#body.appendChild(placeholder);
    }
  }

  /** Liga o painel ao deck, atualizando a cada troca de slide. */
  bind(deck) {
    deck.subscribe((state) => this.showFor(state.current));
  }
}
