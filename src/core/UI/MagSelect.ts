import { randomFloat } from 'pulsar-pathfinding';

export type MagSelectOption = { value: string; label: string };

interface Props {
    callback: (value: string) => void;
    options: MagSelectOption[];
    label?: string;
}

export class MagSeclect extends HTMLElement {
    private selectElement: HTMLSelectElement;

    constructor(props: Props) {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this.selectElement = document.createElement('select');

        if (props.label) {
            const selectId = `mag-select-${randomFloat(0, 1000)}`;
            const labelElement = this.createLabelElement({ label: props.label, id: selectId });
            shadowRoot.appendChild(labelElement);
            this.selectElement.setAttribute('id', selectId);
        }

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

    private createLabelElement({ label, id }: { label: string; id: string }) {
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        labelElement.setAttribute('for', id);
        labelElement.style.display = 'block';
        return labelElement;
    }
}

customElements.define('mag-select', MagSeclect);
