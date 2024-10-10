interface TorusConfig {
    radius?: number;
    numSubdivisions?: number;
    innerRadius?: number;
    startAngle?: number;
    endAngle?: number;
}

export class Torus {
    vertexData: Float32Array;
    numVertices: number;

    // Static members to define circle structure
    private static readonly TRIANGLES_PER_SUBDIVISION = 2;
    private static readonly VERTICES_PER_TRIANGLE = 3;
    private static readonly COMPONENTS_PER_VERTEX = 2; // XY components

    /**
     * Constructor to create a circle with customizable configurations.
     * @param {TorusConfig} config - Configuration object for the circle.
     */
    constructor({
        radius = 1,
        numSubdivisions = 24,
        innerRadius = 0,
        startAngle = 0,
        endAngle = Math.PI * 2,
    }: TorusConfig = {}) {
        this.numVertices = numSubdivisions * Torus.TRIANGLES_PER_SUBDIVISION * Torus.VERTICES_PER_TRIANGLE;
        this.vertexData = new Float32Array(this.numVertices * Torus.COMPONENTS_PER_VERTEX);

        let offset = 0;

        for (let i = 0; i < numSubdivisions; ++i) {
            const angle1 = startAngle + ((i + 0) * (endAngle - startAngle)) / numSubdivisions;
            const angle2 = startAngle + ((i + 1) * (endAngle - startAngle)) / numSubdivisions;

            const c1 = Math.cos(angle1);
            const s1 = Math.sin(angle1);
            const c2 = Math.cos(angle2);
            const s2 = Math.sin(angle2);

            // first triangle
            this.addVertex(c1 * radius, s1 * radius, offset++);
            this.addVertex(c2 * radius, s2 * radius, offset++);
            this.addVertex(c1 * innerRadius, s1 * innerRadius, offset++);

            // second triangle
            this.addVertex(c1 * innerRadius, s1 * innerRadius, offset++);
            this.addVertex(c2 * radius, s2 * radius, offset++);
            this.addVertex(c2 * innerRadius, s2 * innerRadius, offset++);
        }
    }

    /**
     * Adds a vertex to the vertexData array.
     * @param {number} x - The X coordinate of the vertex.
     * @param {number} y - The Y coordinate of the vertex.
     * @param {number} offset - The current offset for inserting into the vertexData array.
     */
    private addVertex(x: number, y: number, offset: number) {
        this.vertexData[offset * Torus.COMPONENTS_PER_VERTEX] = x;
        this.vertexData[offset * Torus.COMPONENTS_PER_VERTEX + 1] = y;
    }
}
