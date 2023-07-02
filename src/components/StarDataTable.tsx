import * as React from "react"
import {
  SortingState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { Button, Center, Flex, HStack, Input, Select, Skeleton, Stack, Td } from '@chakra-ui/react'
import { useContext, useEffect, useState } from "react"
import { Context } from "../Store"
import { Table, Tbody, Tfoot, Th, Thead, Tr, Text } from "@chakra-ui/react"
import  {getAPI}  from "./API.tsx"
import StarInfo from "./StarInfo.tsx"

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
  columnHelper.accessor('altitude', {
    header: () => 'Alt.',
      cell: info => "42.35°",
      footer: 'Alt.',
    }),
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('const', {
      header: () => 'Const.',
      cell: info => info.renderValue(),
      footer: 'Const.',
    }),
    columnHelper.accessor('ra', {
      header: () => <span>RA</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('dec', {
      header: 'Dec',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('varType', {
      header: 'Var. Type',
      footer: 'Var. Type',
    }),
    columnHelper.accessor(row => `${row.maxMag} ${row.maxPass}`, {
      header: 'Max',
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => `${row.minMag} ${row.minPass}`, {
      header: 'Min',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('period', {
      header: 'Period',
      footer: info => info.column.id,
    }),

  ]

export default function StarDataTable() {
    const [loading, setLoading] = useState(false);
    const [states, dispatch] = useContext(Context);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [isOpen, setIsOpen] = useState(false);

    const toggleOverlay = () => {
      setIsOpen(!isOpen);
    };
    
    //const rerender = React.useReducer(() => ({}), {})[1]

    //function below triggers the helper function
    const getData = () => getAPI(1,50).then(
      (res) => {
        if(res.status === 200){
          const response =res.data
          console.log(response)
          //setStarsData( res[0] )
          dispatch({type: 'SET_STARS', payload: response[0]});

          //setData(res.data)
          console.log(data) 
        }else{
          console.log(res)
        }
    }
    ).catch((error) => {
      if (error.response) {
        dispatch({type: 'SET_ERROR', payload: error});
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
  }).finally(()=> {
    setLoading(false);
  })

        //this runs the getData trigger function as useEffect
    useEffect(()=>{
      setLoading(true);
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

        const data:Star[] = states.stars;//{ nodes: states.stars };
       // const [data, setData] = React.useState(() => [...defaultData])
        const table = useReactTable({
            data,
            columns,
            state: { sorting },
            onSortingChange: setSorting,
            getCoreRowModel: getCoreRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
          })
      

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
        <div className="p-2">
          <Center >
            <StarInfo isOpen={isOpen} onClose={toggleOverlay} data-testid="overlay">
              {/* children <p>Some info</p>*/}
            </StarInfo>
          </Center>
      <Table size='sm' maxWidth={"100%"}>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map(row => (
            <Tr key={row.id} >
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id} onClick={toggleOverlay}>
                  
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
        <HStack paddingTop={4} paddingBottom={4}>    
          <Button
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
            border={'1px'}
            borderRadius='10px'
            background={"blue.800"}
            color={"white"}
            _hover={{ bg: 'gray.600' }}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </Button>
          <Button
            border={'1px'}

            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </Button>
          <Button
            border={'1px'}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </Button>
        
          <Text>Page</Text>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>

          | Go to page:
          
          <Input
            width={20}
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
 
        
          <Select
            width={40}
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </HStack>
      </Center>
    </div>
        );
      //if (states.error || !states.stars) {
      //  return <p>Something went wrong: <span>{states.error}</span></p>;
    }


