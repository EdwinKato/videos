import type { Video, VideoAttributes } from './types'

const envUrl = process.env.REACT_APP_API_URL || 'http://localhost:1337'
const url = `${envUrl}/api/videos`

export const getVideos: () => Promise<Video[]> = async () => {
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data)
}

export const getVideo: (id: string) => Promise<Video> = async (id) => {
  return fetch(`${url}/${id}`)
    .then((res) => res.json())
    .then((res) => res.data)
}

export const updateVideo: (
  id: string,
  video: Partial<VideoAttributes>
) => Promise<Video> = async (id, video) => {
  return fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: video,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
}
