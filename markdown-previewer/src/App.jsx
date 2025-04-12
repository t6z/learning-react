import { useState } from 'react'
import { parse } from 'marked'

function App() {
  const [md, setMd] = useState("# Wow\n\nThis is some placeholder text.");

  return (
    <>
      <h1>Markdown Previewer</h1>
      <div>
        <textarea onChange={(e) => setMd(e.target.value)} rows="10" cols="50" value={md}/>
        <div style={{border: '1px solid rgb(0, 0, 0)'}} dangerouslySetInnerHTML={{ __html: parse(md) }} />
      </div>
    </>
  )
}

export default App
