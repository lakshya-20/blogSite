/*
const app = document.getElementById('root')
const logo = document.createElement('img')
//logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')
console.log("guyguygiuh")
//app.appendChild(logo)
app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'http://localhost:3000/blog/blog', true)
request.onload = function() {
    console.log("Script function");
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(blog => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const title = document.createElement('h1')
      title.textContent = blog.title;

      var header=document.createElement('h2')
      header.textContent = blog.header;

      var body = document.createElement('p')
      descrp = blog.description.substring(0, 300)
      body.textContent = `${descrp}...`

    var  author = document.createElement('h2')
    author.textContent=blog.author

    var dateCreated = document.createElement('h2')
    dateCreated.textContent=blog.dateCreated


      container.appendChild(card)
      card.appendChild(title)
      card.appendChild(header)
      card.appendChild(body)
      card.appendChild(author)
      card.appendChild(dateCreated)
            

    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()
*/