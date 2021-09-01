import React, {useState,useEffect} from 'react';
import SearchForm from './SearchForm';

const App = ()=> {
  const [articles ,setArticles]=useState([])
  const [term, setTerm] = useState('everything')
  const [isloading, setIsLoading] = useState(true)
  var url='https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+term+'&api-key='+process.env.REACT_APP_ARTICLES_API_KEY;
  
  useEffect(()=>{
    const fetchArticles =async ()=>{  
    try{
          
          const res= await fetch(url);
          const articles= await res.json()
          console.log(articles);
          console.log(articles.docs)
          setArticles(articles.docs)
          setIsLoading(false)
          
       } catch(error){
           console.log(error);
       }

      }
       fetchArticles()
  },[term])

  return (
   <>
   <div className="showcase">
     <div className="overlay px-5">
       <h1 className="text-4xl font-bold text-black text-center mb-4
       capitalize lg:text-6xl"> Viewing articles about {term}
       
       </h1>
       <SearchForm searchText={(text)=> setTerm(text)}/>
       </div>
   </div>
   {isloading? <h1 className="text-center mt-20 font-bold text-6xl">Loading....</h1> :
    <section className=" grid grid-cols-1 px-5 pt-10 pb-20">
    {articles.map((article) => {
      const {article:{author,title,summary,uuid,url,social:{updated} }}= article

    return(
      <article key={uuid} className="bg-white py-10 px-5 my-4 rounded-lg lg:w-9/12 lg:mx-auto">
        <h2 className="font-bold text-2xl mb-2 lg:text-4xl">{title}</h2>
        <p>{summary}</p>
        
        <ul className="my-4">
          <li>By: {author}</li>
          <li><span className="font-bold">updated : </span>{updated}</li>
        </ul>
        <a href={url}className="underline">Web Resource</a>
        </article>
    )

    })}
    </section>

   }

   </>
  );
}

export default App;
