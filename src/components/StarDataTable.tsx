import React, { ChangeEvent } from "react";
import {
  SortingState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    TableOptions
  } from '@tanstack/react-table'
import { Box, Button, Center, Flex, HStack, Input, Select, Skeleton, Stack, Td, background, useColorModeValue, InputGroup, InputLeftElement, chakra, useToast } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Table, Tbody, Tfoot, Th, Thead, Tr, Text } from "@chakra-ui/react"
import  {getStarCount, getStars}  from "./API.tsx"
import StarInfo from "./StarInfo.tsx"
import { RootState } from "../Store"
import { updateStars, updateStarCount, setError } from "./slices/StarDataSlice"
import { CheckCircleIcon} from "@chakra-ui/icons"
import { updateLatitude, updateLongitude } from "./slices/ObserverSlice.ts";
import { SearchIcon } from '@chakra-ui/icons';


type Star = {
    altitude: string
    auid: string
    name: string
    const: string
    ra: string
    dec: string
    varType: string
    maxMag: string
    maxPass: string
    minMag: string
    minPass: string
    period: string
  }

const columnHelper = createColumnHelper<Star>()

const columns = [
  columnHelper.accessor('auid', {
    header: () => 'AUID',
      cell: props => {
        return props.renderValue() == null || props.renderValue()=="" ? (
          <CheckCircleIcon color={"gray.400"} />
        ) : (
          <CheckCircleIcon color={"green.500"}/>
        );
      }
      ,
      footer: 'AUID',
    }),
  columnHelper.accessor('altitude', {
    header: () => 'Alt.',
      cell: info => info.renderValue() + '°',
      footer: 'Alt.',
      enableMultiSort: true
    }),
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
      enableMultiSort: true
    }),
    columnHelper.accessor('const', {
      header: () => 'Const.',
      cell: info => info.renderValue(),
      footer: 'Const.',
      enableMultiSort: true,
    }),
    columnHelper.accessor('ra', {
      header: () => <span>RA</span>,
      footer: info => info.column.id,
      enableMultiSort: true,
    }),
    columnHelper.accessor('dec', {
      header: 'Dec',
      footer: info => info.column.id,
      enableMultiSort: true,
    }),
    columnHelper.accessor('varType', {
      header: 'Var. Type',
      footer: 'Var. Type',
      enableMultiSort: true,
    }),
    columnHelper.accessor(row => `${row.maxMag} ${row.maxPass}`, {
      header: 'Max',
      footer: info => info.column.id,
      enableMultiSort: true,
    }),
    columnHelper.accessor(row => `${row.minMag} ${row.minPass}`, {
      header: 'Min',
      footer: info => info.column.id,
      enableMultiSort: true,
    }),
    columnHelper.accessor('period', {
      header: 'Period',
      footer: info => info.column.id,
      enableMultiSort: true,
    }),

  ]

