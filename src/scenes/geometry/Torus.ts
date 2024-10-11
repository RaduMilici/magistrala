import { UniformVec3 } from '../../core/uniformLayoutBuffer/uniformLayoutBufferTypes';

interface TorusConfig {
    radius?: number;
    numSubdivisions?: number;
    innerRadius?: number;
    startAngle?: number;
    endAngle?: number;
}

export class Torus {
    vertexData: Float32Array; // Stores vertex positions and placeholder for color data
    colorData: Uint8Array; // Stores actual color data in a Uint8 format
    numVertices: number; // Total number of vertices generated
    indexData: Uint32Array;

    // Constants for subdivision and vertex structure
    private static readonly TRIANGLES_PER_SUBDIVISION = 2;
    private static readonly VERTICES_PER_TRIANGLE = 3;
    private static readonly COMPONENTS_PER_VERTEX = 2; // XY position components
    private static readonly COMPONENTS_PER_COLOR = 1; // Placeholder for colors (will use Uint8Array)

    constructor({
        radius = 1,
        numSubdivisions = 24,
        innerRadius = 0,
        startAngle = 0,
        endAngle = Math.PI * 2,
    }: TorusConfig = {}) {
        // Calculate the total number of vertices
        const numVertices = (numSubdivisions + 1) * Torus.TRIANGLES_PER_SUBDIVISION;

        // Create a Float32Array for vertex data, including position and color components
        this.vertexData = new Float32Array(numVertices * (Torus.COMPONENTS_PER_VERTEX + Torus.COMPONENTS_PER_COLOR));

        // Create a Uint8Array to store color data, sharing the same buffer with vertexData
        this.colorData = new Uint8Array(this.vertexData.buffer);

        // Define the colors for inner and outer vertices
        const innerColor: UniformVec3 = [1, 1, 1]; // White
        const outerColor: UniformVec3 = [0.1, 0.1, 0.1]; // Dark gray

        let vertexOffset = 0; // Track the current vertex offset

        // Loop over subdivisions to generate triangles
        for (let i = 0; i <= numSubdivisions; ++i) {
            const angle = startAngle + ((i + 0) * (endAngle - startAngle)) / numSubdivisions;

            const c1 = Math.cos(angle);
            const s1 = Math.sin(angle);

            this.addVertex(c1 * radius, s1 * radius, ...outerColor, vertexOffset++);
            this.addVertex(c1 * innerRadius, s1 * innerRadius, ...innerColor, vertexOffset++);
        }

        this.indexData = new Uint32Array(numSubdivisions * 6);
        let ndx = 0;

        // 1st tri  2nd tri  3rd tri  4th tri
        // 0 1 2    2 1 3    2 3 4    4 3 5
        //
        // 0--2        2     2--4        4  .....
        // | /        /|     | /        /|
        // |/        / |     |/        / |
        // 1        1--3     3        3--5  .....
        for (let i = 0; i < numSubdivisions; ++i) {
            const ndxOffset = i * 2;

            // first triangle
            this.indexData[ndx++] = ndxOffset;
            this.indexData[ndx++] = ndxOffset + 1;
            this.indexData[ndx++] = ndxOffset + 2;

            // second triangle
            this.indexData[ndx++] = ndxOffset + 2;
            this.indexData[ndx++] = ndxOffset + 1;
            this.indexData[ndx++] = ndxOffset + 3;
        }
        this.numVertices = this.indexData.length;
    }

    // Add a vertex to the buffer with position (x, y) and color (r, g, b)
    private addVertex(x: number, y: number, r: number, g: number, b: number, offset: number) {
        // Base index for the vertex in the Float32Array
        const baseIndex = offset * (Torus.COMPONENTS_PER_VERTEX + Torus.COMPONENTS_PER_COLOR);

        // Set vertex position (x, y) in the Float32Array
        this.vertexData[baseIndex] = x;
        this.vertexData[baseIndex + 1] = y;

        // Calculate the corresponding byte index for the color in the Uint8Array
        const colorIndex = baseIndex * 4; // Float32Array elements are 4 bytes
        this.colorData[colorIndex + 8] = r * 255; // Red component
        this.colorData[colorIndex + 9] = g * 255; // Green component
        this.colorData[colorIndex + 10] = b * 255; // Blue component
    }
}
