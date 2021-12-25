import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';

const packageDir = path.resolve(__dirname);
const concat = p => path.resolve(packageDir, p);

const extensions = ['.ts', '.js'];

export default [{
    input: concat('src/index.ts'),
    output: [{
            file: concat('dist/index.esm.js'),
            format: 'esm',
        },
        {
            file: concat('dist/index.cjs.js'),
            format: 'cjs',
        },
    ],
    plugins: [
        resolve({ extensions }),
        esbuild({
            sourceMap: true,
            tsconfig: 'tsconfig.json',
            loaders: {
                '.json': 'json',
            },
        }),
    ],
}, ];