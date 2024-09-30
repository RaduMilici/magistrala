import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { string } from 'rollup-plugin-string';

export const rollupBaseConfig = {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'esm',
    },
    plugins: [
        nodeResolve(),
        typescript(),
        string({
            include: '**/*.wgsl',
        }),
    ],
};
