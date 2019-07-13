import { withRouter } from 'next/router'
import Layout from '../comp/MyLayout.js'

function Post(props) {
  return (
    <Layout>
      <h1>{props.router.query.title}</h1>
      <p>This is the blog post content.</p>
    </Layout>
  )
}

export default withRouter(Post)