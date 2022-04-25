import { useState, useEffect } from 'react'
import {
  Center,
  VStack,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  RadioGroup,
  HStack,
  Radio,
  Heading,
  Button,
} from '@chakra-ui/react'
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

export const Edit = () => {
  const { videoId } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [video, setVideo] = useState(state as Video)

  useEffect(() => {
    const url = `http://localhost:1337/api/videos${videoId}`

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
  }, [videoId, state])

  const {
    attributes: { title, url: videoURL, slug, isPublic },
  } = video

  const onClose = () => {
    navigate(-1)
  }

  const onSave = async () => {
    const url = `http://localhost:1337/api/videos/${videoId}`
    console.log('videoURL', videoURL)
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title,
          url: videoURL,
          slug,
          isPublic,
        },
      }),
    })
    const json = await response.json()
    navigate(`/videos/${videoId}`, { state: json.data })
  }

  const onPublicChange = (value: string) => {
    setVideo({
      ...video,
      attributes: {
        ...video.attributes,
        isPublic: value === 'Yes',
      },
    })
  }

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    attribute: string
  ) => {
    setVideo({
      ...video,
      attributes: {
        ...video.attributes,
        [attribute]: e.target.value,
      },
    })
  }

  let publicValue = undefined
  if (typeof isPublic === 'boolean') {
    publicValue = isPublic ? 'Yes' : 'No'
  }
  const isSaveDisabled = !title || !videoURL

  return (
    <Center width="100%">
      <VStack width="700px">
        <Flex width="100%" justifyContent="space-between">
          <Heading fontSize="xl">Edit</Heading>
          <CloseButton onClick={onClose} />
        </Flex>
        <FormControl isRequired>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            value={title}
            onChange={(event) => onInputChange(event, 'title')}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="url">URL</FormLabel>
          <Input
            id="url"
            value={videoURL}
            onChange={(event) => onInputChange(event, 'url')}
          />
          <FormHelperText>Link to the video</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="slug">Slug</FormLabel>
          <Input
            id="slug"
            value={slug}
            onChange={(event) => onInputChange(event, 'slug')}
          />
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Is the video public?</FormLabel>
          <RadioGroup value={publicValue} onChange={onPublicChange}>
            <HStack spacing="24px">
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          mt={4}
          onClick={onSave}
          disabled={isSaveDisabled}
        >
          Save
        </Button>
      </VStack>
    </Center>
  )
}
