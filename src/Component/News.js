import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Rocket from "./Rocket";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
 

  constructor() {
    super();
    console.log("Contructor from news comp");
    this.state = {
      articles: [],
      loading: true,
      page: 1, 
      totalResults:0
    };
  }
  // 1. constructor , 2. render , 3. cdm
  // runs after render
  async componentDidMount() {
    // console.log("cdm");
    this.updatenews();
  }

  handleNextClick = async () => {
   this.setState({page:this.state.page+1});
   this.updatenews();
  };
 
   updatenews = async () => {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category
    }&apiKey=da0da4681a24471f9dfa558e624cb75f&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    this.props.setProgress(40);
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(65);
    this.setState({
      totalResults : parsedData.totalResults,
      articles: parsedData.articles,
      loading: false,
    });
    this.props.setProgress(100);
   }

   
  handlePrevClick = async () => {
    console.log("prev");
    this.setState({page : this.state.page - 1});
    this.updatenews();

  };

// here we have fetched more data and concated it to the previous array
  fetchMoreData = async () => {
  
    this.setState({page:this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da0da4681a24471f9dfa558e624cb75f&page=${
    this.state.page + 1}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      totalResults : parsedData.totalResults,
      articles: this.state.articles.concat(parsedData.articles), // concating
      loading: false,
    });
  };

  render() {
    //   console.log("render")
    return (
      <>
        <div className="container-my-5">
          <h1 className="text-center" style={{ margin: "20px 5px" }}>
            Topicsy - Top HeadLines
          </h1>
          {this.state.loading && <Rocket/>}

          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!=this.state.totalResults}
          loader={<Rocket/>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element,index) => {
                return (
                  <div className="col-sm-4" key={index}>
                    <NewsItem
                      title={element.title}
                      description={
                        element.description
                          ? element.description.slice(0, 75)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source = {element.source.name}
                    />
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
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              {" "}
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page ===
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              {" "}
              Next &rarr;{" "}
            </button>
          </div> */}
        </div>
      </>
    );
  }
}
News.defaultProps = {
  country: "in",
  pageSize:6,
  categories: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  categories: PropTypes.string,
};
export default News;
