import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title,description,imageUrl, newsUrl,author,date,source}=this.props;
    return (
      <div className="my-3">
       <div className="card" >
        <div>
        <span className=" badge rounded-pill bg-danger" style={{display:'flex',justifyContent:'flex-end',
      position:'absolute',right:'0'}} >
                  {source}
                   </span>
        </div>
       
             <img src={imageUrl===null?"https://www.livemint.com/lm-img/img/2024/03/25/1600x900/pexels-ravi-kant-1927612_1711270727306_1711352734525.jpg":imageUrl} className="card-img-top" alt="..." />
             <div className="card-body">
             <h5 className="card-title">{title}...</h5>
                 <p className="card-text">{description}....</p>
                 
                 <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toUTCString()}</small></p>
              <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
         </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
