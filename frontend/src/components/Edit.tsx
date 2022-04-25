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
import { getVideo, updateVideo } from '../api'
import type { Video } from '../api/types'

export const Edit = () => {
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
    attributes: { title, url: videoURL, slug, isPublic },
  } = video

  const onClose = () => {
    navigate(-1)
  }

  const onSave = async () => {
    if (videoId) {
      const editedVideo = await updateVideo(videoId, {
        title,
        url: videoURL,
        slug,
        isPublic,
      })

      navigate(`/videos/${videoId}`, { state: editedVideo })
    }
  }

  const onIsPublicChange = (value: string) => {
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
      <VStack width="100%" maxWidth="700px">
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
          <RadioGroup value={publicValue} onChange={onIsPublicChange}>
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
