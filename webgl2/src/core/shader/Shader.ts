import { Errors } from '../errors';
import { shaderBaseConfig } from './shader_configs';

export class Shader {
    readonly glShader: WebGLShader;

    constructor(config: shaderBaseConfig) {
        this.glShader = Shader.createGlShader(config);
        Shader.verify(config.context, this.glShader);
    }

    public delete(context: WebGL2RenderingContext, program: WebGLProgram) {
        if (this.glShader === null) {
            throw new Error(Errors.COULD_NOT_DELETE_SHADER);
        }

        context.detachShader(program, this.glShader);
        context.deleteShader(this.glShader);
    }

    private static createGlShader(config: shaderBaseConfig): WebGLShader {
        const glShader = config.context.createShader(config.type);

        if (glShader === null) {
            throw new Error(Errors.COULD_NOT_CREATE_SHADER);
        }

        config.context.shaderSource(glShader, config.source);
        config.context.compileShader(glShader);

        return glShader;
    }

    private static verify(context: WebGL2RenderingContext, shader: WebGLShader) {
        const success = context.getShaderParameter(shader, WebGL2RenderingContext.COMPILE_STATUS);

        if (!success) {
            const infoLog = context.getShaderInfoLog(shader);
            context.deleteShader(shader);
            throw new Error(`${Errors.COULD_NOT_COMPILE_SHADER} - ${infoLog}`);
        }
    }
}
