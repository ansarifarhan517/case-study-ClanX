import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
})

const get = async (URL: string, params?: object) => {
  try {
    const response = await axiosClient.get(URL, { params })
    return response
  } catch (error) {
    console.error('Error during GET request:', error)
    throw error
  }
}

const post = async (URL: string, payload: object) => await axiosClient.post(URL, payload).then((response) => response)

const patch = async (URL: string, payload: object) => await axiosClient.patch(URL, payload).then((response) => response)

const remove = async (URL: string, payload: object) => await axiosClient.delete(URL).then((response) => response)

export {
  get,
  post,
  patch,
  remove,
}
