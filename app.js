let timer
let deleteFirstPhotoDelay

async function start() {
    try{
        const res = await fetch('https://dog.ceo/api/breeds/list/all')
        const data = await res.json()
        showReal(data.message)
    }catch (e) {
        console.log('maybe dog api get problem.')
    }
}

start()

function showReal (list) {
    document.querySelector('.geti').innerHTML = `
    <select onchange="loadByBread(this.value)">
        <option>Chose a dog breed</option>
        ${Object.keys(list).map(bread =>`
            <option>${bread}</option>
        `)}
    </select>
    `
}

async function loadByBread(bread){
    if (bread != 'Chose a dog breed') {
        const res = await fetch(`https://dog.ceo/api/breed/${bread}/images`)
        const data = await res.json()
        createSlideShow(data.message)
        
    }
}



function createSlideShow(images) {
    let currentPossition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
    
    if(images.length > 1){
        document.querySelector('.slideshow').innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}');"></div>
        <div class="slide" style="background-image: url('${images[1]}');"></div>
    
        `
        currentPossition += 2
        if(images.length == 2) currentPossition = 0
        setInterval(nextSlide, 3000)
    }else{
        document.querySelector('.slideshow').innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}');"></div>
        <div class="slide"></div>
    
        `
    }


    function nextSlide() {
        document.querySelector('.slideshow').insertAdjacentHTML('beforeend', `<div class="slide" style="background-image: url('${images[currentPossition]}');"></div>`)
        setTimeout(() => {
            document.querySelector('.slide').remove()
        }, 1000)
        if (currentPossition + 1 >= images.length) {
            currentPossition = 0
        }
        currentPossition ++
    }
}

    
const box = document.querySelector('.box');
box.addEventListener('click', function(){
    let satu = 'size';
    let dua = 'caption';
    if (this.classList.contains(satu)) {
        [satu, dua] = [dua, satu];
    }
    this.classList.toggle(satu);
    setTimeout(() => {
        this.classList.toggle(dua);
    }, 600);
});


const angka = [-1, 5, 7, 8, 1, -2, 5, 9, -4, -8];

const newAngka1 = angka.filter(a => a>= 3);
console.log(newAngka1);

const newAngka2 = angka.map(a => a*2);
console.log(newAngka2);


const newAngka3 = angka.reduce((a,c) => a * c, 1);

console.log(newAngka3);

const newAngka4 = angka.filter(a => a > 5)
    .map(a => a + 9)
    .reduce((a,c) => a + c, 0);
console.log(newAngka4);

// ambil semua element video
const videos = Array.from(document.querySelectorAll('[data-duration]'));
//pilih hanya 'Js lanjutan'
let jsLanjut = videos.filter(video => video.textContent.includes('Js lanjutan'))
//ambil durasi masing masing masing video
    .map(item => item.dataset.duration)
//ubah durasi jadi float, ubah menit jadi detik
    .map(waktu => {
        const parts = waktu.split(':').map(part => parseFloat(part));
        return (parts[0] * 60) + parts [1];
    })
//jumlah semua detik
    .reduce((a , c) => a + c, 0);
//ubah format jadi jam menit detik
const jam =  Math.floor(jsLanjut / 3600);
jsLanjut = jsLanjut - (jam * 3600);
const menit = Math.floor(jsLanjut / 60);
const detik =  jsLanjut - menit * 60;
//simpan di dom
const pDurasi = document.querySelector('.total-durasi');
pDurasi.textContent = `${jam} jam, ${menit} menit, ${detik} detik.`
const jmlVideo = videos.filter(video => video.textContent.includes('Js lanjutan')).length;
const pJmlVideo = document.querySelector('.jumlah-video');
pJmlVideo.textContent = `${jmlVideo} video`
console.log(jmlVideo);

let hasil = 0
let hasilTampil = document.querySelector('.hasil')
let tambah = document.querySelector('.tambah')
let kurang = document.querySelector('.kurang')

tambah.addEventListener('click',() => {
    hasil++
    hasilTampil.innerHTML = hasil
})
kurang.addEventListener('click', () => {
    hasil--
    if (hasil <= 0) {
        hasil = 0
    }
    hasilTampil.innerHTML = hasil
})



