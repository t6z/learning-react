import { useState } from 'react'

function App() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dogapi.dog/api/v2/facts');
      if (!response.ok) throw new Error('Network response was not ok :(');
      const result = await response.json();

      if (result.data[0].attributes.body) {
        setQuote(result.data[0].attributes.body);
        console.log(result);
      } else {
        console.error('API did not respond appropriately:',result);
      }
    } catch (error) {
      console.error('API call failed:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Dog Fact Generator</h1>
      <button onClick={() => fetchQuote()}>
        { loading ? 'Loading...' : 'Fetch fact' }
      </button>
      <div>{quote}</div>
    </>
  )
}

export default App
