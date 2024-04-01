import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
    
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
    capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
    this.state = {
      // articles: this.articles, wrote this earlier when we had a class variable to be  used
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-News Express `;
  }

  updateNews = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fbe1bf0b6b9d4dce9d9f88aca34ea0ed&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);

  };

  async componentDidMount() {
    // console.log("npm");
    // let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=fbe1bf0b6b9d4dce9d9f88aca34ea0ed&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data=await fetch(url);
    // let parsedData=await data.json();
    // console.log(parsedData);
    // this.setState({articles:parsedData.articles,
    //   totalResults:parsedData.totalResults,
    // loading:false }); //changing state

    this.updateNews();
  }
  // handlePrevious = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };
  // handleNext = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
   this.setState({page:this.state.page+1})
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fbe1bf0b6b9d4dce9d9f88aca34ea0ed&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    // console.log("render");
    return (
      // <div className="container my-3">
      <>
        <h1 className="text-center"> News Express - Today's {this.capitalizeFirstLetter(this.props.category)} Top Headlines  </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={<h4> <Spinner /></h4>}
        >

          <div className="container">
        <div className="row">
          
          {this.state.articles.map((element) => { 
              return (<div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title.slice(0, 40)}
                    description={element.description === null ? " ": element.description.slice(0, 80)} imageUrl={element.urlToImage}newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePrevious}
              className="btn btn-dark"
            >
              &larr; Previous{" "}
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              onClick={this.handleNext}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
      </div> */}
      {/* </div> */}
      </>
      
    );
  }
}

export default News;
