import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
}

const SEO = ({title, description} : SEOProps) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </div>
  )
}

export default SEO