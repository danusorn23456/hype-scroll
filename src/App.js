import ScrollArea from './component/scrollArea';

function App() {
  return (
    <ScrollArea height="50vh" width="90vw" className="transform translate-y-8 shadow p-10" style={{border:'10px solid black'}}>
      <ScrollArea height="100vh" width="70vw" className="shadow" style={{border:'10px solid black'}}>
        <ScrollArea height="90vh" width="50vw" className="flex relative transform translate-x-12 flex-col items-center shadow" style={{border:'40px solid black'}}>
          <h1 className="text-[12rem]">A</h1>
          <h1 className="text-[12rem]">A</h1>
        </ScrollArea>
        <ScrollArea height="80vh" width="50vw" className="flex transform translate-x-12 flex-col items-center shadow">
          <h1 className="text-[12rem]">A</h1>
          <h1 className="text-[12rem]">A</h1>
          <h1 className="text-[12rem]">A</h1>
          <h1 className="text-[12rem]">A</h1>
          <h1 className="text-[12rem]">A</h1>
          <h1 className="text-[12rem]">A</h1>
          <h1 className="text-[12rem]">A</h1>
          <h1 className="text-[12rem]">A</h1>
          <h1 className="text-[12rem]">A</h1>
        </ScrollArea>
      </ScrollArea>
    </ScrollArea>

  );
}

export default App;
