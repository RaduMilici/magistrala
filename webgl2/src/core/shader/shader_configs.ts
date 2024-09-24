export type shaderConfig = {
    context: WebGL2RenderingContext;
    source: string;
};

type shaderTypeConfig = {
    type: GLenum;
};

export type shaderBaseConfig = shaderConfig & shaderTypeConfig;
