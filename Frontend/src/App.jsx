
import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import "prismjs/components/prism-javascript"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      setLoading(true)
      setError('')
      setReview('')

      const response = await axios.post(
        'http://localhost:3000/ai/get-review',
        { code }
      )

      console.log("Backend Response:", response.data)

      setReview(response.data.review)

    } catch (err) {
      console.error("Review Error:", err)

      setError(
        err.response?.data?.message || 
        "Unable to generate code review."
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code =>
                prism.highlight(
                  code,
                  prism.languages.javascript,
                  "javascript"
                )
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>

          <button
            onClick={reviewCode}
            disabled={loading}
            className="review"
          >
            {loading ? "Reviewing..." : "Review"}
          </button>
        </div>

        <div className="right">
          {error && <p>{error}</p>}

          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  )
}

export default App
