let elMenu = document.querySelector(".menu");
let elTemplate = document.querySelector(".template").content;
let elWrap = document.querySelector(".wrap-tanlangan")
let elPostWrap = document.querySelector(".wrap-post")
let elCommentWrap = document.querySelector(".wrap-comment")
let comTemplate = document.querySelector(".template-two").content;
let postTemplate = document.querySelector(".template-three").content;
// console.log(comTemplate);
async function renderData(url){
    let data = await fetch(url).then((res)=>{
        return res.json()
    })
    .then((info)=>{
        return info
    })
   
    let result = []
    function renderFilms(param, element){
        let fragment = document.createDocumentFragment()
        param.forEach((obj)=>{
            let cloneTemplate = elTemplate.cloneNode(true);
           let controll = cloneTemplate.querySelector(".item__btn");
           controll.dataset.id = obj.id
            cloneTemplate.querySelector(".name").textContent = obj.name;
            cloneTemplate.querySelector(".username").textContent = obj.username;
            cloneTemplate.querySelector(".email").textContent = obj.email;
            cloneTemplate.querySelector(".street-name").textContent = obj.address.street;
            cloneTemplate.querySelector(".suite-name").textContent = obj.address.suite;
            cloneTemplate.querySelector(".city-name").textContent = obj.address.city;
            cloneTemplate.querySelector(".zipcode-name").textContent = obj.address.zipcode;
            cloneTemplate.querySelector(".lat-name").textContent = obj.address.geo.lat;
            cloneTemplate.querySelector(".lng-name").textContent = obj.address.geo.lng;
            cloneTemplate.querySelector(".phone").textContent = obj.address.phone;
            cloneTemplate.querySelector(".website").textContent = obj.address.website;
            cloneTemplate.querySelector(".company-name").textContent = obj.company.name;
            cloneTemplate.querySelector(".catchPhrase").textContent = obj.company.catchPhrase;
            cloneTemplate.querySelector(".bs").textContent = obj.company.bs;

         
          fragment.appendChild(cloneTemplate)
          element.appendChild(fragment)

          controll.addEventListener("click", (e)=>{
            console.log(e.target);
           let element = param.find((item)=>item.id == e.target.dataset.id)
        //    let elIndex = param.findIndex((index)=>index.id ==e.target.dataset.id)
        //    console.log(elIndex);
          result.push(element)
          elWrap.innerHTML = ""
          let fragment2 = document.createDocumentFragment()
          result.forEach((items)=>{
              let cloneTemplate2 = elTemplate.cloneNode(true);
            let controll2 = cloneTemplate2.querySelector(".item__btn");
            controll2.dataset.id = items.id
            controll2.textContent = "comments"
            cloneTemplate2.querySelector(".name").textContent = items.name;
            cloneTemplate2.querySelector(".username").textContent = items.username;
            cloneTemplate2.querySelector(".email").textContent = items.email;
            cloneTemplate2.querySelector(".street-name").textContent = items.address.street;
            cloneTemplate2.querySelector(".suite-name").textContent = items.address.suite;
            cloneTemplate2.querySelector(".city-name").textContent = items.address.city;
            cloneTemplate2.querySelector(".zipcode-name").textContent = items.address.zipcode;
            cloneTemplate2.querySelector(".lat-name").textContent = items.address.geo.lat;
            cloneTemplate2.querySelector(".lng-name").textContent = items.address.geo.lng;
            cloneTemplate2.querySelector(".phone").textContent = items.address.phone;
            cloneTemplate2.querySelector(".website").textContent = items.address.website;
            cloneTemplate2.querySelector(".company-name").textContent = items.company.name;
            cloneTemplate2.querySelector(".catchPhrase").textContent = items.company.catchPhrase;
            cloneTemplate2.querySelector(".bs").textContent = items.company.bs;
         
            fragment2.appendChild(cloneTemplate2)
            elWrap.appendChild(fragment2)

            controll2.addEventListener("click", (e)=>{
                console.log(e.target.dataset.id);
                async function renderComments(num){
                    let dataComment = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${num}`)
                    .then(res=>res.json())
                    .then(com=>com)
                    function comments(arr){
                        // let fragment3 = document.createDocumentFragment()
                        arr.forEach((com)=>{
                            let cloneComTemplate = comTemplate.cloneNode(true)
                            
                            cloneComTemplate.querySelector(".com-title").textContent = com.title;
                            cloneComTemplate.querySelector(".com-text").textContent = com.body;
                            let postBtn =  cloneComTemplate.querySelector(".com-btn")
                            postBtn.dataset.id = com.id;
                            elPostWrap.appendChild(cloneComTemplate)
                            
                            postBtn.addEventListener("click", (e)=>{
                                async function renderPost(number){
                                    let dataPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${number}/comments`)
                                    .then((post)=>post.json())
                                    .then((responsive)=>responsive)
                                    dataPost.forEach((post)=>{
                                        let clonePostTemplate = postTemplate.cloneNode(true)
                                        clonePostTemplate.querySelector(".post-title").textContent = post.name;
                                        clonePostTemplate.querySelector(".post-email").textContent = post.email;
                                        clonePostTemplate.querySelector(".post-text").textContent = post.body;
                                        elCommentWrap.appendChild(clonePostTemplate)
                                    })
                                }
                                renderPost(e.target.dataset.id)
                            })
                        })
                    }
                    comments(dataComment)
                }
                renderComments(e.target.dataset.id)
            })
          })
        })
        })
       
    }
    
     renderFilms(data, elMenu)

     
}

renderData("https://jsonplaceholder.typicode.com/users ")


