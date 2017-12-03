import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import _ from 'lodash';

const url =
  'http://www.cbioportal.org/api/molecular-profiles/gbm_tcga_gistic/molecular-data?sampleListId=gbm_tcga_cna&entrezGeneId=1956&projection=SUMMARY';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
  }

  componentWillMount() {
    this.fetchDataList();
  }

  fetchDataList() {
    let limit = 20;
    $.ajax({
      url: url,
      dataType: 'json',
      method: 'get',
      data: 'limit=' + limit,
      async: true,
      cache: false,
      success: function(data) {
        let dataList = this.state.data.concat(data);
        this.setState({
          loading: false,
          data: dataList,
          offset: this.state.data.length - 1,
        });
      }.bind(this),
      error: function(xhr, status, err) {
        //  console.error(url, status, err.toString());
      },
    });
  }

  displayResults() {
    let results = this.state.data;
    if (this.state.loading) {
      return <span>Loading...</span>;
    } else {
      return (
        <div>{results.map(data => <p>{`Name: ${data.entrezGeneId}`}</p>)}</div>
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
        <div className="data">{this.displayResults()}</div>
      </div>
    );
  }
}

export default App;
