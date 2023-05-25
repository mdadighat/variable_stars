import * as React from "react"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { Td, useToast } from '@chakra-ui/react'
import { useContext, useEffect, useState } from "react"
import { Context } from "../Store"
import { Spinner, Table, Tbody, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import  {getAPI}  from "./API.tsx"

type Star = {
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

/*const defaultData: Star[] = [
    {
      auid: '000-000-000',
      name: 'RR Lyr',
      ra: "24h 24m 24s",
      dec: "10' 10'' 10s",
      type: 'star type',
    },
    {
        auid: '000-000-000',
        name: 'RR Lyr',
        ra: "24h 24m 24s",
        dec: "10' 10'' 10s",
        type: 'star type',
      },
      {
        auid: '000-000-000',
        name: 'RR Lyr',
        ra: "24h 24m 24s",
        dec: "10' 10'' 10s",
        type: 'star type',
      },
  ]*/

const columnHelper = createColumnHelper<Star>()

const columns = [
    columnHelper.accessor('auid', {
    header: () => 'AUID',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('const', {
      header: () => 'Const.',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
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
      footer: info => info.column.id,
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

    const toast = useToast();
    
    //const rerender = React.useReducer(() => ({}), {})[1]

    //function below triggers the helper function
    const getData = () => getAPI("","").then(
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
            getCoreRowModel: getCoreRowModel(),
          })
      

      if (loading) {
          return (<div><Spinner thickness='4px'
          speed='0.5s'
          emptyColor='gray.400'
          size='xl' /></div>);
      }
      

      return ( 
        <div className="p-2">
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
                <Td key={cell.id} onClick={() => toast({
                  title: cell.row.getAllCells()[1].getValue() as string,
                  description: "Star was clicked.",
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                })}>
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
    
    </div>
        );
      //if (states.error || !states.stars) {
      //  return <p>Something went wrong: <span>{states.error}</span></p>;
    }


