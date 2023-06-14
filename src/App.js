import React from 'react';
import { ScrollArea } from './components';
import "./index.css"

const rootStyle = {
  boxSizing: "border-box",
  height: '100vh',
  width: '100vw',
  backgroundImage: 'url(https://github.com/danusorn23456/react-autohide-scrollbar/raw/main/public/hype-scroll-logo.png?raw=true)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const scrollAreStyle = {
  boxSizing: "border-box",
  position: 'relative',
  width: 400,
  height: 400,
  margin: '0 auto',
  padding: 24,
  background: "rgba(0,0,0,0.1)",
  borderRadius: '1rem',
  border: '1px solid white',
  backdropFilter: 'blur(2px)',
}


function App() {

  return (
    <div style={rootStyle}>
      <ScrollArea trackSize={20} thumbColor="url(https://www.wowpatterns.com/assets/files/resource_images/vibrant-ditsy-floral-pattern-with-bright-colorful-flowers-pattern.jpg)" scrollY scrollX style={scrollAreStyle}>
        <ScrollArea trackSize={20} thumbColor="url(https://www.wowpatterns.com/assets/files/resource_images/vibrant-ditsy-floral-pattern-with-bright-colorful-flowers-pattern.jpg)" scrollY scrollX style={scrollAreStyle}>
          <ScrollArea trackSize={20} thumbColor="url(https://www.wowpatterns.com/assets/files/resource_images/vibrant-ditsy-floral-pattern-with-bright-colorful-flowers-pattern.jpg)" scrollY scrollX style={scrollAreStyle}>
            <ScrollArea trackSize={20} thumbColor="url(https://www.wowpatterns.com/assets/files/resource_images/vibrant-ditsy-floral-pattern-with-bright-colorful-flowers-pattern.jpg)" scrollY scrollX style={scrollAreStyle}>
            </ScrollArea>
          </ScrollArea>
        </ScrollArea>
      </ScrollArea>
    </div>

  );
}

export default App;
