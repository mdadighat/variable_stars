import { render, screen, waitFor } from '@testing-library/react'
import StarDataTable from '../components/StarDataTable';



test("StarDataTable renders without errors", async () => {
    render(<StarDataTable />);
    await waitFor(() => {
        expect(screen.getByRole("table")).toBeInTheDocument();
    });
});

test("StarDataTable has all columns", async () => {
    render(<StarDataTable />);

    await waitFor(() => {
        //Check for two since the column headers are repeated in the footer
        const nameHeaders = screen.getAllByRole("columnheader", { name: /name/i });
        expect(nameHeaders.length).toBe(2);

        const altHeaders = screen.getAllByRole("columnheader", { name: /alt/i });
        expect(altHeaders.length).toBe(2);
        
        const constHeaders = screen.getAllByRole("columnheader", { name: /const/i });
        expect(constHeaders.length).toBe(2);

        const raHeaders = screen.getAllByRole("columnheader", { name: /ra/i });
        expect(raHeaders.length).toBe(2);

        const decHeaders = screen.getAllByRole("columnheader", { name: /dec/i });
        expect(decHeaders.length).toBe(2);

        const varTypeHeaders = screen.getAllByRole("columnheader", { name: /var. type/i });
        expect(varTypeHeaders.length).toBe(2);

        const maxHeaders = screen.getAllByRole("columnheader", { name: /max/i });
        expect(maxHeaders.length).toBe(2);

        const minHeaders = screen.getAllByRole("columnheader", { name: /min/i });
        expect(minHeaders.length).toBe(2);

        const periodHeaders = screen.getAllByRole("columnheader", { name: /period/i });
        expect(periodHeaders.length).toBe(2);
    });
})

test("Overlay does not render on load", async () => {
    render(<StarDataTable />);

    await waitFor(() => {
        const overlay = screen.queryByTestId("overlay");
        expect(overlay).not.toBeInTheDocument();
    });
})
