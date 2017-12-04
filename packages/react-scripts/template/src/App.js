import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import { Input } from './Input';
import { DataBar } from './DataBar';

// TODO:
// 3) Style length of results in graph

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSets: [{}],
      inputs: [{}],
    };
    this.inputSearch = this.inputSearch.bind(this);
    this.addInput = this.addInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  clearState() {
    this.setState({
      dataSets: [{}],
      inputs: [{}],
    });
  }

  fetchGeneResults(url, inputIndex) {
    const { dataSets } = this.state;
    let newData = dataSets;

    $.ajax({
      url: url,
      dataType: 'json',
      method: 'get',
      data: 'limit=' + 577,
      async: true,
      cache: false,
      success: function(data) {
        const display = data.filter(d => d.value === '2').length;
        newData[inputIndex] = {
          display,
          total: data.length,
        };
        this.setState({
          dataSets: newData,
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      },
    });
  }

  inputSearch(searchValue, inputIndex) {
    const { inputs, dataSets } = this.state;
    const fireSearchValue = searchValue.length === 4 ? true : false;
    const url = `http://www.cbioportal.org/api/molecular-profiles/gbm_tcga_gistic/molecular-data?sampleListId=gbm_tcga_cna&entrezGeneId=${searchValue}&projection=SUMMARY`;

    const newInputs = inputs.map((input, index) => {
      if (index === inputIndex) {
        return { value: searchValue };
      }
      return input;
    });

    this.setState({
      loading: false,
      inputs: newInputs,
    });

    if (fireSearchValue) {
      this.fetchGeneResults(url, inputIndex);
    }
  }

  addInput() {
    const { inputs, dataSets } = this.state;
    const newInputs = inputs.concat({});
    const newDataSets = dataSets.concat({});

    this.setState({
      inputs: newInputs,
      dataSets: newDataSets,
    });
  }

  removeInput(inputIndex) {
    const { inputs, dataSets } = this.state;

    const removeInput = inputs.filter((i, index) => {
      if (index !== inputIndex) {
        return i;
      }
    });

    const removeDataSets = dataSets.filter((i, index) => {
      if (index !== inputIndex) {
        return i;
      }
    });

    this.setState({
      inputs: removeInput,
      dataSets: removeDataSets,
    });
  }

  renderInputs() {
    const { inputs } = this.state;
    return inputs.map((i, index) => {
      const showAdd = index === inputs.length - 1 ? true : false;
      const shouldClear = index === 0 && inputs.length === 1 ? true : false;
      return (
        <Input
          {...i}
          addInput={this.addInput}
          index={index}
          clearState={this.clearState}
          onChange={(value, inputIndex) => {
            this.inputSearch(value, inputIndex);
          }}
          removeInput={this.removeInput}
          shouldClear={shouldClear}
          showAdd={showAdd}
        />
      );
    });
  }

  displayResults() {
    const { dataSets, loading } = this.state;
    const graphWidth = 1000;
    const graphHeight = 1000;

    if (loading) {
      return <span>Please Enter a Gene ID</span>;
    }
    if (dataSets.length) {
      return (
        <div
          style={{
            width: `${graphWidth}px`,
            height: `${graphHeight}px`,
            background: '#BBB',
          }}
        >
          {dataSets
            .filter(d => {
              if (d.display > 0) {
                return d;
              }
            })
            .map(dataSet => <DataBar graphWidth={graphWidth} {...dataSet} />)}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Glioblastoma</h1>
        </header>
        {this.renderInputs()}
        <div className="data">{this.displayResults()}</div>
      </div>
    );
  }
}

export default App;
