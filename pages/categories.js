import Container from '@components/container'
import Layout from '@components/layout'
import { configQuery } from '@lib/groq';
import { getClient, usePreviewSubscription } from '@lib/sanity';
import { useRouter } from 'next/router';

const Categories = (props) => {
  const { siteconfig, preview } = props;

  const router = useRouter();

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });
  return (
    <Layout {...siteConfig}>
      <Container>
        <div className='mt-48 flex items-center justify-center'>
          <h1 className='font-semibold dark:text-white text-3xl'>To be added soon.</h1>
        </div>
      </Container>
    </Layout>
  )
}

export default Categories

export async function getStaticProps({ params, preview = false }) {
  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}