const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('ytdl-core');
let normalStr = '0123456789abcdefghijklmnopqrstuvwxyz_'

let table1 = ['À', 'Á', 'Â', 'Ã', 'È', 'É',
'Ê', 'Ì', 'Í', 'Ò', 'Ó', 'Ô', 'Õ', 'Ù', 'Ú', 'Ý', 'à', 'á', 'â',
'ã', 'è', 'é', 'ê', 'ì', 'í', 'ò', 'ó', 'ô', 'õ', 'ù', 'ú', 'ý',
'Ă', 'ă', 'Đ', 'đ', 'Ĩ', 'ĩ', 'Ũ', 'ũ', 'Ơ', 'ơ', 'Ư', 'ư', 'Ạ',
'ạ', 'Ả', 'ả', 'Ấ', 'ấ', 'Ầ', 'ầ', 'Ẩ', 'ẩ', 'Ẫ', 'ẫ', 'Ậ', 'ậ',
'Ắ', 'ắ', 'Ằ', 'ằ', 'Ẳ', 'ẳ', 'Ẵ', 'ẵ', 'Ặ', 'ặ', 'Ẹ', 'ẹ', 'Ẻ',
'ẻ', 'Ẽ', 'ẽ', 'Ế', 'ế', 'Ề', 'ề', 'Ể', 'ể', 'Ễ', 'ễ', 'Ệ', 'ệ',
'Ỉ', 'ỉ', 'Ị', 'ị', 'Ọ', 'ọ', 'Ỏ', 'ỏ', 'Ố', 'ố', 'Ồ', 'ồ', 'Ổ',
'ổ', 'Ỗ', 'ỗ', 'Ộ', 'ộ', 'Ớ', 'ớ', 'Ờ', 'ờ', 'Ở', 'ở', 'Ỡ', 'ỡ',
'Ợ', 'ợ', 'Ụ', 'ụ', 'Ủ', 'ủ', 'Ứ', 'ứ', 'Ừ', 'ừ', 'Ử', 'ử', 'Ữ',
'ữ', 'Ự', 'ự', 'ỳ', 'Ỳ']

let table2 = ['A', 'A', 'A', 'A', 'E',
'E', 'E', 'I', 'I', 'O', 'O', 'O', 'O', 'U', 'U', 'Y', 'a', 'a',
'a', 'a', 'e', 'e', 'e', 'i', 'i', 'o', 'o', 'o', 'o', 'u', 'u',
'y', 'A', 'a', 'D', 'd', 'I', 'i', 'U', 'u', 'O', 'o', 'U', 'u',
'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 'A',
'a', 'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 'E', 'e',
'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E',
'e', 'I', 'i', 'I', 'i', 'O', 'o', 'O', 'o', 'O', 'o', 'O', 'o',
'O', 'o', 'O', 'o', 'O', 'o', 'O', 'o', 'O', 'o', 'O', 'o', 'O',
'o', 'O', 'o', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u',
'U', 'u', 'U', 'u', 'y', 'Y']

function removeAccent(char) {
    for (let i = 0; i < table1.length; i++) {
        if (table1[i] == char) return table2[i]
    }
    if (normalStr.toLocaleLowerCase().includes(char.toLocaleLowerCase())) return char
    return ''
}

function removeAccentStr(str) {
    let res = ''
    for (let i = 0; i < str.length; i++) {
        res += removeAccent(str[i])
    }

    return res
}
async function downloadMp4(url) {

    let info = await ytdl.getInfo(url);
    let name = removeAccentStr(info.videoDetails.title.split(' ').join('_'))
    console.log('start download ===', name)
    ytdl(url, { filter: format => format.container === 'mp4' }).pipe(fs.createWriteStream('./files/' + name +'.mp4'));
}
async function downloadMp3(url) {

    let info = await ytdl.getInfo(url);
    let name = removeAccentStr(info.videoDetails.title.split(' ').join('_'))
    console.log('start download ===', name)
    stream = ytdl(url)

    let proc = new ffmpeg({source:stream})
    proc.setFfmpegPath('D:\\MyStudy_Working\\thich_minh_tue_mp3\\download_video\\ffmpeg\\bin\\ffmpeg')
    proc.saveToFile('./files/' + name + '.mp3', (stdout, stderr) => {
        if (stderr) console.log(stderr)
        else {
            console.log(stdout)
        }
    })
}
let list = [
    // 'https://www.youtube.com/watch?v=K3Jk18an1ag',
    'https://www.youtube.com/watch?v=dRrDsbxszVY'
]

for (let each of list) {
    downloadMp3(each)
}