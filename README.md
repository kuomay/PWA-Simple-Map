# Simple Map
This is a simple map project created using vue3-openlayers, accompanied by PWA settings with Nuxt3.  
You can click [here](https://chungyingho.github.io/Simple-Map/) to visit the demo website.  
If someone needs it, welcome to fork the project.

## Run the project in your own local environment

Make sure to install the dependencies:

```bash
# npm
npm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

### Deploy on Github-page
You must make sure to change the base url to your github repo.

```bash
npm run generate
```

#### Notice

After generate the file for deploy, please go to `index.html` modify the link below:

```html
<!-- This one will not work for PWA -->
<link rel="manifest" href="/manifest.webmanifest">
<!-- Change to this one -->
<link rel="manifest" href="./manifest.webmanifest">
```

then, deploy:
```bash
npm run deploy
```