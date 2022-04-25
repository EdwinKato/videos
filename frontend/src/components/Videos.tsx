import { useState, useEffect } from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  GridItem,
  theme,
} from "@chakra-ui/react"

interface Video {
    attributes: {
        slug: string;
        title: string;
        url: string;
        isPublic: boolean;
    }
    id: number;
}

export const Videos = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        const url = "http://localhost:1337/api/videos";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setVideos(json.data);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    return (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
          {videos.map(({ id, attributes: { title, url } }) => (
                <GridItem key={id}>
                    <Text>{title}</Text>
                    <video controls>
                        <source src={url} />
                    </video>
                </GridItem>
          ))}
      </Grid>
    </Box>
  </ChakraProvider>
)
    }
