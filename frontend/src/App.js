import "@/App.css";

function App() {
  return (
    <div className="App" style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
      <iframe 
        src="/principal.html" 
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="Portal NF-e"
      />
    </div>
  );
}

export default App;
