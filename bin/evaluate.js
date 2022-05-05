const fs = require('fs')
const path = require('path')
const chalk = require("chalk")
const { exit } = require('process')
const { exec, spawn } = require('child_process')

const NO_NAME = 'Missing argument: <PROJECT_NAME>'


module.exports = args => {
	let nameIndex = 0
	let name
	let overwrite = args.find(a => a == '-o' || a == '--overwrite')

	do {
		name = args[nameIndex]
		nameIndex ++
		if (!name) return console.log(chalk.red(NO_NAME))
	} while (name.startsWith('-'))

	console.log(`Creating project ${name}...`)
	
	let parent = path.resolve(name)

	if (fs.existsSync(parent)) {
		if (overwrite) {
			console.log(`Overwriting ${name}.`)
			fs.rmSync(parent, {
				recursive: true,
				force: true
			})
		}
		else {
			console.log(chalk.red(`${name} already exists.`))
			exit(0)
		}
	}

	let script = path.resolve(__dirname, 'scripts.sh')
	
	fs.mkdirSync(parent)
	console.log(`Created ${name}`)

	let pkg = `{
	"name": "${name}",
	"version": "1.0.0",
	"private": true,
	"scripts": {
		"serve-build": "babel-node ./src/index.js local",
		"serve": "nodemon --exec \\"npm run serve-build\\""
	}
}`

	let env = `
OFFLINE_DATABASE_URI=mongodb://127.0.0.1:27017/${name}
ONLINE_DATABASE_URI=mongodb+srv://burka:burkaman@cluster0.ja273.mongodb.net/${name}?retryWrites=true&w=majority
DATABASE_NAME=${name}
`

	fs.writeFileSync(path.resolve(__dirname, 'template/package.json'), pkg, {
		flag: 'w+'
	})

	fs.writeFileSync(path.resolve(__dirname, 'template/.env'), env, {
		flag: 'w+'
	})

	exec(`chmod +x ${script}`, (err, out, serr) => {
		if (err) return console.log(err)
		if (serr) return console.log(serr)
		
		let child = spawn(script, [ name, __dirname ])
		child.stdout.on('data', data => {
			console.log(data.toString())
		})
		child.stdout.on('end', () => {
			console.log(chalk.greenBright(`${name} created!`))
			console.log(chalk.green(`\n  cd ${name}`))
			console.log(chalk.green('  npm run serve\n'))
		})
	})
}