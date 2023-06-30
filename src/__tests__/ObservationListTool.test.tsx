import { render, screen, waitFor } from '@testing-library/react'
import ObservationListTool from '../components/ObservationListTool';

test("ObservationListTool renders without errors", async () => {
    render(<ObservationListTool />);
    await waitFor(() => {
        expect(screen.getByTestId("targetList")).toBeInTheDocument();
        expect(screen.getByTestId("targetPlan")).toBeInTheDocument();
    });
});