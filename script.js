
            ////////////////
            //Manipulation//
            ////////////////
            function calculatedata(min, size, maxindex){
                const max = populationarray[maxindex][0]
                //console.log(totalpopulation)
                return (min/max)*size
            }

            function setwidth(){
                console.log()
                const arrayofdata = document.querySelectorAll(".datacard")
                arrayofdata.forEach(element => {
                
                    const datachild = element.firstChild
                    const width = (calculatedata(parseInt(datachild.id),element.offsetWidth, parseInt(datachild.name)))
                    datachild.style.width = `${width}px`
                });
            }

            function arraysort(type){
                if(type === "most"){
                    populationarray.sort(function(a, b) {
                    return b[0] - a[0];
                });
                }else if(type === "least"){
                    populationarray.sort(function(a, b) {
                    return a[0] - b[0];
                });
                }else{
                    console.log("NOT MOST NOT LEAST")
                    return
                }
            }

            ///////////
            //Backend//
            ///////////

            const saveddata = JSON.parse(localStorage.getItem("Countries"))        
            const apiurl = "https://countriesnow.space/api/v0.1/countries/population"
            
            let populationarray = []
            let totalpopulation = 0

            let createel = (type) => document.createElement(type)

            function checkdata(data){
                if(saveddata == null){
                    console.log(typeof(saveddata))
                    fetch(apiurl)
                    .then(response => response.json())
                    .then(data => save(data.data))
                    .catch(error => console.log('error', error));

                }else{
                    console.log("Saved Data Found")
                    //console.table(saveddata)
                    console.log(typeof(saveddata))
                    saveddata.forEach(element => {
                        populationarray.push([element.populationCounts[element.populationCounts.length-1].value, element.country])
                    });
                }
            }

            

            function save(data){
                console.log("Data Successfully saved | ", data)
                localStorage.setItem("Countries", JSON.stringify(data))
            }

            function construct(countrypopulation, countryname, maxindex){

                const holder = document.getElementById("parent")
                const maincard = createel("div")
                maincard.className = "card"
                maincard.style.height = `${window.innerHeight * 0.1}px`

                    const p1 = createel("p")
                    p1.innerHTML = countryname
                    p1.className = "sides"

                    const datacard = createel("div")
                    datacard.className = "datacard"
                    datacard.id = "datacard"
                
                        const data = createel("div")
                        data.className = "data"
                        data.id = countrypopulation
                        data.name = `${maxindex}`
                    
                    const p2 = createel("p")
                    p2.innerHTML = countrypopulation
                    p2.id = countrypopulation
                    p2.className = "sides2"

                datacard.append(data)
                maincard.append(p1)
                maincard.append(datacard)
                maincard.append(p2)
                holder.append(maincard)
                
                setwidth()
            }

            //////////////////
            //Initialization//
            //////////////////

            function initiate(){
                initiatedata()
                console.log("initiated")
            }
            
            function initiatedata(){

                totalpopulation = 0

                populationarray.forEach(element => {
                    const num = element[0]
                    totalpopulation += num
                });

                const size = parseInt(document.getElementById("field").value)

                const sorttype = document.querySelector('input[name="pop"]:checked').id;
                let maxindex = 0
           
                arraysort(sorttype)

                if(sorttype==="least"){
                    maxindex = size - 1
                }else{
                    maxindex = 0
                }

                initiatebuild(size, maxindex)
            }

            function initiatebuild(numberofcountries, maxindex){
    
                const maindiv = document.getElementById("parent")     
                maindiv.innerHTML = ""
                
                
                for (let index = 0; index < numberofcountries; index++) {
                    const country = populationarray[index]
                    const countrypopulation = country[0]
                    const countryname = country[1]
                    construct(countrypopulation,countryname,maxindex)
                }
            }

            checkdata()

            window.addEventListener("resize", setwidth)