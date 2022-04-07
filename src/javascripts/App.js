import '../styles/App.scss';
import DataSet from './components/dataSet'

function App() {
  return (
    <>
      <div className='projectHeading'>
        <h1>Graphical Interface for Visualizing the Meaning of Expressions</h1>
        <br/>
        <h2>(GivMe)</h2>
      </div>
      <DataSet />
    </>
  );
}

export default App;