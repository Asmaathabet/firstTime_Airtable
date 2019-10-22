# firstTime_Airtable

## Upload Image in Express js : 
1-  Create Node Express Project
```
mkdir nodeimageupload
cd nodeimageupload
``` 
- create a package.json 
```
npm init -y 
```
- install express as a framework,ejs as a template engine, body-parser, multer as a  node.js middleware for handling multipart/form-data, uuid for getting the random name, sharp as an image resize libraries using NPM.
```
npm install express body-parser ejs uuid multer sharp --save
```

- install the nodemon server as a development dependency.
```
npm install nodemon --save-dev
```
- open the project in Visual Studio Code 
Change the package.json file and add the following line in “scripts” object. 
```
"scripts": {
    "dev": "nodemon server.js"
},
```

2- Create a server.js file.
// server.js
```
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server is running on PORT',port);
});

```
- go to the terminal and start the node server by the following command.
```
npm run dev 

```
3-  Configure the EJS templating engine.
For including the css and js files in the express, first, we will create a static directory called public in the root, and in that, we will put our CSS and JS files. So, create the first public directory.

- Add the following code inside the server/index.js file.
```
app.use(express.static('public'));
```

- set the ejs template engine. Add the following code inside the server/index.js file.
```
app.set('view engine', 'ejs');
```
- create one folder inside our root called views. In that folder make one file called index.ejs.
```
<!-- index.ejs -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>EJS Engine</title>
  </head>
  <body>
    <p>Node Express Image Upload and Resize Example</p>
  </body>
</html>
``` 
-  create an index.html file inside the public folder.
```
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=He, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Node Express Image Upload Example</title>
</head>
<body>
   <p>
     Node Express Image Upload and Resize Example
   </p>
</body>
</html>
```
4- Configure Express Router.
- Set up the routes for our application. So use Router module provided by Express js. So, create a file in the root folder called router.js.

Now, write the following code inside the router.js file.

```
const express = require('express');
const app = express();
const router = express.Router();

router.get('/', async function (req, res) {
  await res.render('index');
});
module.exports = router;
```
- Now in the server.js file, we need to require the router.js file.
and add the needed config in it .

- Now, go to the browser and hit this URL: http://localhost:3000/upload. You can see the basic HTML view.

5- Create a form. 
Inside the index.ejs file, we need to create one HTML form that can upload the image.
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>EJS Engine</title>
  </head>
  <body>
      <p>Image Upload</p>
      <form method="post" action="upload/post" enctype="multipart/form-data">
        <input type="file" name="image" /><br /><br />
        <button type="submit" name="upload">Upload</button>
      </form>
  </body>
</html>
```
6- Create file upload middleware
- to handle the multipart/form-data in Node.js, we have already installed the multer library. So let’s use that and create a middleware inside the root of the project called uploadMiddleware.js.
```
const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});

module.exports = upload
````
- Now, import this middleware inside the router.js file where we handle the POST request.
```
const express = require('express');
const app = express();
const router = express.Router();
const upload = require('./uploadMiddleware');

router.get('/', async function (req, res) {
  await res.render('index');
});

router.post('/post', upload.single('image'), async function (req, res) {
  await console.log('post');
});

module.exports = router;
```
Here, we have used the node async await feature. 

So, when the user tries to upload an image, in the server, the router. Post function will be executed, and in the console, a post will be printed. That means, now we need to resize the image and then save in the file directory.

7- Resize the image
For resizing the image in Node.js and achieve the High-performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP and TIFF images is Sharp. We have already installed the sharp. Now, create a file inside the root called Resize.js and add the following code.
```
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);
    
    return filename;
  }
  static filename() {
    return `${uuidv4()}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;
``` 

- So, in the above file, we have created a class called Resize.js and accepts one argument which is folder path up to images folder. Now, you need to create the images folder inside the public directory.

Then, we have defined the static function filename which returns the random string of filename and then define the filepath function which returns the complete filepath of that uploaded image.

Then we have defined the save() function, which accepts the file buffer coming from the user request and then resize that image and upload to that filepath and return the filename to the User.

-  Save the image in the file system 
we need to import the Resize.js file inside the router.js file because we are handling the post request there. Write the following code inside the router.js file.

```
router.post('/post', upload.single('image'), async function (req, res) {
  const imagePath = path.join(__dirname, '/public/images');
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  return res.status(200).json({ name: filename });
});
```


Resource :
https://appdividend.com/2019/02/14/node-express-image-upload-and-resize-tutorial-example/
