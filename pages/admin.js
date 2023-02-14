import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import Layout from '../components/layout'
import Service from '../components/service'
import ServiceEditor from '../components/service-editor'
import ToastNotification from '../components/toastnotification'

import {
  getServices,
  updateService,
  createService,
  deleteService,
} from '../services/service_service'

export default function Admin() {
  const [serviceSelected, setserviceSelected] = useState(null)
  const [services, setServices] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    loadServices()
  }, [])

  const handleServiceChange = (service) => {
    if (service._id) {
      updateService(service)
        .then(() => {
          setMessage('Service ' + service.name + ' updated successfully')
          loadServices()
        })
        .catch((err) => {
          setError(err)
          setMessage('Error updating service ' + service.name)
        })
    } else {
      createService(service)
        .then(() => {
          setMessage('Service ' + service.name + ' created successfully')
          loadServices()
        })
        .catch((err) => {
          setError(err)
          setMessage('Error creating service ' + service.name)
        })
    }
  }

  const loadServices = async () => {
    setLoading(true)
    getServices()
      .then((data) => {
        if (data) {
          setServices(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  const onDelete = (id) => {
    deleteService(id)
      .then(() => {
        setMessage('Service ' + id + ' deleted successfully')
        loadServices()
      })
      .catch((err) => {
        setError(err)
        setMessage('Error deleting service ' + id)
      })
  }

  const onEdit = (service) => {
    setserviceSelected(service)
  }

  return (
    <Layout>
      <h1>Admin</h1>

      <ToastNotification body={message} error={error} />

      <div className="row">
        <div className="col-sm-4">
          <button
            type="button"
            className="btn btn-primary mb-3"
            data-bs-toggle="modal"
            data-bs-target="#serviceeditor"
            onClick={() => setserviceSelected(null)}
          >
            <i className="bi bi-plus-lg"></i> Add Service
          </button>

          <ServiceEditor
            service={serviceSelected}
            services={services}
            onSubmit={handleServiceChange}
          />

          {loading && <div>Loading...</div>}

          {services.length > 0 ? (
            services.map((service) => (
              <Service
                key={service._id}
                service={service}
                onDelete={() => onDelete(service._id)}
                onEdit={() => onEdit(service)}
              />
            ))
          ) : (
            <p>No services found so far, feel free to create one</p>
          )}
        </div>
      </div>
    </Layout>
  )
}
