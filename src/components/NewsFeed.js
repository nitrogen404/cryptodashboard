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
            <div className="className=container mx-auto px-10 py-10 bg-slate-100 rounded-lg">
                  <h2 className="font-sans text-5xl">Crypto News Articles</h2>
                  <div className="py-10 pl-2">
                        {firstSevenArticles?.map((article, _index) => (
                              <div key={_index} className="my-3">
                                    <a href={article.url}>
                                          <p className="text-blue-600 text-xl font-sans">{article.title}</p>
                                    </a>
                              </div>))
                        }
                  </div>
                  
            </div>
      )
}

export default NewsFeed;
