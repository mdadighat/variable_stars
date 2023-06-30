import { render, screen } from '@testing-library/react'
import StarInfo from '../components/StarInfo';

test("StarInfo title renders successfully", () => {
    render(<StarInfo isOpen={true} onClose={undefined} children={undefined}/>);

    const element = screen.getByText(/T Tau/);

    expect(element).toBeInTheDocument();
})