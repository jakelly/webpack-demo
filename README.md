# Webpack 4 Steps

> Note: This was recorded on 06/15/18. 
> [Watch Recording](https://synovus.webex.com/synovus/lsr.php?RCID=64cfc9f6be2945d99e649e767b4a1669)
> [View Slides](./notes/An Introduction to Webpack.pptx)


## 1. Create NPM Package
``` bash
npm init -y
```

---
## 2. Install Webpack & Webpack CLI

  ``` bash
  npm install webpack --save-dev
  npm install webpack-cli --save-dev
  ```

  Run Webpack by calling `webpack` from the command line.

---
## 3. Install Lodash Per Example

  ``` bash
  npm install --save lodash
  ```
  
  Run `webpack` and view results in the browser.

---
## 4. Adding a Configuration File

  Create a `webpack.config.js` file.

### **webpack.config.js**
  ``` javascript
    const path = require('path');

    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      }
    };
  ```
  Run `webpack` or optionally `webpack  --config webpack.config.js`


---
## 5. Configure Package for Scripts

  Configure `package.json` to run webpack

  ### **package.json**
  ``` json
      "scripts": {
        "build": "webpack --mode production"
      }
  ```
  Run `npm run build` to run webpack.

---
## 6. Adding CSS

  Let's add some CSS to our demo!  Start by installing the loaders...

  ``` bash
  npm install style-loader css-loader --save-dev
  ```

  Update `webpack.config.js` to use the loaders for stylesheet files:

  ``` javascript
  // After output: { ... }, add the following
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
  ```

  Add stylesheet `src\style.css`:

  ``` css
  .hello {
    color: red;
  }
  ```

  Update our `src\index.js` file to import the stylesheet.

  ``` diff
    import _ from 'lodash';
  + import './style.css';

    function component() {
      var element = document.createElement('h1');

      // Lodash, now imported by this script
      element.innerHTML = _.join(['Hello', 'webpack!'], ' ');
  +   element.classList.add('hello');

      return element;
    }

    document.body.appendChild(component());
  ```

---
## 7. Adding Images

  Let's now add some images to our demo.  Start by installing the file-loader.

  ``` bash
  npm install file-loader --save-dev
  ```

  Add additional module rules to cover images.  See `webpack.config.js`.

  ``` javascript
  // Under module : { rules: [ ..., ]} add the following
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader'
    ]
  }
  ```

  Update the code to add the logo image.

  ### **./src/index.js**
  ``` diff
    import _ from 'lodash';
    import './style.css';
  + import Logo from './logo.svg';

    function component() {
      var element = document.createElement('h1');

      // Lodash, now imported by this script
      element.innerHTML = _.join(['Hello', 'webpack!'], ' ');
      element.classList.add('hello');

  +   // Add the logo
  +   var myLogo = new Image(200);
  +   myLogo.classList.add('logo');
  +   myLogo.src = Logo;
  +
  +   element.appendChild(myLogo);

      return element;
    }

    document.body.appendChild(component());
  ```

---
## 8.  Adding Fonts

  Adding fonts now. Just cause we can...

  Add the font rules in `webpack.config.js`.
  
  ``` javascript
  // Under module : { rules: [ ..., ]} add the following
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
      'file-loader'
    ]
  }
  ```

  Update the `./src/style.css` file:

  ### **./src/style.css**
  ``` css
  @font-face {
    font-family: 'Raleway';
    src: url('./Raleway-Regular.ttf') format('truetype');
    font-style: normal;
  }

  .hello {
    color: red;
    font-family: 'Raleway';
  }
  ```

---
## 9. Multiple Entry Points
Let's create another HTML page:  `./dist/index2.html`

### **./dist/index2.html**
``` html
<!doctype html>
<html>
  <head>
    <title>Managing Output</title>
    <script src="./print.bundle.js"></script>
  </head>
  <body>
    <script src="./app.bundle.js"></script>
  </body>
</html>
```
... and another JS file: `./src/index2.js`

### **./src/index2.js**
``` javascript
import _ from 'lodash';
import './style.css';
import printMe from './print.js';

function component() {
  var element = document.createElement('h1');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack', '<br/>'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
```

Notice that this `./src/index2.js` references another file: `./print.js`.  
Let's create it now:

### **./src/print.js**
``` javascript
export default function printMe() {
  console.log('I get called from print.js!');
}
```

Now let's modify `webpack.config.js` to output multiple files:

### **webpack.config.js**
``` diff
 const path = require('path');

 module.exports = {
-  entry: './src/index.js',
+  entry: {
+    // main: './src/index.js',
+    app: './src/index2.js',
+    print: './src/print.js'
+  },
   output: {
-    filename: 'bundle.js',
+    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist')
   },
   module: {
```

> This will output `app.bundle.js` and `print.bundle.js` files.

---
## 10. Using the HTMLWebpackPlugin

If entry-points change that requires us to update the html pages they are used on.  Let's fix that.

``` bash
npm install --save-dev html-webpack-plugin
```

Now let's update the `webpack.config.js` file again to use the HTMLWebpackPlugin:

### **webpack.config.js**
``` diff
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      // main: './src/index.js',
      app: './src/index2.js',
      print: './src/print.js'
    },
+    plugins: [
+      // Generates an HTML file
+      new HtmlWebpackPlugin({
+        title: 'Managing Output',
+        filename: 'index2.html'
+      })
+    ],
    output: {
```

---
## 11. Clean up the `./dist` folder

Install the `clean-webpack-plugin`:

``` bash
npm install clean-webpack-plugin --save-dev
```

Add the plugin to the `webpack.config.js` file:

---
## 12. Easing the development burden

1. Including source maps helps track down errors:

    ### **webpack.config.js**

    ``` diff
      entry: {
        // main: './src/index.js',
        app: './src/index2.js',
        print: './src/print.js'
      },
    + devtool: 'inline-source-map',
      plugins: [
    ```

    > Now create a bug in your code by mispelling `console` in `./src/print.js` to see the impact.

2. Instant compilation & live reloading when code changes

    ``` bash
    npm install --save-dev webpack-dev-server
    ```

    Update the `webpack.config.js` to use webpack-dev-server.

    ### **webpack.config.js**
    ``` diff
        devtool: 'inline-source-map',
    +   devServer: {
    +     contentBase: './dist',
    +     openPage: 'index2.html'
    +   },
    ```
    And update the `package.json file to assist in running webpack-dev-server:

    ### **package.json**
    ``` diff
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "webpack --mode development",
    +    "start": "webpack-dev-server --open chrome --mode development",
        "build": "webpack --mode production"
      },
    ```
    run `npm start` to kick off the new web server.

    Now correct the `console` error, add some additional code and refresh the browser!

    ``` javascript
    export default function printMe() {
      console.log('I get called from print.js!');
      // cosnole.log('I get called from print.js!');  // Correct the console error!

      var questionElement = document.getElementsByClassName('question')[0];
      questionElement.insertAdjacentHTML('beforebegin', '<p>I get called from print.js!</p>');
    }
    ```

  ---
  ## 13. Hot Module Replacement (HMR) - Developer's Choice Award!

  Let's set up hot module replacement and lessen a developer's burdens even more.

  ### **webpack.config.js**
  
  ``` diff
    ...
    const CleanWebpackPlugin = require('clean-webpack-plugin');
  + const webpack = require('webpack');

    module.exports = {
      entry: {
        // main: './src/index.js',
        app: './src/index2.js',
  -    print: './src/print.js'
  +    // print: './src/print.js'
      },
      devtool: 'inline-source-map',
      devServer: {
        contentBase: './dist',
        openPage: 'index2.html',
  +     hot: true
      },
      plugins: [
        new CleanWebpackPlugin(['dist']),
        // Generates an HTML file
        new HtmlWebpackPlugin({
          title: 'Managing Output',
          filename: 'index2.html'
        }),
  +     new webpack.NamedModulesPlugin(),
  +     new webpack.HotModuleReplacementPlugin()
      ],
  ```

  > `webpack.NamedModulesPlugin` makes it easier to see which dependencies are being patched.

  Update `./src/index2.js` to enable HMR:

  ### **./src/index2.js**
  ``` diff    
  - document.body.appendChild(component());
  - document.body.appendChild(addNote());
  
  + let element = component(); // Store the element to re-render on print.js changes
  + document.body.appendChild(element);
  + document.body.appendChild(addNote());
  + 
  + if (module.hot) {
  +   module.hot.accept('./print.js', function() {
  +     console.log('Accepting the updated printMe module!');
  +     printMe();
  +     // document.body.removeChild(element);
  +     // element = component(); // Re-render the "component" to update the click handler
  +     // document.body.appendChild(element);
  +   })
  + }
  ```

  Update the `./src/print.js` file to see the HMR in action...
  
  > Note the browser's console when updates are saved, it immediate detects and swaps the module!
  >
  > However, there's a devil in the details...

  You **must** re-establish event handlers for HMR to work trouble-free.

  ### **./src/index2.js**
  ``` diff
      if (module.hot) {
      module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
  -     printMe();
  +     document.body.removeChild(element);
  +     element = component(); // Re-render the "component" to update the click handler
  +     document.body.appendChild(element);
      })
  ```
  Now updates to `./src/print.js` will be swapped and the events re-wired. 
  
---
## 14. Shaking off the dead leaves    

Tree shaking, aka dead-code elimination aids in reducing the code foot-print by putting only the code that is necessary into your packages.

Create a new `./src/math.js` file:

### **./src/math.js**
``` javascript
export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}
```

Now update `./src/index2.js` to use the cube function...

  ### **./src/index2.js**
  ``` diff
  - // import _ from 'lodash';
    import './style.css';
    import printMe from './print.js';
  + import { cube } from './math.js';

    function component() {
      var element = document.createElement('h1');
      var btn = document.createElement('button');

  +   element.innerHTML = ['Hello webpack!', '5 cubed is equal to ' + cube(5) ].join('\n\n');

  -   element.innerHTML = _.join(['Hello', 'webpack', '<br/>'], ' ');
  -   btn.innerHTML = 'Click me and check the console!';
  -   btn.onclick = printMe;

  -   element.appendChild(btn);

      return element;
    }

  ```

  Compile using `npm run dev` and inspect the package contents.  
  Now re-compile using `npm run build` (which uses production mode) and look for the square function (e*e).
  
  Can you find the **square** function in the code?

> Tree shaking can yield a significant decrease in bundle size when working on larger applications with complex dependency trees.

---
## 15. Code Splitting

Here's a demonstration showing two modules `./src/mod1.js` and `./src/mod2.js` using `lodash`.

1.  Initially they are both compiled with their own copy of `lodash`, a third-party script.
    > Note the module sizes in the terminal.

2.  Afterward we use `SplitChunksPlugin` to combine duplicate code from modules (aka `lodash`).
    > Note the new module sizes.

---
## 16. Dynamic Importing

Update `webpack.config.js` to add the `chunkFilename` attribute:

### **./webpack.cofing.js**
``` diff
  output: {
    filename: '[name].bundle.js',
+    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
```

Create a new index file (`index3.js`):
### **./src/index3.js**
``` javascript
// import _ from 'lodash';

function getComponent() {
  // Lodash, now imported by this script
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    var element = document.createElement('div');
    var _ = _.default;
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
  }).catch(error => 'An error occurred while loading the component');
}

