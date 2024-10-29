// import video1 from '../video/reel2.mp4'
// import video2 from '../video/reel1.mp4'
import Profile1 from '../home/dog.svg'
import Profile2 from '../home/dew2.jpg'


interface IVideoReel{
    videoSrc:string;
    profile:string;
    userName: string;
    time:string;

}


const video1 = 'hello'
const video2 = 'hello'


export const sampleReel1:IVideoReel = {
    videoSrc: video1,
    profile: Profile1,
    userName: 'Galapagous',
    time: '10 min ago',
}


export const sampleReel2:IVideoReel = {
    videoSrc: video2,
    profile: Profile2,
    userName: 'Waqas',
    time: '2hrs ago',
}