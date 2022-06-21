import { render, screen } from '@testing-library/react'
import Home from '../../pages'

jest.mock('next/dist/client/router')
jest.mock('next-auth/client', () => {
    return {
        useSession () {
            return [null, false]
        }
    }
})


describe("Home page", () => {
    it("renders correctly", () =>{
        render(<Home product={{ priceId: "fake-price-id", amount: "R$ 100,00" }}  />)

        expect(screen.getByText("R$ 100,00")).toBeInTheDocument();
    })
})