import { render, screen, fireEvent } from '@testing-library/react'
import { signIn, useSession } from "next-auth/client";
import {  useRouter } from "next/dist/client/router";

import { mocked } from "ts-jest/utils";

import SubscribeButton from '.';

jest.mock('next-auth/client')
jest.mock('next/dist/client/router')

describe("SignInButton component", () => {

  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />);
    expect(screen.getByText("Subscribe Now")).toBeInTheDocument();
  });

  it("redirects users to sign in when not authenticated", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    const signInMock = mocked(signIn)
    
    render(<SubscribeButton />);

    const subscribebutton = screen.getByText("Subscribe Now");
    fireEvent.click(subscribebutton);

    expect(signInMock).toHaveBeenCalled();

  })

  it("redirect to post when user already has a subscription", () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([{ 
        user: { name: "John Doe" , email: "douglas@gmail.com"},
        activeSubscription : "fake-active-subscription",
        expires: "fake-expires"
    }, true])

    useRouterMocked.mockReturnValueOnce({
        push : pushMock
    } as any)

    render(<SubscribeButton />);

    const subscribebutton = screen.getByText("Subscribe Now");

    fireEvent.click(subscribebutton);

    expect(pushMock).toHaveBeenCalled();
  })

});