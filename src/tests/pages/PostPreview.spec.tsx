import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { mocked } from 'ts-jest/utils'
import PostPreview from '../../pages/posts/preview/[slug]'
import Preview, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { getPrismicClient } from "../../services/prismic"

const post = {
    slug: "my-new-post",
    title: "My new post",
    content: "<p>Post content</p>",
    updatedAt: "April, 22"
}

jest.mock('../../services/prismic')
jest.mock('next-auth/client')
jest.mock('next/dist/client/router')


describe("Posts Preview page", () => {

    it("renders correctly", () =>{
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([null, false])

        render(<Preview post={post}  />)

        expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
        expect(screen.getByText("Post content")).toBeInTheDocument();
        expect(screen.getByText("My new post")).toBeInTheDocument();
        
    })

    it("redirects user to full post when subscribed", async () => {
        const useRouterMocked = mocked(useRouter)
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([{
            activeSubscription: 'fake-active-subscription'
        }, false])

        const pushMock = jest.fn()
        useRouterMocked.mockReturnValueOnce({
            push : pushMock
        } as any)

        render(<PostPreview post={post} />)

        expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
    })

    it("loads initial data", async () => {
        const getPrismicClientMocked = mocked(getPrismicClient);
        getPrismicClientMocked.mockReturnValueOnce({
            getByID: jest.fn().mockResolvedValueOnce({
                id : "my-new-post",
                data: {
                    title: [
                        { type: "heading", text: "My new post" }
                    ],
                    content: [
                        { type: "paragraph", text: "Post content" }
                    ],
                },
                last_publication_date: "04-01-2022"
            })        
        } as any)

        const response = await getStaticProps({ params : { slug : 'my-new-post' } } as any)

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: "my-new-post",
                        title: "My new post",
                        content: "<p>Post content</p>",
                        updatedAt: "01 de abril de 2022"
                    }
                }
            })
        )

    })

    
})