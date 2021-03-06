import { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  SimpleGrid,
  Heading,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import type { Video } from '../api/types'
import { getVideos } from '../api'

export const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const navigate = useNavigate()

  const fetchData = async () => {
    setVideos(await getVideos())
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onEdit = (video: Video) => {
    navigate(`/videos/${video.id}/edit`, { state: video })
  }

  return (
    <Box textAlign="center">
      <Heading fontSize="xl" mb={5}>
        Videos
      </Heading>
      <SimpleGrid minChildWidth="250px" spacing="40px">
        {videos.map((video) => {
          const {
            id,
            attributes: { title, url },
          } = video
          return (
            <Box shadow="md" borderWidth="1px" key={id}>
              <Link to={`/videos/${id}`} state={video}>
                <video controls>
                  <source src={url} />
                </video>
              </Link>

              <Flex
                width="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading fontSize="md" p={3}>
                  {title}
                </Heading>
                <IconButton
                  aria-label="Edit"
                  variant="ghost"
                  icon={<Icon as={EditIcon} />}
                  onClick={() => onEdit(video)}
                />
              </Flex>
            </Box>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}
