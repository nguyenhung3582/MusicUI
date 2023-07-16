export async function fetchData() {
    try {
        const response = await fetch('../listSongs.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
/*const listSongs = [
    {
        name:"Nevada",
        singer:"Vicetone",
        path:"./assets/music/song1.mp3",
        image:"./assets/img/song1.png"
    },
    {
        name:"SummerTime",
        singer:"K-391",
        path:"./assets/music/song2.mp3",
        image:"./assets/img/song2.png"
    },
    {
        name:"Monody",
        singer:"TheFatRat",
        path:"./assets/music/song3.mp3",
        image:"./assets/img/song3.png"
    },
    {
        name:"Reality",
        singer:"Lost Frequencies",
        path:"./assets/music/song4.mp3",
        image:"./assets/img/song4.png"
    },
    {
        name:"Fifty Fifty",
        singer:"Cupid",
        path:"./assets/music/song5.mp3",
        image:"./assets/img/song5.png"
    },
    {
        name:"Nothin On Me",
        singer:"Leah Marie Perez",
        path:"./assets/music/song6.mp3",
        image:"./assets/img/song6.png"
    },
    {
        name:"Im Not Her",
        singer:"Clara Mae",
        path:"./assets/music/song7.mp3",
        image:"./assets/img/song7.png"
    },
    {
        name:"Nothing Stopping Me",
        singer:"Vicetone ft. Kat Nestel",
        path:"./assets/music/song8.mp3",
        image:"./assets/img/song8.png"
    },
    {
        name:"Waiting For Love",
        singer:"Avicii",
        path:"./assets/music/song9.mp3",
        image:"./assets/img/song9.png"
    },
    {
        name:"Dancing With Your Ghost",
        singer:"Sasha Alex Sloan",
        path:"./assets/music/song10.mp3",
        image:"./assets/img/song10.png"
    }
]
export default listSongs
console.log("Data listSongs đang sử dụng:", listSongs)//Data từ JSON nhập thủ công
*/

/*fetch('./listSongs.json')
    .then(response => response.json())
    .then(datas => {
        listSongs2 = datas.songs
        console.log(listSongs2)
    })
  .catch(error => console.log(error));
  console.log(listSongs2)


async function fetchData() {
    try {
      const response = await fetch('./listSongs.json');
      const datas = await response.json();
      listSongs2 = datas.songs;
      console.log(listSongs2);
    } catch (error) {
      console.log(error);
    }
  }
  
fetchData();*/
 