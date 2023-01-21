var Buffer = require('buffer/').Buffer 
var toBuffer = require('blob-to-buffer')
var SimplePeer = require('simple-peer')


const p = new SimplePeer({
  initiator: location.hash === '#1',
  trickle: false
})

p.on('error', err => console.log('error', err))

p.on('signal', data => {
  console.log('SIGNAL', JSON.stringify(data))
  document.querySelector('#outgoing').style.display="block";
  document.querySelector('#outgoing').textContent = JSON.stringify(data)
})

document.querySelector('form').addEventListener('submit', ev => {
  ev.preventDefault()
  p.signal(JSON.parse(document.querySelector('#incoming').value))
  document.querySelector('form').style.display="none";
})

p.on('connect', () => {
  console.log('CONNECT');
  document.getElementById('connectionOk').style.display = 'block';
  document.querySelector('#outgoing').style.display="none";
  document.getElementById("databox").style.display = "block";
})

p.on('data', data => {
  console.log('data: ' + data)
  // let messages = document.getElementById("messages");
  // let item = document.createElement('li');
  //   item.textContent = data;
  //   item.className = "their-msg";
  //   messages.appendChild(item);
  //   window.scrollTo(0,document.body.scrollHeight);
  const reader = new FileReader();
  
  var blob = new Blob([ data ])
  reader.readAsDataURL(blob);

   reader.addEventListener("load", () => {
    // convert image file to base64 string
    document.getElementById("downloader").style.display = "initial";
    document.getElementById("downloader").href = reader.result;
    console.log(reader.result);
    // document.getElementById("downloader").download = `${reader.result.name}.${reader.result.type}`;
  }, false);

})


document.querySelector('#send').addEventListener('click',()=>{
  // console.log(document.querySelector('#msg').value)

  p.send(document.querySelector('#msg').value)
})

document.querySelector('#close').addEventListener('click', ()=>{
  console.log('you closed the connection');
  p.send('peer closed the connection');
  p.destroy();
})




document.getElementById("sendFile").addEventListener('click',()=> {
  const preview = document.querySelector('img');
  const fileInput = document.querySelector('#fileinput').files[0];
 

  // console.log(fileInput);

  // const [file] = fileInput.files;

  toBuffer(fileInput, function (err, buffer) {
    if (err) throw err

    buffer[0] 
    console.log(buffer);
    console.log('filenotfound');

    p.send(buffer);


    
  })

  // p.send(fileInput);
  // console.log("sent "+fileInput);


  // reader.addEventListener("load", () => {
  //   // convert image file to base64 string
  //   preview.src = reader.result;

  //   document.getElementById("downloader").href = reader.result;

  // }, false);

  // if (file) {
  //   
  // }
});



// check compatibility
if (!("BarcodeDetector" in window)) {
  alert("Barcode Detector is not supported by this browser.");
} else {
  alert("Barcode Detector supported!");

  // create new detector
  const barcodeDetector = new BarcodeDetector({
    formats: ["code_39", "codabar", "ean_13"],
  });
}