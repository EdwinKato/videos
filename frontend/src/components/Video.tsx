import { useState, useEffect } from 'react'
import { Text, Center, VStack, CloseButton, Flex } from '@chakra-ui/react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

interface Video {
  attributes: {
    slug: string
    title: string
    url: string
    isPublic: boolean
  }
  id: number
}

export const Video = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [video, setVideo] = useState(state as Video)

  useEffect(() => {
    const url = `http://localhost:1337/api/videos${id}`

    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const { data } = await response.json()
        setVideo(data)
      } catch (error) {
        console.log('error', error)
      }
    }

    if (state) {
      setVideo(state as Video)
    } else {
      fetchData()
    }
  }, [id, state])

  const {
    attributes: { title, url },
  } = video

  const onClose = () => {
    navigate('/')
  }

  return (
    <Center>
      <VStack>
        <Flex width="100%" justifyContent="space-between">
          <Text>{title}</Text>
          <CloseButton onClick={onClose} />
        </Flex>
        <video controls>
          <source src={url} />
        </video>
      </VStack>
    </Center>
  )
}
