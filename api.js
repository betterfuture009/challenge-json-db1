module.exports = {
  getHealth,
  getFile,
  getProperty,
  update,
  removeById,
  removeProperty,
  queryFilter
}

const fs = require('fs')
const path = require('path')
const FILES_PATH = __dirname + '/files/'
const FILE_MIME_TYPE = 'json'

async function getHealth (req, res, next) {
  res.json({ success: true })
}


async function getFile(req, res){ 
  const fileName = req.params.id
  const filePath = path.join(FILES_PATH + fileName + '.' + FILE_MIME_TYPE)

  console.info('File Path:', filePath)

  if (fs.existsSync(filePath)) {
      fs.readFile(filePath, {encoding: 'utf-8'}, function(err, fileStream){
          if(!err){
              const data = JSON.parse(fileStream)
              console.log('fileJson', data)
              res.send({
                  status: true,
                  data: data
                })
          }else{
              res.status(500).send({
                  status: false,
                  error: err
              })
          }       
      })
  } else {
    res.status(404).send({
      status: false,
      error: 'File does not exist'
    })
  }
}

async function getProperty(req, res){ 
  const { filePath } = req

  console.info('File Path:', filePath)

  if (fs.existsSync(filePath)) {
      fs.readFile(filePath, {encoding: 'utf-8'}, function(err, fileStream){
          if(!err){
            let fileJson = JSON.parse(fileStream)
            let currentNode = {}; 
            let status = 1    

            for(let i =0; i<properties[i]; i ++){
              const property = properties[i]
              currentNode = fileJson[property]
              if(typeof currentNode == 'undefined'){
                fileJson[property] = {}
                status = 0
                break;
              }
              fileJson = fileJson[property]
            }
          
            if(typeof fileJson == 'undefined'){
              status = 0
            }

            if(status == 0){
              res.status(200).send({
                status: false,
                error: "Not found property"
            })
          }else{
              res.send({
                status: true,
                data: currentNode
              })
        }
      }else{
              res.status(500).send({
                  status: false,
                  error: err
              })
      }       
    })
  } else {
    res.status(404).send({
      status: false,
      error: 'File does not exist'
    })
  }
}


async function update(req, res){

  const {filePath, properties} = req
  let score = req.body.score

  if (fs.existsSync(filePath)) {
      fs.readFile(filePath, {encoding: 'utf-8'}, function(err, fileStream){
          if(!err){
              let fileJson = JSON.parse(fileStream)
              let obj = fileJson
              let currentNode = {};     
              properties.forEach(property => {
                currentNode = fileJson[property]
                if(typeof currentNode == 'undefined'){
                  fileJson[property] = {}
                }
                fileJson = fileJson[property]
              });
            
              if(typeof fileJson == 'undefined'){
                currentNode = {}
              }
              currentNode.score = score
              const strStudentData = JSON.stringify(obj)
              // write to a new file named 2pac.txt
              fs.writeFile(filePath, strStudentData, (err) => {  
              // throws an error, you could also catch it here
              if (err) throw err;
        
              // success case, the file was saved
              console.log('Data saved!');
              res.send({
                  status: true,
                })
              })
          }else{
              res.status(500).send({
                  status: false,
                  error: err
                })
          }        
      })
  } else {
      let obj = {}
      let currentNode = obj;     
      properties.forEach(property => {
        currentNode[property] = {}
        currentNode = currentNode[property];
      });
    
      currentNode.score = score
      console.log('jsonStudentData', obj)
      const strStudentData = JSON.stringify(obj)

      fs.writeFile(filePath, strStudentData, (err) => {  
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log('Data saved!');
      res.send({
          status: true,
        })
      })
  }
}


async function removeById(req, res){
  const filePath = req.filePath
  
  if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      res.send({
          status: true,
        })
  }else {
      res.status(404).send({
      status: false,
      error: 'File does not exist'
      })
  }
}

async function removeById(req, res){
  const filePath = req.filePath
  
  if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      res.send({
          status: true,
        })
  }else {
      res.status(404).send({
      status: false,
      error: 'File does not exist'
      })
  }
}

async function removeById(req, res){
  const filePath = req.filePath
  
  if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      res.send({
          status: true,
        })
  }else {
      res.status(404).send({
      status: false,
      error: 'File does not exist'
      })
  }
}

async function removeProperty(req, res){
  const { filePath } = req

  console.info('File Path:', filePath)

  if (fs.existsSync(filePath)) {
      fs.readFile(filePath, {encoding: 'utf-8'}, function(err, fileStream){
          if(!err){
            let fileJson = JSON.parse(fileStream)
            let currentNode = {}; 
            let status = 1    

            for(let i =0; i<properties[i]; i ++){
              const property = properties[i]
              currentNode = fileJson[property]
              if(typeof currentNode == 'undefined'){
                status = 0
                break;
              }
              fileJson = fileJson[property]
            }
          
            if(typeof fileJson == 'undefined'){
              status = 0
            }

            if(status == 0){
              res.status(200).send({
                status: false,
                error: "Not found property"
            })
          }else{
              res.send({
                status: true
              })
        }
      }else{
              res.status(500).send({
                  status: false,
                  error: err
              })
      }       
    })
  } else {
    res.status(404).send({
      status: false,
      error: 'File does not exist'
    })
  }
}

async function queryFilter(req, res, next){
  const fileName = req.params.id
  const filePath = path.join(FILES_PATH + fileName + '.' + FILE_MIME_TYPE)
  const properties = req.originalUrl.slice(fileName.length+2).split('/')
  req.filePath = filePath
  req.properties = properties
  next()
}
