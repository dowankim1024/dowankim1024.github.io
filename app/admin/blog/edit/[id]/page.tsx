import EditPostClient from '../EditPostClient'

interface PageProps {
  params: {
    id: string
  }
}

export default function EditPostPage({ params }: PageProps) {
  return <EditPostClient postId={params.id} />
}
