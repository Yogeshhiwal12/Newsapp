
import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
      let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
          <div className="card">
            <img src={!imageUrl?"https://c.ndtvimg.com/2022-02/f6jhda44_japan-covid-reuters_625x300_18_February_22.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body"> <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%', zindex:'1'}}>{source}
    
  </span>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="card-link btn-sm btn-primary">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItems