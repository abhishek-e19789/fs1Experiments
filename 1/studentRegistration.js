        function submittedData(){
            let res={};
            let input = document.querySelectorAll('.formInput');
            input.forEach(i=>{
                res[i.name] = i.value;
            });
            console.log(res);
        }