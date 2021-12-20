import path from 'path';
import ts from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const packageDir = path.resolve(__dirname);
const concat = p => path.resolve(packageDir, p);

const extensions = ['.ts', '.js'];
const babelConfig = {
    babelHelpers: 'bundled',
    extensions,
    exclude: [
        '*.config.js',
        'node_modules/*.d.ts',
        '*/dist/**/*',
        '*/demo/*',
        '*/__tests__/**/*',
    ],
};

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
            {
                file: concat('dist/index.umd.js'),
                format: 'umd',
                exports: 'named',
                name: 'datager',
            },
        ],
        plugins: [
            resolve({ extensions }),
            ts(),
            babel(babelConfig),
            commonjs(),
            json(),
        ],
    },
    {
        input: concat('src/index.ts'),
        output: {
            file: concat('dist/index.d.ts'),
            format: 'esm',
            exports: 'named',
        },
        plugins: [dts()],
    },
];