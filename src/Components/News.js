import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
      const [articles,setArticles]=useState([]);
      const [loading,setLoading]=useState(true);
      const [page,setPage]=useState(1);
      const [totalResults, setTotalResults]=useState(0);

 
  const  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fbe1bf0b6b9d4dce9d9f88aca34ea0ed&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    // console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);

  };

  useEffect(()=>{
      document.title=`${this.capitalizeFirstLetter(props.category)}-News Express `;
      updateNews();
  },[]) //this will execute only once
  
 const  handlePrevious = async () => {
    this.setState({ page: this.state.page - 1 });
    setPage(page-1)
    updateNews();
  };
 const  handleNext = async () => {
    setPage(page+1)
    updateNews();
  };

 const fetchMoreData = async () => {
   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fbe1bf0b6b9d4dce9d9f88aca34ea0ed&page=${page+1}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
   setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setLoading(false);
    setTotalResults(parsedData.totalResults);
   
  };

    // console.log("render");
    return (
      // <div className="container my-3">
      <>
        <h1 className="text-center" style={{margin:'40px 0', marginTop:'90px'}}> News Express - Today's {capitalizeFirstLetter(props.category)} Top Headlines  </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!== totalResults}
          loader={<h4> <Spinner /></h4>}
        >

          <div className="container">
        <div className="row">
          
          {articles.map((element) => { 
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
                Math.ceil(this.state.totalResults / props.pageSize)
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

 News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
  
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
