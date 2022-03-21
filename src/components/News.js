import React, { Component } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'

export class News extends Component {
    //props types
    static defaultProps={
        country:'in',
        pageSize:8,
        category:'general',
    }
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(){
        super();
        console.log("news Constructer");
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }
    //it is life cycle method
     async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9be99ccba414e9c921f534466869a79&page=1&pageSize=${this.props.pageSize}`;
        //use fetch api
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults})

    }
    handlePrevClick=async()=>{
        console.log("previous");
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9be99ccba414e9c921f534466869a79&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        //use fetch api
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }
     handleNextClick=async ()=>{
        console.log("next");
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        }
        else{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9be99ccba414e9c921f534466869a79&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //use fetch api
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles
        })
    }
    }
  render() {
    return (
      <div className="container my-3">
          <h1 className="text-center">Top News Head Lines</h1>
          <div className="row mb-3">
          {this.state.articles.map((element)=>{
               return <div className="col-md-4"  key ={element.url}>
              <NewsItems title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0,45):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
          })}
              
          </div>
          <div className="contianer d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button"className="btn btn-dark " onClick={this.handlePrevClick}>&larr; Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button"className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
      </div>
    )
  }
}

export default News