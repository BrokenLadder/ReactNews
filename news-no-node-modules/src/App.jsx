import React from 'react';

const NewsArticle = ({source_name, author, title, description, url, urlToImage, publishDate}) => {
    return(
        <div class="newsArticleContainer center">
            <h1 class="titles">{title}</h1>
            <h3 class="authors">{author}</h3>
            <p>              
                <img class="centerImages images" src={urlToImage}/>
                <br/>
                {description}
                <br/>
                {source_name}
                <br/>
                <a class="anchors" target="_blank" href={url}>{url}</a>
                <br/>
                {publishDate}
            </p>
            <br/>
            <br/>
        </div>
    );
}

// const NewsButton = ({title, onClick, name}) => {
//     console.log("Passed Title" + {title});
//     return(
//         <button data-title={title} onClick={onClick}>{name}</button>
//     );
// }


class NewsContainer extends React.Component{
    constructor(props) {
        super(props)      
        this.state = {
          source: '',
          submitted: '',       
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeAPIString = this.changeAPIString.bind(this);
    }

    changeAPIString(evt){
        console.log("Title: " + evt.target.dataset.title);
        this.setState({source: evt.target.dataset.title}, () => {
             this.grabNews();
        });     
    }   
    handleSubmit(evt){
        evt.preventDefault();
        var userText = document.getElementById("myTextbox").value;
        this.setState({source: userText}, () => {
            this.grabNews();
        });
    }
    grabNews() {
        const API = '68653be8332e40f99d5799b35209ff1a';
        let FETCH_URL = `https://newsapi.org/v2/top-headlines?sources=${this.state.source}&apiKey=${API}`;
        console.log("fetchURL: " + FETCH_URL);

        fetch(FETCH_URL,{
            method: 'GET'
        })
        .then(response => response.json())
        .then(json =>{
            var hidden = document.getElementById("hideMe");
            console.log(json);
            for(let i=0; i<10; i++){
                try{
                    this.setState({[`source_name${i}`]: json.articles[i].source.name});
                    this.setState({[`author${i}`]: json.articles[i].author});
                    this.setState({[`title${i}`]: json.articles[i].title});
                    this.setState({[`description${i}`]: json.articles[i].description});
                    this.setState({[`url${i}`]: json.articles[i].url});
                    this.setState({[`urlToImage${i}`]: json.articles[i].urlToImage});
                    this.setState({[`publishDate${i}`]: json.articles[i].publishedAt});
                    console.log("Source: " + this.state['source_name' + i]);
                    console.log("Author: " + this.state['author' + i]);
                    hidden.style.visibility = "hidden";
                }
                catch(err){
                    console.log("No News Source Under That Name");
                    hidden.style.visibility = "visible";
                }
            }
        });
    }
    render(){
        var newsArticles = [];
        var buttons = [];
        var goodSites = [
            "buzzfeed", 
            "ign", 
            "bild",
            "polygon",
            "recode",
            "techradar",
            "cnbc",
            "time",
            "cnn",
            "axios"
        ];
        var goodSitesTitles = [
            "Buzz Feed",
            "IGN",
            "Bild",
            "Polygon",
            "Recode",
            "Techradar",
            "CNBC",
            "Time",
            "CNN",
            "Axios"
        ];
        for(let i = 0; i < goodSites.length; i++){
            newsArticles.push(<NewsArticle 
                key = {i}
                source_name={this.state['source_name' + i]}
                author={this.state['author' + i]}
                title={this.state['title' + i]}
                description={this.state['description' + i]}
                url={this.state['url' + i]}
                urlToImage={this.state['urlToImage' + i]}
                publishDate={this.state['publishDate' + i]} />)
        }
        // for(let i = 0; i< 10; i++){
        //     buttons.push(<NewsButton
        //         title = {goodSites[i]}
        //         onClick = {this.changeAPIString(this.state.source)}
        //         name = {goodSitesTitles[i]}
        //     />)
        // }

        for(let i = 0; i< 10; i++){
            buttons.push(<button class="myButtons" data-title={goodSites[i]} onClick={this.changeAPIString}>{goodSitesTitles[i]}</button>)
        }
        return(
            <div>
                <div id="buttonContainer">
                    <img id="logo" src="News Logo.png"/>
                    {buttons}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div id="formDiv">
                        Enter Source:
                        <input type="textbox" id="myTextbox" />
                        <input type="submit" value="Submit"/>
                        <nbsp/> <p id="hideMe">Invalid News Source</p>
                    </div>
                </form>
                {newsArticles}
                <p>
                    Source: {this.state.source}
                </p>
            </div>
        );
    }
}

class App extends React.Component{
    render(){
        return(
            <div>
                <NewsContainer/>
            </div>
        );
    }
}

export default App;