import './App.css';
import Converter from './components/Converter';

function App() {
  return (
    <div className='container p-3 mt-5'>
      <h1 className='text-center text-white'>Currency Converter</h1>
      <Converter />
      <footer>
        <p className='text-center text-white'>Coded by Marcel Wrzeciono</p>
      </footer>
    </div>
  );
}

export default App;
