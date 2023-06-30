import { render, screen, waitFor } from '@testing-library/react'
import VisualizationTool from '../components/VisualizationTool';

test("VisualizationTool renders without errors", async () => {
    render(<VisualizationTool />);
    await waitFor(() => {
        expect(screen.getByText("TBD")).toBeInTheDocument();
    });
});