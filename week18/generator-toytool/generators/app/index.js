 var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }
    async initPackage() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            }
        ]);

        const pkgJson = {
            name: answers.name,
            version: '1.0.0',
            description: '',
            main: 'index.js',
            scripts: {
                build: 'weboack',
                test: 'mocha --require @babel/register',
                coverage: 'nyc mocha --require @babel/register',
            },
            keywords: [],
            author: '',
            license: 'ISC',
            devDependencies: {
                webpack: '^4.44.2',
                'css-loader': '^4.2.2',
            },
            dependencies: {
            }
          };
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

        // install
        this.npmInstall([
            'vue'
        ], { 'save-dev': false });
        this.npmInstall([
            'webpack',
            'webpack-cli',
            'css-loader',
            'vue-loader',
            'vue-template-compiler',
            'vue-style-loader',
            'copy-webpack-plugin',
            
            "@babel/core",
            '@babel/preset-env',
            '@babel/register',
            'babel-loader',
            '@istanbuljs/nyc-config-babel',
            'babel-plugin-istanbul',
            'mocha',
            'nyc',
        ], { 'save-dev': true });

        // copyFiles
        this.fs.copyTpl(
            this.templatePath('HelloWorld.vue'),
            this.destinationPath('src/HelloWorld.vue'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html'),
            { title: 'sss'}
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('sample-test.js'),
            this.destinationPath('test/sample-test.js'),
            {}
        );
    }
};