import { useState, useEffect } from 'react'

export default function App() {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots(prev => (prev < 10 ? prev + 1 : 0));
      }, 100);
      // cleanup function
      return () => {
        clearInterval(interval);
        setDots(0);
      }
    }
  }, [loading]);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dogapi.dog/api/v2/facts');
      if (!response.ok) throw new Error('Network response was not ok :(');
      const result = await response.json();

      if (result.data[0].attributes.body) {
        setFact(result.data[0].attributes.body);
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

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <>
      <h1>Dog Fact Generator</h1>
      <button onClick={() => fetchFact()}>
        { loading ? 'Loading'+'.'.repeat(dots) : 'Fetch fact' }
      </button>
      <div>{fact}</div>
    </>
  )
}
