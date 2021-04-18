import { useState } from 'react';
import ScrollArea from './components/scrollArea';

function App() {

  const [row,setRow] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);

  return (
    <ScrollArea width="100vw" height="100vh" className="bg-black flex flex-col items-center space-y-md"  thumbStyle={{
      background: 'rgb(131,58,180)',
      background: 'linear-gradient(173deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'
    }}>
      {row.map((unit,index)=>(
        <div className="text-[4rem] text-white font-medium">SCROLL ME NOW !</div>
      ))}
    </ScrollArea>
  );
}

export default App;
