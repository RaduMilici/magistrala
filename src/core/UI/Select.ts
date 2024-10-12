export type MagSelectOption = { value: string; label: string };

interface Props {
    callback: (value: string) => void;
    options: MagSelectOption[];
}

export class MagSeclect extends HTMLElement {
    private selectElement: HTMLSelectElement;

    constructor(props: Props) {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this.selectElement = document.createElement('select');

        this.selectElement.addEventListener('change', (e: Event) => {
            props.callback((e.target as HTMLSelectElement).value);
        });

        shadowRoot.appendChild(this.selectElement);

        const style = document.createElement('style');
        style.textContent = `
        select {
          padding: 5px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `;
        shadowRoot.appendChild(style);
        this.setOptions(props.options);
    }

    private setOptions(options: MagSelectOption[]) {
        this.selectElement.innerHTML = '';

        options.forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            this.selectElement.appendChild(optionElement);
        });
    }
}

customElements.define('mag-select', MagSeclect);
