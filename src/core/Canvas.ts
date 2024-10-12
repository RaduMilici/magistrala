import { size } from 'pulsar-pathfinding';

interface CanvasSettings {
    /**
     * The CSS selector for the parent element where the canvas will be appended.
     */
    parentSelector: string;

    /**
     * The size of the canvas, including width and height.
     */
    size?: size;
}

/**
 * A class representing an HTML canvas element that can be appended to a parent element.
 * The size of the canvas can be set dynamically.
 */
export class Canvas {
    /**
     * The underlying HTML canvas element.
     *
     * @readonly
     * @type {HTMLCanvasElement}
     */
    readonly HTMLElement: HTMLCanvasElement;

    /**
     * Creates an instance of the Canvas class and appends the canvas to the parent element.
     *
     * @param {CanvasSettings} settings - The settings for the canvas, including the parent selector and size.
     * @throws {Error} If the parent element cannot be found based on the provided selector.
     */
    constructor({ parentSelector, size }: CanvasSettings) {
        this.HTMLElement = document.createElement('canvas');
        this.setSize(size);
        this.appendToParent(parentSelector);
    }

    /**
     * Sets the width and height of the canvas element.
     *
     * @param {size} size - The width and height of the canvas.
     */
    public setSize(size?: size): void {
        if (!size) {
            return;
        }
        this.HTMLElement.width = size.width;
        this.HTMLElement.height = size.height;
        this.HTMLElement.style.width = `${size.width}px`;
        this.HTMLElement.style.height = `${size.height}px`;
    }

    /**
     * Appends the canvas element to the parent element found by the provided CSS selector.
     *
     * @param {string} parentSelector - The CSS selector for the parent element.
     * @throws {Error} If the parent element cannot be found.
     */
    private appendToParent(parentSelector: string): void {
        const parentElement = document.querySelector(parentSelector);

        if (!parentElement) {
            throw new Error(`Canvas: Parent element not found for selector: ${parentSelector}`);
        }

        parentElement.appendChild(this.HTMLElement);
    }
}