export default function StarDataTable() {
  
    const initialSelectedStar: Star = {
      altitude: '',
      auid: '',
      name: '',
      const: '',
      ra: '',
      dec: '',
      varType: '',
      maxMag: '',
      maxPass: '',
      minMag: '',
      minPass: '',
      period: '',
    };
    
    const [loading, setLoading] = useState(false);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStar, setSelectedStar] = useState(initialSelectedStar);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const stars = useSelector((state: RootState) => state.starData.stars)
    const starCount = useSelector((state: RootState) => state.starData.starCount)
    const lat = useSelector((state: RootState) => state.observer.latitude)
    const long = useSelector((state: RootState) => state.observer.longitude)
    const dispatch = useDispatch()

    const toggleOverlay = () => {
      setIsOpen(!isOpen);
    };
    const toast = useToast();
    //const rerender = React.useReducer(() => ({}), {})[1]
    const now = new Date();
    const jd = (now.getTime() / 86400000) + 2440587.5;  
    //function below triggers the helper function
    const getData = () => getStars(currentPage, 50, lat || 0, long || 0, 0, jd).then(
      (res) => {
        if (res.status === 200) {
          const response = res.data;
          console.log(response);
          dispatch(updateStars(response[0]));
          console.log(data);
        } else {
          console.log(res);
        }
      }
    ).catch((error) => {
      if (error.response) {
        dispatch(setError(error));
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
  }).finally(()=> {
    setLoading(false);
  })

  // Function to handle page change
  const handlePageChange = (newPage: React.SetStateAction<number>) => {
    setCurrentPage(newPage);
    getData();
  };


  const getStarTotal = () => getStarCount().then(
    (res) => {
      if(res.status === 200){
        const response = res.data;
        console.log(response);
        //setStarsData( res[0] )
        dispatch(updateStarCount(response));

        //setData(res.data)
        console.log(data); 
      } else {
        console.log(res);
      }
    }
  ).catch((error) => {
    if (error.response) {
      dispatch(setError(error));
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
})
    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();



    //this runs the getData trigger function as useEffect
    useEffect(()=>{
      setLoading(true);
      getStarTotal();
      getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    const data:Star[] = stars;//{ nodes: states.stars };
    // const [data, setData] = React.useState(() => [...defaultData])

    // Define pageSize state


    // Calculate pageCount
    const pageCount = Math.ceil(starCount / pageSize);

    const table = useReactTable({
      data,
      columns,
      enableMultiSort: true,
      state: { sorting },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      pageCount: pageCount,
      pageSize: pageSize,
      pageIndex: currentPage,
    } as TableOptions<Star>)

    // Update pageCount when data or pageSize changes
    useEffect(() => {
      const pageCount = Math.ceil(starCount / pageSize);
      table.setPageCount(pageCount);
      table.setPageSize(pageSize);
    }, [data, pageSize, table]);

    const hoverColor = useColorModeValue('gray.200', 'gray.700')

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
      toast({
        title: "Search change",
        description: event.target.value,
        status: 'success',
        duration: 4000,
        isClosable: true
      });
    }
  
    function handleSearchSubmit(event: ChangeEvent<HTMLInputElement>): void {
      toast({
        title: "Search submit",
        description: event.target.value,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }

  if (loading) {
    return (<div>
      <Stack>
        <Skeleton height='50px' />
        <Skeleton height='50px' />
        <Skeleton height='50px' />
        <Skeleton height='50px' />
        <Skeleton height='50px' />
        <Skeleton height='50px' />
      </Stack>
    </div>);
  }

  return (
    <Box p={4}>
      <Center>
        <StarInfo isOpen={isOpen} onClose={toggleOverlay} starData={selectedStar} data-testid="overlay" />
      </Center>
      <Box>
        <HStack spacing={4} mb={2} mt={0}>
          <chakra.div width={{ base: "auto", sm: "auto", md: "auto" }}>
            <Select
              borderColor='blue.900'
              variant='filled'
              placeholder="What's up now?"
              size="sm"
              sx={{
                minWidth: "max-content",
                width: "auto",
                whiteSpace: "normal"
              }}
            >
              <option value="tenStarN">10 Star Tutorial - N</option>
              <option value="tenStarS">10 Star Tutorial - S</option>
              <option value="yso">Young Stellar Objects</option>
            </Select>
          </chakra.div>

          <InputGroup maxW={{ base: "100px", sm: "120px", md: "150px" }}>
            <InputLeftElement pointerEvents='none' h="full">
              <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="tableSearch"
              data-testid="tableSearch"
              onChange={handleSearchChange}
              size='sm'
            />
          </InputGroup>
        </HStack>

            <Table size='sm' maxWidth={"100%"}>
              <Thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <Th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                          )}
                          {{
                              asc: <span>▲</span>,
                              desc: <span>▼</span>,
                           }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map(row => (
                  <Tr key={row.id} _hover={{ backgroundColor: hoverColor }}>
                    {row.getVisibleCells().map(cell => (
                      <Td key={cell.id} onClick={
                        () => {
                          setSelectedStar(cell.row.original);
                          toggleOverlay();
                        }
                      }>
                        
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                {table.getFooterGroups().map(footerGroup => (
                  <Tr key={footerGroup.id}>
                    {footerGroup.headers.map(header => (
                      <Th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
                            )}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Tfoot>
            </Table>
            
            <Center overflowX={"scroll"}>
              <HStack paddingTop={4} paddingBottom={4}>    
                <Button
                  zIndex={0}
                  border={'1px'}
                  borderRadius='10px'
                  background={"blue.800"}
                  color={"white"}
                  _hover={{ bg: 'gray.600' }}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {'<<'}
                </Button>
                <Button
                  zIndex={0}
                  border={'1px'}
                  borderRadius='10px'
                  background={"blue.800"}
                  color={"white"}
                  _hover={{ bg: 'gray.600' }}
                  onClick={() => {
                    table.setPageIndex(table.getState().pagination.pageIndex - 1);
                    // Update currentPage if you're using it
                    setCurrentPage(table.getState().pagination.pageIndex - 1);
                  }}
                  disabled={!table.getCanPreviousPage()}
                >
                  {'<'}
                </Button>

                <Text>Page</Text>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </strong>

                <Button
                  border={'1px'}
                  borderRadius='10px'
                  background={"blue.800"}
                  color={"white"}
                  _hover={{ bg: 'gray.600' }}
                  onClick={() => {
                    table.setPageIndex(table.getState().pagination.pageIndex + 1);
                    // Update currentPage if you're using it
                    setCurrentPage(table.getState().pagination.pageIndex + 1);
                  }}
                  disabled={!table.getCanNextPage()}
                >
                  {'>'}
                </Button>
                <Button
                  border={'1px'}
                  borderRadius='10px'
                  background={"blue.800"}
                  color={"white"}
                  _hover={{ bg: 'gray.600' }}
                  onClick={() => {
                    table.setPageIndex(table.getPageCount() - 1);
                    // Update currentPage if you're using it
                    setCurrentPage(table.getPageCount() - 1);
                  }}
                  disabled={!table.getCanNextPage()}
                >
                  {'>>'}
                </Button>

                <Text>Go to page:</Text>
                
                <Input
                  width={20}
                  type="number"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    table.setPageIndex(page);
                    // Update currentPage if you're using it
                    setCurrentPage(page);
                  }}
                  className="border p-1 rounded w-16"
                />
        

              
                <Select
                  width={40}
                  value={pageSize}
                  onChange={e => {
                    const newPageSize = Number(e.target.value);
                    setPageSize(newPageSize);
                    table.setPageSize(newPageSize); // Ensure the table updates the page size
                  }}
                >
                  {[10, 25, 50, 100, 200].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </Select>
              </HStack>
            </Center> 
          </Box>
        </Box>
      );
    }

