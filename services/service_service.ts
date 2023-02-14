import { IService } from '../model/Service'

export async function getServices() {
  return fetch('/api/service')
    .then((res) => res.json())
    .then((data) => {
      return data['services']
    })
}

export async function createService(service: IService) {
  return fetch('/api/service', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ service: service }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data['service']
    })
}

export async function deleteService(id: String) {
  return fetch('/api/service/' + id, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      return data['service']
    })
}

export async function updateService(service: IService) {
  return fetch('/api/service/' + service._id, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ service: service }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data['service']
    })
}
