import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import defaultOG from "../public/img/opengraph.jpg";
import { postquery, configQuery } from "@lib/groq";
import GetImage from "@utils/getImage";
import PostList from "@components/postlist";
import { useSearchContext } from "context/searchContext";
import Image from "next/image";
import { PhotographIcon } from "@heroicons/react/outline";
import CategoryLabel from "@components/blog/category";
import Link from "next/link";
import { format, parseISO } from "date-fns";

export default function Post(props) {
  const { postdata, siteconfig, preview } = props;
  const { searchQuery } = useSearchContext()

  const router = useRouter();
  //console.log(router.query.category);
  //
  const { data: posts } = usePreviewSubscription(postquery, {
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const mainPost = posts.find(post => post.featured)

  const imageProps = posts[0]?.mainImage
    ? GetImage(posts[0].mainImage)
    : null;

  const AuthorimageProps = mainPost?.author?.image
    ? GetImage(mainPost.author.image)
    : null;

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });
  //console.log(posts);
  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;
    
  return (
    <>
      {posts && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: ogimage,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Stablo"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          
            { searchQuery == '' ?
              <>
                { mainPost && 
                  <Link href={`/post/${mainPost.slug.current}`}>
                    <div className="md:flex flex-col md:flex-row cursor-pointer group hidden">
                        <div className="relative aspect-video md:aspect-auto md:h-[70vh] md:w-[60vw] cursor-pointer">
                          {imageProps ? (
                            <Image
                              src={imageProps.src}
                              loader={imageProps.loader}
                              blurDataURL={imageProps.blurDataURL}
                              alt={posts[0].mainImage.alt || "Thumbnail"}
                              placeholder="blur"
                              sizes="100vw"
                              //sizes="(max-width: 640px) 90vw, 480px"
                              layout="fill"
                              objectFit="cover"
                              priority={true}
                              className="transition-all rounded-r-md"
                            />
                          ) : (
                            <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                              <PhotographIcon />
                            </span>
                        )}
                        </div>
                      <div className="md:h-[70vh] md:w-[40vw] ml-12 flex flex-col justify-center">
                      <CategoryLabel categories={mainPost.categories} />
                      <h2 className="mt-2 text-2xl font-semibold tracking-normal text-brand-primary dark:text-white">
                        <Link href={`/post/${mainPost.slug.current}`}>
                          <span
                            className="     bg-gradient-to-r from-green-200 to-green-100 dark:from-green-800 dark:to-green-900
                        bg-[length:0px_10px]
                        bg-left-bottom
                        bg-no-repeat
                        transition-[background-size]
                        duration-500
                        cursor-pointer
                        hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
                            {mainPost.title}
                          </span>
                        </Link>
                      </h2>

                      <div className="hidden">
                        {mainPost.excerpt && (
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                            <Link href={`/post/${mainPost.slug.current}`}>
                              {mainPost.excerpt}
                            </Link>
                          </p>
                        )}
                      </div>

                      <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0 w-5 h-5">
                            {mainPost.author.image && (
                              <Image
                                src={AuthorimageProps.src}
                                blurDataURL={AuthorimageProps.blurDataURL}
                                loader={AuthorimageProps.loader}
                                objectFit="cover"
                                layout="fill"
                                alt={mainPost?.author?.name}
                                placeholder="blur"
                                sizes="30px"
                                className="rounded-full"
                              />
                            )}
                          </div>
                          <span className="text-sm">{mainPost.author.name}</span>
                        </div>
                        <span className="text-xs text-gray-300 dark:text-gray-600">
                          &bull;
                        </span>
                        <time
                          className="text-md"
                          dateTime={mainPost?.publishedAt || mainPost._createdAt}>
                          {format(
                            parseISO(mainPost?.publishedAt || mainPost._createdAt),
                            "MMMM dd, yyyy"
                          )}
                        </time>
                      </div>
                      </div>
                    </div>
                  </Link>
                }
                <Container>
                { mainPost &&
                  <div className="mb-8 md:hidden">
                    <PostList
                      key={mainPost._id}
                      post={mainPost}
                      aspect="landscape"
                    />
                  </div>
                }
                <div className="flex justify-center items-center mb-8">
                  <h1 className="text-2xl"><span className="font-semibold">Our</span> Featured</h1>
                </div>
                <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
                  {posts.filter(post => post.featured).slice(1,3).map(post => (
                    <PostList
                      key={post._id}
                      post={post}
                      aspect="landscape"
                      preloadImage={true}
                    />
                  ))}
                </div>
                <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
                  {posts.filter(post => post.featured).slice(3).map(post => (
                    <PostList
                      key={post._id}
                      post={post}
                      aspect="landscape"
                    />
                  ))}
                </div>
                <div className="flex justify-center items-center mb-8 mt-12">
                  <h1 className="text-2xl"><span className="font-semibold">Our</span> Latest</h1>
                </div>
                <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
                  {posts.filter(post => !post.featured).map(post => (
                    <PostList
                      key={post._id}
                      post={post}
                      aspect="landscape"
                    />
                  ))}
                </div>
                { mainPost && 
                  <div className="flex md:hidden">
                    <PostList
                      key={mainPost._id}
                      post={mainPost}
                      aspect="landscape"
                    />
                  </div>
                }
                </Container>
              </> :
              <Container>
              <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
                {posts
                  .filter((post) => {
                    const searchTerms = searchQuery.split(' ')
                    for (let i = 0; i < searchTerms.length; i++) {
                      if ( post.title.toLowerCase().includes(searchTerms[i].toLowerCase()) )
                        return true
                    }
                  })
                  .map(post => (
                    <PostList
                      key={post._id}
                      post={post}
                      aspect="landscape"
                    />
                ))}               
            </div>
            </Container>
            }
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(postquery);
  const config = await getClient(preview).fetch(configQuery);

  // const categories = (await client.fetch(catquery)) || null;

  return {
    props: {
      postdata: post,
      // categories: categories,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}

