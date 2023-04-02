import { useSelector, useDispatch } from 'react-redux';
import BubbleSort from './BubbleSort';
import InsertionSort from './InsertionSort';
import QuickSort from './QuickSort';
import MergeSort from './MergeSort';
import SelectionSort from './SelectionSort';
import useSound from "use-sound";
import { useEffect, useState } from "react"; 
import song from './b.mp3';

 


import './Visuals.css';

function Visuals() {

   const myState = useSelector(state => state.updateProps);
   const dispatch = useDispatch();
   const color = myState.color;
   const range = myState.range;

   const changeValues = () => {

      let new_arr = [...myState.values];
      for(let i = 0; i < new_arr.length; i++)
         document.getElementById(i).style.transform = `translateX(${i*11}px)`;

      dispatch({
         type:'CHANGE_VALUES'
      })
   }
/*class App extends Components{      
state={
   audio:new Audio(sound),
   isPlaying=false,

};
playAudio=()=>{
   let isPlaying=this.state.isPlaying;
   if(isPlaying){
      this.state.audio.pause();
   }else{
      this.state.audio.play();
   }

*/
const [isPlaying, setIsPlaying] = useState(false);
const [play, { pause, duration, sound }] = useSound(song);

     
function playAudio(){
   if (isPlaying) {
      pause(); // this will pause the audio
      setIsPlaying(false);
    } else {
      play(); // this will play the audio
      setIsPlaying(true);
    }
}
   const handlePlayPause = (play) => {
      if(!myState.play){
         document.getElementById('change-btn').disabled = true;
         document.getElementById('change-btn').style.backgroundColor = 'blue 70';
         document.getElementById('play-btn').disabled = true;
         document.getElementById('play-btn').style.backgroundColor = 'blue 70';
         
      }
      else{
         return;
      }
      dispatch({
         type: 'PLAY_PAUSE',
         _play: play
      })
   }

   useEffect(() => {
      if(!myState.play){
         document.getElementById('play-btn').disabled = false;
         document.getElementById('play-btn').style.backgroundColor = 'Blue 70';
         document.getElementById('change-btn').disabled = false;
         document.getElementById('change-btn').style.backgroundColor = 'Blue 70';
      }
   },[myState.play]);

   let speed = myState.speed;
   if(myState.algorithm==='selection')
      speed *= 3;
   else if(myState.algorithm==='merge')
      speed *= 5;
   else if(myState.algorithm==='quick')
      speed *= 6;
  return (
    <div className="visuals">
      <div className="visualizer">
         {myState.algorithm==='quick' && <div className="legend"><div className="legend__lable"></div> Pivot elements</div>}
         {
            <div className="visual__items" style={{width:`${myState.values.length*11}px`}}>
               {
                  myState.values.map((item) => {
                     
                     return <div className="visual__item" key={item[1]} id={item[1]} style={{transition:`${speed/1000}s linear all`, transform:`translateX(${item[1]*11}px)`}}>
                              <h4>{item[0]}</h4>
                              <div className="visual" style={{height:`${item[0]*3}px`, backgroundColor:color, width:(range>=25? myState.values.length:"")}}></div>
                           </div>
                  })
               }   
            </div>
         }
      </div>
      <div className="visual__btns">
         <button id = 'change-btn' onClick = {changeValues}>change values</button>   
         <button id='play-btn' onClick = {() => handlePlayPause(true)}>Sort</button>
         {!isPlaying?(<button id = 'Play_audio' onClick = {playAudio}>Play Audio</button>):(
         <button id = 'stop_audio' onClick = {playAudio}>Stop Audio</button>)}
      </div>

      <BubbleSort/>
      <InsertionSort />
      <MergeSort />
      <QuickSort />
      <SelectionSort />
   </div>
  )
}


export default Visuals;