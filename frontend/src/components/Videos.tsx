import { useState, useEffect } from 'react'
import { Box, Text, Grid, GridItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface Video {
  attributes: {
    slug: string
    title: string
    url: string
    isPublic: boolean
  }
  id: number
}

export const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    const url = 'http://localhost:1337/api/videos'

    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const json = await response.json()
        console.log(json)
        setVideos(json.data)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {videos.map((video) => {
          const {
            id,
            attributes: { title, url },
          } = video
          return (
            <GridItem key={id}>
              <Text>{title}</Text>
              <Link to={`/videos/${id}`} state={video}>
                <video controls>
                  <source src={url} />
                </video>
              </Link>
            </GridItem>
          )
        })}
      </Grid>
    </Box>
  )
}
