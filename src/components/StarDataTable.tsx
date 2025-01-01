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
import { RootState } from "../Store"
import { updateStars, updateStarCount, setError, setSelectedStarInfo } from "./slices/StarDataSlice"
import { CheckCircleIcon} from "@chakra-ui/icons"
import { updateLatitude, updateLongitude } from "./slices/ObserverSlice.ts";
import { SearchIcon } from '@chakra-ui/icons';
import StarInfo from './StarInfo'


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
      cell: info => <Text fontSize="xs">{info.renderValue()}°</Text>,
      footer: 'Alt.',
      enableMultiSort: true
    }),
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => <Text fontSize="xs">{info.renderValue()}</Text>,
      footer: info => info.column.id,
      enableMultiSort: true
    }),
    columnHelper.accessor('const', {
      header: () => 'Const.',
      cell: info => <Text fontSize="xs">{info.renderValue()}</Text>,
      footer: 'Const.',
      enableMultiSort: true,
    }),
    columnHelper.accessor('ra', {
      header: () => <span>RA</span>,
      cell: info => <Text fontSize="xs">{info.renderValue()}°</Text>,
      footer: info => <Text fontSize="xs">{info.column.id}</Text>,
      enableMultiSort: true,
    }),
    columnHelper.accessor('dec', {
      header: 'Dec',
      cell: info => <Text fontSize="xs">{info.renderValue()}°</Text>,
      footer: info => <Text fontSize="xs">{info.column.id}</Text>,
      enableMultiSort: true,
    }),
    columnHelper.accessor('varType', {
      header: 'Var. Type',
      footer: 'Var. Type',
      cell: info => <Text fontSize="xs">{info.renderValue()}</Text>,
      enableMultiSort: true,
    }),
    columnHelper.accessor(row => `${row.maxMag} ${row.maxPass}`, {
      header: 'Max',
      cell: info => <Text fontSize="xs">{info.renderValue()}</Text>,
      footer: info => <Text fontSize="xs">{info.column.id}</Text>,
      enableMultiSort: true,
    }),
    columnHelper.accessor(row => `${row.minMag} ${row.minPass}`, {
      header: 'Min',
      cell: info => <Text fontSize="xs">{info.renderValue()}</Text>,
      footer: info => <Text fontSize="xs">{info.column.id}</Text>,
      enableMultiSort: true,
    }),
    columnHelper.accessor('period', {
      header: 'Period (days)',
      cell: info => <Text fontSize="xs">{info.renderValue()}</Text>,
      footer: info => <Text fontSize="xs">{info.column.id}</Text>,
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
    const [pageIndex, setPageIndex] = useState(0);
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
    const getData = async (page: number, size: number) => {
      setLoading(true);
      try {
        const res = await getStars(page + 1, size, lat || 0, long || 0, 0, jd);
        if (res.status === 200) {
          dispatch(updateStars(res.data[0]));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(setError(error instanceof Error ? error.message : String(error)));
      } finally {
        setLoading(false);
      }
    };

    const getStarTotal = async () => {
      try {
        const res = await getStarCount();
        if (res.status === 200) {
          dispatch(updateStarCount(res.data));
        }
      } catch (error) {
        console.error("Error fetching star count:", error);
        dispatch(setError(error instanceof Error ? error.message : String(error)));
      }
    };

    // Fetch star count separately
    useEffect(() => {
      getStarTotal();
      getData(pageIndex, pageSize);
    }, []); // Only on mount

    const data:Star[] = stars;//{ nodes: states.stars };
    //const [data, setData] = React.useState(() => [...defaultData])

    // Define pageSize state


    // Calculate pageCount
    const pageCount = Math.ceil(starCount / pageSize);

    const table = useReactTable({
      data: stars,
      columns,
      enableMultiSort: true,
      state: { 
        sorting,
        pagination: {
          pageIndex,
          pageSize,
        }
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      manualPagination: true,
      pageCount: Math.ceil(starCount / pageSize),
      onPaginationChange: (updater) => {
        if (typeof updater === 'function') {
          const newState = updater({
            pageIndex,
            pageSize,
          });
          setPageIndex(newState.pageIndex);
          getData(newState.pageIndex, newState.pageSize);
        }
      },
    });

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
    const handleStarClick = (star: Star) => {
      dispatch(setSelectedStarInfo({
        name: star.name,
        auid: star.auid,
        ra: star.ra ? parseFloat(star.ra) : undefined,
        dec: star.dec ? parseFloat(star.dec) : undefined,
        varType: star.varType,
        maxMag: star.maxMag ? parseFloat(star.maxMag) : undefined,
        minMag: star.minMag ? parseFloat(star.minMag) : undefined,
        period: star.period ? parseFloat(star.period) : undefined
      }));
    };

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

            <Table size='sm' maxWidth={"100%"} style={{fontSize: "sm"}}>
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
                      <Td key={cell.id} onClick={() => handleStarClick(cell.row.original)}>
                        
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
            
            <Center>
              <HStack paddingTop={2} paddingBottom={2}>    
                <Button
                  onClick={() => table.setPageIndex(0)}
                  disabled={pageIndex === 0}
                  size="xs"
                >
                  {'<<'}
                </Button>
                <Button
                  onClick={() => {
                    const prevPage = pageIndex - 1;
                    if (prevPage >= 0) {
                      table.setPageIndex(prevPage);
                    }
                  }}
                  disabled={pageIndex === 0}
                  size="xs"
                >
                  {'<'}
                </Button>

                <Text fontSize="xs">Page </Text>
                <Text fontSize="xs">
                  <strong style={{fontSize: "xs"}}>
                    {pageIndex + 1} of {Math.ceil(starCount / pageSize)}
                  </strong>
                </Text>
                <Button
                  onClick={() => {
                    const nextPage = pageIndex + 1;
                    if (nextPage < Math.ceil(starCount / pageSize)) {
                      table.setPageIndex(nextPage);
                    }
                  }}
                  disabled={pageIndex >= Math.ceil(starCount / pageSize) - 1}
                  size="xs"
                >
                  {'>'}
                </Button>
                <Button
                  onClick={() => table.setPageIndex(Math.ceil(starCount / pageSize) - 1)}
                  disabled={pageIndex >= Math.ceil(starCount / pageSize) - 1}
                  size="xs"
                >
                  {'>>'}
                </Button>

                <Text fontSize="xs">Go to page:</Text>
                
                <Input
                  width={20}
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    table.setPageIndex(page);
                  }}
                  className="border p-1 rounded w-16"
                  size="xs"
                />
        

              
                <Select
                  width={40}
                  value={pageSize}
                  onChange={e => {
                    const newPageSize = Number(e.target.value);
                    setPageSize(newPageSize);
                    table.setPageSize(newPageSize); // Ensure the table updates the page size
                  }}
                  size="xs"
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


