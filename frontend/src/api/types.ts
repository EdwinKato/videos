export type VideoAttributes = {
  slug: string
  title: string
  url: string
  isPublic: boolean
}

export interface Video {
  attributes: VideoAttributes
  id: number
}
