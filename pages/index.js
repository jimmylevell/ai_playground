import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import { getServices } from '../services/service_service'
import styles from './index.module.css'
import Layout from '../components/layout'
import ToastNotification from '../components/toastnotification'
import UseCase from '../components/usecase'

export default function Home() {
  const [services, setServices] = useState([])

  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    getServices()
      .then((data) => {
        if (data) {
          setServices(data)
        }
      })
      .catch((err) => {
        setError(err)
        setMessage('Error loading services')
      })
  }, [])

  return (
    <div className={styles.container}>
      <ToastNotification body={message} error={error} />

      <Layout>
        <h1 className={styles.title}>Playground</h1>

        {services.length > 0 ? (
          services.map((service) => (
            <UseCase
              key={service._id}
              service={service}
            />
          ))
        ) : (
          <p>No services found so far, feel free to create one</p>
        )}
      </Layout>
    </div>
  )
}

Home.auth = true
