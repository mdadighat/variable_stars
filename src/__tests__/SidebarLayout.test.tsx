import {  render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import SidebarLayout from '../components/SidebarLayout';
import { ThemeProvider, theme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

test("SidebarLayout renders successfully", () => {
    render(<ThemeProvider theme={theme}>
            <BrowserRouter>
                <SidebarLayout children={undefined}/>
            </BrowserRouter>
            </ThemeProvider>);

    const element = screen.getByText(/variable stars/i);
    
    expect(element).toBeInTheDocument();
})


test("Side navigation renders successfully", () => {
    render(<ThemeProvider theme={theme}>
            <BrowserRouter>
                <SidebarLayout children={undefined}/>
            </BrowserRouter>
            </ThemeProvider>);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/observing/i)).toBeInTheDocument();
    expect(screen.getByText(/learn more/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
})

test("Top toolbar renders successfully", () => {
    render(<ThemeProvider theme={theme}>
        <BrowserRouter>
            <SidebarLayout children={undefined}/>
        </BrowserRouter>
        </ThemeProvider>);

    expect(screen.getByRole("combobox")).toHaveDisplayValue("What's up now?");
    const inputElement = screen.getByPlaceholderText("Latitude, Longitude");
    expect(inputElement).toHaveAttribute("placeholder", "Latitude, Longitude");

    const searchElement = screen.getByPlaceholderText("Search");
    expect(searchElement).toHaveAttribute("placeholder", "Search");
})

test("Search autocomplete does something", async () => {
    render(<ThemeProvider theme={theme}>
        <BrowserRouter>
            <SidebarLayout children={undefined}/>
        </BrowserRouter>
        </ThemeProvider>);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'a' } })

    expect(input).toHaveValue('a')

    //To Do: add when search autocomplete is implemented
    //fireEvent.keyDown(search, { key: 'ArrowDown' })
    //fireEvent.keyDown(search, { key: 'Enter' })

})