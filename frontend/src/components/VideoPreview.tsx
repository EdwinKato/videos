import { useState, useEffect } from 'react'
import {
  Center,
  VStack,
  CloseButton,
  Flex,
  Box,
  Heading,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getVideo } from '../api'
import type { Video } from '../api/types'

export const VideoPreview = () => {
  const { videoId } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [video, setVideo] = useState(state as Video)

  useEffect(() => {
    const fetchData = async () => {
      if (videoId) {
        setVideo(await getVideo(videoId))
      }
    }

    if (state) {
      setVideo(state as Video)
    } else {
      fetchData()
    }
  }, [state, videoId])

  const {
    attributes: { title, url },
  } = video

  const onClose = () => {
    navigate('/')
  }

  const onEdit = (video: Video) => {
    navigate(`/videos/${video.id}/edit`, { state: video })
  }

  return (
    <Center>
      <Box shadow="md" borderWidth="1px">
        <VStack width="100%">
          <CloseButton onClick={onClose} alignSelf="flex-end" />
          <video controls>
            <source src={url} />
          </video>
          <Flex width="100%" justifyContent="space-between">
            <Heading fontSize="md" p={3}>
              {title}
            </Heading>
            <IconButton
              aria-label="Close"
              variant="ghost"
              icon={<Icon as={EditIcon} />}
              onClick={() => onEdit(video)}
            />
          </Flex>
        </VStack>
      </Box>
    </Center>
  )
}
