import { useEffect, useState } from "react";
import axios from "axios";


const NewsFeed = () => {
      const [articles, setArticles] = useState(null);

      useEffect(() => {
            const options = {
                  method: 'GET',
                  url: 'https://crypto-news-live3.p.rapidapi.com/news',
                  headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API,
                    'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com'
                  }
                };
                
            axios.request(options).then(function (response) {
                  console.log(response.data);
                  setArticles(response.data);
            }).catch(function (error) {
                  console.error(error);
            });
      }, [])

      const firstSevenArticles = articles?.slice(0, 5);
      // console.log("First Seven articles ", firstSevenArticles)
      return (
            <div className="news-feed">
                  <h2>Crypto News Articles</h2>
                  {firstSevenArticles?.map((article, _index) => (
                        <div key={_index}>
                              <a href={article.url}>
                                    <p>{article.title}</p>
                              </a>
                        </div>))
                  }
            </div>
      )
}

export default NewsFeed;
