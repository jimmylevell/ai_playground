import React, { useState } from 'react'

import ToastNotification from '../components/toastnotification'

export default function UseCase({ service }) {
  const [body, setBody] = useState('')

  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setBody(e.target.value)
  }

  const handleClick = () => {
    fetch('/api/usecase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service: service,
        body: body
      })
    })
      .then(res => res.json())
      .then(data => {
        setResponse(data)
      })
      .catch(err => {
        setError(err)
      }
      )
  }

  return (
    <div className="card mb-2">
      <ToastNotification body={message} error={error} />

      <div className="card-body">
        <h5 className="card-title">{service.name}</h5>
        <h6 className="card-title float-right"></h6>

        <form>
          <div className="form-group row">
            <div className="input-group">
              <span className="input-group-text">Body</span>
              <textarea className="form-control" aria-label="With textarea" value={body} onChange={handleChange}></textarea>
            </div>
          </div>
        </form>
        <button type="button" className="btn btn-outline-primary mt-2" onClick={handleClick}>
          <i className="bi bi-cloud-arrow-up"></i> Submit
        </button>

        <div className="card mt-2">
          <div className="card-body">
            <h5 className="card-title">Response</h5>
            <h6 className="card-title float-right"></h6>
          </div>
          <div className="card-body">
            <pre>
              {response && response.output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
