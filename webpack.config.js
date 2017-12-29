

module.exports = {
   entry: './src/tests/index.ts',
   output: {
      filename: 'dist/tests.js'
   },
   resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx']
   },
   module: {
      loaders: [
         {
            test: /\.ts(x?)$/,
            loader: 'ts-loader',
            options: {
               compilerOptions: {
                  module: "es6",
                  moduleResolution: "node"
               } 
            }
         }
      ]
   }
}