// document.body.appendChild(component());
getComponent().then(component => {
  document.body.appendChild(component);
})
```
> Did you Remember? Add `index3.js` to the entry settings of the `webpack.config.js` file.

> Note the use of webpackChunkName in the comment. This will cause our separate bundle to be named lodash.bundle.js instead of just [id].bundle.js

Compile and inspect the output using  `npm run build` 

---
## 17. Lazy Loading


Replace `./src/print.js` with the following code:

``` javascript
console.log('The print.js module has loaded! See the network tab in dev tools...');

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};
```

Create `./src/index3.js` using the following code:

``` javascript
import _ from 'lodash';

function component() {
  var element = document.createElement('div');
  var button = document.createElement('button');
  var br = document.createElement('br');
  button.innerHTML = 'Click me and look at the console!';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);
  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;
    print();
  });
  return element;
}

document.body.appendChild(component());
```

Finally update the `webpack.config.js` file:

``` diff
 entry: {
-   // main: './src/index.js',
-   // app: './src/index2.js',
+   app3: './src/index3.js'
-   // print: './src/print.js'
-   // mod1: './src/mod1.js',
-   // mod2: './src/mod2.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
+   openPage: 'index3.html',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // Generates an HTML file
    new HtmlWebpackPlugin({
+     title: 'Webpack',
+     filename: 'index3.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
```

This when compiled will launch `./index3.html` in the browser.  

1. Inspect the source and observe only the `app3.bundle.js` is loaded.
2. Verify when clicking the button the source immediately loads the `print.bundle.js` file