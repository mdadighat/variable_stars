import React from "react";
import { Container, Flex } from '@chakra-ui/react'
import { Column, Table, SortDirection, AutoSizer, InfiniteLoader } from "react-virtualized";
import "./index.css";
import "react-virtualized/styles.css";
import _ from "lodash";

// Table data as a array of objects
let list = [];


export class StarDataTable extends React.Component {
  constructor(props) {
    super(props);
    list = this.props.starsData;
    
    const sortBy = "name";
    const sortDirection = SortDirection.ASC;
    const sortedList = this._sortList({ sortBy, sortDirection });

    this.state = {
      sortBy,
      sortDirection,
      sortedList,
    };
  }

  onClick = ({ event, index, rowData }) => {
    console.log(rowData);
  
  };

  render() {
    if(this.props.starsData.stars && list.length === 0){
      this.props.starsData.stars.map(star => {
        list.push(star);
      })
      list = list[0]
    }

    

    this.state.sortedList = this._sortList( this.state.sortBy, this.state.sortDirection );
    return (
      <Flex as="main" role="main" direction="column" flex="1" py="6" >
      <Container flex="1">
        <div style={{ height: 800 }}>
          <AutoSizer>
            {({ height, width }) => (
              <Table
                width={width}
                height={height}
                headerHeight={70}
                rowHeight={40}
                sort={this._sort}
                sortBy={this.state.sortBy}
                sortDirection={this.state.sortDirection}
                onRowClick={this.onClick}//{({index, rowData}) => this.onClick(index, rowData)}
                //rowRenderer={this.renderRow}
                rowCount={this.state.sortedList.length}
                rowGetter={({ index }) => this.state.sortedList[index]}
                //noRowsRenderer={() => <Loader/>}
              >
                <Column label="AUID" dataKey="auid" width={150} />
                <Column label="Name" dataKey="name" width={250} />
                <Column label="Const." dataKey="const" width={100} />
                <Column label="RA" dataKey="ra" width={175} />
                <Column label="Dec" dataKey="dec" width={175} />
                <Column label="Type" dataKey="varType" width={200} />
              </Table>
              )}
            </AutoSizer>
          </div>
        </Container>
        </Flex>
    );
  }

renderRow({ index, key, style }) {
  return (
    <div key={key} style={style} className="row">
      <div className="content">
        <div>{list[index].name}</div>
      </div>
    </div>
  );
}

  _sortList = ({ sortBy, sortDirection }) => {
    let newList = _.sortBy(list, list.name, [sortBy]);
    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }
    return newList;
  };

  _sort = ({ sortBy, sortDirection }) => {
    const sortedList = this._sortList({ sortBy, sortDirection });
    this.setState({ sortBy, sortDirection, sortedList });
  };


}

// Render your table
//ReactDOM.render(<Test />, document.getElementById("root"));
