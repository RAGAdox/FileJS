const express=require('express');
const exphbs=require('express-handlebars');
const fileUpload = require('express-fileupload');
const testFolder = './uploads/';
const fs = require('fs');
let filelist=[];
fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      //console.log(file);
      filelist.push(file);
    });
  });
const app=express();
app.use(fileUpload());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/download', (req, res) => res.download('./file.txt',(err)=>{
    if(err==null)
        console.log('File Transfered Successfully');
    else
        console.log(err);
}));
app.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;
    //console.log(req.files);
    if (Object.keys(req.files).length == 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }
  
    //console.log('req.files >>>', req.files); // eslint-disable-line
  
    sampleFile = req.files.sampleFile;
  
    uploadPath = __dirname + '/uploads/' + sampleFile.name;
  
    sampleFile.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      
      //res.send('File uploaded to ' + uploadPath);
      filelist.push(sampleFile.name);
      res.redirect('/');
    });
  });
app.get('/',(req,res)=>res.render('index',{
    title:'Files App',
    filelist
}));



app.get('/downloadFile/:file', (req, res) => {
    console.log(req.params.file);
    res.download('./uploads/'+req.params.file.substring(1),(err)=>{
    if(err==null)
        console.log('File Transfered Successfully');
    else
        console.log(err);
})

});
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log('Server Started at post : '+PORT));