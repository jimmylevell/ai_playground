import { useState, useEffect } from 'react'
import { randomBytes } from 'crypto'

export default function ServiceEditor(props) {
  const _id = props.service?._id

  const [name, setName] = useState('')
  const [executer, setExecuter] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  const [api_key, setApi_key] = useState('')
  const [bodyField, setBodyField] = useState('')
  const [responseField, setResponseField] = useState('')

  useEffect(() => {
    init()
  }, [props.service])

  const handleChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case 'serviceName':
        setName(value)
        break
      case 'executer':
        setExecuter(value)
        break
      case 'serviceAPIkey':
        setApi_key(value)
        break
      case 'bodyField':
        setBodyField(value)
        break
      case 'responseField':
        setResponseField(value)
        break
      default:
        break
    }
  }

  const init = () => {
    if (props.service) {
      setName(props.service.name)
      setExecuter(props.service.executer)
      setApi_key(props.service.api_key)
      setBodyField(props.service.bodyField)
      setResponseField(props.service.responseField)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    props.onSubmit({
      _id: _id,
      name: name,
      executer: executer,
      api_key: api_key,
      bodyField: bodyField,
      responseField: responseField,
    })

    setName('')
    setExecuter('')
    setApi_key('')
    setBodyField('')
    setResponseField('')
  }

  const togglePassword = (e) => {
    e.preventDefault()
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  return (
    <div className="modal" tabIndex="-1" role="dialog" id="serviceeditor">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-body p-8 text-center">
            <h5 className="mb-0">Service Editor</h5>
            <form>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={handleChange}
                    value={name}
                    className="form-control"
                    name="serviceName"
                    id="serviceName"
                    aria-describedby="NameHelp"
                    placeholder="Enter Name of the Service"
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Executer</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={handleChange}
                    value={executer}
                    className="form-control"
                    name="executer"
                    id="executer"
                    aria-describedby="NameHelp"
                    placeholder="Enter Name of the Executer"
                    required
                  />
                </div>
              </div>


              <div className="form-group row">
                <label className="col-sm-2 col-form-label">API Key</label>
                <div className="col-sm-10">
                  <div className="input-group mb-2">
                    <input
                      type={passwordType}
                      onChange={handleChange}
                      value={api_key}
                      className="form-control"
                      name="serviceAPIkey"
                      id="serviceAPIkey"
                      placeholder="API Key"
                      required
                    />
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-outline-primary"
                        onClick={togglePassword}
                      >
                        {passwordType === 'password' ? (
                          <i className="bi bi-eye-slash"></i>
                        ) : (
                          <i className="bi bi-eye"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Body Field</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={handleChange}
                    value={bodyField}
                    className="form-control"
                    name="bodyField"
                    id="bodyField"
                    aria-describedby="NameHelp"
                    placeholder="Enter Name of the Body Field"
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Respons Field</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={handleChange}
                    value={responseField}
                    className="form-control"
                    name="responseField"
                    id="responseField"
                    aria-describedby="NameHelp"
                    placeholder="Enter Name of the Response Field"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer flex-nowrap p-0">
            <button
              type="button"
              className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
              onClick={handleSubmit}
              data-bs-dismiss="modal"
            >
              <strong>
                <i className="bi bi-box-arrow-down"></i> Save
              </strong>
            </button>
            <button
              type="button"
              className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
