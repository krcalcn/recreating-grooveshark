# Recreating Grooveshark (A Grooveshark Clone)

## Live Demo
https://frontend-5yguhx2xkq-ew.a.run.app/

### Dev Dependencies
- Npm
- Quasar Cli
```bash
npm install -g @quasar/cli
```
- http-server
```bash
npm install -g http-server
```

### Install the dependencies
```bash
cd backend
npm install

cd frontend
npm install
```

### Start the Server
```bash
cd backend
npm run watch
```

### Start the App in Dev Mode
```bash
cd frontend
quasar dev
```

### Build the App for Production
- Building
```bash
cd frontend
quasar build
```
- Run Frontend App
```bash
cd dist/spa
http-server
```
