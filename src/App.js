import React from 'react';
import { ScrollArea } from './components';


const titleStyle = {
  color: 'white',
}

const rootStyle = {
  height: '100vh',
  width: '100vw',
  background: '#202020',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

const scrollAreStyle = {
  position: 'relative',
  width: 400,
  height: 400,
  margin: '0 auto',
  padding: 24,
  borderRadius: '1rem',
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid white',
  backdropFilter: 'blur(2px)',
}

const mockBoxStyle = {
  height: 1000,
  background: 'white',
  padding: 16,
}

function App() {

  return (
    <>
      <ScrollArea style={rootStyle}>
        <h2 style={titleStyle}>HYPE SCROLL</h2>
        <ScrollArea scrollY scrollX thumbColor='linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 54%)' style={scrollAreStyle}>
          <p style={mockBoxStyle}>
            The AutoHide Scrollbar project is a custom React component
            designed to enhance the user experience of scrolling within a web application.
            Unlike the default scrollbars, this component offers auto-hiding functionality,
            which means the scrollbar remains hidden until the user hovers over it,
            providing a cleaner and more immersive interface.
          </p>
        </ScrollArea>
      </ScrollArea>
    </>

  );
}

export default App;
